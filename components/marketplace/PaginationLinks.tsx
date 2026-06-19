import Link from "next/link";

interface Props {
  page: number;
  total: number;
  limit: number;
  basePath: string;
  searchParams: Record<string, string | string[] | undefined>;
}

// URLベースのページネーション（Server Component）
export default function PaginationLinks({ page, total, limit, basePath, searchParams }: Props) {
  const totalPages = Math.ceil(total / limit);
  if (totalPages <= 1) return null;

  const buildHref = (p: number) => {
    const params = new URLSearchParams();
    Object.entries(searchParams).forEach(([k, v]) => {
      if (k === "page") return;
      if (typeof v === "string") params.set(k, v);
    });
    if (p > 1) params.set("page", String(p));
    const qs = params.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 2
  );

  return (
    <nav className="flex items-center justify-center gap-1.5 mt-8" aria-label="ページネーション">
      {page > 1 && (
        <Link href={buildHref(page - 1)} className="px-3 py-2 text-xs border border-border text-sumi/70 hover:border-ai hover:text-ai transition-colors">
          前へ
        </Link>
      )}
      {pages.map((p, i) => {
        const prev = pages[i - 1];
        const gap = prev && p - prev > 1;
        return (
          <span key={p} className="flex items-center gap-1.5">
            {gap && <span className="text-sumi/30 text-xs">…</span>}
            <Link
              href={buildHref(p)}
              className={`px-3.5 py-2 text-xs border transition-colors ${
                p === page ? "bg-ai text-white border-ai" : "border-border text-sumi/70 hover:border-ai hover:text-ai"
              }`}
            >
              {p}
            </Link>
          </span>
        );
      })}
      {page < totalPages && (
        <Link href={buildHref(page + 1)} className="px-3 py-2 text-xs border border-border text-sumi/70 hover:border-ai hover:text-ai transition-colors">
          次へ
        </Link>
      )}
    </nav>
  );
}
