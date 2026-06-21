import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import SampleBadge from "@/components/common/SampleBadge";
import { createMetadata } from "@/lib/metadata";
import { getMatchingProviders, getProviderFromResults } from "@/lib/matching";
import type { MatchingCondition } from "@/lib/types-platform";

export const metadata: Metadata = createMetadata({
  title: "マッチング結果 | おまかせマッチング",
  description: "ご入力の条件に合った業者を提案します。",
  path: "/matching/result",
  noindex: true,
});

interface Props {
  searchParams: Promise<{
    city?: string;
    service?: string;
    building?: string;
    schedule?: string;
    corporate?: string;
    weekend?: string;
    photo?: string;
    invoice?: string;
  }>;
}

function ScoreBadge({ score }: { score: number }) {
  const color =
    score >= 80
      ? "bg-igusa/15 text-igusa border-igusa/30"
      : score >= 60
      ? "bg-kincya/15 text-kincya border-kincya/30"
      : "bg-sumi/10 text-sumi/60 border-sumi/20";
  return (
    <span className={`inline-flex items-center text-xs font-bold px-2 py-0.5 rounded border ${color}`}>
      条件との相性 {score}%
    </span>
  );
}

export default async function MatchingResultPage({ searchParams }: Props) {
  const params = await searchParams;

  const condition: MatchingCondition = {
    city: params.city || undefined,
    serviceCategory: params.service || undefined,
    propertyType: params.building || undefined,
    schedule: params.schedule || undefined,
    isCorporate: params.corporate === "1",
    needsWeekend: params.weekend === "1",
    needsPhotoEstimate: params.photo === "1",
    needsInvoice: params.invoice === "1",
    needsRyokan: params.building === "ryokan",
    needsTempleShrine: params.building === "temple",
  };

  const matchingResults = getMatchingProviders(condition, 5);
  const results = getProviderFromResults(matchingResults);

  return (
    <div className="bg-cloud min-h-screen">
      {/* ヘッダー */}
      <div className="bg-sumi text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs
            items={[
              { label: "トップ", href: "/" },
              { label: "おまかせマッチング", href: "/matching" },
              { label: "マッチング結果" },
            ]}
            variant="dark"
          />
          <h1
            className="text-2xl sm:text-3xl font-bold mt-4 mb-2"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            マッチング結果
          </h1>
          <p className="text-white/70 text-sm">
            ご入力の条件に合った業者を{results.length}社提案します。
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 業者リスト */}
          <div className="lg:col-span-2 space-y-4">
            {/* 検索条件サマリ */}
            <div className="bg-shiro border border-border rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium text-sumi/60">検索条件</p>
                <Link href="/matching" className="text-xs text-ai hover:underline">
                  条件を変更
                </Link>
              </div>
              <div className="flex flex-wrap gap-2">
                {params.city && (
                  <span className="text-xs bg-kiji border border-kiji rounded px-2 py-0.5 text-sumi/70">
                    エリア: {params.city}
                  </span>
                )}
                {params.service && (
                  <span className="text-xs bg-kiji border border-kiji rounded px-2 py-0.5 text-sumi/70">
                    サービス: {params.service}
                  </span>
                )}
                {params.building && (
                  <span className="text-xs bg-kiji border border-kiji rounded px-2 py-0.5 text-sumi/70">
                    建物: {params.building}
                  </span>
                )}
                {!params.city && !params.service && !params.building && (
                  <span className="text-xs text-sumi/50">条件指定なし（全業者対象）</span>
                )}
              </div>
            </div>

            {results.length === 0 ? (
              <div className="bg-shiro border border-border rounded-xl p-8 text-center">
                <p className="text-sumi/60 text-sm mb-2">条件に合う業者が見つかりませんでした。</p>
                <Link
                  href="/matching"
                  className="text-sm text-ai hover:underline"
                >
                  条件を変更して再検索
                </Link>
              </div>
            ) : (
              results.map(({ result, provider }) => (
                <div key={provider.id} className="bg-shiro border border-border rounded-xl p-5">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1.5">
                        <span className="text-xs font-bold text-sumi/40">
                          #{result.rank}位
                        </span>
                        <ScoreBadge score={result.score.total} />
                        {provider.isSample && <SampleBadge />}
                      </div>
                      <h2 className="text-base font-bold text-sumi">
                        {provider.tradeName ?? provider.companyName}
                      </h2>
                      <p className="text-xs text-sumi/55 mt-0.5">
                        {provider.prefecture} {provider.city} ・ 評価 {provider.averageRating}（{provider.reviewCount}件）・ 実績 {provider.completedCount}件
                      </p>
                    </div>
                  </div>

                  {/* マッチング理由 */}
                  {result.score.reasons.filter((r) => r.positive).length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {result.score.reasons
                        .filter((r) => r.positive)
                        .slice(0, 5)
                        .map((reason) => (
                          <span
                            key={reason.type}
                            className="inline-block text-xs bg-igusa/10 text-igusa border border-igusa/20 rounded px-2 py-0.5"
                          >
                            ✓ {reason.label}
                          </span>
                        ))}
                    </div>
                  )}

                  <p className="text-xs text-sumi/65 mb-4 leading-relaxed line-clamp-2">
                    {provider.catchCopy}
                  </p>

                  {/* バッジ */}
                  {provider.badges && provider.badges.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {provider.badges.map((badge) => (
                        <span
                          key={badge.id}
                          className="text-xs border rounded px-2 py-0.5 text-sumi/60 border-sumi/20"
                        >
                          {badge.label}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Link
                      href={`/compare?ids=${provider.id}`}
                      className="flex-1 text-center text-xs font-medium text-sumi border border-border rounded-lg py-2 hover:bg-kiji transition-colors duration-150"
                    >
                      比較に追加
                    </Link>
                    <Link
                      href={`/bulk-quote/new?provider=${provider.id}`}
                      className="flex-1 text-center text-xs font-medium text-white bg-kincya rounded-lg py-2 hover:bg-kincya/90 transition-colors duration-150"
                    >
                      見積もりを依頼
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* サイドバー */}
          <div className="space-y-4">
            <div className="bg-shiro border border-border rounded-xl p-5">
              <h3 className="text-sm font-bold text-sumi mb-3" style={{ fontFamily: "var(--font-serif)" }}>
                スコアの見方
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="inline-block text-xs font-bold text-igusa bg-igusa/15 border border-igusa/30 rounded px-2 py-0.5">80%以上</span>
                  <span className="text-xs text-sumi/65">条件に非常に合っている</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block text-xs font-bold text-kincya bg-kincya/15 border border-kincya/30 rounded px-2 py-0.5">60-79%</span>
                  <span className="text-xs text-sumi/65">条件に概ね合っている</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block text-xs font-bold text-sumi/60 bg-sumi/10 border border-sumi/20 rounded px-2 py-0.5">60%未満</span>
                  <span className="text-xs text-sumi/65">一部条件が合わない可能性</span>
                </div>
              </div>
            </div>

            <div className="bg-kincya/5 border border-kincya/20 rounded-xl p-5">
              <h3 className="text-sm font-bold text-sumi mb-2" style={{ fontFamily: "var(--font-serif)" }}>
                一括見積もりもできます
              </h3>
              <p className="text-xs text-sumi/65 mb-3 leading-relaxed">
                複数業者に同時見積もり依頼して、料金・日程を比較してから選べます。
              </p>
              <Link
                href="/bulk-quote/new"
                className="block text-center text-xs font-medium bg-kincya text-white rounded-lg py-2 hover:bg-kincya/90 transition-colors duration-150"
              >
                一括見積もりに進む
              </Link>
            </div>

            <div className="bg-shiro border border-border rounded-xl p-5">
              <p className="text-xs text-sumi/50 leading-relaxed">
                掲載業者はサンプルデータです。資格・保険は業者の申告情報として掲載しています。見積内容を確認してから依頼できます。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
