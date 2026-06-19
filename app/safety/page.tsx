import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/common/PageHeader";
import FAQSection from "@/components/common/FAQSection";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "安心・安全への取り組み",
  description: "日本畳パートナーズの安心・安全への取り組み。掲載情報の確認、ガイドラインの整備、通報制度など、利用者が安心して業者を選べる仕組みを紹介します。",
  path: "/safety",
});

const efforts = [
  {
    title: "掲載情報の確認",
    body: "掲載にあたり、事業実態や基本情報を確認しています。サービス内容・料金・対応エリアなど、利用者の判断に必要な情報の掲載をお願いしています。",
  },
  {
    title: "ガイドラインの整備",
    body: "口コミ・業者掲載それぞれにガイドラインを設け、健全な情報が掲載される仕組みを整えています。",
  },
  {
    title: "口コミの確認",
    body: "投稿された口コミはガイドラインに照らして確認しています。不適切と判断した投稿は掲載を見送る場合があります。",
  },
  {
    title: "通報制度",
    body: "不適切な情報やトラブルを見つけた場合に通報できる仕組みを用意しています。いただいた通報を確認し、必要に応じて対応します。",
  },
];

const tips = [
  "見積もりは複数業者から取り、内訳まで比較する",
  "口コミ評価と件数の両方を確認する",
  "保有資格・保険加入の有無をチェックする",
  "追加費用が発生する条件を事前に確認する",
  "やり取りはメッセージ機能を活用し、記録を残す",
];

const faqs = [
  { question: "掲載されている業者はすべて審査されていますか？", answer: "掲載にあたり事業実態や基本情報の確認を行っています。ただし、すべての施工品質を保証するものではありません。複数業者の比較・見積もりをおすすめします。" },
  { question: "トラブルが起きた場合はどうすればよいですか？", answer: "まずは業者と直接ご相談ください。解決が難しい場合や不適切な対応があった場合は、通報フォームよりお知らせください。内容を確認し対応します。" },
  { question: "工事の費用は保証されますか？", answer: "費用や契約は利用者と業者の間で直接取り決めていただきます。当サービスが費用を補償するものではありません。見積もり内容をよくご確認のうえご契約ください。" },
];

export default function SafetyPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="min-h-screen bg-shiro">
        <PageHeader
          title="安心・安全への取り組み"
          subtitle="利用者が安心して業者を選べるよう、さまざまな仕組みを整えています。"
          breadcrumbs={[{ label: "トップ", href: "/" }, { label: "安心・安全への取り組み" }]}
        />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <section className="mb-10">
            <h2 className="text-lg text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>私たちの取り組み</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {efforts.map((e) => (
                <div key={e.title} className="bg-white border border-border p-5">
                  <h3 className="text-sm font-medium text-sumi mb-2">{e.title}</h3>
                  <p className="text-sm text-sumi/70 leading-relaxed">{e.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-10 bg-kiji/40 border border-kiji p-6">
            <h2 className="text-lg text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>安心して依頼するためのポイント</h2>
            <ul className="space-y-2">
              {tips.map((t) => (
                <li key={t} className="flex items-start gap-2 text-sm text-sumi/70">
                  <span className="text-igusa mt-0.5">✓</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-10 bg-white border border-border p-6">
            <h2 className="text-lg text-sumi mb-2" style={{ fontFamily: "var(--font-serif)" }}>不適切な情報を見つけたら</h2>
            <p className="text-sm text-sumi/70 leading-relaxed mb-4">
              虚偽の情報や不適切な口コミ、トラブルにつながる行為を見つけた場合は、通報フォームよりお知らせください。
              内容を確認し、必要に応じて掲載の停止などの対応を行います。
            </p>
            <Link href="/report" className="inline-block bg-do text-white px-6 py-3 text-sm hover:opacity-90 transition-opacity">
              通報フォームへ
            </Link>
          </section>
        </div>

        <FAQSection items={faqs} title="安心・安全に関するよくある質問" />
      </div>
    </>
  );
}
