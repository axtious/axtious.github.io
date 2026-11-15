import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { site } from "../config/site";
import { getPosts, postUrl } from "../lib/posts";

export async function GET(context: APIContext) {
  const posts = await getPosts(false);
  return rss({
    title: site.title,
    description: site.description,
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: new Date(`${post.data.pubDate}T00:00:00+01:00`),
      link: postUrl(post),
      categories: [post.data.category, ...post.data.tags],
    })),
    customData: "<language>fr</language>",
  });
}
