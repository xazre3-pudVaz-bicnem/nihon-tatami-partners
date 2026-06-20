"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

const OPTIONS: { value: string; label: string }[] = [
  { value: "recommended", label: "おすすめ順" },
  { value: "rating", label: "評価が高い順" },
  { value: "review_count", label: "口コミが多い順" },
  { value: "price_asc", label: "料金が安い順" },
  { value: "response_time", label: "返信が早い順" },
  { value: "completed_count", label: "施工実績が多い順" },
  { value: "newest", label: "新着順" },
];

export default function SortSelector({ total }: { total: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = searchParams.get("sortBy") || "recommended";

  const onChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sortBy", value);
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-between gap-3">
      <p className="text-sm text-sumi/60">
        <span className="font-bold text-sumi">{total}</span>件の業者が見つかりました
      </p>
      <div className="flex items-center gap-2">
        <span className="text-xs text-sumi/50 hidden sm:inline">並び替え</span>
        <select
          value={current}
          onChange={(e) => onChange(e.target.value)}
          className="text-xs border border-border bg-white px-3 py-2 text-sumi focus:outline-none focus:border-ai"
        >
          {OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
