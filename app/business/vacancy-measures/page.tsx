import type { Metadata } from "next";
import PageHeader from "@/components/common/PageHeader";
import CTASection from "@/components/common/CTASection";
import FAQSection from "@/components/common/FAQSection";
import { createMetadata } from "@/lib/metadata";
import type { FAQ } from "@/lib/types";

export const metadata: Metadata = createMetadata({
  title: "空室対策｜畳替え・内装リフレッシュで入居率向上",
  description: "和室のある賃貸物件の空室対策に畳替え・クロス張替え・床補修が有効。費用対効果の高い工事で内見時の第一印象を改善し、入居率向上をサポートします。",
  path: "/business/vacancy-measures",
});

const faqs: FAQ[] = [
  {
    question: "畳を替えると本当に入居率が上がりますか？",
    answer:
      "和室のある物件では、畳の状態が内見時の第一印象に大きく影響します。特に古い・黒ずんだ畳は敬遠されやすいですが、新しくすることで好印象を与え、成約率改善につながります。費用対効果も高く、表替えで十分改善できる場合も多いです。",
    category: "business",
  },
  {
    question: "和室をフローリングにした方が入居が決まりやすいですか？",
    answer:
      "必ずしもそうではありません。和室は近年「リモートワーク向け」「子育てに向いている」として人気が回復しています。古い畳を和紙畳や縁なし畳にリフレッシュすることで、現代的な和モダン空間として魅力を高める方法もあります。",
    category: "business",
  },
  {
    question: "空室対策に最適な工事は何ですか？",
    answer:
      "物件の状態によりますが、「畳の表替え＋クロス張替え」のセットが最も費用対効果が高い場合が多いです。床・壁・畳が新しくなるだけで内見時の印象が大きく変わります。新調（畳床の交換）が必要かどうかは現地確認でご判断します。",
    category: "business",
  },
  {
    question: "費用をできるだけ抑えたい場合はどうすれば良いですか？",
    answer:
      "まず現地で状態を確認した上で、最小コストで最大効果を出せる工事をご提案します。裏返しや部分的なクロス張替えなど、不要な工事を省くご提案も可能です。",
    category: "business",
  },
];

export default function VacancyMeasuresPage() {
  return (
    <>
      <PageHeader
        title="空室対策｜畳替え・内装リフレッシュ"
        subtitle="内見の第一印象を変えて、入居率を改善する。"
        description="和室のある賃貸物件の空室対策に畳替え・クロス張替えが有効です。費用対効果の高い工事プランで内見時の印象を改善し、入居率向上をサポートします。"
        breadcrumbs={[
          { label: "法人向けサービス", href: "/business" },
          { label: "空室対策" },
        ]}
        badge="BUSINESS"
      />

      <section className="section-py bg-shiro">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10 bg-kincya" />
              <span className="text-xs tracking-widest text-kincya">WHY TATAMI MATTERS</span>
            </div>
            <h2 className="text-2xl text-sumi mb-6" style={{ fontFamily: "var(--font-serif)" }}>
              畳の状態が入居率に影響する理由
            </h2>
            <div className="space-y-4 text-sm text-sumi/80 leading-relaxed">
              <p>
                和室のある賃貸物件では、内見時の畳の状態が成約に大きく影響します。黄ばんだ・黒ずんだ・ほつれた畳は、部屋全体が古くて汚いという印象を与え、他の設備がきれいでも敬遠される原因になります。
              </p>
              <p>
                逆に畳が新しくなるだけで「清潔感がある」「大切に管理されている物件」という印象に変わります。特に表替えはクロス張替えと合わせても比較的低コストで実施でき、費用対効果の高い空室対策です。
              </p>
            </div>
          </div>

          {/* 空室対策プラン */}
          <div className="mb-14">
            <h3 className="text-lg text-sumi mb-6" style={{ fontFamily: "var(--font-serif)" }}>
              空室対策の工事プラン例
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { plan: "ライトプラン", price: "2〜5万円〜", items: ["畳の表替え（6畳）", "クロスの部分張替え"], effect: "最小コストで内見印象を改善" },
                { plan: "スタンダードプラン", price: "5〜15万円〜", items: ["畳の表替えor新調", "クロスの全面張替え", "洋室の床補修"], effect: "物件全体の印象をリフレッシュ" },
                { plan: "リノベーションプラン", price: "15万円〜", items: ["和紙畳・縁なし畳への変更", "クロス全面張替え", "フローリング・洋室整備"], effect: "和モダンな物件として付加価値向上" },
              ].map((item) => (
                <div key={item.plan} className="border border-border bg-white p-6">
                  <span className="text-xs tracking-widest text-kincya">{item.plan}</span>
                  <p className="text-lg text-sumi mt-1 mb-4" style={{ fontFamily: "var(--font-serif)" }}>{item.price}</p>
                  <ul className="space-y-2 mb-4">
                    {item.items.map((i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-sumi/70">
                        <span className="w-1.5 h-1.5 bg-kincya rounded-full shrink-0" />
                        {i}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4 border-t border-border">
                    <p className="text-xs text-kincya">{item.effect}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-sumi/50 mt-3">※物件の状態・面積によって金額は変わります。現地確認の上でご提案します。</p>
          </div>

          {/* ポイント */}
          <div className="mb-14">
            <h3 className="text-lg text-sumi mb-6" style={{ fontFamily: "var(--font-serif)" }}>
              空室対策で重視するポイント
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "費用対効果を最優先", desc: "すべてを新品にする必要はありません。最小コストで最大の印象改善を目指したご提案をします。" },
                { title: "内見者目線の提案", desc: "内見者が最初に気になるポイント（畳・クロス・床）を重点的に改善することで、成約率が上がります。" },
                { title: "和室の魅力を活かす", desc: "和室をフローリングにするだけが正解ではありません。和紙畳・縁なし畳で「和モダン」な魅力を作ることも選択肢です。" },
                { title: "スピーディな施工", desc: "空室期間はコストです。迅速な施工完了で早期の入居者募集を可能にします。" },
              ].map((item) => (
                <div key={item.title} className="p-5 border border-border bg-kiji/30">
                  <p className="text-sm font-medium text-sumi" style={{ fontFamily: "var(--font-serif)" }}>{item.title}</p>
                  <p className="text-xs text-sumi/60 mt-2 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FAQSection items={faqs} title="空室対策に関するよくある質問" />

      <CTASection
        title="空室対策工事の無料見積もり・ご相談はこちら"
        description="費用対効果の高い工事プランをご提案します。まずは物件の状態をお聞かせください。"
        showBusiness={false}
      />
    </>
  );
}
