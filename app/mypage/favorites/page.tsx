import type { Metadata } from "next";
import Link from "next/link";
import ProviderCard from "@/components/common/ProviderCard";
import { MOCK_PROVIDERS } from "@/data/providers";

export const metadata: Metadata = {
  title: "お気に入り業者 | マイページ | 日本畳パートナー",
  robots: "noindex,nofollow",
};

// TODO: DB から取得するお気に入りデータ
const FAVORITE_IDS = ["prov-001", "prov-005"];

export default function FavoritesPage() {
  const favorites = MOCK_PROVIDERS.filter((p) => FAVORITE_IDS.includes(p.id));

  return (
    <div className="min-h-screen bg-cloud">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/mypage" className="text-sm text-ai hover:underline">← マイページ</Link>
          <h1 className="text-xl text-sumi" style={{ fontFamily: "var(--font-serif)" }}>お気に入り業者（{favorites.length}件）</h1>
        </div>

        {favorites.length === 0 ? (
          <div className="bg-white border border-border p-12 text-center">
            <p className="text-sm text-sumi/50 mb-4">お気に入りに登録した業者はありません</p>
            <Link href="/search" className="text-sm text-ai border border-ai px-6 py-2 hover:bg-ai hover:text-white transition-all duration-300 inline-block">
              業者を探す
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {favorites.map((p) => (
              <ProviderCard key={p.id} provider={p} showFavorite />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
