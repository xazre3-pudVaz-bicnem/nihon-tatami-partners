import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import ProviderCard from "@/components/common/ProviderCard";
import CityLinkGrid from "@/components/common/CityLinkGrid";
import FAQSection from "@/components/common/FAQSection";
import { POPULAR_CATEGORIES } from "@/data/categories";
import { getTopProviders } from "@/data/providers";
import { SAITAMA_CITIES, NEAR_TOKYO_CITIES, CENTRAL_CITIES, WEST_CITIES, EAST_CITIES } from "@/data/cities";
import { SITE_URL } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "埼玉の畳表替え・畳業者を料金と口コミで比較して選ぶ | 日本畳パートナーズ",
  description: "埼玉県の畳表替え・畳新調・裏返し・和室リフォームに対応した専門業者を料金・口コミで比較。さいたま市・川口市・川越市・越谷市など埼玉県31市区町村対応。無料で見積もり依頼できます。",
  keywords: [
    "埼玉 畳", "埼玉 畳 表替え", "埼玉 畳業者", "埼玉 畳 張替え",
    "さいたま市 畳", "川口市 畳", "川越市 畳", "越谷市 畳",
    "埼玉 和室 リフォーム", "埼玉 ふすま 張替え", "埼玉 畳 料金",
  ],
  openGraph: {
    title: "埼玉の畳表替え・畳業者を料金と口コミで比較して選ぶ | 日本畳パートナーズ",
    description: "埼玉県の畳表替え・畳業者を料金・口コミで比較。さいたま市・川口市・川越市など31市区町村対応。",
    url: `${SITE_URL}/saitama`,
    locale: "ja_JP",
    type: "website",
    images: [{ url: `${SITE_URL}/og-saitama.jpg`, width: 1200, height: 630, alt: "埼玉の畳業者 比較" }],
  },
  alternates: { canonical: `${SITE_URL}/saitama` },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "トップ", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "埼玉県の畳・和室工事", item: `${SITE_URL}/saitama` },
  ],
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "埼玉県の畳・和室工事マッチングサービス",
  description: "埼玉県内の畳表替え・畳新調・裏返し・琉球畳・和紙畳・ふすま・障子張替え・和室リフォームに対応した専門業者を紹介するサービス",
  provider: {
    "@type": "Organization",
    name: "日本畳パートナーズ",
    url: SITE_URL,
  },
  areaServed: {
    "@type": "State",
    name: "埼玉県",
    sameAs: "https://ja.wikipedia.org/wiki/埼玉県",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "畳・和室工事サービス一覧",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "畳表替え", description: "畳の表面（ゴザ）を新しいものに張り替える工事" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "畳裏返し", description: "畳表を裏返して再利用する中間メンテナンス" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "畳新調", description: "畳全体を新品に交換する工事" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "琉球畳", description: "縁なし半畳タイプの現代的な畳への交換" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "和紙畳", description: "撥水性・耐久性の高い和紙素材の畳への交換" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "ふすま張替え", description: "ふすま紙を新しいものに張り替える工事" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "障子張替え", description: "障子紙を新しいものに張り替える工事" } },
    ],
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "埼玉県の畳表替えの料金相場はいくらですか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "埼玉県での畳表替えは1枚あたり3,800円〜8,000円（一般い草）が目安です。国産高級い草は8,000〜15,000円程度になります。6畳なら合計20,000〜50,000円前後が相場です。琉球畳・和紙畳はさらに高くなります。正確な料金は無料見積もりでご確認ください。",
      },
    },
    {
      "@type": "Question",
      name: "さいたま市で畳表替えを依頼したい。どこに頼めばいいですか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "さいたま市（浦和・大宮・与野・岩槻エリア）の畳業者を日本畳パートナーズで比較できます。料金・口コミ・対応エリア・施工実績を一覧で確認し、写真見積もりや出張見積もりを無料で依頼できます。",
      },
    },
    {
      "@type": "Question",
      name: "川口市の畳業者を探しています。",
      acceptedAnswer: {
        "@type": "Answer",
        text: "川口市は東京に隣接する住宅地で、マンション・アパート・一般住宅の畳工事ニーズが高いエリアです。日本畳パートナーズで川口市対応の畳業者を料金・口コミで比較できます。",
      },
    },
    {
      "@type": "Question",
      name: "埼玉県の賃貸物件・退去時の畳張替えはどこに依頼すればいいですか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "管理会社・不動産会社が手配するのが一般的ですが、個人の賃貸オーナーの方も直接業者に依頼できます。日本畳パートナーズの「原状回復・賃貸退去対応」カテゴリから業者を探せます。",
      },
    },
    {
      "@type": "Question",
      name: "埼玉県で旅館・寺社・神社の畳工事を依頼できますか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "はい、川越・秩父・飯能など埼玉県内の旅館・宿泊施設・寺院・神社の畳工事に対応した業者も掲載しています。「旅館対応」「寺社対応」で絞り込んで探せます。",
      },
    },
    {
      "@type": "Question",
      name: "埼玉県の畳工事は何月に依頼するのがベストですか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "畳工事は春（3〜5月）と秋（9〜11月）が最適シーズンです。湿度が安定しており、い草が乾きやすく仕上がりが良くなります。年末（11〜12月）は需要が集中するため早めの予約をおすすめします。",
      },
    },
    {
      "@type": "Question",
      name: "畳の表替えと新調・裏返しの違いは何ですか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "表替えは畳の表面（ゴザ）だけを新しくする工事です。裏返しはゴザを裏面にして再利用する中間メンテナンスです。新調は畳全体（床・縁・ゴザ）を新品に交換します。一般的に裏返し→表替え→新調の順でコストが上がります。",
      },
    },
    {
      "@type": "Question",
      name: "埼玉県で即日対応・土日対応できる畳業者はいますか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "はい、即日相談可能・土日対応の業者も掲載しています。検索・絞り込み機能で「即日相談」「土日対応」のフィルターをご利用ください。対応状況は業者によって異なります。",
      },
    },
  ],
};

