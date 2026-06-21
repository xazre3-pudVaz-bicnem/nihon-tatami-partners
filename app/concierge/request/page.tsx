"use client";

import { useState } from "react";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";

// ─── ステップ定義 ─────────────────────────────────────────────────────────────

type Step = 1 | 2 | 3 | 4;

const CONSULT_TYPES = [
  { value: "what_to_order", label: "何を頼むか迷っている" },
  { value: "price_unknown", label: "料金の相場が分からない" },
  { value: "how_to_choose", label: "業者の選び方が分からない" },
  { value: "corporate", label: "複数物件・法人として相談したい" },
];

const PROPERTY_TYPES = [
  { value: "house", label: "一戸建て" },
  { value: "apartment", label: "マンション・アパート" },
  { value: "rental", label: "賃貸物件（退去対応）" },
  { value: "ryokan", label: "旅館・ホテル" },
  { value: "temple", label: "寺社・仏閣" },
  { value: "store", label: "店舗・事務所" },
  { value: "other", label: "その他・分からない" },
];

const SCHEDULES = [
  { value: "asap", label: "できるだけ早く" },
  { value: "1month", label: "1ヶ月以内" },
  { value: "3months", label: "3ヶ月以内" },
  { value: "undecided", label: "時期は未定" },
];

interface FormData {
  // Step 1
  consultType: string;
  // Step 2
  city: string;
  propertyType: string;
  concern: string;
  // Step 3
  schedule: string;
  isCorporate: boolean;
  companyName: string;
  name: string;
  email: string;
  phone: string;
}

const INITIAL_FORM: FormData = {
  consultType: "",
  city: "",
  propertyType: "",
  concern: "",
  schedule: "undecided",
  isCorporate: false,
  companyName: "",
  name: "",
  email: "",
  phone: "",
};

// ─── コンポーネント ────────────────────────────────────────────────────────

