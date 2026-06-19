import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "業者登録（無料）| 埼玉の畳・和室工事業者向け | 日本畳パートナー",
  description: "日本畳パートナーに業者登録して新規顧客を獲得。登録無料・審査あり。埼玉県で畳表替え・和室リフォーム・ふすま張替えの依頼を受けられます。",
  alternates: { canonical: `${SITE_URL}/pro` },
};

const BENEFITS = [
  { title: "無料で出店できる", desc: "基本プランは完全無料。月額費用なしで始められます。", sub: "有料プランで上位表示も可能" },
  { title: "埼玉の地域特化", desc: "埼玉県内を対象にした専門プラットフォームで、ターゲットとなるお客様に届きます。", sub: "市区町村ごとに絞り込み対応" },
  { title: "問い合わせを受信", desc: "ユーザーから直接問い合わせ・見積依頼が届きます。", sub: "法人・旅館・寺社も対応" },
  { title: "口コミで信頼を積む", desc: "施工後の口コミで実績を蓄積。新規顧客の安心材料になります。", sub: "業者からの返信も可能" },
];

const FAQS = [
  { q: "登録は本当に無料ですか？", a: "基本プランは完全無料です。上位表示などを希望する場合は有料プランもご用意しています。" },
  { q: "どんな業者でも登録できますか？", a: "審査があります。実際に埼玉県内で畳・和室工事を行っている業者様を対象としています。" },
  { q: "個人事業主でも登録できますか？", a: "はい。個人事業主の方も登録可能です。" },
  { q: "審査にはどれくらいかかりますか？", a: "通常1〜3営業日以内にご連絡します。" },
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
              埼玉の畳・和室工事業者様へ
            </h1>
            <p className="text-base text-white/60 max-w-xl mx-auto leading-relaxed mb-8">
              無料で掲載して新規のお客様を獲得。見積依頼・予約・メッセージ機能でやりとりも簡単です。
            </p>
            <Link href="/pro/register" className="inline-block bg-kincya text-white px-10 py-4 text-sm tracking-wider hover:bg-do transition-colors duration-300">
              無料で業者登録する
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

      {/* 対応可能なビジネス */}
      <section className="bg-kiji/50 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl text-sumi text-center mb-8" style={{ fontFamily: "var(--font-serif)" }}>このような業者様が登録しています</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {["畳工事業者", "内装工事業者", "和室リフォーム店", "原状回復専門業者"].map((t) => (
              <div key={t} className="bg-white border border-border p-4 text-center text-sm text-sumi/70">
                {t}
              </div>
            ))}
          </div>
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
        <h2 className="text-2xl text-white mb-4" style={{ fontFamily: "var(--font-serif)" }}>まずは無料で登録する</h2>
        <p className="text-sm text-white/60 mb-8">3分で完了。審査通過後すぐに掲載されます。</p>
        <Link href="/pro/register" className="inline-block bg-kincya text-white px-10 py-4 text-sm tracking-wider hover:bg-do transition-colors duration-300">
          無料で業者登録する
        </Link>
      </section>
    </div>
  );
}
