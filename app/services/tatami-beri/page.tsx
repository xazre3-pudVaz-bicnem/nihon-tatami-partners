import type { Metadata } from "next";
import PageHeader from "@/components/common/PageHeader";
import CTASection from "@/components/common/CTASection";
import FAQSection from "@/components/common/FAQSection";
import ServiceCard from "@/components/common/ServiceCard";
import { createMetadata } from "@/lib/metadata";
import { TATAMI_SERVICES } from "@/data/services";
import type { FAQ } from "@/lib/types";

export const metadata: Metadata = createMetadata({
  title: "畳縁（へり）交換｜縁布のリフレッシュ・デザイン変更",
  description: "傷んだ畳縁（へり布）の交換工事。無地・模様入り・金色など豊富なデザインから選べます。寺院向けの高級縁も取り扱い。縁のデザイン変更だけで畳の印象が大きく変わります。",
  path: "/services/tatami-beri",
});

const faqs: FAQ[] = [
  {
    question: "縁（へり）だけ交換することはできますか？",
    answer:
      "はい、畳表はそのままに縁布のみ交換することが可能です。縁が傷んでいるが表面はまだきれいな場合、費用を抑えてリフレッシュできます。現地で状態を確認してからご案内します。",
    category: "general",
  },
  {
    question: "縁のデザインはどのくらいの種類がありますか？",
    answer:
      "無地（黒・茶・グリーンなど）から、亀甲・菱形・花柄などの伝統的な柄、金色・銀色の高級縁まで幅広いラインナップがあります。寺社向けの格式ある縁や、旅館向けの縁など用途に合わせてご提案します。",
    category: "general",
  },
  {
    question: "縁交換の費用はどのくらいですか？",
    answer:
      "縁布の素材・グレードによって異なりますが、通常の縁交換は1枚あたり1,000〜5,000円程度が目安です。高級縁（絹・金糸入りなど）はそれ以上になります。枚数により変わりますのでお見積もりにてご確認ください。",
    category: "price",
  },
  {
    question: "寺院・神社の畳縁は特別なものが必要ですか？",
    answer:
      "寺社の格式や用途に合わせた縁を選ぶことが一般的です。本堂・客殿・書院など場所によって適した縁の種類があります。紫縁（むらさきべり）・高麗縁（こうらいべり）・繧繝縁（うんげんべり）など格式ある縁を取り扱っていますのでご相談ください。",
    category: "business",
  },
];

export default function TatamiBeriPage() {
  const relatedServices = TATAMI_SERVICES.filter(
    (s) => s.id !== "tatami-beri"
  ).slice(0, 4);

  return (
    <>
      <PageHeader
        title="畳縁（へり）交換"
        subtitle="畳の印象を変える、縁のリフレッシュ。"
        description="畳の縁（へり布）が傷んできた場合の交換工事です。縁のデザインを変えるだけで畳の印象が大きく変わります。寺院向けの高級縁も取り扱い。"
        breadcrumbs={[
          { label: "サービス", href: "/services" },
          { label: "畳工事", href: "/services/tatami" },
          { label: "畳縁（へり）交換" },
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
                畳縁（へり）とは
              </h2>
              <div className="space-y-4 text-sm text-sumi/80 leading-relaxed">
                <p>
                  畳縁（たたみべり）とは、畳の四辺に縫い付けられた布のことです。畳の端部を保護する役割があるとともに、和室の雰囲気を決定する重要なデザイン要素でもあります。
                </p>
                <p>
                  長年の使用でほつれ・擦り切れ・色あせが起きた縁を新しいものに交換することで、畳表面はそのままでも見た目が大きく改善されます。表替えと同時に縁を変更することもできます。
                </p>
                <p>
                  縁のデザインは無地から模様入り、伝統的な格式ある縁まで幅広く、用途・格式・インテリアに合わせて選べます。
                </p>
              </div>

              {/* 縁の種類 */}
              <div className="mt-10">
                <h3 className="text-lg text-sumi mb-5" style={{ fontFamily: "var(--font-serif)" }}>
                  縁（へり）の種類
                </h3>
                <div className="space-y-4">
                  {[
                    { type: "無地縁", desc: "黒・茶・グリーン・ベージュなどシンプルな無地。一般住宅・賃貸物件の定番縁です。", use: "一般住宅・賃貸物件" },
                    { type: "柄入り縁", desc: "亀甲・菱形・花柄・波柄など伝統的な和柄が入った縁。和室に格調を与えます。", use: "住宅・旅館" },
                    { type: "金縁・銀縁", desc: "金糸・銀糸が織り込まれた高級縁。旅館の特別室・高級住宅の和室に。", use: "旅館・高級住宅" },
                    { type: "紫縁（寺社向け）", desc: "紫色の格式ある縁。寺院・神社の本堂・客殿に伝統的に使われてきた縁布です。", use: "寺院・神社" },
                    { type: "高麗縁・繧繝縁", desc: "格式ある伝統的な縁。寺社の書院・武家の格式空間に用いられてきた高級縁です。", use: "寺社・茶室" },
                  ].map((item) => (
                    <div key={item.type} className="flex gap-4 p-4 border border-border bg-white">
                      <div className="w-1 bg-kincya shrink-0" />
                      <div className="flex-1">
                        <div className="flex items-center gap-3 flex-wrap">
                          <p className="text-sm font-medium text-sumi" style={{ fontFamily: "var(--font-serif)" }}>{item.type}</p>
                          <span className="text-xs text-kincya border border-kincya/30 px-2 py-0.5">{item.use}</span>
                        </div>
                        <p className="text-xs text-sumi/60 mt-1">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* こんな方に */}
              <div className="mt-10">
                <h3 className="text-lg text-sumi mb-5" style={{ fontFamily: "var(--font-serif)" }}>
                  縁交換が向いているケース
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    "縁がほつれ・擦り切れてきた",
                    "縁の色が褪せてしまった",
                    "和室の雰囲気をガラッと変えたい",
                    "畳表はきれいだが縁だけ傷んでいる",
                    "旅館・寺社の格式ある縁に変えたい",
                    "インテリアに合わせた縁に変更したい",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2 p-3 border border-border bg-kiji/20">
                      <span className="w-1.5 h-1.5 bg-kincya rounded-full mt-2 shrink-0" />
                      <span className="text-sm text-sumi/70">{item}</span>
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
                      <span className="text-xs text-sumi/70">無地縁 交換</span>
                      <span className="text-sm text-kincya">1,000〜3,000円/枚</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-xs text-sumi/70">柄入り縁 交換</span>
                      <span className="text-sm text-kincya">2,000〜5,000円/枚</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-xs text-sumi/70">高級縁（金縁・寺社向け）</span>
                      <span className="text-sm text-kincya">要お見積もり</span>
                    </div>
                  </div>
                  <p className="text-xs text-sumi/50 mt-4">※表替えと同時施工の場合は工賃が変わる場合があります。</p>
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

      <FAQSection items={faqs} title="畳縁交換に関するよくある質問" />

      <CTASection
        title="畳縁交換の無料見積もり・デザイン相談はこちら"
        description="縁のサンプルをご確認いただきながら、お部屋に合うデザインをご提案します。"
      />
    </>
  );
}
