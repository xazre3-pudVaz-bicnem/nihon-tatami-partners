"use client";

import Link from "next/link";
import type { Provider } from "@/lib/types";
import { formatRating } from "@/lib/utils";

interface Props {
  provider: Provider;
  variant?: "default" | "compact" | "list";
  rank?: number;
  showFavorite?: boolean;
}

const RANK_COLORS: Record<number, string> = {
  1: "bg-[#b8932a] text-white",
  2: "bg-[#808080] text-white",
  3: "bg-[#a05030] text-white",
};

export default function ProviderCard({ provider, variant = "default", rank, showFavorite = false }: Props) {
  const displayRank = rank ?? provider.rank;
  const starsFull = Math.floor(provider.averageRating);
  const starsHalf = provider.averageRating - starsFull >= 0.5;

  if (variant === "list") {
    return (
      <div className="bg-white border border-border hover:border-kincya/40 transition-all duration-300 hover:shadow-sm p-0 overflow-hidden">
        <div className="flex">
          {/* ランキングバッジ縦線 */}
          {displayRank && displayRank <= 10 && (
            <div className={`w-1 shrink-0 ${displayRank === 1 ? "bg-[#b8932a]" : displayRank === 2 ? "bg-[#808080]" : displayRank === 3 ? "bg-[#a05030]" : "bg-ai/30"}`} />
          )}
          <div className="flex flex-1 gap-4 p-4">
            {/* サムネイル */}
            <div className="relative w-20 h-20 bg-kiji shrink-0 overflow-hidden">
              <div className="w-full h-full tatami-pattern flex items-center justify-center">
                <span className="text-xs text-sumi/30">写真</span>
              </div>
              {displayRank && displayRank <= 3 && (
                <div className={`absolute top-0 left-0 text-[10px] font-bold px-1.5 py-0.5 ${RANK_COLORS[displayRank]}`}>
                  {displayRank}位
                </div>
              )}
            </div>

            {/* 情報 */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <div>
                  <p className="text-xs text-sumi/50 mb-0.5">{provider.city}</p>
                  <h3 className="text-base text-sumi line-clamp-1" style={{ fontFamily: "var(--font-serif)" }}>
                    {provider.tradeName || provider.companyName}
                  </h3>
                </div>
                {showFavorite && (
                  <button className="text-sumi/30 hover:text-kincya transition-colors shrink-0" aria-label="お気に入り">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                )}
              </div>
              <p className="text-xs text-sumi/60 line-clamp-1 mb-2">{provider.catchCopy}</p>
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-1">
                  <span className="text-kincya text-sm">{"★".repeat(starsFull)}{starsHalf ? "★" : ""}{"☆".repeat(Math.max(0, 5 - starsFull - (starsHalf ? 1 : 0)))}</span>
                  <span className="text-sm font-bold text-sumi">{formatRating(provider.averageRating)}</span>
                  <span className="text-xs text-sumi/50">（{provider.reviewCount}件）</span>
                </div>
                {provider.badges?.slice(0, 2).map((badge) => (
                  <span key={badge.id} className={`text-xs px-2 py-0.5 border ${
                    badge.color === "gold" ? "border-kincya/40 text-kincya bg-kincya/5" :
                    badge.color === "green" ? "border-igusa/40 text-igusa bg-igusa/5" :
                    "border-ai/20 text-ai bg-ai/5"
                  }`}>{badge.label}</span>
                ))}
              </div>
            </div>

            <div className="shrink-0 flex flex-col items-end justify-between">
              {provider.startingPrice && (
                <div className="text-right">
                  <p className="text-xs text-sumi/40">料金</p>
                  <p className="text-sm font-bold text-sumi">¥{provider.startingPrice.toLocaleString()}〜</p>
                  <p className="text-xs text-sumi/40">/{provider.startingPriceUnit}</p>
                </div>
              )}
              <Link href={`/providers/${provider.id}`} className="text-xs bg-ai text-white px-4 py-2 hover:bg-ai-light transition-colors whitespace-nowrap mt-2">
                詳細・予約
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <Link href={`/providers/${provider.id}`} className="group block bg-white border border-border hover:border-kincya/40 transition-all duration-300 hover:shadow-sm p-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-kiji shrink-0 tatami-pattern" />
          <div className="min-w-0">
            <p className="text-xs text-sumi/50 leading-none mb-0.5">{provider.city}</p>
            <h3 className="text-sm text-sumi group-hover:text-ai transition-colors line-clamp-1" style={{ fontFamily: "var(--font-serif)" }}>
              {provider.tradeName || provider.companyName}
            </h3>
          </div>
        </div>
        <div className="flex items-center gap-1 mb-1">
          <span className="text-kincya text-xs">{"★".repeat(starsFull)}</span>
          <span className="text-xs font-bold text-sumi">{formatRating(provider.averageRating)}</span>
          <span className="text-xs text-sumi/40">({provider.reviewCount}件)</span>
        </div>
        {provider.startingPrice && (
          <p className="text-xs text-kincya font-medium">¥{provider.startingPrice.toLocaleString()}〜/{provider.startingPriceUnit}</p>
        )}
      </Link>
    );
  }

  // default (grid card) — curama-style
  return (
    <div className="bg-white border border-border hover:border-kincya/40 transition-all duration-300 hover:shadow-sm group overflow-hidden">
      {/* 写真エリア */}
      <div className="relative h-40 bg-kiji overflow-hidden">
        <div className="absolute inset-0 tatami-pattern" />
        {/* ランキングバッジ */}
        {displayRank && displayRank <= 3 && (
          <div className={`absolute top-0 left-0 text-xs font-bold px-3 py-1.5 z-10 ${RANK_COLORS[displayRank]}`}>
            {displayRank}位
          </div>
        )}
        {displayRank && displayRank > 3 && displayRank <= 10 && (
          <div className="absolute top-0 left-0 text-xs text-sumi/60 bg-white/90 px-2 py-1">
            {displayRank}位
          </div>
        )}
        {/* バッジ */}
        {provider.canSameDayResponse && (
          <div className="absolute top-0 right-0 bg-do text-white text-[10px] px-2 py-1 font-medium">即日対応</div>
        )}
        {showFavorite && (
          <button className="absolute bottom-2 right-2 w-7 h-7 bg-white/90 hover:bg-white flex items-center justify-center text-sumi/40 hover:text-kincya transition-all rounded-full shadow-sm" aria-label="お気に入り">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        )}
      </div>

      {/* 情報エリア */}
      <div className="p-4">
        <p className="text-xs text-sumi/40 mb-0.5">{provider.city}</p>
        <h3 className="text-sm text-sumi mb-1 group-hover:text-ai transition-colors line-clamp-2 leading-snug" style={{ fontFamily: "var(--font-serif)" }}>
          {provider.tradeName || provider.companyName}
        </h3>
        <p className="text-xs text-sumi/60 line-clamp-1 mb-2">{provider.catchCopy}</p>

        {/* 評価 — くらしのマーケット式 "4.99 (110件)" */}
        <div className="flex items-center gap-1.5 mb-2">
          <span className="text-kincya text-sm leading-none">{"★".repeat(starsFull)}{starsHalf ? "★" : ""}</span>
          <span className="text-sm font-bold text-sumi">{formatRating(provider.averageRating)}</span>
          <span className="text-xs text-sumi/50">({provider.reviewCount}件)</span>
        </div>

        {/* バッジ */}
        {provider.badges && provider.badges.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {provider.badges.slice(0, 3).map((badge) => (
              <span key={badge.id} className={`text-[10px] px-1.5 py-0.5 border ${
                badge.color === "gold" ? "border-kincya/50 text-kincya bg-kincya/5" :
                badge.color === "green" ? "border-igusa/50 text-igusa bg-igusa/5" :
                badge.color === "blue" ? "border-ai/30 text-ai bg-ai/5" :
                "border-border text-sumi/50"
              }`}>{badge.label}</span>
            ))}
          </div>
        )}

        {/* 価格 */}
        {provider.startingPrice && (
          <p className="text-base font-bold text-sumi mb-3">
            ¥{provider.startingPrice.toLocaleString()}<span className="text-xs font-normal text-sumi/50">〜/{provider.startingPriceUnit}</span>
          </p>
        )}

        {/* オプション情報 */}
        <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-[10px] text-sumi/50 mb-3">
          {provider.hasEstimateFree && <span className="flex items-center gap-0.5"><span className="text-igusa">✓</span>無料見積</span>}
          {provider.canWeekendResponse && <span className="flex items-center gap-0.5"><span className="text-igusa">✓</span>土日対応</span>}
          {provider.hasFurnitureMove && <span className="flex items-center gap-0.5"><span className="text-igusa">✓</span>家具移動</span>}
          {provider.hasInsurance && <span className="flex items-center gap-0.5"><span className="text-igusa">✓</span>保険加入</span>}
        </div>

        {/* CTA — くらしのマーケット式：詳細+予約を1ボタンに */}
        <Link
          href={`/providers/${provider.id}`}
          className="block w-full text-center text-xs bg-kincya text-white py-2.5 hover:bg-do transition-colors duration-200 font-medium tracking-wide"
        >
          詳細・予約する
        </Link>
      </div>
    </div>
  );
}
