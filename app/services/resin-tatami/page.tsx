import type { Metadata } from "next";
import PageHeader from "@/components/common/PageHeader";
import CTASection from "@/components/common/CTASection";
import FAQSection from "@/components/common/FAQSection";
import ServiceCard from "@/components/common/ServiceCard";
import { createMetadata } from "@/lib/metadata";
import { TATAMI_SERVICES } from "@/data/services";
import type { FAQ } from "@/lib/types";

export const metadata: Metadata = createMetadata({
  title: "樹脂畳｜水に強く丈夫。旅館・飲食店に最適",
  description: "ポリプロピレン製の樹脂畳は耐水性・耐久性に優れ、水まわりや旅館・飲食店に最適。汚れが落としやすくお手入れが簡単。無料見積もり受付中。",
  path: "/services/resin-tatami",
});

const faqs: FAQ[] = [
  {
    question: "樹脂畳はどんな場所に向いていますか？",
    answer:
      "耐水性・耐久性が高いため、厨房に隣接した和室・水まわりが近い場所・旅館の客室・飲食店の座敷・ペットがいるご家庭などに適しています。汚れが落としやすく衛生的に保てます。",
    category: "general",
  },
  {
    question: "樹脂畳の踏み心地はい草畳と違いますか？",
    answer:
      "素材の性質上、い草畳よりやや硬めの踏み心地になります。ただし、畳床（芯材）の種類によって踏み心地は変わるため、用途に合わせた芯材と組み合わせることでクッション性を確保できます。",
    category: "general",
  },
  {
    question: "樹脂畳はカビ・ダニが発生しないですか？",
    answer:
      "樹脂素材自体にはカビ・ダニは発生しません。ただし、畳床（芯材）の素材によっては湿気が溜まる場合があります。防カビ・防ダニ加工の芯材と組み合わせることで、より衛生的な環境を保てます。",
    category: "general",
  },
  {
    question: "既存の畳から樹脂畳への変更はできますか？",
    answer:
      "はい、表替えのタイミングで樹脂畳への変更が可能です。畳床が問題なければ表面素材の交換だけで切り替えられます。畳床が傷んでいる場合は新調をお勧めします。",
    category: "general",
  },
  {
    question: "樹脂畳のお手入れ方法を教えてください。",
    answer:
      "水拭きが可能なため、汚れたらすぐに拭き取ることができます。中性洗剤を薄めて拭くことも可能です。い草畳のように水分を嫌がることがなく、掃除機での清掃も問題ありません。",
    category: "general",
  },
];

