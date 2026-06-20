import Link from "next/link";
import type { WorkCase } from "@/lib/types";
import SampleBadge from "@/components/common/SampleBadge";

interface Props {
  workCase: WorkCase;
  variant?: "default" | "compact";
}

export default function WorkCaseCard({ workCase, variant = "default" }: Props) {
  if (variant === "compact") {
    return (
      <Link href={`/works/${workCase.id}`} className="group flex gap-3 border-b border-kiji py-3 last:border-0">
        <div className="w-16 h-16 bg-kiji shrink-0 overflow-hidden">
          <div className="w-full h-full tatami-pattern flex items-center justify-center">
            <span className="text-xs text-sumi/20">施工後</span>
          </div>
        </div>
        <div>
          <p className="text-xs text-sumi/40 mb-0.5">{workCase.categoryName}・{workCase.cityName}</p>
          <h3 className="text-xs text-sumi group-hover:text-ai transition-colors line-clamp-2">{workCase.title}</h3>
          {workCase.estimatedCostLabel && (
            <p className="text-xs text-kincya mt-1">{workCase.estimatedCostLabel}</p>
          )}
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/works/${workCase.id}`} className="group block bg-white border border-border hover:border-kincya/40 transition-all duration-300 hover:shadow-sm">
      {/* 施工前後写真 */}
      <div className="grid grid-cols-2 h-40">
        <div className="relative bg-kiji overflow-hidden border-r border-border">
          <div className="absolute inset-0 tatami-pattern" />
          <div className="absolute bottom-1 left-2 text-xs text-sumi/30">施工前</div>
          {workCase.isSample && (
            <div className="absolute top-2 left-2 z-10">
              <SampleBadge label={workCase.sampleLabel || "掲載イメージ"} />
            </div>
          )}
        </div>
        <div className="relative bg-kiji/60 overflow-hidden">
          <div className="absolute inset-0 tatami-pattern opacity-50" />
          <div className="absolute bottom-1 right-2 text-xs text-sumi/30">施工後</div>
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-transparent flex items-center justify-center">
            <span className="text-xs text-sumi/20">完成写真</span>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs bg-kiji text-sumi/70 px-2 py-0.5">{workCase.categoryName}</span>
          {workCase.cityName && (
            <span className="text-xs text-sumi/40">{workCase.cityName}</span>
          )}
        </div>
        <h3 className="text-sm text-sumi mb-2 group-hover:text-ai transition-colors line-clamp-2" style={{ fontFamily: "var(--font-serif)" }}>
          {workCase.title}
        </h3>
        <p className="text-xs text-sumi/60 line-clamp-2 mb-3">{workCase.description}</p>
        <div className="flex items-center justify-between text-xs text-sumi/50">
          <span>{workCase.providerName}</span>
          {workCase.estimatedCostLabel && (
            <span className="text-kincya font-medium">{workCase.estimatedCostLabel}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
