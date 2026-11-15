import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "yaml";
import { site } from "../src/config/site.ts";
import { todayInAlgiers } from "../src/lib/publication.ts";

const root = fileURLToPath(new URL("../", import.meta.url));
const output = join(root, "dist");

async function exists(path) {
  try {
    return (await stat(path)).isFile();
  } catch {
    return false;
  }
}

async function walk(folder) {
  const entries = await readdir(folder, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) =>
      entry.isDirectory()
        ? walk(join(folder, entry.name))
        : join(folder, entry.name),
    ),
  );
  return files.flat();
}

assert(
  await exists(join(output, "index.html")),
  "Exécuter npm run build avant test:build.",
);
assert.equal(
  (await readFile(join(output, "CNAME"), "utf8")).trim(),
  new URL(site.url).hostname,
);
assert(await exists(join(output, ".nojekyll")), ".nojekyll absent.");
assert(
  await exists(join(output, "images/og-default.png")),
  "Image de partage absente.",
);

const files = await walk(output);
const htmlFiles = files.filter((file) => file.endsWith(".html"));
const publicTextFiles = files.filter((file) =>
  /\.(html|xml|txt|json)$/.test(file),
);
const publicText = (
  await Promise.all(publicTextFiles.map((file) => readFile(file, "utf8")))
).join("\n");
const rss = await readFile(join(output, "rss.xml"), "utf8");
const sitemap = (
  await Promise.all(
    files
      .filter((file) => /sitemap.*\.xml$/.test(file))
      .map((file) => readFile(file, "utf8")),
  )
).join("\n");
assert(
  sitemap.includes(site.url),
  "Le sitemap doit utiliser le domaine final.",
);
assert(!sitemap.includes("/404"), "La page 404 ne doit pas être indexée.");
const robots = await readFile(join(output, "robots.txt"), "utf8");
assert(robots.includes(`${site.url}/sitemap-index.xml`));
assert(
  robots.includes(`${site.url}/llms.txt`),
  "robots.txt doit signaler llms.txt.",
);
const llms = await readFile(join(output, "llms.txt"), "utf8");
assert.match(llms, /^# Taous Deneuve/m, "llms.txt : titre manquant.");
for (const url of [
  "https://www.my-dare.com",
  "https://www.omnivya.fr",
  "https://www.sanad.cloud",
  "https://etienne.deneuve.xyz",
]) {
  assert(llms.includes(url), `llms.txt : lien manquant ${url}.`);
}
assert(!llms.includes("ScaLion"), "llms.txt ne doit plus mentionner ScaLion.");
assert(
  !publicText.includes("ScaLion") &&
    !publicText.includes("/categories/scalion"),
  "ScaLion ne doit plus apparaître dans les sorties publiques.",
);

for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  assert.match(html, /<html[^>]+lang="fr"/, `${file} : langue manquante.`);
  assert.equal(
    [...html.matchAll(/<h1(?:\s|>)/g)].length,
    1,
    `${file} : un seul h1 est attendu.`,
  );
  const canonical = html.match(
    /<link\b(?=[^>]*rel="canonical")(?=[^>]*href="([^"]+)")[^>]*>/,
  )?.[1];
  assert(
    canonical?.startsWith(`${site.url}/`),
    `${file} : URL canonique incorrecte.`,
  );
  assert.match(
    html,
    /<meta name="description" content="[^"]+"/,
    `${file} : description absente.`,
  );
  for (const match of html.matchAll(
    /<script\b[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs,
  )) {
    assert.doesNotThrow(
      () => JSON.parse(match[1]),
      `${file} : JSON-LD invalide.`,
    );
  }
  for (const [, raw] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (!raw.startsWith("/") || raw.startsWith("//")) continue;
    const url = new URL(raw.replaceAll("&amp;", "&"), site.url);
    const path = resolve(output, `.${decodeURIComponent(url.pathname)}`);
    assert(
      path.startsWith(`${output}/`) || path === output,
      `${file} : lien hors du site.`,
    );
    assert(
      (await exists(path)) || (await exists(join(path, "index.html"))),
      `${file} : lien ou ressource introuvable : ${raw}`,
    );
  }
}

let published = 0;
let hidden = 0;
for (const path of await walk(join(root, "src/content/blog"))) {
  if (!path.endsWith(".md")) continue;
  const source = await readFile(path, "utf8");
  const frontmatter = source.match(
    /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/,
  )?.[1];
  assert(frontmatter, `${path} : frontmatter manquant.`);
  const data = parse(frontmatter);
  const id = path.slice(join(root, "src/content/blog").length + 1, -3);
  const route = `/blog/${id}/`;
  const isPublic = data.draft === false && data.pubDate <= todayInAlgiers();
  if (isPublic) {
    published++;
    assert(
      await exists(join(output, route, "index.html")),
      `${route} : article publié absent.`,
    );
    assert(
      rss.includes(route) && sitemap.includes(route),
      `${route} : absent du RSS ou du sitemap.`,
    );
    const page = await readFile(join(output, route, "index.html"), "utf8");
    assert(
      page.includes('"@type":"BlogPosting"'),
      `${route} : données structurées article absentes.`,
    );
  } else {
    hidden++;
    assert(
      !(await exists(join(output, route, "index.html"))),
      `${route} : un article privé est généré.`,
    );
    assert(
      !publicText.includes(route),
      `${route} : un article privé apparaît dans une sortie publique.`,
    );
  }
}

console.log(
  `Build vérifié : ${htmlFiles.length} pages, ${published} article(s) publié(s), ${hidden} brouillon(s)/article(s) futur(s) exclus ; liens locaux, SEO, RSS et sitemap valides.`,
);
