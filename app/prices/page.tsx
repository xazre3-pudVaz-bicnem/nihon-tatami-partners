import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import FAQSection from "@/components/common/FAQSection";
import { TATAMI_PRICES, INTERIOR_PRICES, RESTORATION_PRICES, PRICE_NOTES } from "@/data/price";
import type { PriceItem } from "@/lib/types";
import { createMetadata } from "@/lib/metadata";
import { SITE_URL } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "畳・内装工事の料金相場｜表替え・新調・原状回復の費用目安",
  description:
    "畳の表替え・新調・裏返し、ふすま・障子・クロス張替え、原状回復の料金相場を素材別・畳数別にわかりやすく解説。追加費用や見積もりの確認ポイントも紹介。",
  path: "/prices",
});

const PriceTable = ({ title, items }: { title: string; items: PriceItem[] }) => (
  <section className="mb-10">
    <h2 className="text-lg text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>
      {title}
    </h2>
    <div className="bg-white border border-border overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-left text-sumi/50 text-xs bg-kiji/30">
            <th className="py-3 px-4">サービス</th>
            <th className="py-3 px-4 whitespace-nowrap">単位</th>
            <th className="py-3 px-4 whitespace-nowrap">料金目安</th>
            <th className="py-3 px-4 hidden sm:table-cell">備考</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.name} className="border-b border-border/60 last:border-0">
              <td className="py-3 px-4 text-sumi">{item.name}</td>
              <td className="py-3 px-4 text-sumi/60 text-xs whitespace-nowrap">{item.unit}</td>
              <td className="py-3 px-4 text-do font-medium whitespace-nowrap">{item.priceLabel}</td>
              <td className="py-3 px-4 text-sumi/50 text-xs hidden sm:table-cell">{item.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
);

