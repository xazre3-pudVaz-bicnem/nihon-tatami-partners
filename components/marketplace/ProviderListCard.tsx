import Link from "next/link";
import type { Provider } from "@/lib/types";
import { formatRating, getResponseTimeLabel } from "@/lib/utils";

interface Props {
  provider: Provider;
  rank?: number;
  categorySlug?: string;
}

// くらしのマーケット級 横長業者カード（Server Component）
export default function ProviderListCard({ provider, rank, categorySlug }: Props) {
  const displayRank = rank ?? provider.rank;
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

  const businessTags: string[] = [];
  if (provider.licenses?.some((l) => l.includes("一級"))) businessTags.push("一級技能士");
  if (provider.hasInsurance) businessTags.push("保険加入");
  if (provider.acceptsCorporate) businessTags.push("法人対応");
  if (provider.canSameDayResponse) businessTags.push("即日対応");
  if (provider.acceptsRyokan) businessTags.push("旅館対応");
  if (provider.acceptsTempleShrine) businessTags.push("寺社対応");

  const detailHref = `/providers/${provider.id}`;
  const quoteHref = categorySlug
    ? `/quote/new?provider=${provider.id}&category=${categorySlug}`
    : `/quote/new?provider=${provider.id}`;

  return (
    <div className="bg-white border border-border hover:border-kincya/40 transition-all duration-300 hover:shadow-sm flex flex-col sm:flex-row gap-0 overflow-hidden">
      {/* 左：写真エリア */}
      <div className="relative w-full sm:w-48 h-44 shrink-0 bg-kiji overflow-hidden">
        <div className="absolute inset-0 tatami-pattern flex items-center justify-center">
          <span className="text-xs text-sumi/30">施工写真</span>
        </div>
        {displayRank && displayRank <= 10 && (
          <div className={`absolute top-0 left-0 text-xs font-bold px-3 py-1.5 z-10 ${rankBadge}`}>
            {displayRank}位
          </div>
        )}
      </div>

      {/* 中央：業者情報 */}
      <div className="flex-1 p-4 min-w-0">
        <p className="text-xs text-sumi/40 mb-0.5">{provider.city}</p>
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

        {/* バッジ */}
        {businessTags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {businessTags.slice(0, 5).map((tag) => (
              <span key={tag} className="text-[10px] px-1.5 py-0.5 border border-kincya/40 text-kincya bg-kincya/5">
                {tag}
              </span>
            ))}
          </div>
        )}

        <p className="text-xs text-sumi/60 line-clamp-2 mb-2">{provider.catchCopy}</p>

        {/* 対応エリア */}
        <p className="text-[11px] text-sumi/50">
          <span className="text-sumi/40">対応エリア：</span>
          {provider.serviceAreas.slice(0, 4).join("・")}
          {provider.serviceAreas.length > 4 ? " ほか" : ""}
        </p>
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
        </div>

        <div className="space-y-1.5">
          <Link
            href={quoteHref}
            className="block w-full text-center text-xs bg-kincya text-white py-2.5 hover:bg-do transition-colors font-medium"
          >
            見積依頼
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
