"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import ProviderListCard from "@/components/marketplace/ProviderListCard";
import CityLinkGrid from "@/components/common/CityLinkGrid";
import StickyBottomCTA from "@/components/common/StickyBottomCTA";
import { MOCK_PROVIDERS } from "@/data/providers";
import { SAITAMA_CITIES } from "@/data/cities";
import type { Provider } from "@/lib/types";

// ─── フィルター定義 ────────────────────────────────────────────────────────────

const FILTER_SERVICES = [
  { value: "", label: "すべて" },
  { value: "tatami-omotegae", label: "畳表替え" },
  { value: "tatami-shinchou", label: "畳新調" },
  { value: "fusuma", label: "ふすま" },
  { value: "shoji", label: "障子" },
  { value: "washitsu", label: "和室リフォーム" },
];

const SORT_OPTIONS = [
  { value: "rank", label: "おすすめ順" },
  { value: "rating", label: "評価順" },
  { value: "review", label: "口コミ数順" },
  { value: "price", label: "料金（安い順）" },
];

// ─── コンポーネント ────────────────────────────────────────────────────────────

export default function MapPage() {
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedService, setSelectedService] = useState<string>("");
  const [onlySameDay, setOnlySameDay] = useState(false);
  const [onlyCorporate, setOnlyCorporate] = useState(false);
  const [sortBy, setSortBy] = useState<string>("rank");

  const cityName = useMemo(() => {
    const found = SAITAMA_CITIES.find((c) => c.slug === selectedCity);
    return found?.name ?? "";
  }, [selectedCity]);

  const filtered = useMemo(() => {
    let providers: Provider[] = [...MOCK_PROVIDERS];

    if (selectedCity) {
      providers = providers.filter((p) =>
        p.serviceAreas.some((area) => area.includes(cityName))
      );
    }

    if (onlySameDay) {
      providers = providers.filter((p) => p.canSameDayResponse);
    }

    if (onlyCorporate) {
      providers = providers.filter((p) => p.acceptsCorporate);
    }

    // sort
    providers.sort((a, b) => {
      if (sortBy === "rating") return b.averageRating - a.averageRating;
      if (sortBy === "review") return b.reviewCount - a.reviewCount;
      if (sortBy === "price")
        return (a.startingPrice ?? 99999) - (b.startingPrice ?? 99999);
      return (a.rank ?? 99) - (b.rank ?? 99);
    });

    return providers;
  }, [selectedCity, selectedService, onlySameDay, onlyCorporate, sortBy, cityName]);

  return (
    <>
      {/* ヘッダー */}
      <div className="bg-sumi py-10 px-4">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            variant="dark"
            items={[
              { label: "ホーム", href: "/" },
              { label: "エリアから探す" },
            ]}
          />
          <h1
            className="text-2xl md:text-3xl text-white mt-4 mb-2"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            エリア・地図から業者を探す
          </h1>
          <p className="text-white/60 text-sm">
            市区町村・対応サービスで絞り込めます
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* 左：地図プレースホルダー + 絞り込み */}
          <div className="lg:col-span-2 space-y-5">
            {/* 地図プレースホルダー */}
            <div className="bg-kiji border border-kiji aspect-[4/3] flex flex-col items-center justify-center text-center p-6">
              <svg
                className="w-12 h-12 text-sumi/20 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                />
              </svg>
              <p className="text-sm text-sumi/40 font-medium mb-1">地図表示予定</p>
              <p className="text-xs text-sumi/30 leading-relaxed">
                本番公開時に Google Maps API を接続します
              </p>
            </div>

            {/* 絞り込みパネル */}
            <div className="border border-border bg-white p-5 space-y-4">
              <h2
                className="text-base text-sumi pb-2 border-b border-kiji"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                絞り込み
              </h2>

              {/* 市区町村 */}
              <div>
                <label className="block text-xs text-sumi/60 mb-1.5">市区町村</label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-ai transition-colors bg-white"
                >
                  <option value="">埼玉県全域</option>
                  {SAITAMA_CITIES.map((city) => (
                    <option key={city.slug} value={city.slug}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* 対応サービス */}
              <div>
                <label className="block text-xs text-sumi/60 mb-1.5">対応サービス</label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-ai transition-colors bg-white"
                >
                  {FILTER_SERVICES.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* チェックボックス */}
              <div className="space-y-2">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={onlySameDay}
                    onChange={(e) => setOnlySameDay(e.target.checked)}
                    className="w-4 h-4 accent-ai"
                  />
                  <span className="text-sm text-sumi">即日対応のみ</span>
                </label>
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={onlyCorporate}
                    onChange={(e) => setOnlyCorporate(e.target.checked)}
                    className="w-4 h-4 accent-ai"
                  />
                  <span className="text-sm text-sumi">法人対応のみ</span>
                </label>
              </div>

              {/* ソート */}
              <div>
                <label className="block text-xs text-sumi/60 mb-1.5">並び順</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-ai transition-colors bg-white"
                >
                  {SORT_OPTIONS.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* リセット */}
              <button
                type="button"
                onClick={() => {
                  setSelectedCity("");
                  setSelectedService("");
                  setOnlySameDay(false);
                  setOnlyCorporate(false);
                  setSortBy("rank");
                }}
                className="w-full text-xs text-sumi/40 py-2 border border-border hover:border-ai hover:text-ai transition-colors"
              >
                絞り込みをリセット
              </button>
            </div>

            {/* 一括依頼誘導 */}
            <div className="bg-ai/5 border border-ai/20 p-5">
              <p className="text-xs text-ai font-medium mb-3">
                複数の業者にまとめて依頼
              </p>
              <p className="text-xs text-sumi/60 mb-3">
                条件を入力して複数業者に一括見積もりを依頼できます。
              </p>
              <Link
                href="/bulk-quote"
                className="block w-full text-center bg-kincya text-white py-3 text-sm font-bold hover:bg-do transition-colors"
              >
                一括見積もりを依頼
              </Link>
            </div>
          </div>

          {/* 右：業者リスト */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-sumi/60">
                {selectedCity ? (
                  <><span className="font-medium text-sumi">{cityName}</span> の業者{" "}</>
                ) : (
                  "埼玉県全域の業者 "
                )}
                <span className="text-sumi font-medium">{filtered.length}</span>件
              </p>
            </div>

            {filtered.length === 0 ? (
              <div className="border border-border bg-white p-10 text-center">
                <p className="text-sm text-sumi/50 mb-4">
                  条件に合う業者が見つかりませんでした
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCity("");
                    setSelectedService("");
                    setOnlySameDay(false);
                    setOnlyCorporate(false);
                  }}
                  className="text-sm text-ai hover:underline"
                >
                  絞り込みをリセット
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {filtered.map((provider, i) => (
                  <ProviderListCard
                    key={provider.id}
                    provider={provider}
                    rank={i + 1}
                  />
                ))}
              </div>
            )}

            {/* もっと見る */}
            {filtered.length > 0 && (
              <div className="mt-6 text-center">
                <Link
                  href="/search"
                  className="inline-block border border-ai text-ai px-8 py-3 text-sm hover:bg-ai hover:text-white transition-colors"
                >
                  もっと見る（一覧ページへ）
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 市区町村グリッド */}
      <CityLinkGrid title="市区町村から探す" />

      <StickyBottomCTA
        primaryLabel="一括見積もりを依頼"
        primaryHref="/bulk-quote"
        secondaryLabel="業者を探す"
        secondaryHref="/search"
      />
    </>
  );
}
