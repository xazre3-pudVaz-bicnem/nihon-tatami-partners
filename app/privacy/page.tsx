import type { Metadata } from "next";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { SITE_URL } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "プライバシーポリシー | 日本畳パートナー",
  description: "日本畳パートナーのプライバシーポリシーです。個人情報の取り扱いについて説明します。",
  alternates: { canonical: `${SITE_URL}/privacy` },
};

const SECTIONS = [
  {
    title: "1. 収集する個人情報",
    body: "当サービスは、以下の個人情報を収集します。\n・氏名、メールアドレス、電話番号（会員登録時）\n・住所・居住エリア（見積依頼・予約時）\n・クレジットカード情報（決済時）\n・アクセスログ・クッキー情報",
  },
  {
    title: "2. 個人情報の利用目的",
    body: "収集した個人情報は、以下の目的で利用します。\n・サービスの提供・運営\n・業者とのマッチング・コミュニケーション支援\n・お問い合わせ対応\n・サービス改善・新機能開発のための分析\n・重要なお知らせの通知",
  },
  {
    title: "3. 第三者への提供",
    body: "当サービスは、以下の場合を除き、個人情報を第三者に提供しません。\n・ユーザーの同意がある場合\n・法令に基づく場合\n・人の生命・身体・財産の保護のために必要な場合\n・業者との契約履行のために必要な最小限の情報（氏名・連絡先）を業者へ提供する場合",
  },
  {
    title: "4. クッキー（Cookie）の利用",
    body: "当サービスは、利便性向上・アクセス解析のためにクッキーを利用します。ブラウザの設定でクッキーを無効にすることができますが、一部のサービスが利用できなくなる場合があります。",
  },
  {
    title: "5. 個人情報の開示・訂正・削除",
    body: "ご自身の個人情報の開示・訂正・削除をご希望の場合は、マイページから変更いただくか、info@nihontatami.jp へご連絡ください。本人確認を行った上で、合理的な期間内に対応します。",
  },
  {
    title: "6. セキュリティ",
    body: "当サービスは、個人情報への不正アクセス・漏洩・改ざんを防ぐため、SSL暗号化通信、パスワードのハッシュ化など適切な安全管理措置を講じています。",
  },
  {
    title: "7. プライバシーポリシーの変更",
    body: "当サービスは、必要に応じて本ポリシーを変更する場合があります。重要な変更はサービス上でお知らせします。",
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-shiro">
      <div className="bg-sumi">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumbs items={[{ label: "トップ", href: "/" }, { label: "プライバシーポリシー" }]} />
        </div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 pt-2">
          <h1 className="text-2xl text-white" style={{ fontFamily: "var(--font-serif)" }}>プライバシーポリシー</h1>
          <p className="text-xs text-white/40 mt-2">最終更新日：2024年11月1日</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white border border-border p-6 sm:p-8 space-y-6">
          <p className="text-sm text-sumi/70 leading-relaxed">
            日本畳パートナー（以下「当サービス」）は、ユーザーの個人情報保護を重要な責務と認識し、個人情報の保護に関する法律（個人情報保護法）等の法令に従い、以下のとおり取り扱います。
          </p>
          {SECTIONS.map((s) => (
            <section key={s.title}>
              <h2 className="text-base text-sumi mb-2" style={{ fontFamily: "var(--font-serif)" }}>{s.title}</h2>
              <p className="text-sm text-sumi/70 leading-relaxed whitespace-pre-line">{s.body}</p>
            </section>
          ))}
          <section>
            <h2 className="text-base text-sumi mb-2" style={{ fontFamily: "var(--font-serif)" }}>8. お問い合わせ</h2>
            <p className="text-sm text-sumi/70 leading-relaxed">
              個人情報に関するお問い合わせは下記までご連絡ください。<br />
              メールアドレス：info@nihontatami.jp
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
