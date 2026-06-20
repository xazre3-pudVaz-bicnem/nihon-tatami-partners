import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "無料で掲載できます｜埼玉の畳・和室工事業者向け | 日本畳パートナーズ",
  description: "日本畳パートナーズに無料で掲載して、畳・和室工事の受注を増やしましょう。初期費用0円・月額0円。見積依頼の受信、口コミ獲得、ダッシュボードでの案件管理ができます。",
  alternates: { canonical: `${SITE_URL}/pro` },
};

const BENEFITS = [
  { title: "無料掲載", desc: "初期費用0円・月額0円で始められます。基本プランは完全無料です。", sub: "有料プランで上位表示も可能" },
  { title: "問い合わせ受信", desc: "見積依頼がダッシュボードに届き、まとめて管理できます。", sub: "法人・旅館・寺社からの依頼も" },
  { title: "口コミ獲得", desc: "施工後のお客様から口コミを集められます。実績の蓄積が次の受注につながります。", sub: "口コミへの返信も可能" },
  { title: "案件をまとめて管理", desc: "見積・予約・メッセージをダッシュボードで一元管理できます。", sub: "スマホからも操作可能" },
];

const SUITABLE = [
  "新規顧客を増やしたい畳店",
  "賃貸・不動産会社から法人案件を受けたい業者",
  "口コミを増やしてWEBの評価を高めたい業者",
  "旅館・寺社・店舗から問い合わせを受けたい業者",
  "職人の仕事を次世代に伝えたい工房",
];

const FLOW = [
  { n: "01", title: "申請フォーム入力", desc: "会社情報・連絡先・対応サービスをフォームに入力します。" },
  { n: "02", title: "運営側で確認", desc: "申請内容（会社情報・連絡先・対応サービス）を運営が確認します（1〜3営業日）。" },
  { n: "03", title: "承認のご連絡", desc: "確認後、掲載開始のご連絡をいたします。" },
  { n: "04", title: "ダッシュボードで管理", desc: "プロフィール編集・サービス登録・問い合わせ対応を始められます。" },
];

const STANDARDS = [
  "申請時に会社情報・連絡先・対応サービスを確認します。",
  "掲載後も口コミ・問い合わせ内容を運営が確認します。",
  "利用規約に反する場合は掲載停止になることがあります。",
];

const FAQS = [
  { q: "掲載は本当に無料ですか？", a: "基本プランは初期費用0円・月額0円で完全無料です。上位表示などを希望する場合は有料プランもご用意しています。" },
  { q: "どんな業者でも掲載できますか？", a: "埼玉県内で畳・和室工事を行っている業者様を対象としています。申請時に会社情報・連絡先・対応サービスを確認します。" },
  { q: "個人事業主でも掲載できますか？", a: "はい。個人事業主の方も掲載いただけます。" },
  { q: "掲載までどれくらいかかりますか？", a: "申請内容を確認のうえ、通常1〜3営業日以内にご連絡します。" },
  { q: "掲載後に内容を変更できますか？", a: "ダッシュボードからプロフィール・サービス・施工事例をいつでも編集できます。" },
];

