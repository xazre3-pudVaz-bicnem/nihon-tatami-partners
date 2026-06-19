import Link from "next/link";
import type { TargetCard as TargetCardType } from "@/lib/types";

interface TargetCardProps {
  target: TargetCardType;
}

export default function TargetCard({ target }: TargetCardProps) {
  return (
    <Link
      href={target.href}
      className="group block border border-border hover:border-ai/40 bg-white transition-all duration-300 hover:shadow-md p-6"
    >
      {/* アクセント */}
      <div className="w-8 h-0.5 bg-kincya mb-5 group-hover:w-12 transition-all duration-300" />

      <h3
        className="text-lg text-sumi mb-1 group-hover:text-ai transition-colors"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        {target.title}
      </h3>
      <p className="text-xs text-kincya mb-4">{target.subtitle}</p>
      <p className="text-sm text-sumi/70 leading-relaxed mb-5">
        {target.description}
      </p>

      <ul className="space-y-2 mb-5">
        {target.points.map((point, i) => (
          <li key={i} className="text-xs text-sumi/60 flex items-start gap-2">
            <span className="text-kincya shrink-0 mt-0.5">▸</span>
            {point}
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-2 text-xs text-ai">
        <span>詳しく見る</span>
        <svg className="group-hover:translate-x-1 transition-transform" width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>
    </Link>
  );
}
