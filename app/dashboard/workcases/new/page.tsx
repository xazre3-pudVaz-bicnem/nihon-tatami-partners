"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { SERVICE_CATEGORIES } from "@/data/categories";

export default function NewWorkcasePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    categorySlug: "",
    cityName: "",
    buildingType: "house",
    tatamiFlex: "",
    estimatedCostLabel: "",
    workingDays: "",
    description: "",
    point: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Supabase/Prisma で施工事例を保存
    router.push("/dashboard/workcases");
  };

  return (
    <DashboardLayout currentPath="/dashboard/workcases">
      <div className="max-w-2xl">
        <h1 className="text-xl text-sumi mb-6" style={{ fontFamily: "var(--font-serif)" }}>施工事例を追加</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="bg-white border border-border p-5 space-y-4">
            <h2 className="text-sm text-sumi font-medium border-b border-kiji pb-2" style={{ fontFamily: "var(--font-serif)" }}>基本情報</h2>
            <div>
              <label className="block text-xs text-sumi/60 mb-1.5">タイトル <span className="text-do">*</span></label>
              <input type="text" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} required placeholder="例：さいたま市 6畳 畳表替え（国産い草・目積み）" className="w-full border border-border text-sm px-3 py-2.5 focus:outline-none focus:border-ai" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-sumi/60 mb-1.5">施工カテゴリ</label>
                <select value={form.categorySlug} onChange={(e) => setForm((f) => ({ ...f, categorySlug: e.target.value }))} className="w-full border border-border text-sm px-3 py-2.5 focus:outline-none focus:border-ai">
                  <option value="">選択してください</option>
                  {SERVICE_CATEGORIES.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs text-sumi/60 mb-1.5">施工エリア</label>
                <input type="text" value={form.cityName} onChange={(e) => setForm((f) => ({ ...f, cityName: e.target.value }))} placeholder="例：さいたま市浦和区" className="w-full border border-border text-sm px-3 py-2.5 focus:outline-none focus:border-ai" />
              </div>
              <div>
                <label className="block text-xs text-sumi/60 mb-1.5">建物種別</label>
                <select value={form.buildingType} onChange={(e) => setForm((f) => ({ ...f, buildingType: e.target.value }))} className="w-full border border-border text-sm px-3 py-2.5 focus:outline-none focus:border-ai">
                  {[["house","一般住宅（戸建て）"],["apartment","マンション・アパート"],["ryokan","旅館・ホテル"],["temple","寺社仏閣"],["rental","不動産物件"]].map(([v,l]) => <option key={v} value={v}>{l}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs text-sumi/60 mb-1.5">畳の枚数</label>
                <input type="text" value={form.tatamiFlex} onChange={(e) => setForm((f) => ({ ...f, tatamiFlex: e.target.value }))} placeholder="例：6" className="w-full border border-border text-sm px-3 py-2.5 focus:outline-none focus:border-ai" />
              </div>
              <div>
                <label className="block text-xs text-sumi/60 mb-1.5">費用概算</label>
                <input type="text" value={form.estimatedCostLabel} onChange={(e) => setForm((f) => ({ ...f, estimatedCostLabel: e.target.value }))} placeholder="例：40,000〜55,000円" className="w-full border border-border text-sm px-3 py-2.5 focus:outline-none focus:border-ai" />
              </div>
              <div>
                <label className="block text-xs text-sumi/60 mb-1.5">施工日数</label>
                <input type="number" value={form.workingDays} onChange={(e) => setForm((f) => ({ ...f, workingDays: e.target.value }))} placeholder="例：1" className="w-full border border-border text-sm px-3 py-2.5 focus:outline-none focus:border-ai" />
              </div>
            </div>
          </div>

          <div className="bg-white border border-border p-5 space-y-4">
            <h2 className="text-sm text-sumi font-medium border-b border-kiji pb-2" style={{ fontFamily: "var(--font-serif)" }}>施工内容・写真</h2>
            <div>
              <label className="block text-xs text-sumi/60 mb-1.5">施工説明</label>
              <textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} rows={4} placeholder="施工内容、使用した素材、こだわりなどを詳しく説明してください" className="w-full border border-border text-sm px-3 py-2.5 focus:outline-none focus:border-ai resize-none" />
            </div>
            <div>
              <label className="block text-xs text-sumi/60 mb-1.5">施工のポイント</label>
              <textarea value={form.point} onChange={(e) => setForm((f) => ({ ...f, point: e.target.value }))} rows={2} placeholder="特筆すべき工夫や注意点" className="w-full border border-border text-sm px-3 py-2.5 focus:outline-none focus:border-ai resize-none" />
            </div>
            <div>
              <label className="block text-xs text-sumi/60 mb-1.5">施工前・後の写真（TODO: ファイルアップロード実装）</label>
              <div className="border-2 border-dashed border-kiji p-6 text-center text-sm text-sumi/40">
                クリックして写真をアップロード（最大10枚）
                {/* TODO: input type="file" + Supabase Storage アップロード */}
              </div>
            </div>
          </div>

          <button type="submit" className="w-full bg-ai text-white py-3 text-sm tracking-wider hover:bg-ai-light transition-colors duration-300">
            施工事例を保存する
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}
