import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import ProviderCard from "@/components/common/ProviderCard";
import CityLinkGrid from "@/components/common/CityLinkGrid";
import FAQSection from "@/components/common/FAQSection";
import { getCategoryBySlug, SERVICE_CATEGORIES } from "@/data/categories";
import { getCityBySlug, SAITAMA_CITIES } from "@/data/cities";
import { getProvidersByCity } from "@/data/providers";
import { SITE_URL } from "@/lib/metadata";

interface Props {
  params: Promise<{ city: string; category: string }>;
}

export async function generateStaticParams() {
  const pairs: { city: string; category: string }[] = [];
  for (const city of SAITAMA_CITIES) {
    for (const cat of SERVICE_CATEGORIES.filter((c) => c.popular)) {
      pairs.push({ city: city.slug, category: cat.slug });
    }
  }
  return pairs;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city, category } = await params;
  const cityData = getCityBySlug(city);
  const cat = getCategoryBySlug(category);
  if (!cityData || !cat) return {};
  return {
    title: `${cityData.name}の${cat.name} | 料金・口コミで比較 | 日本畳パートナー`,
    description: `${cityData.name}（埼玉県）の${cat.name}業者を料金・口コミ・対応エリアで比較。${cat.description}無料で見積相談できます。`,
    alternates: { canonical: `${SITE_URL}/saitama/${city}/${category}` },
  };
}

export default async function CityCategoryPage({ params }: Props) {
  const { city, category } = await params;
  const cityData = getCityBySlug(city);
  const cat = getCategoryBySlug(category);
  if (!cityData || !cat) notFound();

  const providers = getProvidersByCity(cityData.name);

  const nearCities = SAITAMA_CITIES.filter((c) => c.slug !== city).slice(0, 6);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "トップ", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "埼玉県", item: `${SITE_URL}/saitama` },
      { "@type": "ListItem", position: 3, name: cityData.name, item: `${SITE_URL}/saitama/${city}` },
      { "@type": "ListItem", position: 4, name: cat.name, item: `${SITE_URL}/saitama/${city}/${category}` },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `${cityData.name}の${cat.name}の料金は？`,
        acceptedAnswer: { "@type": "Answer", text: cat.priceFrom ? `${cityData.name}での${cat.name}は${cat.priceFrom.toLocaleString()}円/${cat.unit}〜が目安です。複数業者に見積もりを依頼することをおすすめします。` : "業者によって異なります。無料見積もりでご確認ください。" },
      },
      {
        "@type": "Question",
        name: `${cityData.name}で${cat.name}に対応している業者はいますか？`,
        acceptedAnswer: { "@type": "Answer", text: `日本畳パートナーには${cityData.name}エリアに対応した業者が掲載されています。上記の一覧から料金・口コミで比較して選んでください。` },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="min-h-screen bg-shiro">
        {/* ヘッダー */}
        <div className="bg-sumi">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumbs items={[
              { label: "トップ", href: "/" },
              { label: "埼玉県", href: "/saitama" },
              { label: cityData.name, href: `/saitama/${city}` },
              { label: cat.name },
            ]} />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 pt-4">
            <h1 className="text-2xl md:text-3xl text-white mb-3" style={{ fontFamily: "var(--font-serif)" }}>
              {cityData.name}の{cat.name}業者を比較して探す
            </h1>
            <p className="text-sm text-white/60 max-w-2xl">{cityData.description}</p>
            {cat.priceFrom && (
              <p className="text-sm text-kincya mt-2">料金目安：{cat.priceFrom.toLocaleString()}円〜/{cat.unit}</p>
            )}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* 地域情報 */}
          <section className="mb-8 bg-white border border-border p-5">
            <h2 className="text-lg text-sumi mb-3" style={{ fontFamily: "var(--font-serif)" }}>
              {cityData.name}の{cat.name}について
            </h2>
            <p className="text-sm text-sumi/70 leading-relaxed">
              {cityData.name}エリアで{cat.name}を探しているなら、日本畳パートナーで料金・口コミ・対応エリアを比較できます。
              {cat.priceFrom && `料金の目安は${cat.priceFrom.toLocaleString()}円/${cat.unit}〜です。`}
              複数の業者に見積もりを依頼して、最適な業者を選びましょう。
            </p>
          </section>

          {/* 業者一覧 */}
          <section className="mb-10">
            <h2 className="text-xl text-sumi mb-5" style={{ fontFamily: "var(--font-serif)" }}>
              {cityData.name}対応の{cat.name}業者
            </h2>
            {providers.length === 0 ? (
              <div className="bg-white border border-border p-8 text-center">
                <p className="text-sm text-sumi/50 mb-4">{cityData.name}エリアに登録された業者はまだ少ないです</p>
                <Link href="/search" className="text-sm text-ai border border-ai px-4 py-2 hover:bg-ai hover:text-white transition-all duration-300">
                  埼玉県全体で探す
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {providers.map((p) => (
                  <ProviderCard key={p.id} provider={p} showFavorite />
                ))}
              </div>
            )}
          </section>

          {/* 近隣エリアへのリンク */}
          <section className="mb-8">
            <h2 className="text-lg text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>
              近隣エリアの{cat.name}
            </h2>
            <div className="flex flex-wrap gap-3">
              {nearCities.slice(0, 8).map((c) => (
                <Link
                  key={c.slug}
                  href={`/saitama/${c.slug}/${category}`}
                  className="text-sm border border-border text-sumi/70 hover:border-ai hover:text-ai transition-colors px-4 py-2"
                >
                  {c.name}の{cat.shortName}
                </Link>
              ))}
            </div>
          </section>

          {/* 関連カテゴリ */}
          <section className="mb-8">
            <h2 className="text-lg text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>
              {cityData.name}の関連サービス
            </h2>
            <div className="flex flex-wrap gap-3">
              {SERVICE_CATEGORIES.filter((c) => c.group === cat.group && c.slug !== category).slice(0, 6).map((c) => (
                <Link
                  key={c.slug}
                  href={`/saitama/${city}/${c.slug}`}
                  className="text-sm border border-border text-sumi/70 hover:border-ai hover:text-ai transition-colors px-4 py-2"
                >
                  {cityData.name}の{c.name}
                </Link>
              ))}
            </div>
          </section>

          <FAQSection
            items={[
              { question: `${cityData.name}の${cat.name}の料金は？`, answer: cat.priceFrom ? `${cityData.name}での${cat.name}は${cat.priceFrom.toLocaleString()}円/${cat.unit}〜が目安です。複数業者に見積もりを依頼することをおすすめします。` : "業者によって異なります。無料見積もりでご確認ください。" },
              { question: `${cityData.name}で${cat.name}に対応している業者はいますか？`, answer: `日本畳パートナーには${cityData.name}エリアに対応した業者が掲載されています。上記の一覧から料金・口コミで比較して選んでください。` },
              { question: `${cityData.name}の${cat.name}はどれくらいで完了しますか？`, answer: `作業時間は畳数・業者によって異なります。一般的な6畳なら半日〜1日が目安です。見積もり時に業者に確認してください。` },
            ]}
            title={`${cityData.name}の${cat.name}に関するQ&A`}
          />
        </div>

        <CityLinkGrid categorySlug={category} currentCitySlug={city} title="他の市区町村でも探す" />
      </div>
    </>
  );
}
