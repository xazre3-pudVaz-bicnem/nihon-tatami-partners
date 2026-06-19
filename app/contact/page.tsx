"use client";

import { useState } from "react";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import Link from "next/link";

const INQUIRY_TYPES = [
  "業者選びについて相談したい",
  "見積もりの価格について",
  "業者とのトラブル",
  "サービスへのご意見・ご要望",
  "業者として掲載したい",
  "その他",
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    type: "",
    message: "",
    agree: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "お名前を入力してください";
    if (!form.email.trim()) e.email = "メールアドレスを入力してください";
    if (!form.type) e.type = "お問い合わせ種別を選択してください";
    if (form.message.trim().length < 10) e.message = "10文字以上でお問い合わせ内容を入力してください";
    if (!form.agree) e.agree = "プライバシーポリシーへの同意が必要です";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    // TODO: メール送信 or Supabase へ問い合わせ保存
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-shiro flex items-center justify-center">
        <div className="text-center p-12">
          <p className="text-lg text-sumi mb-2" style={{ fontFamily: "var(--font-serif)" }}>お問い合わせを受け付けました</p>
          <p className="text-sm text-sumi/60 mb-6">2営業日以内にご登録のメールアドレスへご返信します。</p>
          <Link href="/" className="text-sm text-ai hover:underline">トップページへ戻る</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-shiro">
      <div className="bg-sumi">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumbs items={[{ label: "トップ", href: "/" }, { label: "お問い合わせ" }]} />
        </div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 pt-2">
          <h1 className="text-2xl text-white" style={{ fontFamily: "var(--font-serif)" }}>お問い合わせ</h1>
          <p className="text-sm text-white/60 mt-1">2営業日以内にご返信します</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="bg-white border border-border p-5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-sumi/60 mb-1.5">お名前 <span className="text-do">*</span></label>
                <input type="text" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className={`w-full border text-sm px-3 py-2.5 focus:outline-none focus:border-ai ${errors.name ? "border-do" : "border-border"}`} />
                {errors.name && <p className="text-xs text-do mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-xs text-sumi/60 mb-1.5">電話番号（任意）</label>
                <input type="tel" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} className="w-full border border-border text-sm px-3 py-2.5 focus:outline-none focus:border-ai" />
              </div>
            </div>
            <div>
              <label className="block text-xs text-sumi/60 mb-1.5">メールアドレス <span className="text-do">*</span></label>
              <input type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} className={`w-full border text-sm px-3 py-2.5 focus:outline-none focus:border-ai ${errors.email ? "border-do" : "border-border"}`} />
              {errors.email && <p className="text-xs text-do mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-xs text-sumi/60 mb-1.5">お問い合わせ種別 <span className="text-do">*</span></label>
              <select value={form.type} onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))} className={`w-full border text-sm px-3 py-2.5 focus:outline-none focus:border-ai ${errors.type ? "border-do" : "border-border"}`}>
                <option value="">選択してください</option>
                {INQUIRY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
              {errors.type && <p className="text-xs text-do mt-1">{errors.type}</p>}
            </div>
            <div>
              <label className="block text-xs text-sumi/60 mb-1.5">お問い合わせ内容 <span className="text-do">*</span></label>
              <textarea value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))} rows={6} placeholder="お問い合わせ内容をできるだけ詳しくお書きください" className={`w-full border text-sm px-3 py-2.5 focus:outline-none focus:border-ai resize-none ${errors.message ? "border-do" : "border-border"}`} />
              {errors.message && <p className="text-xs text-do mt-1">{errors.message}</p>}
            </div>
            <div>
              <label className="flex items-start gap-2 cursor-pointer">
                <input type="checkbox" checked={form.agree} onChange={(e) => setForm((f) => ({ ...f, agree: e.target.checked }))} className="accent-ai mt-0.5" />
                <span className="text-xs text-sumi/70">
                  <Link href="/privacy" className="text-ai hover:underline">プライバシーポリシー</Link>
                  に同意します
                </span>
              </label>
              {errors.agree && <p className="text-xs text-do mt-1">{errors.agree}</p>}
            </div>
          </div>

          <button type="submit" className="w-full bg-ai text-white py-3 text-sm tracking-wider hover:opacity-80 transition-opacity">
            送信する
          </button>
        </form>
      </div>
    </div>
  );
}
