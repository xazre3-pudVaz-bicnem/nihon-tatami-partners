import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import ProviderCard from "@/components/common/ProviderCard";
import FAQSection from "@/components/common/FAQSection";
import CityLinkGrid from "@/components/common/CityLinkGrid";
import ThreeStepFlow from "@/components/common/ThreeStepFlow";
import WhyChooseUs from "@/components/common/WhyChooseUs";
import { getCategoryBySlug, SERVICE_CATEGORIES, CATEGORY_GROUP_LABELS } from "@/data/categories";
import { MOCK_PROVIDERS } from "@/data/providers";
import { SAITAMA_CITIES } from "@/data/cities";
import { SITE_URL } from "@/lib/metadata";

interface Props {
  params: Promise<{ category: string }>;
}

// 静的に生成するのはカテゴリslugのみ（他のトップレベルルートと衝突しないよう）
export async function generateStaticParams() {
  return SERVICE_CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) return {};
  return {
    title: `埼玉の${cat.name}を料金と口コミで比較！おすすめ業者ランキング | 日本畳パートナー`,
    description: `埼玉県の${cat.name}業者を料金・口コミで比較。${cat.priceFrom ? `料金目安は${cat.priceFrom.toLocaleString()}円/${cat.unit}〜。` : ""}無料で見積もり依頼できます。${cat.description}`,
    keywords: [`埼玉 ${cat.name}`, `${cat.name} 埼玉`, `埼玉 ${cat.shortName} 料金`, `埼玉 ${cat.shortName} 業者`],
    openGraph: {
      title: `埼玉の${cat.name}を料金と口コミで比較！おすすめ業者ランキング`,
      description: `${cat.description}無料で見積もり依頼できます。`,
      locale: "ja_JP",
      type: "website",
    },
    alternates: { canonical: `${SITE_URL}/${category}` },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) notFound();

  // 全業者（カテゴリフィルタは本実装でProviderServiceに基づく）
  const providers = MOCK_PROVIDERS.filter((p) => p.status === "active").sort((a, b) => (a.rank ?? 99) - (b.rank ?? 99));

  const popularCities = SAITAMA_CITIES.slice(0, 12);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "トップ", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: cat.name, item: `${SITE_URL}/${category}` },
    ],
  };

  const faqItems = [
    {
      question: `埼玉の${cat.name}の料金相場は？`,
      answer: cat.priceFrom
        ? `埼玉での${cat.name}の料金相場は${cat.priceFrom.toLocaleString()}円/${cat.unit}〜です。素材の種類・枚数・業者によって異なります。複数の業者に無料見積もりを依頼して比較することをおすすめします。`
        : `${cat.name}の料金は業者・素材・枚数によって異なります。無料見積もりで各業者の料金をご確認ください。`,
    },
    {
      question: `${cat.name}はどのくらいの時間がかかりますか？`,
      answer: `${cat.name}の作業時間は畳数や状況によって異なります。一般的な6畳の場合、当日中（約2〜4時間）で完了することがほとんどです。大量施工や特殊な場合は複数日になることもあります。`,
    },
    {
      question: `${cat.name}業者はどう選べばいいですか？`,
      answer: `一級畳製作技能士などの資格・施工実績・口コミ評価を参考にしてください。また、損害賠償保険の加入有無、無料見積もりの対応可否、土日対応などで比較するのがおすすめです。`,
    },
    {
      question: `${cat.name}で追加料金が発生することはありますか？`,
      answer: `家具の移動が必要な場合や、駐車場がない場合に別途料金が発生することがあります。見積もり時に必ず確認してください。掲載業者は料金を明示していますが、現地確認後に最終確認となる場合があります。`,
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqItems.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) }) }} />

      <div className="min-h-screen bg-shiro">
        {/* ヘッダー */}
        <div className="bg-sumi">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumbs items={[{ label: "トップ", href: "/" }, { label: cat.name }]} />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 pt-2">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs text-white/40 mb-1">{CATEGORY_GROUP_LABELS[cat.group]}</p>
                <h1 className="text-2xl md:text-3xl text-white mb-2 leading-tight" style={{ fontFamily: "var(--font-serif)" }}>
                  埼玉の{cat.name}を料金と口コミで比較！
                  <span className="block text-xl md:text-2xl mt-1">おすすめ業者ランキング</span>
                </h1>
                <p className="text-sm text-white/60 max-w-2xl">{cat.description}</p>
              </div>
              {cat.priceFrom && (
                <div className="shrink-0 hidden sm:block bg-white/10 border border-white/20 p-4 text-center">
                  <p className="text-xs text-white/60 mb-0.5">料金目安</p>
                  <p className="text-2xl text-kincya font-bold">¥{cat.priceFrom.toLocaleString()}</p>
                  <p className="text-xs text-white/50">〜/{cat.unit}</p>
                </div>
              )}
            </div>

            {/* 絞り込みタブ（モバイル対応） */}
            <div className="mt-5 flex gap-2 flex-wrap">
              {["すべて", "一級技能士", "即日対応", "国産い草", "無料見積もり"].map((filter, i) => (
                <button key={filter} className={`text-xs px-3 py-1.5 border transition-colors ${i === 0 ? "border-kincya bg-kincya text-white" : "border-white/30 text-white/70 hover:border-white hover:text-white"}`}>
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 3ステップフロー */}
        <ThreeStepFlow categoryName={cat.name} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* ソート */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-kiji">
            <p className="text-sm text-sumi">
              <span className="text-lg font-bold text-sumi">{providers.length}</span>件の業者
            </p>
            <div className="flex gap-1.5 flex-wrap justify-end">
              {["おすすめ順", "料金が安い順", "口コミが多い順", "評価が高い順"].map((label, i) => (
                <button key={label} className={`text-xs px-3 py-1 border transition-colors ${i === 0 ? "border-ai bg-ai text-white" : "border-border text-sumi/60 hover:border-ai hover:text-ai"}`}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* 業者一覧 — list variant */}
          <div className="space-y-3 mb-10">
            {providers.map((p, i) => (
              <ProviderCard key={p.id} provider={p} variant="list" rank={i + 1} showFavorite />
            ))}
          </div>

          {/* 価格相場テーブル */}
          <section className="bg-white border border-border p-5 mb-8">
            <h2 className="text-lg text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>{cat.name}の料金相場</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-kiji">
                    <th className="text-left text-xs text-sumi/50 font-normal py-2 pr-6">種類</th>
                    <th className="text-left text-xs text-sumi/50 font-normal py-2 pr-6">料金目安</th>
                    <th className="text-left text-xs text-sumi/50 font-normal py-2">特徴</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-kiji">
                  {[
                    { type: "標準（外国産い草）", price: `¥${cat.priceFrom?.toLocaleString() ?? "3,800"}〜/${cat.unit}`, desc: "コストパフォーマンス重視。一般的な住宅に最適" },
                    { type: "国産い草", price: `¥${((cat.priceFrom ?? 3800) * 2).toLocaleString()}〜/${cat.unit}`, desc: "香りと質感が優れた純国産。こだわりたい方に" },
                    { type: "和紙・樹脂畳", price: `¥${((cat.priceFrom ?? 3800) * 2.5).toLocaleString()}〜/${cat.unit}`, desc: "ダニ・カビに強く耐久性が高い" },
                  ].map((row) => (
                    <tr key={row.type}>
                      <td className="py-3 pr-6 text-sumi">{row.type}</td>
                      <td className="py-3 pr-6 text-kincya font-medium">{row.price}</td>
                      <td className="py-3 text-sumi/60 text-xs">{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-sumi/40 mt-3">※上記は参考価格です。実際の料金は業者・素材・枚数・建物の状況によって異なります。</p>
          </section>

          {/* 市区町村リンク */}
          <section className="mb-8">
            <h2 className="text-lg text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>
              エリアから{cat.name}業者を探す
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2">
              {popularCities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/${category}/saitama/${city.slug}`}
                  className="text-sm border border-border text-sumi/70 hover:border-ai hover:text-ai hover:bg-ai/5 transition-all px-3 py-2 text-center"
                >
                  {city.name}
                </Link>
              ))}
            </div>
            <div className="mt-3">
              <Link href="/saitama" className="text-xs text-ai hover:underline">
                埼玉県の全市区町村を見る →
              </Link>
            </div>
          </section>

          {/* FAQ */}
          <FAQSection items={faqItems} title={`${cat.name}に関するよくある質問`} />
        </div>

        {/* 選ばれる理由 */}
        <div className="bg-kiji/30">
          <WhyChooseUs />
        </div>

        {/* 関連カテゴリ */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="text-lg text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>関連するサービス</h2>
          <div className="flex flex-wrap gap-3">
            {SERVICE_CATEGORIES.filter((c) => c.group === cat.group && c.slug !== category).slice(0, 8).map((c) => (
              <Link
                key={c.slug}
                href={`/${c.slug}`}
                className="text-sm border border-border text-sumi/70 hover:border-ai hover:text-ai transition-colors px-4 py-2"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>

        <CityLinkGrid categorySlug={category} title={`市区町村から${cat.name}業者を探す`} />
      </div>
    </>
  );
}
