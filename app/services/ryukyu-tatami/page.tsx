import type { Metadata } from "next";
import PageHeader from "@/components/common/PageHeader";
import CTASection from "@/components/common/CTASection";
import FAQSection from "@/components/common/FAQSection";
import ServiceCard from "@/components/common/ServiceCard";
import { createMetadata } from "@/lib/metadata";
import { TATAMI_SERVICES } from "@/data/services";
import type { FAQ } from "@/lib/types";

export const metadata: Metadata = createMetadata({
  title: "琉球畳・琉球畳風｜七島い草の耐久性と美しさ",
  description: "沖縄原産の七島い草を使った琉球畳と、同じ風合いの琉球畳風（目積表）。独特の表面パターンと高耐久性で旅館・ホテル・住宅に人気。無料見積もり受付中。",
  path: "/services/ryukyu-tatami",
});

const faqs: FAQ[] = [
  {
    question: "琉球畳と琉球畳風（目積表）の違いは何ですか？",
    answer:
      "正式な「琉球畳」は沖縄原産の七島い草（しちとうい）を使用したものを指します。「琉球畳風（目積表）」は七島い草に似た目積（めせき）という表面パターンを使用したもので、素材は通常のい草や和紙などです。見た目は似ていますが、素材・価格・耐久性が異なります。",
    category: "general",
  },
  {
    question: "琉球畳は通常の畳より丈夫ですか？",
    answer:
      "はい、七島い草は通常のい草より太く丈夫で、摩擦・圧力に強い素材です。旅館・ホテルの客室など、使用頻度が高い場所に多く採用されています。",
    category: "general",
  },
  {
    question: "琉球畳の費用は通常の畳と比べてどのくらい違いますか？",
    answer:
      "正式な琉球畳（七島い草使用）は通常のい草畳より高価で、1枚あたり20,000〜50,000円以上になる場合があります。琉球畳風（目積表）は比較的手頃な価格で提供できます。詳しくはお見積もりにてご確認ください。",
    category: "price",
  },
  {
    question: "縁なし仕上げが必須ですか？",
    answer:
      "琉球畳・目積表は縁なし仕上げが一般的ですが、縁あり仕上げも対応可能です。用途・デザインに合わせてご相談ください。縁なしの場合は半畳サイズで市松模様に敷くことが多いです。",
    category: "general",
  },
  {
    question: "旅館の全客室を琉球畳に替えることはできますか？",
    answer:
      "はい、旅館の全客室を一括して琉球畳に変更する工事に対応しています。繁忙期を避けた施工スケジュール・複数職人での並行施工など、営業への影響を最小化した対応が可能です。",
    category: "business",
  },
];

export default function RyukyuTatamiPage() {
  const relatedServices = TATAMI_SERVICES.filter(
    (s) => s.id !== "ryukyu-tatami"
  ).slice(0, 4);

  return (
    <>
      <PageHeader
        title="琉球畳・琉球畳風"
        subtitle="七島い草の独特な表情と耐久性。"
        description="沖縄原産の七島い草を使った琉球畳と、同じ見た目の琉球畳風（目積表）。独特の表面パターンと高い耐久性で旅館・ホテル・住宅の和室に人気です。"
        breadcrumbs={[
          { label: "サービス", href: "/services" },
          { label: "畳工事", href: "/services/tatami" },
          { label: "琉球畳・琉球畳風" },
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
                琉球畳とは
              </h2>
              <div className="space-y-4 text-sm text-sumi/80 leading-relaxed">
                <p>
                  琉球畳は、沖縄（琉球）を原産とする七島い草（しちとうい）を使用した畳の総称です。七島い草は通常のい草（丸い草）より茎が三角形で太く、摩擦や圧力に強い特性を持っています。
                </p>
                <p>
                  この丈夫な素材と、縁なし仕上げによる市松模様の表情が組み合わさり、旅館・ホテルの客室をはじめ、高級住宅・寺社の和室などで多く採用されています。
                </p>
                <p>
                  本来の琉球畳（七島い草）は生産量が少なく価格が高いため、一般的には「目積表（めせきおもて）」と呼ばれる同様の表面パターンを持つ「琉球畳風」が広く普及しています。見た目・耐久性はほぼ変わらず、リーズナブルに導入できます。
                </p>
              </div>

              <div className="mt-10">
                <h3 className="text-lg text-sumi mb-5" style={{ fontFamily: "var(--font-serif)" }}>
                  琉球畳・琉球畳風の比較
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse bg-white text-sm">
                    <thead>
                      <tr className="bg-ai text-white">
                        <th className="px-4 py-3 text-left font-normal text-xs">種類</th>
                        <th className="px-4 py-3 text-left font-normal text-xs">素材</th>
                        <th className="px-4 py-3 text-left font-normal text-xs">耐久性</th>
                        <th className="px-4 py-3 text-left font-normal text-xs">費用感</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      <tr className="hover:bg-kiji/20">
                        <td className="px-4 py-3 font-medium text-sumi">琉球畳（本七島い草）</td>
                        <td className="px-4 py-3 text-sumi/70">七島い草</td>
                        <td className="px-4 py-3 text-sumi/70">非常に高い</td>
                        <td className="px-4 py-3 text-kincya">高</td>
                      </tr>
                      <tr className="hover:bg-kiji/20">
                        <td className="px-4 py-3 font-medium text-sumi">琉球畳風（目積表）</td>
                        <td className="px-4 py-3 text-sumi/70">い草・和紙など</td>
                        <td className="px-4 py-3 text-sumi/70">高い</td>
                        <td className="px-4 py-3 text-kincya">中</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-lg text-sumi mb-5" style={{ fontFamily: "var(--font-serif)" }}>
                  こんな場所に最適です
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { place: "旅館・料亭の客室", desc: "高耐久性と和の格調が旅館の和室にぴったり" },
                    { place: "ホテルのジャパニーズスイート", desc: "縁なしの市松模様が洗練された印象を演出" },
                    { place: "高級住宅の和室", desc: "格調ある和の空間づくりに" },
                    { place: "茶室・会席料理店", desc: "本格的な和の空間に格式あるしつらえを" },
                    { place: "マンションの和室", desc: "洋風空間との融合に縁なしスタイルが映える" },
                    { place: "寺院・神社の客殿", desc: "格式と耐久性を兼ね備えた素材選択" },
                  ].map((item) => (
                    <div key={item.place} className="p-4 border border-border bg-kiji/30">
                      <p className="text-sm font-medium text-sumi" style={{ fontFamily: "var(--font-serif)" }}>{item.place}</p>
                      <p className="text-xs text-sumi/60 mt-1">{item.desc}</p>
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
                      <span className="text-xs text-sumi/70">琉球畳風（目積）表替え</span>
                      <span className="text-sm text-kincya">12,000〜25,000円/枚</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-xs text-sumi/70">本琉球畳（七島い草）</span>
                      <span className="text-sm text-kincya">要お見積もり</span>
                    </div>
                  </div>
                  <p className="text-xs text-sumi/50 mt-4">※素材・枚数・現場状況により変わります。</p>
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

      <FAQSection items={faqs} title="琉球畳に関するよくある質問" />

      <CTASection
        title="琉球畳・琉球畳風の無料見積もりはこちら"
        description="旅館・住宅・寺社への施工実績があります。素材・デザインのご相談をお気軽にどうぞ。"
      />
    </>
  );
}
