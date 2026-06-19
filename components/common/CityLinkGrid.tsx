import Link from "next/link";
import { SAITAMA_CITIES } from "@/data/cities";

interface Props {
  categorySlug?: string;
  currentCitySlug?: string;
  title?: string;
}

export default function CityLinkGrid({ categorySlug, currentCitySlug, title = "市区町村から探す" }: Props) {
  return (
    <section className="bg-kiji/30 border-t border-border py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-lg text-sumi mb-5" style={{ fontFamily: "var(--font-serif)" }}>{title}</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
          {SAITAMA_CITIES.map((city) => {
            const href = categorySlug
              ? `/saitama/${city.slug}/${categorySlug}`
              : `/saitama/${city.slug}`;
            const isCurrent = city.slug === currentCitySlug;
            return (
              <Link
                key={city.slug}
                href={href}
                className={`text-center py-2 px-1 text-xs border transition-colors duration-200 ${
                  isCurrent
                    ? "border-ai bg-ai text-white"
                    : "border-border bg-white text-sumi/70 hover:border-ai hover:text-ai"
                }`}
              >
                {city.name}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
