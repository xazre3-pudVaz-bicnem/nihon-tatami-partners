import Link from "next/link";
import type { ColumnArticle } from "@/lib/types";

interface ColumnCardProps {
  article: ColumnArticle;
  variant?: "default" | "compact";
}

export default function ColumnCard({ article, variant = "default" }: ColumnCardProps) {
  if (variant === "compact") {
    return (
      <Link
        href={`/column/${article.slug}`}
        className="group flex items-start gap-3 py-3 border-b border-kiji last:border-0 hover:text-ai transition-colors"
      >
        <span className="text-xs bg-kiji text-sumi/60 px-2 py-0.5 shrink-0 mt-0.5">
          {article.category}
        </span>
        <span className="text-sm text-sumi group-hover:text-ai transition-colors line-clamp-2">
          {article.title}
        </span>
      </Link>
    );
  }

  return (
    <Link
      href={`/column/${article.slug}`}
      className="group block border border-border hover:border-kincya/30 bg-white transition-all duration-300 hover:shadow-md p-5"
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs tracking-wide bg-ai/10 text-ai px-2 py-0.5">
          {article.category}
        </span>
        {article.readTime && (
          <span className="text-xs text-sumi/40">読了約{article.readTime}分</span>
        )}
      </div>
      <h3
        className="text-base text-sumi mb-2 group-hover:text-ai transition-colors leading-snug"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        {article.title}
      </h3>
      <p className="text-xs text-sumi/60 leading-relaxed line-clamp-3">
        {article.description}
      </p>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-sumi/40">{article.publishedAt}</span>
        <div className="flex items-center gap-1 text-xs text-ai">
          <span>記事を読む</span>
          <svg className="group-hover:translate-x-1 transition-transform" width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
