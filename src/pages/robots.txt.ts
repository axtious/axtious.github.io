import type { APIContext } from "astro";
import { site } from "../config/site";

export function GET({ site: siteUrl }: APIContext) {
  const origin = siteUrl ?? new URL(site.url);
  const rules = import.meta.env.DEV
    ? "User-agent: *\nDisallow: /\n"
    : [
        "User-agent: *",
        "Allow: /",
        "",
        `Sitemap: ${new URL("sitemap-index.xml", origin)}`,
        `LLMs: ${new URL("llms.txt", origin)}`,
        "",
      ].join("\n");
  return new Response(rules, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
