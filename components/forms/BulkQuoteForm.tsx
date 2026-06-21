"use client";

import { useState } from "react";
import Link from "next/link";
import { SERVICE_CATEGORIES } from "@/data/categories";
import type { Provider } from "@/lib/types";
import SampleBadge from "@/components/common/SampleBadge";

const STEPS = ["サービス選択", "建物・状況", "希望日程", "業者を選ぶ", "お客様情報"];

const PROPERTY_TYPES = ["一戸建て（持ち家）", "集合住宅・マンション", "賃貸物件（退去後）", "賃貸物件（入居中）", "旅館・宿泊施設", "寺・神社", "店舗・事務所", "その他"];

const TATAMI_COUNTS = ["1〜3枚", "4〜6枚（6畳）", "7〜10枚", "11〜20枚", "21枚以上（要相談）"];

const SCHEDULES = ["できるだけ早く（即日〜3日以内）", "1週間以内", "2〜3週間以内", "1ヶ月以内", "時期は未定（まず見積もりだけ）"];

interface FormData {
  services: string[];
  propertyType: string;
  tatamiCount: string;
  prefecture: string;
  city: string;
  notes: string;
  schedule: string;
  providerIds: string[];
  name: string;
  phone: string;
  email: string;
  contact: string;
  agree: boolean;
}

const initial: FormData = {
  services: [],
  propertyType: "",
  tatamiCount: "",
  prefecture: "埼玉県",
  city: "",
  notes: "",
  schedule: "",
  providerIds: [],
  name: "",
  phone: "",
  email: "",
  contact: "メール",
  agree: false,
};

interface Props {
  providers: Provider[];
}

