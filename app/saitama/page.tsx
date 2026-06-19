import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import ProviderCard from "@/components/common/ProviderCard";
import CityLinkGrid from "@/components/common/CityLinkGrid";
import FAQSection from "@/components/common/FAQSection";
import { POPULAR_CATEGORIES, SERVICE_CATEGORIES } from "@/data/categories";
import { getTopProviders } from "@/data/providers";
import { SITE_URL } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "埼玉県の畳・和室工事業者を比較して探す | 日本畳パートナー",
  description: "埼玉県内の畳表替え・畳新調・和室リフォーム・ふすま障子張替え・原状回復など畳・和室工事業者を料金・口コミで比較。さいたま市・川口市・川越市など30市区町村対応。",
  keywords: ["埼玉 畳", "埼玉 畳 張替え", "埼玉 畳 表替え", "埼玉 和室 リフォーム", "埼玉 畳業者"],
  openGraph: {
    title: "埼玉県の畳・和室工事業者を比較して探す | 日本畳パートナー",
    description: "埼玉県内の畳・和室工事業者を一覧で比較。料金・口コミ・対応エリアで選べます。",
    url: `${SITE_URL}/saitama`,
  },
  alternates: { canonical: `${SITE_URL}/saitama` },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "トップ", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "埼玉県", item: `${SITE_URL}/saitama` },
  ],
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "埼玉県の畳・和室工事業者",
  description: "埼玉県内の畳・和室工事に対応した専門業者一覧",
  numberOfItems: 8,
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "山田畳店", url: `${SITE_URL}/providers/prov-001` },
    { "@type": "ListItem", position: 2, name: "川越畳工房 和心", url: `${SITE_URL}/providers/prov-002` },
    { "@type": "ListItem", position: 3, name: "越谷内装センター", url: `${SITE_URL}/providers/prov-003` },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "埼玉県の畳表替えの料金相場はいくらですか？",
      acceptedAnswer: { "@type": "Answer", text: "埼玉県での畳表替えの料金は1枚あたり3,800円〜8,000円程度が目安です。国産い草を使用した場合は8,000〜15,000円程度になることがあります。6畳の場合は合計20,000〜50,000円前後が目安です。" },
    },
    {
      "@type": "Question",
      name: "埼玉県で即日対応できる畳業者はいますか？",
      acceptedAnswer: { "@type": "Answer", text: "はい、日本畳パートナーには即日対応可能な業者も掲載しています。「即日対応」で絞り込んで検索してください。ただし、素材の在庫状況や現場の状況によって対応できない場合もあります。" },
    },
    {
      "@type": "Question",
      name: "埼玉県の賃貸物件の畳張替えはどこに頼めばいいですか？",
      acceptedAnswer: { "@type": "Answer", text: "管理会社・不動産会社が手配することが一般的ですが、個人の賃貸オーナーの方も日本畳パートナーから直接業者に依頼できます。「賃貸退去時の畳張替え」カテゴリで検索してください。" },
    },
  ],
};