export default function ResinTatamiPage() {
  const relatedServices = TATAMI_SERVICES.filter(
    (s) => s.id !== "resin-tatami"
  ).slice(0, 4);

  return (
    <>
      <PageHeader
        title="樹脂畳"
        subtitle="水に強く丈夫。お手入れしやすい素材。"
        description="ポリプロピレンなどの樹脂素材で作られた畳表です。耐水性・耐久性に優れ、厨房が近い和室や水まわり、旅館・飲食店の座敷に最適です。"
        breadcrumbs={[
          { label: "サービス", href: "/services" },
          { label: "畳工事", href: "/services/tatami" },
          { label: "樹脂畳" },
        ]}
        badge="TATAMI"
      />

      <section className="section-py bg-shiro">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-10 bg-kincya" />
                <span className="text-xs tracking-widest text-kincya">ABOUT</span>
              </div>
              <h2 className="text-2xl text-sumi mb-6" style={{ fontFamily: "var(--font-serif)" }}>
                樹脂畳とは
              </h2>
              <div className="space-y-4 text-sm text-sumi/80 leading-relaxed">
                <p>
                  樹脂畳は、ポリプロピレンなどの樹脂素材を畳表として使用した畳です。見た目はい草畳に近いですが、耐水性・耐久性・衛生面で優れた特性を持ちます。
                </p>
                <p>
                  最大の特徴は耐水性です。水拭きができるため、飲食店の座敷・厨房に隣接した和室・旅館の浴場近くの和室などでも安心して使用できます。旅館・飲食店・施設での採用実績も豊富です。
                </p>
                <p>
                  耐久性も高く、通常のい草畳より長持ちします。ペットの引っかきや子どものいたずらによる傷もつきにくいため、家庭での使用にも適しています。
                </p>
              </div>

              {/* 主な特長 */}
              <div className="mt-10">
                <h3 className="text-lg text-sumi mb-5" style={{ fontFamily: "var(--font-serif)" }}>
                  樹脂畳の主な特長
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { title: "耐水性", desc: "水拭き可能。水まわりや飲食店の座敷でも安心" },
                    { title: "高耐久性", desc: "摩擦・圧力に強く、通常の畳より長持ち" },
                    { title: "カビ・ダニが発生しにくい", desc: "樹脂素材のため清潔を保てる" },
                    { title: "汚れが落としやすい", desc: "食べこぼし・飲みこぼしをさっと拭き取れる" },
                    { title: "変色しにくい", desc: "い草のような急激な色変わりがない" },
                    { title: "豊富なカラー", desc: "グリーン・ベージュ・グレーなど複数色から選択" },
                  ].map((item) => (
                    <div key={item.title} className="p-4 border border-border bg-kiji/30">
                      <p className="text-sm font-medium text-sumi" style={{ fontFamily: "var(--font-serif)" }}>{item.title}</p>
                      <p className="text-xs text-sumi/60 mt-1">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 適した場所 */}
              <div className="mt-10">
                <h3 className="text-lg text-sumi mb-5" style={{ fontFamily: "var(--font-serif)" }}>
                  樹脂畳が特に活躍する場所
                </h3>
                <div className="space-y-3">
                  {[
                    { place: "飲食店の座敷・個室", desc: "食べこぼし・飲み物のこぼしに強く、お手入れが楽。旅館・料亭での採用実績多数。" },
                    { place: "旅館・ホテルの客室", desc: "高耐久性で回転が多い施設の畳に最適。特に利用頻度の高い客室に。" },
                    { place: "厨房近くの和室", desc: "水気・油気が飛びやすい環境でも劣化しにくい。業務用に対応。" },
                    { place: "ペット同居住宅", desc: "爪での傷がつきにくく、粗相しても水拭きで対応できる。" },
                    { place: "子育て世帯の和室", desc: "汚れや傷を気にせず使える。衛生的でダニ・カビの心配が少ない。" },
                  ].map((item) => (
                    <div key={item.place} className="flex gap-4 p-4 border border-border bg-white">
                      <div className="w-1 bg-kincya shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-sumi" style={{ fontFamily: "var(--font-serif)" }}>{item.place}</p>
                        <p className="text-xs text-sumi/60 mt-1">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                <div className="p-6 bg-kiji border border-border">
                  <h3 className="text-base text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>
                    費用の目安
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-xs text-sumi/70">樹脂畳 表替え</span>
                      <span className="text-sm text-kincya">12,000〜22,000円/枚</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-xs text-sumi/70">樹脂畳 新調</span>
                      <span className="text-sm text-kincya">22,000〜38,000円/枚</span>
                    </div>
                  </div>
                  <p className="text-xs text-sumi/50 mt-4">※グレード・枚数・現場状況により変わります。</p>
                </div>
                <div>
                  <h3 className="text-sm text-sumi mb-3" style={{ fontFamily: "var(--font-serif)" }}>
                    関連する畳工事
                  </h3>
                  <div className="space-y-2">
                    {relatedServices.map((s) => (
                      <ServiceCard key={s.id} service={s} variant="compact" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQSection items={faqs} title="樹脂畳に関するよくある質問" />

      <CTASection
        title="樹脂畳の無料見積もり・ご相談はこちら"
        description="飲食店・旅館・住宅など様々な用途に対応します。耐水性・耐久性が必要な場所への施工はお任せください。"
      />
    </>
  );
}
