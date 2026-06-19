"use client";

import { useState } from "react";
import Link from "next/link";
import { SAITAMA_CITIES } from "@/data/cities";

const MOCK_USER = {
  id: "user-001",
  name: "田中 美咲",
  email: "tanaka@example.com",
  phone: "090-0000-0001",
  prefecture: "埼玉県",
  city: "さいたま市",
};

export default function MypageProfilePage() {
  const [form, setForm] = useState({ ...MOCK_USER });
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Supabase Auth でユーザー情報を更新
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-shiro">
      <div className="bg-sumi">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <p className="text-xs text-white/50 mb-1">
            <Link href="/mypage" className="hover:text-white/80">マイページ</Link>
            {" "}/ プロフィール
          </p>
          <h1 className="text-xl text-white" style={{ fontFamily: "var(--font-serif)" }}>プロフィール編集</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {saved && (
          <div className="mb-4 p-3 bg-igusa/10 border border-igusa text-xs text-igusa">
            プロフィールを保存しました
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="bg-white border border-border p-5 space-y-4">
            <h2 className="text-sm text-sumi font-medium border-b border-kiji pb-2" style={{ fontFamily: "var(--font-serif)" }}>基本情報</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-sumi/60 mb-1.5">お名前</label>
                <input type="text" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className="w-full border border-border text-sm px-3 py-2.5 focus:outline-none focus:border-ai" />
              </div>
              <div>
                <label className="block text-xs text-sumi/60 mb-1.5">電話番号</label>
                <input type="tel" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} className="w-full border border-border text-sm px-3 py-2.5 focus:outline-none focus:border-ai" />
              </div>
              <div>
                <label className="block text-xs text-sumi/60 mb-1.5">居住市区町村</label>
                <select value={form.city} onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))} className="w-full border border-border text-sm px-3 py-2.5 focus:outline-none focus:border-ai">
                  {SAITAMA_CITIES.map((c) => <option key={c.slug} value={c.name}>{c.name}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white border border-border p-5 space-y-4">
            <h2 className="text-sm text-sumi font-medium border-b border-kiji pb-2" style={{ fontFamily: "var(--font-serif)" }}>メールアドレス・パスワード</h2>
            <div>
              <label className="block text-xs text-sumi/60 mb-1.5">メールアドレス</label>
              <input type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} className="w-full border border-border text-sm px-3 py-2.5 focus:outline-none focus:border-ai" />
            </div>
            <div>
              <label className="block text-xs text-sumi/60 mb-1.5">新しいパスワード（変更する場合のみ入力）</label>
              <input type="password" placeholder="8文字以上" className="w-full border border-border text-sm px-3 py-2.5 focus:outline-none focus:border-ai" />
            </div>
          </div>

          <button type="submit" className="w-full bg-ai text-white py-3 text-sm tracking-wider hover:opacity-80 transition-opacity">
            変更を保存する
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-kiji">
          <p className="text-xs text-sumi/50 mb-2">退会する場合はお問い合わせください。</p>
          <Link href="/contact" className="text-xs text-do hover:underline">退会申請</Link>
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
