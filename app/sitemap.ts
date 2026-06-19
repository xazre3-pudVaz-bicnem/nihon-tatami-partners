import type { MetadataRoute } from "next";
import { SAITAMA_CITIES } from "@/data/cities";
import { SERVICE_CATEGORIES, POPULAR_CATEGORIES } from "@/data/categories";
import { MOCK_PROVIDERS } from "@/data/providers";
import { MOCK_WORK_CASES } from "@/data/workcases";
import { SITE_URL } from "@/lib/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${SITE_URL}/saitama`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/search`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${SITE_URL}/categories`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/works`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/pro`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/pro/register`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/help`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${SITE_URL}/terms`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
    { url: `${SITE_URL}/privacy`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
  ];

  // カテゴリ別 SEO ページ（/saitama/[category]）
  const categoryPages: MetadataRoute.Sitemap = SERVICE_CATEGORIES.map((cat) => ({
    url: `${SITE_URL}/saitama/${cat.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: cat.popular ? 0.85 : 0.75,
  }));

  // 市区町村トップ（/saitama/[city]）
  const cityPages: MetadataRoute.Sitemap = SAITAMA_CITIES.map((city) => ({
    url: `${SITE_URL}/saitama/${city.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));

  // 市区町村 × 人気カテゴリ（/saitama/[city]/[category]）
  const cityCategoryPages: MetadataRoute.Sitemap = [];
  for (const city of SAITAMA_CITIES) {
    for (const cat of POPULAR_CATEGORIES) {
      cityCategoryPages.push({
        url: `${SITE_URL}/saitama/${city.slug}/${cat.slug}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.70,
      });
    }
  }

  // 業者詳細
  const providerPages: MetadataRoute.Sitemap = MOCK_PROVIDERS.map((p) => ({
    url: `${SITE_URL}/providers/${p.id}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.80,
  }));

  // 施工事例
  const workcasePages: MetadataRoute.Sitemap = MOCK_WORK_CASES.map((w) => ({
    url: `${SITE_URL}/works/${w.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  return [
    ...staticPages,
    ...categoryPages,
    ...cityPages,
    ...cityCategoryPages,
    ...providerPages,
    ...workcasePages,
  ];
}
