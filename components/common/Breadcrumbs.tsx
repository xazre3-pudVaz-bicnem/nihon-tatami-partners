import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface Props {
  items: BreadcrumbItem[];
  variant?: "default" | "dark";
}

export default function Breadcrumbs({ items, variant = "default" }: Props) {
  const textClass = variant === "dark" ? "text-white/40" : "text-sumi/50";
  const linkClass = variant === "dark" ? "hover:text-white/70 transition-colors" : "hover:text-ai transition-colors";
  const sepClass = variant === "dark" ? "text-white/20" : "text-sumi/30";
  const lastClass = variant === "dark" ? "text-white/60" : "text-sumi/70";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `https://nihontatami.jp${item.href}` } : {}),
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="パンくずリスト">
        <ol className={`flex flex-wrap items-center gap-1.5 text-xs ${textClass}`}>
          {items.map((item, i) => (
            <li key={i} className="flex items-center gap-1.5">
              {i > 0 && <span className={sepClass}>/</span>}
              {item.href && i < items.length - 1 ? (
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              ) : (
                <span className={i === items.length - 1 ? lastClass : ""}>{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
