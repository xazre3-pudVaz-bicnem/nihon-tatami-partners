"use client";

import { useState } from "react";
import { SERVICE_CATEGORIES } from "@/data/categories";
import { SAITAMA_CITIES } from "@/data/cities";

interface Props {
  providerId?: string;
  onSubmit?: (data: Record<string, unknown>) => void;
}

export default function QuoteForm({ providerId, onSubmit }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    workType: "",
    address: "",
    desiredPeriod: "",
    budget: "",
    needsSiteVisit: false,
    clientType: "individual",
    notes: "",
    name: "",
    phone: "",
    email: "",
  });

  const update = (key: string, value: unknown) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) onSubmit({ ...form, providerId });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-white border border-border p-8 text-center">
        <div className="w-12 h-12 border-2 border-igusa flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-igusa" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg text-sumi mb-2" style={{ fontFamily: "var(--font-serif)" }}>見積依頼を送信しました</h3>
        <p className="text-sm text-sumi/60">業者より折り返しご連絡いたします。</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-border">
      <div className="border-b border-border px-5 py-4">
        <h3 className="text-base text-sumi" style={{ fontFamily: "var(--font-serif)" }}>見積・相談依頼</h3>
        <p className="text-xs text-sumi/50 mt-1">現地調査・見積もりは無料です。</p>
      </div>

      <div className="p-5 space-y-4">
        <div>
          <label className="block text-xs text-sumi/60 mb-1.5">工事の種類 <span className="text-do">*</span></label>
          <select
            value={form.workType}
            onChange={(e) => update("workType", e.target.value)}
            required
            className="w-full border border-border text-sm px-3 py-2 focus:outline-none focus:border-ai"
          >
            <option value="">選択してください</option>
            {SERVICE_CATEGORIES.map((c) => (
              <option key={c.slug} value={c.slug}>{c.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs text-sumi/60 mb-1.5">現場の市区町村 <span className="text-do">*</span></label>
          <select
            value={form.address}
            onChange={(e) => update("address", e.target.value)}
            required
            className="w-full border border-border text-sm px-3 py-2 focus:outline-none focus:border-ai"
          >
            <option value="">選択してください</option>
            {SAITAMA_CITIES.map((c) => (
              <option key={c.slug} value={c.name}>{c.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs text-sumi/60 mb-1.5">希望時期</label>
          <select
            value={form.desiredPeriod}
            onChange={(e) => update("desiredPeriod", e.target.value)}
            className="w-full border border-border text-sm px-3 py-2 focus:outline-none focus:border-ai"
          >
            <option value="">いつでも</option>
            <option value="asap">できるだけ早く</option>
            <option value="week">1週間以内</option>
            <option value="month">1ヶ月以内</option>
            <option value="3months">3ヶ月以内</option>
            <option value="undecided">未定</option>
          </select>
        </div>

        <div>
          <label className="block text-xs text-sumi/60 mb-1.5">予算の目安</label>
          <select
            value={form.budget}
            onChange={(e) => update("budget", e.target.value)}
            className="w-full border border-border text-sm px-3 py-2 focus:outline-none focus:border-ai"
          >
            <option value="">未定・相談したい</option>
            <option value="30000">3万円以内</option>
            <option value="50000">5万円以内</option>
            <option value="100000">10万円以内</option>
            <option value="300000">30万円以内</option>
            <option value="over">30万円以上</option>
          </select>
        </div>

        <div>
          <label className="block text-xs text-sumi/60 mb-1.5">依頼者の種別</label>
          <select
            value={form.clientType}
            onChange={(e) => update("clientType", e.target.value)}
            className="w-full border border-border text-sm px-3 py-2 focus:outline-none focus:border-ai"
          >
            <option value="individual">個人（ご自宅）</option>
            <option value="corporate">法人</option>
            <option value="realestate">不動産会社</option>
            <option value="management">管理会社</option>
            <option value="ryokan">旅館・宿泊施設</option>
            <option value="temple">寺院・神社</option>
          </select>
        </div>

        <label className="flex items-center gap-2 text-sm text-sumi/70">
          <input
            type="checkbox"
            checked={form.needsSiteVisit}
            onChange={(e) => update("needsSiteVisit", e.target.checked)}
            className="accent-kincya"
          />
          現地調査を希望する
        </label>

        <div>
          <label className="block text-xs text-sumi/60 mb-1.5">お名前 <span className="text-do">*</span></label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            required
            className="w-full border border-border text-sm px-3 py-2 focus:outline-none focus:border-ai"
          />
        </div>
        <div>
          <label className="block text-xs text-sumi/60 mb-1.5">メールアドレス <span className="text-do">*</span></label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            required
            className="w-full border border-border text-sm px-3 py-2 focus:outline-none focus:border-ai"
          />
        </div>

        <div>
          <label className="block text-xs text-sumi/60 mb-1.5">ご要望・補足</label>
          <textarea
            value={form.notes}
            onChange={(e) => update("notes", e.target.value)}
            rows={3}
            className="w-full border border-border text-sm px-3 py-2 focus:outline-none focus:border-ai resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-ai text-white py-3 text-sm tracking-wider hover:bg-ai-light transition-colors duration-300"
        >
          見積・相談を依頼する
        </button>
      </div>
    </form>
  );
}
