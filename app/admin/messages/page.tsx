import type { Metadata } from "next";
import AdminLayout from "@/components/layout/AdminLayout";
import StatusBadge from "@/components/common/StatusBadge";
import { MOCK_THREADS } from "@/data/messages";
import { getProviderById } from "@/data/providers";
import { timeAgo } from "@/lib/utils";

export const metadata: Metadata = {
  title: "メッセージ監査 | 管理画面 | 日本畳パートナーズ",
  robots: "noindex,nofollow",
};

export default function AdminMessagesPage() {
  return (
    <AdminLayout currentPath="/admin/messages">
      <div>
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <h1 className="text-xl text-sumi" style={{ fontFamily: "var(--font-serif)" }}>
            メッセージ監査（{MOCK_THREADS.length}スレッド）
          </h1>
          <select className="border border-border text-xs px-3 py-2 focus:outline-none focus:border-ai">
            <option>すべてのステータス</option>
            <option value="open">対応中</option>
            <option value="pending">保留</option>
            <option value="closed">終了</option>
          </select>
        </div>

        <div className="bg-white border border-border overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-kiji">
                <th className="text-left text-xs text-sumi/50 font-normal px-4 py-3">スレッド</th>
                <th className="text-left text-xs text-sumi/50 font-normal px-4 py-3">業者</th>
                <th className="text-left text-xs text-sumi/50 font-normal px-4 py-3">最新メッセージ</th>
                <th className="text-left text-xs text-sumi/50 font-normal px-4 py-3">状態</th>
                <th className="text-left text-xs text-sumi/50 font-normal px-4 py-3">更新</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {MOCK_THREADS.map((t) => {
                const provider = getProviderById(t.providerId);
                return (
                  <tr key={t.id} className="border-b border-kiji last:border-0 hover:bg-kiji/20 transition-colors">
                    <td className="px-4 py-3 text-xs text-sumi/50 whitespace-nowrap">{t.id}</td>
                    <td className="px-4 py-3 text-xs text-sumi">{provider?.tradeName ?? provider?.companyName ?? t.providerId}</td>
                    <td className="px-4 py-3 text-xs text-sumi/60 max-w-xs line-clamp-1">{t.lastMessage}</td>
                    <td className="px-4 py-3"><StatusBadge status={t.status} /></td>
                    <td className="px-4 py-3 text-xs text-sumi/50 whitespace-nowrap">{t.lastMessageAt ? timeAgo(t.lastMessageAt) : "—"}</td>
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <button className="text-xs text-ai hover:underline mr-3">内容確認</button>
                      <button className="text-xs text-do hover:underline">通報対応</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-sumi/40 mt-6">※ メッセージ内容の確認は、通報・トラブル対応の目的でのみ行ってください。</p>
      </div>
    </AdminLayout>
  );
}
