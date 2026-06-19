import Link from "next/link";
import Image from "next/image";
import type { Service } from "@/lib/types";

interface ServiceCardProps {
  service: Service;
  variant?: "default" | "compact" | "featured";
}

export default function ServiceCard({
  service,
  variant = "default",
}: ServiceCardProps) {
  if (variant === "compact") {
    return (
      <Link
        href={service.href}
        className="group flex items-start gap-4 p-4 border border-border hover:border-kincya/40 bg-white transition-all duration-300 hover:shadow-sm"
      >
        <div className="w-1 h-10 bg-kincya shrink-0 mt-0.5" />
        <div>
          <h3 className="text-sm font-medium text-sumi group-hover:text-ai transition-colors">
            {service.title}
          </h3>
          <p className="text-xs text-sumi/60 mt-1 line-clamp-2">
            {service.subtitle}
          </p>
        </div>
        <svg
          className="ml-auto shrink-0 text-sumi/30 group-hover:text-kincya transition-colors"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M6 12l4-4-4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </Link>
    );
  }

  return (
    <Link
      href={service.href}
      className="group block border border-border hover:border-kincya/30 transition-all duration-300 hover:shadow-md overflow-hidden"
    >
      {/* 画像エリア */}
      <div className="relative h-48 bg-kiji overflow-hidden">
        {service.image ? (
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 tatami-pattern" />
        )}
        {/* カテゴリバッジ */}
        <span className="absolute top-3 left-3 text-xs tracking-wider bg-white/90 text-sumi px-2 py-1">
          {service.category === "tatami"
            ? "畳工事"
            : service.category === "interior"
            ? "内装工事"
            : "原状回復"}
        </span>
      </div>

      {/* コンテンツ */}
      <div className="p-5 bg-white">
        <h3
          className="text-lg text-sumi mb-2 group-hover:text-ai transition-colors"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {service.title}
        </h3>
        <p className="text-xs text-kincya mb-3">{service.subtitle}</p>
        <p className="text-sm text-sumi/70 leading-relaxed line-clamp-3">
          {service.description}
        </p>
        {service.features && service.features.length > 0 && (
          <ul className="mt-4 space-y-1">
            {service.features.slice(0, 3).map((f, i) => (
              <li key={i} className="text-xs text-sumi/60 flex items-center gap-2">
                <span className="w-1 h-1 bg-kincya rounded-full shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-5 flex items-center gap-2 text-xs text-ai group-hover:gap-3 transition-all">
          <span>詳しく見る</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
