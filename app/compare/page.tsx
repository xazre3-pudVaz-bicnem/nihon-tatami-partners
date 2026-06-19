"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { MOCK_PROVIDERS } from "@/data/providers";
import { getServicesByProviderId } from "@/data/provider-services";
import { formatRating } from "@/lib/utils";
import type { Provider } from "@/lib/types";

function ComparePageContent() {
  const searchParams = useSearchParams();
  const initialIds = searchParams.get("ids")?.split(",").filter(Boolean) ?? [];

  const [selectedIds, setSelectedIds] = useState<string[]>(initialIds.slice(0, 3));
  const [searchText, setSearchText] = useState("");

  const selectedProviders = selectedIds
    .map((id) => MOCK_PROVIDERS.find((p) => p.id === id))
    .filter(Boolean) as Provider[];

  const removeProvider = (id: string) => {
    setSelectedIds((prev) => prev.filter((p) => p !== id));
  };

  const addProvider = (id: string) => {
    if (selectedIds.length >= 3 || selectedIds.includes(id)) return;
    setSelectedIds((prev) => [...prev, id]);
  };

  const candidates = MOCK_PROVIDERS.filter(
    (p) => !selectedIds.includes(p.id) && (
      !searchText ||
      (p.tradeName || p.companyName).includes(searchText) ||
      p.city.includes(searchText)
    )
  );

  const COMPARE_ROWS: {
    label: string;
    key: (p: Provider) => string | React.ReactNode;
    highlight?: (vals: (string | React.ReactNode)[]) => boolean[];
  }[] = [
    {
      label: "評価",
      key: (p) => (
        <div className="text-center">
          <p className="text-2xl font-medium text-sumi" style={{ fontFamily: "var(--font-serif)" }}>
            {formatRating(p.averageRating)}
          </p>
          <div className="flex justify-center my-0.5">
            {Array.from({ length: 5 }, (_, i) => (
              <span key={i} className={`text-sm ${i < Math.round(p.averageRating) ? "text-kincya" : "text-border"}`}>★</span>
            ))}
          </div>
          <p className="text-xs text-sumi/40">{p.reviewCount}件の口コミ</p>
        </div>
      ),
    },
    {
      label: "施工実績",
      key: (p) => (
        <p className="text-center">
          <span className="text-xl font-medium text-sumi" style={{ fontFamily: "var(--font-serif)" }}>
            {p.completedCount.toLocaleString()}
          </span>
          <span className="text-xs text-sumi/50">件</span>
        </p>
      ),
    },
    {
      label: "表替え料金目安",
      key: (p) => p.startingPrice ? `${p.startingPrice.toLocaleString()}円〜/${p.startingPriceUnit}` : "お問い合わせ",
    },
    {
      label: "平均応答時間",
      key: (p) => p.responseTimeHours ? `${p.responseTimeHours}時間以内` : "—",
    },
    { label: "即日対応", key: (p) => (p.canSameDayResponse ? "○" : "✕") },
    { label: "土日対応", key: (p) => (p.canWeekendResponse ? "○" : "✕") },
    { label: "無料見積もり", key: (p) => (p.hasEstimateFree ? "○" : "✕") },
    { label: "損害賠償保険", key: (p) => (p.hasInsurance ? "加入済み" : "未加入") },
    { label: "カード決済", key: (p) => (p.acceptsCard ? "○" : "✕") },
    { label: "家具移動", key: (p) => (p.hasFurnitureMove ? "○" : "✕") },
    { label: "オンライン相談", key: (p) => (p.canOnlineConsult ? "○" : "✕") },
    { label: "不動産会社対応", key: (p) => (p.acceptsRealEstate ? "○" : "✕") },
    { label: "旅館・宿泊施設対応", key: (p) => (p.acceptsRyokan ? "○" : "✕") },
    { label: "寺院・神社対応", key: (p) => (p.acceptsTempleShrine ? "○" : "✕") },
    {
      label: "保有資格",
      key: (p) => (
        <div className="space-y-0.5">
          {p.licenses?.map((l) => (
            <p key={l} className="text-xs text-sumi/70">{l}</p>
          )) ?? <p className="text-xs text-sumi/40">情報なし</p>}
        </div>
      ),
    },
    {
      label: "対応エリア",
      key: (p) => <p className="text-xs text-sumi/70">{p.serviceAreas.join("・")}</p>,
    },
    {
      label: "営業時間",
      key: (p) => <p className="text-xs text-sumi/70">{p.businessHours || "—"}</p>,
    },
  ];

  return (
    <div className="min-h-screen bg-shiro">
      <div className="bg-sumi border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumbs items={[{ label: "トップ", href: "/" }, { label: "業者を比較する" }]} variant="dark" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 pt-2">
          <h1 className="text-2xl text-white mb-1" style={{ fontFamily: "var(--font-serif)" }}>業者を比較する</h1>
          <p className="text-sm text-white/60">最大3社を並べて比較。料金・評価・対応内容を一目で確認。</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* 業者追加パネル */}
        {selectedProviders.length < 3 && (
          <div className="bg-white border border-border p-5 mb-6">
            <p className="text-sm text-sumi mb-3">
              比較する業者を選択してください（あと<strong className="text-kincya">{3 - selectedProviders.length}</strong>社追加できます）
            </p>
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="業者名・市区町村で検索..."
              className="w-full sm:w-80 border border-border text-sm px-3 py-2 focus:outline-none focus:border-ai mb-3"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {candidates.slice(0, 6).map((p) => {
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

        {selectedProviders.length === 0 ? (
          <div className="bg-white border border-border p-12 text-center">
            <p className="text-sumi/50 mb-4">比較する業者を上の検索パネルから選択してください</p>
            <Link href="/search" className="text-sm text-ai border border-ai px-5 py-2.5 hover:bg-ai hover:text-white transition-all duration-300 inline-block">
              業者を探す →
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] border-collapse">
              <thead>
                <tr>
                  <th className="text-left text-xs text-sumi/50 font-normal py-3 pr-4 w-32 align-bottom">比較項目</th>
                  {/* 空の列 */}
                  {Array.from({ length: 3 }, (_, i) => {
                    const p = selectedProviders[i];
                    const nm = p ? (p.tradeName || p.companyName) : null;
                    return (
                      <th key={i} className="text-center pb-4 px-3 align-bottom">
                        {p ? (
                          <div className="relative">
                            <button
                              onClick={() => removeProvider(p.id)}
                              className="absolute -top-2 -right-2 w-5 h-5 bg-sumi/20 hover:bg-do text-white text-xs flex items-center justify-center transition-colors"
                              aria-label="削除"
                            >
                              ✕
                            </button>
                            <div className="w-16 h-16 bg-kiji mx-auto tatami-pattern flex items-center justify-center text-xl mb-2" style={{ fontFamily: "var(--font-serif)" }}>
                              {nm!.charAt(0)}
                            </div>
                            <Link href={`/providers/${p.id}`} className="text-sm font-medium text-sumi hover:text-ai transition-colors block">
                              {nm}
                            </Link>
                            <p className="text-xs text-sumi/40 mt-0.5">{p.city}</p>
                            {p.plan === "premium" && (
                              <span className="text-xs px-2 py-0.5 bg-kincya/10 border border-kincya/30 text-kincya mt-1 inline-block">おすすめ</span>
                            )}
                          </div>
                        ) : (
                          <div className="w-16 h-16 bg-kiji/20 border-2 border-dashed border-border mx-auto flex items-center justify-center text-2xl text-sumi/20">
                            +
                          </div>
                        )}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map((row, rowIdx) => (
                  <tr key={row.label} className={rowIdx % 2 === 0 ? "bg-white" : "bg-kiji/20"}>
                    <td className="py-3 pr-4 text-xs text-sumi/50 align-top whitespace-nowrap">{row.label}</td>
                    {Array.from({ length: 3 }, (_, i) => {
                      const p = selectedProviders[i];
                      return (
                        <td key={i} className="py-3 px-3 text-sm text-sumi text-center align-top">
                          {p ? (
                            <span className={
                              typeof row.key(p) === "string" && (row.key(p) === "○" || row.key(p) === "加入済み")
                                ? "text-igusa font-medium"
                                : typeof row.key(p) === "string" && row.key(p) === "✕"
                                ? "text-sumi/25"
                                : ""
                            }>
                              {row.key(p)}
                            </span>
                          ) : (
                            <span className="text-sumi/20">—</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}

                {/* サービス一覧 */}
                <tr className="bg-kiji/40">
                  <td className="py-3 pr-4 text-xs text-sumi/50 font-medium align-top">提供サービス</td>
                  {Array.from({ length: 3 }, (_, i) => {
                    const p = selectedProviders[i];
                    if (!p) return <td key={i} />;
                    const services = getServicesByProviderId(p.id);
                    return (
                      <td key={i} className="py-3 px-3 align-top">
                        {services.length > 0 ? (
                          <div className="space-y-1">
                            {services.map((svc) => (
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
                  {Array.from({ length: 3 }, (_, i) => {
                    const p = selectedProviders[i];
                    return (
                      <td key={i} className="py-4 px-3">
                        {p ? (
                          <div className="space-y-2">
                            <Link
                              href={`/providers/${p.id}?tab=booking`}
                              className="block text-center bg-kincya text-white text-xs py-2.5 hover:bg-do transition-colors tracking-wide"
                            >
                              予約リクエスト
                            </Link>
                            <Link
                              href={`/providers/${p.id}`}
                              className="block text-center border border-border text-sumi/60 text-xs py-2 hover:border-ai hover:text-ai transition-all duration-200"
                            >
                              詳細を見る
                            </Link>
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
        )}

        {/* 全業者一覧へ */}
        <div className="mt-8 text-center">
          <Link href="/search" className="inline-block border border-ai text-ai px-6 py-3 text-sm hover:bg-ai hover:text-white transition-all duration-300">
            ← 業者一覧に戻る
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
