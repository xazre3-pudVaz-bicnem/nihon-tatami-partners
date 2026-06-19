"use client";

import { useState } from "react";
import Link from "next/link";
import { SAITAMA_CITIES } from "@/data/cities";
import { SERVICE_CATEGORIES } from "@/data/categories";

type Step = 1 | 2 | 3 | 4;

const BUILDING_TYPES = ["一般住宅（戸建て）", "マンション・アパート", "旅館・ホテル", "寺社仏閣", "不動産管理会社"];

export default function ProviderRegisterPage() {
  const [step, setStep] = useState<Step>(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    companyName: "",
    tradeName: "",
    repName: "",
    email: "",
    phone: "",
    zipCode: "",
    prefCity: "",
    address: "",
    businessType: "個人事業主",
    establishedYear: "",
    staffCount: "1〜5人",
    categories: [] as string[],
    serviceAreas: [] as string[],
    intro: "",
    strengths: "",
    licenses: [] as string[],
    hasInsurance: false,
    acceptsCorporate: false,
    acceptsRyokan: false,
    acceptsTempleShrine: false,
    acceptsRealEstate: false,
    canSameDayResponse: false,
    freeEstimate: false,
    weekendAvailable: false,
    planType: "free",
    password: "",
    password2: "",
    agreeTerms: false,
  });

  const toggleCategory = (slug: string) => {
    setForm((f) => ({
      ...f,
      categories: f.categories.includes(slug)
        ? f.categories.filter((c) => c !== slug)
        : [...f.categories, slug],
    }));
  };

  const toggleCity = (name: string) => {
    setForm((f) => ({
      ...f,
      serviceAreas: f.serviceAreas.includes(name)
        ? f.serviceAreas.filter((c) => c !== name)
        : [...f.serviceAreas, name],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Supabase Auth で業者登録処理、Prisma で業者プロフィール保存
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-cloud flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white border border-border p-8 text-center">
          <div className="w-12 h-12 border-2 border-igusa flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-igusa" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-lg text-sumi mb-2" style={{ fontFamily: "var(--font-serif)" }}>登録申請を受け付けました</h2>
          <p className="text-sm text-sumi/60 mb-6">確認メールをお送りしました。審査完了後（1〜3営業日）にメールでお知らせします。</p>
          <Link href="/dashboard" className="text-sm text-ai border border-ai px-6 py-2 hover:bg-ai hover:text-white transition-all duration-300 inline-block">
            ダッシュボードへ
          </Link>
        </div>
      </div>
    );
  }

  const steps = [
    { n: 1, label: "基本情報" },
    { n: 2, label: "サービス設定" },
    { n: 3, label: "対応エリア" },
    { n: 4, label: "プラン選択" },
  ];

  return (
    <div className="min-h-screen bg-cloud">
      {/* ヘッダー */}
      <div className="bg-sumi py-6">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Link href="/" className="text-xl text-white" style={{ fontFamily: "var(--font-serif)" }}>日本畳パートナー</Link>
          <h1 className="text-sm text-white/60 mt-1">業者登録（無料）</h1>
        </div>
      </div>

      {/* ステッパー */}
      <div className="bg-white border-b border-border">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center">
            {steps.map((s, i) => (
              <div key={s.n} className="flex items-center flex-1">
                <div className={`flex items-center gap-2 ${step === s.n ? "text-ai" : step > s.n ? "text-igusa" : "text-sumi/30"}`}>
                  <div className={`w-7 h-7 flex items-center justify-center text-xs border ${step === s.n ? "border-ai bg-ai text-white" : step > s.n ? "border-igusa bg-igusa text-white" : "border-sumi/20 text-sumi/30"}`}>
                    {step > s.n ? "✓" : s.n}
                  </div>
                  <span className="text-xs hidden sm:block">{s.label}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`flex-1 h-px mx-2 ${step > s.n ? "bg-igusa" : "bg-sumi/10"}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <form onSubmit={handleSubmit}>
          {/* ステップ1 */}
          {step === 1 && (
            <div className="bg-white border border-border p-6 space-y-5">
              <h2 className="text-lg text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>基本情報</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-sumi/60 mb-1.5">会社名・屋号 <span className="text-do">*</span></label>
                  <input type="text" value={form.companyName} onChange={(e) => setForm((f) => ({ ...f, companyName: e.target.value }))} required placeholder="例：田中畳店" className="w-full border border-border text-sm px-3 py-2.5 focus:outline-none focus:border-ai" />
                </div>
                <div>
                  <label className="block text-xs text-sumi/60 mb-1.5">表示名（屋号）</label>
                  <input type="text" value={form.tradeName} onChange={(e) => setForm((f) => ({ ...f, tradeName: e.target.value }))} placeholder="例：田中畳店" className="w-full border border-border text-sm px-3 py-2.5 focus:outline-none focus:border-ai" />
                </div>
                <div>
                  <label className="block text-xs text-sumi/60 mb-1.5">代表者名 <span className="text-do">*</span></label>
                  <input type="text" value={form.repName} onChange={(e) => setForm((f) => ({ ...f, repName: e.target.value }))} required placeholder="山田 太郎" className="w-full border border-border text-sm px-3 py-2.5 focus:outline-none focus:border-ai" />
                </div>
                <div>
                  <label className="block text-xs text-sumi/60 mb-1.5">事業形態</label>
                  <select value={form.businessType} onChange={(e) => setForm((f) => ({ ...f, businessType: e.target.value }))} className="w-full border border-border text-sm px-3 py-2.5 focus:outline-none focus:border-ai">
                    {["個人事業主", "有限会社", "株式会社", "合同会社"].map((t) => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-sumi/60 mb-1.5">メールアドレス <span className="text-do">*</span></label>
                  <input type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} required className="w-full border border-border text-sm px-3 py-2.5 focus:outline-none focus:border-ai" />
                </div>
                <div>
                  <label className="block text-xs text-sumi/60 mb-1.5">電話番号 <span className="text-do">*</span></label>
                  <input type="tel" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} required placeholder="048-000-0000" className="w-full border border-border text-sm px-3 py-2.5 focus:outline-none focus:border-ai" />
                </div>
                <div>
                  <label className="block text-xs text-sumi/60 mb-1.5">郵便番号</label>
                  <input type="text" value={form.zipCode} onChange={(e) => setForm((f) => ({ ...f, zipCode: e.target.value }))} placeholder="330-0000" className="w-full border border-border text-sm px-3 py-2.5 focus:outline-none focus:border-ai" />
                </div>
                <div>
                  <label className="block text-xs text-sumi/60 mb-1.5">市区町村</label>
                  <select value={form.prefCity} onChange={(e) => setForm((f) => ({ ...f, prefCity: e.target.value }))} className="w-full border border-border text-sm px-3 py-2.5 focus:outline-none focus:border-ai">
                    <option value="">選択してください</option>
                    {SAITAMA_CITIES.map((c) => <option key={c.slug} value={c.name}>{c.name}</option>)}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs text-sumi/60 mb-1.5">住所（番地以降）</label>
                  <input type="text" value={form.address} onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))} className="w-full border border-border text-sm px-3 py-2.5 focus:outline-none focus:border-ai" />
                </div>
                <div>
                  <label className="block text-xs text-sumi/60 mb-1.5">パスワード <span className="text-do">*</span></label>
                  <input type="password" value={form.password} onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))} required minLength={8} className="w-full border border-border text-sm px-3 py-2.5 focus:outline-none focus:border-ai" />
                </div>
                <div>
                  <label className="block text-xs text-sumi/60 mb-1.5">パスワード（確認） <span className="text-do">*</span></label>
                  <input type="password" value={form.password2} onChange={(e) => setForm((f) => ({ ...f, password2: e.target.value }))} required className="w-full border border-border text-sm px-3 py-2.5 focus:outline-none focus:border-ai" />
                </div>
              </div>
              <button type="button" onClick={() => setStep(2)} className="w-full bg-ai text-white py-3 text-sm tracking-wider hover:bg-ai-light transition-colors duration-300">
                次へ：サービス設定
              </button>
            </div>
          )}

          {/* ステップ2 */}
          {step === 2 && (
            <div className="bg-white border border-border p-6 space-y-6">
              <h2 className="text-lg text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>サービス設定</h2>

              <div>
                <label className="block text-sm text-sumi mb-3">対応するサービス（複数選択可）</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {SERVICE_CATEGORIES.map((cat) => (
                    <label key={cat.slug} className={`flex items-center gap-2 p-2.5 border text-xs cursor-pointer transition-colors ${form.categories.includes(cat.slug) ? "border-ai bg-ai/5 text-ai" : "border-border text-sumi/70 hover:border-ai/50"}`}>
                      <input type="checkbox" checked={form.categories.includes(cat.slug)} onChange={() => toggleCategory(cat.slug)} className="hidden" />
                      <span className={`w-3 h-3 border flex items-center justify-center shrink-0 ${form.categories.includes(cat.slug) ? "border-ai bg-ai" : "border-sumi/30"}`}>
                        {form.categories.includes(cat.slug) && <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                      </span>
                      {cat.name}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm text-sumi mb-3">サービスオプション</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { key: "freeEstimate", label: "無料見積もり" },
                    { key: "canSameDayResponse", label: "即日対応可" },
                    { key: "weekendAvailable", label: "土日祝対応可" },
                    { key: "hasInsurance", label: "損害賠償保険加入" },
                    { key: "acceptsCorporate", label: "法人対応可" },
                    { key: "acceptsRyokan", label: "旅館・ホテル対応" },
                    { key: "acceptsTempleShrine", label: "寺社仏閣対応" },
                    { key: "acceptsRealEstate", label: "不動産会社対応" },
                  ].map((opt) => (
                    <label key={opt.key} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form[opt.key as keyof typeof form] as boolean}
                        onChange={(e) => setForm((f) => ({ ...f, [opt.key]: e.target.checked }))}
                        className="accent-kincya"
                      />
                      <span className="text-xs text-sumi">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs text-sumi/60 mb-1.5">自己紹介・会社紹介</label>
                <textarea value={form.intro} onChange={(e) => setForm((f) => ({ ...f, intro: e.target.value }))} rows={4} placeholder="創業年数、こだわり、得意な施工内容などをご記入ください" className="w-full border border-border text-sm px-3 py-2.5 focus:outline-none focus:border-ai resize-none" />
              </div>

              <div className="flex gap-3">
                <button type="button" onClick={() => setStep(1)} className="flex-1 border border-border text-sumi text-sm py-3 hover:bg-kiji/30 transition-colors">
                  戻る
                </button>
                <button type="button" onClick={() => setStep(3)} className="flex-1 bg-ai text-white py-3 text-sm hover:bg-ai-light transition-colors">
                  次へ：対応エリア
                </button>
              </div>
            </div>
          )}

          {/* ステップ3 */}
          {step === 3 && (
            <div className="bg-white border border-border p-6">
              <h2 className="text-lg text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>対応エリア（複数選択可）</h2>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-6">
                {SAITAMA_CITIES.map((city) => (
                  <label key={city.slug} className={`flex items-center gap-1.5 p-2 border text-xs cursor-pointer transition-colors ${form.serviceAreas.includes(city.name) ? "border-ai bg-ai/5 text-ai" : "border-border text-sumi/70 hover:border-ai/50"}`}>
                    <input type="checkbox" checked={form.serviceAreas.includes(city.name)} onChange={() => toggleCity(city.name)} className="hidden" />
                    <span className={`w-3 h-3 border shrink-0 flex items-center justify-center ${form.serviceAreas.includes(city.name) ? "border-ai bg-ai" : "border-sumi/30"}`}>
                      {form.serviceAreas.includes(city.name) && <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                    </span>
                    {city.name}
                  </label>
                ))}
              </div>
              <p className="text-xs text-sumi/50 mb-4">選択中：{form.serviceAreas.length}市区町村</p>
              <div className="flex gap-3">
                <button type="button" onClick={() => setStep(2)} className="flex-1 border border-border text-sumi text-sm py-3 hover:bg-kiji/30 transition-colors">戻る</button>
                <button type="button" onClick={() => setStep(4)} className="flex-1 bg-ai text-white py-3 text-sm hover:bg-ai-light transition-colors">次へ：プラン選択</button>
              </div>
            </div>
          )}

          {/* ステップ4 */}
          {step === 4 && (
            <div className="bg-white border border-border p-6 space-y-6">
              <h2 className="text-lg text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>プラン選択</h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { id: "free", name: "無料プラン", price: "0円", features: ["基本プロフィール", "月3件まで問い合わせ受信", "サービス1カテゴリ"] },
                  { id: "standard", name: "スタンダード", price: "3,980円/月", features: ["全機能利用可", "問い合わせ無制限", "全カテゴリ掲載", "上位表示", "写真10枚"] },
                  { id: "premium", name: "プレミアム", price: "9,800円/月", features: ["スタンダード全機能", "最上位表示（固定）", "バッジ表示", "写真30枚", "施工事例10件"] },
                ].map((plan) => (
                  <label key={plan.id} className={`border p-4 cursor-pointer transition-all ${form.planType === plan.id ? "border-kincya bg-kincya/5" : "border-border hover:border-kincya/50"}`}>
                    <input type="radio" name="plan" value={plan.id} checked={form.planType === plan.id} onChange={(e) => setForm((f) => ({ ...f, planType: e.target.value }))} className="hidden" />
                    <p className="text-sm font-medium text-sumi mb-1" style={{ fontFamily: "var(--font-serif)" }}>{plan.name}</p>
                    <p className="text-lg text-kincya mb-3">{plan.price}</p>
                    <ul className="space-y-1">
                      {plan.features.map((f) => (
                        <li key={f} className="text-xs text-sumi/70 flex items-center gap-1">
                          <span className="text-igusa">✓</span> {f}
                        </li>
                      ))}
                    </ul>
                  </label>
                ))}
              </div>

              <label className="flex items-start gap-2 cursor-pointer">
                <input type="checkbox" checked={form.agreeTerms} onChange={(e) => setForm((f) => ({ ...f, agreeTerms: e.target.checked }))} className="accent-kincya mt-0.5" required />
                <span className="text-xs text-sumi/70"><Link href="/terms" className="text-ai hover:underline">業者利用規約</Link>と<Link href="/privacy" className="text-ai hover:underline">プライバシーポリシー</Link>に同意します</span>
              </label>

              <div className="flex gap-3">
                <button type="button" onClick={() => setStep(3)} className="flex-1 border border-border text-sumi text-sm py-3 hover:bg-kiji/30 transition-colors">戻る</button>
                <button type="submit" className="flex-1 bg-kincya text-white py-3 text-sm tracking-wider hover:bg-do transition-colors">登録申請する（無料）</button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
