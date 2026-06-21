import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import SampleBadge from "@/components/common/SampleBadge";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "依頼履歴｜法人・管理会社向け",
  description: "法人アカウントでの依頼履歴・進捗管理ページです。ログイン後にご利用いただけます。",
  path: "/business/requests",
});

// デモ依頼履歴データ
const DEMO_REQUESTS = [
  {
    id: "req-001",
    date: "2026-06-15",
    address: "さいたま市浦和区常盤6丁目○-○",
    service: "畳表替え",
    tatamiCount: "6畳",
    providerName: "山田畳店",
    status: "完了",
    statusColor: "bg-igusa/10 text-igusa border-igusa",
    amount: "¥22,800",
    isSample: true,
  },
  {
    id: "req-002",
    date: "2026-06-18",
    address: "川口市本町3丁目○-○",
    service: "畳裏返し",
    tatamiCount: "4.5畳",
    providerName: "越谷内装センター",
    status: "工事中",
    statusColor: "bg-ai/10 text-ai border-ai",
    amount: "¥12,500",
    isSample: true,
  },
  {
    id: "req-003",
    date: "2026-06-19",
    address: "越谷市南越谷4丁目○-○",
    service: "畳表替え・ふすま張替え",
    tatamiCount: "8畳",
    providerName: "—（業者選定中）",
    status: "見積依頼中",
    statusColor: "bg-kincya/10 text-kincya border-kincya",
    amount: "概算中",
    isSample: true,
  },
  {
    id: "req-004",
    date: "2026-06-10",
    address: "草加市中央2丁目○-○",
    service: "畳新調",
    tatamiCount: "6畳",
    providerName: "川口畳サポート",
    status: "完了",
    statusColor: "bg-igusa/10 text-igusa border-igusa",
    amount: "¥78,000",
    isSample: true,
  },
];

const STATUS_SUMMARY = [
  { label: "完了", count: 2, color: "text-igusa" },
  { label: "工事中", count: 1, color: "text-ai" },
  { label: "見積依頼中", count: 1, color: "text-kincya" },
  { label: "今月合計", count: 4, color: "text-sumi" },
];

export default function BusinessRequestsPage() {
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
              { label: "依頼履歴" },
            ]}
          />
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 pt-3">
          <div className="inline-block text-xs border border-ai/40 text-ai px-3 py-1 mb-3">法人・管理会社向け</div>
          <h1 className="text-xl md:text-2xl text-white mb-2" style={{ fontFamily: "var(--font-serif)" }}>
            依頼履歴・進捗管理
          </h1>
          <p className="text-xs text-white/50">
            法人アカウントでの依頼状況を一覧管理できます
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ログイン誘導バナー */}
        <div className="bg-white border border-ai/20 p-5 mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <p className="text-sm font-medium text-sumi mb-0.5">ログイン後に依頼履歴を管理できます</p>
            <p className="text-xs text-sumi/60">以下はサンプル表示です。実際の依頼データは法人アカウントにログインしてご確認ください。</p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link
              href="/auth/login"
              className="text-sm bg-kincya text-white px-5 py-2 font-bold hover:bg-do transition-colors"
            >
              ログイン
            </Link>
            <Link
              href="/auth/register"
              className="text-sm border border-ai text-ai px-5 py-2 hover:bg-ai hover:text-white transition-colors"
            >
              登録
            </Link>
          </div>
        </div>

        {/* ステータスサマリー */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {STATUS_SUMMARY.map((s) => (
            <div key={s.label} className="bg-white border border-border p-4 text-center">
              <p className={`text-2xl font-bold ${s.color}`}>{s.count}</p>
              <p className="text-xs text-sumi/50 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* 依頼一覧テーブル */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base text-sumi" style={{ fontFamily: "var(--font-serif)" }}>
            依頼一覧
          </h2>
          <SampleBadge label="掲載イメージ" />
        </div>

        {/* デスクトップ: テーブル */}
        <div className="hidden sm:block overflow-x-auto mb-6">
          <table className="w-full bg-white border border-border border-collapse text-sm">
            <thead>
              <tr className="bg-kiji/30 border-b border-border">
                <th className="text-left text-xs text-sumi/50 p-3 font-normal border-r border-border">依頼日</th>
                <th className="text-left text-xs text-sumi/50 p-3 font-normal border-r border-border">住所</th>
                <th className="text-left text-xs text-sumi/50 p-3 font-normal border-r border-border">サービス</th>
                <th className="text-left text-xs text-sumi/50 p-3 font-normal border-r border-border">業者</th>
                <th className="text-left text-xs text-sumi/50 p-3 font-normal border-r border-border">金額</th>
                <th className="text-left text-xs text-sumi/50 p-3 font-normal">ステータス</th>
              </tr>
            </thead>
            <tbody>
              {DEMO_REQUESTS.map((req) => (
                <tr key={req.id} className="border-b border-border hover:bg-kiji/10 transition-colors">
                  <td className="p-3 text-sumi/60 border-r border-border whitespace-nowrap">
                    {new Date(req.date).toLocaleDateString("ja-JP")}
                  </td>
                  <td className="p-3 text-sumi border-r border-border">
                    <span className="line-clamp-1">{req.address}</span>
                  </td>
                  <td className="p-3 text-sumi border-r border-border">
                    {req.service}
                    <span className="block text-xs text-sumi/40">{req.tatamiCount}</span>
                  </td>
                  <td className="p-3 text-sumi border-r border-border">{req.providerName}</td>
                  <td className="p-3 font-medium text-sumi border-r border-border">{req.amount}</td>
                  <td className="p-3">
                    <span className={`text-xs border px-2 py-0.5 ${req.statusColor}`}>{req.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* モバイル: カード */}
        <div className="sm:hidden space-y-4 mb-6">
          {DEMO_REQUESTS.map((req) => (
            <div key={req.id} className="bg-white border border-border p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <p className="text-xs text-sumi/40">{new Date(req.date).toLocaleDateString("ja-JP")}</p>
                  <p className="text-sm text-sumi mt-0.5">{req.address}</p>
                </div>
                <span className={`text-xs border px-2 py-0.5 shrink-0 ${req.statusColor}`}>{req.status}</span>
              </div>
              <div className="text-xs text-sumi/60 space-y-1 mt-3 border-t border-kiji pt-2">
                <div className="flex justify-between">
                  <span>サービス</span>
                  <span className="text-sumi">{req.service} / {req.tatamiCount}</span>
                </div>
                <div className="flex justify-between">
                  <span>業者</span>
                  <span className="text-sumi">{req.providerName}</span>
                </div>
                <div className="flex justify-between">
                  <span>金額</span>
                  <span className="font-medium text-sumi">{req.amount}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-sumi/40 text-center mb-8">
          ※ ログイン後に実際の依頼データが表示されます
        </p>

        {/* 新しく依頼を始める */}
        <div className="bg-kiji/30 border border-kiji p-6 text-center">
          <h3 className="text-base text-sumi mb-2" style={{ fontFamily: "var(--font-serif)" }}>
            新しく依頼を始める
          </h3>
          <p className="text-xs text-sumi/60 mb-4">複数物件をまとめて相談する場合は一括相談フォームをご利用ください。</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/business/bulk-request"
              className="text-center text-sm bg-kincya text-white px-8 py-3 font-bold hover:bg-do transition-colors"
            >
              複数物件 一括相談
            </Link>
            <Link
              href="/bulk-quote/new"
              className="text-center text-sm border border-ai text-ai px-8 py-3 hover:bg-ai hover:text-white transition-colors"
            >
              1件から見積もり依頼
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