const PRICE_TABLE = [
  { name: "畳表替え（一般い草）", unit: "3,800〜8,000円/枚", total6: "約23,000〜48,000円", link: "/saitama/tatami/omotegae" },
  { name: "畳裏返し", unit: "2,500〜5,000円/枚", total6: "約15,000〜30,000円", link: "/saitama/tatami/uragaeshi" },
  { name: "畳新調（藁床・建材床）", unit: "12,000〜25,000円/枚", total6: "約72,000〜150,000円", link: "/saitama/tatami/shinchou" },
  { name: "琉球畳（縁なし半畳）", unit: "15,000〜30,000円/枚", total6: "約90,000〜180,000円", link: "/saitama/tatami/ryukyu" },
  { name: "和紙畳", unit: "8,000〜15,000円/枚", total6: "約48,000〜90,000円", link: "/saitama/tatami/washi" },
  { name: "国産高級い草（畳表替え）", unit: "8,000〜20,000円/枚", total6: "約48,000〜120,000円", link: "/saitama/tatami/kokusan-igusa" },
  { name: "ふすま張替え", unit: "3,500〜8,000円/枚", total6: "4枚で約14,000〜32,000円", link: "/saitama/fusuma/harikae" },
  { name: "障子張替え", unit: "2,500〜5,000円/枚", total6: "2枚で約5,000〜10,000円", link: "/saitama/shoji/harikae" },
];

const AREA_GROUPS = [
  {
    label: "東京近接エリア",
    slugs: NEAR_TOKYO_CITIES,
    note: "川口・戸田・草加など東京に近い住宅密集エリア。マンション・アパートの畳工事が多い。",
  },
  {
    label: "さいたま・中央エリア",
    slugs: CENTRAL_CITIES,
    note: "さいたま市（大宮・浦和）を中心とする政令指定都市圏。一般住宅から大規模物件まで対応。",
  },
  {
    label: "川越・西部エリア",
    slugs: WEST_CITIES,
    note: "川越・所沢・飯能など歴史ある街並みが残るエリア。旅館・古民家の畳工事ニーズも高い。",
  },
  {
    label: "春日部・東部エリア",
    slugs: EAST_CITIES,
    note: "春日部・越谷・久喜など東部エリア。賃貸物件・戸建て住宅の畳工事が中心。",
  },
];

