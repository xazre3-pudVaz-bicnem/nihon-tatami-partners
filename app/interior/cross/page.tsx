import type { Metadata } from "next";
import PageHeader from "@/components/common/PageHeader";
import CTASection from "@/components/common/CTASection";
import FAQSection from "@/components/common/FAQSection";
import { createMetadata } from "@/lib/metadata";
import type { FAQ } from "@/lib/types";

export const metadata: Metadata = createMetadata({
  title: "クロス張替え｜壁紙を新しくして部屋の印象を一新",
  description: "劣化・汚れ・黄ばみが気になる壁紙（クロス）を新しく張り替えます。住宅・賃貸・店舗・旅館に対応。畳工事との同時施工も可能。無料見積もり受付中。",
  path: "/interior/cross",
});

const faqs: FAQ[] = [
  {
    question: "クロス張替えの費用はどのくらいですか？",
    answer:
      "素材・広さによって異なりますが、一般的なビニールクロスで1平方メートルあたり800〜2,000円程度が目安です。部屋の広さ・天井・ドア回りの処理など条件で変わります。正確な金額は現地確認の上でお見積もりします。",
    category: "price",
  },
  {
    question: "クロスの種類はどのくらいありますか？",
    answer:
      "ビニールクロス（最も一般的）・紙クロス・布クロス・珪藻土クロス・吸音クロスなど多くの種類があります。カラー・柄も豊富で、部屋のイメージに合わせて選べます。サンプルブックをご確認いただけます。",
    category: "general",
  },
  {
    question: "畳工事と同時にクロス張替えも依頼できますか？",
    answer:
      "はい、畳工事との同時施工が可能です。業者をまとめることで来訪・日程調整の手間が省け、工期も効率化できます。和室全体をまとめてリフレッシュしたい場合にご活用ください。",
    category: "general",
  },
  {
    question: "賃貸物件の原状回復でクロス張替えを依頼できますか？",
    answer:
      "はい、賃貸物件の退去後の原状回復としてクロス張替えを承ります。畳工事・床工事との一括対応も可能で、不動産会社・管理会社様からの継続案件もお受けしています。",
    category: "business",
  },
];

export default function CrossPage() {
  return (
    <>
      <PageHeader
        title="クロス張替え"
        subtitle="壁紙を新しくして、部屋の印象を一新。"
        description="劣化・黄ばみ・汚れが気になる壁紙を新しいクロスに張り替えます。住宅・賃貸物件の原状回復から旅館・店舗まで幅広く対応します。"
        breadcrumbs={[
          { label: "内装工事", href: "/interior" },
          { label: "クロス張替え" },
        ]}
        badge="INTERIOR"
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
                クロス張替えとは
              </h2>
              <div className="space-y-4 text-sm text-sumi/80 leading-relaxed">
                <p>
                  壁紙（クロス）の張替えは、室内の印象を大きく変えるリフォームの中でも費用対効果が高い工事の一つです。古くなった壁紙を剥がして新しいクロスを施工するだけで、部屋全体が明るく清潔な印象に生まれ変わります。
                </p>
                <p>
                  賃貸物件の退去後の原状回復、住宅リフォームの一環として、旅館客室の印象改善など幅広い用途で施工しています。畳工事と合わせて同時施工することで、和室全体を効率よく一新できます。
                </p>
              </div>

              {/* クロスの種類 */}
              <div className="mt-10">
                <h3 className="text-lg text-sumi mb-5" style={{ fontFamily: "var(--font-serif)" }}>
                  主なクロスの種類
                </h3>
                <div className="space-y-3">
                  {[
                    { type: "ビニールクロス", desc: "最も一般的な素材。耐久性・掃除のしやすさ・豊富なデザインが特徴。賃貸物件・住宅の定番。" },
                    { type: "紙クロス", desc: "高品質な自然素材。通気性があり調湿効果も。高級住宅・旅館の客室に。" },
                    { type: "布クロス", desc: "布素材ならではの質感と暖かみ。和室・書斎・特別室に向いている。" },
                    { type: "珪藻土クロス", desc: "調湿・消臭効果がある機能性クロス。和室・寝室にも人気。" },
                    { type: "吸音クロス", desc: "防音効果のあるクロス。音楽室・子供部屋・店舗のBGM対策に。" },
                  ].map((item) => (
                    <div key={item.type} className="flex gap-4 p-4 border border-border bg-white">
                      <div className="w-1 bg-kincya shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-sumi" style={{ fontFamily: "var(--font-serif)" }}>{item.type}</p>
                        <p className="text-xs text-sumi/60 mt-1">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 対応シーン */}
              <div className="mt-10">
                <h3 className="text-lg text-sumi mb-5" style={{ fontFamily: "var(--font-serif)" }}>
                  クロス張替えの対応シーン
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    "賃貸物件の退去後の原状回復",
                    "住宅リフォームの和室・洋室",
                    "旅館・ホテルの客室改装",
                    "店舗・オフィスの内装改装",
                    "黄ばみ・汚れ・傷んだクロスの交換",
                    "カビが生えたクロスの交換",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2 p-3 border border-border bg-kiji/20">
                      <span className="w-1.5 h-1.5 bg-kincya rounded-full shrink-0" />
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
                      <span className="text-xs text-sumi/70">ビニールクロス（標準）</span>
                      <span className="text-sm text-kincya">800〜1,500円/m²</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-xs text-sumi/70">機能性クロス</span>
                      <span className="text-sm text-kincya">1,200〜2,500円/m²</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-xs text-sumi/70">高品質クロス</span>
                      <span className="text-sm text-kincya">2,000〜4,000円/m²</span>
                    </div>
                  </div>
                  <p className="text-xs text-sumi/50 mt-4">※下地処理の状態・広さにより変わります。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQSection items={faqs} title="クロス張替えに関するよくある質問" />

      <CTASection
        title="クロス張替えの無料見積もり・ご相談はこちら"
        description="畳工事との同時施工も承ります。部屋全体のリフレッシュをご検討の方はお気軽にご連絡ください。"
      />
    </>
  );
}
