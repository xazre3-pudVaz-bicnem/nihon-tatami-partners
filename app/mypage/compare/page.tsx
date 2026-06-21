"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MOCK_PROVIDERS } from "@/data/providers";
import type { Provider } from "@/lib/types";
import SampleBadge from "@/components/common/SampleBadge";

const STORAGE_KEY = "nihontatami_compare_ids";

export default function MypageComparePage() {
  const [compareProviders, setCompareProviders] = useState<Provider[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const ids: string[] = JSON.parse(raw);
        const matched = MOCK_PROVIDERS.filter((p) => ids.includes(p.id));
        setCompareProviders(matched);
      }
    } catch {
      // localStorage が使えない場合は空
    }
    setLoaded(true);
  }, []);

  const removeFromList = (id: string) => {
    setCompareProviders((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated.map((p) => p.id)));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const clearAll = () => {
    setCompareProviders([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  if (!loaded) {
    return (
      <div className="min-h-screen bg-cloud flex items-center justify-center">
        <p className="text-sm text-sumi/50">読み込み中...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cloud">
      {/* ページヘッダー */}
      <div className="bg-sumi">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-xs text-white/50 mb-1">
            <Link href="/mypage" className="hover:text-white/80">
              マイページ
            </Link>
            {" "}/ 比較リスト
          </p>
          <h1 className="text-xl text-white" style={{ fontFamily: "var(--font-serif)" }}>
            比較リスト保存
          </h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 掲載イメージバナー */}
        <div className="bg-kiji border border-border px-4 py-2 flex items-center gap-2 mb-6">
          <SampleBadge />
          <p className="text-xs text-sumi/60">
            業者詳細ページで「比較に追加」した業者がここに表示されます。
          </p>
        </div>

        {compareProviders.length === 0 ? (
          <div className="bg-white border border-border p-12 text-center">
            <p className="text-sumi/40 text-4xl mb-4">≡</p>
            <p className="text-sm text-sumi/50 mb-2">比較リストは空です</p>
            <p className="text-xs text-sumi/40 mb-6">
              業者ページの「比較に追加」ボタンを押すと、ここに保存されます
            </p>
            <Link
              href="/search"
              className="text-sm text-white bg-ai px-6 py-2 hover:opacity-80 transition-opacity inline-block"
            >
              業者を探す
            </Link>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-sumi">
                <span className="font-medium text-ai">{compareProviders.length}</span>
                社を比較リストに保存中
              </p>
              <div className="flex gap-3">
                <button
                  onClick={clearAll}
                  className="text-xs text-sumi/40 hover:text-do transition-colors"
                >
                  リストを空にする
                </button>
                {compareProviders.length >= 2 && (
                  <Link
                    href="/compare"
                    className="text-xs bg-kincya text-white px-4 py-1.5 hover:bg-do transition-colors"
                  >
                    比較する →
                  </Link>
                )}
              </div>
            </div>

            <div className="space-y-3 mb-6">
              {compareProviders.map((p) => (
                <div
                  key={p.id}
                  className="bg-white border border-border p-4 flex items-center justify-between gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-sm text-sumi font-medium truncate">
                        {p.tradeName || p.companyName}
                      </p>
                      {p.plan === "premium" && (
                        <span className="text-[10px] bg-kincya/10 text-kincya border border-kincya/30 px-1.5 py-0.5 shrink-0">
                          プレミアム
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-sumi/50">{p.city}</p>
                    {p.averageRating && (
                      <p className="text-xs text-kincya mt-0.5">
                        {"★".repeat(Math.round(p.averageRating))}
                        <span className="text-sumi/40 ml-1">
                          {p.averageRating.toFixed(1)}（{p.reviewCount}件）
                        </span>
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <Link
                      href={`/providers/${p.id}`}
                      className="text-xs text-ai hover:underline"
                    >
                      詳細を見る
                    </Link>
                    <button
                      onClick={() => removeFromList(p.id)}
                      className="text-xs text-sumi/30 hover:text-do transition-colors"
                      title="リストから削除"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {compareProviders.length >= 2 ? (
              <div className="text-center">
                <Link
                  href="/compare"
                  className="inline-block bg-ai text-white px-8 py-3 text-sm tracking-wider hover:opacity-80 transition-opacity"
                >
                  {compareProviders.length}社を比較する →
                </Link>
              </div>
            ) : (
              <div className="bg-kiji border border-border px-4 py-3 text-xs text-sumi/60 text-center">
                比較するにはあと{2 - compareProviders.length}社以上追加してください
              </div>
            )}
          </>
        )}

        <div className="mt-6">
          <Link href="/mypage" className="text-xs text-ai hover:underline">
            ← マイページに戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