export default function BulkQuoteForm({ providers: PROVIDERS }: Props) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(initial);
  const [submitted, setSubmitted] = useState(false);

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const toggleService = (slug: string) => {
    setForm((f) => ({
      ...f,
      services: f.services.includes(slug) ? f.services.filter((s) => s !== slug) : [...f.services, slug],
    }));
  };

  const toggleProvider = (id: string) => {
    setForm((f) => {
      if (f.providerIds.includes(id)) return { ...f, providerIds: f.providerIds.filter((x) => x !== id) };
      if (f.providerIds.length >= 5) return f;
      return { ...f, providerIds: [...f.providerIds, id] };
    });
  };

  const canNext = (() => {
    if (step === 0) return form.services.length > 0;
    if (step === 1) return form.propertyType && form.tatamiCount && form.city;
    if (step === 2) return form.schedule !== "";
    if (step === 3) return form.providerIds.length > 0;
    if (step === 4) return form.name && (form.phone || form.email) && form.agree;
    return true;
  })();

  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto text-center py-16 px-4">
        <div className="w-16 h-16 bg-igusa/10 border border-igusa rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-igusa text-2xl">✓</span>
        </div>
        <h2 className="text-xl text-sumi mb-3" style={{ fontFamily: "var(--font-serif)" }}>
          見積もり依頼を送信しました
        </h2>
        <p className="text-sm text-sumi/60 leading-relaxed mb-2">
          選択した{form.providerIds.length}社に見積もり依頼を送りました。
        </p>
        <p className="text-sm text-sumi/60 leading-relaxed mb-8">
          業者から返信があり次第、ご登録の連絡先にご連絡します（通常1〜2営業日以内）。
        </p>
        <p className="text-xs text-sumi/40 mb-8 bg-kiji/40 border border-kiji p-4 text-left">
          ※ これはデモフォームです。実際の依頼は受け付けておりません。本番公開時に実際の業者情報・問い合わせシステムへ差し替えます。
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/search" className="border border-ai text-ai px-6 py-3 text-sm hover:bg-ai hover:text-white transition-all">
            業者を探す
          </Link>
          <Link href="/" className="text-sm text-sumi/60 px-6 py-3 border border-border hover:border-sumi transition-all">
            トップへ戻る
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* ステップインジケーター */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          {STEPS.map((label, i) => (
            <div key={label} className="flex-1 flex flex-col items-center">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mb-1 transition-all ${i < step ? "bg-igusa text-white" : i === step ? "bg-kincya text-white" : "bg-border text-sumi/30"}`}>
                {i < step ? "✓" : i + 1}
              </div>
              <span className={`text-[10px] hidden sm:block text-center leading-tight ${i === step ? "text-kincya" : "text-sumi/30"}`}>{label}</span>
            </div>
          ))}
        </div>
        <div className="h-0.5 bg-border mx-3.5">
          <div className="h-full bg-kincya transition-all duration-300" style={{ width: `${(step / (STEPS.length - 1)) * 100}%` }} />
        </div>
      </div>

      {/* Step 0: サービス */}
      {step === 0 && (
        <div>
          <h2 className="text-lg text-sumi mb-1" style={{ fontFamily: "var(--font-serif)" }}>依頼したいサービスを選んでください</h2>
          <p className="text-xs text-sumi/50 mb-5">複数選択可</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {SERVICE_CATEGORIES.filter((c) => c.popular || ["fusuma-harikae","shoji-harikae","washitsu-reform","genjoukaifuku"].includes(c.slug)).map((cat) => (
              <button
                key={cat.slug}
                type="button"
                onClick={() => toggleService(cat.slug)}
                className={`p-3 border text-left transition-all text-sm ${
                  form.services.includes(cat.slug)
                    ? "border-kincya bg-kincya/5 text-kincya"
                    : "border-border text-sumi/70 hover:border-kincya/40"
                }`}
              >
                <span>{form.services.includes(cat.slug) ? "✓ " : ""}{cat.name}</span>
                {cat.priceFrom && (
                  <span className="block text-[10px] text-sumi/40 mt-0.5">{cat.priceFrom.toLocaleString()}円〜/{cat.unit}</span>
                )}
              </button>
            ))}
          </div>
          {form.services.length > 0 && (
            <p className="text-xs text-igusa mt-3">選択中：{form.services.map((s) => SERVICE_CATEGORIES.find((c) => c.slug === s)?.name).filter(Boolean).join("・")}</p>
          )}
        </div>
      )}

      {/* Step 1: 建物・状況 */}
      {step === 1 && (
        <div className="space-y-5">
          <div>
            <h2 className="text-lg text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>建物・現場の情報</h2>
            <label className="block text-sm text-sumi mb-2">建物の種類</label>
            <div className="grid grid-cols-2 gap-2">
              {PROPERTY_TYPES.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, propertyType: t }))}
                  className={`p-2.5 border text-left text-xs transition-all ${form.propertyType === t ? "border-kincya bg-kincya/5 text-kincya" : "border-border text-sumi/70 hover:border-kincya/40"}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm text-sumi mb-2">畳数・枚数の目安</label>
            <div className="flex flex-wrap gap-2">
              {TATAMI_COUNTS.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, tatamiCount: t }))}
                  className={`px-3 py-2 border text-xs transition-all ${form.tatamiCount === t ? "border-kincya bg-kincya/5 text-kincya" : "border-border text-sumi/70 hover:border-kincya/40"}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-sumi/60 mb-1">都道府県</label>
              <input
                type="text"
                value={form.prefecture}
                readOnly
                className="w-full border border-border px-3 py-2 text-sm text-sumi/50 bg-kiji/40"
              />
            </div>
            <div>
              <label className="block text-xs text-sumi/60 mb-1">市区町村 <span className="text-do">*</span></label>
              <input
                type="text"
                value={form.city}
                onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                placeholder="例：さいたま市"
                className="w-full border border-border px-3 py-2 text-sm text-sumi focus:outline-none focus:border-ai"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs text-sumi/60 mb-1">補足・状況メモ（任意）</label>
            <textarea
              value={form.notes}
              onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
              rows={3}
              placeholder="例：6畳の和室1部屋。引越し前で家具はありません。畳の色あせが気になります。"
              className="w-full border border-border px-3 py-2 text-sm text-sumi focus:outline-none focus:border-ai resize-none"
            />
          </div>
        </div>
      )}

      {/* Step 2: 希望日程 */}
      {step === 2 && (
        <div>
          <h2 className="text-lg text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>希望するスケジュール</h2>
          <div className="space-y-2">
            {SCHEDULES.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setForm((f) => ({ ...f, schedule: s }))}
                className={`w-full p-4 border text-left text-sm transition-all ${form.schedule === s ? "border-kincya bg-kincya/5 text-kincya" : "border-border text-sumi/70 hover:border-kincya/40"}`}
              >
                {form.schedule === s ? "✓ " : ""}{s}
              </button>
            ))}
          </div>
          <p className="text-xs text-sumi/40 mt-4">実際の日程は業者との相談で決まります。見積もり回答後にご調整いただけます。</p>
        </div>
      )}

      {/* Step 3: 業者選択 */}
      {step === 3 && (
        <div>
          <h2 className="text-lg text-sumi mb-1" style={{ fontFamily: "var(--font-serif)" }}>見積もりを依頼する業者を選んでください</h2>
          <p className="text-xs text-sumi/50 mb-4">最大5社まで選択できます（現在{form.providerIds.length}社選択中）</p>
          <div className="space-y-2">
            {PROVIDERS.map((p) => {
              const selected = form.providerIds.includes(p.id);
              const disabled = !selected && form.providerIds.length >= 5;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => !disabled && toggleProvider(p.id)}
                  className={`w-full p-4 border text-left transition-all ${selected ? "border-kincya bg-kincya/5" : disabled ? "border-border opacity-40 cursor-not-allowed" : "border-border hover:border-kincya/40"}`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-4 h-4 border rounded shrink-0 mt-0.5 flex items-center justify-center text-xs ${selected ? "border-kincya bg-kincya text-white" : "border-border"}`}>
                      {selected ? "✓" : ""}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-medium text-sumi">{p.tradeName || p.companyName}</span>
                        {p.isSample && <SampleBadge label="掲載イメージ" />}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                        <span className="text-xs text-kincya">★ {p.averageRating.toFixed(1)}</span>
                        <span className="text-xs text-sumi/40">口コミ{p.reviewCount}件</span>
                        <span className="text-xs text-sumi/40">・{p.city}</span>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Step 4: お客様情報 */}
      {step === 4 && (
        <div className="space-y-4">
          <h2 className="text-lg text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>お客様情報を入力</h2>
          <div>
            <label className="block text-xs text-sumi/60 mb-1">お名前 <span className="text-do">*</span></label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="例：山田 太郎"
              className="w-full border border-border px-3 py-2.5 text-sm text-sumi focus:outline-none focus:border-ai"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-sumi/60 mb-1">電話番号</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                placeholder="09X-XXXX-XXXX"
                className="w-full border border-border px-3 py-2.5 text-sm text-sumi focus:outline-none focus:border-ai"
              />
            </div>
            <div>
              <label className="block text-xs text-sumi/60 mb-1">メールアドレス</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                placeholder="example@mail.com"
                className="w-full border border-border px-3 py-2.5 text-sm text-sumi focus:outline-none focus:border-ai"
              />
            </div>
          </div>
          <p className="text-xs text-sumi/40">電話番号またはメールアドレスのどちらかは必須です</p>

          <div>
            <label className="block text-xs text-sumi/60 mb-1">ご希望の連絡方法</label>
            <div className="flex gap-2 flex-wrap">
              {["メール", "電話", "どちらでも"].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, contact: opt }))}
                  className={`px-4 py-2 text-xs border transition-all ${form.contact === opt ? "border-kincya bg-kincya/5 text-kincya" : "border-border text-sumi/60"}`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* 確認まとめ */}
          <div className="bg-kiji/40 border border-kiji p-4 text-xs text-sumi/70 space-y-1">
            <p className="font-medium text-sumi mb-2">依頼内容の確認</p>
            <p>サービス：{form.services.map((s) => SERVICE_CATEGORIES.find((c) => c.slug === s)?.name).filter(Boolean).join("・")}</p>
            <p>建物種別：{form.propertyType}</p>
            <p>エリア：{form.prefecture} {form.city}</p>
            <p>枚数目安：{form.tatamiCount}</p>
            <p>希望時期：{form.schedule}</p>
            <p>依頼業者：{form.providerIds.length}社</p>
          </div>

          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="agree"
              checked={form.agree}
              onChange={(e) => setForm((f) => ({ ...f, agree: e.target.checked }))}
              className="mt-0.5 accent-kincya"
            />
            <label htmlFor="agree" className="text-xs text-sumi/60 cursor-pointer">
              <Link href="/privacy" className="text-ai hover:underline">プライバシーポリシー</Link>および<Link href="/terms" className="text-ai hover:underline">利用規約</Link>に同意します
            </label>
          </div>

          <p className="text-[10px] text-sumi/40 bg-kiji/30 border border-kiji p-3">
            ※ これはデモフォームです。実際の見積もり依頼の受け付けはまだ開始しておりません。本番公開時に実際の業者情報・問い合わせシステムへ差し替えます。
          </p>
        </div>
      )}

      {/* ナビゲーション */}
      <div className="flex justify-between mt-8">
        {step > 0 ? (
          <button
            type="button"
            onClick={back}
            className="border border-border text-sumi/60 px-6 py-3 text-sm hover:border-sumi transition-all"
          >
            ← 戻る
          </button>
        ) : (
          <div />
        )}
        {step < STEPS.length - 1 ? (
          <button
            type="button"
            onClick={next}
            disabled={!canNext}
            className={`px-8 py-3 text-sm font-medium transition-all ${canNext ? "bg-kincya text-white hover:bg-do" : "bg-border text-sumi/30 cursor-not-allowed"}`}
          >
            次へ →
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canNext}
            className={`px-8 py-3 text-sm font-medium transition-all ${canNext ? "bg-kincya text-white hover:bg-do" : "bg-border text-sumi/30 cursor-not-allowed"}`}
          >
            見積もりを依頼する
          </button>
        )}
      </div>
    </div>
  );
}
