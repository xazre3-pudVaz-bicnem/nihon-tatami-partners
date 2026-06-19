import type { Metadata } from "next";
import AdminLayout from "@/components/layout/AdminLayout";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "ユーザー管理 | 管理画面 | 日本畳パートナー",
  robots: "noindex,nofollow",
};

const MOCK_USERS = [
  { id: "user-001", name: "田中 美咲", email: "tanaka@example.com", city: "さいたま市", createdAt: "2024-09-10", bookingCount: 3, status: "active" },
  { id: "user-002", name: "鈴木 一郎", email: "suzuki@example.com", city: "川口市", createdAt: "2024-10-05", bookingCount: 1, status: "active" },
  { id: "user-003", name: "渡辺 花子", email: "watanabe@example.com", city: "越谷市", createdAt: "2024-11-01", bookingCount: 0, status: "active" },
];

export default function AdminUsersPage() {
  return (
    <AdminLayout currentPath="/admin/users">
      <div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl text-sumi" style={{ fontFamily: "var(--font-serif)" }}>ユーザー管理（{MOCK_USERS.length}件）</h1>
          <input type="text" placeholder="名前・メールで検索" className="border border-border text-xs px-3 py-2 focus:outline-none focus:border-ai w-48" />
        </div>

        <div className="bg-white border border-border overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-kiji">
                <th className="text-left text-xs text-sumi/50 font-normal px-4 py-3">氏名</th>
                <th className="text-left text-xs text-sumi/50 font-normal px-4 py-3">メール</th>
                <th className="text-left text-xs text-sumi/50 font-normal px-4 py-3">エリア</th>
                <th className="text-left text-xs text-sumi/50 font-normal px-4 py-3">予約数</th>
                <th className="text-left text-xs text-sumi/50 font-normal px-4 py-3">登録日</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {MOCK_USERS.map((u) => (
                <tr key={u.id} className="border-b border-kiji last:border-0 hover:bg-kiji/20 transition-colors">
                  <td className="px-4 py-3 text-sm text-sumi">{u.name}</td>
                  <td className="px-4 py-3 text-xs text-sumi/70">{u.email}</td>
                  <td className="px-4 py-3 text-xs text-sumi">{u.city}</td>
                  <td className="px-4 py-3 text-xs text-sumi">{u.bookingCount}件</td>
                  <td className="px-4 py-3 text-xs text-sumi/50">{formatDate(u.createdAt)}</td>
                  <td className="px-4 py-3">
                    <button className="text-xs text-do hover:underline">停止</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
