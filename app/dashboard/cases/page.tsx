import type { Metadata } from "next";
import Link from "next/link";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { MOCK_WORK_CASES } from "@/data/workcases";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "施工事例管理 | ダッシュボード | 日本畳パートナーズ",
  robots: "noindex,nofollow",
};

const MOCK_PROVIDER_ID = "prov-001";

export default function DashboardCasesPage() {
  // TODO: Supabase移行後はログイン業者の事例を取得
  const cases = MOCK_WORK_CASES.filter((c) => c.providerId === MOCK_PROVIDER_ID);

  return (
    <DashboardLayout currentPath="/dashboard/cases">
      <div>
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <h1 className="text-xl text-sumi" style={{ fontFamily: "var(--font-serif)" }}>施工事例管理</h1>
          <Link href="/dashboard/workcases/new" className="bg-kincya text-white px-5 py-2.5 text-sm hover:bg-do transition-colors">
            ＋ 施工事例を登録
          </Link>
        </div>

        {cases.length === 0 ? (
          <div className="bg-white border border-border p-10 text-center">
            <p className="text-sm text-sumi/50 mb-4">登録された施工事例はまだありません。</p>
            <Link href="/dashboard/workcases/new" className="inline-block bg-ai text-white px-5 py-2.5 text-sm hover:bg-ai-light transition-colors">
              最初の施工事例を登録する
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {cases.map((c) => (
              <div key={c.id} className="bg-white border border-border p-4 flex items-center gap-4">
                <div className="w-20 h-16 bg-kiji/50 tatami-pattern shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-ai border border-ai/30 px-1.5 py-0.5">{c.categoryName}</span>
                    {c.featured && <span className="text-xs text-kincya border border-kincya/30 px-1.5 py-0.5">注目</span>}
                  </div>
                  <h2 className="text-sm text-sumi line-clamp-1">{c.title}</h2>
                  <p className="text-xs text-sumi/40 mt-0.5">{c.cityName} ・ {formatDate(c.publishedAt)}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Link href={`/cases/${c.id}`} className="text-xs border border-border text-sumi/60 px-3 py-1.5 hover:border-ai hover:text-ai transition-colors">
                    表示
                  </Link>
                  <Link href="/dashboard/workcases" className="text-xs border border-border text-sumi/60 px-3 py-1.5 hover:border-ai hover:text-ai transition-colors">
                    編集
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        <p className="text-xs text-sumi/40 mt-6">施工事例は公開ページ（施工事例一覧）に掲載され、集客につながります。ビフォーアフター写真を添えると効果的です。</p>
      </div>
    </DashboardLayout>
  );
}
