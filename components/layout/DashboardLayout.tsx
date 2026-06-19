import Link from "next/link";
import { ReactNode } from "react";

interface NavItem {
  label: string;
  href: string;
  badge?: number;
}

const PROVIDER_NAV: NavItem[] = [
  { label: "ダッシュボード", href: "/dashboard" },
  { label: "プロフィール編集", href: "/dashboard/profile" },
  { label: "サービス管理", href: "/dashboard/services" },
  { label: "予約管理", href: "/dashboard/bookings" },
  { label: "見積管理", href: "/dashboard/quotes" },
  { label: "メッセージ", href: "/dashboard/messages" },
  { label: "口コミ管理", href: "/dashboard/reviews" },
  { label: "写真管理", href: "/dashboard/photos" },
  { label: "施工事例", href: "/dashboard/workcases" },
  { label: "反響レポート", href: "/dashboard/reports" },
  { label: "掲載プラン", href: "/dashboard/plan" },
];

interface Props {
  children: ReactNode;
  currentPath: string;
  providerName?: string;
  plan?: string;
  unreadMessages?: number;
  pendingBookings?: number;
}

export default function DashboardLayout({
  children,
  currentPath,
  providerName = "業者名",
  plan = "free",
  unreadMessages = 0,
  pendingBookings = 0,
}: Props) {
  const planLabel = plan === "premium" ? "プレミアム" : plan === "standard" ? "スタンダード" : "無料";
  const planColor = plan === "premium" ? "text-kincya" : plan === "standard" ? "text-ai" : "text-sumi/50";

  return (
    <div className="min-h-screen bg-cloud">
      {/* ダッシュボードヘッダー */}
      <div className="bg-ai text-white px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-white/60 hover:text-white transition-colors">
              ← サイトトップへ
            </Link>
            <span className="text-white/20">|</span>
            <span className="text-sm text-white">{providerName}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className={`text-xs font-medium ${planColor}`}>{planLabel}プラン</span>
            <Link href="/dashboard/plan" className="text-xs text-kincya hover:underline">
              {plan === "free" ? "プランを変更" : "プラン確認"}
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* サイドバー */}
          <aside className="w-56 shrink-0 hidden lg:block">
            <nav className="bg-white border border-border">
              {PROVIDER_NAV.map((item) => {
                const isActive = currentPath === item.href;
                const badge =
                  item.href === "/dashboard/messages" ? unreadMessages :
                  item.href === "/dashboard/bookings" ? pendingBookings : 0;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between px-4 py-3 text-sm border-b border-kiji last:border-0 transition-colors ${
                      isActive ? "bg-ai text-white" : "text-sumi hover:bg-kiji"
                    }`}
                  >
                    {item.label}
                    {badge > 0 && (
                      <span className="w-5 h-5 bg-do text-white text-xs flex items-center justify-center">
                        {badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </aside>

          {/* メインコンテンツ */}
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
    </div>
  );
}
