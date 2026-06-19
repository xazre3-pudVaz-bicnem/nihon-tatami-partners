import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import ProviderCard from "@/components/common/ProviderCard";
import FAQSection from "@/components/common/FAQSection";
import CityLinkGrid from "@/components/common/CityLinkGrid";
import ThreeStepFlow from "@/components/common/ThreeStepFlow";
import { getCategoryBySlug, SERVICE_CATEGORIES } from "@/data/categories";
import { getCityBySlug, SAITAMA_CITIES } from "@/data/cities";
import { getProvidersByCity } from "@/data/providers";
import { SITE_URL } from "@/lib/metadata";

interface Props {
  params: Promise<{ category: string; city: string }>;
}

export async function generateStaticParams() {
  const pairs: { category: string; city: string }[] = [];
  for (const cat of SERVICE_CATEGORIES) {
    for (const city of SAITAMA_CITIES) {
      pairs.push({ category: cat.slug, city: city.slug });
    }
  }
  return pairs;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, city } = await params;
  const cat = getCategoryBySlug(category);
  const cityData = getCityBySlug(city);
  if (!cat || !cityData) return {};
  return {
    title: `${cityData.name}の${cat.name}を料金と口コミで比較！おすすめ業者ランキング | 日本畳パートナー`,
    description: `${cityData.name}（埼玉県）の${cat.name}業者を料金・口コミで比較。${cat.priceFrom ? `料金目安は${cat.priceFrom.toLocaleString()}円/${cat.unit}〜。` : ""}無料で見積もり依頼できます。`,
    keywords: [`${cityData.name} ${cat.name}`, `${cityData.name} ${cat.shortName}`, `${cityData.name} ${cat.shortName} 料金`],
    openGraph: {
      title: `${cityData.name}の${cat.name}を料金と口コミで比較！おすすめ業者ランキング`,
      description: `${cityData.name}の${cat.name}業者を比較。無料で見積もり依頼できます。`,
      locale: "ja_JP",
      type: "website",
    },
    alternates: { canonical: `${SITE_URL}/${category}/saitama/${city}` },
  };
}