export default function SaitamaTopPage() {
  const providers = getTopProviders(6);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="min-h-screen bg-shiro">
        {/* ─── ヒーローヘッダー ─── */}
        <div className="bg-sumi">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumbs items={[
              { label: "トップ", href: "/" },
              { label: "埼玉県の畳・和室工事" },
            ]} />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 pt-4">
            <span className="inline-block text-xs text-kincya tracking-widest mb-3 border border-kincya/40 px-2 py-0.5">
              埼玉県 全31市区町村対応
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl text-white mt-2 mb-5 leading-tight" style={{ fontFamily: "var(--font-serif)" }}>
              埼玉の畳表替え・畳業者を<br className="hidden sm:block" />
              料金と口コミで比較して選ぶ
            </h1>
            <p className="text-sm text-white/65 max-w-2xl leading-loose mb-6">
              さいたま市・川口市・川越市・越谷市・所沢市など埼玉県全域の畳表替え・畳新調・裏返し・
              和室リフォーム・ふすま・障子張替え業者を料金・口コミ・施工実績で比較できます。
              無料で見積もり依頼・写真見積もりが可能です。
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/search"
                className="inline-flex items-center gap-2 bg-kincya text-white text-sm px-6 py-3 hover:bg-kincya/90 transition-colors"
              >
                業者を検索する
              </Link>
              <Link
                href="/bulk-quote/new"
                className="inline-flex items-center gap-2 border border-white/40 text-white text-sm px-6 py-3 hover:border-white hover:bg-white/10 transition-colors"
              >
                一括見積もりを依頼する
              </Link>
            </div>
          </div>
        </div>

        {/* ─── 信頼バッジ ─── */}
        <div className="bg-white border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-sumi/60">
              {[
                "埼玉県内 31市区町村対応",
                "畳・和室・内装 全工種対応",
                "無料見積もり可",
                "写真見積もり可",
                "土日・即日相談可（業者による）",
              ].map((label) => (
                <span key={label} className="flex items-center gap-1.5">
                  <span className="text-igusa">✓</span>
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

          {/* ─── 主要カテゴリ ─── */}
          <section className="mb-14">
            <div className="flex items-baseline gap-3 mb-6">
              <h2 className="text-xl text-sumi" style={{ fontFamily: "var(--font-serif)" }}>
                埼玉で探せる畳・和室サービス
              </h2>
              <Link href="/categories" className="text-xs text-ai hover:text-kincya transition-colors ml-auto shrink-0">
                全カテゴリを見る →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {POPULAR_CATEGORIES.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/saitama/${cat.slug}`}
                  className="group border border-border bg-white hover:border-kincya/50 hover:shadow-sm transition-all duration-300 p-4"
                >
                  <h3 className="text-sm text-sumi group-hover:text-ai transition-colors mb-1 leading-snug" style={{ fontFamily: "var(--font-serif)" }}>
                    {cat.name}
                  </h3>
                  {cat.priceFrom && (
                    <p className="text-xs text-sumi/40 mt-1">{cat.priceFrom.toLocaleString()}円〜/{cat.unit}</p>
                  )}
                  <p className="text-xs text-ai mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    業者を比較 →
                  </p>
                </Link>
              ))}
            </div>
          </section>

          {/* ─── 料金相場表 ─── */}
          <section className="mb-14 bg-white border border-border p-6">
            <h2 className="text-xl text-sumi mb-2" style={{ fontFamily: "var(--font-serif)" }}>
              埼玉県の畳・和室工事 料金相場（2025年版）
            </h2>
            <p className="text-xs text-sumi/50 mb-5">※料金は目安です。素材・現場状況・業者によって異なります。</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[500px]">
                <thead>
                  <tr className="bg-kiji text-left">
                    <th className="px-4 py-2.5 text-sumi/70 font-medium text-xs">サービス</th>
                    <th className="px-4 py-2.5 text-sumi/70 font-medium text-xs text-right">料金目安</th>
                    <th className="px-4 py-2.5 text-sumi/70 font-medium text-xs text-right hidden sm:table-cell">6畳概算</th>
                    <th className="px-4 py-2.5 text-sumi/70 font-medium text-xs"></th>
                  </tr>
                </thead>
                <tbody>
                  {PRICE_TABLE.map((row) => (
                    <tr key={row.name} className="border-b border-kiji last:border-0 hover:bg-kiji/50 transition-colors">
                      <td className="px-4 py-3 text-sumi/80 font-medium text-sm">{row.name}</td>
                      <td className="px-4 py-3 text-right text-kincya font-semibold text-sm whitespace-nowrap">{row.unit}</td>
                      <td className="px-4 py-3 text-right text-xs text-sumi/50 hidden sm:table-cell whitespace-nowrap">{row.total6}</td>
                      <td className="px-4 py-3 text-right">
                        <Link href={row.link} className="text-xs text-ai hover:text-kincya transition-colors whitespace-nowrap">
                          業者を探す →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/prices" className="text-xs border border-border text-sumi/60 hover:border-ai hover:text-ai transition-colors px-4 py-2">
                詳しい料金を見る
              </Link>
              <Link href="/bulk-quote/new" className="text-xs bg-kincya text-white hover:bg-kincya/90 transition-colors px-4 py-2">
                無料で一括見積もりを依頼する
              </Link>
            </div>
          </section>

          {/* ─── エリア別業者 ─── */}
          <section className="mb-14">
            <h2 className="text-xl text-sumi mb-2" style={{ fontFamily: "var(--font-serif)" }}>
              埼玉県のエリアから畳業者を探す
            </h2>
            <p className="text-sm text-sumi/60 mb-6">お住まいのエリアに近い畳業者を比較してお選びください。</p>
            <div className="space-y-6">
              {AREA_GROUPS.map((group) => {
                const cities = SAITAMA_CITIES.filter((c) => group.slugs.includes(c.id));
                if (cities.length === 0) return null;
                return (
                  <div key={group.label} className="bg-white border border-border p-5">
                    <h3 className="text-base text-sumi mb-1 font-medium" style={{ fontFamily: "var(--font-serif)" }}>
                      {group.label}
                    </h3>
                    <p className="text-xs text-sumi/55 mb-4 leading-relaxed">{group.note}</p>
                    <div className="flex flex-wrap gap-2">
                      {cities.map((city) => (
                        <Link
                          key={city.slug}
                          href={`/saitama/${city.slug}/tatami`}
                          className="text-sm border border-border text-sumi/70 hover:border-kincya hover:text-kincya transition-colors px-3 py-1.5"
                        >
                          {city.name}の畳表替え
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 text-center">
              <Link href="/saitama" className="text-sm text-ai hover:text-kincya transition-colors">
                市区町村一覧をすべて見る →
              </Link>
            </div>
          </section>

          {/* ─── おすすめ業者 ─── */}
          <section className="mb-14">
            <div className="flex items-baseline gap-3 mb-6">
              <h2 className="text-xl text-sumi" style={{ fontFamily: "var(--font-serif)" }}>
                埼玉県のおすすめ畳業者
              </h2>
              <span className="text-xs text-sumi/40">掲載イメージ — 本番公開時は実在業者情報に差し替えます</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {providers.map((p) => (
                <ProviderCard key={p.id} provider={p} showFavorite />
              ))}
            </div>
            <div className="text-center mt-6">
              <Link href="/search" className="inline-flex items-center gap-2 border border-ai text-ai hover:bg-ai hover:text-white transition-all duration-300 px-8 py-3 text-sm tracking-wider">
                すべての業者を比較する →
              </Link>
            </div>
          </section>

          {/* ─── 埼玉の畳工事 選び方ポイント ─── */}
          <section className="mb-14 bg-white border border-border p-6">
            <h2 className="text-xl text-sumi mb-6" style={{ fontFamily: "var(--font-serif)" }}>
              埼玉で畳業者を選ぶ3つのポイント
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  num: "01",
                  title: "資格・施工実績を確認する",
                  body: "「一級畳製作技能士」は国家資格です。施工実績・口コミ件数・保有資格を一覧で比較できます。資格・保険加入は業者の申告情報として掲載しています。",
                },
                {
                  num: "02",
                  title: "素材と料金を比較する",
                  body: "い草の産地（国産・中国産）、素材の種類（天然い草・和紙・化学繊維）で料金が大きく変わります。複数の業者から見積もりを取り比較するのがおすすめです。",
                },
                {
                  num: "03",
                  title: "対応エリア・日程を確認する",
                  body: "地元の畳業者は現場把握が早く、アフターフォローもスムーズです。即日対応・土日対応が必要な場合は事前に確認しましょう。",
                },
              ].map((item) => (
                <div key={item.num}>
                  <div className="text-2xl text-kincya/30 font-serif mb-2">{item.num}</div>
                  <h3 className="text-base text-sumi mb-2" style={{ fontFamily: "var(--font-serif)" }}>
                    {item.title}
                  </h3>
                  <p className="text-xs text-sumi/65 leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ─── 埼玉の畳事情 SEOコンテンツ ─── */}
          <section className="mb-14 bg-white border border-border p-6">
            <h2 className="text-xl text-sumi mb-5" style={{ fontFamily: "var(--font-serif)" }}>
              埼玉県の畳・和室工事について
            </h2>
            <div className="space-y-5 text-sm text-sumi/70 leading-loose">
              <div>
                <h3 className="text-base text-sumi mb-2" style={{ fontFamily: "var(--font-serif)" }}>
                  埼玉県における畳工事の特徴
                </h3>
                <p>
                  埼玉県は東京に隣接し、住宅地として急速に発展を続けています。
                  さいたま市・川口市・越谷市などの大規模住宅地ではマンション・アパートの畳工事が多く、
                  退去時の原状回復を目的とした畳表替えの需要が高まっています。
                  一方、川越・秩父・飯能など歴史ある街並みが残る地域では旅館・寺社・古民家の本格的な畳工事ニーズが継続しています。
                </p>
              </div>
              <div>
                <h3 className="text-base text-sumi mb-2" style={{ fontFamily: "var(--font-serif)" }}>
                  畳の交換タイミング
                </h3>
                <p>
                  一般的な畳の寿命の目安は次のとおりです。
                  「裏返し」は3〜5年に一度、「表替え」は5〜8年に一度、「新調（全交換）」は10〜20年に一度が目安です。
                  日焼けによる変色、毛羽立ち、沈み込み、い草の香りの消失、カビ・ダニの発生が交換のサインです。
                  早めのメンテナンスが畳の寿命を延ばします。
                </p>
              </div>
              <div>
                <h3 className="text-base text-sumi mb-2" style={{ fontFamily: "var(--font-serif)" }}>
                  施工に最適な季節
                </h3>
                <p>
                  畳工事は<strong className="text-sumi/90">春（3〜5月）と秋（9〜11月）</strong>が最適シーズンです。
                  気温・湿度が安定しており、い草が乾燥しやすく施工後の仕上がりが良くなります。
                  年末（11〜12月）は大掃除・引越しシーズンと重なり需要が集中するため、早めの予約を推奨します。
                  春・秋に余裕をもって依頼することで、丁寧な施工と納期の調整がしやすくなります。
                </p>
              </div>
              <div>
                <h3 className="text-base text-sumi mb-2" style={{ fontFamily: "var(--font-serif)" }}>
                  不動産会社・賃貸オーナーの方へ
                </h3>
                <p>
                  管理物件の畳交換・原状回復工事には、「不動産会社対応」「管理物件対応」の畳業者が便利です。
                  畳表替えだけでなく、クロス・フローリング・クッションフロアの張替えまで一社でまとめて依頼できる業者も掲載しています。
                  法人向けの継続対応・複数物件対応も相談できます。
                </p>
              </div>
            </div>
          </section>

          {/* ─── 法人・施設向けリンク ─── */}
          <section className="mb-14">
            <h2 className="text-xl text-sumi mb-5" style={{ fontFamily: "var(--font-serif)" }}>
              施設・業態別から探す
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { label: "不動産会社・管理会社向け", href: "/for-real-estate", sub: "退去・原状回復の畳工事" },
                { label: "賃貸オーナー向け", href: "/for-landlords", sub: "空室対策・リフォーム" },
                { label: "旅館・宿泊施設向け", href: "/for-ryokan", sub: "客室畳の大規模工事" },
                { label: "寺院・神社向け", href: "/for-temple-shrine", sub: "参拝エリア・本堂の畳" },
                { label: "店舗・内装向け", href: "/for-store", sub: "和風店舗の内装工事" },
                { label: "物件管理会社向け", href: "/for-property-management", sub: "複数物件の一括対応" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group border border-border bg-white hover:border-kincya/50 hover:shadow-sm transition-all duration-300 p-4"
                >
                  <p className="text-sm text-sumi group-hover:text-ai transition-colors mb-1" style={{ fontFamily: "var(--font-serif)" }}>
                    {item.label}
                  </p>
                  <p className="text-xs text-sumi/50">{item.sub}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* ─── FAQ ─── */}
          <FAQSection
            items={[
              {
                question: "埼玉県の畳表替えの料金相場はいくらですか？",
                answer: "埼玉県での畳表替えは1枚あたり3,800円〜8,000円（一般い草）が目安です。国産高級い草は8,000〜15,000円程度になります。6畳なら合計20,000〜50,000円前後が相場です。正確な料金は無料見積もりでご確認ください。",
              },
              {
                question: "さいたま市・川口市・川越市など特定のエリアで探せますか？",
                answer: "はい。各市区町村ページから、エリアに対応した畳業者を絞り込んで比較できます。川口市・戸田市・草加市など東京近接エリア、さいたま市・上尾市・富士見市など中央エリア、川越市・所沢市・飯能市など西部エリアなど、31市区町村に対応しています。",
              },
              {
                question: "埼玉県の賃貸物件・退去時の畳張替えはどこに依頼できますか？",
                answer: "日本畳パートナーズの「原状回復・賃貸退去対応」カテゴリから業者を探せます。管理会社・不動産会社が手配するのが一般的ですが、個人の賃貸オーナーも直接依頼できます。",
              },
              {
                question: "旅館・寺社の畳工事も対応していますか？",
                answer: "はい、川越・秩父・飯能など埼玉県内の旅館・宿泊施設・寺院・神社の畳工事に対応した業者も掲載しています。「旅館対応」「寺社対応」で絞り込んで探せます。",
              },
              {
                question: "畳工事はいつ依頼するのがベストですか？",
                answer: "春（3〜5月）と秋（9〜11月）が最適シーズンです。湿度が安定しており仕上がりが良くなります。年末は需要が集中するため早めの予約をおすすめします。",
              },
              {
                question: "畳の表替えと新調・裏返しの違いは？",
                answer: "表替えは表面（ゴザ）だけを新しくする工事（3,800円〜/枚）。裏返しはゴザを裏面にして再利用する中間メンテナンス（2,500円〜/枚）。新調は畳全体を新品に交換します（12,000円〜/枚）。",
              },
              {
                question: "埼玉県で即日対応・土日対応できる畳業者はいますか？",
                answer: "はい、即日相談可能・土日対応の業者も掲載しています。検索ページの「即日対応」「土日対応」フィルターをご利用ください。",
              },
              {
                question: "写真で見積もりを依頼できますか？",
                answer: "はい。スマートフォンで畳の写真を撮影して送るだけで、訪問なしに概算料金の目安を確認できる写真見積もりに対応した業者も掲載しています。",
              },
            ]}
            title="埼玉県の畳工事 よくある質問"
            subtitle="地域・価格・業者選びに関する疑問をまとめました"
          />
        </div>

        {/* ─── 市区町村リンクグリッド ─── */}
        <CityLinkGrid title="埼玉県の市区町村から畳業者を探す" />
      </div>
    </>
  );
}
