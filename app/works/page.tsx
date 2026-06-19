import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { MOCK_WORK_CASES } from "@/data/workcases";
import { SERVICE_CATEGORIES } from "@/data/categories";
import { SITE_URL } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "施工事例 | 埼玉の畳・和室工事の実績 | 日本畳パートナー",
  description: "埼玉県の畳表替え、和室リフォーム、ふすま・障子張替えの施工事例を紹介。Before/Afterの写真と詳細な施工内容を公開しています。",
  alternates: { canonical: `${SITE_URL}/works` },
};

export default function WorksPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "トップ", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "施工事例", item: `${SITE_URL}/works` },
    ],
  };

  const categories = SERVICE_CATEGORIES.filter((c) => c.popular);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="min-h-screen bg-shiro">
        <div className="bg-sumi">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumbs items={[{ label: "トップ", href: "/" }, { label: "施工事例" }]} />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 pt-4">
            <h1 className="text-2xl md:text-3xl text-white mb-2" style={{ fontFamily: "var(--font-serif)" }}>
              施工事例
            </h1>
            <p className="text-sm text-white/60">埼玉県内の畳・和室工事の実績をご紹介します</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* カテゴリフィルター */}
          <div className="flex flex-wrap gap-2 mb-8">
            <span className="text-xs border-b-2 border-ai text-ai px-3 py-1.5">すべて</span>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/works?category=${cat.slug}`}
                className="text-xs border border-border text-sumi/60 hover:border-ai hover:text-ai transition-colors px-3 py-1.5"
              >
                {cat.name}
              </Link>
            ))}
          </div>

          {/* 事例グリッド */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_WORK_CASES.map((wc) => (
              <Link key={wc.id} href={`/works/${wc.id}`} className="group bg-white border border-border hover:border-kincya/30 transition-all duration-300">
                {/* Before/After 写真エリア */}
                <div className="grid grid-cols-2 gap-0.5 bg-kiji aspect-[4/3]">
                  <div className="bg-sumi/5 flex items-center justify-center">
                    <span className="text-xs text-sumi/30">Before</span>
                  </div>
                  <div className="bg-kiji/50 flex items-center justify-center">
                    <span className="text-xs text-sumi/30">After</span>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-xs text-ai border border-ai/30 px-2 py-0.5">{wc.categoryName}</span>
                    {wc.estimatedCostLabel && (
                      <span className="text-xs text-kincya">{wc.estimatedCostLabel}</span>
                    )}
                  </div>
                  <h2 className="text-sm text-sumi group-hover:text-ai transition-colors leading-snug" style={{ fontFamily: "var(--font-serif)" }}>
                    {wc.title}
                  </h2>
                  <p className="text-xs text-sumi/50 mt-1">{wc.cityName} / {wc.buildingType}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
