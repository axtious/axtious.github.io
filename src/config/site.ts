export const site = {
  url: "https://taous.deneuve.xyz",
  name: "Taous Deneuve",
  title: "Taous Deneuve — Carnet d’entrepreneure",
  description:
    "Le carnet de Taous Deneuve : entreprendre, faire grandir My Dare et Omnivya, et partager ce que le terrain nous apprend.",
  language: "fr",
  locale: "fr_FR",
  timeZone: "Africa/Algiers",
  author: "Taous Deneuve",
} as const;

export const categories = [
  {
    slug: "entreprendre",
    name: "Entreprendre",
    description:
      "Les décisions, les détours et ce que l’on apprend en faisant.",
    number: "01",
  },
  {
    slug: "my-dare",
    name: "My Dare",
    description:
      "Les lieux, les rencontres et la vie d’une entreprise au quotidien.",
    number: "02",
    url: "https://www.my-dare.com",
  },
  {
    slug: "omnivya",
    name: "Omnivya",
    description: "Entreprendre dans la tech, avec un regard de dirigeante.",
    number: "03",
    url: "https://www.omnivya.fr",
  },
  {
    slug: "sanad",
    name: "Sanad",
    description: "Construire un produit à partir de besoins concrets.",
    number: "04",
    url: "https://www.sanad.cloud",
  },
] as const;

/** Sites publics confirmés, hors catégories du carnet. */
export const relatedSites = [
  {
    name: "Étienne Deneuve",
    url: "https://etienne.deneuve.xyz",
    description: "Le site d’Étienne Deneuve.",
  },
] as const;

export const categorySlugs = [
  "entreprendre",
  "my-dare",
  "omnivya",
  "sanad",
] as const;

export type CategorySlug = (typeof categorySlugs)[number];
export type Category = (typeof categories)[number];

export function categoryFor(slug: CategorySlug) {
  return categories.find((category) => category.slug === slug)!;
}

export function projectCategories() {
  return categories.filter((category) => category.slug !== "entreprendre");
}

export function publicProjectUrls(): string[] {
  return categories.flatMap((category) =>
    "url" in category && category.url ? [category.url] : [],
  );
}
