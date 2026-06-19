import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { MOCK_WORK_CASES, getWorkCaseById } from "@/data/workcases";
import { MOCK_PROVIDERS } from "@/data/providers";
import { getCategoryConfigBySlug } from "@/config/categories";
import { SITE_URL } from "@/lib/metadata";
import { formatDate } from "@/lib/utils";

interface Props {
  params: Promise<{ caseId: string }>;
}

const BUILDING_LABELS: Record<string, string> = {
  house: "一戸建て",
  apartment: "マンション・アパート",
  rental: "賃貸物件",
  office: "事務所",
  store: "店舗",
  ryokan: "旅館・宿泊施設",
  temple: "寺院・神社",
  other: "その他",
};

export async function generateStaticParams() {
  return MOCK_WORK_CASES.map((w) => ({ caseId: w.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { caseId } = await params;
  const wc = getWorkCaseById(caseId);
  if (!wc) return {};
  return {
    title: `${wc.title}｜施工事例 | 日本畳パートナーズ`,
    description: `${wc.cityName ?? "埼玉県"}の${wc.categoryName}施工事例。${wc.estimatedCostLabel ? `費用目安${wc.estimatedCostLabel}。` : ""}${wc.description.slice(0, 70)}`,
    alternates: { canonical: `${SITE_URL}/cases/${caseId}` },
    openGraph: { title: wc.title, description: wc.description.slice(0, 100), type: "article", locale: "ja_JP" },
  };
}

export default async function CaseDetailPage({ params }: Props) {
  const { caseId } = await params;
  const wc = getWorkCaseById(caseId);
  if (!wc) notFound();

  const provider = MOCK_PROVIDERS.find((p) => p.id === wc.providerId);
  const related = MOCK_WORK_CASES.filter((w) => w.categorySlug === wc.categorySlug && w.id !== wc.id).slice(0, 3);
  const buildingLabel = wc.buildingType ? BUILDING_LABELS[wc.buildingType] ?? wc.buildingType : undefined;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "トップ", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "施工事例", item: `${SITE_URL}/cases` },
      { "@type": "ListItem", position: 3, name: wc.title, item: `${SITE_URL}/cases/${caseId}` },
    ],
  };
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: wc.title,
    description: wc.description,
    datePublished: wc.publishedAt,
    author: { "@type": "Organization", name: wc.providerName },
    publisher: { "@type": "Organization", name: "日本畳パートナーズ", url: SITE_URL },
    mainEntityOfPage: `${SITE_URL}/cases/${caseId}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      <div className="min-h-screen bg-shiro">
        <div className="bg-sumi">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumbs
              variant="dark"
              items={[{ label: "トップ", href: "/" }, { label: "施工事例", href: "/cases" }, { label: wc.title }]}
            />
          </div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 pt-4">
            <span className="text-xs text-kincya border border-kincya/30 px-2 py-0.5">{wc.categoryName}</span>
            <h1 className="text-xl md:text-2xl text-white mt-2" style={{ fontFamily: "var(--font-serif)" }}>
              {wc.title}
            </h1>
            <p className="text-sm text-white/50 mt-2">
              {wc.cityName} {buildingLabel ? `/ ${buildingLabel}` : ""} / {formatDate(wc.publishedAt)}
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Before/After */}
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
                    <div className="aspect-[4/3] bg-kiji/50 tatami-pattern border border-border flex items-center justify-center">
                      <span className="text-xs text-sumi/30">After 写真</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* 施工概要 */}
              <section className="bg-white border border-border p-5 mb-6">
                <h2 className="text-base text-sumi mb-3" style={{ fontFamily: "var(--font-serif)" }}>施工概要</h2>
                <div className="grid grid-cols-2 gap-3 text-xs mb-4">
                  <div><span className="text-sumi/40 block mb-0.5">施工カテゴリ</span>{wc.categoryName}</div>
                  <div><span className="text-sumi/40 block mb-0.5">エリア</span>{wc.cityName ?? "—"}</div>
                  {buildingLabel && <div><span className="text-sumi/40 block mb-0.5">建物種別</span>{buildingLabel}</div>}
                  {wc.tatamiFlex && <div><span className="text-sumi/40 block mb-0.5">畳数</span>{wc.tatamiFlex}畳</div>}
                  {wc.estimatedCostLabel && <div><span className="text-sumi/40 block mb-0.5">費用目安</span>{wc.estimatedCostLabel}</div>}
                  {wc.workingDays && <div><span className="text-sumi/40 block mb-0.5">施工期間</span>{wc.workingDays}日間</div>}
                </div>
                <p className="text-sm text-sumi/70 leading-relaxed">{wc.description}</p>
              </section>

              {/* 依頼背景・課題 */}
              {wc.challenge && (
                <section className="bg-white border border-border p-5 mb-6">
                  <h2 className="text-base text-sumi mb-2" style={{ fontFamily: "var(--font-serif)" }}>依頼背景・課題</h2>
                  <p className="text-sm text-sumi/70 leading-relaxed">{wc.challenge}</p>
                </section>
              )}

              {/* 提案内容 */}
              {wc.proposal && (
                <section className="bg-white border border-border p-5 mb-6">
                  <h2 className="text-base text-sumi mb-2" style={{ fontFamily: "var(--font-serif)" }}>提案内容</h2>
                  <p className="text-sm text-sumi/70 leading-relaxed">{wc.proposal}</p>
                </section>
              )}

              {/* 施工のポイント */}
              {wc.point && (
                <section className="bg-kiji/50 border border-kiji p-5 mb-6">
                  <h2 className="text-base text-sumi mb-2" style={{ fontFamily: "var(--font-serif)" }}>施工のポイント</h2>
                  <div className="flex items-start gap-2 text-sm text-sumi/70">
                    <span className="w-4 h-4 bg-igusa text-white flex items-center justify-center text-xs shrink-0 mt-1">!</span>
                    <p className="leading-relaxed">{wc.point}</p>
                  </div>
                </section>
              )}

              {/* 関連カテゴリ・エリアリンク */}
              <section className="mb-6">
                <h2 className="text-base text-sumi mb-3" style={{ fontFamily: "var(--font-serif)" }}>関連リンク</h2>
                <div className="flex flex-wrap gap-2">
                  <Link href={`/search?category=${wc.categorySlug}`} className="text-xs border border-border text-sumi/70 hover:border-ai hover:text-ai px-3 py-1.5 transition-colors">
                    {wc.categoryName}の業者を探す
                  </Link>
                  {(wc.relatedCategorySlugs ?? []).map((slug) => {
                    const c = getCategoryConfigBySlug(slug);
                    if (!c) return null;
                    return (
                      <Link key={slug} href={`/search?category=${slug}`} className="text-xs border border-border text-sumi/70 hover:border-ai hover:text-ai px-3 py-1.5 transition-colors">
                        {c.name}
                      </Link>
                    );
                  })}
                </div>
              </section>

              {/* 関連事例 */}
              {related.length > 0 && (
                <section>
                  <h2 className="text-base text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>同じカテゴリの施工事例</h2>
                  <div className="grid grid-cols-3 gap-3">
                    {related.map((r) => (
                      <Link key={r.id} href={`/cases/${r.id}`} className="group">
                        <div className="aspect-[4/3] bg-kiji/50 tatami-pattern mb-2 group-hover:opacity-80 transition-opacity" />
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
                  <h3 className="text-sm text-sumi mb-3" style={{ fontFamily: "var(--font-serif)" }}>担当業者</h3>
                  <p className="text-sm font-medium text-sumi mb-0.5">{provider.tradeName || provider.companyName}</p>
                  <p className="text-xs text-sumi/50 mb-1">{provider.city}</p>
                  <div className="flex items-center gap-1 mb-3">
                    <span className="text-kincya text-sm">{"★".repeat(Math.floor(provider.averageRating))}</span>
                    <span className="text-xs text-sumi/50">{provider.averageRating.toFixed(1)} ({provider.reviewCount}件)</span>
                  </div>
                  <Link href={`/providers/${provider.id}`} className="block text-center text-xs bg-ai text-white py-2 hover:opacity-80 transition-opacity">
                    業者詳細を見る
                  </Link>
                </div>
              )}

              <div className="bg-kiji/50 border border-kiji p-5">
                <h3 className="text-sm text-sumi mb-2" style={{ fontFamily: "var(--font-serif)" }}>同様の工事を見積もる</h3>
                <p className="text-xs text-sumi/60 mb-3">無料で複数業者に見積もり依頼ができます。</p>
                <Link href="/search" className="block text-center text-xs bg-kincya text-white py-2 hover:bg-do transition-colors">
                  業者を探して見積もり
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
