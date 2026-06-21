"use client";

import { useState } from "react";
import Link from "next/link";

type MaterialKey = "standard" | "domestic" | "washi" | "resin" | "ryukyu";

const MATERIALS: { key: MaterialKey; label: string; price: number; unit: string; note?: string }[] = [
  { key: "standard", label: "普及品（外国産い草）", price: 3800, unit: "枚", note: "コスパ重視" },
  { key: "domestic", label: "国産い草（中〜上級）", price: 5500, unit: "枚", note: "最もご注文が多い" },
  { key: "washi", label: "和紙畳（ダイケン）", price: 7500, unit: "枚", note: "ペット・お子様向け" },
  { key: "resin", label: "樹脂畳（水拭き可）", price: 9000, unit: "枚", note: "耐久性重視" },
  { key: "ryukyu", label: "琉球畳（縁なし半畳）", price: 6500, unit: "枚", note: "モダン和室に" },
];

const ROOM_SIZES: { label: string; tatami: number }[] = [
  { label: "4.5畳", tatami: 4.5 },
  { label: "6畳", tatami: 6 },
  { label: "8畳", tatami: 8 },
  { label: "10畳", tatami: 10 },
  { label: "12畳", tatami: 12 },
];

export default function PriceCalculator() {
  const [material, setMaterial] = useState<MaterialKey>("domestic");
  const [rooms, setRooms] = useState<number[]>([6]);
  const [furnitureMove, setFurnitureMove] = useState(false);
  const [disposal, setDisposal] = useState(false);

  const selectedMaterial = MATERIALS.find((m) => m.key === material)!;

  const totalTatami = rooms.reduce((sum, r) => sum + r, 0);
  // 琉球畳は半畳なので枚数が2倍
  const tatamiFlex = material === "ryukyu" ? totalTatami * 2 : totalTatami;
  const materialCost = Math.round(selectedMaterial.price * tatamiFlex);
  const furnitureCost = furnitureMove ? 1500 : 0;
  const disposalCost = disposal ? Math.round(totalTatami * 500) : 0;
  const totalCost = materialCost + furnitureCost + disposalCost;

  const addRoom = () => setRooms((prev) => [...prev, 6]);
  const removeRoom = (i: number) => setRooms((prev) => prev.filter((_, idx) => idx !== i));
  const updateRoom = (i: number, val: number) => setRooms((prev) => prev.map((r, idx) => (idx === i ? val : r)));

  return (
    <div className="bg-white border border-border">
      <div className="border-b border-kiji px-5 py-4 flex items-center gap-3">
        <div className="w-8 h-8 bg-kincya/10 flex items-center justify-center">
          <svg className="w-4 h-4 text-kincya" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <div>
          <h3 className="text-sm font-medium text-sumi" style={{ fontFamily: "var(--font-serif)" }}>簡易見積もり計算</h3>
          <p className="text-xs text-sumi/50">畳数と素材を選んで概算を確認</p>
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* 素材選択 */}
        <div>
          <label className="block text-xs text-sumi/60 mb-2">素材を選ぶ</label>
          <div className="space-y-2">
            {MATERIALS.map((m) => (
              <label
                key={m.key}
                className={`flex items-center justify-between p-3 border cursor-pointer transition-all duration-200 ${
                  material === m.key ? "border-kincya bg-kincya/5" : "border-border hover:border-kincya/30"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="material"
                    value={m.key}
                    checked={material === m.key}
                    onChange={() => setMaterial(m.key)}
                    className="accent-kincya"
                  />
                  <div>
                    <p className="text-sm text-sumi">{m.label}</p>
                    {m.note && <p className="text-xs text-sumi/40">{m.note}</p>}
                  </div>
                </div>
                <span className="text-sm font-medium text-do shrink-0 ml-2">
                  {m.price.toLocaleString()}円/{m.unit}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* 部屋サイズ */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs text-sumi/60">部屋のサイズ</label>
            <button
              onClick={addRoom}
              className="text-xs text-ai border border-ai/30 px-2 py-1 hover:bg-ai/5 transition-colors"
            >
              ＋ 部屋を追加
            </button>
          </div>
          <div className="space-y-2">
            {rooms.map((size, i) => (
              <div key={i} className="flex items-center gap-2">
                <select
                  value={size}
                  onChange={(e) => updateRoom(i, Number(e.target.value))}
                  className="flex-1 border border-border text-sm px-3 py-2 focus:outline-none focus:border-ai"
                >
                  {ROOM_SIZES.map((rs) => (
                    <option key={rs.tatami} value={rs.tatami}>{rs.label}</option>
                  ))}
                </select>
                {rooms.length > 1 && (
                  <button
                    onClick={() => removeRoom(i)}
                    className="text-sumi/30 hover:text-do transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>
          <p className="text-xs text-sumi/40 mt-1">合計：{totalTatami}畳（{tatamiFlex}枚）</p>
        </div>

        {/* オプション */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm text-sumi/70 cursor-pointer">
            <input type="checkbox" checked={furnitureMove} onChange={(e) => setFurnitureMove(e.target.checked)} className="accent-kincya" />
            家具移動が必要（＋1,500円程度）
          </label>
          <label className="flex items-center gap-2 text-sm text-sumi/70 cursor-pointer">
            <input type="checkbox" checked={disposal} onChange={(e) => setDisposal(e.target.checked)} className="accent-kincya" />
            古畳の処分を依頼（＋500円/枚）
          </label>
        </div>

        {/* 概算結果 */}
        <div className="bg-kiji/40 border border-kiji p-4">
          <p className="text-xs text-sumi/50 mb-2">概算費用（税込）</p>
          <div className="space-y-1 mb-3 text-xs text-sumi/60">
            <div className="flex justify-between">
              <span>{selectedMaterial.label}×{tatamiFlex}枚</span>
              <span>{materialCost.toLocaleString()}円</span>
            </div>
            {furnitureMove && (
              <div className="flex justify-between">
                <span>家具移動</span>
                <span>{furnitureCost.toLocaleString()}円</span>
              </div>
            )}
            {disposal && (
              <div className="flex justify-between">
                <span>古畳処分×{totalTatami}枚</span>
                <span>{disposalCost.toLocaleString()}円</span>
              </div>
            )}
          </div>
          <div className="border-t border-kincya/20 pt-3 flex items-end justify-between">
            <span className="text-xs text-sumi/60">合計（目安）</span>
            <span className="text-3xl font-medium text-sumi" style={{ fontFamily: "var(--font-serif)" }}>
              {totalCost.toLocaleString()}<span className="text-sm text-sumi/60 ml-1">円〜</span>
            </span>
          </div>
          <p className="text-xs text-sumi/40 mt-2">※出張費・特殊加工・床補修は別途。正確な金額は業者の見積もりをご確認ください。</p>
        </div>

        <Link
          href="/bulk-quote/new"
          className="block w-full text-center bg-kincya text-white py-3 text-sm tracking-wider hover:bg-do transition-colors duration-300"
        >
          この条件で業者に一括見積もりを依頼
        </Link>
        <Link
          href="/search"
          className="block w-full text-center border border-ai text-ai py-2.5 text-sm hover:bg-ai hover:text-white transition-all duration-300"
        >
          業者を探して比較する
        </Link>
      </div>
    </div>
  );
}
