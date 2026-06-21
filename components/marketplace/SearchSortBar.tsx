"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import FilterDrawer from "@/components/marketplace/FilterDrawer";

const SORT_OPTIONS: { value: string; label: string }[] = [
  { value: "recommended", label: "おすすめ順" },
  { value: "rating", label: "評価が高い順" },
  { value: "review_count", label: "口コミが多い順" },
  { value: "price_asc", label: "料金が安い順" },
  { value: "response_time", label: "返信が早い順" },
  { value: "completed_count", label: "施工実績が多い順" },
  { value: "newest", label: "新着順" },
];

const QUICK_FILTERS: { key: string; label: string }[] = [
  { key: "hasEstimateFree", label: "見積無料" },
  { key: "sameDayResponse", label: "当日対応" },
  { key: "weekendResponse", label: "土日対応" },
  { key: "hasPhotoEstimate", label: "写真見積対応" },
  { key: "hasFurnitureMove", label: "家具移動あり" },
  { key: "acceptsCard", label: "カード払い可" },
  { key: "nightConsultation", label: "夜間相談可" },
];

interface SearchSortBarProps {
  total: number;
}

export default function SearchSortBar({ total }: SearchSortBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sortBy") || "recommended";

  const onSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sortBy", value);
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  };

  const toggleQuickFilter = (key: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (params.get(key) === "true") {
      params.delete(key);
    } else {
      params.set(key, "true");
    }
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  };

  const isActive = (key: string) => searchParams.get(key) === "true";

  return (
    <div className="space-y-3">
      {/* メインバー */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <p className="text-sm text-sumi/60 shrink-0">
          <span className="font-bold text-sumi">{total}</span>件の業者が見つかりました
        </p>

        <div className="flex items-center gap-2 ml-auto">
          {/* ソートセレクター */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-sumi/50 hidden sm:inline">並び替え</span>
            <select
              value={currentSort}
              onChange={(e) => onSortChange(e.target.value)}
              className="text-xs border border-border bg-white px-3 py-2 text-sumi focus:outline-none focus:border-ai"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>

          {/* スマホ用フィルタードロワートリガー */}
          <div className="lg:hidden">
            <FilterDrawer />
          </div>
        </div>
      </div>

      {/* クイックフィルターチップ（スマホのみ横スクロール） */}
      <div className="lg:hidden overflow-x-auto pb-1 -mx-0.5">
        <div className="flex gap-2 w-max px-0.5">
          {QUICK_FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => toggleQuickFilter(f.key)}
              className={`text-xs px-3 py-1.5 rounded-full border whitespace-nowrap transition-colors shrink-0 ${
                isActive(f.key)
                  ? "bg-sumi text-white border-sumi"
                  : "bg-white text-sumi/70 border-border hover:border-sumi/40"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
