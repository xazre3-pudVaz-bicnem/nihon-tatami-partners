import type { Metadata } from "next";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import FAQSection from "@/components/common/FAQSection";
import BulkQuoteForm from "@/components/forms/BulkQuoteForm";
import { getTopProviders } from "@/data/providers";
import { createMetadata, SITE_URL } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "一括見積もり依頼｜複数の畳・内装業者にまとめて見積もり",
  description:
    "1回の入力で複数の畳・内装業者にまとめて見積もり依頼。料金・対応・口コミを比較して、納得の1社を選べます。埼玉県対応・無料。",
  path: "/bulk-quote",
});

const faqs = [
  { question: "一括見積もりは無料ですか？", answer: "はい、見積もり依頼・比較は無料です。実際の契約・施工はご自身で選んだ業者と直接行います。" },
  { question: "何社まで依頼できますか？", answer: "最大5社まで同時に見積もり依頼ができます。比較しやすい3社前後がおすすめです。" },
  { question: "しつこい営業はありませんか？", answer: "ご依頼いただいた業者からのみ連絡が届きます。希望する連絡方法を指定でき、不要な場合はやり取りを終了できます。" },
  { question: "法人・管理会社でも使えますか？", answer: "ご利用いただけます。複数物件の原状回復など、法人向けの一括依頼にも対応する業者が掲載されています。" },
  { question: "写真がなくても依頼できますか？", answer: "写真がなくても依頼できます。現場写真を添えると、より具体的な見積もりが受け取りやすくなります。最終金額は現地確認後に確定する場合があります。" },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
};

export default function BulkQuotePage() {
  const providers = getTopProviders(12);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="min-h-screen bg-shiro">
        <div className="bg-sumi">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumbs variant="dark" items={[{ label: "トップ", href: "/" }, { label: "一括見積もり" }]} />
          </div>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 pt-4">
            <h1 className="text-2xl md:text-3xl text-white mb-3" style={{ fontFamily: "var(--font-serif)" }}>
              複数の業者にまとめて見積もり依頼
            </h1>
            <p className="text-sm text-white/60 max-w-xl">
              1回の入力で、エリア対応の業者に一括で見積もりを依頼できます。料金・対応を比較して、納得の1社を選べます。
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* フォーム */}
            <div className="lg:col-span-2 bg-white border border-border p-6 sm:p-8">
              <BulkQuoteForm providers={providers} />
            </div>

            {/* 右側説明 */}
            <div className="space-y-5">
              <div className="bg-white border border-border p-5">
                <h2 className="text-base text-sumi mb-3" style={{ fontFamily: "var(--font-serif)" }}>一括見積もりとは</h2>
                <ul className="space-y-2.5 text-xs text-sumi/70">
                  {[
                    "1回の入力で最大5社へ同時依頼",
                    "料金・対応内容・返信速度を比較",
                    "気に入った1社に正式依頼",
                    "見積もり依頼は無料",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-2">
                      <span className="text-igusa shrink-0 mt-0.5">✓</span>{t}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-kiji/40 border border-kiji p-5">
                <h3 className="text-sm text-sumi mb-2 font-medium">業者を選んで比較</h3>
                <p className="text-xs text-sumi/60 leading-relaxed mb-3">一覧から気になる業者を選べます。口コミ評価・料金・対応業種を確認しながら選んでください。</p>
                <p className="text-xs text-sumi/40">※ 掲載業者は申請情報に基づき表示。資格・保険は業者申告情報です。</p>
              </div>

              <div className="bg-white border border-border p-5">
                <h3 className="text-sm text-sumi mb-2 font-medium">こんな方に</h3>
                <ul className="space-y-1.5 text-xs text-sumi/60">
                  <li>・ 複数業者の料金を比較したい</li>
                  <li>・ どこに頼めばよいか迷っている</li>
                  <li>・ 賃貸退去で急ぎの工事がある</li>
                  <li>・ 複数物件をまとめて依頼したい</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <FAQSection items={faqs} title="一括見積もりに関するよくある質問" />
      </div>
    </>
  );
}
