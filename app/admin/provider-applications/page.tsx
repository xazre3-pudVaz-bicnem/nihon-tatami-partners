import type { Metadata } from "next";
import AdminLayout from "@/components/layout/AdminLayout";
import StatusBadge from "@/components/common/StatusBadge";
import { MOCK_PROVIDERS } from "@/data/providers";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "業者申請の審査 | 管理画面 | 日本畳パートナーズ",
  robots: "noindex,nofollow",
};

export default function AdminProviderApplicationsPage() {
  // status: "pending" を申請中とみなす
  const pending = MOCK_PROVIDERS.filter((p) => p.status === "pending");

  return (
    <AdminLayout currentPath="/admin/provider-applications">
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl text-sumi" style={{ fontFamily: "var(--font-serif)" }}>
            業者申請の審査（{pending.length}件）
          </h1>
        </div>

        {pending.length === 0 ? (
          <div className="bg-white border border-border p-10 text-center">
            <p className="text-sm text-sumi/50">現在、審査待ちの申請はありません。</p>
          </div>
        ) : (
          <div className="space-y-4">
            {pending.map((p) => (
              <div key={p.id} className="bg-white border border-border p-5">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-base text-sumi" style={{ fontFamily: "var(--font-serif)" }}>{p.companyName}</h2>
                      <StatusBadge status={p.status} />
                    </div>
                    <p className="text-xs text-sumi/40">{p.id} ・ 申請日 {formatDate(p.createdAt)}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs mb-4">
                  <div><span className="text-sumi/40 block mb-0.5">代表者</span>{p.representativeName}</div>
                  <div><span className="text-sumi/40 block mb-0.5">エリア</span>{p.prefecture}{p.city}</div>
                  <div><span className="text-sumi/40 block mb-0.5">電話</span>{p.phone}</div>
                  <div><span className="text-sumi/40 block mb-0.5">保険</span>{p.hasInsurance ? "加入済み" : "未加入"}</div>
                </div>
                <p className="text-xs text-sumi/60 mb-4 line-clamp-2">{p.introduction}</p>
                <div className="flex gap-2">
                  <button className="bg-igusa text-white px-4 py-2 text-xs hover:opacity-90 transition-opacity">承認する</button>
                  <button className="border border-do text-do px-4 py-2 text-xs hover:bg-do hover:text-white transition-colors">却下する</button>
                  <button className="border border-border text-sumi/60 px-4 py-2 text-xs hover:border-ai hover:text-ai transition-colors">詳細を確認</button>
                </div>
              </div>
            ))}
          </div>
        )}
        <p className="text-xs text-sumi/40 mt-6">※ 承認・却下はデモ動作です。実際の処理はSupabase移行後に実装されます。</p>
      </div>
    </AdminLayout>
  );
}
