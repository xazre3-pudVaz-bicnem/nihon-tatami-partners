import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import ProviderCard from "@/components/common/ProviderCard";
import CityLinkGrid from "@/components/common/CityLinkGrid";
import FAQSection from "@/components/common/FAQSection";
import { getTopProviders } from "@/data/providers";
import type { CategoryConfig } from "@/config/categories";
import type { FAQ } from "@/lib/types";
import { SITE_URL } from "@/lib/metadata";

interface Props {
  groupLabel: string; // 例: "畳工事"
  groupSlug: string; // 例: "tatami"
  lead: string;
  categories: CategoryConfig[];
  faqs: FAQ[];
}

// 埼玉のカテゴリグループ総合ページ（Server Component, 静的）
export default function CategoryGroupPage({ groupLabel, groupSlug, lead, categories, faqs }: Props) {
  const providers = getTopProviders(6);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "トップ", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "埼玉県", item: `${SITE_URL}/saitama` },
      { "@type": "ListItem", position: 3, name: `埼玉の${groupLabel}`, item: `${SITE_URL}/saitama/${groupSlug}` },
    ],
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="min-h-screen bg-shiro">
        <div className="bg-sumi">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumbs
              variant="dark"
              items={[
                { label: "トップ", href: "/" },
                { label: "埼玉県", href: "/saitama" },
                { label: `埼玉の${groupLabel}` },
              ]}
            />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 pt-4">
            <h1 className="text-2xl md:text-3xl text-white mb-3" style={{ fontFamily: "var(--font-serif)" }}>
              埼玉県の{groupLabel}｜料金・口コミで業者を比較
            </h1>
            <p className="text-sm text-white/60 max-w-2xl">{lead}</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* サービス一覧 */}
          <section className="mb-10">
            <h2 className="text-xl text-sumi mb-5" style={{ fontFamily: "var(--font-serif)" }}>
              {groupLabel}のサービス
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((c) => (
                <Link
                  key={c.slug}
                  href={`/search?category=${c.slug}`}
                  className="bg-white border border-border p-5 hover:border-kincya/40 hover:shadow-sm transition-all group"
                >
                  <h3 className="text-base text-sumi mb-1 group-hover:text-ai transition-colors" style={{ fontFamily: "var(--font-serif)" }}>
                    {c.name}
                  </h3>
                  <p className="text-xs text-sumi/60 line-clamp-2 mb-2">{c.description}</p>
                  {c.priceFrom !== undefined && c.priceFrom > 0 && (
                    <p className="text-sm text-kincya font-medium">{c.priceFrom.toLocaleString()}円〜/{c.unit}</p>
                  )}
                </Link>
              ))}
            </div>
          </section>

          {/* おすすめ業者 */}
          <section className="mb-10">
            <h2 className="text-xl text-sumi mb-5" style={{ fontFamily: "var(--font-serif)" }}>
              埼玉県の{groupLabel}に対応するおすすめ業者
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {providers.map((p) => (
                <ProviderCard key={p.id} provider={p} showFavorite />
              ))}
            </div>
            <div className="text-center mt-6">
              <Link href="/search" className="inline-block text-sm bg-ai text-white px-6 py-3 hover:bg-ai-light transition-colors">
                すべての業者を見る
              </Link>
            </div>
          </section>

          <FAQSection items={faqs} title={`埼玉の${groupLabel}に関するよくある質問`} />
        </div>

        <CityLinkGrid title="市区町村から探す" />
      </div>
    </>
  );
}
