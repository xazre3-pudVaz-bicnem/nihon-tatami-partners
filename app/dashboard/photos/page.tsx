import type { Metadata } from "next";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { MOCK_PROVIDERS } from "@/data/providers";

export const metadata: Metadata = {
  title: "写真管理 | ダッシュボード | 日本畳パートナー",
  robots: "noindex,nofollow",
};

const MOCK_PROVIDER = MOCK_PROVIDERS[0];

export default function DashboardPhotosPage() {
  return (
    <DashboardLayout currentPath="/dashboard/photos">
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl text-sumi" style={{ fontFamily: "var(--font-serif)" }}>写真管理</h1>
          <button className="text-sm bg-ai text-white px-4 py-2 hover:opacity-80 transition-opacity">
            写真をアップロード
          </button>
        </div>

        <div className="bg-white border border-border p-5 mb-4">
          <h2 className="text-sm text-sumi font-medium border-b border-kiji pb-2 mb-4" style={{ fontFamily: "var(--font-serif)" }}>メイン写真</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {(MOCK_PROVIDER.photos || []).map((photo, i) => (
              <div key={i} className="relative group aspect-square bg-kiji/50 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <p className="text-xs text-sumi/30">{photo}</p>
                </div>
                <div className="absolute inset-0 bg-sumi/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button className="text-xs text-white bg-do px-2 py-1 hover:opacity-80">削除</button>
                </div>
              </div>
            ))}
            <div className="aspect-square border-2 border-dashed border-kiji flex items-center justify-center cursor-pointer hover:border-ai transition-colors">
              <p className="text-xs text-sumi/40 text-center">追加<br />（+）</p>
              {/* TODO: ファイルアップロード実装（Supabase Storage）*/}
            </div>
          </div>
          <p className="text-xs text-sumi/40 mt-3">最大20枚まで登録できます（推奨サイズ：800×600px以上）</p>
        </div>

        <div className="bg-white border border-border p-5">
          <h2 className="text-sm text-sumi font-medium border-b border-kiji pb-2 mb-4" style={{ fontFamily: "var(--font-serif)" }}>プロフィールサムネイル</h2>
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-kiji/50 flex items-center justify-center shrink-0">
              <p className="text-xs text-sumi/30 text-center">サムネイル</p>
            </div>
            <div>
              <p className="text-xs text-sumi mb-2">検索結果や業者一覧に表示されるメイン画像です。</p>
              <button className="text-xs border border-border text-sumi/60 px-3 py-1.5 hover:border-ai hover:text-ai transition-colors">
                画像を変更する
                {/* TODO: ファイルアップロード実装（Supabase Storage）*/}
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
