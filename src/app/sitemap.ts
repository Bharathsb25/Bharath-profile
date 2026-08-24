import type { MetadataRoute } from "next";
import { samples } from "@/data/samples";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const lastModified = new Date();

  const routes = ["", "/freelance", "/services", "/samples", "/privacy"].map(
    (path) => ({
      url: `${base}${path || "/"}`,
      lastModified,
    })
  );

  const sampleRoutes = samples.map((sample) => ({
    url: `${base}/samples/${sample.slug}`,
    lastModified,
  }));

  return [...routes, ...sampleRoutes];
}
