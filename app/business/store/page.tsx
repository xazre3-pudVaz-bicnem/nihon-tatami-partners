import type { Metadata } from "next";
import PageHeader from "@/components/common/PageHeader";
import CTASection from "@/components/common/CTASection";
import FAQSection from "@/components/common/FAQSection";
import { createMetadata } from "@/lib/metadata";
import type { FAQ } from "@/lib/types";

export const metadata: Metadata = createMetadata({
  title: "店舗オーナー向け内装工事｜開業・改装・退去に対応",
  description: "飲食店・サロン・小売店の開業・改装・退去時の内装工事を一括対応。畳・クロス・床工事をまとめて依頼できます。短工期対応・原状回復にも実績あり。無料見積もり受付中。",
  path: "/business/store",
});

const faqs: FAQ[] = [
  {
    question: "飲食店の座敷に畳を導入したい。対応できますか？",
    answer:
      "はい、飲食店の座敷への畳施工に実績があります。水気・油気に強い樹脂畳や、耐久性の高い和紙畳が飲食店に向いています。座席数・面積に合わせたオーダー製作が基本です。",
    category: "business",
  },
  {
    question: "店舗退去時の原状回復工事も依頼できますか？",
    answer:
      "はい、店舗退去後の原状回復工事を承ります。内装の復旧（床・壁・天井）から畳・クロスの原状回復まで、退去スケジュールに合わせた工事計画を組みます。",
    category: "business",
  },
  {
    question: "開業前の短い工期での施工は可能ですか？",
    answer:
      "はい、可能な限り短工期に対応します。開業日から逆算した工程を組み、優先的に対応します。まずはご希望の日程をお聞かせください。",
    category: "business",
  },
  {
    question: "畳だけでなくクロスや床もまとめて依頼できますか？",
    answer:
      "はい、畳・クロス・フローリング・クッションフロア・フロアタイルなど内装工事を一括でお受けします。別々の業者への依頼をまとめることで工期短縮とコスト削減が実現します。",
    category: "business",
  },
];

export default function StorePage() {
  return (
    <>
      <PageHeader
        title="店舗オーナー向け内装工事"
        subtitle="開業・改装・退去。店舗内装を一括でお任せください。"
        description="飲食店・サロン・小売店・和食料理店の開業・改装・退去時の内装工事を一括対応します。畳・クロス・床をまとめて依頼できるため、工期短縮とコスト削減が実現します。"
        breadcrumbs={[
          { label: "法人向けサービス", href: "/business" },
          { label: "店舗オーナー向け" },
        ]}
        badge="BUSINESS"
      />

      <section className="section-py bg-shiro">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* シーン別 */}
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10 bg-kincya" />
              <span className="text-xs tracking-widest text-kincya">SCENES</span>
            </div>
            <h2 className="text-2xl text-sumi mb-8" style={{ fontFamily: "var(--font-serif)" }}>
              店舗内装工事の対応シーン
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { scene: "開業時", title: "新規開業の内装施工", desc: "飲食店・サロン・小売店の開業に合わせた内装工事。畳座敷の設置・クロス施工・床工事を開業日までに完了します。" },
                { scene: "改装時", title: "リニューアル内装改装", desc: "老朽化した内装のリフレッシュや店舗コンセプト変更に伴う改装工事。短工期での対応も可能です。" },
                { scene: "退去時", title: "退去・原状回復工事", desc: "店舗退去後の内装解体・床・壁・天井の原状回復まで一括対応。退去スケジュールに合わせた工事計画。" },
              ].map((item) => (
                <div key={item.scene} className="border border-border bg-white p-6">
                  <span className="inline-block text-xs text-kincya border border-kincya/30 px-2 py-0.5 mb-3">{item.scene}</span>
                  <h3 className="text-base text-sumi mb-3" style={{ fontFamily: "var(--font-serif)" }}>{item.title}</h3>
                  <p className="text-sm text-sumi/60 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 業種別 */}
          <div className="mb-14">
            <h3 className="text-lg text-sumi mb-6" style={{ fontFamily: "var(--font-serif)" }}>
              対応業種と推奨素材
            </h3>
            <div className="space-y-3">
              {[
                { type: "飲食店（和食・料亭・居酒屋）", material: "樹脂畳・和紙畳", reason: "水気・油気に強く汚れが落としやすい素材が座敷に最適" },
                { type: "カフェ・和風カフェ", material: "和紙畳・縁なし畳", reason: "カラー豊富な和紙畳でインテリアとの調和を演出" },
                { type: "エステ・リラクゼーションサロン", material: "和紙畳・クッションフロア", reason: "清潔感と足ざわりの良さが施術空間に適している" },
                { type: "小売店・アパレル", material: "フローリング・フロアタイル", reason: "耐久性と意匠性を兼ね備えた店舗床材" },
                { type: "和食料理店", material: "目積表・稲わら床", reason: "格調ある和の座敷空間の演出に" },
              ].map((item) => (
                <div key={item.type} className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 border border-border bg-kiji/20">
                  <p className="text-sm text-sumi font-medium">{item.type}</p>
                  <p className="text-sm text-kincya">{item.material}</p>
                  <p className="text-xs text-sumi/60">{item.reason}</p>
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
                "畳の新調・表替え（座敷設置）",
                "クロス（壁紙）の新規施工・張替え",
                "フローリング・フロアタイルの施工",
                "クッションフロアの張替え",
                "障子・襖の張替え",
                "店舗退去後の原状回復",
                "短工期での優先対応",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 p-3 border border-border bg-white">
                  <span className="w-1.5 h-1.5 bg-kincya rounded-full shrink-0" />
                  <span className="text-sm text-sumi/70">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FAQSection items={faqs} title="店舗オーナー様からよくある質問" />

      <CTASection
        title="店舗内装工事のご相談・無料見積もりはこちら"
        description="開業日・改装完了日・退去日に合わせた工程をご提案します。お気軽にご相談ください。"
        showBusiness={false}
      />
    </>
  );
}