export default function SaitamaTopPage() {
  const providers = getTopProviders(6);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="min-h-screen bg-shiro">
        {/* ヘッダー */}
        <div className="bg-sumi">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumbs items={[
              { label: "トップ", href: "/" },
              { label: "埼玉県" },
            ]} />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 pt-4">
            <span className="text-xs text-kincya tracking-wider">埼玉県の畳・和室工事</span>
            <h1 className="text-3xl md:text-4xl text-white mt-3 mb-4" style={{ fontFamily: "var(--font-serif)" }}>
              埼玉県の畳・和室工事を<br />比較して探す
            </h1>
            <p className="text-sm text-white/60 max-w-2xl leading-relaxed">
              さいたま市・川口市・川越市・越谷市など埼玉県全域の畳表替え・和室リフォーム・ふすま・障子張替え業者を料金・口コミで比較できます。
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* 主要カテゴリ */}
          <section className="mb-12">
            <h2 className="text-xl text-sumi mb-6" style={{ fontFamily: "var(--font-serif)" }}>
              埼玉で探せるサービス
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {POPULAR_CATEGORIES.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/saitama/${cat.slug}`}
                  className="group border border-border bg-white hover:border-kincya/40 hover:shadow-sm transition-all duration-300 p-4 text-center"
                >
                  <h3 className="text-sm text-sumi group-hover:text-ai transition-colors mb-1" style={{ fontFamily: "var(--font-serif)" }}>
                    {cat.name}
                  </h3>
                  {cat.priceFrom && (
                    <p className="text-xs text-sumi/40">{cat.priceFrom.toLocaleString()}円〜/{cat.unit}</p>
                  )}
                </Link>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Link href="/categories" className="text-sm text-ai hover:text-kincya transition-colors">
                すべてのカテゴリを見る →
              </Link>
            </div>
          </section>

          {/* 料金相場 */}
          <section className="mb-12 bg-white border border-border p-6">
            <h2 className="text-xl text-sumi mb-5" style={{ fontFamily: "var(--font-serif)" }}>
              埼玉県の畳・和室工事 料金相場
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-kiji">
                    <th className="text-left px-4 py-2 text-sumi/70 font-normal text-xs">サービス</th>
                    <th className="text-right px-4 py-2 text-sumi/70 font-normal text-xs">料金目安（1枚/1m²）</th>
                    <th className="text-right px-4 py-2 text-sumi/70 font-normal text-xs hidden sm:table-cell">6畳目安</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "畳表替え（国産い草）", unit: "3,800〜8,000円/枚", total: "25,000〜50,000円" },
                    { name: "畳裏返し", unit: "2,500〜5,000円/枚", total: "16,000〜30,000円" },
                    { name: "畳新調（藁床）", unit: "12,000〜25,000円/枚", total: "72,000〜150,000円" },
                    { name: "琉球畳", unit: "15,000〜30,000円/枚", total: "90,000〜180,000円" },
                    { name: "和紙畳", unit: "8,000〜15,000円/枚", total: "48,000〜90,000円" },
                    { name: "ふすま張替え", unit: "3,500〜8,000円/枚", total: "4枚で14,000〜32,000円" },
                    { name: "障子張替え", unit: "2,500〜5,000円/枚", total: "2枚で5,000〜10,000円" },
                  ].map((row) => (
                    <tr key={row.name} className="border-b border-kiji last:border-0">
                      <td className="px-4 py-3 text-sumi/80">{row.name}</td>
                      <td className="px-4 py-3 text-right text-kincya font-medium text-xs">{row.unit}</td>
                      <td className="px-4 py-3 text-right text-xs text-sumi/50 hidden sm:table-cell">{row.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-sumi/40 mt-3">※料金は目安です。素材・現場状況・業者によって異なります。正確な料金は無料見積もりでご確認ください。</p>
          </section>

          {/* おすすめ業者 */}
          <section className="mb-12">
            <h2 className="text-xl text-sumi mb-6" style={{ fontFamily: "var(--font-serif)" }}>
              埼玉県のおすすめ畳業者
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {providers.map((p) => (
                <ProviderCard key={p.id} provider={p} showFavorite />
              ))}
            </div>
            <div className="text-center mt-6">
              <Link href="/search" className="inline-flex items-center gap-2 border border-ai text-ai hover:bg-ai hover:text-white transition-all duration-300 px-8 py-3 text-sm tracking-wider">
                すべての業者を比較する
              </Link>
            </div>
          </section>

          {/* SEOテキスト */}
          <section className="mb-12 bg-white border border-border p-6">
            <h2 className="text-xl text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>
              埼玉県の畳・和室工事について
            </h2>
            <div className="space-y-4 text-sm text-sumi/70 leading-relaxed">
              <p>
                埼玉県は東京に隣接し、住宅地として発展を続けています。一般住宅・マンション・賃貸物件の畳工事に加え、川越・秩父・飯能など歴史ある街並みに残る旅館・寺社・古民家の畳工事ニーズも高いエリアです。
              </p>
              <p>
                畳の表替えは、い草の香りが薄れてきたり、表面が毛羽立ってきたりしたら交換のサインです。一般的に3〜5年に1度の表替えが目安ですが、使用頻度や素材によって異なります。裏返しは表替えより安価に行える中間メンテナンスで、表替えの前のステップとして行われます。
              </p>
              <p>
                不動産会社・管理会社の方には、退去後の原状回復に対応できる業者が多数掲載されています。畳の表替えだけでなく、クロス・フローリング・CFの張替えまで一社でまとめて対応できる業者を絞り込むことができます。
              </p>
            </div>
          </section>

          {/* FAQ */}
          <FAQSection
            items={[
              { question: "埼玉県の畳表替えの料金相場はいくらですか？", answer: "埼玉県での畳表替えの料金は1枚あたり3,800円〜8,000円程度が目安です。国産い草を使用した場合は8,000〜15,000円程度になることがあります。6畳の場合は合計20,000〜50,000円前後が目安です。" },
              { question: "埼玉県で即日対応できる畳業者はいますか？", answer: "はい、即日対応可能な業者も掲載しています。「即日対応」で絞り込んで検索してください。ただし、素材の在庫状況や現場の状況によって対応できない場合もあります。" },
              { question: "埼玉県の賃貸物件の畳張替えはどこに頼めばいいですか？", answer: "管理会社・不動産会社が手配することが一般的ですが、個人の賃貸オーナーの方も直接業者に依頼できます。「賃貸退去時の畳張替え」カテゴリで検索してください。" },
              { question: "旅館・寺社の畳工事も対応していますか？", answer: "はい、旅館・宿泊施設・寺院・神社の畳工事に対応した業者も掲載しています。「旅館・宿泊施設対応」「寺社対応」で絞り込んで探せます。" },
            ]}
            title="埼玉県の畳・和室工事 よくある質問"
            subtitle="地域特有の疑問にお答えします"
          />
        </div>

        {/* 市区町村リンク */}
        <CityLinkGrid title="埼玉県の市区町村から探す" />
      </div>
    </>
  );
}
