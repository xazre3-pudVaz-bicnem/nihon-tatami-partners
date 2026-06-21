import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import FAQSection from "@/components/common/FAQSection";
import StickyBottomCTA from "@/components/common/StickyBottomCTA";
import CityLinkGrid from "@/components/common/CityLinkGrid";
import ProviderListCard from "@/components/marketplace/ProviderListCard";
import { getTopProviders } from "@/data/providers";

export const metadata: Metadata = {
  title: "埼玉県の畳表替え業者を料金・口コミで比較｜日本畳パートナーズ",
  description:
    "埼玉県で畳表替えを依頼できる業者を料金、口コミ、対応エリア、施工事例で比較。さいたま市、川口市、川越市、越谷市など埼玉県内の畳店に無料見積もり相談できます。",
  keywords: ["畳表替え 埼玉", "畳 表替え 料金", "畳 業者", "さいたま市 畳表替え"],
  alternates: {
    canonical: "https://nihon-tatami-partners.vercel.app/saitama/tatami/omotegae",
  },
  openGraph: {
    title: "埼玉県の畳表替え業者を料金・口コミで比較｜日本畳パートナーズ",
    description:
      "埼玉県で畳表替えを依頼できる業者を料金、口コミ、対応エリアで比較。さいたま市、川口市、川越市など埼玉県内の畳店に無料見積もり相談できます。",
    type: "website",
    locale: "ja_JP",
  },
};

// JSON-LD
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "トップ", item: "https://nihon-tatami-partners.vercel.app/" },
        { "@type": "ListItem", position: 2, name: "埼玉県", item: "https://nihon-tatami-partners.vercel.app/saitama" },
        { "@type": "ListItem", position: 3, name: "畳工事", item: "https://nihon-tatami-partners.vercel.app/saitama/tatami" },
        { "@type": "ListItem", position: 4, name: "畳表替え", item: "https://nihon-tatami-partners.vercel.app/saitama/tatami/omotegae" },
      ],
    },
    {
      "@type": "Service",
      name: "畳表替え",
      description: "畳の表面（ゴザ）だけを新しいものに張り替える工事。最も一般的な畳のメンテナンス方法です。",
      areaServed: {
        "@type": "State",
        name: "埼玉県",
      },
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "JPY",
        lowPrice: "3200",
        highPrice: "15000",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          referenceQuantity: {
            "@type": "QuantitativeValue",
            value: "1",
            unitCode: "C62",
          },
        },
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "畳表替えと新調の違いは何ですか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "表替えは畳の表面（い草のゴザ）だけを新しく張り替える工事です。畳床（芯材）はそのまま使います。新調は畳床ごと新しく作り直す工事で、費用は高くなりますが、踏むと沈む・床が傷んでいる場合は新調が適しています。",
          },
        },
        {
          "@type": "Question",
          name: "畳表替えの作業時間はどのくらいかかりますか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "一般的な6畳〜8畳の場合、当日中に完了することが多いです。業者が畳を持ち帰り工場で張り替えて翌日以降に納品するケースと、即日仕上げのケースがあります。枚数や素材によって異なりますので、見積もり時に確認してください。",
          },
        },
        {
          "@type": "Question",
          name: "家具の移動は自分でしないといけませんか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "家具の移動に対応している業者もあります。ただし、追加費用がかかる場合があります。見積もり依頼時に「家具移動も対応してほしい」と伝えると、対応可否と費用を確認できます。",
          },
        },
        {
          "@type": "Question",
          name: "古い畳は処分してもらえますか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "多くの業者が古畳の処分に対応しています。処分費用は1枚あたり500円〜が目安です。工事と合わせて依頼すると効率的です。費用の有無は業者によって異なりますので、見積もりで確認してください。",
          },
        },
        {
          "@type": "Question",
          name: "賃貸退去時の畳費用は誰が負担しますか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "国土交通省のガイドラインでは、通常の使用による劣化（経年劣化）は貸主（大家）負担、故意・過失による損傷は借主（入居者）負担が原則とされています。具体的な費用負担については契約書や管理会社にご確認ください。",
          },
        },
        {
          "@type": "Question",
          name: "6畳の畳表替えはいくらくらいかかりますか？",
          acceptedAnswer: {
            "@type": "Answer",
            text: "素材によって異なります。中国産い草（普及品）で19,200〜30,000円、国産い草で34,800〜72,000円、和紙畳で34,800〜60,000円が目安です。古畳処分費・家具移動費・出張費は別途かかる場合があります。正確な料金は業者の見積もりでご確認ください。",
          },
        },
      ],
    },
  ],
};