export default function ConciergeRequestPage() {
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);

  const set = <K extends keyof FormData>(key: K, value: FormData[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const canNext = () => {
    if (step === 1) return form.consultType !== "";
    if (step === 2) return form.city.trim() !== "" && form.concern.trim() !== "";
    if (step === 3) return form.name.trim() !== "" && (form.email.trim() !== "" || form.phone.trim() !== "");
    return true;
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-shiro flex flex-col items-center justify-center px-4 py-20 text-center">
        <div className="w-14 h-14 rounded-full bg-igusa/10 flex items-center justify-center mb-6">
          <svg className="w-7 h-7 text-igusa" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl text-sumi mb-3" style={{ fontFamily: "var(--font-serif)" }}>
          ご相談内容を受け付けました
        </h2>
        <p className="text-sm text-sumi/60 max-w-sm mb-3 leading-relaxed">
          内容を確認のうえ、ご登録の連絡先にご連絡します（通常1〜2営業日以内）。
        </p>
        <p className="text-xs text-sumi/40 max-w-sm mb-8 leading-relaxed">
          電話での当日対応は行っておりません。フォームからのご相談をご利用ください。
        </p>
        <div className="flex gap-3 flex-wrap justify-center">
          <Link href="/" className="border border-border text-sumi/60 px-6 py-3 text-sm hover:border-ai hover:text-ai transition-colors">
            トップページへ
          </Link>
          <Link href="/search" className="bg-kincya text-white px-6 py-3 text-sm font-bold hover:bg-do transition-colors">
            業者を探す
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ヘッダー */}
      <div className="bg-sumi py-10 px-4">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            variant="dark"
            items={[
              { label: "ホーム", href: "/" },
              { label: "業者選び相談", href: "/concierge" },
              { label: "相談フォーム" },
            ]}
          />
          <h1
            className="text-2xl text-white mt-4 mb-2"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            業者選び相談フォーム
          </h1>
          <p className="text-white/60 text-sm">無料でご利用いただけます</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
        {/* ステップインジケーター */}
        <div className="flex items-center mb-10">
          {([1, 2, 3, 4] as Step[]).map((s, i) => (
            <div key={s} className="flex items-center flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                  step === s
                    ? "bg-ai text-white"
                    : step > s
                    ? "bg-igusa text-white"
                    : "bg-kiji border border-border text-sumi/40"
                }`}
              >
                {step > s ? "✓" : s}
              </div>
              {i < 3 && <div className={`flex-1 h-px mx-1 ${step > s ? "bg-igusa" : "bg-border"}`} />}
            </div>
          ))}
        </div>

        {/* Step 1: 相談の種類 */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg text-sumi mb-1" style={{ fontFamily: "var(--font-serif)" }}>
                Step 1 — 相談の種類
              </h2>
              <p className="text-xs text-sumi/50">当てはまるものを1つ選んでください</p>
            </div>
            <div className="space-y-2">
              {CONSULT_TYPES.map((ct) => (
                <button
                  key={ct.value}
                  type="button"
                  onClick={() => set("consultType", ct.value)}
                  className={`w-full text-left text-sm px-5 py-4 border transition-colors ${
                    form.consultType === ct.value
                      ? "border-ai bg-ai/5 text-ai"
                      : "border-border text-sumi/70 hover:border-ai/50"
                  }`}
                >
                  <span className="font-medium">{ct.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: 現場情報 */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg text-sumi mb-1" style={{ fontFamily: "var(--font-serif)" }}>
                Step 2 — 現場情報
              </h2>
              <p className="text-xs text-sumi/50">現場の情報と困っている内容を教えてください</p>
            </div>

            <div>
              <label className="block text-sm text-sumi mb-1.5">
                地域・市区町村 <span className="text-do text-xs">必須</span>
              </label>
              <input
                type="text"
                value={form.city}
                onChange={(e) => set("city", e.target.value)}
                placeholder="例：さいたま市・川口市"
                className="w-full border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-ai transition-colors placeholder:text-sumi/30"
              />
            </div>

            <div>
              <label className="block text-sm text-sumi mb-2">建物の種別</label>
              <div className="grid grid-cols-2 gap-2">
                {PROPERTY_TYPES.map((pt) => (
                  <button
                    key={pt.value}
                    type="button"
                    onClick={() => set("propertyType", pt.value)}
                    className={`text-sm px-3 py-2.5 border text-left transition-colors ${
                      form.propertyType === pt.value
                        ? "border-ai bg-ai/5 text-ai"
                        : "border-border text-sumi/70 hover:border-ai/50"
                    }`}
                  >
                    {pt.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm text-sumi mb-1.5">
                困っている内容・ご相談内容 <span className="text-do text-xs">必須</span>
              </label>
              <textarea
                value={form.concern}
                onChange={(e) => set("concern", e.target.value)}
                rows={5}
                placeholder="例：退去立会いが来月で、畳と障子を急いで手配したいが、どこに頼めばよいか分からない。"
                className="w-full border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-ai transition-colors placeholder:text-sumi/30 resize-none"
              />
            </div>
          </div>
        )}

        {/* Step 3: 希望時期・連絡先 */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg text-sumi mb-1" style={{ fontFamily: "var(--font-serif)" }}>
                Step 3 — 希望時期・連絡先
              </h2>
              <p className="text-xs text-sumi/50">ご回答の連絡先は必須です（メール or 電話のいずれか）</p>
            </div>

            <div>
              <label className="block text-sm text-sumi mb-2">ご希望の時期</label>
              <div className="grid grid-cols-2 gap-2">
                {SCHEDULES.map((s) => (
                  <button
                    key={s.value}
                    type="button"
                    onClick={() => set("schedule", s.value)}
                    className={`text-sm px-3 py-2.5 border text-left transition-colors ${
                      form.schedule === s.value
                        ? "border-ai bg-ai/5 text-ai"
                        : "border-border text-sumi/70 hover:border-ai/50"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.isCorporate}
                onChange={(e) => set("isCorporate", e.target.checked)}
                className="w-4 h-4 accent-ai"
              />
              <span className="text-sm text-sumi">法人・会社・管理会社として相談する</span>
            </label>

            {form.isCorporate && (
              <div>
                <label className="block text-sm text-sumi mb-1.5">会社名・組織名</label>
                <input
                  type="text"
                  value={form.companyName}
                  onChange={(e) => set("companyName", e.target.value)}
                  placeholder="例：株式会社○○不動産"
                  className="w-full border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-ai transition-colors placeholder:text-sumi/30"
                />
              </div>
            )}

            <div>
              <label className="block text-sm text-sumi mb-1.5">
                お名前 <span className="text-do text-xs">必須</span>
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="例：山田 太郎"
                className="w-full border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-ai transition-colors placeholder:text-sumi/30"
              />
            </div>

            <div>
              <label className="block text-sm text-sumi mb-1.5">
                メールアドレス <span className="text-sumi/40 text-xs">（メール or 電話のいずれか必須）</span>
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                placeholder="example@email.com"
                className="w-full border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-ai transition-colors placeholder:text-sumi/30"
              />
            </div>

            <div>
              <label className="block text-sm text-sumi mb-1.5">電話番号（任意）</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                placeholder="例：090-1234-5678"
                className="w-full border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-ai transition-colors placeholder:text-sumi/30"
              />
            </div>

            <div className="bg-kiji/40 border border-kiji p-4 text-xs text-sumi/60 leading-relaxed">
              電話での当日対応は行っておりません。フォームからのご相談をご利用ください。ご連絡は通常1〜2営業日以内を目安としています。
            </div>
          </div>
        )}

        {/* Step 4: 確認画面 */}
        {step === 4 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg text-sumi mb-1" style={{ fontFamily: "var(--font-serif)" }}>
                Step 4 — 入力内容の確認
              </h2>
              <p className="text-xs text-sumi/50">内容を確認して送信してください</p>
            </div>

            <div className="border border-border bg-white divide-y divide-kiji">
              {[
                { label: "相談の種類", value: CONSULT_TYPES.find((c) => c.value === form.consultType)?.label ?? "—" },
                { label: "地域", value: form.city || "—" },
                { label: "建物種別", value: PROPERTY_TYPES.find((p) => p.value === form.propertyType)?.label ?? "—" },
                { label: "お困りの内容", value: form.concern || "—" },
                { label: "ご希望時期", value: SCHEDULES.find((s) => s.value === form.schedule)?.label ?? "—" },
                { label: "法人対応", value: form.isCorporate ? `はい（${form.companyName || "会社名未入力"}）` : "個人" },
                { label: "お名前", value: form.name || "—" },
                { label: "メール", value: form.email || "—" },
                { label: "電話", value: form.phone || "未入力" },
              ].map((row, i) => (
                <div key={i} className="flex gap-4 px-5 py-3">
                  <dt className="text-xs text-sumi/50 w-28 shrink-0">{row.label}</dt>
                  <dd className="text-sm text-sumi leading-relaxed">{row.value}</dd>
                </div>
              ))}
            </div>

            <div className="bg-kiji/40 border border-kiji p-4">
              <p className="text-xs text-sumi/60 leading-relaxed">
                送信後、ご登録の連絡先にご連絡します（通常1〜2営業日以内）。電話での当日対応は行っておりません。
              </p>
            </div>
          </div>
        )}

        {/* ナビゲーションボタン */}
        <div className="flex justify-between mt-8">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep((prev) => (prev - 1) as Step)}
              className="border border-border text-sumi/60 px-6 py-3 text-sm hover:border-ai hover:text-ai transition-colors"
            >
              ← 戻る
            </button>
          ) : (
            <Link
              href="/concierge"
              className="border border-border text-sumi/60 px-6 py-3 text-sm hover:border-ai hover:text-ai transition-colors"
            >
              ← 戻る
            </Link>
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={() => setStep((prev) => (prev + 1) as Step)}
              disabled={!canNext()}
              className={`px-8 py-3 text-sm font-bold transition-colors ${
                canNext()
                  ? "bg-kincya text-white hover:bg-do"
                  : "bg-kiji text-sumi/30 cursor-not-allowed"
              }`}
            >
              次へ →
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-kincya text-white px-8 py-3 text-sm font-bold hover:bg-do transition-colors"
            >
              送信する
            </button>
          )}
        </div>
      </div>
    </>
  );
}
