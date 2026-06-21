"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { POPULAR_CATEGORIES } from "@/data/categories";
import { getTopProviders } from "@/data/providers";

const PROVIDERS = getTopProviders(10);

const PROPERTY_TYPES = ["戸建て", "マンション・アパート", "賃貸物件", "旅館・宿泊施設", "寺社・仏閣", "店舗・事務所", "その他"];
const TATAMI_COUNTS = ["1畳", "2畳", "3畳", "4畳", "4.5畳", "6畳", "8畳", "10畳", "12畳", "15畳", "20畳以上"];
const SCHEDULES = ["できるだけ早く（1週間以内）", "1ヶ月以内", "3ヶ月以内", "半年以内", "時期は未定"];

type Step = 1 | 2 | 3 | 4 | 5;

interface FormData {
  services: string[];
  propertyType: string;
  tatamiCount: string;
  city: string;
  schedule: string;
  notes: string;
  selectedProviders: string[];
  autoSelect: boolean;
  name: string;
  email: string;
  phone: string;
}

const INITIAL_FORM: FormData = {
  services: [],
  propertyType: "",
  tatamiCount: "",
  city: "",
  schedule: "",
  notes: "",
  selectedProviders: [],
  autoSelect: false,
  name: "",
  email: "",
  phone: "",
};

