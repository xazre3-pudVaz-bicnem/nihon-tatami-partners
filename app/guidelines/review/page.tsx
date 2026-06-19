import type { Metadata } from "next";
import PageHeader from "@/components/common/PageHeader";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "口コミ投稿ガイドライン",
  description: "日本畳パートナーズの口コミ投稿ガイドライン。安心して参考にできる口コミのために、投稿いただく際のルールと禁止事項を定めています。",
  path: "/guidelines/review",
});

const sections = [
  {
    title: "口コミ投稿の目的",
    body: "口コミは、これから業者を探す方が安心して比較・検討するための大切な情報です。実際にサービスを利用した感想を、できるだけ具体的にお寄せください。",
  },
  {
    title: "投稿できる方",
    body: "原則として、掲載業者のサービスを実際にご利用になった方が対象です。利用前の問い合わせ対応に関する感想も投稿いただけますが、その旨が分かるようご記載ください。",
  },
];

const allowed = [
  "実際に利用した工事内容・対応・仕上がりに関する感想",
  "良かった点・気になった点の具体的な記述",
  "料金や工期が事前説明と合っていたかどうか",
  "次に依頼する方の参考になる客観的な情報",
];

const prohibited = [
  "事実と異なる内容・虚偽の投稿",
  "個人を特定できる情報（氏名・住所・電話番号など）",
  "誹謗中傷・差別的表現・暴力的な表現",
  "業者・競合による自作自演やなりすまし",
  "金銭等の対価を受けて投稿された内容",
  "著作権・プライバシーを侵害する内容",
  "宣伝・勧誘・無関係なリンクの記載",
];

export default function ReviewGuidelinesPage() {
  return (
    <div className="min-h-screen bg-shiro">
      <PageHeader
        title="口コミ投稿ガイドライン"
        subtitle="安心して参考にできる口コミのために、投稿のルールを定めています。"
        breadcrumbs={[{ label: "トップ", href: "/" }, { label: "口コミ投稿ガイドライン" }]}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {sections.map((s) => (
          <section key={s.title}>
            <h2 className="text-lg text-sumi mb-2" style={{ fontFamily: "var(--font-serif)" }}>{s.title}</h2>
            <p className="text-sm text-sumi/70 leading-relaxed">{s.body}</p>
          </section>
        ))}

        <section>
          <h2 className="text-lg text-sumi mb-3" style={{ fontFamily: "var(--font-serif)" }}>投稿していただきたい内容</h2>
          <ul className="space-y-2">
            {allowed.map((a) => (
              <li key={a} className="flex items-start gap-2 text-sm text-sumi/70">
                <span className="text-igusa mt-0.5">✓</span>
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-do/5 border border-do/20 p-5">
          <h2 className="text-lg text-do mb-3" style={{ fontFamily: "var(--font-serif)" }}>禁止する内容</h2>
          <ul className="space-y-2">
            {prohibited.map((p) => (
              <li key={p} className="flex items-start gap-2 text-sm text-sumi/70">
                <span className="text-do mt-0.5">×</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-lg text-sumi mb-2" style={{ fontFamily: "var(--font-serif)" }}>口コミの掲載・削除について</h2>
          <p className="text-sm text-sumi/70 leading-relaxed">
            投稿された口コミは、ガイドラインに照らして確認のうえ掲載します。本ガイドラインに反すると判断した投稿は、掲載を見送る、または削除する場合があります。
            不適切な口コミを見つけた場合は、
            <a href="/report" className="text-ai hover:underline">通報フォーム</a>
            よりお知らせください。
          </p>
        </section>
      </div>
    </div>
  );
}
