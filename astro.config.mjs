import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { site } from "./src/config/site.ts";

export default defineConfig({
  site: site.url,
  output: "static",
  trailingSlash: "always",
  integrations: [
    sitemap({
      filter: (page) => !new URL(page).pathname.endsWith("/404/"),
    }),
  ],
});
