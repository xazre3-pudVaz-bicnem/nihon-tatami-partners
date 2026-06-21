import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import ProviderListCard from "@/components/marketplace/ProviderListCard";
import FAQSection from "@/components/common/FAQSection";
import CityLinkGrid from "@/components/common/CityLinkGrid";
import { getCityBySlug, SAITAMA_CITIES } from "@/data/cities";
import { getProvidersByCity, getTopProviders } from "@/data/providers";
import { POPULAR_CATEGORIES, SERVICE_CATEGORIES } from "@/data/categories";
import { SITE_URL } from "@/lib/metadata";

interface Props {
  params: Promise<{ city: string }>;
}

export async function generateStaticParams() {
  return SAITAMA_CITIES.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  const cityData = getCityBySlug(city);
  if (!cityData) return {};
  return {
    title: `${cityData.name}の畳・和室工事業者 | 料金・口コミで比較 | 日本畳パートナーズ`,
    description: `${cityData.name}（埼玉県）の畳表替え・和室リフォーム・ふすま・障子張替えなど畳・和室工事業者を料金・口コミで比較。無料で見積相談できます。`,
    alternates: { canonical: `${SITE_URL}/saitama/${city}` },
  };
}

const PRICE_TABLE = [
  { work: "畳表替え（1枚）", price: "3,200円〜", note: "素材・グレードで変動" },
  { work: "畳裏返し（1枚）", price: "2,500円〜", note: "1枚につき1回まで" },
  { work: "畳新調（1枚）", price: "8,000円〜", note: "畳床・素材で変動" },
  { work: "ふすま張替え（1枚）", price: "4,000円〜", note: "紙・クロスで変動" },
  { work: "障子張替え（1枚）", price: "2,500円〜", note: "デザイン障子は別途" },
];

const CHECK_POINTS = [
  "見積もりに家具移動・古畳処分が含まれているか確認する",
  "使用する素材のグレード（国産/外国産）を明記してもらう",
  "追加費用が発生する条件を事前に書面で確認する",
  "対応エリアと出張費の有無を確認する",
  "口コミ評価と施工実績件数を合わせて比較する",
];

