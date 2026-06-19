"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { SERVICE_CATEGORIES } from "@/data/categories";
import { MOCK_PROVIDERS } from "@/data/providers";

const MOCK_PROVIDER = MOCK_PROVIDERS[0];

export default function DashboardServicesPage() {
  // TODO: Provider型にcategoriesフィールドを追加後、MOCK_PROVIDER.categories で初期化
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [saved, setSaved] = useState(false);

  const toggle = (slug: string) => {
    setSelectedCategories((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const handleSave = () => {
    // TODO: Supabase/Prisma で対応サービスを更新
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const groups: Record<string, string> = {
    tatami: "畳工事",
    fusuma: "ふすま・障子",
    wallpaper: "壁紙・内装",
    other: "その他",
  };

  const groupedCategories = SERVICE_CATEGORIES.reduce<Record<string, typeof SERVICE_CATEGORIES>>((acc, cat) => {
    const g = cat.group || "other";
    if (!acc[g]) acc[g] = [];
    acc[g].push(cat);
    return acc;
  }, {});

  return (
    <DashboardLayout currentPath="/dashboard/services">
      <div className="max-w-2xl">
        <h1 className="text-xl text-sumi mb-6" style={{ fontFamily: "var(--font-serif)" }}>対応サービス設定</h1>

        {saved && (
          <div className="mb-4 p-3 bg-igusa/10 border border-igusa text-xs text-igusa">
            対応サービスを保存しました
          </div>
        )}

        <div className="space-y-4">
          {Object.entries(groupedCategories).map(([group, cats]) => (
            <div key={group} className="bg-white border border-border p-5">
              <h2 className="text-sm text-sumi font-medium border-b border-kiji pb-2 mb-4" style={{ fontFamily: "var(--font-serif)" }}>
                {groups[group] || group}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {cats.map((cat) => (
                  <label key={cat.slug} className={`flex items-start gap-3 p-3 border cursor-pointer transition-colors ${selectedCategories.includes(cat.slug) ? "border-ai bg-ai/5" : "border-kiji hover:border-ai/40"}`}>
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat.slug)}
                      onChange={() => toggle(cat.slug)}
                      className="accent-ai mt-0.5 shrink-0"
                    />
                    <div>
                      <p className="text-sm text-sumi">{cat.name}</p>
                      <p className="text-xs text-sumi/50">{cat.priceFrom ? `${cat.priceFrom.toLocaleString()}円〜/${cat.unit}` : "価格相談"}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5">
          <button onClick={handleSave} className="w-full bg-ai text-white py-3 text-sm tracking-wider hover:opacity-80 transition-opacity">
            対応サービスを保存する
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
