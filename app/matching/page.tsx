"use client";

import { useState } from "react";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { POPULAR_CATEGORIES } from "@/data/categories";
import SampleBadge from "@/components/common/SampleBadge";
import { getMatchingProviders, getProviderFromResults } from "@/lib/matching";
import type { MatchingCondition } from "@/lib/types-platform";

const BUILDING_TYPES = [
  { value: "house", label: "戸建て" },
  { value: "apartment", label: "マンション" },
  { value: "rental", label: "賃貸" },
  { value: "ryokan", label: "旅館" },
  { value: "temple", label: "寺社" },
  { value: "store", label: "店舗" },
  { value: "other", label: "その他" },
];

const SCHEDULE_OPTIONS = [
  "できるだけ早く",
  "1週間以内",
  "1ヶ月以内",
  "3ヶ月以内",
  "未定",
];

interface FormState {
  city: string;
  serviceCategory: string;
  buildingType: string;
  schedule: string;
  isCorporate: boolean;
  needsWeekend: boolean;
  needsPhotoEstimate: boolean;
  needsInvoice: boolean;
}

const INITIAL_FORM: FormState = {
  city: "",
  serviceCategory: "",
  buildingType: "",
  schedule: "",
  isCorporate: false,
  needsWeekend: false,
  needsPhotoEstimate: false,
  needsInvoice: false,
};

