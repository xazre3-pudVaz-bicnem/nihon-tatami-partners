import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import FAQSection from "@/components/common/FAQSection";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "業者選びの相談コンシェルジュ",
  description:
    "畳・内装工事の業者選びにお迷いの方へ。条件に合う候補を整理してご案内するコンシェルジュサービスです。",
  path: "/concierge",
});

const WHO_ITS_FOR = [
  "どの業者に頼めばいいか分からない",
  "料金の相場感が分からず不安",
  "旅館・寺社・管理会社など複数物件の一括対応を探している",
  "自分で複数の業者を比較する時間がない",
  "法人対応・インボイス対応の業者を探している",
  "過去に失敗経験があり慎重に業者を選びたい",
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "フォームで条件を入力",
    desc: "お悩みの内容・現場の地域・ご希望などを教えてください。",
  },
  {
    step: "02",
    title: "内容を確認・候補を整理",
    desc: "入力いただいた条件をもとに、対応できる業者の候補を整理します（通常1〜2営業日）。",
  },
  {
    step: "03",
    title: "候補をご案内",
    desc: "候補業者の概要をご登録の連絡先にお知らせします。その後は業者と直接ご相談ください。",
  },
];

const FAQ_ITEMS = [
  {
    question: "コンシェルジュの利用は無料ですか？",
    answer:
      "はい、ご相談・候補のご案内は無料です。業者との契約・お支払いは直接業者との間で行っていただきます。",
  },
  {
    question: "必ず業者をマッチングしてもらえますか？",
    answer:
      "ご条件によっては対応できる業者が見つからない場合や、候補が限られる場合があります。あらかじめご了承ください。",
  },
  {
    question: "電話で相談はできますか？",
    answer:
      "電話での当日対応は行っておりません。フォームからのご相談をご利用ください。",
  },
  {
    question: "法人・管理会社からの相談は可能ですか？",
    answer:
      "はい、法人・不動産管理会社・旅館・寺社からのご相談にも対応しています。フォームの「法人・複数物件相談」を選択してください。",
  },
];

export default function ConciergePage() {
  return (
    <>
      {/* ヘッダー */}
      <div className="bg-sumi py-12 px-4">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            variant="dark"
            items={[
              { label: "ホーム", href: "/" },
              { label: "業者選び相談" },
            ]}
          />
          <h1
            className="text-2xl md:text-3xl text-white mt-4 mb-3"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            業者選びに迷ったら相談
          </h1>
          <p className="text-white/60 text-sm max-w-xl leading-relaxed">
            業者選びに迷う場合は、条件に合う候補を整理してご案内します。
            フォームから条件をお送りください（無料）。
          </p>
          <div className="mt-6">
            <Link
              href="/concierge/request"
              className="inline-block bg-kincya text-white px-8 py-3.5 text-sm font-bold hover:bg-do transition-colors"
            >
              相談を始める
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* こんな方に向いています */}
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px flex-1 bg-kiji" />
            <span className="text-xs tracking-widest text-sumi/40 uppercase">For You</span>
            <div className="h-px flex-1 bg-kiji" />
          </div>
          <h2
            className="text-xl text-sumi text-center mb-8"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            こんな方に向いています
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {WHO_ITS_FOR.map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-kiji/30 border border-kiji p-4">
                <span className="text-kincya shrink-0 mt-0.5">✓</span>
                <p className="text-sm text-sumi/80 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ご利用の流れ */}
        <section className="mb-16">
          <h2
            className="text-xl text-sumi text-center mb-10"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            ご利用の流れ
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={i} className="border border-border bg-white p-6 relative">
                <p
                  className="text-4xl text-kiji font-light mb-4"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {step.step}
                </p>
                <h3 className="text-base text-sumi mb-2" style={{ fontFamily: "var(--font-serif)" }}>
                  {step.title}
                </h3>
                <p className="text-sm text-sumi/60 leading-relaxed">{step.desc}</p>
                {i < HOW_IT_WORKS.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 text-kiji/40 text-2xl">→</div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 注意事項 */}
        <div className="bg-kiji/40 border border-kiji p-5 mb-16">
          <p className="text-xs text-sumi/60 leading-relaxed">
            <span className="font-medium text-sumi">ご注意：</span>
            電話での当日対応は行っておりません。フォームからのご相談をご利用ください。ご案内は通常1〜2営業日以内を目安としていますが、内容によってはお時間をいただく場合があります。業者の選定・契約はお客様と業者の間で直接行っていただきます。特定の業者を強制するものではありません。
          </p>
        </div>

        {/* CTA */}
        <div className="text-center bg-sumi/5 border border-border p-10 mb-16">
          <h2
            className="text-xl text-sumi mb-3"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            まずは条件を教えてください
          </h2>
          <p className="text-sm text-sumi/60 mb-6">
            フォームの入力は3〜5分程度。無料でご利用いただけます。
          </p>
          <Link
            href="/concierge/request"
            className="inline-block bg-kincya text-white px-10 py-4 text-sm font-bold hover:bg-do transition-colors"
          >
            相談を始める（無料）
          </Link>
        </div>
      </div>

      {/* FAQ */}
      <FAQSection
        items={FAQ_ITEMS}
        title="コンシェルジュについて よくある質問"
      />
    </>
  );
}