export default function ProPage() {
  return (
    <div className="min-h-screen bg-shiro">
      {/* ヒーロー */}
      <section className="bg-sumi py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs text-kincya tracking-widest uppercase mb-4">For Providers</p>
            <h1 className="text-3xl md:text-4xl text-white mb-4" style={{ fontFamily: "var(--font-serif)" }}>
              無料で掲載できます
            </h1>
            <p className="text-base text-white/60 max-w-xl mx-auto leading-relaxed mb-8">
              畳・和室工事の受注を増やしましょう。初期費用0円・月額0円。見積依頼・予約・メッセージ機能でやりとりも簡単です。
            </p>
            <Link href="/pro/register" className="inline-block bg-kincya text-white px-10 py-4 text-sm tracking-wider hover:bg-do transition-colors duration-300">
              無料で掲載申請する
            </Link>
          </div>
        </div>
      </section>

      {/* メリット */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl text-sumi" style={{ fontFamily: "var(--font-serif)" }}>登録するメリット</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {BENEFITS.map((b, i) => (
            <div key={i} className="bg-white border border-border p-6">
              <h3 className="text-base text-sumi mb-2" style={{ fontFamily: "var(--font-serif)" }}>{b.title}</h3>
              <p className="text-sm text-sumi/70 leading-relaxed mb-2">{b.desc}</p>
              <p className="text-xs text-ai/80">{b.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* こんな業者に向いています */}
      <section className="bg-kiji/50 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl text-sumi text-center mb-8" style={{ fontFamily: "var(--font-serif)" }}>こんな業者に向いています</h2>
          <ul className="space-y-3">
            {SUITABLE.map((s) => (
              <li key={s} className="bg-white border border-border p-4 text-sm text-sumi/80 flex items-start gap-2">
                <span className="text-igusa shrink-0 mt-0.5">✓</span>{s}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 掲載までの流れ */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl text-sumi text-center mb-10" style={{ fontFamily: "var(--font-serif)" }}>掲載までの流れ</h2>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {FLOW.map((f) => (
            <div key={f.n} className="bg-white border border-border p-5">
              <span className="text-kincya text-lg font-bold">{f.n}</span>
              <h3 className="text-sm text-sumi mt-1 mb-1" style={{ fontFamily: "var(--font-serif)" }}>{f.title}</h3>
              <p className="text-xs text-sumi/60 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 掲載基準 */}
      <section className="bg-kiji/30 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl text-sumi text-center mb-6" style={{ fontFamily: "var(--font-serif)" }}>掲載について</h2>
          <ul className="space-y-2">
            {STANDARDS.map((s) => (
              <li key={s} className="text-sm text-sumi/70 flex items-start gap-2">
                <span className="text-ai shrink-0 mt-0.5">—</span>{s}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* プラン比較 */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl text-sumi text-center mb-10" style={{ fontFamily: "var(--font-serif)" }}>料金プラン</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { name: "無料プラン", price: "0円", features: ["基本プロフィール掲載", "月3件まで問い合わせ受信", "サービス1カテゴリ"], cta: "無料登録する", highlight: false },
            { name: "スタンダード", price: "3,980円/月", features: ["全機能利用可", "問い合わせ無制限", "全カテゴリ掲載", "上位表示", "写真10枚"], cta: "スタンダードで始める", highlight: true },
            { name: "プレミアム", price: "9,800円/月", features: ["スタンダード全機能", "最上位表示（固定）", "バッジ表示", "写真30枚", "施工事例10件"], cta: "プレミアムで始める", highlight: false },
          ].map((plan) => (
            <div key={plan.name} className={`border p-6 ${plan.highlight ? "border-kincya" : "border-border"}`}>
              {plan.highlight && <p className="text-xs text-kincya mb-2">おすすめ</p>}
              <h3 className="text-lg text-sumi mb-1" style={{ fontFamily: "var(--font-serif)" }}>{plan.name}</h3>
              <p className="text-2xl text-kincya mb-4">{plan.price}</p>
              <ul className="space-y-2 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="text-xs text-sumi/70 flex items-center gap-1.5">
                    <span className="text-igusa text-sm">✓</span> {f}
                  </li>
                ))}
              </ul>
              <Link href="/pro/register" className={`block text-center text-xs py-2.5 transition-all duration-300 ${plan.highlight ? "bg-kincya text-white hover:bg-do" : "border border-border text-sumi/70 hover:border-ai hover:text-ai"}`}>
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-kiji/30 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl text-sumi text-center mb-8" style={{ fontFamily: "var(--font-serif)" }}>よくある質問</h2>
          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-white border border-border p-4">
                <p className="text-sm font-medium text-sumi mb-1">Q. {faq.q}</p>
                <p className="text-sm text-sumi/60">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-sumi py-16 text-center">
        <h2 className="text-2xl text-white mb-4" style={{ fontFamily: "var(--font-serif)" }}>まずは無料で掲載申請する</h2>
        <p className="text-sm text-white/60 mb-8">入力は数分で完了。申請内容を確認後、掲載開始のご連絡をいたします。</p>
        <Link href="/pro/register" className="inline-block bg-kincya text-white px-10 py-4 text-sm tracking-wider hover:bg-do transition-colors duration-300">
          無料で掲載申請する
        </Link>
      </section>
    </div>
  );
}
