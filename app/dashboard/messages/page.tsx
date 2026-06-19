import type { Metadata } from "next";
import Link from "next/link";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { MOCK_THREADS } from "@/data/messages";
import { timeAgo } from "@/lib/utils";

export const metadata: Metadata = {
  title: "メッセージ | ダッシュボード | 日本畳パートナー",
  robots: "noindex,nofollow",
};

const MOCK_PROVIDER_ID = "prov-001";

export default function DashboardMessagesPage() {
  const threads = MOCK_THREADS.filter((t) => t.providerId === MOCK_PROVIDER_ID);

  return (
    <DashboardLayout currentPath="/dashboard/messages">
      <div>
        <h1 className="text-xl text-sumi mb-6" style={{ fontFamily: "var(--font-serif)" }}>メッセージ</h1>

        <div className="bg-white border border-border">
          {threads.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-sm text-sumi/50">まだメッセージはありません</p>
            </div>
          ) : (
            threads.map((thread) => (
              <Link
                key={thread.id}
                href={`/dashboard/messages/${thread.id}`}
                className={`flex gap-4 p-4 border-b border-kiji last:border-0 hover:bg-kiji/30 transition-colors ${thread.unreadProvider ? "bg-kiji/10" : ""}`}
              >
                <div className="w-10 h-10 bg-ai/10 shrink-0 flex items-center justify-center text-sm text-ai font-medium">
                  {thread.userId?.charAt(0) || "U"}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <p className="text-sm font-medium text-sumi">ユーザー（{thread.userId}）</p>
                    <div className="flex items-center gap-2 shrink-0">
                      {thread.unreadProvider! > 0 && (
                        <span className="w-5 h-5 bg-do text-white text-xs flex items-center justify-center">{thread.unreadProvider}</span>
                      )}
                      <span className="text-xs text-sumi/40">{thread.lastMessageAt ? timeAgo(thread.lastMessageAt) : ""}</span>
                    </div>
                  </div>
                  <p className="text-xs text-sumi/60 line-clamp-1">{thread.lastMessage}</p>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