const RELATED_CATEGORIES = [
  { label: "畳裏返し", href: "/saitama/tatami/uragaeshi", desc: "2,500円〜/枚" },
  { label: "畳新調", href: "/saitama/tatami/shinchou", desc: "12,000円〜/枚" },
  { label: "和紙畳", href: "/saitama/tatami/washi", desc: "5,800円〜/枚" },
  { label: "琉球畳", href: "/saitama/tatami/ryukyu", desc: "9,000円〜/枚" },
  { label: "ふすま張替え", href: "/saitama/fusuma/harikae", desc: "3,500円〜/枚" },
  { label: "障子張替え", href: "/saitama/shoji/harikae", desc: "2,500円〜/枚" },
  { label: "賃貸退去", href: "/saitama/rental-restoration/tatami", desc: "原状回復対応" },
];

const FAQ_ITEMS = [
  {
    question: "畳表替えと新調の違いは何ですか？",
    answer:
      "表替えは畳の表面（い草のゴザ）だけを新しく張り替える工事です。畳床（芯材）はそのまま使います。新調は畳床ごと新しく作り直す工事で、費用は高くなりますが、踏むと沈む・床が傷んでいる場合は新調が適しています。",
  },
  {
    question: "畳表替えの作業時間はどのくらいかかりますか？",
    answer:
      "一般的な6畳〜8畳の場合、当日中に完了することが多いです。業者が畳を持ち帰り工場で張り替えて翌日以降に納品するケースと、即日仕上げのケースがあります。枚数や素材によって異なりますので、見積もり時に確認してください。",
  },
  {
    question: "家具の移動は自分でしないといけませんか？",
    answer:
      "家具の移動に対応している業者もあります。ただし、追加費用がかかる場合があります。見積もり依頼時に「家具移動も対応してほしい」と伝えると、対応可否と費用を確認できます。",
  },
  {
    question: "古い畳は処分してもらえますか？",
    answer:
      "多くの業者が古畳の処分に対応しています。処分費用は1枚あたり500円〜が目安です。工事と合わせて依頼すると効率的です。費用の有無は業者によって異なりますので、見積もりで確認してください。",
  },
  {
    question: "賃貸退去時の畳費用は誰が負担しますか？",
    answer:
      "国土交通省のガイドラインでは、通常の使用による劣化（経年劣化）は貸主（大家）負担、故意・過失による損傷は借主（入居者）負担が原則とされています。具体的な費用負担については契約書や管理会社にご確認ください。",
  },
  {
    question: "雨の日でも工事できますか？",
    answer:
      "室内の工事のため、基本的に天候に関係なく施工できます。ただし、い草は湿気に敏感なため、工事後の換気をお願いする場合があります。詳細は担当業者にご確認ください。",
  },
  {
    question: "6畳の畳表替えはいくらくらいかかりますか？",
    answer:
      "素材によって異なります。中国産い草（普及品）で19,200〜30,000円、国産い草で34,800〜72,000円、和紙畳で34,800〜60,000円が目安です。古畳処分費・家具移動費・出張費は別途かかる場合があります。正確な料金は業者の見積もりでご確認ください。",
  },
  {
    question: "国産い草と中国産い草はどう違いますか？",
    answer:
      "国産い草（主に熊本県八代産）は繊維が細かく、香りが豊かで耐久性に優れています。中国産い草はコストが低く、価格を抑えたい場合に選ばれます。用途・予算・こだわりに応じて選ぶことができます。業者にサンプルを見せてもらいながら選ぶのがおすすめです。",
  },
  {
    question: "見積もりは無料でできますか？",
    answer:
      "本サイトに掲載している業者は無料見積もり対応です（申告情報）。「無料見積もり依頼」から送信すると、業者から料金の目安や工事の詳細が届きます。現地調査が必要な場合は、その旨も業者に確認してください。",
  },
  {
    question: "業者を選ぶポイントを教えてください。",
    answer:
      "（1）畳製作技能士などの資格保有、（2）損害賠償保険への加入、（3）口コミ・施工実績数、（4）対応エリアと出張費の有無、（5）素材のサンプル提示があるか——を確認するのがポイントです。複数業者から見積もりを取り、内容と価格を比較してから決めることをおすすめします。",
  },
];

