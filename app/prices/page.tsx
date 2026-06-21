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

// ─── 価格カードコンポーネント ───────────────────────────────────
function PriceCard({ item }: { item: PriceItem }) {
  return (
    <div className="bg-shiro border border-border rounded-xl p-5 flex flex-col gap-2">
      <p className="text-sm font-medium text-sumi leading-snug">{item.name}</p>
      <p className="text-xl font-bold text-do" style={{ fontFamily: "var(--font-serif)" }}>
        {item.priceLabel}
      </p>
      <p className="text-xs text-sumi/50">{item.unit}</p>
      {item.note && (
        <p className="text-xs text-sumi/40 border-t border-border pt-2 mt-1">{item.note}</p>
      )}
    </div>
  );
}

// ─── カテゴリセクション ─────────────────────────────────────────
function PriceCategory({
  title,
  subtitle,
  items,
  accent,
}: {
  title: string;
  subtitle: string;
  items: PriceItem[];
  accent?: string;
}) {
  return (
    <section className="mb-12">
      <div className="flex items-center gap-3 mb-5">
        {accent && (
          <span className="w-1 h-6 rounded-full" style={{ background: accent }} />
        )}
        <div>
          <h2 className="text-lg text-sumi" style={{ fontFamily: "var(--font-serif)" }}>
            {title}
          </h2>
          <p className="text-xs text-sumi/50 mt-0.5">{subtitle}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {items.map((item) => (
          <PriceCard key={item.name} item={item} />
        ))}
      </div>
    </section>
  );
}

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
    { question: "裏返しはいくらくらいですか？", answer: "1枚あたり3,500円〜が目安です。新調・表替えから3〜5年で、畳表の裏面がまだきれいな場合に選べます。1枚につき1回までです。" },
    { question: "古い畳の処分費用はかかりますか？", answer: "新調時などに古畳の処分が必要になると、1枚あたり500円〜の処分費がかかる場合があります。見積もりに含まれるか確認しましょう。" },
    { question: "写真を送るだけで見積もりできますか？", answer: "写真見積もりに対応している業者であれば概算が可能です。最終金額は現地確認後に確定する場合があります。" },
  ];

  // 畳数別の目安シミュレーション（表替え・国産い草普及品 5,800円/枚で試算）
  const roomSim = [
    { room: "4.5畳", omotegae: "26,100円〜", uragaeshi: "15,750円〜", shinchou: "67,500円〜" },
    { room: "6畳", omotegae: "34,800円〜", uragaeshi: "21,000円〜", shinchou: "90,000円〜" },
    { room: "8畳", omotegae: "46,400円〜", uragaeshi: "28,000円〜", shinchou: "120,000円〜" },
    { room: "10畳", omotegae: "58,000円〜", uragaeshi: "35,000円〜", shinchou: "150,000円〜" },
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

  // 追加費用一覧
  const additionalCosts = [
    { label: "家具移動", price: "500〜2,000円/点", note: "重量・移動距離による" },
    { label: "古畳処分", price: "500〜1,000円/枚", note: "業者・地域による" },
    { label: "出張費", price: "0〜3,000円", note: "遠距離・離島は別途" },
    { label: "駐車場代", price: "実費", note: "コインパーキング利用時" },
    { label: "高層階割増", price: "要相談", note: "エレベーターなし3F以上" },
    { label: "特殊サイズ採寸", price: "要見積もり", note: "変形・京間・江戸間など" },
  ];

  // 見積書チェックリスト
  const checklistItems = [
    "使用する畳表の素材・グレード・産地が明記されているか",
    "畳の枚数・サイズ・部屋数が正確に記載されているか",
    "家具移動・古畳処分が含まれているかどうかの記載があるか",
    "出張費・駐車場代が別途かかるか明示されているか",
    "追加費用が発生する条件・上限が説明されているか",
    "工期・施工日・納期の目安が示されているか",
    "支払い方法・タイミングが記載されているか",
    "業者の氏名・住所・連絡先が記載されているか",
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="min-h-screen bg-shiro">
        {/* ヘッダー */}
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

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

          {/* 免責事項バナー */}
          <div className="flex items-start gap-3 bg-kiji/40 border border-kiji rounded-xl px-4 py-3 mb-10 text-xs text-sumi/60 leading-relaxed">
            <span className="flex-shrink-0 text-sumi/40 mt-0.5">※</span>
            <span>
              掲載価格はすべて<strong className="text-sumi/70">目安（税別）</strong>です。正確な料金は現場の状況・素材・枚数により異なります。
              <strong className="text-sumi/70">必ず現地見積もりで確認</strong>してください。
            </span>
          </div>

          {/* ─── カテゴリ 1: 畳工事 ─── */}
          <PriceCategory
            title="畳工事"
            subtitle="表替え・裏返し・新調・琉球畳・縁なし・和紙畳"
            items={TATAMI_PRICES}
            accent="var(--color-igusa)"
          />

          {/* ─── カテゴリ 2: 和室工事 ─── */}
          <PriceCategory
            title="和室工事"
            subtitle="ふすま・障子・網戸・和室リフォーム"
            items={INTERIOR_PRICES}
            accent="var(--color-kincya)"
          />

          {/* ─── カテゴリ 3: 原状回復・その他 ─── */}
          <PriceCategory
            title="原状回復・その他"
            subtitle="クロス・クッションフロア・古畳処分・家具移動"
            items={RESTORATION_PRICES}
            accent="var(--color-do)"
          />

          {/* ─── 畳数別シミュレーション ─── */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-1 h-6 rounded-full bg-kincya" />
              <div>
                <h2 className="text-lg text-sumi" style={{ fontFamily: "var(--font-serif)" }}>
                  6畳・8畳・10畳の概算例
                </h2>
                <p className="text-xs text-sumi/50 mt-0.5">国産い草普及品（5,800円/枚）・裏返し（3,500円/枚）・新調建材床（15,000円/枚）で試算</p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {roomSim.map((r) => (
                <div key={r.room} className="bg-shiro border border-border rounded-xl p-4">
                  <p className="text-xs font-bold text-sumi/50 mb-3">{r.room}</p>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-sumi/40">表替え</p>
                      <p className="text-base font-bold text-do">{r.omotegae}</p>
                    </div>
                    <div>
                      <p className="text-xs text-sumi/40">裏返し</p>
                      <p className="text-base font-bold text-do">{r.uragaeshi}</p>
                    </div>
                    <div>
                      <p className="text-xs text-sumi/40">新調</p>
                      <p className="text-base font-bold text-do">{r.shinchou}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ─── 追加費用一覧 ─── */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-1 h-6 rounded-full bg-do" />
              <div>
                <h2 className="text-lg text-sumi" style={{ fontFamily: "var(--font-serif)" }}>
                  追加費用一覧
                </h2>
                <p className="text-xs text-sumi/50 mt-0.5">家具移動・古畳処分・出張費・駐車場代</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {additionalCosts.map((c) => (
                <div key={c.label} className="bg-shiro border border-border rounded-xl px-4 py-4 flex items-start gap-3">
                  <span className="text-do text-sm font-bold flex-shrink-0 mt-0.5">＋</span>
                  <div>
                    <p className="text-sm font-medium text-sumi">{c.label}</p>
                    <p className="text-sm text-do font-bold mt-0.5">{c.price}</p>
                    <p className="text-xs text-sumi/40 mt-0.5">{c.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ─── 畳表の素材比較 ─── */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-1 h-6 rounded-full bg-igusa" />
              <h2 className="text-lg text-sumi" style={{ fontFamily: "var(--font-serif)" }}>
                畳表の素材比較
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {materialCompare.map((m) => (
                <div key={m.name} className="bg-shiro border border-border rounded-xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-medium text-sumi">{m.name}</p>
                    <span className="text-xs border border-border rounded-full px-2 py-0.5 text-sumi/50">{m.price}</span>
                  </div>
                  <p className="text-xs text-sumi/50 mb-1">耐久年数：{m.durability}</p>
                  <p className="text-xs text-igusa mb-1">✓ {m.merit}</p>
                  <p className="text-xs text-sumi/40">△ {m.demerit}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ─── 写真見積もり CTA ─── */}
          <section className="mb-12 bg-kincya/5 border border-kincya/20 rounded-xl p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-xs font-medium text-kincya mb-1">写真見積もり対応</p>
                <h2 className="text-lg text-sumi mb-1" style={{ fontFamily: "var(--font-serif)" }}>
                  スマホ写真で概算がわかる
                </h2>
                <p className="text-sm text-sumi/60">
                  現地に来てもらう前に、写真を送るだけで料金目安をご確認いただけます。
                </p>
              </div>
              <Link
                href="/request/start"
                className="flex-shrink-0 inline-block bg-kincya text-white text-sm font-medium px-6 py-3 rounded-lg hover:bg-kincya/90 transition-colors duration-150 text-center"
              >
                写真で見積もりを依頼
              </Link>
            </div>
          </section>

          {/* ─── 見積書チェックリスト ─── */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-1 h-6 rounded-full bg-igusa" />
              <div>
                <h2 className="text-lg text-sumi" style={{ fontFamily: "var(--font-serif)" }}>
                  見積書チェックリスト
                </h2>
                <p className="text-xs text-sumi/50 mt-0.5">業者に見積もりをもらったら、必ずこの項目を確認してください</p>
              </div>
            </div>
            <div className="bg-kiji/40 border border-kiji rounded-xl p-5 sm:p-6">
              <ul className="space-y-3">
                {checklistItems.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-5 h-5 border-2 border-sumi/20 rounded mt-0.5" />
                    <span className="text-sm text-sumi/70 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* ─── 料金の注意書き ─── */}
          <section className="mb-12">
            <div className="bg-shiro border border-border rounded-xl p-5">
              <h3 className="text-sm text-sumi mb-3 font-medium">料金についての注意</h3>
              <ul className="space-y-1.5 text-xs text-sumi/50">
                {PRICE_NOTES.map((n) => (
                  <li key={n}>※ {n}</li>
                ))}
              </ul>
            </div>
          </section>

          <FAQSection items={faqs} title="料金に関するよくある質問" />

          {/* ─── ダブル CTA ─── */}
          <section className="mt-12 bg-sumi rounded-2xl text-center py-12 px-6">
            <h2 className="text-xl md:text-2xl text-white mb-2" style={{ fontFamily: "var(--font-serif)" }}>
              正確な料金は無料見積もりで確認を
            </h2>
            <p className="text-sm text-white/60 mb-8 max-w-xl mx-auto leading-relaxed">
              掲載価格はあくまで目安です。現場の状況・素材・枚数によって変わります。
              複数業者に無料見積もりを依頼して比較するのがベストです。
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Link
                href="/request/start"
                className="inline-block bg-kincya text-white px-8 py-3.5 text-sm font-medium rounded-lg hover:bg-kincya/90 transition-colors duration-150"
              >
                写真見積もりを依頼する
              </Link>
              <Link
                href="/bulk-quote"
                className="inline-block border border-white/40 text-white px-8 py-3.5 text-sm font-medium rounded-lg hover:border-white transition-colors duration-150"
              >
                一括見積もりを依頼
              </Link>
            </div>
            <p className="text-xs text-white/30 mt-5">登録不要・無料・見積もり義務なし</p>
          </section>
        </div>
      </div>
    </>
  );
}
