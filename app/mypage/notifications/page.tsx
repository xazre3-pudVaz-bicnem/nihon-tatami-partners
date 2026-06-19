import type { Metadata } from "next";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "お知らせ | マイページ | 日本畳パートナー",
  robots: "noindex,nofollow",
};

const MOCK_NOTIFICATIONS = [
  { id: "n-001", title: "山田畳店から見積もりが届きました", body: "ご依頼の畳表替え（6畳）について、見積もりを送付しました。マイページからご確認ください。", createdAt: "2024-11-20", read: false },
  { id: "n-002", title: "予約が確定しました", body: "11月25日（月）の施工予約が確定しました。当日はお立ち合いをお願いします。", createdAt: "2024-11-18", read: false },
  { id: "n-003", title: "口コミへの返信がありました", body: "投稿した口コミに業者から返信がありました。", createdAt: "2024-11-15", read: true },
  { id: "n-004", title: "施工が完了しました", body: "11月8日の施工が完了としてマークされました。口コミを投稿して業者を評価してください。", createdAt: "2024-11-08", read: true },
];

export default function MypageNotificationsPage() {
  const unreadCount = MOCK_NOTIFICATIONS.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-shiro">
      <div className="bg-sumi">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <p className="text-xs text-white/50 mb-1">
            <Link href="/mypage" className="hover:text-white/80">マイページ</Link>
            {" "}/ お知らせ
          </p>
          <h1 className="text-xl text-white" style={{ fontFamily: "var(--font-serif)" }}>
            お知らせ{unreadCount > 0 && <span className="ml-2 text-sm bg-do text-white px-2 py-0.5">{unreadCount}件未読</span>}
          </h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="space-y-3">
          {MOCK_NOTIFICATIONS.map((n) => (
            <div key={n.id} className={`border p-4 ${n.read ? "bg-white border-border" : "bg-ai/5 border-ai/30"}`}>
              <div className="flex items-start gap-3">
                {!n.read && <span className="w-2 h-2 rounded-full bg-do mt-1.5 shrink-0" />}
                {n.read && <span className="w-2 h-2 mt-1.5 shrink-0" />}
                <div className="flex-1 min-w-0">
                  <h2 className="text-sm text-sumi mb-1">{n.title}</h2>
                  <p className="text-xs text-sumi/60 leading-relaxed mb-2">{n.body}</p>
                  <p className="text-xs text-sumi/30">{formatDate(n.createdAt)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <Link href="/mypage" className="text-xs text-ai hover:underline">
            &larr; マイページに戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
