import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { categorySlugs } from "./config/site";

const calendarDate = z
  .string()
  .regex(
    /^\d{4}-\d{2}-\d{2}$/,
    'Utiliser une date entre guillemets : "YYYY-MM-DD".',
  )
  .refine((value) => {
    const parsed = new Date(`${value}T00:00:00Z`);
    return (
      !Number.isNaN(parsed.valueOf()) &&
      parsed.toISOString().slice(0, 10) === value
    );
  }, "La date doit exister dans le calendrier.");

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z
    .object({
      title: z.string().trim().min(1).max(120),
      description: z.string().trim().min(1).max(160),
      pubDate: calendarDate,
      updatedDate: calendarDate.optional(),
      category: z.enum(categorySlugs),
      tags: z.array(z.string().trim().min(1)).max(6).default([]),
      draft: z.boolean().default(true),
      cover: z
        .string()
        .regex(/^\/images\/[a-zA-Z0-9/_-]+\.(avif|webp|png|jpe?g|svg)$/)
        .optional(),
      coverAlt: z.string().trim().min(1).optional(),
    })
    .strict()
    .refine((data) => !data.cover || !!data.coverAlt, {
      message: "Une couverture nécessite un texte alternatif coverAlt.",
      path: ["coverAlt"],
    })
    .refine((data) => !data.updatedDate || data.updatedDate >= data.pubDate, {
      message: "updatedDate doit être égale ou postérieure à pubDate.",
      path: ["updatedDate"],
    }),
});

export const collections = { blog };
