"use client";

import type { SearchParams } from "@/lib/types";

interface Props {
  sortBy: SearchParams["sortBy"];
  total: number;
  onChange: (sortBy: SearchParams["sortBy"]) => void;
}

const SORT_OPTIONS: { value: SearchParams["sortBy"]; label: string }[] = [
  { value: "recommended", label: "おすすめ順" },
  { value: "rating", label: "評価が高い順" },
  { value: "review_count", label: "口コミが多い順" },
  { value: "newest", label: "新着順" },
];

export default function SortSelector({ sortBy, total, onChange }: Props) {
  return (
    <div className="flex items-center justify-between gap-4">
      <p className="text-sm text-sumi/60">
        <span className="text-sumi font-medium">{total}</span> 件の業者が見つかりました
      </p>
      <div className="flex items-center gap-2">
        <span className="text-xs text-sumi/50 hidden sm:inline">並び替え：</span>
        <select
          value={sortBy || "recommended"}
          onChange={(e) => onChange(e.target.value as SearchParams["sortBy"])}
          className="border border-border bg-white text-sumi text-sm px-3 py-1.5 focus:outline-none focus:border-ai"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
