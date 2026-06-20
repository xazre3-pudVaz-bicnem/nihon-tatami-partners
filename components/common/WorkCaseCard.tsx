import Link from "next/link";
import Image from "next/image";
import type { WorkCase } from "@/lib/types";
import SampleBadge from "@/components/common/SampleBadge";
import { TATAMI_IMAGES, SHOJI_IMAGES, FUSUMA_IMAGES, RENTAL_IMAGES, RESTORATION_IMAGES } from "@/data/platformImages";

const AFTER_POOL = [...TATAMI_IMAGES.slice(0, 10), ...SHOJI_IMAGES.slice(0, 3), ...FUSUMA_IMAGES.slice(0, 3)];
const BEFORE_POOL = [...RENTAL_IMAGES, ...RESTORATION_IMAGES, ...TATAMI_IMAGES.slice(40)];
function pickImg(pool: typeof AFTER_POOL, id: string) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) & 0xffff;
  return pool[h % pool.length];
}

interface Props {
  workCase: WorkCase;
  variant?: "default" | "compact";
}

export default function WorkCaseCard({ workCase, variant = "default" }: Props) {
  const afterImg = pickImg(AFTER_POOL, workCase.id);
  const beforeImg = pickImg(BEFORE_POOL, workCase.id + "_before");

  if (variant === "compact") {
    return (
      <Link href={`/works/${workCase.id}`} className="group flex gap-3 border-b border-kiji py-3 last:border-0">
        <div className="relative w-16 h-16 bg-kiji shrink-0 overflow-hidden">
          <Image src={afterImg.src} alt={afterImg.alt} fill className="object-cover" sizes="64px" />
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
          <Image src={beforeImg.src} alt="施工前の状態" fill className="object-cover" sizes="200px" />
          <div className="absolute inset-0 bg-sumi/20" />
          <div className="absolute bottom-1 left-2 text-xs text-white/70 bg-sumi/40 px-1">施工前</div>
          {workCase.isSample && (
            <div className="absolute top-2 left-2 z-10">
              <SampleBadge label={workCase.sampleLabel || "掲載イメージ"} />
            </div>
          )}
        </div>
        <div className="relative bg-kiji/60 overflow-hidden">
          <Image src={afterImg.src} alt="施工後の仕上がり" fill className="object-cover" sizes="200px" />
          <div className="absolute inset-0 bg-sumi/5" />
          <div className="absolute bottom-1 right-2 text-xs text-white/80 bg-sumi/40 px-1">施工後</div>
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
