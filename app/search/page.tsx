import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import SearchBox from "@/components/common/SearchBox";
import CityLinkGrid from "@/components/common/CityLinkGrid";
import FAQSection from "@/components/common/FAQSection";
import FilterSidebar from "@/components/marketplace/FilterSidebar";
import SortSelector from "@/components/marketplace/SortSelector";
import ProviderListCard from "@/components/marketplace/ProviderListCard";
import PaginationLinks from "@/components/marketplace/PaginationLinks";
import { filterAndSortProviders, type RawSearchParams } from "@/lib/search";
import { getCategoryConfigBySlug, POPULAR_CATEGORY_CONFIGS } from "@/config/categories";
import { createMetadata } from "@/lib/metadata";

interface Props {
  searchParams: Promise<RawSearchParams>;
}

export const metadata: Metadata = createMetadata({
  title: "畳・和室の業者を探す | 埼玉県の畳店比較",
  description:
    "埼玉県の畳表替え・新調・ふすま障子張替え・和室リフォーム業者を、料金・口コミ・対応エリアで比較。無料で見積もり依頼ができます。",
  path: "/search",
});

const get = (sp: RawSearchParams, key: string): string | undefined => {
  const v = sp[key];
  return Array.isArray(v) ? v[0] : v;
};

export default async function SearchPage({ searchParams }: Props) {
  const sp = await searchParams;
  const { providers, total, page, limit } = filterAndSortProviders(sp);

  const cityLabel = get(sp, "city");
  const categorySlug = get(sp, "category");
  const cat = categorySlug ? getCategoryConfigBySlug(categorySlug) : undefined;

  // 検索条件タグ
  const conditionTags: string[] = [];
  if (cityLabel) conditionTags.push(cityLabel);
  if (cat) conditionTags.push(cat.name);
  if (get(sp, "rating")) conditionTags.push(`評価${get(sp, "rating")}以上`);
  if (get(sp, "reviewMin")) conditionTags.push(`口コミ${get(sp, "reviewMin")}件以上`);
  if (get(sp, "hasLicense") === "true") conditionTags.push("一級技能士");
  if (get(sp, "hasInsurance") === "true") conditionTags.push("保険加入");
  if (get(sp, "acceptsCorporate") === "true") conditionTags.push("法人対応");

  const h1 = `${cityLabel ? cityLabel + "の" : "埼玉県の"}${cat ? cat.name : "畳・和室"}業者を比較`;

  // pagination用にstringのみのsearchParamsを抽出
  const plainSp: Record<string, string> = {};
  Object.entries(sp).forEach(([k, v]) => {
    if (typeof v === "string") plainSp[k] = v;
  });

  return (
    <div className="min-h-screen bg-shiro">
      {/* 検索バー */}
      <div className="bg-sumi border-b border-white/10 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<div className="h-12" />}>
            <SearchBox variant="inline" defaultCategory={categorySlug} defaultCity={cityLabel} />
          </Suspense>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs
          items={[
            { label: "トップ", href: "/" },
            { label: "業者を探す", href: "/search" },
            ...(cityLabel ? [{ label: cityLabel }] : []),
          ]}
        />

        <div className="mt-4 mb-4">
          <h1 className="text-xl md:text-2xl text-sumi" style={{ fontFamily: "var(--font-serif)" }}>
            {h1}
          </h1>
          {conditionTags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mt-3">
              <span className="text-xs text-sumi/40">条件:</span>
              {conditionTags.map((t) => (
                <span key={t} className="text-xs bg-kiji border border-border px-2.5 py-1 text-sumi/70">
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-6">
          {/* PC左サイドバー */}
          <div className="w-60 shrink-0 hidden lg:block">
            <Suspense fallback={<div className="h-96 bg-white border border-border" />}>
              <FilterSidebar />
            </Suspense>
          </div>

          <div className="flex-1 min-w-0">
            {/* スマホ用フィルター */}
            <div className="lg:hidden">
              <Suspense fallback={null}>
                <FilterSidebar />
              </Suspense>
            </div>

            <div className="mb-5">
              <Suspense fallback={<div className="h-8" />}>
                <SortSelector total={total} />
              </Suspense>
            </div>

            {providers.length === 0 ? (
              <div className="text-center py-20 bg-white border border-border">
                <p className="text-sumi/50 mb-4">条件に合う業者が見つかりませんでした</p>
                <Link
                  href="/search"
                  className="inline-block text-sm text-ai border border-ai px-4 py-2 hover:bg-ai hover:text-white transition-all"
                >
                  条件をリセット
                </Link>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  {providers.map((p) => (
                    <ProviderListCard key={p.id} provider={p} categorySlug={categorySlug} />
                  ))}
                </div>
                <PaginationLinks page={page} total={total} limit={limit} basePath="/search" searchParams={plainSp} />
              </>
            )}

            {/* SEO本文 */}
            <section className="mt-12 bg-white border border-border p-6">
              <h2 className="text-lg text-sumi mb-3" style={{ fontFamily: "var(--font-serif)" }}>
                {cityLabel ? `${cityLabel}で` : "埼玉県で"}畳・和室の業者を選ぶには
              </h2>
              <p className="text-sm text-sumi/70 leading-relaxed mb-3">
                日本畳パートナーズでは、{cityLabel ? `${cityLabel}を含む` : ""}埼玉県内の畳店・内装業者を、料金・口コミ・対応エリア・資格で比較できます。
                畳の表替えや新調、ふすま・障子の張替え、和室リフォーム、賃貸の原状回復まで幅広く対応。
                気になる業者には無料で見積もりを依頼でき、複数社を比較して納得のいく1社を選べます。
              </p>
              <p className="text-sm text-sumi/70 leading-relaxed">
                業者を選ぶ際は、料金だけでなく口コミ評価・施工実績・保有資格・保険加入の有無を確認しましょう。
                一級畳製作技能士の在籍や損害賠償保険への加入は、安心して依頼できる目安のひとつです。
              </p>
            </section>

            {/* 関連カテゴリ */}
            <section className="mt-8">
              <h2 className="text-base text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>
                人気のサービスから探す
              </h2>
              <div className="flex flex-wrap gap-2">
                {POPULAR_CATEGORY_CONFIGS.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/search?category=${c.slug}${cityLabel ? `&city=${encodeURIComponent(cityLabel)}` : ""}`}
                    className="text-sm border border-border text-sumi/70 hover:border-ai hover:text-ai transition-colors px-4 py-2"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      <FAQSection
        items={[
          {
            question: "見積もりは無料ですか？",
            answer:
              "多くの掲載業者が無料見積もりに対応しています。各業者の詳細ページや絞り込みの「無料見積もり」で確認できます。複数業者に依頼して比較することをおすすめします。",
          },
          {
            question: "畳の表替えと新調はどう違いますか？",
            answer:
              "表替えは畳表（ゴザ）だけを新しくする工事、新調は畳床ごと作り替える工事です。畳床がしっかりしていれば表替え、踏み込みが沈むほど傷んでいれば新調が目安です。",
          },
          {
            question: "対応エリア外でも依頼できますか？",
            answer:
              "業者ごとに対応エリアが設定されています。絞り込みで市区町村を指定すると、そのエリアに対応する業者だけを表示できます。",
          },
        ]}
        title="業者選びに関するよくある質問"
      />

      <CityLinkGrid title="市区町村から探す" />
    </div>
  );
}
