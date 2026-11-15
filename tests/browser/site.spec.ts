import { test, expect } from "@playwright/test";
import { readdirSync, readFileSync } from "node:fs";
import { parse } from "yaml";
import { todayInAlgiers } from "../../src/lib/publication";

test("Accueil sur ordinateur et accès au contenu au clavier", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("response", (response) => {
    if (response.status() >= 400)
      errors.push(`${response.status()} ${response.url()}`);
  });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await expect(page).toHaveTitle(/Taous Deneuve/);
  await page.screenshot({
    path: "test-results/preview-desktop.png",
    fullPage: true,
  });
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Aller au contenu" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#contenu")).toBeFocused();
  await page.getByRole("link", { name: "Ouvrir le carnet" }).click();
  await expect(page).toHaveURL(/\/blog\/$/);
  expect(errors).toEqual([]);
});

test("Pages lisibles sur petit écran, sans débordement horizontal", async ({
  page,
}) => {
  for (const width of [390, 320]) {
    await page.setViewportSize({ width, height: 844 });
    for (const path of [
      "/",
      "/blog/",
      "/univers/",
      "/a-propos/",
      "/categories/my-dare/",
    ]) {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      await page.evaluate(() => document.fonts.ready);
      const sizes = await page.evaluate(() => ({
        viewport: window.innerWidth,
        content: document.documentElement.scrollWidth,
      }));
      expect(sizes.content, `${width}px ${path}`).toBeLessThanOrEqual(
        sizes.viewport,
      );
      if (width === 390 && path === "/") {
        await page.screenshot({
          path: "test-results/preview-mobile.png",
          fullPage: true,
        });
      }
    }
  }
});

test("Un brouillon est prévisualisable en local et inaccessible en production", async ({
  page,
}) => {
  const folder = new URL("../../src/content/blog/", import.meta.url);
  const draft = readdirSync(folder)
    .filter((name) => name.endsWith(".md"))
    .find((name) => {
      const source = readFileSync(new URL(name, folder), "utf8");
      const matter = source.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1];
      if (!matter) return false;
      const data = parse(matter);
      return data.draft !== false || data.pubDate > todayInAlgiers();
    });
  test.skip(!draft, "Aucun brouillon dans le carnet pour cette vérification.");
  const path = `/blog/${draft!.slice(0, -3)}/`;
  const response = await page.goto(path);
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "On reprend",
  );
  await page.goto(`http://127.0.0.1:4322${path}`);
  await expect(page.locator(".draft-notice")).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    "noindex, nofollow",
  );
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: "test-results/preview-article.png",
    fullPage: true,
  });
  const rss = await page.request.get("http://127.0.0.1:4322/rss.xml");
  expect(await rss.text()).not.toContain(path);
});
