"use client";

import Link from "next/link";
import Image from "next/image";
import type { Provider } from "@/lib/types";
import { formatRating, getResponseTimeLabel } from "@/lib/utils";
import SampleBadge from "@/components/common/SampleBadge";
import FavoriteButton from "@/components/common/FavoriteButton";
import CompareButton from "@/components/common/CompareButton";
import { TATAMI_CRAFT_IMAGES, SHOJI_IMAGES, FUSUMA_IMAGES } from "@/data/platformImages";

const VENDOR_IMAGE_POOL = [...TATAMI_CRAFT_IMAGES, ...SHOJI_IMAGES.slice(0, 5), ...FUSUMA_IMAGES.slice(0, 5)];
function pickVendorImage(id: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) & 0xffff;
  return VENDOR_IMAGE_POOL[hash % VENDOR_IMAGE_POOL.length];
}

interface Props {
  provider: Provider;
  rank?: number;
  categorySlug?: string;
}

// 対応機能アイコン
const FEATURE_ICONS: { key: keyof Provider; icon: string; label: string }[] = [
  { key: "hasPhotoEstimate", icon: "📷", label: "写真見積" },
  { key: "hasFurnitureMove", icon: "🚚", label: "家具移動" },
  { key: "acceptsCard", icon: "💳", label: "カード可" },
  { key: "canNightConsultation", icon: "🌙", label: "夜間相談" },
  { key: "hasEstimateFree", icon: "✓", label: "見積無料" },
];

