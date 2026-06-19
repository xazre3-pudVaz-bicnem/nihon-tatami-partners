import type { Metadata } from "next";
import AdminLayout from "@/components/layout/AdminLayout";
import StatusBadge from "@/components/common/StatusBadge";
import { MOCK_BOOKINGS } from "@/data/bookings";
import { MOCK_PROVIDERS } from "@/data/providers";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "予約管理 | 管理画面 | 日本畳パートナー",
  robots: "noindex,nofollow",
};

export default function AdminBookingsPage() {
  return (
    <AdminLayout currentPath="/admin/bookings">
      <div>
        <h1 className="text-xl text-sumi mb-6" style={{ fontFamily: "var(--font-serif)" }}>予約管理（{MOCK_BOOKINGS.length}件）</h1>

        <div className="bg-white border border-border overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-kiji">
                <th className="text-left text-xs text-sumi/50 font-normal px-4 py-3">予約ID</th>
                <th className="text-left text-xs text-sumi/50 font-normal px-4 py-3">サービス</th>
                <th className="text-left text-xs text-sumi/50 font-normal px-4 py-3">業者</th>
                <th className="text-left text-xs text-sumi/50 font-normal px-4 py-3">希望日</th>
                <th className="text-left text-xs text-sumi/50 font-normal px-4 py-3">ステータス</th>
                <th className="text-left text-xs text-sumi/50 font-normal px-4 py-3">依頼日</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_BOOKINGS.map((b) => {
                const provider = MOCK_PROVIDERS.find((p) => p.id === b.providerId);
                return (
                  <tr key={b.id} className="border-b border-kiji last:border-0 hover:bg-kiji/20 transition-colors">
                    <td className="px-4 py-3 text-xs text-sumi/50 font-mono">{b.id}</td>
                    <td className="px-4 py-3 text-xs text-sumi">{b.serviceCategory}</td>
                    <td className="px-4 py-3 text-xs text-sumi">{provider?.tradeName || provider?.companyName || "—"}</td>
                    <td className="px-4 py-3 text-xs text-sumi">{b.desiredDate1 || "未定"}</td>
                    <td className="px-4 py-3"><StatusBadge status={b.status} /></td>
                    <td className="px-4 py-3 text-xs text-sumi/50">{formatDate(b.createdAt)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
