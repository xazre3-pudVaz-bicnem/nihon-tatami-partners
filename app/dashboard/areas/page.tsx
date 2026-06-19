"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { SAITAMA_CITIES } from "@/data/cities";

// 対応エリア設定（業者ダッシュボード）
// TODO: Supabase移行後は保存をServer Actionに変更
const AREA_GROUPS = [
  { label: "東京近郊", ids: ["kawaguchi", "warabi", "toda", "soka", "misato", "yashio", "asaka", "wako", "niiza"] },
  { label: "さいたま・中部", ids: ["saitama", "ageo", "fujimi", "fujimino", "shiki", "kounosu"] },
  { label: "西部・川越", ids: ["kawagoe", "tokorozawa", "sayama", "iruma", "hanno", "higashimatsuyama"] },
  { label: "東部・春日部", ids: ["koshigaya", "kasukabe", "kuki", "gyoda", "kazo", "hanyu"] },
  { label: "北部・秩父", ids: ["kumagaya", "fukaya", "honjo", "chichibu"] },
];

export default function DashboardAreasPage() {
  const [selected, setSelected] = useState<string[]>(["saitama", "kawaguchi", "warabi", "toda", "ageo", "asaka"]);
  const [saved, setSaved] = useState(false);

  const cityById = (id: string) => SAITAMA_CITIES.find((c) => c.id === id);
  const toggle = (id: string) => {
    setSaved(false);
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };
  const toggleGroup = (ids: string[]) => {
    setSaved(false);
    const allSelected = ids.every((id) => selected.includes(id));
    setSelected((prev) => (allSelected ? prev.filter((x) => !ids.includes(x)) : Array.from(new Set([...prev, ...ids]))));
  };

  return (
    <DashboardLayout currentPath="/dashboard/areas">
      <div>
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-xl text-sumi" style={{ fontFamily: "var(--font-serif)" }}>対応エリア設定</h1>
          <span className="text-sm text-sumi/50">{selected.length}市区町村を選択中</span>
        </div>
        <p className="text-sm text-sumi/60 mb-6">対応できる市区町村を選択してください。検索結果や地域ページに表示されます。</p>

        <div className="space-y-5">
          {AREA_GROUPS.map((g) => {
            const allSelected = g.ids.every((id) => selected.includes(id));
            return (
              <div key={g.label} className="bg-white border border-border p-5">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-medium text-sumi">{g.label}</h2>
                  <button onClick={() => toggleGroup(g.ids)} className="text-xs text-ai hover:underline">
                    {allSelected ? "すべて解除" : "すべて選択"}
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {g.ids.map((id) => {
                    const city = cityById(id);
                    if (!city) return null;
                    const checked = selected.includes(id);
                    return (
                      <label key={id} className={`flex items-center gap-2 cursor-pointer border px-3 py-2 text-sm transition-colors ${checked ? "border-kincya bg-kincya/5 text-kincya" : "border-border text-sumi/70 hover:border-kincya/30"}`}>
                        <input type="checkbox" checked={checked} onChange={() => toggle(id)} className="accent-kincya" />
                        {city.name}
                      </label>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-3 mt-6">
          <button onClick={() => setSaved(true)} className="bg-kincya text-white px-6 py-3 text-sm hover:bg-do transition-colors">
            対応エリアを保存
          </button>
          {saved && <span className="text-sm text-igusa">保存しました（デモ）</span>}
        </div>
      </div>
    </DashboardLayout>
  );
}
