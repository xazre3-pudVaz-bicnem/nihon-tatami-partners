import type { Metadata } from "next";
import PageHeader from "@/components/common/PageHeader";
import CTASection from "@/components/common/CTASection";
import FAQSection from "@/components/common/FAQSection";
import ServiceCard from "@/components/common/ServiceCard";
import { createMetadata } from "@/lib/metadata";
import { TATAMI_SERVICES } from "@/data/services";
import type { FAQ } from "@/lib/types";

export const metadata: Metadata = createMetadata({
  title: "畳工事一覧｜表替え・裏返し・新調・縁なし畳",
  description: "畳の表替え・裏返し・新調・縁なし畳・琉球畳・和紙畳・樹脂畳・カラー畳まで。日本畳パートナーズの畳工事サービス一覧です。",
  path: "/services/tatami",
});

const tatamiSelectFaqs: FAQ[] = [
  {
    question: "表替え・裏返し・新調、どれを選べば良いですか？",
    answer:
      "使用年数を目安にお選びください。3〜5年目は「裏返し」、5〜10年目は「表替え」、15〜20年以上で畳床が傷んでいる場合は「新調」が適しています。ただし、カビ・ダニの発生や大きな損傷がある場合は年数にかかわらず早めの対応が必要です。",
    category: "general",
  },
  {
    question: "い草の畳と和紙畳・樹脂畳、何が違いますか？",
    answer:
      "い草は天然素材の香りと風合いが魅力ですが、湿気に弱くカビ・ダニが発生しやすい面があります。和紙畳はカラーが豊富でダニ・カビに強く、現代の生活スタイルに合わせやすい素材です。樹脂畳は耐水性が最も高く、水まわりや旅館の厨房近くにも使えます。",
    category: "general",
  },
  {
    question: "縁なし畳にするとコストは変わりますか？",
    answer:
      "縁なし畳は製作上の手間がかかるため、通常の縁あり畳より費用がやや高くなる場合があります。ただし、縁布のコストが不要になるため、トータルの差は素材によって変わります。詳しくはお見積もりにてご確認ください。",
    category: "general",
  },
  {
    question: "畳のサイズは部屋に合わせてオーダーできますか？",
    answer:
      "はい、オーダー製作が基本です。既製品サイズではなく、お部屋の寸法を実測した上で一枚一枚製作します。リフォームで部屋の形が変わった場合や変形間取りにも対応できます。",
    category: "general",
  },
];

