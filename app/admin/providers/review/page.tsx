import type { Metadata } from "next";
import Link from "next/link";
import AdminLayout from "@/components/layout/AdminLayout";
import { MOCK_PROVIDERS } from "@/data/providers";
import StatusBadge from "@/components/common/StatusBadge";

export const metadata: Metadata = {
  title: "業者審査 | 管理画面 | 日本畳パートナー",
  robots: "noindex,nofollow",
};

export default function AdminProviderReviewPage() {
  const pendingProviders = MOCK_PROVIDERS.filter((p) => p.status === "pending");

  return (
    <AdminLayout currentPath="/admin/providers/review">
      <div>
        <h1 className="text-xl text-sumi mb-6" style={{ fontFamily: "var(--font-serif)" }}>
          業者審査（{pendingProviders.length}件）
        </h1>

        {pendingProviders.length === 0 ? (
          <div className="bg-white border border-border p-12 text-center">
            <p className="text-sm text-sumi/50">審査待ちの業者はありません</p>
          </div>
        ) : (
          <div className="space-y-4">
            {pendingProviders.map((p) => (
              <div key={p.id} className="bg-white border border-border p-5">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h2 className="text-base text-sumi mb-0.5" style={{ fontFamily: "var(--font-serif)" }}>
                      {p.tradeName || p.companyName}
                    </h2>
                    <p className="text-xs text-sumi/50">{p.city} / {p.phone}</p>
                  </div>
                  <StatusBadge status={p.status} />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs border-t border-kiji pt-3 mb-4">
                  <div><span className="text-sumi/40 block mb-0.5">代表者</span>{p.representativeName}</div>
                  <div><span className="text-sumi/40 block mb-0.5">エリア</span>{p.city}</div>
                  <div><span className="text-sumi/40 block mb-0.5">電話</span>{p.phone}</div>
                </div>

                <p className="text-xs text-sumi/70 bg-kiji/30 p-3 mb-4 leading-relaxed">{p.introduction}</p>

                <div className="flex gap-3">
                  <button className="text-sm bg-igusa text-white px-6 py-2 hover:opacity-80 transition-opacity">
                    承認して掲載開始
                  </button>
                  <button className="text-sm border border-do text-do px-6 py-2 hover:bg-do hover:text-white transition-colors">
                    拒否（差し戻し）
                  </button>
                  <Link href={`/providers/${p.id}`} className="text-sm border border-border text-sumi/60 px-4 py-2 hover:border-ai hover:text-ai transition-colors">
                    詳細を確認
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
