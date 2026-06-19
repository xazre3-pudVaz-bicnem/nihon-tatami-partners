import type { Metadata } from "next";
import AdminLayout from "@/components/layout/AdminLayout";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "お問い合わせ管理 | 管理画面 | 日本畳パートナー",
  robots: "noindex,nofollow",
};

const MOCK_CONTACTS = [
  { id: "c-001", name: "田中 美咲", email: "tanaka@example.com", type: "業者選びについて相談したい", status: "open", createdAt: "2024-11-20" },
  { id: "c-002", name: "佐藤 次郎", email: "sato@example.com", type: "見積もりの価格について", status: "replied", createdAt: "2024-11-18" },
  { id: "c-003", name: "鈴木 花子", email: "suzuki@example.com", type: "業者として掲載したい", status: "open", createdAt: "2024-11-17" },
];

export default function AdminContactsPage() {
  return (
    <AdminLayout currentPath="/admin/contacts">
      <div>
        <h1 className="text-xl text-sumi mb-6" style={{ fontFamily: "var(--font-serif)" }}>お問い合わせ管理（{MOCK_CONTACTS.length}件）</h1>

        <div className="space-y-4">
          {MOCK_CONTACTS.map((c) => (
            <div key={c.id} className="bg-white border border-border p-5">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <p className="text-sm text-sumi">{c.name}（{c.email}）</p>
                  <p className="text-xs text-sumi/50">{c.type}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 shrink-0 ${c.status === "open" ? "bg-do/10 text-do" : "bg-igusa/10 text-igusa"}`}>
                  {c.status === "open" ? "未対応" : "返信済み"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-sumi/40">{formatDate(c.createdAt)}</p>
                <div className="flex gap-2">
                  <button className="text-xs bg-ai text-white px-3 py-1 hover:opacity-80 transition-opacity">返信する</button>
                  <button className="text-xs border border-border text-sumi/60 px-3 py-1 hover:border-ai hover:text-ai transition-colors">詳細</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
