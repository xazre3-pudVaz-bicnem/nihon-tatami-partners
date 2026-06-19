"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "", role: "user" });
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Supabase Auth / Auth.js による認証を実装
    if (form.email && form.password) {
      if (form.role === "provider") router.push("/dashboard");
      else if (form.role === "admin") router.push("/admin");
      else router.push("/mypage");
    } else {
      setError("メールアドレスとパスワードを入力してください");
    }
  };

  return (
    <div className="min-h-screen bg-cloud flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl text-sumi" style={{ fontFamily: "var(--font-serif)" }}>
            日本畳パートナー
          </Link>
          <p className="text-xs text-sumi/50 mt-2">埼玉県の畳・和室工事専門プラットフォーム</p>
        </div>

        <div className="bg-white border border-border p-8">
          <h1 className="text-lg text-sumi mb-6" style={{ fontFamily: "var(--font-serif)" }}>ログイン</h1>

          {/* デモ用ロール切り替え（本番では削除） */}
          <div className="mb-5 p-3 bg-kiji/50 border border-border text-xs text-sumi/60">
            <p className="mb-2 font-medium">デモ用：ログイン先を選択</p>
            <div className="flex gap-2">
              {[
                { value: "user", label: "一般ユーザー" },
                { value: "provider", label: "業者" },
                { value: "admin", label: "管理者" },
              ].map((opt) => (
                <label key={opt.value} className="flex items-center gap-1">
                  <input type="radio" name="role" value={opt.value} checked={form.role === opt.value} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))} />
                  {opt.label}
                </label>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="text-xs text-do bg-do/5 border border-do/20 px-3 py-2">{error}</p>}

            <div>
              <label className="block text-xs text-sumi/60 mb-1.5">メールアドレス</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                required
                placeholder="example@email.com"
                className="w-full border border-border text-sm px-3 py-2.5 focus:outline-none focus:border-ai"
              />
            </div>

            <div>
              <label className="block text-xs text-sumi/60 mb-1.5">パスワード</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                required
                placeholder="••••••••"
                className="w-full border border-border text-sm px-3 py-2.5 focus:outline-none focus:border-ai"
              />
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-sumi/60">
                <input type="checkbox" className="accent-kincya" /> ログイン状態を保持する
              </label>
              <Link href="/auth/forgot-password" className="text-ai hover:underline">
                パスワードを忘れた方
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-ai text-white py-3 text-sm tracking-wider hover:bg-ai-light transition-colors duration-300"
            >
              ログイン
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-kiji text-center">
            <p className="text-xs text-sumi/50 mb-3">アカウントをお持ちでない方</p>
            <Link href="/auth/register" className="text-sm text-ai border border-ai hover:bg-ai hover:text-white transition-all duration-300 px-6 py-2 inline-block">
              新規会員登録
            </Link>
          </div>

          <div className="mt-4 text-center">
            <Link href="/pro/register" className="text-xs text-sumi/50 hover:text-ai transition-colors">
              業者として登録する方はこちら →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
