import type { Metadata } from "next";
import PageHeader from "@/components/common/PageHeader";
import CTASection from "@/components/common/CTASection";
import FAQSection from "@/components/common/FAQSection";
import { createMetadata } from "@/lib/metadata";
import type { FAQ } from "@/lib/types";

export const metadata: Metadata = createMetadata({
  title: "旅館・宿泊施設向け畳工事｜全客室一括対応",
  description: "旅館・ホテル・民宿の客室畳工事を一括対応。繁忙期を避けた施工スケジュール・複数職人での並行施工で営業への影響を最小化。琉球畳・樹脂畳も対応。無料見積もり受付中。",
  path: "/business/ryokan",
});

const faqs: FAQ[] = [
  {
    question: "旅館の全客室の畳を一括して張り替えられますか？",
    answer:
      "はい、対応可能です。旅館の全客室を一括して工事する実績があります。繁忙期を避けた施工スケジュールの調整、複数職人での並行施工など、営業への影響を最小化した対応が可能です。",
    category: "business",
  },
  {
    question: "旅館に向いている畳素材はどれですか？",
    answer:
      "旅館の客室には琉球畳（目積表）・和紙畳・樹脂畳が多く採用されています。耐久性が高く、使用頻度が高くても長持ちする素材が適しています。水まわりが近い場合は樹脂畳、格式を重視するなら目積表や稲わら床の組み合わせをご提案します。",
    category: "business",
  },
  {
    question: "繁忙期には工事できませんか？",
    answer:
      "旅館様の繁忙期（GW・お盆・年末年始）を避けた施工スケジュールをご提案します。閑散期や連休前の工事で、繁忙期を新しい畳で迎えていただけるよう計画を立てます。",
    category: "business",
  },
  {
    question: "客室ごとに異なる畳素材にすることはできますか？",
    answer:
      "はい、客室のグレード・コンセプトに合わせて素材を変えることも可能です。例えば、スイートルームには高級な稲わら床+本畳、スタンダード客室には建材床+和紙畳など、ご要望に応じたご提案をします。",
    category: "business",
  },
];

export default function RyokanPage() {
  return (
    <>
      <PageHeader
        title="旅館・宿泊施設向け畳工事"
        subtitle="営業を止めない、全客室まとめての畳工事。"
        description="旅館・ホテル・民宿の全客室の畳工事を一括対応します。繁忙期を避けたスケジュール調整・複数職人での並行施工で、営業への影響を最小限に抑えます。"
        breadcrumbs={[
          { label: "法人向けサービス", href: "/business" },
          { label: "旅館・宿泊施設向け" },
        ]}
        badge="BUSINESS"
      />

      <section className="section-py bg-shiro">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10 bg-kincya" />
              <span className="text-xs tracking-widest text-kincya">CHALLENGES & SOLUTIONS</span>
            </div>
            <h2 className="text-2xl text-sumi mb-8" style={{ fontFamily: "var(--font-serif)" }}>
              旅館・宿泊施設様のご課題と対応
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { challenge: "全客室の畳を一斉に替えたいが工期が心配", solution: "複数職人での並行施工で工期を圧縮。閑散期に集中して全客室を完了します。" },
                { challenge: "繁忙期に施工業者を入れたくない", solution: "繁忙期前の施工完了を目標にスケジュールを逆算して計画。営業への影響をゼロに。" },
                { challenge: "客室の格式に合う素材を選びたい", solution: "稲わら床・目積表・和紙畳・樹脂畳など、グレード・コンセプトに合わせた素材をご提案。" },
                { challenge: "費用を一定に予算化したい", solution: "継続取引の場合、年次メンテナンスプランで予算を安定化。突発的なコストを抑えます。" },
              ].map((item, i) => (
                <div key={i} className="border border-border bg-white p-6">
                  <div className="mb-4">
                    <span className="text-xs text-sumi/40 tracking-widest">課題</span>
                    <p className="text-sm font-medium text-sumi mt-1" style={{ fontFamily: "var(--font-serif)" }}>{item.challenge}</p>
                  </div>
                  <div className="pt-4 border-t border-kincya/20">
                    <span className="text-xs text-kincya tracking-widest">解決策</span>
                    <p className="text-sm text-sumi/70 mt-1 leading-relaxed">{item.solution}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 旅館向け素材 */}
          <div className="mb-14">
            <h3 className="text-lg text-sumi mb-6" style={{ fontFamily: "var(--font-serif)" }}>
              旅館・宿泊施設に適した畳素材
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {[
                { material: "琉球畳（目積表）", grade: "スタンダード〜ハイグレード", desc: "独特の表面パターンと高耐久性。旅館客室の定番素材。縁なし仕様で和モダンな印象。" },
                { material: "和紙畳", grade: "スタンダード", desc: "カラーが豊富でダニ・カビに強い。使用頻度が高い施設でも衛生的に保てる。" },
                { material: "稲わら床+本畳", grade: "ハイグレード", desc: "最高級の踏み心地と調湿性。特別室・高級旅館の客室に格調を与える。" },
              ].map((item) => (
                <div key={item.material} className="p-5 border border-border bg-kiji/30">
                  <p className="text-sm font-medium text-sumi" style={{ fontFamily: "var(--font-serif)" }}>{item.material}</p>
                  <span className="inline-block text-xs text-kincya border border-kincya/30 px-2 py-0.5 mt-2">{item.grade}</span>
                  <p className="text-xs text-sumi/60 mt-3 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 対応サービス */}
          <div className="mb-14">
            <h3 className="text-lg text-sumi mb-5" style={{ fontFamily: "var(--font-serif)" }}>
              対応できる工事内容
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "全客室の畳の表替え・新調",
                "琉球畳・和紙畳・樹脂畳の導入",
                "客室ごとの素材・グレード変更",
                "障子・襖・網戸の張替え",
                "繁忙期を考慮したスケジュール計画",
                "複数職人での並行施工",
                "年次メンテナンス計画の提案",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 p-3 border border-border bg-kiji/20">
                  <span className="w-1.5 h-1.5 bg-kincya rounded-full shrink-0" />
                  <span className="text-sm text-sumi/70">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FAQSection items={faqs} title="旅館・宿泊施設様からよくある質問" />

      <CTASection
        title="旅館・宿泊施設の畳工事ご相談はこちら"
        description="客室数・素材のご要望・施工スケジュールをお聞きした上で、最適なプランをご提案します。"
        showBusiness={false}
      />
    </>
  );
}
