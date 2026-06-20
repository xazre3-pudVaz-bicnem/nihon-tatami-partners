"use client";

import { useState } from "react";

interface Props {
  providerId: string;
  className?: string;
}

// お気に入りトグル（ローカル状態のみ。将来はサーバー連携）
export default function FavoriteButton({ providerId, className = "" }: Props) {
  const [favored, setFavored] = useState(false);

  return (
    <button
      type="button"
      data-provider-id={providerId}
      onClick={() => setFavored((v) => !v)}
      aria-pressed={favored}
      aria-label={favored ? "お気に入りを解除" : "お気に入りに追加"}
      className={`transition-colors ${favored ? "text-do" : "text-sumi/30 hover:text-do"} ${className}`}
    >
      <svg className="w-6 h-6" fill={favored ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    </button>
  );
}
