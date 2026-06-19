import Link from "next/link";
import { ReactNode } from "react";

interface NavItem {
  label: string;
  href: string;
  badge?: number;
}

const ADMIN_NAV: { group: string; items: NavItem[] }[] = [
  {
    group: "概要",
    items: [{ label: "ダッシュボード", href: "/admin" }],
  },
  {
    group: "業者管理",
    items: [
      { label: "業者一覧", href: "/admin/providers" },
      { label: "業者審査", href: "/admin/providers/review" },
      { label: "サービス管理", href: "/admin/services" },
      { label: "カテゴリ管理", href: "/admin/categories" },
    ],
  },
  {
    group: "ユーザー",
    items: [
      { label: "ユーザー管理", href: "/admin/users" },
      { label: "口コミ管理", href: "/admin/reviews" },
      { label: "違反報告", href: "/admin/reports" },
    ],
  },
  {
    group: "予約・見積",
    items: [
      { label: "問い合わせ管理", href: "/admin/contacts" },
      { label: "予約管理", href: "/admin/bookings" },
      { label: "見積管理", href: "/admin/quotes" },
    ],
  },
  {
    group: "コンテンツ",
    items: [
      { label: "SEOページ管理", href: "/admin/seo-pages" },
      { label: "地域ページ管理", href: "/admin/cities" },
      { label: "お知らせ管理", href: "/admin/news" },
      { label: "ヘルプ記事", href: "/admin/help" },
      { label: "FAQ管理", href: "/admin/faqs" },
    ],
  },
  {
    group: "運営",
    items: [
      { label: "掲載業者の選定", href: "/admin/ranking" },
      { label: "広告枠管理", href: "/admin/ads" },
      { label: "CSV出力", href: "/admin/export" },
      { label: "サイト設定", href: "/admin/settings" },
    ],
  },
];

interface Props {
  children: ReactNode;
  currentPath: string;
}

export default function AdminLayout({ children, currentPath }: Props) {
  return (
    <div className="min-h-screen bg-cloud">
      {/* 管理者ヘッダー */}
      <div className="bg-sumi text-white px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-full flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-white/50 hover:text-white transition-colors">
              日本畳パートナー
            </Link>
            <span className="text-white/20">|</span>
            <span className="text-sm text-white font-medium">管理者画面</span>
          </div>
          <button className="text-xs text-white/50 hover:text-white transition-colors">
            ログアウト
          </button>
        </div>
      </div>

      <div className="flex">
        {/* サイドバー */}
        <aside className="w-56 shrink-0 min-h-screen bg-white border-r border-border hidden lg:block">
          <nav className="py-2">
            {ADMIN_NAV.map((section) => (
              <div key={section.group} className="mb-2">
                <p className="text-xs text-sumi/40 px-4 py-2 uppercase tracking-wider">{section.group}</p>
                {section.items.map((item) => {
                  const isActive = currentPath === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center justify-between px-4 py-2.5 text-sm transition-colors ${
                        isActive ? "bg-ai text-white" : "text-sumi hover:bg-kiji"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            ))}
          </nav>
        </aside>

        {/* メインコンテンツ */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
