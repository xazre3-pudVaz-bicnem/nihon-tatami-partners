"use client";

import { useState } from "react";
import Link from "next/link";

// マイページ：アカウント設定（利用者）
// TODO: Supabase Auth で各設定を更新
export default function MypageSettingsPage() {
  const [email, setEmail] = useState("tanaka@example.com");
  const [notifyBooking, setNotifyBooking] = useState(true);
  const [notifyMessage, setNotifyMessage] = useState(true);
  const [notifyReviewReply, setNotifyReviewReply] = useState(true);
  const [notifyNews, setNotifyNews] = useState(false);
  const [flash, setFlash] = useState<string | null>(null);

  const show = (msg: string) => {
    setFlash(msg);
    setTimeout(() => setFlash(null), 2500);
  };

  const inputClass = "w-full border border-border text-sm px-3 py-2.5 focus:outline-none focus:border-ai";

  return (
    <div className="min-h-screen bg-shiro">
      <div className="bg-sumi">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <p className="text-xs text-white/50 mb-1">
            <Link href="/mypage" className="hover:text-white/80">マイページ</Link> / 設定
          </p>
          <h1 className="text-xl text-white" style={{ fontFamily: "var(--font-serif)" }}>アカウント設定</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-5">
        {flash && <div className="bg-igusa/10 border border-igusa/30 text-igusa text-sm px-4 py-2">{flash}</div>}

        {/* メール */}
        <section className="bg-white border border-border p-5">
          <h2 className="text-sm font-medium text-sumi mb-3">メールアドレス</h2>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={`${inputClass} mb-3`} />
          <button onClick={() => show("メールアドレスを更新しました（デモ）")} className="bg-ai text-white px-5 py-2 text-sm hover:bg-ai-light transition-colors">
            メールアドレスを更新
          </button>
        </section>

        {/* パスワード */}
        <section className="bg-white border border-border p-5">
          <h2 className="text-sm font-medium text-sumi mb-3">パスワード変更</h2>
          <div className="space-y-3 mb-3">
            <input type="password" placeholder="現在のパスワード" className={inputClass} />
            <input type="password" placeholder="新しいパスワード" className={inputClass} />
            <input type="password" placeholder="新しいパスワード（確認）" className={inputClass} />
          </div>
          <button onClick={() => show("パスワードを変更しました（デモ）")} className="bg-ai text-white px-5 py-2 text-sm hover:bg-ai-light transition-colors">
            パスワードを変更
          </button>
        </section>

        {/* 通知設定 */}
        <section className="bg-white border border-border p-5">
          <h2 className="text-sm font-medium text-sumi mb-3">通知設定</h2>
          <div className="space-y-3">
            {[
              { label: "予約の確定・完了の通知", state: notifyBooking, set: setNotifyBooking },
              { label: "メッセージ受信の通知", state: notifyMessage, set: setNotifyMessage },
              { label: "口コミへの返信の通知", state: notifyReviewReply, set: setNotifyReviewReply },
              { label: "お知らせ・キャンペーン情報", state: notifyNews, set: setNotifyNews },
            ].map((n) => (
              <label key={n.label} className="flex items-center justify-between gap-4 cursor-pointer">
                <span className="text-sm text-sumi/70">{n.label}</span>
                <input type="checkbox" checked={n.state} onChange={(e) => n.set(e.target.checked)} className="accent-kincya w-4 h-4" />
              </label>
            ))}
          </div>
          <button onClick={() => show("通知設定を保存しました（デモ）")} className="mt-4 bg-ai text-white px-5 py-2 text-sm hover:bg-ai-light transition-colors">
            通知設定を保存
          </button>
        </section>

        {/* リンク */}
        <section className="bg-white border border-border p-5">
          <h2 className="text-sm font-medium text-sumi mb-3">その他</h2>
          <div className="flex flex-col gap-2 text-sm">
            <Link href="/mypage/profile" className="text-ai hover:underline">プロフィール編集へ</Link>
            <Link href="/privacy" className="text-ai hover:underline">プライバシーポリシー</Link>
            <Link href="/terms" className="text-ai hover:underline">利用規約</Link>
          </div>
        </section>

        {/* 退会 */}
        <section className="border border-do/30 p-5">
          <h2 className="text-sm font-medium text-do mb-2">退会について</h2>
          <p className="text-xs text-sumi/60 mb-3">退会すると予約履歴・お気に入り・口コミがすべて削除されます。この操作は取り消せません。</p>
          <button className="border border-do text-do px-5 py-2 text-sm hover:bg-do hover:text-white transition-colors">退会手続きへ</button>
        </section>
      </div>
    </div>
  );
}