function ScoreBadge({ score }: { score: number }) {
  const color =
    score >= 80 ? "bg-igusa/15 text-igusa border-igusa/30"
    : score >= 60 ? "bg-kincya/15 text-kincya border-kincya/30"
    : "bg-sumi/10 text-sumi/60 border-sumi/20";
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded border ${color}`}>
      条件との相性 {score}%
    </span>
  );
}

export default function MatchingPage() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [results, setResults] = useState<ReturnType<typeof getProviderFromResults> | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const condition: MatchingCondition = {
      city: form.city || undefined,
      serviceCategory: form.serviceCategory || undefined,
      propertyType: form.buildingType || undefined,
      schedule: form.schedule || undefined,
      isCorporate: form.isCorporate,
      needsWeekend: form.needsWeekend,
      needsPhotoEstimate: form.needsPhotoEstimate,
      needsInvoice: form.needsInvoice,
      needsRyokan: form.buildingType === "ryokan",
      needsTempleShrine: form.buildingType === "temple",
    };

    // 非同期に見せるためのmock遅延
    setTimeout(() => {
      const matchingResults = getMatchingProviders(condition, 5);
      const withProviders = getProviderFromResults(matchingResults);
      setResults(withProviders);
      setIsLoading(false);
    }, 600);
  };

  const handleReset = () => {
    setResults(null);
    setForm(INITIAL_FORM);
  };

  return (
    <div className="bg-cloud min-h-screen">
      {/* ヘッダー */}
      <div className="bg-sumi text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs
            items={[
              { label: "トップ", href: "/" },
              { label: "おまかせマッチング" },
            ]}
            variant="dark"
          />
          <h1
            className="text-2xl sm:text-3xl font-bold mt-4 mb-2"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            おまかせマッチング
          </h1>
          <p className="text-white/70 text-sm">
            条件を入力するだけで、あなたの状況に合った業者を自動提案します。
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 入力フォーム */}
          <div className={`${results ? "lg:col-span-1" : "lg:col-span-2"}`}>
            <div className="bg-shiro border border-border rounded-xl p-6">
              <h2 className="text-base font-bold text-sumi mb-5" style={{ fontFamily: "var(--font-serif)" }}>
                {results ? "検索条件" : "条件を入力してください"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* 市区町村 */}
                <div>
                  <label className="block text-xs font-medium text-sumi/70 mb-1.5">市区町村</label>
                  <input
                    type="text"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    placeholder="例：さいたま市、川口市"
                    className="w-full border border-border rounded-lg px-3 py-2 text-sm text-sumi focus:outline-none focus:border-kincya"
                  />
                </div>

                {/* サービス */}
                <div>
                  <label className="block text-xs font-medium text-sumi/70 mb-1.5">依頼したいサービス</label>
                  <select
                    value={form.serviceCategory}
                    onChange={(e) => setForm({ ...form, serviceCategory: e.target.value })}
                    className="w-full border border-border rounded-lg px-3 py-2 text-sm text-sumi focus:outline-none focus:border-kincya bg-shiro"
                  >
                    <option value="">選択してください（任意）</option>
                    {POPULAR_CATEGORIES.map((cat) => (
                      <option key={cat.slug} value={cat.slug}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 建物種別 */}
                <div>
                  <label className="block text-xs font-medium text-sumi/70 mb-1.5">建物種別</label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {BUILDING_TYPES.map((bt) => (
                      <label
                        key={bt.value}
                        className={`flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg border text-sm transition-colors duration-150 ${
                          form.buildingType === bt.value
                            ? "border-kincya bg-kincya/10 text-sumi font-medium"
                            : "border-border text-sumi/70 hover:bg-kiji"
                        }`}
                      >
                        <input
                          type="radio"
                          name="buildingType"
                          value={bt.value}
                          checked={form.buildingType === bt.value}
                          onChange={() => setForm({ ...form, buildingType: bt.value })}
                          className="sr-only"
                        />
                        <span className={`w-3 h-3 rounded-full border flex-shrink-0 ${form.buildingType === bt.value ? "bg-kincya border-kincya" : "border-sumi/30"}`} />
                        {bt.label}
                      </label>
                    ))}
                  </div>
                </div>

                {/* 希望時期 */}
                <div>
                  <label className="block text-xs font-medium text-sumi/70 mb-1.5">希望時期</label>
                  <select
                    value={form.schedule}
                    onChange={(e) => setForm({ ...form, schedule: e.target.value })}
                    className="w-full border border-border rounded-lg px-3 py-2 text-sm text-sumi focus:outline-none focus:border-kincya bg-shiro"
                  >
                    <option value="">選択してください（任意）</option>
                    {SCHEDULE_OPTIONS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* オプション */}
                <div>
                  <p className="text-xs font-medium text-sumi/70 mb-2">オプション条件</p>
                  <div className="space-y-2">
                    {[
                      { key: "isCorporate" as const, label: "法人・管理会社として依頼" },
                      { key: "needsWeekend" as const, label: "土日対応必要" },
                      { key: "needsPhotoEstimate" as const, label: "写真見積もり希望" },
                      { key: "needsInvoice" as const, label: "インボイス対応希望" },
                    ].map(({ key, label }) => (
                      <label key={key} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={form[key]}
                          onChange={(e) => setForm({ ...form, [key]: e.target.checked })}
                          className="w-4 h-4 accent-kincya"
                        />
                        <span className="text-sm text-sumi/75">{label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-kincya text-white font-medium rounded-lg hover:bg-kincya/90 transition-colors duration-150 text-sm disabled:opacity-60"
                >
                  {isLoading ? "提案中..." : "条件に合う業者を提案する"}
                </button>
              </form>
            </div>
          </div>

          {/* 結果エリア */}
          {results && (
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-sumi" style={{ fontFamily: "var(--font-serif)" }}>
                  提案業者 {results.length}社
                </h2>
                <button
                  onClick={handleReset}
                  className="text-xs text-ai border border-ai rounded-lg px-3 py-1.5 hover:bg-ai hover:text-white transition-colors duration-150"
                >
                  条件をリセット
                </button>
              </div>

              {results.length === 0 ? (
                <div className="bg-shiro border border-border rounded-xl p-8 text-center">
                  <p className="text-sumi/60 text-sm">条件に合う業者が見つかりませんでした。</p>
                  <p className="text-sumi/50 text-xs mt-1">条件を変更してお試しください。</p>
                </div>
              ) : (
                results.map(({ result, provider }) => (
                  <div key={provider.id} className="bg-shiro border border-border rounded-xl p-5">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="text-xs text-sumi/50">#{result.rank}</span>
                          <ScoreBadge score={result.score.total} />
                          {provider.isSample && <SampleBadge />}
                        </div>
                        <h3 className="text-base font-bold text-sumi">
                          {provider.tradeName ?? provider.companyName}
                        </h3>
                        <p className="text-xs text-sumi/55 mt-0.5">
                          {provider.city} / 評価 {provider.averageRating} ({provider.reviewCount}件)
                        </p>
                      </div>
                    </div>

                    {/* マッチング理由 */}
                    {result.score.reasons.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {result.score.reasons
                          .filter((r) => r.positive)
                          .slice(0, 4)
                          .map((reason) => (
                            <span
                              key={reason.type}
                              className="inline-block text-xs bg-igusa/10 text-igusa border border-igusa/20 rounded px-2 py-0.5"
                            >
                              ✓ {reason.label}
                            </span>
                          ))}
                      </div>
                    )}

                    <p className="text-xs text-sumi/65 mb-4 leading-relaxed line-clamp-2">
                      {provider.catchCopy}
                    </p>

                    <div className="flex gap-2">
                      <Link
                        href={`/providers/${provider.id}`}
                        className="flex-1 text-center text-xs font-medium text-sumi border border-border rounded-lg py-2 hover:bg-kiji transition-colors duration-150"
                      >
                        比較に追加
                      </Link>
                      <Link
                        href={`/quote/new?provider=${provider.id}`}
                        className="flex-1 text-center text-xs font-medium text-white bg-kincya rounded-lg py-2 hover:bg-kincya/90 transition-colors duration-150"
                      >
                        見積もりを依頼
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* 結果なし時のサイドバー */}
          {!results && (
            <div className="space-y-4">
              <div className="bg-shiro border border-border rounded-xl p-5">
                <h3 className="text-sm font-bold text-sumi mb-3" style={{ fontFamily: "var(--font-serif)" }}>
                  マッチングの仕組み
                </h3>
                <ul className="space-y-2">
                  {[
                    "対応エリアを最優先で照合",
                    "サービス内容と業者の得意分野を照合",
                    "口コミ評価・返信速度を加味",
                    "旅館・法人など特殊条件に対応した業者を優先",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-sumi/65 leading-relaxed">
                      <span className="text-igusa flex-shrink-0">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-kiji border border-kiji rounded-xl p-5">
                <h3 className="text-sm font-bold text-sumi mb-2" style={{ fontFamily: "var(--font-serif)" }}>
                  依頼種別が分からない方は
                </h3>
                <p className="text-xs text-sumi/65 mb-3 leading-relaxed">
                  まず「かんたん依頼診断」を試して、おすすめの施工内容を確認しましょう。
                </p>
                <Link
                  href="/request/start"
                  className="block text-center text-xs font-medium text-ai border border-ai rounded-lg py-2 hover:bg-ai hover:text-white transition-colors duration-150"
                >
                  かんたん依頼診断へ
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