export default function BulkQuoteNewPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);

  function toggleService(id: string) {
    setForm((f) => ({
      ...f,
      services: f.services.includes(id) ? f.services.filter((s) => s !== id) : [...f.services, id],
    }));
  }

  function toggleProvider(id: string) {
    setForm((f) => {
      if (f.selectedProviders.includes(id)) {
        return { ...f, selectedProviders: f.selectedProviders.filter((p) => p !== id) };
      }
      if (f.selectedProviders.length >= 5) return f;
      return { ...f, selectedProviders: [...f.selectedProviders, id] };
    });
  }

  function canNext(): boolean {
    switch (step) {
      case 1: return form.services.length > 0;
      case 2: return !!form.propertyType && !!form.tatamiCount && !!form.city;
      case 3: return !!form.schedule;
      case 4: return form.autoSelect || form.selectedProviders.length > 0;
      case 5: return !!form.name && !!form.email;
      default: return false;
    }
  }

  async function handleSubmit() {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    const providerCount = form.autoSelect ? 3 : form.selectedProviders.length;
    router.push(`/bulk-quote/complete?providers=${providerCount}&schedule=${encodeURIComponent(form.schedule)}`);
  }

  const stepLabels = ["サービス選択", "建物情報", "希望時期", "業者を選ぶ", "お客様情報"];

  return (
    <div className="min-h-screen bg-shiro">
      {/* Header */}
      <div className="bg-sumi">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="text-xs text-white/40">
            <Link href="/" className="hover:text-white/70 transition-colors">トップ</Link>
            <span className="mx-1.5 text-white/20">/</span>
            <Link href="/bulk-quote" className="hover:text-white/70 transition-colors">一括見積もり</Link>
            <span className="mx-1.5 text-white/20">/</span>
            <span className="text-white/60">依頼内容を入力</span>
          </nav>
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 pt-3">
          <h1 className="text-xl md:text-2xl text-white mb-2" style={{ fontFamily: "var(--font-serif)" }}>
            見積もり依頼の内容を入力
          </h1>
          <p className="text-xs text-white/50">1回の入力で最大5社へ同時に見積もり依頼ができます</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ステップ表示 */}
        <div className="flex items-center justify-between mb-8 overflow-x-auto">
          {stepLabels.map((label, i) => {
            const s = (i + 1) as Step;
            const active = step === s;
            const done = step > s;
            return (
              <div key={i} className="flex items-center shrink-0">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 flex items-center justify-center text-xs font-bold border ${
                      done
                        ? "bg-igusa border-igusa text-white"
                        : active
                        ? "bg-sumi border-sumi text-white"
                        : "bg-white border-border text-sumi/40"
                    }`}
                  >
                    {done ? "✓" : s}
                  </div>
                  <span className={`text-[10px] mt-1 text-center hidden sm:block ${active ? "text-sumi font-bold" : "text-sumi/40"}`}>
                    {label}
                  </span>
                </div>
                {i < stepLabels.length - 1 && (
                  <div className={`h-px w-6 sm:w-10 mx-1 ${done ? "bg-igusa" : "bg-border"}`} />
                )}
              </div>
            );
          })}
        </div>

        <div className="bg-white border border-border p-6 sm:p-8 mb-6">
          {/* Step 1: サービス選択 */}
          {step === 1 && (
            <div>
              <h2 className="text-lg text-sumi mb-1" style={{ fontFamily: "var(--font-serif)" }}>
                ご希望のサービスを選んでください
              </h2>
              <p className="text-xs text-sumi/50 mb-6">複数選択できます</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {POPULAR_CATEGORIES.map((cat) => {
                  const selected = form.services.includes(cat.id);
                  return (
                    <button
                      key={cat.id}
                      onClick={() => toggleService(cat.id)}
                      className={`text-left border p-3 transition-all ${
                        selected
                          ? "border-ai bg-ai/5 text-ai"
                          : "border-border bg-white text-sumi hover:border-ai/40"
                      }`}
                    >
                      <span className={`block text-sm font-medium mb-0.5 ${selected ? "text-ai" : "text-sumi"}`}>
                        {cat.shortName}
                      </span>
                      <span className="text-[10px] text-sumi/50">
                        {cat.priceFrom != null ? `${cat.priceFrom.toLocaleString()}円〜/${cat.unit}` : "要見積もり"}
                      </span>
                      {selected && (
                        <span className="block text-[10px] text-ai mt-1">✓ 選択中</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 2: 建物情報 */}
          {step === 2 && (
            <div>
              <h2 className="text-lg text-sumi mb-1" style={{ fontFamily: "var(--font-serif)" }}>
                建物の情報を入力してください
              </h2>
              <p className="text-xs text-sumi/50 mb-6">概算の参考になります。正確な金額は現地確認後に確定します。</p>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm text-sumi mb-2">建物種別 <span className="text-do">*</span></label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {PROPERTY_TYPES.map((pt) => (
                      <button
                        key={pt}
                        onClick={() => setForm((f) => ({ ...f, propertyType: pt }))}
                        className={`text-sm border py-2.5 px-3 transition-all text-left ${
                          form.propertyType === pt
                            ? "border-ai bg-ai/5 text-ai"
                            : "border-border text-sumi hover:border-ai/40"
                        }`}
                      >
                        {pt}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-sumi mb-2">畳の枚数（目安） <span className="text-do">*</span></label>
                  <select
                    value={form.tatamiCount}
                    onChange={(e) => setForm((f) => ({ ...f, tatamiCount: e.target.value }))}
                    className="w-full border border-border p-2.5 text-sm text-sumi bg-white focus:outline-none focus:border-ai"
                  >
                    <option value="">選択してください</option>
                    {TATAMI_COUNTS.map((tc) => (
                      <option key={tc} value={tc}>{tc}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-sumi mb-2">市区町村 <span className="text-do">*</span></label>
                  <input
                    type="text"
                    value={form.city}
                    onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                    placeholder="例: さいたま市、川越市"
                    className="w-full border border-border p-2.5 text-sm text-sumi focus:outline-none focus:border-ai"
                  />
                  <p className="text-[11px] text-sumi/40 mt-1">現在は埼玉県内に対応しています</p>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: 希望時期・補足 */}
          {step === 3 && (
            <div>
              <h2 className="text-lg text-sumi mb-1" style={{ fontFamily: "var(--font-serif)" }}>
                ご希望の時期を教えてください
              </h2>
              <p className="text-xs text-sumi/50 mb-6">工事の時期の目安をお知らせください</p>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm text-sumi mb-2">希望時期 <span className="text-do">*</span></label>
                  <div className="space-y-2">
                    {SCHEDULES.map((s) => (
                      <button
                        key={s}
                        onClick={() => setForm((f) => ({ ...f, schedule: s }))}
                        className={`w-full text-left text-sm border py-3 px-4 transition-all ${
                          form.schedule === s
                            ? "border-ai bg-ai/5 text-ai"
                            : "border-border text-sumi hover:border-ai/40"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-sumi mb-2">補足・ご要望（任意）</label>
                  <textarea
                    value={form.notes}
                    onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                    rows={4}
                    placeholder="例: 6畳間1室の表替え希望。子どもがいるのでダニ対策素材を希望します。"
                    className="w-full border border-border p-2.5 text-sm text-sumi focus:outline-none focus:border-ai resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: 業者を選ぶ */}
          {step === 4 && (
            <div>
              <h2 className="text-lg text-sumi mb-1" style={{ fontFamily: "var(--font-serif)" }}>
                見積もりを依頼する業者を選んでください
              </h2>
              <p className="text-xs text-sumi/50 mb-5">最大5社まで選べます（{form.selectedProviders.length}/5社選択中）</p>

              {/* 自動選定オプション */}
              <div
                className={`border p-4 mb-5 cursor-pointer transition-all ${
                  form.autoSelect ? "border-igusa bg-igusa/5" : "border-border hover:border-igusa/40"
                }`}
                onClick={() => setForm((f) => ({ ...f, autoSelect: !f.autoSelect, selectedProviders: [] }))}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-5 h-5 border flex items-center justify-center shrink-0 mt-0.5 ${form.autoSelect ? "border-igusa bg-igusa" : "border-border"}`}>
                    {form.autoSelect && <span className="text-white text-xs">✓</span>}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-sumi">条件に合う業者を自動選定する（おすすめ）</p>
                    <p className="text-xs text-sumi/50 mt-0.5">エリア・サービス・評価をもとに最適な業者を最大3社ご提案します</p>
                  </div>
                </div>
              </div>

              {!form.autoSelect && (
                <div className="space-y-3">
                  {PROVIDERS.map((prov) => {
                    const selected = form.selectedProviders.includes(prov.id);
                    const disabled = !selected && form.selectedProviders.length >= 5;
                    return (
                      <div
                        key={prov.id}
                        onClick={() => !disabled && toggleProvider(prov.id)}
                        className={`border p-4 transition-all ${
                          selected
                            ? "border-ai bg-ai/5"
                            : disabled
                            ? "border-border opacity-50 cursor-not-allowed"
                            : "border-border hover:border-ai/40 cursor-pointer"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-5 h-5 border flex items-center justify-center shrink-0 mt-0.5 ${selected ? "border-ai bg-ai" : "border-border"}`}>
                            {selected && <span className="text-white text-xs">✓</span>}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <p className="text-sm font-medium text-sumi">{prov.tradeName || prov.companyName}</p>
                              <span className="text-xs text-sumi/40 shrink-0">{prov.city}</span>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-kincya text-xs">{"★".repeat(Math.floor(prov.averageRating))}</span>
                              <span className="text-xs text-sumi/60">{prov.averageRating.toFixed(1)}（{prov.reviewCount}件）</span>
                            </div>
                            <div className="flex flex-wrap gap-1 mt-1.5">
                              {prov.hasInsurance && (
                                <span className="text-[10px] border border-kincya/30 text-kincya px-1.5 py-0.5">保険加入</span>
                              )}
                              {prov.acceptsCorporate && (
                                <span className="text-[10px] border border-ai/30 text-ai px-1.5 py-0.5">法人対応</span>
                              )}
                              {prov.canSameDayResponse && (
                                <span className="text-[10px] border border-igusa/30 text-igusa px-1.5 py-0.5">即日対応</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Step 5: お客様情報 + 確認 */}
          {step === 5 && (
            <div>
              <h2 className="text-lg text-sumi mb-1" style={{ fontFamily: "var(--font-serif)" }}>
                お客様情報を入力してください
              </h2>
              <p className="text-xs text-sumi/50 mb-6">業者からの連絡先として使用します</p>
              <div className="space-y-4 mb-8">
                <div>
                  <label className="block text-sm text-sumi mb-1.5">お名前 <span className="text-do">*</span></label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder="例: 田中 太郎"
                    className="w-full border border-border p-2.5 text-sm focus:outline-none focus:border-ai"
                  />
                </div>
                <div>
                  <label className="block text-sm text-sumi mb-1.5">メールアドレス <span className="text-do">*</span></label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    placeholder="例: tanaka@example.com"
                    className="w-full border border-border p-2.5 text-sm focus:outline-none focus:border-ai"
                  />
                </div>
                <div>
                  <label className="block text-sm text-sumi mb-1.5">電話番号（任意）</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    placeholder="例: 090-1234-5678"
                    className="w-full border border-border p-2.5 text-sm focus:outline-none focus:border-ai"
                  />
                </div>
              </div>

              {/* 確認テーブル */}
              <div className="border border-border bg-kiji/20 p-5 mb-6">
                <h3 className="text-sm text-sumi mb-3" style={{ fontFamily: "var(--font-serif)" }}>依頼内容の確認</h3>
                <dl className="space-y-2 text-xs">
                  <div className="flex gap-3">
                    <dt className="text-sumi/40 w-24 shrink-0">サービス</dt>
                    <dd className="text-sumi">{form.services.map((id) => POPULAR_CATEGORIES.find((c) => c.id === id)?.shortName).filter(Boolean).join("、") || "—"}</dd>
                  </div>
                  <div className="flex gap-3">
                    <dt className="text-sumi/40 w-24 shrink-0">建物種別</dt>
                    <dd className="text-sumi">{form.propertyType || "—"}</dd>
                  </div>
                  <div className="flex gap-3">
                    <dt className="text-sumi/40 w-24 shrink-0">畳の枚数</dt>
                    <dd className="text-sumi">{form.tatamiCount || "—"}</dd>
                  </div>
                  <div className="flex gap-3">
                    <dt className="text-sumi/40 w-24 shrink-0">市区町村</dt>
                    <dd className="text-sumi">{form.city || "—"}</dd>
                  </div>
                  <div className="flex gap-3">
                    <dt className="text-sumi/40 w-24 shrink-0">希望時期</dt>
                    <dd className="text-sumi">{form.schedule || "—"}</dd>
                  </div>
                  <div className="flex gap-3">
                    <dt className="text-sumi/40 w-24 shrink-0">依頼業者</dt>
                    <dd className="text-sumi">
                      {form.autoSelect
                        ? "自動選定（最大3社）"
                        : form.selectedProviders.length > 0
                        ? `${form.selectedProviders.length}社選択`
                        : "—"}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="bg-kiji/30 border border-kiji p-4 text-xs text-sumi/60 leading-relaxed">
                ※ 表示金額はあくまで概算です。正確な費用は業者の現地確認後に確定します。見積もり内容を確認してから依頼できます。
              </div>
            </div>
          )}
        </div>

        {/* ナビゲーションボタン */}
        <div className="flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={() => setStep((s) => (s - 1) as Step)}
              className="text-sm border border-border text-sumi/60 px-6 py-3 hover:border-sumi/40 transition-colors"
            >
              ← 前に戻る
            </button>
          ) : (
            <Link href="/bulk-quote" className="text-sm text-sumi/40 hover:text-sumi transition-colors">
              ← 戻る
            </Link>
          )}

          {step < 5 ? (
            <button
              onClick={() => setStep((s) => (s + 1) as Step)}
              disabled={!canNext()}
              className={`text-sm px-8 py-3 font-bold transition-colors ${
                canNext()
                  ? "bg-kincya text-white hover:bg-do"
                  : "bg-sumi/20 text-white cursor-not-allowed"
              }`}
            >
              次へ →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!canNext() || submitting}
              className={`text-sm px-8 py-3 font-bold transition-colors ${
                canNext() && !submitting
                  ? "bg-kincya text-white hover:bg-do"
                  : "bg-sumi/20 text-white cursor-not-allowed"
              }`}
            >
              {submitting ? "送信中..." : "見積もりを依頼する"}
            </button>
          )}
        </div>

        <p className="text-center text-[11px] text-sumi/30 mt-4">
          見積もり依頼は無料です。依頼後にキャンセルすることもできます。
        </p>
      </div>
    </div>
  );
}
