"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import SampleBadge from "@/components/common/SampleBadge";
import { MOCK_PROVIDERS } from "@/data/providers";
import { getServicesByProviderId } from "@/data/provider-services";
import { formatRating } from "@/lib/utils";
import type { Provider } from "@/lib/types";

const COMPARE_KEY = "compare_providers";
const MAX_COMPARE = 5;

function getStoredIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(COMPARE_KEY) || "[]");
  } catch {
    return [];
  }
}

function setStoredIds(ids: string[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(COMPARE_KEY, JSON.stringify(ids));
}

// 比較行のレンダリング: boolean系の行
function BoolCell({ ok }: { ok: boolean }) {
  return ok ? (
    <span className="text-igusa font-bold">✅</span>
  ) : (
    <span className="text-sumi/25">✕</span>
  );
}

// 差分ハイライト: 指定インデックスをハイライトするか判定
function isBestRating(providers: Provider[], idx: number): boolean {
  if (providers.length < 2) return false;
  const max = Math.max(...providers.map((p) => p.averageRating));
  return providers[idx].averageRating === max;
}

function isBestPrice(providers: Provider[], idx: number): boolean {
  if (providers.length < 2) return false;
  const prices = providers.map((p) => p.startingPrice ?? Infinity);
  const min = Math.min(...prices);
  return (providers[idx].startingPrice ?? Infinity) === min && min !== Infinity;
}

function isBestResponse(providers: Provider[], idx: number): boolean {
  if (providers.length < 2) return false;
  const times = providers.map((p) => p.responseTimeHours ?? Infinity);
  const min = Math.min(...times);
  return (providers[idx].responseTimeHours ?? Infinity) === min && min !== Infinity;
}

function isBestCompleted(providers: Provider[], idx: number): boolean {
  if (providers.length < 2) return false;
  const max = Math.max(...providers.map((p) => p.completedCount));
  return providers[idx].completedCount === max;
}

function ComparePageContent() {
  const searchParams = useSearchParams();

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchText, setSearchText] = useState("");
  const [toast, setToast] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  // hydration後にlocalStorageとURLパラメータをマージ
  useEffect(() => {
    const urlIds = searchParams.get("ids")?.split(",").filter(Boolean) ?? [];
    const storedIds = getStoredIds();
    const merged = Array.from(new Set([...urlIds, ...storedIds])).slice(0, MAX_COMPARE);
    setSelectedIds(merged);
    setStoredIds(merged);
    setHydrated(true);
  }, [searchParams]);

  const selectedProviders = selectedIds
    .map((id) => MOCK_PROVIDERS.find((p) => p.id === id))
    .filter(Boolean) as Provider[];

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const removeProvider = (id: string) => {
    const next = selectedIds.filter((p) => p !== id);
    setSelectedIds(next);
    setStoredIds(next);
    showToast("比較リストから削除しました");
  };

  const addProvider = (id: string) => {
    if (selectedIds.length >= MAX_COMPARE) {
      showToast(`比較リストは最大${MAX_COMPARE}社までです`);
      return;
    }
    if (selectedIds.includes(id)) return;
    const next = [...selectedIds, id];
    setSelectedIds(next);
    setStoredIds(next);
    showToast("比較リストに追加しました");
  };

  const candidates = MOCK_PROVIDERS.filter(
    (p) =>
      !selectedIds.includes(p.id) &&
      (!searchText ||
        (p.tradeName || p.companyName).includes(searchText) ||
        p.city.includes(searchText))
  );

  // サマリー計算
  const bestRatingProvider = selectedProviders.length > 0
    ? selectedProviders.reduce((a, b) => (a.averageRating >= b.averageRating ? a : b))
    : null;
  const cheapestProvider = selectedProviders.filter((p) => p.startingPrice != null).length > 0
    ? selectedProviders
        .filter((p) => p.startingPrice != null)
        .reduce((a, b) => ((a.startingPrice ?? Infinity) <= (b.startingPrice ?? Infinity) ? a : b))
    : null;
  const sameDayProviders = selectedProviders.filter((p) => p.canSameDayResponse);
  const weekendProviders = selectedProviders.filter((p) => p.canWeekendResponse);

  if (!hydrated) {
    return (
      <div className="min-h-screen bg-shiro flex items-center justify-center">
        <p className="text-sm text-sumi/50">読み込み中...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-shiro">
      {/* トースト */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-sumi text-white text-sm px-4 py-3 shadow-lg">
          {toast}
        </div>
      )}

      {/* ヘッダー */}
      <div className="bg-sumi border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumbs items={[{ label: "トップ", href: "/" }, { label: "業者を比較する" }]} variant="dark" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 pt-2">
          <h1 className="text-2xl text-white mb-1" style={{ fontFamily: "var(--font-serif)" }}>業者を比較する</h1>
          <p className="text-sm text-white/60">最大{MAX_COMPARE}社を並べて比較。料金・評価・対応内容を一目で確認。</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* 業者追加パネル */}
        {selectedProviders.length < MAX_COMPARE && (
          <div className="bg-white border border-border p-5 mb-6">
            <p className="text-sm text-sumi mb-3">
              比較する業者を選択してください（あと<strong className="text-kincya">{MAX_COMPARE - selectedProviders.length}</strong>社追加できます）
            </p>
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="業者名・市区町村で検索..."
              className="w-full sm:w-80 border border-border text-sm px-3 py-2 focus:outline-none focus:border-ai mb-3"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {candidates.slice(0, 9).map((p) => {
                const nm = p.tradeName || p.companyName;
                return (
                  <button
                    key={p.id}
                    onClick={() => addProvider(p.id)}
                    className="flex items-center gap-3 text-left border border-border p-3 hover:border-ai hover:bg-ai/5 transition-all duration-200"
                  >
                    <div className="w-8 h-8 bg-kiji shrink-0 tatami-pattern flex items-center justify-center text-xs" style={{ fontFamily: "var(--font-serif)" }}>
                      {nm.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-sumi font-medium truncate">{nm}</p>
                      <p className="text-xs text-sumi/40">{p.city} ★{formatRating(p.averageRating)}</p>
                    </div>
                    <span className="text-xs text-ai shrink-0">追加 +</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 空の状態 */}
        {selectedProviders.length === 0 ? (
          <div className="bg-white border border-border p-16 text-center">
            {/* 空状態SVGアイコン */}
            <svg className="w-16 h-16 mx-auto mb-4 text-sumi/15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
            <p className="text-sumi/50 mb-2">比較する業者を上の検索パネルから選択してください</p>
            <p className="text-xs text-sumi/40 mb-6">最大{MAX_COMPARE}社まで同時に比較できます</p>
            <div className="flex items-center justify-center gap-4">
              <Link href="/search" className="text-sm text-white bg-kincya border border-kincya px-5 py-2.5 hover:bg-do transition-all duration-300 inline-block">
                業者を探す
              </Link>
              <Link href="/search?sort=recommended" className="text-sm text-ai border border-ai px-5 py-2.5 hover:bg-ai hover:text-white transition-all duration-300 inline-block">
                人気の業者を見る
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* 比較テーブル */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse">
                <thead>
                  <tr>
                    <th className="text-left text-xs text-sumi/50 font-normal py-3 pr-4 w-36 align-bottom">比較項目</th>
                    {Array.from({ length: MAX_COMPARE }, (_, i) => {
                      const p = selectedProviders[i];
                      const nm = p ? (p.tradeName || p.companyName) : null;
                      return (
                        <th key={i} className="text-center pb-4 px-2 align-bottom min-w-[140px]">
                          {p ? (
                            <div className="relative">
                              <button
                                onClick={() => removeProvider(p.id)}
                                className="absolute -top-2 -right-2 w-5 h-5 bg-sumi/20 hover:bg-do text-white text-xs flex items-center justify-center transition-colors z-10"
                                aria-label="削除"
                              >
                                ✕
                              </button>
                              <div className="w-14 h-14 bg-kiji mx-auto tatami-pattern flex items-center justify-center text-lg mb-2" style={{ fontFamily: "var(--font-serif)" }}>
                                {nm!.charAt(0)}
                              </div>
                              <Link href={`/providers/${p.id}`} className="text-sm font-medium text-sumi hover:text-ai transition-colors block leading-snug">
                                {nm}
                              </Link>
                              <p className="text-xs text-sumi/40 mt-0.5">{p.city}</p>
                              {p.isSample && (
                                <div className="flex justify-center mt-1">
                                  <SampleBadge label={p.isSampleLabel || "掲載イメージ"} />
                                </div>
                              )}
                              {p.plan === "premium" && (
                                <span className="text-xs px-2 py-0.5 bg-kincya/10 border border-kincya/30 text-kincya mt-1 inline-block">おすすめ</span>
                              )}
                            </div>
                          ) : (
                            <button
                              onClick={() => setSearchText("")}
                              className="w-14 h-14 bg-kiji/20 border-2 border-dashed border-border mx-auto flex items-center justify-center text-2xl text-sumi/20 hover:border-ai hover:text-ai transition-colors"
                              aria-label="業者を追加"
                            >
                              +
                            </button>
                          )}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {/* 評価 */}
                  <tr className="bg-white">
                    <td className="py-3 pr-4 text-xs text-sumi/50 align-top whitespace-nowrap">評価</td>
                    {Array.from({ length: MAX_COMPARE }, (_, i) => {
                      const p = selectedProviders[i];
                      const highlight = p ? isBestRating(selectedProviders, i) : false;
                      return (
                        <td key={i} className={`py-3 px-2 text-sm text-center align-top ${highlight ? "bg-ai/10" : ""}`}>
                          {p ? (
                            <div>
                              <p className={`text-xl font-medium ${highlight ? "text-kincya" : "text-sumi"}`} style={{ fontFamily: "var(--font-serif)" }}>
                                {formatRating(p.averageRating)}
                              </p>
                              <div className="flex justify-center my-0.5">
                                {Array.from({ length: 5 }, (_, si) => (
                                  <span key={si} className={`text-xs ${si < Math.round(p.averageRating) ? "text-kincya" : "text-border"}`}>★</span>
                                ))}
                              </div>
                              <p className="text-xs text-sumi/40">{p.reviewCount}件</p>
                              {highlight && <p className="text-xs text-kincya font-bold mt-0.5">最高評価</p>}
                            </div>
                          ) : <span className="text-sumi/20">—</span>}
                        </td>
                      );
                    })}
                  </tr>

                  {/* 施工実績 */}
                  <tr className="bg-kiji/20">
                    <td className="py-3 pr-4 text-xs text-sumi/50 align-top whitespace-nowrap">施工実績</td>
                    {Array.from({ length: MAX_COMPARE }, (_, i) => {
                      const p = selectedProviders[i];
                      const highlight = p ? isBestCompleted(selectedProviders, i) : false;
                      return (
                        <td key={i} className={`py-3 px-2 text-center align-top ${highlight ? "bg-ai/10" : ""}`}>
                          {p ? (
                            <p className={`text-base font-medium ${highlight ? "text-kincya font-bold" : "text-sumi"}`} style={{ fontFamily: "var(--font-serif)" }}>
                              {p.completedCount.toLocaleString()}<span className="text-xs font-normal text-sumi/50">件</span>
                            </p>
                          ) : <span className="text-sumi/20">—</span>}
                        </td>
                      );
                    })}
                  </tr>

                  {/* 最安値目安 */}
                  <tr className="bg-white">
                    <td className="py-3 pr-4 text-xs text-sumi/50 align-top whitespace-nowrap">最安値目安</td>
                    {Array.from({ length: MAX_COMPARE }, (_, i) => {
                      const p = selectedProviders[i];
                      const highlight = p ? isBestPrice(selectedProviders, i) : false;
                      return (
                        <td key={i} className={`py-3 px-2 text-center text-sm align-top ${highlight ? "bg-ai/10" : ""}`}>
                          {p ? (
                            <span className={highlight ? "text-kincya font-bold" : "text-sumi"}>
                              {p.startingPrice ? `${p.startingPrice.toLocaleString()}円〜/${p.startingPriceUnit}` : "お問い合わせ"}
                              {highlight && <span className="block text-xs">最安値目安</span>}
                            </span>
                          ) : <span className="text-sumi/20">—</span>}
                        </td>
                      );
                    })}
                  </tr>

                  {/* 対応エリア */}
                  <tr className="bg-kiji/20">
                    <td className="py-3 pr-4 text-xs text-sumi/50 align-top whitespace-nowrap">対応エリア</td>
                    {Array.from({ length: MAX_COMPARE }, (_, i) => {
                      const p = selectedProviders[i];
                      return (
                        <td key={i} className="py-3 px-2 text-center align-top">
                          {p ? (
                            <p className="text-xs text-sumi/70">{p.serviceAreas.slice(0, 3).join("・")}{p.serviceAreas.length > 3 ? "他" : ""}</p>
                          ) : <span className="text-sumi/20">—</span>}
                        </td>
                      );
                    })}
                  </tr>

                  {/* 平均応答時間 */}
                  <tr className="bg-white">
                    <td className="py-3 pr-4 text-xs text-sumi/50 align-top whitespace-nowrap">応答時間目安</td>
                    {Array.from({ length: MAX_COMPARE }, (_, i) => {
                      const p = selectedProviders[i];
                      const highlight = p ? isBestResponse(selectedProviders, i) : false;
                      return (
                        <td key={i} className={`py-3 px-2 text-center text-sm align-top ${highlight ? "bg-ai/10" : ""}`}>
                          {p ? (
                            <span className={highlight ? "text-kincya font-bold" : "text-sumi"}>
                              {p.responseTimeHours ? `${p.responseTimeHours}時間以内` : "—"}
                            </span>
                          ) : <span className="text-sumi/20">—</span>}
                        </td>
                      );
                    })}
                  </tr>

                  {/* 見積無料 */}
                  <tr className="bg-kiji/20">
                    <td className="py-3 pr-4 text-xs text-sumi/50 align-top whitespace-nowrap">見積無料</td>
                    {Array.from({ length: MAX_COMPARE }, (_, i) => {
                      const p = selectedProviders[i];
                      return (
                        <td key={i} className="py-3 px-2 text-center align-top">
                          {p ? <BoolCell ok={p.hasEstimateFree} /> : <span className="text-sumi/20">—</span>}
                        </td>
                      );
                    })}
                  </tr>

                  {/* 写真見積 */}
                  <tr className="bg-white">
                    <td className="py-3 pr-4 text-xs text-sumi/50 align-top whitespace-nowrap">写真見積</td>
                    {Array.from({ length: MAX_COMPARE }, (_, i) => {
                      const p = selectedProviders[i];
                      return (
                        <td key={i} className="py-3 px-2 text-center align-top">
                          {p ? <BoolCell ok={!!p.hasPhotoEstimate} /> : <span className="text-sumi/20">—</span>}
                        </td>
                      );
                    })}
                  </tr>

                  {/* 家具移動 */}
                  <tr className="bg-kiji/20">
                    <td className="py-3 pr-4 text-xs text-sumi/50 align-top whitespace-nowrap">家具移動</td>
                    {Array.from({ length: MAX_COMPARE }, (_, i) => {
                      const p = selectedProviders[i];
                      return (
                        <td key={i} className="py-3 px-2 text-center align-top">
                          {p ? <BoolCell ok={p.hasFurnitureMove} /> : <span className="text-sumi/20">—</span>}
                        </td>
                      );
                    })}
                  </tr>

                  {/* 即日対応 */}
                  <tr className="bg-white">
                    <td className="py-3 pr-4 text-xs text-sumi/50 align-top whitespace-nowrap">即日対応</td>
                    {Array.from({ length: MAX_COMPARE }, (_, i) => {
                      const p = selectedProviders[i];
                      return (
                        <td key={i} className="py-3 px-2 text-center align-top">
                          {p ? <BoolCell ok={p.canSameDayResponse} /> : <span className="text-sumi/20">—</span>}
                        </td>
                      );
                    })}
                  </tr>

                  {/* 土日対応 */}
                  <tr className="bg-kiji/20">
                    <td className="py-3 pr-4 text-xs text-sumi/50 align-top whitespace-nowrap">土日対応</td>
                    {Array.from({ length: MAX_COMPARE }, (_, i) => {
                      const p = selectedProviders[i];
                      return (
                        <td key={i} className="py-3 px-2 text-center align-top">
                          {p ? <BoolCell ok={p.canWeekendResponse} /> : <span className="text-sumi/20">—</span>}
                        </td>
                      );
                    })}
                  </tr>

                  {/* カード払い */}
                  <tr className="bg-white">
                    <td className="py-3 pr-4 text-xs text-sumi/50 align-top whitespace-nowrap">カード払い</td>
                    {Array.from({ length: MAX_COMPARE }, (_, i) => {
                      const p = selectedProviders[i];
                      return (
                        <td key={i} className="py-3 px-2 text-center align-top">
                          {p ? <BoolCell ok={p.acceptsCard} /> : <span className="text-sumi/20">—</span>}
                        </td>
                      );
                    })}
                  </tr>

                  {/* 法人対応 */}
                  <tr className="bg-kiji/20">
                    <td className="py-3 pr-4 text-xs text-sumi/50 align-top whitespace-nowrap">法人対応</td>
                    {Array.from({ length: MAX_COMPARE }, (_, i) => {
                      const p = selectedProviders[i];
                      return (
                        <td key={i} className="py-3 px-2 text-center align-top">
                          {p ? <BoolCell ok={p.acceptsCorporate} /> : <span className="text-sumi/20">—</span>}
                        </td>
                      );
                    })}
                  </tr>

                  {/* 保険加入 */}
                  <tr className="bg-white">
                    <td className="py-3 pr-4 text-xs text-sumi/50 align-top whitespace-nowrap">保険加入</td>
                    {Array.from({ length: MAX_COMPARE }, (_, i) => {
                      const p = selectedProviders[i];
                      return (
                        <td key={i} className="py-3 px-2 text-center align-top text-xs">
                          {p ? (
                            <span className={p.hasInsurance ? "text-igusa" : "text-sumi/40"}>
                              {p.hasInsurance ? "申告あり" : "未申告"}
                            </span>
                          ) : <span className="text-sumi/20">—</span>}
                        </td>
                      );
                    })}
                  </tr>

                  {/* 古畳処分 */}
                  <tr className="bg-kiji/20">
                    <td className="py-3 pr-4 text-xs text-sumi/50 align-top whitespace-nowrap">古畳処分</td>
                    {Array.from({ length: MAX_COMPARE }, (_, i) => {
                      const p = selectedProviders[i];
                      return (
                        <td key={i} className="py-3 px-2 text-center align-top">
                          {p ? <BoolCell ok={!!p.hasOldTatamiDisposal} /> : <span className="text-sumi/20">—</span>}
                        </td>
                      );
                    })}
                  </tr>

                  {/* インボイス */}
                  <tr className="bg-white">
                    <td className="py-3 pr-4 text-xs text-sumi/50 align-top whitespace-nowrap">インボイス</td>
                    {Array.from({ length: MAX_COMPARE }, (_, i) => {
                      const p = selectedProviders[i];
                      return (
                        <td key={i} className="py-3 px-2 text-center align-top">
                          {p ? <BoolCell ok={!!p.acceptsInvoice} /> : <span className="text-sumi/20">—</span>}
                        </td>
                      );
                    })}
                  </tr>

                  {/* 提供サービス */}
                  <tr className="bg-kiji/40">
                    <td className="py-3 pr-4 text-xs text-sumi/50 font-medium align-top whitespace-nowrap">提供サービス</td>
                    {Array.from({ length: MAX_COMPARE }, (_, i) => {
                      const p = selectedProviders[i];
                      if (!p) return <td key={i} />;
                      const svcs = getServicesByProviderId(p.id);
                      return (
                        <td key={i} className="py-3 px-2 align-top">
                          {svcs.length > 0 ? (
                            <div className="space-y-1">
                              {svcs.map((svc) => (
                                <p key={svc.id} className="text-xs text-sumi/70">{svc.title}（{svc.priceLabel}）</p>
                              ))}
                            </div>
                          ) : (
                            <p className="text-xs text-sumi/30 text-center">サービス未登録</p>
                          )}
                        </td>
                      );
                    })}
                  </tr>

                  {/* CTA行 */}
                  <tr className="bg-white">
                    <td className="py-4 pr-4" />
                    {Array.from({ length: MAX_COMPARE }, (_, i) => {
                      const p = selectedProviders[i];
                      return (
                        <td key={i} className="py-4 px-2">
                          {p ? (
                            <div className="space-y-2">
                              <Link
                                href={`/bulk-quote/new?providerId=${p.id}`}
                                className="block text-center bg-kincya text-white text-xs py-2.5 hover:bg-do transition-colors tracking-wide"
                              >
                                見積もり依頼
                              </Link>
                              <Link
                                href={`/providers/${p.id}`}
                                className="block text-center border border-border text-sumi/60 text-xs py-2 hover:border-ai hover:text-ai transition-all duration-200"
                              >
                                詳細を見る
                              </Link>
                              <button
                                onClick={() => removeProvider(p.id)}
                                className="block w-full text-center text-xs text-sumi/30 py-1 hover:text-do transition-colors"
                              >
                                リストから削除
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setSearchText("")}
                              className="block w-full text-center border border-dashed border-sumi/20 text-sumi/30 text-xs py-2.5 hover:border-ai hover:text-ai transition-all duration-200"
                            >
                              業者を追加
                            </button>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                </tbody>
              </table>
            </div>

            {/* 比較結果サマリー */}
            {selectedProviders.length >= 2 && (
              <div className="mt-6 bg-kiji/30 border border-sumi/10 p-5">
                <p className="text-sm font-medium text-sumi mb-3" style={{ fontFamily: "var(--font-serif)" }}>比較ポイント</p>
                <ul className="space-y-2 text-sm">
                  {bestRatingProvider && (
                    <li className="flex items-start gap-2">
                      <span className="shrink-0">★</span>
                      <span className="text-sumi/80">
                        評価が最も高い：<strong className="text-sumi">{bestRatingProvider.tradeName || bestRatingProvider.companyName}</strong>
                        （{formatRating(bestRatingProvider.averageRating)} / {bestRatingProvider.reviewCount}件）
                      </span>
                    </li>
                  )}
                  {cheapestProvider && (
                    <li className="flex items-start gap-2">
                      <span className="shrink-0">💰</span>
                      <span className="text-sumi/80">
                        最安値目安：<strong className="text-sumi">{cheapestProvider.tradeName || cheapestProvider.companyName}</strong>
                        （{cheapestProvider.startingPrice?.toLocaleString()}円〜/{cheapestProvider.startingPriceUnit}）
                      </span>
                    </li>
                  )}
                  {sameDayProviders.length > 0 && (
                    <li className="flex items-start gap-2">
                      <span className="shrink-0">⚡</span>
                      <span className="text-sumi/80">
                        即日対応可能：<strong className="text-sumi">{sameDayProviders.map((p) => p.tradeName || p.companyName).join("・")}</strong>
                      </span>
                    </li>
                  )}
                  {weekendProviders.length > 0 && weekendProviders.length < selectedProviders.length && (
                    <li className="flex items-start gap-2">
                      <span className="shrink-0">📅</span>
                      <span className="text-sumi/80">
                        土日対応可能：<strong className="text-sumi">{weekendProviders.map((p) => p.tradeName || p.companyName).join("・")}</strong>
                      </span>
                    </li>
                  )}
                </ul>
                <p className="text-xs text-sumi/40 mt-3">※ 申告情報に基づく比較です。最終的には見積もり時に各業者にご確認ください。</p>
              </div>
            )}

            {/* 一括見積もりCTA */}
            {selectedProviders.length >= 2 && (
              <div className="mt-4 bg-sumi p-5 text-center">
                <p className="text-sm text-white/70 mb-3">比較した{selectedProviders.length}社にまとめて見積もりを依頼できます</p>
                <Link
                  href={`/bulk-quote/new?ids=${selectedIds.join(",")}`}
                  className="inline-block bg-kincya text-white text-sm px-8 py-3 hover:bg-do transition-colors tracking-wide mb-2"
                >
                  一括見積もりを依頼する（{selectedProviders.length}社）
                </Link>
                <p className="text-xs text-white/40">各業者に個別に依頼するより手間が省けます</p>
              </div>
            )}
          </>
        )}

        {/* フッターナビ */}
        <div className="mt-8 flex items-center justify-between">
          <Link href="/search" className="inline-block border border-ai text-ai px-6 py-3 text-sm hover:bg-ai hover:text-white transition-all duration-300">
            ← 業者一覧に戻る
          </Link>
          <Link href="/search?sort=recommended" className="text-sm text-sumi/50 hover:text-ai transition-colors">
            他の業者も見る →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-shiro flex items-center justify-center"><p className="text-sm text-sumi/50">読み込み中...</p></div>}>
      <ComparePageContent />
    </Suspense>
  );
}