export default function PricesPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "トップ", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "料金相場", item: `${SITE_URL}/prices` },
    ],
  };

  const faqs = [
    { question: "畳の表替えと新調はどちらが安いですか？", answer: "表替えは畳表だけを交換するため、畳床ごと作り替える新調より安く済みます。畳床がしっかりしていれば表替えで十分なことが多いです。" },
    { question: "見積もりより高くなることはありますか？", answer: "畳床の損傷が見つかった場合や、特殊サイズ・家具移動などで追加費用が出ることがあります。見積もり時に追加費用の条件を確認しておきましょう。" },
    { question: "なぜ業者によって料金が違うのですか？", answer: "使用する素材のグレード、工場の規模、出張範囲、サービス内容（家具移動・古畳処分の有無）などで差が出ます。料金だけでなく内訳とサービス範囲を比較しましょう。" },
    { question: "安すぎる業者は大丈夫ですか？", answer: "極端に安い場合、素材のグレードが低い、追加費用が後から発生するなどのケースがあります。内訳が明確で口コミ評価の高い業者を選ぶと安心です。" },
    { question: "裏返しはいくらくらいですか？", answer: "1枚あたり2,500円〜が目安です。新調・表替えから3〜5年で、畳表の裏面がまだきれいな場合に選べます。1枚につき1回までです。" },
    { question: "古い畳の処分費用はかかりますか？", answer: "新調時などに古畳の処分が必要になると、1枚あたり500円〜の処分費がかかる場合があります。見積もりに含まれるか確認しましょう。" },
    { question: "写真を送るだけで見積もりできますか？", answer: "写真見積もりに対応している業者であれば概算が可能です。最終金額は現地確認後に確定する場合があります。" },
  ];

  // 畳数別の目安シミュレーション（表替え・国産い草普及品 5,800円/枚で試算）
  const roomSim = [
    { room: "4.5畳", omotegae: "26,100円〜", uragaeshi: "11,250円〜", shinchou: "54,000円〜" },
    { room: "6畳", omotegae: "34,800円〜", uragaeshi: "15,000円〜", shinchou: "72,000円〜" },
    { room: "8畳", omotegae: "46,400円〜", uragaeshi: "20,000円〜", shinchou: "96,000円〜" },
    { room: "10畳", omotegae: "58,000円〜", uragaeshi: "25,000円〜", shinchou: "120,000円〜" },
  ];
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
  };

  const materialCompare = [
    { name: "国産い草", durability: "5〜7年", merit: "香り・肌触りが良い", demerit: "日焼け・色あせしやすい", price: "中" },
    { name: "和紙畳", durability: "10年以上", merit: "ダニ・カビに強く色あせしにくい", demerit: "い草の香りはない", price: "やや高" },
    { name: "樹脂畳", durability: "10年以上", merit: "水・汚れに強く掃除が簡単", demerit: "夏場に熱がこもりやすい", price: "やや高" },
    { name: "外国産い草", durability: "3〜5年", merit: "価格が安い", demerit: "耐久性は国産に劣る", price: "安" },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="min-h-screen bg-shiro">
        <div className="bg-sumi">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumbs variant="dark" items={[{ label: "トップ", href: "/" }, { label: "料金相場" }]} />
          </div>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 pt-4">
            <h1 className="text-2xl md:text-3xl text-white mb-3" style={{ fontFamily: "var(--font-serif)" }}>
              畳・内装工事の料金相場
            </h1>
            <p className="text-sm text-white/60 max-w-2xl">
              畳の表替え・新調から、ふすま・障子・クロスの張替え、原状回復まで。素材別・畳数別の料金目安と、見積もり時の確認ポイントを解説します。
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <PriceTable title="畳工事の料金相場" items={TATAMI_PRICES} />
          <PriceTable title="ふすま・障子・内装の料金相場" items={INTERIOR_PRICES} />
          <PriceTable title="原状回復の料金相場" items={RESTORATION_PRICES} />

          {/* 素材比較表 */}
          <section className="mb-10">
            <h2 className="text-lg text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>
              畳表の素材比較
            </h2>
            <div className="bg-white border border-border overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-sumi/50 text-xs bg-kiji/30">
                    <th className="py-3 px-4">素材</th>
                    <th className="py-3 px-4 whitespace-nowrap">耐久年数</th>
                    <th className="py-3 px-4">メリット</th>
                    <th className="py-3 px-4 hidden sm:table-cell">デメリット</th>
                    <th className="py-3 px-4 whitespace-nowrap">価格帯</th>
                  </tr>
                </thead>
                <tbody>
                  {materialCompare.map((m) => (
                    <tr key={m.name} className="border-b border-border/60 last:border-0">
                      <td className="py-3 px-4 text-sumi font-medium whitespace-nowrap">{m.name}</td>
                      <td className="py-3 px-4 text-sumi/70 text-xs whitespace-nowrap">{m.durability}</td>
                      <td className="py-3 px-4 text-sumi/70 text-xs">{m.merit}</td>
                      <td className="py-3 px-4 text-sumi/50 text-xs hidden sm:table-cell">{m.demerit}</td>
                      <td className="py-3 px-4 text-do text-xs whitespace-nowrap">{m.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 畳数別シミュレーション */}
          <section className="mb-10">
            <h2 className="text-lg text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>
              畳数別の料金目安シミュレーション
            </h2>
            <div className="bg-white border border-border overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-sumi/50 text-xs bg-kiji/30">
                    <th className="py-3 px-4">部屋の広さ</th>
                    <th className="py-3 px-4 whitespace-nowrap">表替え</th>
                    <th className="py-3 px-4 whitespace-nowrap">裏返し</th>
                    <th className="py-3 px-4 whitespace-nowrap">新調</th>
                  </tr>
                </thead>
                <tbody>
                  {roomSim.map((r) => (
                    <tr key={r.room} className="border-b border-border/60 last:border-0">
                      <td className="py-3 px-4 text-sumi font-medium whitespace-nowrap">{r.room}</td>
                      <td className="py-3 px-4 text-do whitespace-nowrap">{r.omotegae}</td>
                      <td className="py-3 px-4 text-do whitespace-nowrap">{r.uragaeshi}</td>
                      <td className="py-3 px-4 text-do whitespace-nowrap">{r.shinchou}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-sumi/40 mt-2">
              ※ 表替えは国産い草普及品（5,800円/枚）、裏返しは2,500円/枚、新調は12,000円/枚で試算した目安です。素材・状態により変動します。
            </p>
          </section>

          {/* 追加費用が出るケース */}
          <section className="mb-10 bg-white border border-border p-6">
            <h2 className="text-lg text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>
              追加費用が出やすいケース
            </h2>
            <ul className="space-y-2 text-sm text-sumi/70">
              {[
                "家具の移動が必要な場合（1点あたり500〜2,000円が目安）",
                "畳床に損傷があり補修が必要な場合",
                "特殊サイズ・変形の畳（採寸後に見積もり）",
                "駐車場がなくコインパーキングを利用する場合",
                "エレベーターのない3階以上への搬入",
                "縁（へり）を高級品にアップグレードする場合",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <span className="text-do mt-0.5">＋</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 見積もり時の確認ポイント */}
          <section className="mb-10 bg-kiji/40 border border-kiji p-6">
            <h2 className="text-lg text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>
              見積もり時に確認すべきポイント
            </h2>
            <ul className="space-y-2 text-sm text-sumi/70">
              {[
                "料金に家具移動・古畳処分が含まれているか",
                "使用する畳表の素材・グレードが明記されているか",
                "出張費・駐車場代が別途かかるか",
                "追加費用が発生する条件が説明されているか",
                "工期・納期の目安が示されているか",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <span className="text-igusa mt-0.5">✓</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 注意書き */}
          <section className="mb-10">
            <div className="bg-white border border-border p-5">
              <h3 className="text-sm text-sumi mb-2 font-medium">料金についての注意</h3>
              <ul className="space-y-1.5 text-xs text-sumi/50">
                {PRICE_NOTES.map((n) => (
                  <li key={n}>※ {n}</li>
                ))}
              </ul>
            </div>
          </section>

          <FAQSection items={faqs} title="料金に関するよくある質問" />

          <section className="mt-10 bg-sumi text-center py-12 px-6">
            <h2 className="text-xl md:text-2xl text-white mb-3" style={{ fontFamily: "var(--font-serif)" }}>
              正確な料金は無料見積もりで
            </h2>
            <p className="text-sm text-white/60 mb-6 max-w-xl mx-auto">
              料金は現場の状況・素材・枚数で変わります。複数業者に無料見積もりを依頼して比較しましょう。
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/search" className="inline-block bg-kincya text-white px-8 py-3.5 text-sm hover:bg-do transition-colors">
                業者を探して見積もり依頼
              </Link>
              <Link href="/bulk-quote" className="inline-block border border-white/40 text-white px-8 py-3.5 text-sm hover:border-white transition-colors">
                一括見積もりを依頼
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