export default function TatamiPage() {
  return (
    <>
      <PageHeader
        title="畳工事一覧｜表替え・裏返し・新調・縁なし畳"
        subtitle="い草の伝統から現代素材まで。住宅・旅館・寺社の畳工事を専門にお受けします。"
        breadcrumbs={[
          { label: "サービス", href: "/services" },
          { label: "畳工事" },
        ]}
        badge="TATAMI"
      />

      {/* サービス一覧 */}
      <section className="section-py bg-shiro">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10 bg-kincya" />
              <span className="text-xs tracking-widest text-kincya">SERVICES</span>
            </div>
            <h2
              className="text-2xl md:text-3xl text-sumi"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              畳工事の種類
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {TATAMI_SERVICES.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* 畳工事の選び方 */}
      <section className="section-py bg-kiji/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10 bg-kincya" />
              <span className="text-xs tracking-widest text-kincya">HOW TO CHOOSE</span>
            </div>
            <h2
              className="text-2xl md:text-3xl text-sumi mb-4"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              畳工事の選び方｜年数の目安
            </h2>
            <p className="text-sm text-sumi/70 leading-relaxed max-w-2xl">
              使用年数と状態を確認して、最適な畳工事を選びましょう。迷った場合は現地確認の上でご提案します。
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white text-sm">
              <thead>
                <tr className="bg-ai text-white">
                  <th className="px-4 py-3 text-left font-normal tracking-wider text-xs">工事の種類</th>
                  <th className="px-4 py-3 text-left font-normal tracking-wider text-xs">使用年数の目安</th>
                  <th className="px-4 py-3 text-left font-normal tracking-wider text-xs">工事内容</th>
                  <th className="px-4 py-3 text-left font-normal tracking-wider text-xs">費用感</th>
                  <th className="px-4 py-3 text-left font-normal tracking-wider text-xs">こんな方に</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr className="hover:bg-kiji/20 transition-colors">
                  <td className="px-4 py-4 font-medium text-sumi" style={{ fontFamily: "var(--font-serif)" }}>裏返し</td>
                  <td className="px-4 py-4 text-sumi/70">3〜5年目</td>
                  <td className="px-4 py-4 text-sumi/70">畳表の裏面を表に向けて使用</td>
                  <td className="px-4 py-4 text-kincya">低コスト</td>
                  <td className="px-4 py-4 text-sumi/70">費用を抑えてリフレッシュしたい方</td>
                </tr>
                <tr className="hover:bg-kiji/20 transition-colors">
                  <td className="px-4 py-4 font-medium text-sumi" style={{ fontFamily: "var(--font-serif)" }}>表替え</td>
                  <td className="px-4 py-4 text-sumi/70">5〜10年目</td>
                  <td className="px-4 py-4 text-sumi/70">畳表（い草）を新品に張替え</td>
                  <td className="px-4 py-4 text-kincya">中コスト</td>
                  <td className="px-4 py-4 text-sumi/70">定期メンテナンスをしたい方</td>
                </tr>
                <tr className="hover:bg-kiji/20 transition-colors">
                  <td className="px-4 py-4 font-medium text-sumi" style={{ fontFamily: "var(--font-serif)" }}>新調</td>
                  <td className="px-4 py-4 text-sumi/70">15〜20年以上</td>
                  <td className="px-4 py-4 text-sumi/70">畳床ごと新品に作り直し</td>
                  <td className="px-4 py-4 text-kincya">高コスト</td>
                  <td className="px-4 py-4 text-sumi/70">リフォームに合わせて一新したい方</td>
                </tr>
                <tr className="hover:bg-kiji/20 transition-colors">
                  <td className="px-4 py-4 font-medium text-sumi" style={{ fontFamily: "var(--font-serif)" }}>縁なし・和紙・樹脂</td>
                  <td className="px-4 py-4 text-sumi/70">リフォーム時・素材変更時</td>
                  <td className="px-4 py-4 text-sumi/70">素材・仕様を変更した新調</td>
                  <td className="px-4 py-4 text-kincya">素材による</td>
                  <td className="px-4 py-4 text-sumi/70">モダンな空間・機能性を求める方</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 補足 */}
          <div className="mt-8 p-6 bg-white border border-border">
            <h3
              className="text-base text-sumi mb-3"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              畳の状態でも判断できます
            </h3>
            <ul className="space-y-2 text-sm text-sumi/70">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-kincya rounded-full mt-2 shrink-0" />
                <span>色あせ・軽い毛羽立ち → 裏返しまたは表替えで改善できます</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-kincya rounded-full mt-2 shrink-0" />
                <span>ささくれ・表面の擦り切れ → 表替えのタイミングです</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-kincya rounded-full mt-2 shrink-0" />
                <span>畳が沈む・踏み心地が悪い → 畳床の傷みが考えられます。新調をご検討ください</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-kincya rounded-full mt-2 shrink-0" />
                <span>カビ・ダニが発生した → 素材や状態によりますが、早めの交換が安心です</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <FAQSection
        items={tatamiSelectFaqs}
        title="畳工事に関するよくある質問"
        subtitle="工事の種類・素材・費用についてよく寄せられるご質問です。"
      />

      <CTASection
        title="畳工事のご相談・無料見積もりはこちら"
        description="現地確認の上、最適な工事をご提案します。まずはお気軽にご連絡ください。"
      />
    </>
  );
}
