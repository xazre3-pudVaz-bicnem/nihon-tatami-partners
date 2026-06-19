import type { Metadata } from "next";
import PageHeader from "@/components/common/PageHeader";
import CTASection from "@/components/common/CTASection";
import FAQSection from "@/components/common/FAQSection";
import ServiceCard from "@/components/common/ServiceCard";
import { createMetadata } from "@/lib/metadata";
import { TATAMI_SERVICES } from "@/data/services";
import type { FAQ } from "@/lib/types";

export const metadata: Metadata = createMetadata({
  title: "和紙畳｜カラー豊富・ダニカビに強い現代畳",
  description: "和紙をこより状に編んだ和紙畳は豊富なカラーバリエーションとダニ・カビへの強さが特徴。ペット・子ども・高齢者のいる家庭に最適。表替え対応。無料見積もり受付中。",
  path: "/services/washi-tatami",
});

const faqs: FAQ[] = [
  {
    question: "和紙畳はい草畳と比べてどう違いますか？",
    answer:
      "和紙畳は和紙素材なのでカビ・ダニが発生しにくく、豊富なカラーバリエーションがあります。耐久性も高く、汚れが落としやすい点が現代の生活スタイルに合っています。い草の香りがしない点は違いますが、機能性では優れた面が多いです。",
    category: "general",
  },
  {
    question: "和紙畳のカラーはどのくらいの種類がありますか？",
    answer:
      "メーカーによって異なりますが、グリーン・ベージュ・グレー・茶・白・黒など10〜30色程度のラインナップが一般的です。縁あり・縁なしを選ぶことができ、組み合わせで個性ある空間を演出できます。",
    category: "general",
  },
  {
    question: "和紙畳はペットがいる家庭でも大丈夫ですか？",
    answer:
      "はい、和紙畳はペットのいる家庭に向いています。い草に比べて耐久性が高く、爪による傷がつきにくい特性があります。また汚れが落としやすく、カビ・ダニも発生しにくいため衛生的です。",
    category: "general",
  },
  {
    question: "和紙畳の費用はい草畳より高いですか？",
    answer:
      "素材コストはい草より高めですが、耐久性が高いため長期的なコストを考えると合理的な選択肢です。1枚あたり10,000〜20,000円程度が目安となります（サイズ・グレードにより変動します）。",
    category: "price",
  },
  {
    question: "既存の畳から和紙畳に変えることはできますか？",
    answer:
      "はい、表替えのタイミングで従来のい草から和紙畳表へ変更することができます。畳床はそのままに、表面素材のみを変更するため費用を抑えて切り替えができます。",
    category: "general",
  },
];

export default function WashiTatamiPage() {
  const relatedServices = TATAMI_SERVICES.filter(
    (s) => s.id !== "washi-tatami"
  ).slice(0, 4);

  return (
    <>
      <PageHeader
        title="和紙畳"
        subtitle="和紙素材で実現する、色彩と耐久性。"
        description="和紙をこより状にして編み込んだ畳表です。豊富なカラー・ダニやカビへの強さ・汚れに強い特性で、現代の生活スタイルに最適な畳素材です。"
        breadcrumbs={[
          { label: "サービス", href: "/services" },
          { label: "畳工事", href: "/services/tatami" },
          { label: "和紙畳" },
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
                和紙畳とは
              </h2>
              <div className="space-y-4 text-sm text-sumi/80 leading-relaxed">
                <p>
                  和紙畳は、い草の代わりに和紙をこより状に加工して編み込んだ畳表を使用した畳です。見た目はい草畳に近いですが、素材特性は大きく異なります。
                </p>
                <p>
                  最大の特徴は豊富なカラーバリエーションです。グリーン・ベージュ・グレー・茶系・白系など多彩な色展開があり、インテリアに合わせた色選びが楽しめます。縁なし仕様でカラフルな市松模様を作ることも人気です。
                </p>
                <p>
                  機能面では、ダニ・カビが発生しにくい・汚れが落としやすい・耐久性が高い・色あせしにくいといった優れた特性があります。ペットや子どもがいるご家庭、高齢者の方、アレルギーが気になる方に特に適しています。
                </p>
              </div>

              {/* い草との比較 */}
              <div className="mt-10">
                <h3 className="text-lg text-sumi mb-5" style={{ fontFamily: "var(--font-serif)" }}>
                  い草畳との比較
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse bg-white text-sm">
                    <thead>
                      <tr className="bg-ai text-white">
                        <th className="px-4 py-3 text-left font-normal text-xs">項目</th>
                        <th className="px-4 py-3 text-left font-normal text-xs">和紙畳</th>
                        <th className="px-4 py-3 text-left font-normal text-xs">い草畳</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {[
                        { item: "カラー", washi: "豊富（10〜30色以上）", igusa: "グリーン系のみ" },
                        { item: "ダニ・カビ", washi: "発生しにくい", igusa: "発生しやすい" },
                        { item: "耐久性", washi: "高い", igusa: "普通" },
                        { item: "香り", washi: "ほぼなし", igusa: "い草の香り" },
                        { item: "汚れへの強さ", washi: "強い", igusa: "普通" },
                        { item: "費用", washi: "やや高め", igusa: "標準" },
                      ].map((row) => (
                        <tr key={row.item} className="hover:bg-kiji/20">
                          <td className="px-4 py-3 font-medium text-sumi text-xs">{row.item}</td>
                          <td className="px-4 py-3 text-sumi/70 text-xs">{row.washi}</td>
                          <td className="px-4 py-3 text-sumi/70 text-xs">{row.igusa}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 特に向いている方 */}
              <div className="mt-10">
                <h3 className="text-lg text-sumi mb-5" style={{ fontFamily: "var(--font-serif)" }}>
                  こんな方に向いています
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { group: "ペットがいるご家庭", reason: "爪での傷つきに強く、汚れも落としやすい" },
                    { group: "小さなお子様がいるご家庭", reason: "ダニが発生しにくく衛生的。汚れも気にならない" },
                    { group: "高齢者がいるご家庭", reason: "ダニアレルギーの予防に。お手入れも簡単" },
                    { group: "アレルギーが気になる方", reason: "カビ・ダニが発生しにくく清潔を保てる" },
                    { group: "インテリアにこだわる方", reason: "カラーを選んで空間のアクセントに" },
                    { group: "長持ちさせたい方", reason: "い草より耐久性が高く長期使用できる" },
                  ].map((item) => (
                    <div key={item.group} className="p-4 border border-border bg-kiji/30">
                      <p className="text-sm font-medium text-sumi" style={{ fontFamily: "var(--font-serif)" }}>{item.group}</p>
                      <p className="text-xs text-sumi/60 mt-1">{item.reason}</p>
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
                      <span className="text-xs text-sumi/70">和紙畳 表替え</span>
                      <span className="text-sm text-kincya">10,000〜20,000円/枚</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-xs text-sumi/70">和紙畳 新調</span>
                      <span className="text-sm text-kincya">20,000〜35,000円/枚</span>
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

      <FAQSection items={faqs} title="和紙畳に関するよくある質問" />

      <CTASection
        title="和紙畳の無料見積もり・カラーご相談はこちら"
        description="お部屋のインテリアや用途に合わせた和紙畳をご提案します。サンプルのご確認も承ります。"
      />
    </>
  );
}
