"use client";

type SortKey = "recommended" | "price_asc" | "review_count" | "rating";

interface Props {
  sort: SortKey;
  total: number;
  onSort: (key: SortKey) => void;
}

const OPTIONS: { key: SortKey; label: string }[] = [
  { key: "recommended", label: "おすすめ順" },
  { key: "price_asc", label: "料金が安い順" },
  { key: "review_count", label: "口コミが多い順" },
  { key: "rating", label: "評価が高い順" },
];

export default function SortBar({ sort, total, onSort }: Props) {
  return (
    <div className="flex items-center justify-between gap-4 mb-5 border-b border-kiji pb-4">
      <p className="text-xs text-sumi/50">
        <span className="text-base font-bold text-sumi mr-0.5">{total}</span>件
      </p>
      <div className="flex gap-1 flex-wrap justify-end">
        {OPTIONS.map((opt) => (
          <button
            key={opt.key}
            onClick={() => onSort(opt.key)}
            className={`text-xs px-3 py-1.5 border transition-colors ${
              sort === opt.key
                ? "border-ai bg-ai text-white"
                : "border-border text-sumi/60 hover:border-ai hover:text-ai"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
