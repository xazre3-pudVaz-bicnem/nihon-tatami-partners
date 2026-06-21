import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "物件管理｜法人・管理会社向け",
  description: "ログイン後に管理物件の一覧・見積依頼・進捗確認ができます。管理会社・不動産会社向け機能。",
  path: "/business/properties",
});

const FEATURES = [
  {
    icon: "🏠",
    title: "物件登録",
    description: "管理物件をまとめて登録。住所・建物種別・畳数などを一元管理できます。",
  },
  {
    icon: "📋",
    title: "見積依頼管理",
    description: "物件ごとに見積もり依頼を作成・管理。複数業者への一括依頼も可能です。",
  },
  {
    icon: "📊",
    title: "進捗確認",
    description: "各物件の工事進捗をリアルタイムで確認。完了報告・写真も確認できます。",
  },
  {
    icon: "💰",
    title: "費用管理",
    description: "物件ごとの費用履歴を記録。請求書・領収書の発行依頼もできます。",
  },
];

// デモ物件データ
const DEMO_PROPERTIES = [
  {
    id: "prop-001",
    address: "さいたま市浦和区常盤6丁目○番○号",
    propertyType: "マンション",
    tatamiCount: "6畳",
    status: "見積依頼中",
    statusColor: "text-kincya",
  },
  {
    id: "prop-002",
    address: "川口市本町3丁目○番○号",
    propertyType: "アパート",
    tatamiCount: "4.5畳",
    status: "工事完了",
    statusColor: "text-igusa",
  },
  {
    id: "prop-003",
    address: "越谷市南越谷4丁目○番○号",
    propertyType: "戸建て",
    tatamiCount: "8畳",
    status: "確認待ち",
    statusColor: "text-ai",
  },
];

export default function BusinessPropertiesPage() {
  return (
    <div className="min-h-screen bg-shiro">
      {/* Header */}
      <div className="bg-sumi">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumbs
            variant="dark"
            items={[
              { label: "トップ", href: "/" },
              { label: "法人・管理会社向け", href: "/business" },
              { label: "物件管理" },
            ]}
          />
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 pt-3">
          <div className="inline-block text-xs border border-ai/40 text-ai px-3 py-1 mb-3">法人・管理会社向け</div>
          <h1 className="text-xl md:text-2xl text-white mb-2" style={{ fontFamily: "var(--font-serif)" }}>
            物件管理
          </h1>
          <p className="text-xs text-white/50">
            登録した管理物件の見積依頼・進捗確認ができます
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* ログイン誘導 */}
        <div className="bg-white border border-border p-8 text-center mb-10">
          <div className="w-14 h-14 bg-kiji border border-border mx-auto flex items-center justify-center mb-4">
            <span className="text-2xl text-sumi/40">🔒</span>
          </div>
          <h2 className="text-lg text-sumi mb-2" style={{ fontFamily: "var(--font-serif)" }}>
            ログイン後に物件管理ができます
          </h2>
          <p className="text-sm text-sumi/60 mb-6 max-w-md mx-auto leading-relaxed">
            アカウントを作成・ログインすると、管理物件の登録・見積依頼・進捗確認などの機能をご利用いただけます。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/auth/login"
              className="text-center text-sm bg-kincya text-white px-8 py-3 font-bold hover:bg-do transition-colors"
            >
              ログイン
            </Link>
            <Link
              href="/auth/register"
              className="text-center text-sm border border-ai text-ai px-8 py-3 hover:bg-ai hover:text-white transition-colors"
            >
              新規アカウント作成
            </Link>
          </div>
        </div>

        {/* 機能紹介 */}
        <section className="mb-10">
          <h2 className="text-base text-sumi mb-6" style={{ fontFamily: "var(--font-serif)" }}>
            物件管理でできること
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FEATURES.map((feature) => (
              <div key={feature.title} className="bg-white border border-border p-5">
                <div className="flex items-start gap-4">
                  <span className="text-2xl shrink-0">{feature.icon}</span>
                  <div>
                    <h3 className="text-sm font-medium text-sumi mb-1">{feature.title}</h3>
                    <p className="text-xs text-sumi/60 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* デモ表示 */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base text-sumi" style={{ fontFamily: "var(--font-serif)" }}>
              物件一覧（掲載イメージ）
            </h2>
            <span className="text-[10px] bg-kiji border border-sumi/20 text-sumi/50 px-2 py-0.5">掲載イメージ</span>
          </div>
          <div className="space-y-3">
            {DEMO_PROPERTIES.map((prop) => (
              <div key={prop.id} className="bg-white border border-border p-4 flex items-center justify-between gap-4 opacity-60">
                <div>
                  <p className="text-sm text-sumi">{prop.address}</p>
                  <p className="text-xs text-sumi/50 mt-0.5">{prop.propertyType} / {prop.tatamiCount}</p>
                </div>
                <span className={`text-xs font-medium shrink-0 ${prop.statusColor}`}>{prop.status}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-sumi/40 text-center mt-3">
            ※ ログイン後に実際の物件データが表示されます
          </p>
        </section>

        {/* 法人一括相談へのCTA */}
        <div className="mt-10 bg-kiji/30 border border-kiji p-6 text-center">
          <h3 className="text-base text-sumi mb-2" style={{ fontFamily: "var(--font-serif)" }}>
            今すぐ複数物件をまとめて相談する
          </h3>
          <p className="text-xs text-sumi/60 mb-4">アカウント不要で、複数物件の畳工事をまとめてご相談いただけます。</p>
          <Link
            href="/business/bulk-request"
            className="inline-block text-sm bg-kincya text-white px-8 py-3 font-bold hover:bg-do transition-colors"
          >
            一括相談フォームへ
          </Link>
        </div>
      </div>
    </div>
  );
}