export default async function CityCategoryPage({ params }: Props) {
  const { category, city } = await params;
  const cat = getCategoryBySlug(category);
  const cityData = getCityBySlug(city);
  if (!cat || !cityData) notFound();

  const providers = getProvidersByCity(cityData.name).sort((a, b) => (a.rank ?? 99) - (b.rank ?? 99));
  const nearCities = SAITAMA_CITIES.filter((c) => c.slug !== city).slice(0, 8);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "トップ", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: cat.name, item: `${SITE_URL}/${category}` },
      { "@type": "ListItem", position: 3, name: "埼玉県", item: `${SITE_URL}/${category}/saitama` },
      { "@type": "ListItem", position: 4, name: cityData.name, item: `${SITE_URL}/${category}/saitama/${city}` },
    ],
  };

  const faqItems = [
    {
      question: `${cityData.name}の${cat.name}の料金は？`,
      answer: cat.priceFrom
        ? `${cityData.name}での${cat.name}は${cat.priceFrom.toLocaleString()}円/${cat.unit}〜が目安です。使用する素材（標準い草・国産高級い草・和紙畳等）や枚数によって変わります。上記の業者に無料見積もりを依頼してください。`
        : `料金は業者・素材・枚数によって異なります。無料見積もりでご確認ください。`,
    },
    {
      question: `${cityData.name}で${cat.name}業者を選ぶポイントは？`,
      answer: `一級畳製作技能士などの国家資格・施工実績・口コミ評価を参考に選んでください。${cityData.name}エリアの地元業者は、地域の住宅事情に精通しており、アフターフォローも受けやすいのでおすすめです。`,
    },
    {
      question: `${cityData.name}の${cat.name}はいつ頃依頼すればいい？`,
      answer: `春（3〜5月）と秋（9〜11月）は畳の施工に最適なシーズンです。湿度が安定しており、乾燥も早くなります。年末の大掃除前（11〜12月）も需要が集中するため、早めのご予約をおすすめします。`,
    },
    {
      question: `${cityData.name}の${cat.name}業者への依頼方法は？`,
      answer: `上記の業者一覧から気になる業者を選び「詳細・予約する」をクリック。日時を入力してネット予約できます。無料見積もりを希望する場合はメッセージで相談することもできます。`,
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqItems.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) }) }} />

      <div className="min-h-screen bg-shiro">
        <div className="bg-sumi">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumbs items={[
              { label: "トップ", href: "/" },
              { label: cat.name, href: `/${category}` },
              { label: "埼玉県", href: `/saitama` },
              { label: cityData.name },
            ]} />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 pt-2">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl text-white mb-2 leading-tight" style={{ fontFamily: "var(--font-serif)" }}>
                  {cityData.name}の{cat.name}を料金と口コミで比較！
                  <span className="block text-xl md:text-2xl mt-1">おすすめ業者ランキング</span>
                </h1>
                <p className="text-sm text-white/60">{cityData.description}</p>
              </div>
              {cat.priceFrom && (
                <div className="shrink-0 hidden sm:block bg-white/10 border border-white/20 p-4 text-center">
                  <p className="text-xs text-white/60 mb-0.5">料金目安</p>
                  <p className="text-2xl text-kincya font-bold">¥{cat.priceFrom.toLocaleString()}</p>
                  <p className="text-xs text-white/50">〜/{cat.unit}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 3ステップ */}
        <ThreeStepFlow categoryName={cat.name} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* ソート */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-kiji">
            <p className="text-sm text-sumi">
              <span className="text-lg font-bold">{providers.length}</span>件の業者
            </p>
            <div className="flex gap-1.5 flex-wrap justify-end">
              {["おすすめ順", "料金が安い順", "口コミが多い順", "評価が高い順"].map((label, i) => (
                <button key={label} className={`text-xs px-3 py-1 border transition-colors ${i === 0 ? "border-ai bg-ai text-white" : "border-border text-sumi/60 hover:border-ai hover:text-ai"}`}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* 業者一覧 */}
          {providers.length === 0 ? (
            <div className="bg-white border border-border p-10 text-center mb-8">
              <p className="text-sm text-sumi/50 mb-2">{cityData.name}エリアに登録された{cat.name}業者はまだ少ないです</p>
              <p className="text-xs text-sumi/40 mb-4">近隣エリアの業者もご検討ください</p>
              <Link href={`/${category}`} className="text-sm text-white bg-ai px-6 py-2 hover:opacity-80 transition-opacity inline-block">
                埼玉全体で探す
              </Link>
            </div>
          ) : (
            <div className="space-y-3 mb-10">
              {providers.map((p, i) => (
                <ProviderCard key={p.id} provider={p} variant="list" rank={i + 1} showFavorite />
              ))}
            </div>
          )}

          {/* SEOコンテンツ */}
          <section className="bg-white border border-border p-5 mb-8">
            <h2 className="text-lg text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>
              {cityData.name}の{cat.name}について
            </h2>
            <div className="text-sm text-sumi/70 leading-relaxed space-y-3">
              <p>
                {cityData.name}で{cat.name}をお探しなら、日本畳パートナーで料金・口コミ・対応エリアを比較して選べます。
                {cat.priceFrom && `${cityData.name}での${cat.name}の料金目安は${cat.priceFrom.toLocaleString()}円/${cat.unit}〜です。`}
              </p>
              <p>
                掲載業者はすべて当サービスの審査を通過した業者のみです。一級畳製作技能士・損害賠償保険加入などの条件を満たした業者を掲載しています。口コミと評価で安心して選んでください。
              </p>
              {cat.group === "tatami" && (
                <p>
                  畳工事は春（3〜5月）・秋（9〜11月）が最適シーズンです。{cityData.name}エリアの地元業者は地域の住宅事情に精通しており、迅速な対応が期待できます。
                </p>
              )}
            </div>
          </section>

          {/* 近隣エリア */}
          <section className="mb-8">
            <h2 className="text-lg text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>
              近隣エリアの{cat.name}業者
            </h2>
            <div className="flex flex-wrap gap-2">
              {nearCities.map((c) => (
                <Link
                  key={c.slug}
                  href={`/${category}/saitama/${c.slug}`}
                  className="text-sm border border-border text-sumi/70 hover:border-ai hover:text-ai transition-colors px-3 py-2"
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
            <div className="flex flex-wrap gap-2">
              {SERVICE_CATEGORIES.filter((c) => c.group === cat.group && c.slug !== category).slice(0, 6).map((c) => (
                <Link
                  key={c.slug}
                  href={`/${c.slug}/saitama/${city}`}
                  className="text-sm border border-border text-sumi/70 hover:border-ai hover:text-ai transition-colors px-3 py-2"
                >
                  {cityData.name}の{c.name}
                </Link>
              ))}
            </div>
          </section>

          <FAQSection items={faqItems} title={`${cityData.name}の${cat.name}に関するQ&A`} />
        </div>

        <CityLinkGrid categorySlug={category} currentCitySlug={city} title={`他のエリアの${cat.name}`} />
      </div>
    </>
  );
}
