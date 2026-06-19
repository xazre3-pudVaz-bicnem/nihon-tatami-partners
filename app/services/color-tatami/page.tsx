import type { Metadata } from "next";
import PageHeader from "@/components/common/PageHeader";
import CTASection from "@/components/common/CTASection";
import FAQSection from "@/components/common/FAQSection";
import ServiceCard from "@/components/common/ServiceCard";
import { createMetadata } from "@/lib/metadata";
import { TATAMI_SERVICES } from "@/data/services";
import type { FAQ } from "@/lib/types";

export const metadata: Metadata = createMetadata({
  title: "カラー畳｜空間のアクセントに個性を加える",
  description: "グリーン・ベージュ・グレー・茶・黒など多彩なカラーから選べる畳。和紙素材ベースで耐久性も高い。縁なし仕様でカラフルな市松模様も。店舗・施設・住宅対応。",
  path: "/services/color-tatami",
});

const faqs: FAQ[] = [
  {
    question: "カラー畳はどのような素材で作られていますか？",
    answer:
      "主に和紙素材（和紙をこより状にして編んだ畳表）で作られています。豊富なカラーバリエーションが和紙畳の特性で、グリーン・ベージュ・グレー・茶・黒・白系など10〜30色程度から選べます。樹脂素材でも一部カラー対応しています。",
    category: "general",
  },
  {
    question: "複数色を組み合わせることはできますか？",
    answer:
      "はい、縁なし仕様の半畳サイズを複数色組み合わせることができます。同系色でまとめたり、コントラストをつけて個性的に演出したりと、自由なデザインが可能です。",
    category: "general",
  },
  {
    question: "店舗や施設にカラー畳を導入する場合、何枚から対応できますか？",
    answer:
      "枚数に制限はありません。1枚から100枚以上まで対応しています。大型施設や店舗での大量施工も承ります。まずはご希望の枚数・サイズをお聞かせください。",
    category: "business",
  },
  {
    question: "カラー畳の色はどのくらい長持ちしますか？",
    answer:
      "和紙素材のカラー畳は、い草畳のような日光による急激な変色が起きにくいです。ただし長期使用により徐々に変化することはあります。樹脂素材の場合はさらに変色しにくい特性があります。",
    category: "general",
  },
  {
    question: "インテリアに合う色の選び方を教えてください。",
    answer:
      "壁・天井・フローリングの色に合わせた選択が基本です。白系・ベージュ系は明るく清潔感があり、グレー系は和モダンでシックな雰囲気に、グリーン系は自然な和の空間らしさを出します。サンプルをご確認いただいてから決定できますのでお気軽にご相談ください。",
    category: "general",
  },
];

export default function ColorTatamiPage() {
  const relatedServices = TATAMI_SERVICES.filter(
    (s) => s.id !== "color-tatami"
  ).slice(0, 4);

  return (
    <>
      <PageHeader
        title="カラー畳"
        subtitle="空間のアクセントに。デザインの可能性を広げる。"
        description="グリーン・ベージュ・グレー・茶・黒など多彩なカラーから選べる畳。縁なし仕様で市松模様にすれば、空間に個性とデザイン性を加えられます。"
        breadcrumbs={[
          { label: "サービス", href: "/services" },
          { label: "畳工事", href: "/services/tatami" },
          { label: "カラー畳" },
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
                カラー畳とは
              </h2>
              <div className="space-y-4 text-sm text-sumi/80 leading-relaxed">
                <p>
                  カラー畳とは、従来の緑色（い草色）以外の色で作られた畳の総称です。主に和紙素材の畳表を使用しており、豊富なカラーバリエーションが最大の特徴です。
                </p>
                <p>
                  空間のインテリアに合わせた色選び、複数色の組み合わせによる市松模様の演出など、従来の畳にはないデザイン性を持ちます。店舗・施設・ホテルの差別化や、住宅のリビング・書斎のアクセントとして人気を集めています。
                </p>
                <p>
                  和紙素材ベースのため、ダニ・カビへの強さや耐久性も備えています。色が豊富なだけでなく、機能面でもいい草より優れた点が多く、現代の空間デザインに合ったチョイスとして注目されています。
                </p>
              </div>

              {/* カラー展開 */}
              <div className="mt-10">
                <h3 className="text-lg text-sumi mb-5" style={{ fontFamily: "var(--font-serif)" }}>
                  代表的なカラーラインナップ
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    { color: "bg-green-100", name: "グリーン系", desc: "定番の畳色。自然な和の空間に" },
                    { color: "bg-amber-50", name: "ベージュ系", desc: "温かみがあり幅広いインテリアに合う" },
                    { color: "bg-gray-200", name: "グレー系", desc: "和モダン・シックな空間に" },
                    { color: "bg-amber-100", name: "茶系", desc: "落ち着いた和の雰囲気に" },
                    { color: "bg-gray-800", name: "黒系", desc: "個性的で格調ある空間に" },
                    { color: "bg-white border border-border", name: "白系", desc: "明るく清潔感のある空間に" },
                  ].map((item) => (
                    <div key={item.name} className="p-3 border border-border bg-white">
                      <div className={`w-full h-8 mb-2 ${item.color}`} />
                      <p className="text-xs font-medium text-sumi">{item.name}</p>
                      <p className="text-xs text-sumi/50 mt-0.5">{item.desc}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-sumi/50 mt-3">※実際の色はメーカー・グレードによって異なります。サンプルをご確認いただけます。</p>
              </div>

              {/* 活用シーン */}
              <div className="mt-10">
                <h3 className="text-lg text-sumi mb-5" style={{ fontFamily: "var(--font-serif)" }}>
                  カラー畳の活用シーン
                </h3>
                <div className="space-y-4">
                  {[
                    { scene: "店舗・サロンのインテリア", desc: "ブランドカラーに合わせた畳でオリジナリティのある空間を演出。飲食店・ネイルサロン・和食レストランなど。" },
                    { scene: "ホテル・旅館の和室", desc: "客室ごとに異なるカラーコーディネートで差別化。統一感のある和モダン客室づくりに。" },
                    { scene: "住宅のリビング・書斎", desc: "フローリングや壁紙に合わせたカラー選びで和洋融合インテリアを実現。" },
                    { scene: "ショールーム・展示スペース", desc: "商品・展示物の背景として場の雰囲気を演出するカラー畳の空間設計。" },
                  ].map((item) => (
                    <div key={item.scene} className="flex gap-4 p-4 border border-border bg-white">
                      <div className="w-1 bg-kincya shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-sumi" style={{ fontFamily: "var(--font-serif)" }}>{item.scene}</p>
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
                      <span className="text-xs text-sumi/70">カラー畳（和紙）表替え</span>
                      <span className="text-sm text-kincya">10,000〜20,000円/枚</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-xs text-sumi/70">カラー畳 新調</span>
                      <span className="text-sm text-kincya">20,000〜38,000円/枚</span>
                    </div>
                  </div>
                  <p className="text-xs text-sumi/50 mt-4">※色・グレード・枚数により変わります。</p>
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

      <FAQSection items={faqs} title="カラー畳に関するよくある質問" />

      <CTASection
        title="カラー畳の無料見積もり・カラーご相談はこちら"
        description="空間のイメージに合わせたカラー選びをお手伝いします。サンプルのご確認も承ります。"
      />
    </>
  );
}
