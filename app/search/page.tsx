"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProviderCard from "@/components/common/ProviderCard";
import FilterSidebar from "@/components/common/FilterSidebar";
import SortSelector from "@/components/common/SortSelector";
import Pagination from "@/components/common/Pagination";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import SearchBox from "@/components/common/SearchBox";
import CityLinkGrid from "@/components/common/CityLinkGrid";
import { searchProviders } from "@/lib/utils";
import type { SearchParams } from "@/lib/types";

function SearchPageContent() {
  const searchParams = useSearchParams();

  const [params, setParams] = useState<SearchParams>({
    category: searchParams.get("category") || undefined,
    city: searchParams.get("city") || undefined,
    sortBy: (searchParams.get("sortBy") as SearchParams["sortBy"]) || "recommended",
    page: 1,
    limit: 12,
    sameDayResponse: searchParams.get("sameDayResponse") === "true",
    weekendResponse: searchParams.get("weekendResponse") === "true",
    acceptsCorporate: searchParams.get("acceptsCorporate") === "true",
    acceptsRealEstate: searchParams.get("acceptsRealEstate") === "true",
    acceptsRyokan: searchParams.get("acceptsRyokan") === "true",
    acceptsTempleShrine: searchParams.get("acceptsTempleShrine") === "true",
    hasInsurance: searchParams.get("hasInsurance") === "true",
  });

  const { providers, total } = searchProviders(params);

  const handleParamsChange = (next: SearchParams) => {
    setParams(next);
  };

  const categoryLabel = params.category || "すべてのサービス";
  const cityLabel = params.city || "埼玉県内";

  return (
    <div className="min-h-screen bg-shiro">
      <div className="bg-sumi border-b border-white/10 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SearchBox variant="inline" defaultCategory={params.category} defaultCity={params.city} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs items={[
          { label: "トップ", href: "/" },
          { label: "業者を探す", href: "/search" },
          ...(params.city ? [{ label: params.city }] : []),
        ]} />

        <div className="mt-4 mb-6">
          <h1 className="text-xl md:text-2xl text-sumi" style={{ fontFamily: "var(--font-serif)" }}>
            {cityLabel}の{categoryLabel}業者を探す
          </h1>
        </div>

        <div className="flex gap-6">
          <div className="w-56 shrink-0 hidden lg:block">
            <FilterSidebar params={params} onChange={handleParamsChange} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="lg:hidden mb-4">
              <FilterSidebar params={params} onChange={handleParamsChange} />
            </div>

            <div className="mb-5">
              <SortSelector
                sortBy={params.sortBy}
                total={total}
                onChange={(sortBy) => setParams((p) => ({ ...p, sortBy, page: 1 }))}
              />
            </div>

            {providers.length === 0 ? (
              <div className="text-center py-20 bg-white border border-border">
                <p className="text-sumi/50 mb-4">条件に合う業者が見つかりませんでした</p>
                <button
                  onClick={() => setParams({ sortBy: "recommended", page: 1, limit: 12 })}
                  className="text-sm text-ai border border-ai px-4 py-2 hover:bg-ai hover:text-white transition-all duration-300"
                >
                  条件をリセット
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mb-8">
                  {providers.map((p) => (
                    <ProviderCard key={p.id} provider={p} showFavorite />
                  ))}
                </div>
                <Pagination
                  page={params.page ?? 1}
                  total={total}
                  limit={params.limit ?? 12}
                  onChange={(page) => setParams((p) => ({ ...p, page }))}
                />
              </>
            )}
          </div>
        </div>
      </div>

      <CityLinkGrid title="市区町村から探す" />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-shiro flex items-center justify-center">
        <p className="text-sm text-sumi/50">読み込み中...</p>
      </div>
    }>
      <SearchPageContent />
    </Suspense>
  );
}
