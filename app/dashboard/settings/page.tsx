"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";

// アカウント設定（業者）
// TODO: Supabase移行後は保存をServer Actionに変更
export default function DashboardSettingsPage() {
  const [email, setEmail] = useState("yamada@example.com");
  const [notifyNew, setNotifyNew] = useState(true);
  const [notifyMessage, setNotifyMessage] = useState(true);
  const [notifyReview, setNotifyReview] = useState(true);
  const [notifyNews, setNotifyNews] = useState(false);
  const [saved, setSaved] = useState<string | null>(null);

  const flash = (msg: string) => {
    setSaved(msg);
    setTimeout(() => setSaved(null), 2500);
  };

  return (
    <DashboardLayout currentPath="/dashboard/settings">
      <div className="max-w-2xl">
        <h1 className="text-xl text-sumi mb-6" style={{ fontFamily: "var(--font-serif)" }}>アカウント設定</h1>

        {saved && <div className="bg-igusa/10 border border-igusa/30 text-igusa text-sm px-4 py-2 mb-5">{saved}</div>}

        {/* メールアドレス */}
        <section className="bg-white border border-border p-5 mb-5">
          <h2 className="text-sm font-medium text-sumi mb-3">メールアドレス</h2>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-border text-sm px-3 py-2.5 focus:outline-none focus:border-ai mb-3"
          />
          <button onClick={() => flash("メールアドレスを更新しました（デモ）")} className="bg-ai text-white px-5 py-2 text-sm hover:bg-ai-light transition-colors">
            メールアドレスを更新
          </button>
        </section>

        {/* パスワード変更 */}
        <section className="bg-white border border-border p-5 mb-5">
          <h2 className="text-sm font-medium text-sumi mb-3">パスワード変更</h2>
          <div className="space-y-3 mb-3">
            <input type="password" placeholder="現在のパスワード" className="w-full border border-border text-sm px-3 py-2.5 focus:outline-none focus:border-ai" />
            <input type="password" placeholder="新しいパスワード" className="w-full border border-border text-sm px-3 py-2.5 focus:outline-none focus:border-ai" />
            <input type="password" placeholder="新しいパスワード（確認）" className="w-full border border-border text-sm px-3 py-2.5 focus:outline-none focus:border-ai" />
          </div>
          <button onClick={() => flash("パスワードを変更しました（デモ）")} className="bg-ai text-white px-5 py-2 text-sm hover:bg-ai-light transition-colors">
            パスワードを変更
          </button>
        </section>

        {/* 通知設定 */}
        <section className="bg-white border border-border p-5 mb-5">
          <h2 className="text-sm font-medium text-sumi mb-3">通知設定</h2>
          <div className="space-y-3">
            {[
              { label: "新規予約・問い合わせの通知", state: notifyNew, set: setNotifyNew },
              { label: "メッセージ受信の通知", state: notifyMessage, set: setNotifyMessage },
              { label: "口コミ投稿の通知", state: notifyReview, set: setNotifyReview },
              { label: "お知らせ・キャンペーン情報", state: notifyNews, set: setNotifyNews },
            ].map((n) => (
              <label key={n.label} className="flex items-center justify-between gap-4 cursor-pointer">
                <span className="text-sm text-sumi/70">{n.label}</span>
                <input type="checkbox" checked={n.state} onChange={(e) => n.set(e.target.checked)} className="accent-kincya w-4 h-4" />
              </label>
            ))}
          </div>
          <button onClick={() => flash("通知設定を保存しました（デモ）")} className="mt-4 bg-ai text-white px-5 py-2 text-sm hover:bg-ai-light transition-colors">
            通知設定を保存
          </button>
        </section>

        {/* 退会 */}
        <section className="border border-do/30 p-5">
          <h2 className="text-sm font-medium text-do mb-2">アカウントの退会</h2>
          <p className="text-xs text-sumi/60 mb-3">退会すると掲載情報・口コミ・予約履歴がすべて削除されます。この操作は取り消せません。</p>
          <button className="border border-do text-do px-5 py-2 text-sm hover:bg-do hover:text-white transition-colors">
            退会手続きへ
          </button>
        </section>
      </div>
    </DashboardLayout>
  );
}
