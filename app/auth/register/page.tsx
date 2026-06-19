"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SAITAMA_CITIES } from "@/data/cities";

export default function RegisterPage() {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    prefecture: "埼玉県",
    city: "",
    agreeTerms: false,
    agreePrivacy: false,
  });
  const [errors, setErrors] = useState<string[]>([]);

  const validate = () => {
    const errs: string[] = [];
    if (!form.name) errs.push("お名前を入力してください");
    if (!form.email) errs.push("メールアドレスを入力してください");
    if (form.password.length < 8) errs.push("パスワードは8文字以上で入力してください");
    if (form.password !== form.password2) errs.push("パスワードが一致しません");
    if (!form.agreeTerms || !form.agreePrivacy) errs.push("利用規約とプライバシーポリシーに同意してください");
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (errs.length > 0) { setErrors(errs); return; }
    // TODO: Supabase Auth / Auth.js で会員登録処理
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-cloud flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white border border-border p-8 text-center">
          <div className="w-12 h-12 border-2 border-igusa flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-igusa" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-lg text-sumi mb-2" style={{ fontFamily: "var(--font-serif)" }}>会員登録が完了しました</h2>
          <p className="text-sm text-sumi/60 mb-6">確認メールをお送りしましたので、メール内のリンクからログインしてください。</p>
          <Link href="/auth/login" className="text-sm text-ai border border-ai px-6 py-2 hover:bg-ai hover:text-white transition-all duration-300 inline-block">
            ログインする
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cloud flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl text-sumi" style={{ fontFamily: "var(--font-serif)" }}>日本畳パートナー</Link>
        </div>

        <div className="bg-white border border-border p-8">
          <h1 className="text-lg text-sumi mb-6" style={{ fontFamily: "var(--font-serif)" }}>会員登録</h1>

          {errors.length > 0 && (
            <div className="mb-4 p-3 bg-do/5 border border-do/20">
              {errors.map((e) => <p key={e} className="text-xs text-do">{e}</p>)}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs text-sumi/60 mb-1.5">お名前 <span className="text-do">*</span></label>
              <input type="text" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} required placeholder="山田 太郎" className="w-full border border-border text-sm px-3 py-2.5 focus:outline-none focus:border-ai" />
            </div>
            <div>
              <label className="block text-xs text-sumi/60 mb-1.5">メールアドレス <span className="text-do">*</span></label>
              <input type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} required placeholder="example@email.com" className="w-full border border-border text-sm px-3 py-2.5 focus:outline-none focus:border-ai" />
            </div>
            <div>
              <label className="block text-xs text-sumi/60 mb-1.5">パスワード（8文字以上） <span className="text-do">*</span></label>
              <input type="password" value={form.password} onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))} required minLength={8} className="w-full border border-border text-sm px-3 py-2.5 focus:outline-none focus:border-ai" />
            </div>
            <div>
              <label className="block text-xs text-sumi/60 mb-1.5">パスワード（確認） <span className="text-do">*</span></label>
              <input type="password" value={form.password2} onChange={(e) => setForm((f) => ({ ...f, password2: e.target.value }))} required className="w-full border border-border text-sm px-3 py-2.5 focus:outline-none focus:border-ai" />
            </div>
            <div>
              <label className="block text-xs text-sumi/60 mb-1.5">お住まいの市区町村</label>
              <select value={form.city} onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))} className="w-full border border-border text-sm px-3 py-2.5 focus:outline-none focus:border-ai">
                <option value="">選択してください（任意）</option>
                {SAITAMA_CITIES.map((c) => <option key={c.slug} value={c.name}>{c.name}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="flex items-start gap-2 cursor-pointer">
                <input type="checkbox" checked={form.agreeTerms} onChange={(e) => setForm((f) => ({ ...f, agreeTerms: e.target.checked }))} className="accent-kincya mt-0.5" />
                <span className="text-xs text-sumi/70"><Link href="/terms" className="text-ai hover:underline">利用規約</Link>に同意します</span>
              </label>
              <label className="flex items-start gap-2 cursor-pointer">
                <input type="checkbox" checked={form.agreePrivacy} onChange={(e) => setForm((f) => ({ ...f, agreePrivacy: e.target.checked }))} className="accent-kincya mt-0.5" />
                <span className="text-xs text-sumi/70"><Link href="/privacy" className="text-ai hover:underline">プライバシーポリシー</Link>に同意します</span>
              </label>
            </div>
            <button type="submit" className="w-full bg-kincya text-white py-3 text-sm tracking-wider hover:bg-do transition-colors duration-300">
              会員登録する
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-kiji text-center">
            <p className="text-xs text-sumi/50 mb-3">すでにアカウントをお持ちの方</p>
            <Link href="/auth/login" className="text-sm text-ai hover:underline">ログインする →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
