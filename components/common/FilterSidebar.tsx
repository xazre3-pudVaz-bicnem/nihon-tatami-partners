"use client";

import { useState } from "react";
import type { SearchParams } from "@/lib/types";
import { SAITAMA_CITIES } from "@/data/cities";

interface Props {
  params: SearchParams;
  onChange: (params: SearchParams) => void;
}

export default function FilterSidebar({ params, onChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const update = (key: keyof SearchParams, value: unknown) => {
    onChange({ ...params, [key]: value, page: 1 });
  };

  const toggle = (key: keyof SearchParams) => {
    onChange({ ...params, [key]: !params[key as keyof SearchParams], page: 1 });
  };

  const cityGroups = [
    { label: "東京近郊", cities: ["川口市", "蕨市", "戸田市", "草加市", "三郷市", "八潮市", "朝霞市", "和光市", "新座市"] },
    { label: "さいたま・中部", cities: ["さいたま市", "上尾市", "富士見市", "ふじみ野市", "志木市", "鴻巣市"] },
    { label: "西部・川越", cities: ["川越市", "所沢市", "狭山市", "入間市", "飯能市", "東松山市"] },
    { label: "東部・春日部", cities: ["越谷市", "春日部市", "久喜市", "行田市", "加須市", "羽生市"] },
    { label: "北部・秩父", cities: ["熊谷市", "深谷市", "本庄市", "秩父市"] },
  ];

  const FilterContent = () => (
    <div className="space-y-6">
      {/* エリア */}
      <div>
        <h3 className="text-sm font-medium text-sumi mb-3" style={{ fontFamily: "var(--font-serif)" }}>市区町村</h3>
        <div className="space-y-4">
          {cityGroups.map((group) => (
            <div key={group.label}>
              <p className="text-xs text-sumi/50 mb-2">{group.label}</p>
              <div className="space-y-1.5">
                {group.cities.map((city) => (
                  <label key={city} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="city"
                      value={city}
                      checked={params.city === city}
                      onChange={() => update("city", city)}
                      className="accent-kincya"
                    />
                    <span className="text-xs text-sumi/80">{city}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
        {params.city && (
          <button onClick={() => update("city", undefined)} className="mt-2 text-xs text-ai hover:underline">
            エリア指定を解除
          </button>
        )}
      </div>

      {/* 料金帯 */}
      <div>
        <h3 className="text-sm font-medium text-sumi mb-3" style={{ fontFamily: "var(--font-serif)" }}>口コミ評価</h3>
        <div className="space-y-1.5">
          {[
            { label: "4.5以上", value: 4.5 },
            { label: "4.0以上", value: 4.0 },
            { label: "3.5以上", value: 3.5 },
          ].map((item) => (
            <label key={item.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="rating"
                value={item.value}
                checked={params.rating === item.value}
                onChange={() => update("rating", item.value)}
                className="accent-kincya"
              />
              <span className="text-xs text-sumi/80">{item.label}</span>
            </label>
          ))}
        </div>
        {params.rating && (
          <button onClick={() => update("rating", undefined)} className="mt-2 text-xs text-ai hover:underline">
            評価フィルターを解除
          </button>
        )}
      </div>

      {/* 対応オプション */}
      <div>
        <h3 className="text-sm font-medium text-sumi mb-3" style={{ fontFamily: "var(--font-serif)" }}>対応オプション</h3>
        <div className="space-y-2">
          {[
            { label: "即日対応", key: "sameDayResponse" as keyof SearchParams },
            { label: "土日対応", key: "weekendResponse" as keyof SearchParams },
            { label: "夜間相談可", key: "nightConsultation" as keyof SearchParams },
            { label: "無料見積", key: "hasEstimateFree" as keyof SearchParams },
            { label: "家具移動対応", key: "hasFurnitureMove" as keyof SearchParams },
            { label: "駐車場代込み", key: "parkingFree" as keyof SearchParams },
            { label: "カード決済対応", key: "acceptsCard" as keyof SearchParams },
            { label: "オンライン相談可", key: "canOnlineConsult" as keyof SearchParams },
          ].map((item) => (
            <label key={item.key} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={!!params[item.key]}
                onChange={() => toggle(item.key)}
                className="accent-kincya"
              />
              <span className="text-xs text-sumi/80">{item.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 資格・保険 */}
      <div>
        <h3 className="text-sm font-medium text-sumi mb-3" style={{ fontFamily: "var(--font-serif)" }}>資格・保険</h3>
        <div className="space-y-2">
          {[
            { label: "一級畳製作技能士", key: "hasLicense" as keyof SearchParams },
            { label: "損害賠償保険加入", key: "hasInsurance" as keyof SearchParams },
          ].map((item) => (
            <label key={item.key} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={!!params[item.key]}
                onChange={() => toggle(item.key)}
                className="accent-kincya"
              />
              <span className="text-xs text-sumi/80">{item.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 法人対応 */}
      <div>
        <h3 className="text-sm font-medium text-sumi mb-3" style={{ fontFamily: "var(--font-serif)" }}>法人・施設対応</h3>
        <div className="space-y-2">
          {[
            { label: "法人対応可", key: "acceptsCorporate" as keyof SearchParams },
            { label: "不動産会社対応可", key: "acceptsRealEstate" as keyof SearchParams },
            { label: "旅館・宿泊施設対応", key: "acceptsRyokan" as keyof SearchParams },
            { label: "寺社・神社対応", key: "acceptsTempleShrine" as keyof SearchParams },
          ].map((item) => (
            <label key={item.key} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={!!params[item.key]}
                onChange={() => toggle(item.key)}
                className="accent-kincya"
              />
              <span className="text-xs text-sumi/80">{item.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* モバイル用トグルボタン */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between border border-border bg-white px-4 py-3 text-sm text-sumi"
        >
          <span>絞り込み条件</span>
          <svg className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {isOpen && (
          <div className="border border-t-0 border-border bg-white p-4">
            <FilterContent />
          </div>
        )}
      </div>

      {/* デスクトップ用サイドバー */}
      <div className="hidden lg:block bg-white border border-border p-5 sticky top-24">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-sm font-medium text-sumi" style={{ fontFamily: "var(--font-serif)" }}>絞り込み</h2>
          <button
            onClick={() => onChange({ sortBy: params.sortBy })}
            className="text-xs text-ai hover:underline"
          >
            リセット
          </button>
        </div>
        <FilterContent />
      </div>
    </>
  );
}
