import Link from "next/link";
import Image from "next/image";
import type { WorksItem } from "@/lib/types";

interface WorksCardProps {
  item: WorksItem;
  href?: string;
}

export default function WorksCard({ item, href }: WorksCardProps) {
  const content = (
    <div className="group border border-border hover:border-kincya/30 transition-all duration-300 hover:shadow-md overflow-hidden cursor-pointer">
      <div className="relative h-52 bg-kiji overflow-hidden">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 tatami-pattern" />
        )}
        <span className="absolute top-3 left-3 text-xs bg-sumi/80 text-white px-2 py-1 tracking-wide">
          {item.category}
        </span>
      </div>
      <div className="p-5 bg-white">
        <h3
          className="text-base text-sumi mb-2 group-hover:text-ai transition-colors"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {item.title}
        </h3>
        <p className="text-xs text-sumi/60 leading-relaxed line-clamp-3">
          {item.description}
        </p>
        {item.details && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {item.details.map((d, i) => (
              <span key={i} className="text-xs bg-kiji text-sumi/70 px-2 py-0.5">
                {d}
              </span>
            ))}
          </div>
        )}
        {item.date && (
          <p className="text-xs text-sumi/40 mt-3">{item.date.replace("-", "年").replace("-", "月")}</p>
        )}
      </div>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }
  return content;
}
