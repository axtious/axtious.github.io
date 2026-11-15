import { mkdir, readFile, writeFile } from "node:fs/promises";
import { todayInAlgiers } from "../src/lib/publication.ts";

const [slug, ...extra] = process.argv.slice(2);
if (!slug || extra.length || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
  console.error(
    "Usage : npm run new:post -- mon-sujet (minuscules, chiffres et tirets).",
  );
  process.exit(1);
}

const folder = new URL("../src/content/blog/", import.meta.url);
const template = await readFile(
  new URL("../templates/article.md", import.meta.url),
  "utf8",
);
const title = slug.charAt(0).toUpperCase() + slug.slice(1).replaceAll("-", " ");
const content = template
  .replaceAll("{{TITLE}}", title)
  .replaceAll("{{DATE}}", todayInAlgiers());

try {
  await mkdir(folder, { recursive: true });
  await writeFile(new URL(`${slug}.md`, folder), content, { flag: "wx" });
  console.log(`Brouillon créé : src/content/blog/${slug}.md`);
  console.log(
    "Compléter le texte et les métadonnées, puis prévisualiser avec npm run dev.",
  );
} catch (error) {
  if (error.code !== "EEXIST") throw error;
  console.error(
    `L’article ${slug}.md existe déjà. Aucun fichier n’a été remplacé.`,
  );
  process.exitCode = 1;
}
