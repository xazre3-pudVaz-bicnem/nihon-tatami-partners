import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { MOCK_WORK_CASES, getWorkCaseById } from "@/data/workcases";
import { MOCK_PROVIDERS } from "@/data/providers";
import { SITE_URL } from "@/lib/metadata";

interface Props { params: Promise<{ id: string }> }

export async function generateStaticParams() {
  return MOCK_WORK_CASES.map((w) => ({ id: w.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const wc = getWorkCaseById(id);
  if (!wc) return {};
  return {
    title: `${wc.title} | 施工事例 | 日本畳パートナー`,
    description: `${wc.cityName}の${wc.categoryName}施工事例。${wc.estimatedCostLabel ? `費用概算${wc.estimatedCostLabel}。` : ""}`,
    alternates: { canonical: `${SITE_URL}/works/${id}` },
  };
}

export default async function WorkCaseDetailPage({ params }: Props) {
  const { id } = await params;
  const wc = getWorkCaseById(id);
  if (!wc) notFound();

  const provider = MOCK_PROVIDERS.find((p) => p.id === wc.providerId);
  const related = MOCK_WORK_CASES.filter((w) => w.categorySlug === wc.categorySlug && w.id !== wc.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-shiro">
      <div className="bg-sumi">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumbs items={[
            { label: "トップ", href: "/" },
            { label: "施工事例", href: "/works" },
            { label: wc.title },
          ]} />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 pt-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs text-ai border border-ai/30 px-2 py-0.5">{wc.categoryName}</span>
          </div>
          <h1 className="text-xl md:text-2xl text-white" style={{ fontFamily: "var(--font-serif)" }}>{wc.title}</h1>
          <p className="text-sm text-white/50 mt-2">{wc.cityName} / {wc.buildingType}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Before/After 写真 */}
            <section className="mb-6">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-sumi/50 mb-1.5">施工前（Before）</p>
                  <div className="aspect-[4/3] bg-sumi/5 border border-border flex items-center justify-center">
                    <span className="text-xs text-sumi/30">Before 写真</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-sumi/50 mb-1.5">施工後（After）</p>
                  <div className="aspect-[4/3] bg-kiji/50 border border-border flex items-center justify-center">
                    <span className="text-xs text-sumi/30">After 写真</span>
                  </div>
                </div>
              </div>
            </section>

            {/* 施工詳細 */}
            <section className="bg-white border border-border p-5 mb-6">
              <h2 className="text-base text-sumi mb-3" style={{ fontFamily: "var(--font-serif)" }}>施工詳細</h2>
              <div className="grid grid-cols-2 gap-3 text-xs mb-4">
                <div><span className="text-sumi/40 block mb-0.5">施工カテゴリ</span>{wc.categoryName}</div>
                <div><span className="text-sumi/40 block mb-0.5">施工エリア</span>{wc.cityName}</div>
                <div><span className="text-sumi/40 block mb-0.5">建物種別</span>{wc.buildingType}</div>
                {wc.tatamiFlex && <div><span className="text-sumi/40 block mb-0.5">畳の枚数</span>{wc.tatamiFlex}畳</div>}
                {wc.estimatedCostLabel && <div><span className="text-sumi/40 block mb-0.5">費用概算</span>{wc.estimatedCostLabel}</div>}
                {wc.workingDays && <div><span className="text-sumi/40 block mb-0.5">施工期間</span>{wc.workingDays}日間</div>}
              </div>
              {wc.description && (
                <p className="text-sm text-sumi/70 leading-relaxed">{wc.description}</p>
              )}
            </section>

            {/* 施工のポイント */}
            {wc.point && (
              <section className="bg-kiji/50 border border-kiji p-5 mb-6">
                <h2 className="text-base text-sumi mb-3" style={{ fontFamily: "var(--font-serif)" }}>施工のポイント</h2>
                <div className="flex items-start gap-2 text-xs text-sumi/70">
                  <span className="w-4 h-4 bg-igusa text-white flex items-center justify-center text-xs shrink-0 mt-0.5">!</span>
                  <p>{wc.point}</p>
                </div>
                {wc.challenge && (
                  <div className="mt-3 pt-3 border-t border-kiji">
                    <p className="text-xs text-sumi/40 mb-1">課題</p>
                    <p className="text-xs text-sumi/70">{wc.challenge}</p>
                  </div>
                )}
                {wc.proposal && (
                  <div className="mt-3 pt-3 border-t border-kiji">
                    <p className="text-xs text-sumi/40 mb-1">提案・対応</p>
                    <p className="text-xs text-sumi/70">{wc.proposal}</p>
                  </div>
                )}
              </section>
            )}

            {/* 関連事例 */}
            {related.length > 0 && (
              <section>
                <h2 className="text-base text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>
                  同じカテゴリの施工事例
                </h2>
                <div className="grid grid-cols-3 gap-3">
                  {related.map((r) => (
                    <Link key={r.id} href={`/works/${r.id}`} className="group">
                      <div className="aspect-[4/3] bg-kiji/50 mb-2 group-hover:opacity-80 transition-opacity" />
                      <p className="text-xs text-sumi group-hover:text-ai transition-colors line-clamp-2">{r.title}</p>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* サイドバー */}
          <div className="space-y-4">
            {provider && (
              <div className="bg-white border border-border p-5">
                <h3 className="text-sm text-sumi mb-3" style={{ fontFamily: "var(--font-serif)" }}>施工業者</h3>
                <p className="text-sm font-medium text-sumi mb-0.5">{provider.tradeName || provider.companyName}</p>
                <p className="text-xs text-sumi/50 mb-1">{provider.city}</p>
                <div className="flex items-center gap-1 mb-3">
                  <span className="text-kincya text-sm">{"★".repeat(Math.floor(provider.averageRating || 0))}</span>
                  <span className="text-xs text-sumi/50">{provider.averageRating?.toFixed(1)} ({provider.reviewCount}件)</span>
                </div>
                <Link href={`/providers/${provider.id}`} className="block text-center text-xs bg-ai text-white py-2 hover:opacity-80 transition-opacity">
                  業者詳細を見る
                </Link>
              </div>
            )}

            <div className="bg-kiji/50 border border-kiji p-5">
              <h3 className="text-sm text-sumi mb-2" style={{ fontFamily: "var(--font-serif)" }}>同様の工事の見積もりを取る</h3>
              <p className="text-xs text-sumi/60 mb-3">無料で複数業者に見積もり依頼ができます</p>
              <Link href="/search" className="block text-center text-xs bg-kincya text-white py-2 hover:bg-do transition-colors">
                業者を探して見積もりを依頼
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
