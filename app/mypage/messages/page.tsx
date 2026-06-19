import type { Metadata } from "next";
import Link from "next/link";
import { MOCK_THREADS } from "@/data/messages";
import { MOCK_PROVIDERS } from "@/data/providers";
import { timeAgo, truncate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "メッセージ | マイページ | 日本畳パートナー",
  robots: "noindex,nofollow",
};

const MOCK_USER_ID = "user-001";

export default function MessagesPage() {
  const threads = MOCK_THREADS.filter((t) => t.userId === MOCK_USER_ID);

  return (
    <div className="min-h-screen bg-cloud">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/mypage" className="text-sm text-ai hover:underline">← マイページ</Link>
          <h1 className="text-xl text-sumi" style={{ fontFamily: "var(--font-serif)" }}>メッセージ</h1>
        </div>

        <div className="bg-white border border-border">
          {threads.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-sm text-sumi/50 mb-4">まだメッセージはありません</p>
              <Link href="/search" className="text-sm text-ai border border-ai px-4 py-2 hover:bg-ai hover:text-white transition-all duration-300 inline-block">
                業者を探す
              </Link>
            </div>
          ) : (
            threads.map((thread) => {
              const provider = MOCK_PROVIDERS.find((p) => p.id === thread.providerId);
              return (
                <Link
                  key={thread.id}
                  href={`/mypage/messages/${thread.id}`}
                  className={`flex gap-4 p-4 border-b border-kiji last:border-0 hover:bg-kiji/30 transition-colors ${thread.unreadUser ? "bg-kiji/10" : ""}`}
                >
                  <div className="w-10 h-10 bg-ai/10 shrink-0 flex items-center justify-center text-sm text-ai font-medium">
                    {provider?.tradeName?.charAt(0) || "?"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <p className="text-sm font-medium text-sumi">{provider?.tradeName || provider?.companyName || "不明な業者"}</p>
                      <div className="flex items-center gap-2 shrink-0">
                        {thread.unreadUser! > 0 && (
                          <span className="w-5 h-5 bg-do text-white text-xs flex items-center justify-center">{thread.unreadUser}</span>
                        )}
                        <span className="text-xs text-sumi/40">{thread.lastMessageAt ? timeAgo(thread.lastMessageAt) : ""}</span>
                      </div>
                    </div>
                    <p className="text-xs text-sumi/60 line-clamp-1">{thread.lastMessage}</p>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
