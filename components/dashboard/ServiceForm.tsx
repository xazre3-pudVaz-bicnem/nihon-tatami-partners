"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SERVICE_CATEGORIES } from "@/data/categories";
import type { ProviderService } from "@/lib/types";

interface Props {
  initial?: Partial<ProviderService>;
  mode: "new" | "edit";
}

// 業者サービスの登録・編集フォーム
// TODO: Supabase移行後は保存をServer Actionに変更
export default function ServiceForm({ initial, mode }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<Partial<ProviderService>>({
    categorySlug: "",
    title: "",
    subtitle: "",
    description: "",
    catchCopy: "",
    priceLabel: "",
    priceFrom: undefined,
    workingTimeHours: undefined,
    serviceAreas: [],
    availableDays: "",
    active: true,
    ...initial,
  });
  const [submitted, setSubmitted] = useState(false);

  const update = <K extends keyof ProviderService>(key: K, value: ProviderService[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-white border border-border p-8 text-center max-w-lg">
        <div className="w-12 h-12 border-2 border-igusa flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-igusa" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg text-sumi mb-2" style={{ fontFamily: "var(--font-serif)" }}>
          サービスを{mode === "new" ? "登録" : "更新"}しました（デモ）
        </h3>
        <p className="text-sm text-sumi/60 mb-6">入力内容は実際には保存されません（モック）。</p>
        <button onClick={() => router.push("/dashboard/services")} className="bg-ai text-white px-6 py-2.5 text-sm hover:bg-ai-light transition-colors">
          サービス一覧へ戻る
        </button>
      </div>
    );
  }

  const Field = ({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) => (
    <div>
      <label className="block text-xs text-sumi/60 mb-1.5">
        {label} {required && <span className="text-do">*</span>}
      </label>
      {children}
    </div>
  );

  const inputClass = "w-full border border-border text-sm px-3 py-2.5 focus:outline-none focus:border-ai";

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-border p-6 space-y-5 max-w-2xl">
      <Field label="カテゴリ" required>
        <select required value={form.categorySlug} onChange={(e) => update("categorySlug", e.target.value)} className={inputClass}>
          <option value="">選択してください</option>
          {SERVICE_CATEGORIES.map((c) => (
            <option key={c.slug} value={c.slug}>{c.name}</option>
          ))}
        </select>
      </Field>

      <Field label="サービス名" required>
        <input required type="text" value={form.title ?? ""} onChange={(e) => update("title", e.target.value)} placeholder="例：畳表替え" className={inputClass} />
      </Field>

      <Field label="サブタイトル">
        <input type="text" value={form.subtitle ?? ""} onChange={(e) => update("subtitle", e.target.value)} placeholder="例：い草・和紙・樹脂から選べる" className={inputClass} />
      </Field>

      <Field label="キャッチコピー">
        <input type="text" value={form.catchCopy ?? ""} onChange={(e) => update("catchCopy", e.target.value)} className={inputClass} />
      </Field>

      <Field label="サービス説明" required>
        <textarea required rows={4} value={form.description ?? ""} onChange={(e) => update("description", e.target.value)} className={`${inputClass} resize-none`} />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="料金表示" required>
          <input required type="text" value={form.priceLabel ?? ""} onChange={(e) => update("priceLabel", e.target.value)} placeholder="例：3,800円〜/枚" className={inputClass} />
        </Field>
        <Field label="最低料金（数値）">
          <input type="number" value={form.priceFrom ?? ""} onChange={(e) => update("priceFrom", e.target.value ? Number(e.target.value) : undefined)} placeholder="3800" className={inputClass} />
        </Field>
      </div>

      <Field label="対応日">
        <input type="text" value={form.availableDays ?? ""} onChange={(e) => update("availableDays", e.target.value)} placeholder="例：平日・土曜（要予約）" className={inputClass} />
      </Field>

      <label className="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" checked={!!form.active} onChange={(e) => update("active", e.target.checked)} className="accent-kincya" />
        <span className="text-sm text-sumi/70">このサービスを公開する</span>
      </label>

      <div className="flex gap-3 pt-2">
        <button type="button" onClick={() => router.push("/dashboard/services")} className="flex-1 border border-border text-sumi/60 py-3 text-sm hover:border-sumi/40 transition-colors">
          キャンセル
        </button>
        <button type="submit" className="flex-1 bg-kincya text-white py-3 text-sm hover:bg-do transition-colors">
          {mode === "new" ? "サービスを登録" : "変更を保存"}
        </button>
      </div>
    </form>
  );
}
