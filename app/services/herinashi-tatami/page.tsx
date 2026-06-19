import type { Metadata } from "next";
import PageHeader from "@/components/common/PageHeader";
import CTASection from "@/components/common/CTASection";
import FAQSection from "@/components/common/FAQSection";
import ServiceCard from "@/components/common/ServiceCard";
import { createMetadata } from "@/lib/metadata";
import { TATAMI_SERVICES } from "@/data/services";
import type { FAQ } from "@/lib/types";

export const metadata: Metadata = createMetadata({
  title: "縁なし畳｜モダン和室・リビング和空間に",
  description: "縁（へり）のない半畳タイプの畳を市松模様に敷くモダンなスタイル。リビングや書斎など洋風空間に和を取り入れたい方に人気です。和紙畳・樹脂畳対応。無料見積もり受付中。",
  path: "/services/herinashi-tatami",
});

const faqs: FAQ[] = [
  {
    question: "縁なし畳は普通の畳より高いですか？",
    answer:
      "縁なし畳は製作工程が異なるため、通常の縁あり畳よりやや高くなる傾向があります。ただし、縁布の費用が不要になるため、差は素材によって変わります。正確な金額はお見積もりでご確認ください。",
    category: "price",
  },
  {
    question: "フローリングの部屋に縁なし畳を敷くことはできますか？",
    answer:
      "はい、可能です。フローリングの上に直接置く「置き畳」スタイルとして対応できます。通常の畳より薄い仕様にすることも可能ですので、ご要望をお聞かせください。",
    category: "general",
  },
  {
    question: "縁なし畳の市松模様はどうやって作るのですか？",
    answer:
      "半畳サイズの畳を90度ずつ向きを変えて交互に敷くことで、光の反射角度が変わり市松模様の陰影が生まれます。特別な着色や加工をしているわけではなく、畳表の目の方向性によって自然に生じる表情です。",
    category: "general",
  },
  {
    question: "縁なし畳のお手入れ方法を教えてください。",
    answer:
      "基本は通常の畳と同じで、い草・和紙・樹脂素材によって多少異なります。い草は乾燥を避け、和紙・樹脂は汚れをさっと拭き取れます。縁がないため縁部分のほつれを気にする必要がなく、お手入れはシンプルです。",
    category: "general",
  },
  {
    question: "縁なし畳はどのような素材で作れますか？",
    answer:
      "い草・和紙・樹脂それぞれの素材で縁なし畳を製作できます。カラーバリエーションが豊富な和紙畳でカラフルな縁なし畳にするのも人気です。旅館や高級施設では目積表（琉球畳風）が多く使われています。",
    category: "general",
  },
];

export default function HerinashiTatamiPage() {
  const relatedServices = TATAMI_SERVICES.filter(
    (s) => s.id !== "herinashi-tatami"
  ).slice(0, 4);

  return (
    <>
      <PageHeader
        title="縁なし畳"
        subtitle="モダンな空間に映える、縁のないスタイル。"
        description="縁（へり）のない半畳タイプの畳を市松模様に敷くことで、洗練された和の空間を演出します。リビング・書斎・和モダンインテリアに人気です。"
        breadcrumbs={[
          { label: "サービス", href: "/services" },
          { label: "畳工事", href: "/services/tatami" },
          { label: "縁なし畳" },
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
                縁なし畳とは
              </h2>
              <div className="space-y-4 text-sm text-sumi/80 leading-relaxed">
                <p>
                  縁なし畳とは、畳の周囲に縁布（へりぬの）のない仕様の畳です。通常の畳は周囲に縁布を縫い付けますが、縁なし畳はその縁布を省略し、畳表の端をそのまま仕上げます。
                </p>
                <p>
                  半畳サイズで製作した縁なし畳を90度ずつ交互に敷くことで、光の反射角度の違いから自然な市松模様の陰影が生まれます。この独特の表情が現代的な和室・和モダンインテリアに高く評価されています。
                </p>
                <p>
                  リビングや書斎など洋風の空間に和のテイストを取り入れたい場合、縁なし畳はフローリングとの相性が良く、一部空間に敷くだけで雰囲気が変わります。
                </p>
              </div>

              {/* 特徴 */}
              <div className="mt-10">
                <h3 className="text-lg text-sumi mb-5" style={{ fontFamily: "var(--font-serif)" }}>
                  縁なし畳の特徴
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { title: "市松模様の美しさ", desc: "半畳を交互に敷くことで生まれる自然な陰影が和モダンな雰囲気を演出" },
                    { title: "洋室との相性が良い", desc: "縁布がないためフローリングや洋風インテリアとも調和しやすい" },
                    { title: "素材の選択肢が広い", desc: "い草・和紙・樹脂・目積表など多様な素材から選べる" },
                    { title: "置き畳としても使える", desc: "フローリングの上に敷く置き畳スタイルとして設置も可能" },
                    { title: "サイズオーダー製作", desc: "部屋の寸法に合わせた一枚一枚のオーダー製作" },
                    { title: "旅館・施設にも人気", desc: "旅館の客室・ホテルのジャパニーズスイートなどでも採用" },
                  ].map((item) => (
                    <div key={item.title} className="p-4 border border-border bg-kiji/30">
                      <p className="text-sm font-medium text-sumi mb-1" style={{ fontFamily: "var(--font-serif)" }}>{item.title}</p>
                      <p className="text-xs text-sumi/60">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 素材の組み合わせ */}
              <div className="mt-10">
                <h3 className="text-lg text-sumi mb-5" style={{ fontFamily: "var(--font-serif)" }}>
                  縁なし畳の素材・スタイル例
                </h3>
                <div className="space-y-4">
                  {[
                    { style: "目積表（琉球畳風）", desc: "最もポピュラーな縁なし畳。七島い草に似た目積の表面が市松模様を際立たせます。旅館・高級住宅に多い定番スタイル。" },
                    { style: "和紙畳 縁なし", desc: "カラーバリエーションが豊富な和紙素材の縁なし畳。グリーン・ベージュ・グレーなどインテリアに合わせた色選びが楽しめます。" },
                    { style: "い草 縁なし", desc: "天然い草を縁なしに仕上げたスタイル。い草本来の香りと風合いを残しながら現代的な見た目に。" },
                    { style: "樹脂畳 縁なし", desc: "耐水性・耐久性に優れた樹脂素材の縁なし畳。ペットや子どもがいる家庭にも安心。" },
                  ].map((item) => (
                    <div key={item.style} className="flex gap-4 p-4 border border-border bg-white">
                      <div className="w-1 bg-kincya shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-sumi" style={{ fontFamily: "var(--font-serif)" }}>{item.style}</p>
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
                    こんな方におすすめ
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "洋室に和の空間を取り入れたい",
                      "リビングの一角に畳コーナーを作りたい",
                      "旅館・ホテルの客室を和モダンに",
                      "フローリングの上に置き畳を敷きたい",
                      "縁布のデザインが気になっていた方",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-sumi/70">
                        <span className="w-1.5 h-1.5 bg-kincya rounded-full mt-2 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
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

      <FAQSection items={faqs} title="縁なし畳に関するよくある質問" />

      <CTASection
        title="縁なし畳の無料見積もり・ご相談はこちら"
        description="素材・サイズ・スタイルのご相談を承ります。現地確認の上、最適な縁なし畳をご提案します。"
      />
    </>
  );
}
