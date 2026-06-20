import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { SITE_URL } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "ヘルプ・よくある質問 | 日本畳パートナー",
  description: "日本畳パートナーの使い方、よくある質問をご紹介します。業者の探し方、予約方法、見積もり依頼の手順など。",
  alternates: { canonical: `${SITE_URL}/help` },
};

const HELP_ARTICLES = [
  {
    category: "ユーザー向け",
    articles: [
      { slug: "how-to-search", title: "業者の探し方" },
      { slug: "how-to-contact", title: "問い合わせ・予約の方法" },
      { slug: "how-to-quote", title: "見積もりの依頼方法" },
      { slug: "review-guide", title: "口コミの投稿方法" },
      { slug: "account-settings", title: "アカウント設定" },
    ],
  },
  {
    category: "業者向け",
    articles: [
      { slug: "provider-register", title: "業者登録の方法" },
      { slug: "profile-setup", title: "プロフィールの設定方法" },
      { slug: "booking-management", title: "予約・見積もりの管理" },
      { slug: "plan-comparison", title: "プランの比較と変更" },
      { slug: "review-reply", title: "口コミへの返信方法" },
    ],
  },
  {
    category: "料金・サービス",
    articles: [
      { slug: "tatami-price-guide", title: "畳表替えの料金相場" },
      { slug: "fusuma-price-guide", title: "ふすま張替えの料金相場" },
      { slug: "washitsu-reform-guide", title: "和室リフォームの費用目安" },
    ],
  },
];

const FAQS = [
  { q: "利用は無料ですか？", a: "ユーザー（施主様）の利用は完全無料です。業者登録も基本プランは無料です。" },
  { q: "掲載業者はどのように確認されていますか？", a: "掲載申請時に会社情報・連絡先・対応サービスの確認を行っています。資格・保険などの詳細は各業者にご確認ください。" },
  { q: "見積もりを依頼したら必ず発注しなければなりませんか？", a: "いいえ。見積もりを依頼するだけで、断ることもできます。" },
  { q: "個人情報は安全ですか？", a: "SSL暗号化通信を使用しています。個人情報は業者との連絡に必要な場合のみ共有されます。" },
];

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-shiro">
      <div className="bg-sumi">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumbs items={[{ label: "トップ", href: "/" }, { label: "ヘルプ" }]} />
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 pt-4">
          <h1 className="text-2xl md:text-3xl text-white mb-2" style={{ fontFamily: "var(--font-serif)" }}>ヘルプセンター</h1>
          <p className="text-sm text-white/60">日本畳パートナーの使い方をご案内します</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 検索 */}
        <div className="mb-8">
          <div className="flex gap-2 max-w-lg">
            <input type="text" placeholder="ヘルプを検索..." className="flex-1 border border-border text-sm px-4 py-3 focus:outline-none focus:border-ai" />
            <button className="bg-ai text-white px-4 py-3 text-sm hover:opacity-80 transition-opacity">検索</button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {HELP_ARTICLES.map((section) => (
              <section key={section.category} className="bg-white border border-border p-5">
                <h2 className="text-base text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>{section.category}</h2>
                <ul className="space-y-2">
                  {section.articles.map((article) => (
                    <li key={article.slug}>
                      <Link href={`/help/${article.slug}`} className="flex items-center justify-between text-sm text-sumi/70 hover:text-ai transition-colors py-1.5 border-b border-kiji last:border-0">
                        <span>{article.title}</span>
                        <span className="text-sumi/30">→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <div className="space-y-4">
            <section className="bg-white border border-border p-5">
              <h2 className="text-base text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>よくある質問</h2>
              <div className="space-y-4">
                {FAQS.map((faq, i) => (
                  <div key={i} className="border-b border-kiji pb-3 last:border-0 last:pb-0">
                    <p className="text-xs font-medium text-sumi mb-1">Q. {faq.q}</p>
                    <p className="text-xs text-sumi/60">{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>

            <div className="bg-kiji/50 border border-kiji p-5">
              <h3 className="text-sm text-sumi mb-2" style={{ fontFamily: "var(--font-serif)" }}>お問い合わせ</h3>
              <p className="text-xs text-sumi/60 mb-3">ヘルプで解決しない場合は、お気軽にお問い合わせください</p>
              <Link href="/contact" className="block text-center text-xs bg-ai text-white py-2 hover:opacity-80 transition-opacity">
                お問い合わせする
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
