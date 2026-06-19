import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import FAQSection from "@/components/common/FAQSection";
import { getTopProviders } from "@/data/providers";
import ProviderCard from "@/components/common/ProviderCard";
import { createMetadata, SITE_URL } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "一括見積もり依頼｜複数の畳・内装業者にまとめて見積もり",
  description:
    "1回の入力で複数の畳・内装業者にまとめて見積もり依頼。料金・対応・口コミを比較して、納得の1社を選べます。埼玉県対応・無料。",
  path: "/bulk-quote",
});

export default function BulkQuotePage() {
  const providers = getTopProviders(6);

  const steps = [
    { n: "01", title: "工事内容を入力", desc: "サービスの種類・建物種別・畳数などを選ぶだけ" },
    { n: "02", title: "業者を選ぶ", desc: "エリア対応の業者から最大5社まで選択" },
    { n: "03", title: "まとめて依頼", desc: "選んだ業者に一括で見積もり依頼を送信" },
    { n: "04", title: "比較して決める", desc: "届いた見積もりを比較し、納得の1社へ依頼" },
  ];

  const merits = [
    { title: "一度の入力で複数社へ", desc: "同じ内容を何度も入力する手間がありません。" },
    { title: "料金を比較できる", desc: "複数の見積もりを並べて、適正価格がわかります。" },
    { title: "対応の早さもわかる", desc: "返信の速さや提案内容で業者の姿勢が見えます。" },
  ];

  const faqs = [
    { question: "一括見積もりは無料ですか？", answer: "はい、見積もり依頼・比較は無料です。実際の契約・施工はご自身で選んだ業者と直接行います。" },
    { question: "何社まで依頼できますか？", answer: "最大5社まで同時に見積もり依頼ができます。比較しやすい3社前後がおすすめです。" },
    { question: "しつこい営業はありませんか？", answer: "ご依頼いただいた業者からのみ連絡が届きます。希望する連絡方法を指定でき、不要な場合はやり取りを終了できます。" },
    { question: "法人・管理会社でも使えますか？", answer: "ご利用いただけます。複数物件の原状回復など、法人向けの一括依頼にも対応する業者が掲載されています。" },
  ];
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "トップ", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "一括見積もり", item: `${SITE_URL}/bulk-quote` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="min-h-screen bg-shiro">
        <div className="bg-sumi">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumbs variant="dark" items={[{ label: "トップ", href: "/" }, { label: "一括見積もり" }]} />
          </div>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 pt-6 text-center">
            <h1 className="text-2xl md:text-4xl text-white mb-4 leading-tight" style={{ fontFamily: "var(--font-serif)" }}>
              複数の業者にまとめて見積もり依頼
            </h1>
            <p className="text-sm md:text-base text-white/60 max-w-2xl mx-auto leading-relaxed">
              1回の入力で、エリア対応の畳・内装業者に一括で見積もりを依頼。料金・対応・口コミを比較して、納得の1社を選べます。
            </p>
            <Link href="/quote/new" className="inline-block mt-8 bg-kincya text-white px-10 py-4 text-sm hover:bg-do transition-colors">
              無料で一括見積もりを始める
            </Link>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* ステップ */}
          <section className="mb-12">
            <h2 className="text-xl text-sumi mb-6 text-center" style={{ fontFamily: "var(--font-serif)" }}>
              ご利用の流れ
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {steps.map((s) => (
                <div key={s.n} className="bg-white border border-border p-5">
                  <span className="text-kincya text-lg font-bold">{s.n}</span>
                  <h3 className="text-sm text-sumi mt-1 mb-1" style={{ fontFamily: "var(--font-serif)" }}>{s.title}</h3>
                  <p className="text-xs text-sumi/60 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* メリット */}
          <section className="mb-12 bg-kiji/40 border border-kiji p-6">
            <h2 className="text-xl text-sumi mb-6" style={{ fontFamily: "var(--font-serif)" }}>
              一括見積もりのメリット
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {merits.map((m) => (
                <div key={m.title}>
                  <div className="w-8 h-8 bg-igusa/10 text-igusa flex items-center justify-center mb-2 text-sm">✓</div>
                  <h3 className="text-sm font-medium text-sumi mb-1">{m.title}</h3>
                  <p className="text-xs text-sumi/60 leading-relaxed">{m.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 対応業者 */}
          <section className="mb-12">
            <h2 className="text-xl text-sumi mb-6" style={{ fontFamily: "var(--font-serif)" }}>
              見積もり依頼できる業者の例
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {providers.map((p) => (
                <ProviderCard key={p.id} provider={p} />
              ))}
            </div>
          </section>

          <FAQSection items={faqs} title="一括見積もりに関するよくある質問" />

          <section className="mt-10 text-center bg-sumi py-12 px-6">
            <h2 className="text-xl md:text-2xl text-white mb-3" style={{ fontFamily: "var(--font-serif)" }}>
              まずは無料で見積もりを比較
            </h2>
            <p className="text-sm text-white/60 mb-6 max-w-xl mx-auto">入力は数分で完了します。気軽にお試しください。</p>
            <Link href="/quote/new" className="inline-block bg-kincya text-white px-10 py-4 text-sm hover:bg-do transition-colors">
              一括見積もりを始める
            </Link>
          </section>
        </div>
      </div>
    </>
  );
}
