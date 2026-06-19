import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { MOCK_WORK_CASES } from "@/data/workcases";
import { SERVICE_CATEGORIES } from "@/data/categories";
import { createMetadata } from "@/lib/metadata";
import { formatDate } from "@/lib/utils";

interface Props {
  searchParams: Promise<{ category?: string }>;
}

export const metadata: Metadata = createMetadata({
  title: "施工事例一覧｜畳・和室・原状回復のビフォーアフター",
  description:
    "埼玉県の畳表替え・新調・和室リフォーム・原状回復の施工事例を写真付きで紹介。費用目安・施工内容・担当業者がわかる。あなたの工事の参考に。",
  path: "/cases",
});

export default async function CasesPage({ searchParams }: Props) {
  const { category } = await searchParams;
  const all = MOCK_WORK_CASES;
  const cases = category ? all.filter((c) => c.categorySlug === category) : all;

  const usedCategorySlugs = Array.from(new Set(all.map((c) => c.categorySlug)));
  const tabs = SERVICE_CATEGORIES.filter((c) => usedCategorySlugs.includes(c.slug));

  return (
    <div className="min-h-screen bg-shiro">
      <div className="bg-sumi">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumbs variant="dark" items={[{ label: "トップ", href: "/" }, { label: "施工事例" }]} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 pt-4">
          <h1 className="text-2xl md:text-3xl text-white mb-3" style={{ fontFamily: "var(--font-serif)" }}>
            施工事例｜畳・和室のビフォーアフター
          </h1>
          <p className="text-sm text-white/60 max-w-2xl">
            実際の施工事例を写真付きで紹介します。費用目安や施工内容を参考に、ご自身の工事のイメージを膨らませてください。
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* カテゴリタブ */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Link
            href="/cases"
            className={`text-sm px-4 py-2 border transition-colors ${
              !category ? "bg-ai text-white border-ai" : "border-border text-sumi/70 hover:border-ai hover:text-ai"
            }`}
          >
            すべて
          </Link>
          {tabs.map((t) => (
            <Link
              key={t.slug}
              href={`/cases?category=${t.slug}`}
              className={`text-sm px-4 py-2 border transition-colors ${
                category === t.slug ? "bg-ai text-white border-ai" : "border-border text-sumi/70 hover:border-ai hover:text-ai"
              }`}
            >
              {t.name}
            </Link>
          ))}
        </div>

        {/* 事例一覧 */}
        {cases.length === 0 ? (
          <p className="text-sm text-sumi/50 py-12 text-center">該当する施工事例がありません。</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {cases.map((c) => (
              <Link
                key={c.id}
                href={`/cases/${c.id}`}
                className="group bg-white border border-border overflow-hidden hover:shadow-sm hover:border-kincya/40 transition-all"
              >
                <div className="grid grid-cols-2">
                  <div className="aspect-[4/3] bg-sumi/5 flex items-center justify-center">
                    <span className="text-[10px] text-sumi/30">Before</span>
                  </div>
                  <div className="aspect-[4/3] bg-kiji/50 tatami-pattern flex items-center justify-center">
                    <span className="text-[10px] text-sumi/30">After</span>
                  </div>
                </div>
                <div className="p-4">
                  <span className="text-xs text-ai border border-ai/30 px-2 py-0.5">{c.categoryName}</span>
                  <h2 className="text-sm text-sumi mt-2 mb-1 group-hover:text-ai transition-colors line-clamp-2 leading-snug">
                    {c.title}
                  </h2>
                  <p className="text-xs text-sumi/50">
                    {c.cityName} {c.tatamiFlex ? `/ ${c.tatamiFlex}畳` : ""} {c.estimatedCostLabel ? `/ ${c.estimatedCostLabel}` : ""}
                  </p>
                  <p className="text-xs text-sumi/40 mt-1">{formatDate(c.publishedAt)}</p>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="text-center mt-12 bg-kiji/40 border border-kiji p-8">
          <h2 className="text-lg text-sumi mb-2" style={{ fontFamily: "var(--font-serif)" }}>
            同じような工事を依頼したい方へ
          </h2>
          <p className="text-sm text-sumi/60 mb-4">無料で複数業者に見積もりを依頼して比較できます。</p>
          <Link href="/search" className="inline-block bg-kincya text-white px-6 py-3 text-sm hover:bg-do transition-colors">
            業者を探して見積もり依頼
          </Link>
        </div>
      </div>
    </div>
  );
}
