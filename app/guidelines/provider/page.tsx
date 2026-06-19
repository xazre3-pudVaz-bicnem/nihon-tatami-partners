import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/common/PageHeader";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "業者掲載ガイドライン・審査基準",
  description: "日本畳パートナーズの業者掲載ガイドラインと審査基準。掲載をご検討の事業者様向けに、掲載条件・記載ルール・禁止事項を定めています。",
  path: "/guidelines/provider",
});

const criteria = [
  { title: "事業実態の確認", body: "畳・内装に関する事業を実際に営んでいることを確認します。屋号・所在地・連絡先などの基本情報をご提出いただきます。" },
  { title: "連絡体制", body: "問い合わせ・見積もり依頼に適切に対応できる連絡体制があることを確認します。" },
  { title: "掲載情報の正確性", body: "サービス内容・料金・対応エリアなどを正確に記載いただける事業者を掲載します。" },
];

const rules = [
  "サービス内容・料金は正確かつ最新の情報を掲載すること",
  "対応できない工事を「対応可」と表示しないこと",
  "資格・受賞歴・実績は事実に基づいて記載すること",
  "写真は自社施工のもの、または使用許諾を得たものを使用すること",
  "口コミの自作自演や、対価による投稿依頼を行わないこと",
];

const prohibited = [
  "虚偽・誇大な表示（「完全保証」「絶対」など断定的な表現を含む）",
  "他社の誹謗中傷・比較による不当表示",
  "法令・条例に違反する営業",
  "利用者とのトラブルを繰り返し、改善が見られない場合",
  "本サービスを介さない取引への不当な誘導",
];

export default function ProviderGuidelinesPage() {
  return (
    <div className="min-h-screen bg-shiro">
      <PageHeader
        title="業者掲載ガイドライン・審査基準"
        subtitle="掲載をご検討の事業者様向けに、掲載条件と記載ルールを定めています。"
        breadcrumbs={[{ label: "トップ", href: "/" }, { label: "業者掲載ガイドライン" }]}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <section>
          <h2 className="text-lg text-sumi mb-3" style={{ fontFamily: "var(--font-serif)" }}>掲載の審査基準</h2>
          <div className="space-y-3">
            {criteria.map((c) => (
              <div key={c.title} className="bg-white border border-border p-4">
                <h3 className="text-sm font-medium text-sumi mb-1">{c.title}</h3>
                <p className="text-sm text-sumi/70 leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg text-sumi mb-3" style={{ fontFamily: "var(--font-serif)" }}>掲載時の記載ルール</h2>
          <ul className="space-y-2">
            {rules.map((r) => (
              <li key={r} className="flex items-start gap-2 text-sm text-sumi/70">
                <span className="text-igusa mt-0.5">✓</span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-do/5 border border-do/20 p-5">
          <h2 className="text-lg text-do mb-3" style={{ fontFamily: "var(--font-serif)" }}>禁止事項</h2>
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
          <h2 className="text-lg text-sumi mb-2" style={{ fontFamily: "var(--font-serif)" }}>掲載の停止・解除</h2>
          <p className="text-sm text-sumi/70 leading-relaxed">
            本ガイドラインに違反していると判断した場合、掲載の一時停止または解除を行うことがあります。
            利用者からの通報や、トラブルの発生状況を踏まえて総合的に判断します。
          </p>
        </section>

        <section className="bg-kiji/40 border border-kiji p-6 text-center">
          <h2 className="text-lg text-sumi mb-2" style={{ fontFamily: "var(--font-serif)" }}>掲載をご検討の事業者様へ</h2>
          <p className="text-sm text-sumi/60 mb-4">掲載のお申し込み・ご相談はこちらから。</p>
          <Link href="/pro/register" className="inline-block bg-kincya text-white px-6 py-3 text-sm hover:bg-do transition-colors">
            掲載を申し込む
          </Link>
        </section>
      </div>
    </div>
  );
}
