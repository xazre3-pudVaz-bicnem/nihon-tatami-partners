import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  return (
    <nav
      aria-label="パンくずリスト"
      className={`text-xs text-sumi/50 flex flex-wrap items-center gap-1.5 ${className}`}
    >
      <Link href="/" className="hover:text-ai transition-colors">
        ホーム
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <span>/</span>
          {item.href ? (
            <Link href={item.href} className="hover:text-ai transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-sumi/70">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "ホーム",
        item: process.env.NEXT_PUBLIC_SITE_URL || "https://nihontatami.jp",
      },
      ...items
        .filter((item) => item.href)
        .map((item, i) => ({
          "@type": "ListItem",
          position: i + 2,
          name: item.label,
          item: `${process.env.NEXT_PUBLIC_SITE_URL || "https://nihontatami.jp"}${item.href}`,
        })),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }}
    />
  );
}
