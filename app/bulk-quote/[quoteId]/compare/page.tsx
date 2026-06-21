import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import SampleBadge from "@/components/common/SampleBadge";
import { createMetadata } from "@/lib/metadata";
import { MOCK_PROVIDERS } from "@/data/providers";

interface Props {
  params: Promise<{ quoteId: string }>;
}

export async function generateStaticParams() {
  return [{ quoteId: "demo" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { quoteId } = await params;
  return createMetadata({
    title: `見積もり比較 #${quoteId}`,
    description: "複数業者の見積もりを比較して最適な業者を選びましょう。",
    path: `/bulk-quote/${quoteId}/compare`,
    noindex: true,
  });
}

// サンプル比較データ
interface CompareProvider {
  providerId: string;
  totalEstimate: number;
  tatamiOmotegaeUnit: number;
  oldTatamiDisposal: number;
  furnitureMove: number;
  travelFee: number;
  earliestDate: string;
  paymentMethods: string[];
  rating: number;
  reviewCount: number;
  completedCount: number;
  responseTimeHours: number;
  isSample: boolean;
}

const COMPARE_PROVIDERS: CompareProvider[] = [
  {
    providerId: "prov-001",
    totalEstimate: 25200,
    tatamiOmotegaeUnit: 3800,
    oldTatamiDisposal: 1800,
    furnitureMove: 600,
    travelFee: 0,
    earliestDate: "2026-07-05",
    paymentMethods: ["現金", "振込"],
    rating: 4.8,
    reviewCount: 127,
    completedCount: 890,
    responseTimeHours: 4,
    isSample: true,
  },
  {
    providerId: "prov-003",
    totalEstimate: 22800,
    tatamiOmotegaeUnit: 3500,
    oldTatamiDisposal: 1800,
    furnitureMove: 0,
    travelFee: 0,
    earliestDate: "2026-07-03",
    paymentMethods: ["現金", "カード", "振込"],
    rating: 4.4,
    reviewCount: 63,
    completedCount: 1240,
    responseTimeHours: 2,
    isSample: true,
  },
];

function formatResponseTime(hours: number): string {
  if (hours < 2) return "〜2時間";
  if (hours < 6) return "半日以内";
  if (hours < 12) return "当日中";
  if (hours < 24) return "翌日まで";
  return `約${Math.ceil(hours / 24)}日`;
}

export default async function BulkQuoteComparePage({ params }: Props) {
  const { quoteId } = await params;

  const compareData = quoteId === "demo" ? COMPARE_PROVIDERS : [];
  const providers = compareData.map((cd) => ({
    ...cd,
    provider: MOCK_PROVIDERS.find((p) => p.id === cd.providerId),
  }));

  return (
    <div className="min-h-screen bg-shiro">
      {/* Header */}
      <div className="bg-sumi">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumbs
            variant="dark"
            items={[
              { label: "トップ", href: "/" },
              { label: "一括見積もり", href: "/bulk-quote" },
              { label: `依頼 #${quoteId}`, href: `/bulk-quote/${quoteId}` },
              { label: "比較" },
            ]}
          />
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 pt-3">
          <h1 className="text-xl md:text-2xl text-white mb-2" style={{ fontFamily: "var(--font-serif)" }}>
            見積もり比較
          </h1>
          <p className="text-xs text-white/50">
            {providers.length}社の見積もりを比較しています
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* デモバナー */}
        <div className="bg-kiji/50 border border-kincya/20 p-4 mb-6 flex items-start gap-3">
          <SampleBadge label="掲載イメージ" />
          <p className="text-xs text-sumi/60">
            金額はサンプルデータです。実際の見積もりは業者が提出した内容が表示されます。
          </p>
        </div>

        {/* モバイル: カード形式 */}
        <div className="block sm:hidden space-y-6 mb-8">
          {providers.map(({ provider, ...cd }, i) => (
            <div key={cd.providerId} className="bg-white border border-border overflow-hidden">
              <div className={`p-4 ${i === 0 ? "bg-kincya/5 border-b border-kincya/20" : "bg-white border-b border-border"}`}>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-base font-bold text-sumi" style={{ fontFamily: "var(--font-serif)" }}>
                      {provider?.tradeName || provider?.companyName}
                    </p>
                    <p className="text-xs text-sumi/40 mt-0.5">{provider?.city}</p>
                  </div>
                  {i === 0 && (
                    <span className="text-[11px] bg-kincya text-white px-2 py-0.5 shrink-0">最安値</span>
                  )}
                </div>
                <div className="mt-2">
                  <span className="text-2xl font-bold text-sumi">¥{cd.totalEstimate.toLocaleString()}</span>
                  <span className="text-xs text-sumi/40 ml-1">（概算）</span>
                </div>
              </div>
              <div className="p-4 space-y-2 text-sm">
                {[
                  { label: "畳表替え単価", value: `¥${cd.tatamiOmotegaeUnit.toLocaleString()}/枚` },
                  { label: "古畳処分費", value: cd.oldTatamiDisposal > 0 ? `¥${cd.oldTatamiDisposal.toLocaleString()}` : "無料" },
                  { label: "家具移動費", value: cd.furnitureMove > 0 ? `¥${cd.furnitureMove.toLocaleString()}` : "無料" },
                  { label: "出張費", value: cd.travelFee > 0 ? `¥${cd.travelFee.toLocaleString()}` : "無料" },
                  { label: "最短対応日", value: new Date(cd.earliestDate).toLocaleDateString("ja-JP") },
                  { label: "支払い方法", value: cd.paymentMethods.join("・") },
                  { label: "口コミ評価", value: `★${cd.rating.toFixed(1)}（${cd.reviewCount}件）` },
                  { label: "施工実績", value: `${cd.completedCount}件` },
                  { label: "返信速度", value: formatResponseTime(cd.responseTimeHours) },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between border-b border-kiji pb-2">
                    <span className="text-sumi/50">{row.label}</span>
                    <span className="text-sumi font-medium">{row.value}</span>
                  </div>
                ))}
              </div>
              <div className="p-4 space-y-2 border-t border-border">
                <button className="w-full text-center text-sm bg-kincya text-white py-3 font-bold hover:bg-do transition-colors">
                  この業者に決める
                </button>
                <button className="w-full text-center text-sm border border-ai text-ai py-2 hover:bg-ai hover:text-white transition-colors">
                  メッセージで質問する
                </button>
                <button className="w-full text-center text-xs text-sumi/40 py-1.5 hover:text-do transition-colors">
                  辞退する
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* PC: テーブル形式 */}
        <div className="hidden sm:block overflow-x-auto mb-8">
          <table className="w-full border-collapse bg-white border border-border">
            <thead>
              <tr>
                <th className="text-left text-xs text-sumi/50 p-4 border-b border-r border-border font-normal bg-kiji/20 w-36">
                  比較項目
                </th>
                {providers.map(({ provider }, i) => (
                  <th key={i} className="p-4 border-b border-r border-border text-center bg-white last:border-r-0">
                    <div className="flex flex-col items-center gap-1">
                      <p className="text-sm font-medium text-sumi" style={{ fontFamily: "var(--font-serif)" }}>
                        {provider?.tradeName || provider?.companyName}
                      </p>
                      <p className="text-xs text-sumi/40">{provider?.city}</p>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* 総額 */}
              <tr className="bg-kincya/5">
                <td className="text-xs text-sumi/60 p-4 border-b border-r border-border font-medium">総額目安</td>
                {providers.map(({ totalEstimate }, i) => {
                  const isMin = totalEstimate === Math.min(...providers.map((p) => p.totalEstimate));
                  return (
                    <td key={i} className="p-4 border-b border-r border-border text-center last:border-r-0">
                      <span className="text-xl font-bold text-sumi">¥{totalEstimate.toLocaleString()}</span>
                      {isMin && (
                        <span className="block text-[10px] text-kincya mt-0.5">最安値</span>
                      )}
                    </td>
                  );
                })}
              </tr>

              {/* 畳表替え単価 */}
              <tr>
                <td className="text-xs text-sumi/60 p-4 border-b border-r border-border">畳表替え単価</td>
                {providers.map(({ tatamiOmotegaeUnit }, i) => (
                  <td key={i} className="p-4 border-b border-r border-border text-center text-sm text-sumi last:border-r-0">
                    ¥{tatamiOmotegaeUnit.toLocaleString()}/枚
                  </td>
                ))}
              </tr>

              {/* 古畳処分費 */}
              <tr>
                <td className="text-xs text-sumi/60 p-4 border-b border-r border-border">古畳処分費</td>
                {providers.map(({ oldTatamiDisposal }, i) => (
                  <td key={i} className="p-4 border-b border-r border-border text-center text-sm text-sumi last:border-r-0">
                    {oldTatamiDisposal > 0 ? `¥${oldTatamiDisposal.toLocaleString()}` : (
                      <span className="text-igusa">無料</span>
                    )}
                  </td>
                ))}
              </tr>

              {/* 家具移動費 */}
              <tr>
                <td className="text-xs text-sumi/60 p-4 border-b border-r border-border">家具移動費</td>
                {providers.map(({ furnitureMove }, i) => (
                  <td key={i} className="p-4 border-b border-r border-border text-center text-sm text-sumi last:border-r-0">
                    {furnitureMove > 0 ? `¥${furnitureMove.toLocaleString()}` : (
                      <span className="text-igusa">無料</span>
                    )}
                  </td>
                ))}
              </tr>

              {/* 出張費 */}
              <tr>
                <td className="text-xs text-sumi/60 p-4 border-b border-r border-border">出張費</td>
                {providers.map(({ travelFee }, i) => (
                  <td key={i} className="p-4 border-b border-r border-border text-center text-sm text-sumi last:border-r-0">
                    {travelFee > 0 ? `¥${travelFee.toLocaleString()}` : (
                      <span className="text-igusa">無料</span>
                    )}
                  </td>
                ))}
              </tr>

              {/* 最短対応日 */}
              <tr>
                <td className="text-xs text-sumi/60 p-4 border-b border-r border-border">最短対応日</td>
                {providers.map(({ earliestDate }, i) => (
                  <td key={i} className="p-4 border-b border-r border-border text-center text-sm text-sumi last:border-r-0">
                    {new Date(earliestDate).toLocaleDateString("ja-JP")}〜
                  </td>
                ))}
              </tr>

              {/* 支払い方法 */}
              <tr>
                <td className="text-xs text-sumi/60 p-4 border-b border-r border-border">支払い方法</td>
                {providers.map(({ paymentMethods }, i) => (
                  <td key={i} className="p-4 border-b border-r border-border text-center text-sm text-sumi last:border-r-0">
                    {paymentMethods.join("・")}
                  </td>
                ))}
              </tr>

              {/* 口コミ評価 */}
              <tr>
                <td className="text-xs text-sumi/60 p-4 border-b border-r border-border">口コミ評価</td>
                {providers.map(({ rating, reviewCount }, i) => (
                  <td key={i} className="p-4 border-b border-r border-border text-center last:border-r-0">
                    <span className="text-kincya text-sm">★{rating.toFixed(1)}</span>
                    <span className="text-xs text-sumi/40 block">（{reviewCount}件）</span>
                  </td>
                ))}
              </tr>

              {/* 施工実績件数 */}
              <tr>
                <td className="text-xs text-sumi/60 p-4 border-b border-r border-border">施工実績</td>
                {providers.map(({ completedCount }, i) => (
                  <td key={i} className="p-4 border-b border-r border-border text-center text-sm text-sumi last:border-r-0">
                    {completedCount}件
                  </td>
                ))}
              </tr>

              {/* 返信速度 */}
              <tr>
                <td className="text-xs text-sumi/60 p-4 border-b border-r border-border">返信速度</td>
                {providers.map(({ responseTimeHours }, i) => (
                  <td key={i} className="p-4 border-b border-r border-border text-center text-sm text-igusa last:border-r-0">
                    {formatResponseTime(responseTimeHours)}
                  </td>
                ))}
              </tr>

              {/* アクション */}
              <tr>
                <td className="text-xs text-sumi/60 p-4 border-r border-border bg-kiji/10">アクション</td>
                {providers.map((_, i) => (
                  <td key={i} className="p-4 border-r border-border last:border-r-0">
                    <div className="space-y-2">
                      <button className="w-full text-sm bg-kincya text-white py-2.5 font-bold hover:bg-do transition-colors">
                        この業者に決める
                      </button>
                      <button className="w-full text-sm border border-ai text-ai py-2 hover:bg-ai hover:text-white transition-colors">
                        質問する
                      </button>
                      <button className="w-full text-xs text-sumi/30 py-1 hover:text-do transition-colors">
                        辞退する
                      </button>
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* 注意書き */}
        <div className="bg-kiji/30 border border-kiji p-5 text-xs text-sumi/60 leading-relaxed mb-6">
          <p className="font-medium text-sumi/70 mb-1">ご確認ください</p>
          <ul className="space-y-1">
            <li>・ 掲載イメージです。金額はサンプルです。実際の金額は業者が提出した見積もりに基づきます。</li>
            <li>・ 概算のため、現地確認後に金額が変わる場合があります。見積もり内容を確認してから依頼できます。</li>
            <li>・ 「この業者に決める」は現在デモ機能です。本番公開時に実際の依頼システムへ差し替えます。</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href={`/bulk-quote/${quoteId}`}
            className="text-center text-sm border border-border text-sumi/60 px-8 py-3 hover:border-sumi/40 transition-colors"
          >
            ← 依頼詳細に戻る
          </Link>
          <Link
            href="/bulk-quote/new"
            className="text-center text-sm border border-ai text-ai px-8 py-3 hover:bg-ai hover:text-white transition-colors"
          >
            新しく見積もり依頼
          </Link>
        </div>
      </div>
    </div>
  );
}
