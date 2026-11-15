import { getCollection, type CollectionEntry } from "astro:content";
import { isPublished } from "./publication";

export type BlogPost = CollectionEntry<"blog">;

export async function getPosts(includeDrafts = import.meta.env.DEV) {
  const posts = await getCollection("blog");
  for (const post of posts) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(post.id)) {
      throw new Error(
        `Nom d’article invalide : ${post.id}. Utiliser un slug en minuscules avec tirets.`,
      );
    }
  }
  return posts
    .filter((post) => includeDrafts || isPublished(post.data))
    .sort(
      (a, b) =>
        b.data.pubDate.localeCompare(a.data.pubDate) ||
        a.id.localeCompare(b.id),
    );
}

export function postUrl(post: BlogPost) {
  return `/blog/${post.id}/`;
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

export function readingTime(post: BlogPost) {
  const words = (post.body ?? "").trim().split(/\s+/u).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}
