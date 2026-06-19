import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import ProviderCard from "@/components/common/ProviderCard";
import FAQSection from "@/components/common/FAQSection";
import { MOCK_PROVIDERS } from "@/data/providers";
import { getFeaturedWorkCases } from "@/data/workcases";
import type { FAQ } from "@/lib/types";
import { SITE_URL } from "@/lib/metadata";

export interface IndustryPageConfig {
  slug: string; // 例: "for-real-estate"
  industryName: string; // 例: "不動産会社"
  heroLead: string;
  challenges: { title: string; desc: string }[];
  services: string[];
  benefits: { title: string; desc: string }[];
  faqs: FAQ[];
  providerFilter?: (p: (typeof MOCK_PROVIDERS)[number]) => boolean;
}

export default function IndustryPage({ config }: { config: IndustryPageConfig }) {
  const { slug, industryName, heroLead, challenges, services, benefits, faqs, providerFilter } = config;
  const providers = MOCK_PROVIDERS.filter((p) => p.status === "active" && (providerFilter ? providerFilter(p) : p.acceptsCorporate)).slice(0, 6);
  const cases = getFeaturedWorkCases(3);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "トップ", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: `${industryName}向け`, item: `${SITE_URL}/${slug}` },
    ],
  };
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: `${industryName}向け畳・内装工事`,
    provider: { "@type": "Organization", name: "日本畳パートナーズ", url: SITE_URL },
    areaServed: { "@type": "State", name: "埼玉県" },
    description: heroLead,
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="min-h-screen bg-shiro">
        {/* ヒーロー */}
        <div className="bg-sumi">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumbs variant="dark" items={[{ label: "トップ", href: "/" }, { label: `${industryName}向け` }]} />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 pt-6">
            <span className="text-xs tracking-widest text-kincya uppercase">For {industryName}</span>
            <h1 className="text-2xl md:text-4xl text-white mt-3 mb-4 leading-tight" style={{ fontFamily: "var(--font-serif)" }}>
              {industryName}向けの畳・内装工事パートナー
            </h1>
            <p className="text-sm md:text-base text-white/60 max-w-2xl leading-relaxed">{heroLead}</p>
            <div className="flex flex-wrap gap-3 mt-6">
              <Link href="/bulk-quote" className="bg-kincya text-white px-6 py-3 text-sm hover:bg-do transition-colors">
                一括見積もりを依頼
              </Link>
              <Link href="/search?acceptsCorporate=true" className="border border-white/30 text-white px-6 py-3 text-sm hover:bg-white/10 transition-colors">
                対応業者を見る
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* よくある課題 */}
          <section className="mb-12">
            <h2 className="text-xl text-sumi mb-6" style={{ fontFamily: "var(--font-serif)" }}>
              {industryName}が抱えるよくある課題
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {challenges.map((c) => (
                <div key={c.title} className="bg-white border border-border p-5">
                  <h3 className="text-sm font-medium text-do mb-1.5">{c.title}</h3>
                  <p className="text-sm text-sumi/70 leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 対応できる工事 */}
          <section className="mb-12">
            <h2 className="text-xl text-sumi mb-6" style={{ fontFamily: "var(--font-serif)" }}>
              対応できる工事
            </h2>
            <div className="flex flex-wrap gap-2">
              {services.map((s) => (
                <span key={s} className="text-sm bg-kiji border border-border px-3 py-1.5 text-sumi/80">
                  {s}
                </span>
              ))}
            </div>
          </section>

          {/* 特典・メリット */}
          <section className="mb-12 bg-kiji/40 border border-kiji p-6">
            <h2 className="text-xl text-sumi mb-6" style={{ fontFamily: "var(--font-serif)" }}>
              法人・事業者向けの対応
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {benefits.map((b) => (
                <div key={b.title}>
                  <div className="w-8 h-8 bg-igusa/10 text-igusa flex items-center justify-center mb-2 text-sm">✓</div>
                  <h3 className="text-sm font-medium text-sumi mb-1">{b.title}</h3>
                  <p className="text-xs text-sumi/60 leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 対応業者一覧 */}
          <section className="mb-12">
            <h2 className="text-xl text-sumi mb-6" style={{ fontFamily: "var(--font-serif)" }}>
              {industryName}に対応する業者
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {providers.map((p) => (
                <ProviderCard key={p.id} provider={p} showFavorite />
              ))}
            </div>
          </section>

          {/* 施工事例 */}
          <section className="mb-12">
            <h2 className="text-xl text-sumi mb-6" style={{ fontFamily: "var(--font-serif)" }}>
              施工事例
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {cases.map((c) => (
                <Link key={c.id} href={`/cases/${c.id}`} className="group bg-white border border-border overflow-hidden hover:shadow-sm transition-all">
                  <div className="aspect-[4/3] bg-kiji/50 tatami-pattern" />
                  <div className="p-4">
                    <p className="text-xs text-ai mb-1">{c.categoryName}</p>
                    <h3 className="text-sm text-sumi group-hover:text-ai transition-colors line-clamp-2">{c.title}</h3>
                    <p className="text-xs text-sumi/40 mt-1">{c.cityName}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <FAQSection items={faqs} title={`${industryName}向けのよくある質問`} />

          {/* CTA */}
          <section className="mt-12 bg-sumi text-center py-12 px-6">
            <h2 className="text-xl md:text-2xl text-white mb-3" style={{ fontFamily: "var(--font-serif)" }}>
              複数業者にまとめて見積もり依頼
            </h2>
            <p className="text-sm text-white/60 mb-6 max-w-xl mx-auto">
              物件情報を一度入力するだけで、複数の対応業者に見積もりを依頼できます。比較してコストと品質に納得のいく1社を選べます。
            </p>
            <Link href="/bulk-quote" className="inline-block bg-kincya text-white px-8 py-3.5 text-sm hover:bg-do transition-colors">
              一括見積もりを依頼する
            </Link>
          </section>
        </div>
      </div>
    </>
  );
}