export default async function CityTopPage({ params }: Props) {
  const { city } = await params;
  const cityData = getCityBySlug(city);
  if (!cityData) notFound();

  const providers = getProvidersByCity(cityData.name);
  const allProviders = providers.length > 0 ? providers : getTopProviders(6);
  const nearCities = SAITAMA_CITIES.filter((c) => c.slug !== city).slice(0, 10);

  const faqs = [
    {
      question: `${cityData.name}で畳の表替えをするといくらかかりますか？`,
      answer: `${cityData.name}の畳表替えは1枚あたり3,200円〜が目安です。素材（外国産い草・国産い草・和紙・樹脂）やグレードにより3,800〜12,000円程度の幅があります。複数業者に見積もりを取って比較することをおすすめします。`,
    },
    {
      question: `${cityData.name}で即日対応できる畳業者はありますか？`,
      answer: `即日対応に対応している業者もあります。検索ページの絞り込みで「即日対応」を選ぶと、即日・当日対応可能な業者を絞り込んで確認できます。`,
    },
    {
      question: `${cityData.name}の賃貸物件の原状回復（畳の張替え）も対応していますか？`,
      answer: `不動産会社・管理会社・賃貸オーナー向けに対応している業者が掲載されています。絞り込みで「不動産・管理会社対応」を選ぶか、一括見積もりで複数業者にまとめて依頼できます。`,
    },
    {
      question: `${cityData.name}で法人・旅館の畳工事にも対応していますか？`,
      answer: `法人対応・旅館対応・寺社対応の業者が掲載されています。プロフィールで対応業種を確認のうえ、見積もり時に詳細をご相談ください。`,
    },
    {
      question: "表替えと新調はどう選べばよいですか？",
      answer: "畳床（芯材）がしっかりしていれば表替えで十分です。踏み込んだときにへたりを感じる、きしむ音がする、15年以上経過しているなどの場合は新調を検討します。判断に迷う場合は現地確認を依頼してください。",
    },
    {
      question: "古い畳の処分もお願いできますか？",
      answer: "新調や大規模なリフォーム時に古畳の処分を依頼できる業者があります。処分費用が発生する場合があります。見積もり時に確認しましょう。",
    },
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="min-h-screen bg-shiro">
        {/* ヘッダー */}
        <div className="bg-sumi">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumbs
              variant="dark"
              items={[
                { label: "トップ", href: "/" },
                { label: "埼玉県", href: "/saitama" },
                { label: cityData.name },
              ]}
            />
          </div>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 pt-4">
            <h1 className="text-2xl md:text-3xl text-white mb-3" style={{ fontFamily: "var(--font-serif)" }}>
              {cityData.name}の畳・和室工事業者を探す
            </h1>
            <p className="text-sm text-white/60 leading-relaxed max-w-2xl">
              {cityData.description || `${cityData.name}（埼玉県）の畳表替え・新調・ふすま障子張替え・和室リフォームなどの工事業者を料金・口コミで比較できます。無料で見積もりを依頼できます。`}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={`/search?city=${encodeURIComponent(cityData.name)}`} className="bg-kincya text-white px-6 py-2.5 text-sm hover:bg-do transition-colors">
                業者を比較する
              </Link>
              <Link href="/bulk-quote" className="border border-white/30 text-white/80 px-6 py-2.5 text-sm hover:border-white hover:text-white transition-colors">
                一括見積もりを依頼
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">

          {/* カテゴリ選択 */}
          <section>
            <h2 className="text-xl text-sumi mb-5" style={{ fontFamily: "var(--font-serif)" }}>
              {cityData.name}で探せるサービス
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {POPULAR_CATEGORIES.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/saitama/${city}/${cat.slug}`}
                  className="group border border-border bg-white hover:border-kincya/40 transition-all duration-300 p-4 text-center"
                >
                  <h3 className="text-sm text-sumi group-hover:text-ai transition-colors mb-1" style={{ fontFamily: "var(--font-serif)" }}>
                    {cat.name}
                  </h3>
                  {cat.priceFrom && (
                    <p className="text-xs text-sumi/40">{cat.priceFrom.toLocaleString()}円〜</p>
                  )}
                </Link>
              ))}
            </div>
          </section>

          {/* 業者一覧 */}
          <section>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl text-sumi" style={{ fontFamily: "var(--font-serif)" }}>
                {cityData.name}対応の業者一覧
              </h2>
              <Link href={`/search?city=${encodeURIComponent(cityData.name)}`} className="text-sm text-ai hover:underline">
                すべて見る →
              </Link>
            </div>
            <div className="space-y-4">
              {allProviders.slice(0, 5).map((p) => (
                <ProviderListCard key={p.id} provider={p} />
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={`/search?city=${encodeURIComponent(cityData.name)}`} className="inline-block border border-ai text-ai px-6 py-3 text-sm hover:bg-ai hover:text-white transition-all duration-300">
                {cityData.name}の業者をすべて見る
              </Link>
              <Link href="/bulk-quote" className="inline-block bg-kincya text-white px-6 py-3 text-sm hover:bg-do transition-colors">
                一括見積もりを依頼する
              </Link>
            </div>
          </section>

          {/* 料金相場 */}
          <section>
            <h2 className="text-xl text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>
              {cityData.name}の畳・内装工事 料金相場
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border bg-white">
                <thead>
                  <tr className="bg-kiji/60 text-sumi/70 text-xs">
                    <th className="text-left px-4 py-3 font-medium border-b border-border">工事内容</th>
                    <th className="text-left px-4 py-3 font-medium border-b border-border whitespace-nowrap">料金目安</th>
                    <th className="text-left px-4 py-3 font-medium border-b border-border hidden sm:table-cell">備考</th>
                  </tr>
                </thead>
                <tbody>
                  {PRICE_TABLE.map((row) => (
                    <tr key={row.work} className="border-b border-kiji last:border-0">
                      <td className="px-4 py-3 text-sumi/80">{row.work}</td>
                      <td className="px-4 py-3 text-do font-medium whitespace-nowrap">{row.price}</td>
                      <td className="px-4 py-3 text-xs text-sumi/50 hidden sm:table-cell">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-sumi/40 mt-2">※ 1枚あたりの目安です。素材・枚数・現場状況により変動します。正確な料金は各業者の見積もりをご確認ください。</p>
            <Link href="/prices" className="text-sm text-ai hover:underline mt-2 inline-block">詳しい料金相場を見る →</Link>
          </section>

          {/* 業者選びのポイント */}
          <section className="bg-white border border-border p-6">
            <h2 className="text-xl text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>
              {cityData.name}で畳業者を選ぶときのポイント
            </h2>
            <p className="text-sm text-sumi/70 leading-relaxed mb-4">
              {cityData.name}で畳・和室の工事を依頼するときは、料金だけでなく口コミ評価・施工実績・保有資格・対応エリアを総合的に確認しましょう。複数業者から無料で見積もりを取ることで、適正価格と対応内容を比較できます。
            </p>
            <ul className="space-y-2">
              {CHECK_POINTS.map((p) => (
                <li key={p} className="text-sm text-sumi/70 flex items-start gap-2">
                  <span className="text-igusa mt-0.5 shrink-0">✓</span>{p}
                </li>
              ))}
            </ul>
          </section>

          {/* FAQ */}
          <FAQSection items={faqs} title={`${cityData.name}の畳・和室工事 よくある質問`} />

          {/* 全カテゴリ */}
          <section>
            <h2 className="text-lg text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>
              {cityData.name}で探せる全サービス
            </h2>
            <div className="flex flex-wrap gap-2">
              {SERVICE_CATEGORIES.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/saitama/${city}/${cat.slug}`}
                  className="text-xs border border-border text-sumi/60 hover:border-ai hover:text-ai transition-colors px-3 py-1.5 bg-white"
                >
                  {cityData.name}の{cat.name}
                </Link>
              ))}
            </div>
          </section>

          {/* 近隣エリア */}
          <section>
            <h2 className="text-lg text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>近隣エリアで探す</h2>
            <div className="flex flex-wrap gap-2">
              {nearCities.map((c) => (
                <Link
                  key={c.slug}
                  href={`/saitama/${c.slug}`}
                  className="text-sm border border-border text-sumi/70 hover:border-ai hover:text-ai transition-colors px-3 py-2 bg-white"
                >
                  {c.name}の業者
                </Link>
              ))}
            </div>
          </section>

          {/* 法人向け */}
          <section className="bg-sumi text-white p-8">
            <h2 className="text-lg mb-3" style={{ fontFamily: "var(--font-serif)" }}>
              {cityData.name}の不動産会社・管理会社の方へ
            </h2>
            <p className="text-sm text-white/60 leading-relaxed mb-4">
              賃貸退去後の原状回復、空室対策の畳・内装工事に対応する業者が掲載されています。複数物件の一括見積もり、請求書払い、インボイス対応業者もご確認いただけます。
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/for-real-estate" className="text-sm border border-white/30 text-white/80 px-5 py-2.5 hover:border-white hover:text-white transition-colors">
                不動産会社向け詳細
              </Link>
              <Link href="/for-property-management" className="text-sm border border-white/30 text-white/80 px-5 py-2.5 hover:border-white hover:text-white transition-colors">
                管理会社向け詳細
              </Link>
              <Link href="/bulk-quote" className="text-sm bg-kincya text-white px-5 py-2.5 hover:bg-do transition-colors">
                一括見積もりを依頼
              </Link>
            </div>
          </section>
        </div>

        <CityLinkGrid currentCitySlug={city} title="他の市区町村でも探す" />
      </div>
    </>
  );
}
