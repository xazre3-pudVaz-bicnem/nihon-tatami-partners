import type { Metadata } from "next";
import PageHeader from "@/components/common/PageHeader";
import CTASection from "@/components/common/CTASection";
import FAQSection from "@/components/common/FAQSection";
import { createMetadata } from "@/lib/metadata";
import type { FAQ } from "@/lib/types";

export const metadata: Metadata = createMetadata({
  title: "管理会社向け畳・内装工事｜退去のたびに一括対応",
  description: "管理会社様の退去ごとの畳交換・クロス張替え・床補修を一括継続対応。迅速な現地確認・見積もり・施工で物件の回転率向上をサポート。請求書払い対応。",
  path: "/business/property-management",
});

const faqs: FAQ[] = [
  {
    question: "管理物件が多いのですが、退去が出るたびに連絡できますか？",
    answer:
      "はい、継続的なご依頼を歓迎しています。退去連絡をいただいた後、迅速に現地確認・見積もり・施工の対応をします。管理会社様には専用の連絡窓口をご用意することも可能です。",
    category: "business",
  },
  {
    question: "複数の管理物件を一括で管理できますか？",
    answer:
      "はい、管理会社様の複数物件を一元的に管理します。物件ごとの履歴・見積もり・施工履歴を整理してご報告することも可能です。",
    category: "business",
  },
  {
    question: "畳以外の工事もまとめて依頼できますか？",
    answer:
      "はい、畳・クロス・床・建具・ハウスクリーニング連携まで一括対応しています。複数業者への依頼を一本化することで工期短縮・管理コスト削減が実現します。",
    category: "business",
  },
  {
    question: "月末まとめての請求書払いは対応していますか？",
    answer:
      "法人のお客様には請求書払いにも対応しています。月次でまとめての精算も承ります。取引条件については個別にご相談ください。",
    category: "business",
  },
];

export default function PropertyManagementPage() {
  return (
    <>
      <PageHeader
        title="管理会社向け畳・内装工事"
        subtitle="退去のたびにお任せください。複数物件を一元管理。"
        description="管理会社様からの継続案件を専門に対応しています。退去連絡後の迅速な現地確認・見積もり・施工で、物件の回転率向上をサポートします。"
        breadcrumbs={[
          { label: "法人向けサービス", href: "/business" },
          { label: "管理会社向け" },
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
              管理会社様が抱える課題と解決策
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  challenge: "退去のたびに複数業者への連絡・調整が発生する",
                  solution: "畳・クロス・床・建具を一社で完結。連絡先が一本化され、調整工数が大幅に減ります。",
                },
                {
                  challenge: "業者によって対応スピードにばらつきがある",
                  solution: "退去連絡後、最短翌日の現地確認を目標に対応。対応スピードの安定が保証されます。",
                },
                {
                  challenge: "複数物件の工事履歴・費用の管理が大変",
                  solution: "物件ごとの施工履歴・見積もり記録を整理してご提供。管理がシンプルになります。",
                },
                {
                  challenge: "コストコントロールが難しい",
                  solution: "継続取引によって費用感が安定。毎回の交渉が不要になります。請求書払いで経理処理も楽に。",
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

          {/* フロー */}
          <div className="mb-14">
            <h3 className="text-lg text-sumi mb-6" style={{ fontFamily: "var(--font-serif)" }}>
              管理会社様との継続取引の流れ
            </h3>
            <div className="space-y-4">
              {[
                { step: 1, title: "初回ご相談・取引条件の確認", desc: "まずはお電話・メールでご連絡ください。取引条件（支払い方法・連絡体制など）をご確認します。" },
                { step: 2, title: "退去連絡を受け取ったらご一報ください", desc: "退去連絡が入ったタイミングでご連絡ください。最短翌日に現地確認に伺います。" },
                { step: 3, title: "現地確認・見積もり提出", desc: "物件の状態を確認し、3〜5営業日以内に見積もりをご提出します。" },
                { step: 4, title: "ご承認後、施工", desc: "見積もり承認後、施工スケジュールを調整して工事を実施します。" },
                { step: 5, title: "施工完了報告・請求", desc: "施工完了後に写真・報告書をご提供。請求書払いで月次精算が可能です。" },
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-4 p-4 border border-border bg-white">
                  <span className="w-8 h-8 bg-ai text-white text-xs flex items-center justify-center shrink-0 font-serif">
                    {item.step}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-sumi" style={{ fontFamily: "var(--font-serif)" }}>{item.title}</p>
                    <p className="text-xs text-sumi/60 mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 対応サービス */}
          <div className="mb-14">
            <h3 className="text-lg text-sumi mb-6" style={{ fontFamily: "var(--font-serif)" }}>
              管理物件に対応できるサービス
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "畳の表替え・裏返し・新調",
                "クロス（壁紙）の張替え",
                "フローリング・クッションフロア補修",
                "フロアタイルの張替え",
                "障子・襖・網戸の張替え",
                "複数物件の一括見積もり",
                "月次まとめての請求書払い",
                "施工完了写真・報告書の提供",
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
                { q: "月に10件近い退去があります。対応できますか？", a: "はい、対応できます。件数が多い場合は担当者を固定し、対応窓口を一本化してスムーズな連携ができる体制を整えます。" },
                { q: "家主・オーナーへの説明資料として見積書が必要です。", a: "詳細な内訳付きの見積書をご提供します。施工完了後の写真報告書も承ります。" },
                { q: "緊急で原状回復が必要な物件があります。", a: "緊急対応も可能な限りお受けします。まずはお電話でご相談ください。" },
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

      <FAQSection items={faqs} title="管理会社様からよくある質問" />

      <CTASection
        title="管理会社様のご相談・継続取引のお問い合わせ"
        description="まずはお気軽にご連絡ください。取引条件や対応体制について詳しくご説明します。"
        showBusiness={false}
      />
    </>
  );
}
