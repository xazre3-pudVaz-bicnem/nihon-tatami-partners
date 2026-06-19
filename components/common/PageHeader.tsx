import Breadcrumb, { BreadcrumbJsonLd, type BreadcrumbItem } from "./Breadcrumb";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  badge?: string;
  className?: string;
}

export default function PageHeader({
  title,
  subtitle,
  description,
  breadcrumbs,
  badge,
  className = "",
}: PageHeaderProps) {
  return (
    <div
      className={`relative pt-32 pb-16 bg-ai text-white overflow-hidden ${className}`}
    >
      {/* 背景パターン */}
      <div className="absolute inset-0 shoji-pattern opacity-10" />

      {/* 縦書き装飾 */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 writing-vertical text-white/5 text-7xl font-serif tracking-widest select-none hidden lg:block"
        style={{ fontFamily: "var(--font-serif)" }}>
        畳
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {breadcrumbs && (
          <Breadcrumb
            items={breadcrumbs}
            className="text-white/50 mb-6"
          />
        )}
        {badge && (
          <span className="inline-block text-xs tracking-widest text-kincya border border-kincya/40 px-3 py-1 mb-4">
            {badge}
          </span>
        )}
        <h1
          className="text-3xl md:text-4xl lg:text-5xl font-serif text-white leading-tight mb-4"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg text-white/70 mb-3" style={{ fontFamily: "var(--font-serif)" }}>
            {subtitle}
          </p>
        )}
        {description && (
          <p className="text-sm text-white/60 max-w-2xl leading-relaxed">
            {description}
          </p>
        )}
        {/* 装飾ライン */}
        <div className="flex items-center gap-3 mt-8">
          <div className="h-px w-12 bg-kincya" />
          <div className="w-1.5 h-1.5 bg-kincya" />
        </div>
      </div>

      {breadcrumbs && (
        <BreadcrumbJsonLd items={breadcrumbs} />
      )}
    </div>
  );
}
