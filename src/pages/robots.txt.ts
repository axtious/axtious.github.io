import type { APIContext } from "astro";

export function GET({ site }: APIContext) {
  const rules = import.meta.env.DEV
    ? "User-agent: *\nDisallow: /\n"
    : `User-agent: *\nAllow: /\n\nSitemap: ${new URL("sitemap-index.xml", site)}\n`;
  return new Response(rules, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
