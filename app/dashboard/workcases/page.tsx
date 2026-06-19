import type { Metadata } from "next";
import Link from "next/link";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { MOCK_WORK_CASES } from "@/data/workcases";

export const metadata: Metadata = {
  title: "施工事例 | ダッシュボード | 日本畳パートナー",
  robots: "noindex,nofollow",
};

const MOCK_PROVIDER_ID = "prov-001";

export default function DashboardWorkcasesPage() {
  const workcases = MOCK_WORK_CASES.filter((w) => w.providerId === MOCK_PROVIDER_ID);

  return (
    <DashboardLayout currentPath="/dashboard/workcases">
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl text-sumi" style={{ fontFamily: "var(--font-serif)" }}>施工事例</h1>
          <Link href="/dashboard/workcases/new" className="text-sm text-white bg-ai px-4 py-2 hover:opacity-80 transition-opacity">
            事例を追加
          </Link>
        </div>

        {workcases.length === 0 ? (
          <div className="bg-white border border-border p-12 text-center">
            <p className="text-sm text-sumi/50 mb-4">施工事例はまだありません</p>
            <Link href="/dashboard/workcases/new" className="text-sm text-ai border border-ai px-4 py-2 hover:bg-ai hover:text-white transition-all duration-300 inline-block">
              施工事例を追加する
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {workcases.map((wc) => (
              <div key={wc.id} className="bg-white border border-border p-4">
                <div className="aspect-[4/3] bg-kiji/50 flex items-center justify-center mb-3">
                  <p className="text-xs text-sumi/30">施工後写真</p>
                </div>
                <h3 className="text-sm text-sumi mb-1" style={{ fontFamily: "var(--font-serif)" }}>{wc.title}</h3>
                <p className="text-xs text-sumi/50 mb-2">{wc.categoryName} / {wc.cityName}</p>
                {wc.estimatedCostLabel && (
                  <p className="text-xs text-kincya mb-2">{wc.estimatedCostLabel}（概算）</p>
                )}
                <div className="flex gap-2">
                  <button className="text-xs border border-border text-sumi/60 px-3 py-1 hover:border-ai hover:text-ai transition-colors">編集</button>
                  <button className="text-xs border border-do text-do px-3 py-1 hover:bg-do hover:text-white transition-colors">削除</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
