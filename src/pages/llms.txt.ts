import {
  categories,
  projectCategories,
  relatedSites,
  site,
} from "../config/site";

function absolute(path: string) {
  return new URL(path, site.url).href;
}

function link(name: string, path: string, note?: string) {
  const target = path.startsWith("http") ? path : absolute(path);
  return note ? `- [${name}](${target}): ${note}` : `- [${name}](${target})`;
}

export function GET() {
  const projects = projectCategories().flatMap((category) => {
    const carnet = link(
      `${category.name} dans le carnet`,
      `/categories/${category.slug}/`,
      category.description,
    );
    if ("url" in category && category.url) {
      return [link(category.name, category.url, category.description), carnet];
    }
    return [carnet];
  });

  const body = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    "Carnet personnel signé. Les projets y sont des sujets de terrain, pas des pages commerciales. Le français est la langue du site.",
    "",
    "## Pages",
    "",
    link("Accueil", "/", "Point d’entrée du carnet."),
    link("Le carnet", "/blog/", "Liste des pages publiées."),
    link(
      "Mes univers",
      "/univers/",
      "Vue d’ensemble des thèmes et projets, avec liens vers leurs sites publics.",
    ),
    link("À propos", "/a-propos/", "Qui écrit ce carnet."),
    link("Flux RSS", "/rss.xml", "Abonnement aux pages publiées."),
    link("Sitemap", "/sitemap-index.xml", "Carte des URL publiques."),
    "",
    "## Thèmes du carnet",
    "",
    ...categories.map((category) =>
      link(
        category.name,
        `/categories/${category.slug}/`,
        category.description,
      ),
    ),
    "",
    "## Projets",
    "",
    ...projects,
    "",
    "## Optional",
    "",
    ...relatedSites.map((item) => link(item.name, item.url, item.description)),
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
