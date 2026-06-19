"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { MOCK_PROVIDERS } from "@/data/providers";
import { SAITAMA_CITIES } from "@/data/cities";

const MOCK_PROVIDER = MOCK_PROVIDERS[0];

export default function DashboardProfilePage() {
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    tradeName: MOCK_PROVIDER.tradeName || "",
    companyName: MOCK_PROVIDER.companyName,
    introduction: MOCK_PROVIDER.introduction,
    strengths: (MOCK_PROVIDER.strengths || []).join("\n"),
    city: MOCK_PROVIDER.city,
    phone: MOCK_PROVIDER.phone,
    hasInsurance: MOCK_PROVIDER.hasInsurance,
    hasEstimateFree: MOCK_PROVIDER.hasEstimateFree,
    canSameDayResponse: MOCK_PROVIDER.canSameDayResponse,
    canWeekendResponse: MOCK_PROVIDER.canWeekendResponse,
    acceptsCorporate: MOCK_PROVIDER.acceptsCorporate,
    acceptsRyokan: MOCK_PROVIDER.acceptsRyokan,
    acceptsTempleShrine: MOCK_PROVIDER.acceptsTempleShrine,
    acceptsRealEstate: MOCK_PROVIDER.acceptsRealEstate,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Supabase/Prisma でプロフィールを更新
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <DashboardLayout currentPath="/dashboard/profile">
      <div className="max-w-2xl">
        <h1 className="text-xl text-sumi mb-6" style={{ fontFamily: "var(--font-serif)" }}>プロフィール編集</h1>

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
                <label className="block text-xs text-sumi/60 mb-1.5">表示名（屋号）</label>
                <input type="text" value={form.tradeName} onChange={(e) => setForm((f) => ({ ...f, tradeName: e.target.value }))} className="w-full border border-border text-sm px-3 py-2.5 focus:outline-none focus:border-ai" />
              </div>
              <div>
                <label className="block text-xs text-sumi/60 mb-1.5">会社名</label>
                <input type="text" value={form.companyName} onChange={(e) => setForm((f) => ({ ...f, companyName: e.target.value }))} className="w-full border border-border text-sm px-3 py-2.5 focus:outline-none focus:border-ai" />
              </div>
              <div>
                <label className="block text-xs text-sumi/60 mb-1.5">所在市区町村</label>
                <select value={form.city} onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))} className="w-full border border-border text-sm px-3 py-2.5 focus:outline-none focus:border-ai">
                  {SAITAMA_CITIES.map((c) => <option key={c.slug} value={c.name}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs text-sumi/60 mb-1.5">電話番号</label>
                <input type="tel" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} className="w-full border border-border text-sm px-3 py-2.5 focus:outline-none focus:border-ai" />
              </div>
            </div>
          </div>

          <div className="bg-white border border-border p-5 space-y-4">
            <h2 className="text-sm text-sumi font-medium border-b border-kiji pb-2" style={{ fontFamily: "var(--font-serif)" }}>自己紹介・強み</h2>
            <div>
              <label className="block text-xs text-sumi/60 mb-1.5">自己紹介文</label>
              <textarea value={form.introduction} onChange={(e) => setForm((f) => ({ ...f, introduction: e.target.value }))} rows={5} className="w-full border border-border text-sm px-3 py-2.5 focus:outline-none focus:border-ai resize-none" />
            </div>
            <div>
              <label className="block text-xs text-sumi/60 mb-1.5">強み・特徴（1行1項目）</label>
              <textarea value={form.strengths} onChange={(e) => setForm((f) => ({ ...f, strengths: e.target.value }))} rows={4} placeholder={"例：創業40年の確かな技術\n国産い草のみを使用"} className="w-full border border-border text-sm px-3 py-2.5 focus:outline-none focus:border-ai resize-none" />
            </div>
          </div>

          <div className="bg-white border border-border p-5">
            <h2 className="text-sm text-sumi font-medium border-b border-kiji pb-2 mb-4" style={{ fontFamily: "var(--font-serif)" }}>サービスオプション</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { key: "hasEstimateFree", label: "無料見積もり" },
                { key: "canSameDayResponse", label: "即日対応可" },
                { key: "canWeekendResponse", label: "土日祝対応可" },
                { key: "hasInsurance", label: "損害賠償保険加入" },
                { key: "acceptsCorporate", label: "法人対応可" },
                { key: "acceptsRyokan", label: "旅館・ホテル対応" },
                { key: "acceptsTempleShrine", label: "寺社仏閣対応" },
                { key: "acceptsRealEstate", label: "不動産会社対応" },
              ].map((opt) => (
                <label key={opt.key} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form[opt.key as keyof typeof form] as boolean}
                    onChange={(e) => setForm((f) => ({ ...f, [opt.key]: e.target.checked }))}
                    className="accent-kincya"
                  />
                  <span className="text-xs text-sumi">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          <button type="submit" className="w-full bg-ai text-white py-3 text-sm tracking-wider hover:bg-ai-light transition-colors duration-300">
            変更を保存する
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}
