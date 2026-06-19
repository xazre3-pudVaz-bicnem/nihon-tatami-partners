import type { Metadata } from "next";
import PageHeader from "@/components/common/PageHeader";
import CTASection from "@/components/common/CTASection";
import FAQSection from "@/components/common/FAQSection";
import { createMetadata } from "@/lib/metadata";
import type { FAQ } from "@/lib/types";

export const metadata: Metadata = createMetadata({
  title: "賃貸オーナー向け畳・内装工事｜空室対策・費用対効果重視",
  description: "賃貸オーナー様の空室対策・原状回復を費用対効果重視でサポート。畳替え・クロス張替え・床補修の一括対応。入居率向上につながるリフォーム提案。無料見積もり受付中。",
  path: "/business/rental-owner",
});

const faqs: FAQ[] = [
  {
    question: "空室対策として畳を替えることは有効ですか？",
    answer:
      "有効です。畳の状態は内見時の第一印象に大きく影響します。特に和室のある物件では、畳が古いと借り手がつきにくくなる傾向があります。費用対効果を考えると、新調より表替えで対応できる場合も多く、コストを抑えて印象を改善できます。",
    category: "business",
  },
  {
    question: "和室をフローリングに変えることは可能ですか？",
    answer:
      "はい、和室からフローリングへの変更工事も承ります。ただし、賃借人の同意や費用対効果の観点からご相談の上でご提案します。和室のままリフレッシュする方が費用を抑えられる場合も多くあります。",
    category: "business",
  },
  {
    question: "費用をできるだけ抑えたい。最低限何をすれば良いですか？",
    answer:
      "現地で状態を確認した上でご提案します。多くの場合、「表替え＋クロス張替え」だけで印象が大きく改善します。全部を新調しなくても内見時の見栄えが変わることが多いです。",
    category: "business",
  },
  {
    question: "退去後、賃借人負担と貸主負担の分担はどう判断すればいいですか？",
    answer:
      "国土交通省のガイドラインに沿った判断を参考にご説明できます。通常の使用による劣化は貸主負担、故意・過失による損傷は賃借人負担が基本です。見積もり時にご相談いただければ、判断の参考情報をご提供します。",
    category: "business",
  },
];

export default function RentalOwnerPage() {
  return (
    <>
      <PageHeader
        title="賃貸オーナー向け畳・内装工事"
        subtitle="空室期間を最短に。費用対効果の高い工事をご提案。"
        description="賃貸物件の空室対策・原状回復を費用対効果重視でサポートします。畳・クロス・床の工事を一括依頼で空室期間を最短化。入居率向上につながるリフォームをご提案します。"
        breadcrumbs={[
          { label: "法人向けサービス", href: "/business" },
          { label: "賃貸オーナー向け" },
        ]}
        badge="BUSINESS"
      />

      <section className="section-py bg-shiro">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* オーナーのお悩み */}
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10 bg-kincya" />
              <span className="text-xs tracking-widest text-kincya">OWNER'S CONCERNS</span>
            </div>
            <h2 className="text-2xl text-sumi mb-6" style={{ fontFamily: "var(--font-serif)" }}>
              賃貸オーナー様のよくあるお悩み
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "空室が続いていて入居者が決まらない",
                "畳が古くて内見時の印象が悪い",
                "退去後の工事費用が毎回高い気がする",
                "どこまでリフォームすれば良いかわからない",
                "複数業者に頼むのが面倒",
                "和室をなくすべきか悩んでいる",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 p-4 border border-border bg-kiji/20">
                  <span className="text-kincya text-lg shrink-0">—</span>
                  <span className="text-sm text-sumi/70">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 解決策 */}
          <div className="mb-14">
            <h3 className="text-lg text-sumi mb-6" style={{ fontFamily: "var(--font-serif)" }}>
              日本畳パートナーズができること
            </h3>
            <div className="space-y-4">
              {[
                {
                  title: "費用対効果の高い工事プランをご提案",
                  desc: "すべてを新品にしなくても内見の印象は変わります。現地で状態を確認した上で「何をすれば費用対効果が高いか」をご提案します。表替えとクロス張替えだけで大きく変わることも多いです。",
                },
                {
                  title: "畳・クロス・床を一括で依頼できる",
                  desc: "畳・クロス張替え・フローリング補修・クッションフロアなどを一社で対応できます。複数業者への依頼をまとめることで、工程の無駄がなくなり工期と費用を削減できます。",
                },
                {
                  title: "迅速な対応で空室期間を最短化",
                  desc: "退去後できるだけ早く動くことで、空室期間を最短にします。退去連絡後、最短翌日の現地確認を目指して対応します。",
                },
                {
                  title: "和室の魅力を活かす提案もできる",
                  desc: "和室をフローリングに変えることが必ずしも正解ではありません。和紙畳・縁なし畳に変更することで「和モダン」な魅力が生まれ、差別化につながる物件になることもあります。",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 p-5 border border-border bg-white">
                  <div className="w-1 bg-kincya shrink-0 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-sumi" style={{ fontFamily: "var(--font-serif)" }}>{item.title}</p>
                    <p className="text-sm text-sumi/60 mt-2 leading-relaxed">{item.desc}</p>
                  </div>
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
                "畳の表替え・裏返し・新調",
                "和紙畳・縁なし畳への変更",
                "クロス（壁紙）張替え",
                "フローリング補修・張替え",
                "クッションフロア・フロアタイル張替え",
                "障子・襖・網戸の張替え",
                "空室対策向けリフォームプランの提案",
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

      <FAQSection items={faqs} title="賃貸オーナー様からよくある質問" />

      <CTASection
        title="賃貸物件の工事相談・無料見積もりはこちら"
        description="費用対効果の高い工事プランをご提案します。まずはお気軽にご連絡ください。"
        showBusiness={false}
      />
    </>
  );
}
