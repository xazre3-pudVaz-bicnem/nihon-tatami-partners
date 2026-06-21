"use client";

import { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

const BOOL_FILTERS: { key: string; label: string }[] = [
  { key: "sameDayResponse", label: "即日対応" },
  { key: "weekendResponse", label: "土日対応" },
  { key: "hasEstimateFree", label: "無料見積もり" },
  { key: "hasPhotoEstimate", label: "写真見積対応" },
  { key: "hasFurnitureMove", label: "家具移動対応" },
  { key: "hasLicense", label: "一級技能士" },
  { key: "hasInsurance", label: "損害賠償保険加入" },
  { key: "acceptsCorporate", label: "法人対応可" },
  { key: "acceptsRealEstate", label: "不動産・管理会社対応" },
  { key: "acceptsRyokan", label: "旅館・宿泊施設対応" },
  { key: "acceptsTempleShrine", label: "寺社・神社対応" },
  { key: "parkingFree", label: "駐車場代込み" },
  { key: "hasOldTatamiDisposal", label: "古畳処分対応" },
  { key: "acceptsCard", label: "カード払い対応" },
  { key: "acceptsInvoice", label: "インボイス対応" },
  { key: "canOnlineConsult", label: "オンライン相談可" },
  { key: "nightConsultation", label: "夜間相談可" },
];

const BOOL_FILTER_KEYS = BOOL_FILTERS.map((f) => f.key);
const RADIO_FILTER_KEYS = ["city", "rating", "reviewMin"];

function countActiveFilters(searchParams: URLSearchParams): number {
  let count = 0;
  BOOL_FILTER_KEYS.forEach((key) => {
    if (searchParams.get(key) === "true") count++;
  });
  RADIO_FILTER_KEYS.forEach((key) => {
    if (searchParams.get(key)) count++;
  });
  return count;
}

const cityGroups = [
  { label: "東京近郊", cities: ["川口市", "蕨市", "戸田市", "草加市", "三郷市", "八潮市", "朝霞市", "和光市", "新座市"] },
  { label: "さいたま・中部", cities: ["さいたま市", "上尾市", "富士見市", "ふじみ野市", "志木市", "鴻巣市"] },
  { label: "西部・川越", cities: ["川越市", "所沢市", "狭山市", "入間市", "飯能市", "東松山市"] },
  { label: "東部・春日部", cities: ["越谷市", "春日部市", "久喜市", "行田市", "加須市", "羽生市"] },
  { label: "北部・秩父", cities: ["熊谷市", "深谷市", "本庄市", "秩父市"] },
];

interface FilterDrawerProps {
  className?: string;
}

export default function FilterDrawer({ className }: FilterDrawerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);

  // ローカル状態（適用ボタンを押すまでURLに反映しない）
  const [localParams, setLocalParams] = useState<URLSearchParams>(
    () => new URLSearchParams(searchParams.toString())
  );

  const activeCount = countActiveFilters(searchParams);

  const openDrawer = () => {
    setLocalParams(new URLSearchParams(searchParams.toString()));
    setOpen(true);
  };

  const closeDrawer = () => setOpen(false);

  const applyFilters = () => {
    localParams.delete("page");
    router.push(`${pathname}?${localParams.toString()}`);
    setOpen(false);
  };

  const resetFilters = () => {
    const fresh = new URLSearchParams();
    const category = searchParams.get("category");
    if (category) fresh.set("category", category);
    setLocalParams(fresh);
  };

  const setLocal = (key: string, value: string | null) => {
    setLocalParams((prev) => {
      const next = new URLSearchParams(prev.toString());
      if (value === null || value === "") {
        next.delete(key);
      } else {
        next.set(key, value);
      }
      return next;
    });
  };

  const toggleLocalBool = (key: string) => {
    setLocalParams((prev) => {
      const next = new URLSearchParams(prev.toString());
      if (next.get(key) === "true") next.delete(key);
      else next.set(key, "true");
      return next;
    });
  };

  const isLocalChecked = (key: string) => localParams.get(key) === "true";
  const getLocal = (key: string) => localParams.get(key) ?? "";

  return (
    <div className={className}>
      {/* トリガーボタン */}
      <button
        onClick={openDrawer}
        className="flex items-center gap-2 bg-sumi text-white text-sm px-5 py-2.5 rounded-full shadow-md"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="8" y1="12" x2="20" y2="12" />
          <line x1="12" y1="18" x2="20" y2="18" />
        </svg>
        <span>絞り込み{activeCount > 0 ? ` (${activeCount})` : ""}</span>
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* オーバーレイ */}
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-sumi/50 z-40"
              onClick={closeDrawer}
            />

            {/* ドロワー本体 */}
            <motion.div
              key="drawer"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-shiro rounded-t-2xl shadow-xl flex flex-col max-h-[85vh]"
            >
              {/* ヘッダー */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                <h2 className="text-sm font-medium text-sumi" style={{ fontFamily: "var(--font-serif)" }}>
                  絞り込み条件{activeCount > 0 && (
                    <span className="ml-2 text-[11px] bg-ai text-white px-2 py-0.5 rounded-full font-normal">
                      {activeCount}件適用中
                    </span>
                  )}
                </h2>
                <button onClick={closeDrawer} className="text-sumi/50 hover:text-sumi p-1">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* スクロール可能なコンテンツ */}
              <div className="overflow-y-auto flex-1 px-5 py-5 space-y-6">
                {/* 市区町村 */}
                <section>
                  <h3 className="text-sm font-medium text-sumi mb-3" style={{ fontFamily: "var(--font-serif)" }}>市区町村</h3>
                  <div className="space-y-4 max-h-52 overflow-y-auto pr-1">
                    {cityGroups.map((g) => (
                      <div key={g.label}>
                        <p className="text-xs text-sumi/50 mb-2">{g.label}</p>
                        <div className="grid grid-cols-2 gap-1.5">
                          {g.cities.map((c) => (
                            <label key={c} className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="radio"
                                name="drawer-city"
                                checked={getLocal("city") === c}
                                onChange={() => setLocal("city", c)}
                                className="accent-kincya"
                              />
                              <span className="text-xs text-sumi/80">{c}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  {getLocal("city") && (
                    <button onClick={() => setLocal("city", null)} className="mt-2 text-xs text-ai hover:underline">
                      エリア指定を解除
                    </button>
                  )}
                </section>

                {/* 口コミ評価 */}
                <section>
                  <h3 className="text-sm font-medium text-sumi mb-3" style={{ fontFamily: "var(--font-serif)" }}>口コミ評価</h3>
                  <div className="flex flex-wrap gap-2">
                    {[{ value: "4.5", label: "4.5以上" }, { value: "4.0", label: "4.0以上" }, { value: "3.5", label: "3.5以上" }].map((o) => (
                      <button
                        key={o.value}
                        onClick={() => setLocal("rating", getLocal("rating") === o.value ? null : o.value)}
                        className={`text-xs px-3 py-1.5 border rounded-full transition-colors ${
                          getLocal("rating") === o.value
                            ? "border-kincya bg-kincya text-white"
                            : "border-border text-sumi/70 hover:border-kincya"
                        }`}
                      >
                        ★ {o.label}
                      </button>
                    ))}
                  </div>
                </section>

                {/* 対応可能時期 */}
                <section>
                  <h3 className="text-sm font-medium text-sumi mb-3" style={{ fontFamily: "var(--font-serif)" }}>対応・サービス</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {BOOL_FILTERS.map((f) => (
                      <label key={f.key} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isLocalChecked(f.key)}
                          onChange={() => toggleLocalBool(f.key)}
                          className="accent-kincya"
                        />
                        <span className="text-xs text-sumi/80">{f.label}</span>
                      </label>
                    ))}
                  </div>
                </section>
              </div>

              {/* フッターボタン */}
              <div className="px-5 py-4 border-t border-border flex gap-3">
                <button
                  onClick={resetFilters}
                  className="flex-1 text-sm text-ai border border-ai py-3 rounded-sm hover:bg-ai hover:text-white transition-colors"
                >
                  リセット
                </button>
                <button
                  onClick={applyFilters}
                  className="flex-[2] text-sm bg-sumi text-white py-3 rounded-sm font-medium hover:bg-sumi/90 transition-colors"
                >
                  適用する
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