export default function OmotegaePage() {
  const providers = getTopProviders(6);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. ダークヘッダーセクション */}
      <section className="bg-sumi text-white pt-4 pb-14 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* パンくず */}
          <div className="mb-6">
            <Breadcrumbs
              variant="dark"
              items={[
                { label: "トップ", href: "/" },
                { label: "埼玉県", href: "/saitama" },
                { label: "畳工事", href: "/saitama/tatami" },
                { label: "畳表替え" },
              ]}
            />
          </div>

          {/* H1 */}
          <h1
            className="text-2xl sm:text-3xl md:text-4xl text-white mb-3 leading-snug"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            埼玉県の畳表替え業者を
            <br className="sm:hidden" />
            料金・口コミで比較
          </h1>
          <p className="text-white/70 text-sm sm:text-base max-w-2xl mb-8">
            さいたま市・川口市・川越市・越谷市など埼玉県全域の畳表替え業者を、料金・口コミ・施工実績で比較。
            無料で最大5社に一括見積もり依頼できます。
          </p>

          {/* 統計数字 */}
          <div className="flex flex-wrap gap-6 mb-8">
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-kincya" style={{ fontFamily: "var(--font-serif)" }}>
                38<span className="text-base font-normal text-white/60 ml-1">社以上</span>
              </p>
              <p className="text-xs text-white/40 mt-0.5">掲載業者数（掲載イメージ）</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-kincya" style={{ fontFamily: "var(--font-serif)" }}>
                1,200<span className="text-base font-normal text-white/60 ml-1">件以上</span>
              </p>
              <p className="text-xs text-white/40 mt-0.5">口コミ件数（掲載イメージ）</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-kincya" style={{ fontFamily: "var(--font-serif)" }}>
                3,200<span className="text-base font-normal text-white/60 ml-1">円〜/枚</span>
              </p>
              <p className="text-xs text-white/40 mt-0.5">最安料金目安</p>
            </div>
          </div>

          {/* CTAボタン */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/bulk-quote"
              className="inline-flex items-center justify-center bg-kincya text-white text-sm font-bold px-6 py-4 hover:bg-do transition-colors"
            >
              最大5社一括見積もり（無料）
            </Link>
            <Link
              href="/request/start"
              className="inline-flex items-center justify-center border border-white/40 text-white text-sm px-6 py-4 hover:bg-white/10 transition-colors"
            >
              かんたん診断でおすすめ業者を探す
            </Link>
            <Link
              href="/photo-estimate"
              className="inline-flex items-center justify-center border border-white/40 text-white text-sm px-6 py-4 hover:bg-white/10 transition-colors"
            >
              写真で見積もりを相談する
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* 2. 工事種別比較ミニ表 */}
        <section className="py-12 border-b border-border">
          <h2
            className="text-xl sm:text-2xl text-sumi mb-6"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            畳工事の種類と費用目安
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse border border-border">
              <thead>
                <tr className="bg-sumi text-white">
                  <th className="border border-sumi/30 px-4 py-3 text-left font-medium">工事の種類</th>
                  <th className="border border-sumi/30 px-4 py-3 text-left font-medium">作業内容</th>
                  <th className="border border-sumi/30 px-4 py-3 text-left font-medium">費用目安</th>
                  <th className="border border-sumi/30 px-4 py-3 text-left font-medium">向いているケース</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-kincya/5 font-medium">
                  <td className="border border-border px-4 py-3 text-kincya">表替え（今のページ）</td>
                  <td className="border border-border px-4 py-3">畳表のみ交換。畳床はそのまま</td>
                  <td className="border border-border px-4 py-3">3,800円〜/枚</td>
                  <td className="border border-border px-4 py-3">5〜10年経過し、色あせや毛羽立ちが出てきた</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-border px-4 py-3">
                    <Link href="/saitama/tatami/uragaeshi" className="text-ai hover:underline">裏返し</Link>
                  </td>
                  <td className="border border-border px-4 py-3">畳表を裏返して再利用</td>
                  <td className="border border-border px-4 py-3">2,500円〜/枚</td>
                  <td className="border border-border px-4 py-3">3〜5年経過し、裏面がまだきれいな畳</td>
                </tr>
                <tr className="bg-kiji/20">
                  <td className="border border-border px-4 py-3">
                    <Link href="/saitama/tatami/shinchou" className="text-ai hover:underline">新調</Link>
                  </td>
                  <td className="border border-border px-4 py-3">畳床から新品に作り直す</td>
                  <td className="border border-border px-4 py-3">12,000円〜/枚</td>
                  <td className="border border-border px-4 py-3">15年以上経過、または踏むと沈む・床の傷みがひどい</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-sumi/50 mt-2">
            ※料金はあくまで目安です。正確な料金は業者の見積もりをご確認ください。
          </p>
        </section>

        {/* 3. 畳表替えとは */}
        <section className="py-12 border-b border-border">
          <h2
            className="text-xl sm:text-2xl text-sumi mb-6"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            畳表替えとは
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <p className="text-sm text-sumi/80 leading-relaxed mb-6">
                畳表替えとは、畳の表面（い草などで織られたゴザ部分）だけを新しいものに張り替える工事です。
                畳の芯となる「畳床（たたみどこ）」はそのまま使い続けるため、新調よりも費用を抑えられます。
                一般的に5〜10年に1回が目安とされており、色あせや毛羽立ち、臭いが気になってきたタイミングが交換の目安です。
                素材はい草（国産・中国産）のほか、和紙・樹脂・琉球畳など多様な選択肢から選べます。
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="border border-igusa/40 bg-igusa/5 p-4">
                  <p className="text-sm font-medium text-igusa mb-3">表替えが向いている状態</p>
                  <ul className="space-y-1.5 text-sm text-sumi/70">
                    <li className="flex items-start gap-2"><span className="text-igusa mt-0.5">✓</span>畳表の色あせ・黄変</li>
                    <li className="flex items-start gap-2"><span className="text-igusa mt-0.5">✓</span>毛羽立ちやトゲが出てきた</li>
                    <li className="flex items-start gap-2"><span className="text-igusa mt-0.5">✓</span>5〜10年以上経過している</li>
                    <li className="flex items-start gap-2"><span className="text-igusa mt-0.5">✓</span>畳のニオイが気になる</li>
                    <li className="flex items-start gap-2"><span className="text-igusa mt-0.5">✓</span>賃貸退去前の原状回復</li>
                    <li className="flex items-start gap-2"><span className="text-igusa mt-0.5">✓</span>染みや軽い汚れがある</li>
                  </ul>
                </div>
                <div className="border border-sumi/20 bg-kiji/20 p-4">
                  <p className="text-sm font-medium text-sumi/60 mb-3">表替えでは対応しにくい状態</p>
                  <ul className="space-y-1.5 text-sm text-sumi/60">
                    <li className="flex items-start gap-2"><span className="mt-0.5">✗</span>踏むとフカフカ沈む感触がある</li>
                    <li className="flex items-start gap-2"><span className="mt-0.5">✗</span>畳床（芯材）が湿気で傷んでいる</li>
                    <li className="flex items-start gap-2"><span className="mt-0.5">✗</span>20年以上経過し全体が劣化している</li>
                    <li className="flex items-start gap-2"><span className="mt-0.5">✗</span>床板までカビ・腐食が及んでいる</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="bg-kiji/30 p-6 self-start">
              <p className="text-sm font-medium text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>
                表替えの流れ
              </p>
              <ol className="space-y-3">
                {["無料見積もり依頼", "業者が現地確認・採寸", "素材・色の打ち合わせ", "畳を工場へ持ち帰り張替え", "納品・設置"].map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-sumi/80">
                    <span className="shrink-0 w-5 h-5 rounded-full bg-sumi text-white text-xs flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* 4. 料金相場テーブル */}
        <section className="py-12 border-b border-border">
          <h2
            className="text-xl sm:text-2xl text-sumi mb-2"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            畳表替えの料金相場（素材別）
          </h2>
          <p className="text-sm text-sumi/60 mb-6">
            素材によって価格・特徴が大きく異なります。用途や予算に合わせて選びましょう。
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse border border-border">
              <thead>
                <tr className="bg-kiji/40">
                  <th className="border border-border px-4 py-3 text-left font-medium text-sumi">素材</th>
                  <th className="border border-border px-4 py-3 text-left font-medium text-sumi">価格帯（1枚）</th>
                  <th className="border border-border px-4 py-3 text-left font-medium text-sumi">特徴</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border border-border px-4 py-3 font-medium">中国産い草（普及品）</td>
                  <td className="border border-border px-4 py-3 text-kincya font-medium">3,200〜5,000円</td>
                  <td className="border border-border px-4 py-3 text-sumi/70">コストパフォーマンス重視。費用を抑えたい方に</td>
                </tr>
                <tr className="bg-kiji/10">
                  <td className="border border-border px-4 py-3 font-medium">国産い草（熊本産）</td>
                  <td className="border border-border px-4 py-3 text-kincya font-medium">5,800〜12,000円</td>
                  <td className="border border-border px-4 py-3 text-sumi/70">豊かな香り・耐久性に優れる。品質重視の方に</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-border px-4 py-3 font-medium">和紙畳（MIGUSA等）</td>
                  <td className="border border-border px-4 py-3 text-kincya font-medium">5,800〜10,000円</td>
                  <td className="border border-border px-4 py-3 text-sumi/70">ダニ・色あせに強い。子育て世帯・ペット向け</td>
                </tr>
                <tr className="bg-kiji/10">
                  <td className="border border-border px-4 py-3 font-medium">樹脂畳</td>
                  <td className="border border-border px-4 py-3 text-kincya font-medium">8,000〜12,000円</td>
                  <td className="border border-border px-4 py-3 text-sumi/70">耐水性・耐久性が高い。水拭き可能。ペット対応</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-border px-4 py-3 font-medium">琉球畳（縁なし・半畳）</td>
                  <td className="border border-border px-4 py-3 text-kincya font-medium">9,000〜15,000円</td>
                  <td className="border border-border px-4 py-3 text-sumi/70">モダンデザイン。和モダン・リノベーション向け</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-sumi/50 mt-2">
            ※料金はあくまで目安です。正確な料金は業者の見積もりをご確認ください。
          </p>
        </section>

        {/* 5. 畳数別費用例 */}
        <section className="py-12 border-b border-border">
          <h2
            className="text-xl sm:text-2xl text-sumi mb-2"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            畳数別・費用シミュレーション
          </h2>
          <p className="text-sm text-sumi/60 mb-6">
            部屋の畳数と素材を組み合わせた費用の目安です。
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse border border-border">
              <thead>
                <tr className="bg-kiji/40">
                  <th className="border border-border px-4 py-3 text-left font-medium text-sumi">畳数</th>
                  <th className="border border-border px-4 py-3 text-center font-medium text-sumi">中国産い草（普及品）</th>
                  <th className="border border-border px-4 py-3 text-center font-medium text-sumi">国産い草</th>
                  <th className="border border-border px-4 py-3 text-center font-medium text-sumi">和紙畳</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border border-border px-4 py-3 font-medium">4.5畳</td>
                  <td className="border border-border px-4 py-3 text-center text-sumi/80">14,400〜22,500円</td>
                  <td className="border border-border px-4 py-3 text-center text-sumi/80">26,100〜54,000円</td>
                  <td className="border border-border px-4 py-3 text-center text-sumi/80">26,100〜45,000円</td>
                </tr>
                <tr className="bg-kiji/10">
                  <td className="border border-border px-4 py-3 font-medium">6畳</td>
                  <td className="border border-border px-4 py-3 text-center text-sumi/80">19,200〜30,000円</td>
                  <td className="border border-border px-4 py-3 text-center text-sumi/80">34,800〜72,000円</td>
                  <td className="border border-border px-4 py-3 text-center text-sumi/80">34,800〜60,000円</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-border px-4 py-3 font-medium">8畳</td>
                  <td className="border border-border px-4 py-3 text-center text-sumi/80">25,600〜40,000円</td>
                  <td className="border border-border px-4 py-3 text-center text-sumi/80">46,400〜96,000円</td>
                  <td className="border border-border px-4 py-3 text-center text-sumi/80">46,400〜80,000円</td>
                </tr>
                <tr className="bg-kiji/10">
                  <td className="border border-border px-4 py-3 font-medium">10畳</td>
                  <td className="border border-border px-4 py-3 text-center text-sumi/80">32,000〜50,000円</td>
                  <td className="border border-border px-4 py-3 text-center text-sumi/80">58,000〜120,000円</td>
                  <td className="border border-border px-4 py-3 text-center text-sumi/80">58,000〜100,000円</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-sumi/50 mt-2">
            ※古畳処分費・家具移動費・出張費は別途かかる場合があります。正確な料金は業者の見積もりでご確認ください。
          </p>
        </section>

        {/* 6. 追加費用が出るケース */}
        <section className="py-12 border-b border-border">
          <h2
            className="text-xl sm:text-2xl text-sumi mb-6"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            追加費用が発生するケース
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { title: "古畳処分", desc: "500円〜/枚。工事と合わせて依頼可能な場合が多い" },
              { title: "家具移動", desc: "3,000円〜（依頼内容・点数による）。事前に確認を" },
              { title: "出張費", desc: "エリアや距離によって発生する場合あり" },
              { title: "駐車場代", desc: "近隣に駐車場がない場合、実費負担を求められることがある" },
              { title: "現地調査費", desc: "事前調査が必要な場合に発生することがある（要確認）" },
              { title: "キャンセル費", desc: "前日・当日キャンセルは費用が発生する場合あり" },
            ].map((item) => (
              <div key={item.title} className="border border-border bg-white p-4">
                <p className="text-sm font-medium text-sumi mb-1">{item.title}</p>
                <p className="text-xs text-sumi/60">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-sumi/50 mt-3">
            ※上記は一般的な例です。業者によって費用体系が異なります。見積もりの際に総額で確認してください。
          </p>
        </section>

        {/* 7. 表替えが向いているタイミング */}
        <section className="py-12 border-b border-border">
          <h2
            className="text-xl sm:text-2xl text-sumi mb-6"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            畳表替えを検討すべきタイミング
          </h2>
          <div className="grid sm:grid-cols-2 gap-3 max-w-2xl">
            {[
              "畳の表面が黄色・茶色に変色してきた",
              "畳のい草が毛羽立ち、トゲが気になる",
              "前回の表替えや新調から5〜10年以上が経過した",
              "畳のニオイ（カビ・い草の劣化臭）が気になる",
              "賃貸物件の退去・原状回復の必要がある",
              "染みや軽い汚れが目立ってきた",
              "畳が全体的にくすんで見える",
              "来客や慶事を控えて和室をきれいにしたい",
            ].map((text, i) => (
              <div key={i} className="flex items-start gap-3 text-sm text-sumi/80 bg-kiji/20 px-4 py-3 border border-kiji">
                <span className="text-igusa font-bold shrink-0">✓</span>
                {text}
              </div>
            ))}
          </div>
        </section>

        {/* 8. 業者一覧 */}
        <section className="py-12 border-b border-border">
          <h2
            className="text-xl sm:text-2xl text-sumi mb-2"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            埼玉県の畳表替え対応業者
          </h2>
          <p className="text-sm text-sumi/60 mb-6">
            掲載業者はすべて掲載イメージです。実際の業者情報は順次追加予定です。
          </p>
          <div className="space-y-4">
            {providers.map((provider, i) => (
              <ProviderListCard
                key={provider.id}
                provider={provider}
                rank={i + 1}
                categorySlug="tatami-omotegae"
              />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/search?category=tatami-omotegae"
              className="inline-flex items-center justify-center border border-ai text-ai text-sm px-8 py-3 hover:bg-ai hover:text-white transition-colors"
            >
              埼玉県の畳表替え業者をもっと見る
            </Link>
          </div>
        </section>

        {/* 9. 法人・管理会社向けセクション */}
        <section className="py-12 border-b border-border">
          <div className="bg-kiji/30 border border-border p-6 sm:p-8">
            <h2
              className="text-xl sm:text-2xl text-sumi mb-3"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              賃貸オーナー・管理会社の方へ
            </h2>
            <p className="text-sm text-sumi/70 mb-5 max-w-2xl">
              退去後の畳の原状回復、複数物件の一括対応など、管理会社・不動産会社・賃貸オーナー様からのご相談も承っています。
              複数物件への対応実績がある業者も掲載しています。
            </p>
            <ul className="space-y-2 mb-6 text-sm text-sumi/70">
              <li className="flex items-start gap-2">
                <span className="text-kincya shrink-0 mt-0.5">▶</span>
                退去後の原状回復（畳表替え・新調）
              </li>
              <li className="flex items-start gap-2">
                <span className="text-kincya shrink-0 mt-0.5">▶</span>
                複数物件・継続案件の一括管理対応
              </li>
              <li className="flex items-start gap-2">
                <span className="text-kincya shrink-0 mt-0.5">▶</span>
                空室対策リフォームとのセット対応
              </li>
              <li className="flex items-start gap-2">
                <span className="text-kincya shrink-0 mt-0.5">▶</span>
                管理会社への請求書発行・後払い対応業者あり（申告情報）
              </li>
            </ul>
            <Link
              href="/bulk-quote?type=corporate"
              className="inline-flex items-center justify-center bg-ai text-white text-sm font-bold px-6 py-3 hover:opacity-90 transition-opacity"
            >
              法人・管理会社向け一括依頼フォームへ
            </Link>
          </div>
        </section>

        {/* 10. 用途別ガイド */}
        <section className="py-12 border-b border-border">
          <h2
            className="text-xl sm:text-2xl text-sumi mb-6"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            用途別・畳表替えガイド
          </h2>
          <div className="space-y-6">
            {[
              {
                title: "一般住宅（持ち家）",
                body: "自宅の和室の畳表替えは、5〜10年を目安に検討しましょう。素材はい草のほか、和紙畳・樹脂畳など選択肢が豊富です。家族構成やライフスタイルに合わせて業者と相談しながら素材を選ぶことをおすすめします。複数業者の見積もりを比較することで、価格と品質のバランスが取りやすくなります。",
              },
              {
                title: "賃貸・アパート（退去・原状回復）",
                body: "賃貸物件の退去時は、通常の使用による経年劣化は大家負担が原則とされています（国土交通省ガイドライン）。ただし、故意・過失による損傷は借主負担になります。費用負担の取り決めは契約書を確認し、不明点は管理会社に確認してください。業者によっては管理会社への直接請求にも対応しています。",
              },
              {
                title: "旅館・宿泊施設",
                body: "旅館の客室畳は使用頻度が高いため、耐久性に優れた素材（和紙畳・樹脂畳など）の選択や、複数室の一括施工が効果的です。営業に支障が出ないよう、施工スケジュールを業者と丁寧に調整しましょう。旅館対応実績のある業者に依頼することをおすすめします。",
              },
              {
                title: "寺・神社",
                body: "本堂・社務所・拝殿などの格式ある空間は、品質と仕上がりにこだわった施工が求められます。寺社仏閣への施工実績がある業者を選び、適切な素材・縁（へり）の選定についても相談しましょう。特殊なサイズや仕様にも対応可能な業者が埼玉県内にも存在します。",
              },
              {
                title: "店舗・事務所",
                body: "店舗や事務所で和の空間を演出したい場合、デザイン性と耐久性を兼ね備えた琉球畳や和紙畳が人気です。来客スペースや待合室などに取り入れることで、和の品格を演出できます。施工前に業者とデザインイメージを共有し、複数のサンプルを確認してから決定しましょう。",
              },
            ].map((item) => (
              <details key={item.title} className="border border-border bg-white group">
                <summary className="px-6 py-4 text-sm font-medium text-sumi cursor-pointer hover:bg-kiji/20 transition-colors list-none flex items-center justify-between">
                  <span style={{ fontFamily: "var(--font-serif)" }}>{item.title}</span>
                  <span className="text-sumi/40 text-lg transition-transform group-open:rotate-45">+</span>
                </summary>
                <div className="px-6 py-4 border-t border-kiji">
                  <p className="text-sm text-sumi/75 leading-relaxed">{item.body}</p>
                </div>
              </details>
            ))}
          </div>
        </section>

      </div>

      {/* 11. FAQ */}
      <FAQSection
        items={FAQ_ITEMS}
        title="畳表替えに関するよくある質問"
        subtitle="見積もり前に疑問を解消しましょう"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* 12. 関連カテゴリ */}
        <section className="py-12 border-b border-border">
          <h2
            className="text-xl sm:text-2xl text-sumi mb-6"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            関連するサービス
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {RELATED_CATEGORIES.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="border border-border bg-white hover:border-ai hover:bg-ai/5 transition-colors p-4 text-center group"
              >
                <p className="text-sm font-medium text-sumi group-hover:text-ai transition-colors" style={{ fontFamily: "var(--font-serif)" }}>
                  {cat.label}
                </p>
                <p className="text-xs text-sumi/50 mt-1">{cat.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* 13. 3つのCTA連携ボックス */}
        <section className="py-12 border-b border-border">
          <h2
            className="text-xl sm:text-2xl text-sumi mb-8 text-center"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            あなたに合った方法で相談・見積もりを
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="border border-border bg-white p-6 text-center">
              <p className="text-2xl mb-3">📸</p>
              <p className="text-sm font-medium text-sumi mb-2" style={{ fontFamily: "var(--font-serif)" }}>
                写真で見積もり
              </p>
              <p className="text-xs text-sumi/60 mb-4">
                畳の写真を送るだけで概算見積もりをもらえます
              </p>
              <Link
                href="/photo-estimate"
                className="block text-sm border border-ai text-ai py-2.5 hover:bg-ai hover:text-white transition-colors"
              >
                写真を送って相談する
              </Link>
            </div>
            <div className="border border-kincya bg-kincya/5 p-6 text-center">
              <p className="text-2xl mb-3">📋</p>
              <p className="text-sm font-medium text-sumi mb-2" style={{ fontFamily: "var(--font-serif)" }}>
                最大5社一括見積もり
              </p>
              <p className="text-xs text-sumi/60 mb-4">
                条件を入力して複数業者の見積もりを比較できます
              </p>
              <Link
                href="/bulk-quote"
                className="block text-sm bg-kincya text-white py-2.5 font-bold hover:bg-do transition-colors"
              >
                一括見積もりを依頼する（無料）
              </Link>
            </div>
            <div className="border border-border bg-white p-6 text-center">
              <p className="text-2xl mb-3">✅</p>
              <p className="text-sm font-medium text-sumi mb-2" style={{ fontFamily: "var(--font-serif)" }}>
                かんたん診断
              </p>
              <p className="text-xs text-sumi/60 mb-4">
                いくつかの質問に答えるだけでおすすめ業者が分かります
              </p>
              <Link
                href="/request/start"
                className="block text-sm border border-sumi/30 text-sumi py-2.5 hover:bg-sumi hover:text-white transition-colors"
              >
                かんたん診断を始める
              </Link>
            </div>
          </div>
        </section>

      </div>

      {/* 14. 市区町村リンク */}
      <CityLinkGrid
        title="市区町村から畳表替え業者を探す"
        categorySlug="tatami-omotegae"
      />

      {/* 15. スマホ下部固定CTA */}
      <StickyBottomCTA
        primaryLabel="無料で見積もりを依頼"
        primaryHref="/bulk-quote"
        secondaryLabel="業者を比較する"
        secondaryHref="/search?category=tatami-omotegae"
      />
    </>
  );
}
