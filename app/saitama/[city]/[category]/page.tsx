import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import ProviderCard from "@/components/common/ProviderCard";
import CityLinkGrid from "@/components/common/CityLinkGrid";
import FAQSection from "@/components/common/FAQSection";
import { SERVICE_CATEGORIES } from "@/data/categories";
import { SAITAMA_CITIES, getCityBySlug } from "@/data/cities";
import { getProvidersByCity } from "@/data/providers";
import { getCityConfigBySlug, getNearbyCities } from "@/config/cities";
import { getCategoryConfigBySlug } from "@/config/categories";
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
  const cat = getCategoryConfigBySlug(category) ?? undefined;
  const catName = cat?.name ?? SERVICE_CATEGORIES.find((c) => c.slug === category)?.name;
  if (!cityData || !catName) return {};
  return {
    title: `${cityData.name}の${catName}業者を比較 | 料金・口コミで選べる | 日本畳パートナーズ`,
    description: `${cityData.name}（埼玉県）の${catName}業者を料金・口コミ・対応エリアで比較。${cat?.seoDescription ?? ""}無料で見積もり相談ができます。`,
    alternates: { canonical: `${SITE_URL}/saitama/${city}/${category}` },
    robots: "index,follow",
  };
}

export default async function CityCategoryPage({ params }: Props) {
  const { city, category } = await params;
  const cityData = getCityBySlug(city);
  const cityCfg = getCityConfigBySlug(city);
  const cat = getCategoryConfigBySlug(category);
  const legacyCat = SERVICE_CATEGORIES.find((c) => c.slug === category);
  if (!cityData || (!cat && !legacyCat)) notFound();

  const catName = cat?.name ?? legacyCat!.name;
  const catShort = cat?.shortName ?? legacyCat!.shortName;
  const priceFrom = cat?.priceFrom ?? legacyCat?.priceFrom;
  const unit = cat?.unit ?? legacyCat?.unit ?? "枚";

  const providers = getProvidersByCity(cityData.name);
  const nearby = getNearbyCities(city);
  const fallbackNear = SAITAMA_CITIES.filter((c) => c.slug !== city).slice(0, 6);
  const nearCities = nearby.length ? nearby : fallbackNear.map((c) => ({ slug: c.slug, name: c.name }));

  const faqs = [
    {
      question: `${cityData.name}の${catName}の料金相場は？`,
      answer: priceFrom
        ? `${cityData.name}での${catName}は${priceFrom.toLocaleString()}円/${unit}〜が目安です。素材や状態によって変動するため、複数業者に見積もりを依頼して比較することをおすすめします。`
        : "業者・内容によって異なります。無料見積もりで確認してください。",
    },
    {
      question: `${cityData.name}で${catName}に対応している業者はいますか？`,
      answer: `日本畳パートナーズには${cityData.name}エリアに対応する業者が掲載されています。一覧から料金・口コミで比較して選べます。`,
    },
    {
      question: `${cityData.name}の${catName}はどれくらいで完了しますか？`,
      answer: "作業時間は畳数・内容・業者によって異なります。一般的な6畳の表替えなら半日〜1日が目安です。見積もり時に確認してください。",
    },
    {
      question: "見積もりは無料ですか？",
      answer: "多くの掲載業者が無料見積もりに対応しています。気になる業者に複数依頼して比較するのがおすすめです。",
    },
  ];

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "トップ", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "埼玉県", item: `${SITE_URL}/saitama` },
      { "@type": "ListItem", position: 3, name: cityData.name, item: `${SITE_URL}/saitama/${city}` },
      { "@type": "ListItem", position: 4, name: catName, item: `${SITE_URL}/saitama/${city}/${category}` },
    ],
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: catName,
    areaServed: { "@type": "City", name: cityData.name },
    provider: { "@type": "Organization", name: "日本畳パートナーズ", url: SITE_URL },
    description: `${cityData.name}の${catName}業者の比較・見積もりサービス`,
    ...(priceFrom
      ? { offers: { "@type": "Offer", priceCurrency: "JPY", price: priceFrom, priceSpecification: { "@type": "UnitPriceSpecification", price: priceFrom, priceCurrency: "JPY", unitText: unit } } }
      : {}),
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
  };

  const points = [
    "料金だけでなく口コミ評価・施工実績を確認する",
    "一級畳製作技能士の在籍や保険加入の有無をチェックする",
    "使用する素材（国産い草・和紙・樹脂など）の希望を伝える",
    "見積もりは複数業者から取り、内訳まで比較する",
    "家具移動・古畳処分が料金に含まれるか確認する",
  ];

  const flow = [
    { step: "01", title: "業者を探す", desc: `${cityData.name}対応の業者を料金・口コミで比較` },
    { step: "02", title: "無料見積もり", desc: "気になる業者に見積もりを依頼。複数社で比較" },
    { step: "03", title: "日程調整・施工", desc: "内容と日程を確定し、施工を実施" },
    { step: "04", title: "完了・口コミ", desc: "仕上がりを確認。口コミ投稿で他のユーザーへ" },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="min-h-screen bg-shiro">
        {/* ヘッダー */}
        <div className="bg-sumi">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumbs
              variant="dark"
              items={[
                { label: "トップ", href: "/" },
                { label: "埼玉県", href: "/saitama" },
                { label: cityData.name, href: `/saitama/${city}` },
                { label: catName },
              ]}
            />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 pt-4">
            <h1 className="text-2xl md:text-3xl text-white mb-3" style={{ fontFamily: "var(--font-serif)" }}>
              {cityData.name}の{catName}業者を比較｜料金・口コミで選べる
            </h1>
            <p className="text-sm text-white/60 max-w-2xl">
              {cityCfg?.seoNote ?? cityData.description}
            </p>
            {priceFrom !== undefined && priceFrom > 0 && (
              <p className="text-sm text-kincya mt-2">料金目安：{priceFrom.toLocaleString()}円〜/{unit}</p>
            )}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* リード文 */}
          <section className="mb-8 bg-white border border-border p-6">
            <h2 className="text-lg text-sumi mb-3" style={{ fontFamily: "var(--font-serif)" }}>
              {cityData.name}で{catName}を依頼するなら
            </h2>
            <p className="text-sm text-sumi/70 leading-relaxed">
              {cityData.name}エリアで{catName}を探しているなら、日本畳パートナーズで料金・口コミ・対応エリア・資格をまとめて比較できます。
              {cat?.description ?? legacyCat?.description}
              {priceFrom ? `料金の目安は${priceFrom.toLocaleString()}円/${unit}〜です。` : ""}
              無料で複数業者に見積もりを依頼でき、納得のいく1社を選べます。
            </p>
          </section>

          {/* 料金相場 */}
          <section className="mb-10 bg-kiji/40 border border-kiji p-6">
            <h2 className="text-lg text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>
              {catName}の料金相場
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-kiji text-left text-sumi/50 text-xs">
                    <th className="py-2 pr-4">グレード・素材</th>
                    <th className="py-2 pr-4">料金目安（1{unit}あたり）</th>
                  </tr>
                </thead>
                <tbody className="text-sumi/80">
                  {priceFrom ? (
                    <>
                      <tr className="border-b border-kiji/60">
                        <td className="py-2.5 pr-4">普及品</td>
                        <td className="py-2.5 pr-4">{priceFrom.toLocaleString()}円〜</td>
                      </tr>
                      <tr className="border-b border-kiji/60">
                        <td className="py-2.5 pr-4">中級品（国産い草など）</td>
                        <td className="py-2.5 pr-4">{Math.round(priceFrom * 1.6).toLocaleString()}円〜</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 pr-4">高級品（特選品・和紙・樹脂）</td>
                        <td className="py-2.5 pr-4">{Math.round(priceFrom * 2.4).toLocaleString()}円〜</td>
                      </tr>
                    </>
                  ) : (
                    <tr>
                      <td className="py-2.5 pr-4">内容により変動</td>
                      <td className="py-2.5 pr-4">無料見積もりで確認</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-sumi/40 mt-3">
              ※上記は一般的な目安です。畳数・状態・地域・業者により変動します。正確な金額は見積もりでご確認ください。
            </p>
          </section>

          {/* 業者一覧 */}
          <section className="mb-10">
            <h2 className="text-xl text-sumi mb-5" style={{ fontFamily: "var(--font-serif)" }}>
              {cityData.name}対応の{catName}業者
            </h2>
            {providers.length === 0 ? (
              <div className="bg-white border border-border p-8 text-center">
                <p className="text-sm text-sumi/50 mb-4">{cityData.name}エリアに登録された業者はまだ少ないです</p>
                <Link href="/search" className="text-sm text-ai border border-ai px-4 py-2 hover:bg-ai hover:text-white transition-all">
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

          {/* 業者選びのポイント */}
          <section className="mb-10 bg-white border border-border p-6">
            <h2 className="text-lg text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>
              {catName}業者選びのポイント
            </h2>
            <ul className="space-y-2">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-2 text-sm text-sumi/70">
                  <span className="text-igusa mt-0.5">✓</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 施工の流れ */}
          <section className="mb-10">
            <h2 className="text-lg text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>
              依頼から施工までの流れ
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {flow.map((f) => (
                <div key={f.step} className="bg-white border border-border p-4">
                  <span className="text-kincya text-sm font-bold">{f.step}</span>
                  <h3 className="text-sm text-sumi mt-1 mb-1">{f.title}</h3>
                  <p className="text-xs text-sumi/60 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 近隣エリア */}
          <section className="mb-8">
            <h2 className="text-lg text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>
              近隣エリアの{catName}
            </h2>
            <div className="flex flex-wrap gap-3">
              {nearCities.slice(0, 8).map((c) => (
                <Link
                  key={c.slug}
                  href={`/saitama/${c.slug}/${category}`}
                  className="text-sm border border-border text-sumi/70 hover:border-ai hover:text-ai transition-colors px-4 py-2"
                >
                  {c.name}の{catShort}
                </Link>
              ))}
            </div>
          </section>

          {/* 関連サービス */}
          <section className="mb-8">
            <h2 className="text-lg text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>
              {cityData.name}の関連サービス
            </h2>
            <div className="flex flex-wrap gap-3">
              {SERVICE_CATEGORIES.filter((c) => c.group === (legacyCat?.group ?? "tatami") && c.slug !== category)
                .slice(0, 6)
                .map((c) => (
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

          <FAQSection items={faqs} title={`${cityData.name}の${catName}に関するQ&A`} />
        </div>

        <CityLinkGrid categorySlug={category} currentCitySlug={city} title="他の市区町村でも探す" />
      </div>
    </>
  );
}