export default function ProviderListCard({ provider, rank, categorySlug }: Props) {
  const displayRank = rank ?? provider.rank;
  const vendorImg = pickVendorImage(provider.id);
  const starsFull = Math.floor(provider.averageRating);
  const starsHalf = provider.averageRating - starsFull >= 0.5;

  const rankBadge =
    displayRank === 1
      ? "bg-kincya text-white"
      : displayRank === 2
      ? "bg-sumi/40 text-white"
      : displayRank === 3
      ? "bg-kincya/60 text-white"
      : "bg-white/90 text-sumi/70";

  // バッジ: 最大3件表示 + 残りは「+N」
  const allTags: string[] = [];
  if (provider.licenses?.some((l) => l.includes("一級"))) allTags.push("一級技能士");
  if (provider.hasInsurance) allTags.push("保険加入");
  if (provider.acceptsCorporate) allTags.push("法人対応");
  if (provider.canSameDayResponse) allTags.push("即日対応");
  if (provider.acceptsRyokan) allTags.push("旅館対応");
  if (provider.acceptsTempleShrine) allTags.push("寺社対応");
  if (provider.canWeekendResponse) allTags.push("土日対応");

  const MAX_BADGES = 3;
  const visibleTags = allTags.slice(0, MAX_BADGES);
  const hiddenCount = allTags.length - MAX_BADGES;

  // 対応機能アイコン（最大4つ）
  const activeFeatures = FEATURE_ICONS.filter((f) => provider[f.key]);

  const detailHref = `/providers/${provider.id}`;
  const quoteHref = categorySlug
    ? `/quote/new?provider=${provider.id}&category=${categorySlug}`
    : `/quote/new?provider=${provider.id}`;

  return (
    <div className="bg-white border border-border hover:border-kincya/40 transition-all duration-300 hover:shadow-sm flex flex-col sm:flex-row gap-0 overflow-hidden">
      {/* 左：写真エリア */}
      <div className="relative w-full sm:w-48 h-36 sm:h-auto shrink-0 bg-kiji overflow-hidden">
        <Image
          src={vendorImg.src}
          alt={vendorImg.alt}
          fill
          className="object-cover"
          sizes="192px"
        />
        <div className="absolute inset-0 bg-sumi/10" />
        {provider.isSample && (
          <div className="absolute top-2 left-2 z-20">
            <SampleBadge label={provider.isSampleLabel || "掲載イメージ"} />
          </div>
        )}
        {displayRank && displayRank <= 10 && (
          <div className={`absolute bottom-0 left-0 text-xs font-bold px-3 py-1.5 z-10 ${rankBadge}`}>
            {displayRank}位
          </div>
        )}
      </div>

      {/* 中央：業者情報 */}
      <div className="flex-1 p-4 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className="text-xs text-sumi/40 mb-0.5">{provider.city}</p>
          <FavoriteButton providerId={provider.id} className="-mt-0.5 shrink-0" />
        </div>
        <h3 className="text-base text-sumi mb-1 leading-snug" style={{ fontFamily: "var(--font-serif)" }}>
          <Link href={detailHref} className="hover:text-ai transition-colors">
            {provider.tradeName || provider.companyName}
          </Link>
        </h3>

        {/* 評価 */}
        <div className="flex items-center gap-1.5 mb-2 flex-wrap">
          <span className="text-kincya text-sm leading-none">
            {"★".repeat(starsFull)}
            {starsHalf ? "★" : ""}
          </span>
          <span className="text-sm font-bold text-sumi">{formatRating(provider.averageRating)}</span>
          <span className="text-xs text-sumi/50">（口コミ{provider.reviewCount}件）</span>
          <span className="text-xs text-sumi/40">・施工実績{provider.completedCount}件</span>
        </div>

        {/* バッジ（最大3件 + +N） */}
        {visibleTags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {visibleTags.map((tag) => (
              <span key={tag} className="text-[10px] px-1.5 py-0.5 border border-kincya/40 text-kincya bg-kincya/5">
                {tag}
              </span>
            ))}
            {hiddenCount > 0 && (
              <span className="text-[10px] px-1.5 py-0.5 border border-border text-sumi/40 bg-kiji/50">
                +{hiddenCount}
              </span>
            )}
          </div>
        )}

        <p className="text-xs text-sumi/60 line-clamp-2 mb-2">{provider.catchCopy}</p>

        {/* 対応機能アイコン */}
        {activeFeatures.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {activeFeatures.slice(0, 4).map((f) => (
              <span key={f.key as string} className="flex items-center gap-1 text-[11px] text-sumi/60">
                <span>{f.icon}</span>
                <span>{f.label}</span>
              </span>
            ))}
          </div>
        )}

        {/* 対応エリア */}
        <p className="text-[11px] text-sumi/50">
          <span className="text-sumi/40">対応エリア：</span>
          {provider.serviceAreas.slice(0, 4).join("・")}
          {provider.serviceAreas.length > 4 ? " ほか" : ""}
        </p>

        {/* スマホ用: 比較ボタン（インライン） */}
        <div className="mt-2 sm:hidden">
          <CompareButton providerId={provider.id} />
        </div>
      </div>

      {/* 右：料金・CTA */}
      <div className="w-full sm:w-44 border-t sm:border-t-0 sm:border-l border-border p-4 flex flex-col justify-between gap-3">
        <div>
          {provider.startingPrice && (
            <div className="mb-2">
              <p className="text-[11px] text-sumi/40">料金</p>
              <p className="text-lg font-bold text-sumi leading-none">
                ¥{provider.startingPrice.toLocaleString()}
                <span className="text-xs font-normal text-sumi/50">〜/{provider.startingPriceUnit}</span>
              </p>
            </div>
          )}
          {provider.responseTimeHours && (
            <p className="text-[11px] text-igusa">返信目安：{getResponseTimeLabel(provider.responseTimeHours)}</p>
          )}
          {/* PC用: 比較ボタン */}
          <div className="hidden sm:block mt-2">
            <CompareButton providerId={provider.id} />
          </div>
        </div>

        <div className="space-y-1.5">
          <Link
            href={quoteHref}
            className="block w-full text-center text-sm bg-kincya text-white py-3 hover:bg-do transition-colors font-bold shadow-sm"
          >
            無料で見積依頼
          </Link>
          <Link
            href={detailHref}
            className="block w-full text-center text-xs border border-ai text-ai py-2 hover:bg-ai hover:text-white transition-colors"
          >
            詳細を見る
          </Link>
        </div>
      </div>
    </div>
  );
}
