"use client";

interface Props {
  page: number;
  total: number;
  limit: number;
  onChange: (page: number) => void;
}

export default function Pagination({ page, total, limit, onChange }: Props) {
  const totalPages = Math.ceil(total / limit);
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const visiblePages = pages.filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 2);

  return (
    <div className="flex items-center justify-center gap-1.5">
      <button
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        className="px-3 py-2 border border-border text-sm text-sumi hover:border-ai hover:text-ai disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        前へ
      </button>

      {visiblePages.map((p, i) => {
        const prev = visiblePages[i - 1];
        const showEllipsis = prev && p - prev > 1;
        return (
          <span key={p} className="flex items-center gap-1.5">
            {showEllipsis && <span className="text-sumi/40 text-sm px-1">…</span>}
            <button
              onClick={() => onChange(p)}
              className={`w-9 h-9 text-sm border transition-colors ${
                p === page
                  ? "border-ai bg-ai text-white"
                  : "border-border text-sumi hover:border-ai hover:text-ai"
              }`}
            >
              {p}
            </button>
          </span>
        );
      })}

      <button
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        className="px-3 py-2 border border-border text-sm text-sumi hover:border-ai hover:text-ai disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        次へ
      </button>
    </div>
  );
}
