import type { Metadata } from "next";
import Link from "next/link";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "見積もり依頼が完了しました",
  description: "一括見積もり依頼が完了しました。業者からの返信をお待ちください。",
  path: "/bulk-quote/complete",
  noindex: true,
});

interface Props {
  searchParams: Promise<{ providers?: string; schedule?: string }>;
}

export default async function BulkQuoteCompletePage({ searchParams }: Props) {
  const sp = await searchParams;
  const providerCount = sp.providers ? parseInt(sp.providers, 10) : 3;
  const schedule = sp.schedule ?? "";

  return (
    <div className="min-h-screen bg-shiro">
      {/* Header */}
      <div className="bg-sumi">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="text-xs text-white/40">
            <Link href="/" className="hover:text-white/70 transition-colors">トップ</Link>
            <span className="mx-1.5 text-white/20">/</span>
            <Link href="/bulk-quote" className="hover:text-white/70 transition-colors">一括見積もり</Link>
            <span className="mx-1.5 text-white/20">/</span>
            <span className="text-white/60">依頼完了</span>
          </nav>
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 pt-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-igusa/20 border border-igusa flex items-center justify-center">
              <span className="text-igusa text-xl">✓</span>
            </div>
            <h1 className="text-xl md:text-2xl text-white" style={{ fontFamily: "var(--font-serif)" }}>
              見積もり依頼を送信しました
            </h1>
          </div>
          <p className="text-sm text-white/60">
            選択した {providerCount}社 に見積もりの依頼を送りました。業者からの返信をお待ちください。
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* 依頼内容の確認 */}
        <div className="bg-white border border-border p-6 mb-6">
          <h2 className="text-base text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>依頼内容の概要</h2>
          <dl className="space-y-3 text-sm">
            <div className="flex items-start gap-4 border-b border-kiji pb-3">
              <dt className="text-sumi/40 w-28 shrink-0">依頼業者数</dt>
              <dd className="text-sumi font-medium">{providerCount}社</dd>
            </div>
            {schedule && (
              <div className="flex items-start gap-4 border-b border-kiji pb-3">
                <dt className="text-sumi/40 w-28 shrink-0">希望時期</dt>
                <dd className="text-sumi">{schedule}</dd>
              </div>
            )}
            <div className="flex items-start gap-4">
              <dt className="text-sumi/40 w-28 shrink-0">返信の目安</dt>
              <dd className="text-sumi">数時間〜1営業日（業者により異なります）</dd>
            </div>
          </dl>
        </div>

        {/* 次のアクション */}
        <div className="bg-white border border-border p-6 mb-6">
          <h2 className="text-base text-sumi mb-5" style={{ fontFamily: "var(--font-serif)" }}>次のステップ</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-ai text-white flex items-center justify-center text-sm font-bold shrink-0">1</div>
              <div>
                <p className="text-sm text-sumi font-medium">業者からの返信を待つ</p>
                <p className="text-xs text-sumi/50 mt-0.5">各業者から見積もりが届きます。返信速度は業者によって異なります。</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-ai text-white flex items-center justify-center text-sm font-bold shrink-0">2</div>
              <div>
                <p className="text-sm text-sumi font-medium">見積もりを比較する</p>
                <p className="text-xs text-sumi/50 mt-0.5">価格・対応内容・口コミ評価をもとに比較できます。</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-ai text-white flex items-center justify-center text-sm font-bold shrink-0">3</div>
              <div>
                <p className="text-sm text-sumi font-medium">気に入った業者に正式依頼</p>
                <p className="text-xs text-sumi/50 mt-0.5">見積もり内容を確認してから依頼できます。不要な業者には断りの連絡も可能です。</p>
              </div>
            </div>
          </div>
        </div>

        {/* アクションボタン */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <Link
            href="/bulk-quote/demo/compare"
            className="block text-center text-sm bg-kincya text-white py-4 font-bold hover:bg-do transition-colors"
          >
            比較を確認する（デモ）
          </Link>
          <Link
            href="/bulk-quote/demo"
            className="block text-center text-sm border border-ai text-ai py-4 hover:bg-ai hover:text-white transition-colors"
          >
            依頼の詳細を見る
          </Link>
          <Link
            href="/"
            className="block text-center text-sm border border-border text-sumi/60 py-4 hover:border-sumi/40 transition-colors"
          >
            トップへ戻る
          </Link>
        </div>

        {/* 注意書き */}
        <div className="bg-kiji/30 border border-kiji p-5 text-xs text-sumi/60 leading-relaxed">
          <p className="font-medium text-sumi/70 mb-1">ご確認ください</p>
          <ul className="space-y-1">
            <li>・ これはデモページです。本番公開時に実際の依頼システムへ差し替えます。</li>
            <li>・ 表示された金額はあくまで概算です。正確な費用は業者の現地確認後に確定します。</li>
            <li>・ 業者の資格・保険等の情報は業者の申告情報として掲載しています。</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
