import type { Metadata } from "next";
import PageHeader from "@/components/common/PageHeader";
import CTASection from "@/components/common/CTASection";
import FAQSection from "@/components/common/FAQSection";
import { createMetadata } from "@/lib/metadata";
import type { FAQ } from "@/lib/types";

export const metadata: Metadata = createMetadata({
  title: "不動産会社向け畳・内装工事｜退去後の原状回復を一括対応",
  description: "不動産会社様向けの畳交換・クロス張替え・床工事の一括対応。退去後の迅速な現地確認と見積もりで、次の入居者募集をスムーズに進めます。継続取引歓迎。",
  path: "/business/real-estate",
});

const faqs: FAQ[] = [
  {
    question: "複数物件の畳工事をまとめて依頼できますか？",
    answer:
      "はい、複数物件の一括対応が可能です。各物件の状況を確認した上で、一括見積もり・スケジュール調整を行います。継続的な取引をいただける場合は、担当者を決めてスムーズな対応ができる体制を整えます。",
    category: "business",
  },
  {
    question: "退去連絡後、どのくらいで現地確認できますか？",
    answer:
      "通常、ご連絡いただいた翌営業日から3営業日以内を目標に現地確認に伺います。状況によっては即日対応も可能です。お急ぎの場合はご相談ください。",
    category: "business",
  },
  {
    question: "畳だけでなくクロス・床もまとめて依頼できますか？",
    answer:
      "はい、畳・クロス・フローリング・クッションフロア・ハウスクリーニング連携まで一括対応しています。複数業者への依頼をまとめることで工期短縮・コスト削減につながります。",
    category: "business",
  },
  {
    question: "法人請求書払いは対応していますか？",
    answer:
      "法人のお客様には請求書払いにも対応しています。取引条件については個別にご相談ください。毎月まとめての精算も承ります。",
    category: "business",
  },
];

export default function RealEstatePage() {
  return (
    <>
      <PageHeader
        title="不動産会社向け畳・内装工事"
        subtitle="退去後の原状回復を迅速に。複数物件も一括対応。"
        description="退去後の畳交換・クロス張替え・床補修を一括でお任せください。継続取引で担当者を固定し、迅速な現地確認・見積もり・施工対応を実現します。"
        breadcrumbs={[
          { label: "法人向けサービス", href: "/business" },
          { label: "不動産会社向け" },
        ]}
        badge="BUSINESS"
      />

      <section className="section-py bg-shiro">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 課題と解決 */}
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10 bg-kincya" />
              <span className="text-xs tracking-widest text-kincya">CHALLENGES & SOLUTIONS</span>
            </div>
            <h2 className="text-2xl text-sumi mb-8" style={{ fontFamily: "var(--font-serif)" }}>
              不動産会社様が抱える課題と解決策
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  challenge: "退去後の業者手配に時間がかかる",
                  solution: "退去連絡後、最短翌日に現地確認。一社でまとめて手配できるため調整コストを大幅削減。",
                },
                {
                  challenge: "複数業者とのスケジュール調整が煩雑",
                  solution: "畳・クロス・床・清掃を一括依頼。窓口が一本化されるため、調整の手間がなくなります。",
                },
                {
                  challenge: "物件ごとに費用の見通しが立てにくい",
                  solution: "現地確認後に明確な見積もりをご提示。継続取引で費用感が安定します。",
                },
                {
                  challenge: "空室期間が長くなると収益が下がる",
                  solution: "迅速施工で空室期間を最短化。まとめて依頼することで工期の重複を排除します。",
                },
              ].map((item, i) => (
                <div key={i} className="border border-border bg-white p-6">
                  <div className="mb-4">
                    <span className="text-xs text-sumi/40 tracking-widest">課題</span>
                    <p className="text-sm font-medium text-sumi mt-1" style={{ fontFamily: "var(--font-serif)" }}>
                      {item.challenge}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-kincya/20">
                    <span className="text-xs text-kincya tracking-widest">解決策</span>
                    <p className="text-sm text-sumi/70 mt-1 leading-relaxed">{item.solution}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 対応サービス */}
          <div className="mb-14">
            <h3 className="text-lg text-sumi mb-6" style={{ fontFamily: "var(--font-serif)" }}>
              不動産会社様に対応できるサービス
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "畳の表替え・裏返し・新調",
                "クロス（壁紙）の張替え",
                "フローリング・クッションフロアの補修・張替え",
                "障子・襖・網戸の張替え",
                "ハウスクリーニング業者との連携",
                "複数物件の一括見積もり",
                "継続案件の専用窓口対応",
                "請求書払いによる法人決済",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 p-3 border border-border bg-kiji/20">
                  <span className="w-1.5 h-1.5 bg-kincya rounded-full shrink-0" />
                  <span className="text-sm text-sumi/70">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* よくある相談例 */}
          <div>
            <h3 className="text-lg text-sumi mb-6" style={{ fontFamily: "var(--font-serif)" }}>
              よくある相談例
            </h3>
            <div className="space-y-4">
              {[
                { q: "月に3〜5件の退去があります。毎回お願いできますか？", a: "もちろん対応できます。継続取引の場合は担当者を固定し、退去連絡後すぐに動ける体制を整えます。" },
                { q: "畳は古いが全部交換するのはコストが心配。", a: "状態を確認して「表替えで済む」「新調が必要」を適切に判断し、費用対効果の高い提案をします。" },
                { q: "物件の鍵を預かっていますが、立会いなしで作業できますか？", a: "鍵の受け渡し方法についても柔軟に対応します。ご要望をお聞かせください。" },
              ].map((item, i) => (
                <div key={i} className="border border-border bg-white p-5">
                  <p className="text-sm font-medium text-sumi mb-2" style={{ fontFamily: "var(--font-serif)" }}>
                    Q. {item.q}
                  </p>
                  <p className="text-sm text-sumi/70 leading-relaxed">A. {item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FAQSection items={faqs} title="不動産会社様からよくある質問" />

      <CTASection
        title="不動産会社様のご相談・継続取引のお問い合わせ"
        description="まずはお電話またはメールでご連絡ください。担当者がご要望をお聞きします。"
        showBusiness={false}
      />
    </>
  );
}
