import type { Metadata } from "next";
import AdminLayout from "@/components/layout/AdminLayout";

export const metadata: Metadata = {
  title: "設定 | 管理画面 | 日本畳パートナー",
  robots: "noindex,nofollow",
};

export default function AdminSettingsPage() {
  return (
    <AdminLayout currentPath="/admin/settings">
      <div className="max-w-2xl">
        <h1 className="text-xl text-sumi mb-6" style={{ fontFamily: "var(--font-serif)" }}>設定</h1>

        <div className="space-y-5">
          <section className="bg-white border border-border p-5">
            <h2 className="text-sm text-sumi font-medium border-b border-kiji pb-2 mb-4" style={{ fontFamily: "var(--font-serif)" }}>サイト基本設定</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-sumi/60 mb-1.5">サイト名</label>
                <input type="text" defaultValue="日本畳パートナー" className="w-full border border-border text-sm px-3 py-2.5 focus:outline-none focus:border-ai" />
              </div>
              <div>
                <label className="block text-xs text-sumi/60 mb-1.5">サイトURL</label>
                <input type="url" defaultValue="https://nihontatami.jp" className="w-full border border-border text-sm px-3 py-2.5 focus:outline-none focus:border-ai" />
              </div>
              <div>
                <label className="block text-xs text-sumi/60 mb-1.5">お問い合わせメールアドレス</label>
                <input type="email" defaultValue="info@nihontatami.jp" className="w-full border border-border text-sm px-3 py-2.5 focus:outline-none focus:border-ai" />
              </div>
            </div>
          </section>

          <section className="bg-white border border-border p-5">
            <h2 className="text-sm text-sumi font-medium border-b border-kiji pb-2 mb-4" style={{ fontFamily: "var(--font-serif)" }}>プラン設定</h2>
            <div className="space-y-3">
              {[
                { key: "free", label: "無料プラン", desc: "基本機能のみ" },
                { key: "standard", label: "スタンダードプラン", desc: "月額 9,800円" },
                { key: "premium", label: "プレミアムプラン", desc: "月額 29,800円" },
              ].map((plan) => (
                <div key={plan.key} className="flex items-center justify-between border border-kiji p-3">
                  <div>
                    <p className="text-sm text-sumi">{plan.label}</p>
                    <p className="text-xs text-sumi/50">{plan.desc}</p>
                  </div>
                  <button className="text-xs text-ai hover:underline">編集</button>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white border border-border p-5">
            <h2 className="text-sm text-sumi font-medium border-b border-kiji pb-2 mb-4" style={{ fontFamily: "var(--font-serif)" }}>通知設定</h2>
            <div className="space-y-2">
              {[
                "新規業者登録時にメール通知",
                "新規口コミ投稿時にメール通知",
                "お問い合わせ受信時にメール通知",
              ].map((label) => (
                <label key={label} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="accent-kincya" />
                  <span className="text-xs text-sumi">{label}</span>
                </label>
              ))}
            </div>
          </section>

          <button className="w-full bg-ai text-white py-3 text-sm tracking-wider hover:opacity-80 transition-opacity">
            設定を保存する
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}
