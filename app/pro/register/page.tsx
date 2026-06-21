"use client";

import { useState } from "react";
import Link from "next/link";
import { SAITAMA_CITIES } from "@/data/cities";
import { SERVICE_CATEGORIES } from "@/data/categories";

type Step = 1 | 2 | 3 | 4 | 5 | 6;

const LICENSES = [
  "一級畳製作技能士",
  "二級畳製作技能士",
  "一級表具技能士",
  "二級表具技能士",
  "一級建具製作技能士",
  "インテリアコーディネーター",
];

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
    experienceYears: "",
    completedCount: "",
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

  const toggleLicense = (l: string) => {
    setForm((f) => ({
      ...f,
      licenses: f.licenses.includes(l)
        ? f.licenses.filter((x) => x !== l)
        : [...f.licenses, l],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Supabase Auth で業者登録処理
    setSubmitted(true);
  };

  const next = (n: Step) => setStep(n);

  const Field = ({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) => (
    <div>
      <label className="block text-xs text-sumi/60 mb-1.5">
        {label} {required && <span className="text-do">*</span>}
      </label>
      {children}
    </div>
  );

  const inputCls = "w-full border border-border text-sm px-3 py-2.5 focus:outline-none focus:border-ai bg-white";

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
          <p className="text-sm text-sumi/60 mb-2">確認メールをお送りしました。</p>
          <p className="text-sm text-sumi/60 mb-6">審査完了後（1〜3営業日）にメールでお知らせします。</p>
          <p className="text-xs text-sumi/40 mb-6">
            ※ 現在は準備中のため、実際の登録処理は行われません。
          </p>
          <Link href="/" className="text-sm text-ai border border-ai px-6 py-2 hover:bg-ai hover:text-white transition-all duration-300 inline-block">
            トップページへ戻る
          </Link>
        </div>
      </div>
    );
  }

  const steps = [
    { n: 1, label: "基本情報" },
    { n: 2, label: "サービス" },
    { n: 3, label: "対応エリア" },
    { n: 4, label: "資格・実績" },
    { n: 5, label: "写真" },
    { n: 6, label: "プラン" },
  ];

  return (
    <div className="min-h-screen bg-cloud">
      {/* ヘッダー */}
      <div className="bg-sumi py-5">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Link href="/" className="text-xl text-white" style={{ fontFamily: "var(--font-serif)" }}>日本畳パートナー</Link>
          <h1 className="text-sm text-white/60 mt-1">業者登録（無料）</h1>
        </div>
      </div>

      {/* ステッパー */}
      <div className="bg-white border-b border-border">
        <div className="max-w-3xl mx-auto px-4 py-3 overflow-x-auto">
          <div className="flex items-center min-w-max">
            {steps.map((s, i) => (
              <div key={s.n} className="flex items-center">
                <div className={`flex items-center gap-1.5 ${step === s.n ? "text-ai" : step > s.n ? "text-igusa" : "text-sumi/30"}`}>
                  <div className={`w-6 h-6 flex items-center justify-center text-xs border ${step === s.n ? "border-ai bg-ai text-white" : step > s.n ? "border-igusa bg-igusa text-white" : "border-sumi/20 text-sumi/30"}`}>
                    {step > s.n ? "✓" : s.n}
                  </div>
                  <span className="text-xs hidden sm:block whitespace-nowrap">{s.label}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`w-8 h-px mx-1 ${step > s.n ? "bg-igusa" : "bg-sumi/10"}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <form onSubmit={handleSubmit}>

          {/* ── ステップ1：基本情報 ── */}
          {step === 1 && (
            <div className="bg-white border border-border p-6 space-y-5">
              <h2 className="text-lg text-sumi mb-2" style={{ fontFamily: "var(--font-serif)" }}>基本情報</h2>
              <p className="text-xs text-sumi/50 mb-4">事業者として登録するための基本情報を入力してください。</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="会社名・屋号" required>
                  <input type="text" value={form.companyName} onChange={(e) => setForm((f) => ({ ...f, companyName: e.target.value }))} required placeholder="例：田中畳店" className={inputCls} />
                </Field>
                <Field label="表示名（屋号）">
                  <input type="text" value={form.tradeName} onChange={(e) => setForm((f) => ({ ...f, tradeName: e.target.value }))} placeholder="プロフィールに表示される名前" className={inputCls} />
                </Field>
                <Field label="代表者名" required>
                  <input type="text" value={form.repName} onChange={(e) => setForm((f) => ({ ...f, repName: e.target.value }))} required placeholder="山田 太郎" className={inputCls} />
                </Field>
                <Field label="事業形態">
                  <select value={form.businessType} onChange={(e) => setForm((f) => ({ ...f, businessType: e.target.value }))} className={inputCls}>
                    {["個人事業主", "有限会社", "株式会社", "合同会社"].map((t) => <option key={t}>{t}</option>)}
                  </select>
                </Field>
                <Field label="メールアドレス" required>
                  <input type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} required placeholder="example@mail.com" className={inputCls} />
                </Field>
                <Field label="電話番号" required>
                  <input type="tel" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} required placeholder="09X-XXXX-XXXX" className={inputCls} />
                  <p className="text-xs text-sumi/40 mt-1">電話番号はお客様には表示されません</p>
                </Field>
                <Field label="郵便番号">
                  <input type="text" value={form.zipCode} onChange={(e) => setForm((f) => ({ ...f, zipCode: e.target.value }))} placeholder="330-0000" maxLength={8} className={inputCls} />
                </Field>
                <Field label="市区町村">
                  <select value={form.prefCity} onChange={(e) => setForm((f) => ({ ...f, prefCity: e.target.value }))} className={inputCls}>
                    <option value="">選択してください</option>
                    {SAITAMA_CITIES.map((c) => <option key={c.slug} value={c.name}>{c.name}</option>)}
                  </select>
                </Field>
                <Field label="住所（番地以降）">
                  <input type="text" value={form.address} onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))} className={`${inputCls} sm:col-span-2`} />
                </Field>
                <Field label="パスワード" required>
                  <input type="password" value={form.password} onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))} required minLength={8} placeholder="8文字以上" className={inputCls} />
                </Field>
                <Field label="パスワード（確認）" required>
                  <input type="password" value={form.password2} onChange={(e) => setForm((f) => ({ ...f, password2: e.target.value }))} required className={inputCls} />
                </Field>
              </div>
              <button type="button" onClick={() => next(2)} className="w-full bg-ai text-white py-3 text-sm tracking-wider hover:bg-ai/80 transition-colors duration-300">
                次へ：サービス設定 →
              </button>
            </div>
          )}

          {/* ── ステップ2：サービス設定 ── */}
          {step === 2 && (
            <div className="bg-white border border-border p-6 space-y-6">
              <h2 className="text-lg text-sumi mb-2" style={{ fontFamily: "var(--font-serif)" }}>サービス設定</h2>
              <p className="text-xs text-sumi/50 mb-4">対応するサービスを選択してください。後から変更できます。</p>

              <div>
                <label className="block text-sm text-sumi mb-3 font-medium">対応サービス（複数選択可）</label>
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
                <label className="block text-sm text-sumi mb-3 font-medium">対応オプション</label>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { key: "freeEstimate", label: "無料見積もり対応" },
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
                <Field label="自己紹介・PR文">
                  <textarea value={form.intro} onChange={(e) => setForm((f) => ({ ...f, intro: e.target.value }))} rows={4} placeholder="創業年数、こだわり、得意な施工内容などをご記入ください（プロフィールに掲載されます）" className={`${inputCls} resize-none`} />
                </Field>
              </div>

              <div className="flex gap-3">
                <button type="button" onClick={() => next(1)} className="flex-1 border border-border text-sumi text-sm py-3 hover:bg-kiji/30 transition-colors">← 戻る</button>
                <button type="button" onClick={() => next(3)} className="flex-1 bg-ai text-white py-3 text-sm hover:bg-ai/80 transition-colors">次へ：対応エリア →</button>
              </div>
            </div>
          )}

          {/* ── ステップ3：対応エリア ── */}
          {step === 3 && (
            <div className="bg-white border border-border p-6">
              <h2 className="text-lg text-sumi mb-2" style={{ fontFamily: "var(--font-serif)" }}>対応エリア</h2>
              <p className="text-xs text-sumi/50 mb-4">施工可能な市区町村を選択してください（複数可）。</p>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-4">
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
              <p className="text-xs text-sumi/50 mb-6">選択中：<span className="font-medium text-ai">{form.serviceAreas.length}</span>市区町村</p>
              <div className="flex gap-3">
                <button type="button" onClick={() => next(2)} className="flex-1 border border-border text-sumi text-sm py-3 hover:bg-kiji/30 transition-colors">← 戻る</button>
                <button type="button" onClick={() => next(4)} className="flex-1 bg-ai text-white py-3 text-sm hover:bg-ai/80 transition-colors">次へ：資格・実績 →</button>
              </div>
            </div>
          )}

          {/* ── ステップ4：資格・保険・実績 ── */}
          {step === 4 && (
            <div className="bg-white border border-border p-6 space-y-6">
              <h2 className="text-lg text-sumi mb-2" style={{ fontFamily: "var(--font-serif)" }}>資格・保険・実績</h2>
              <p className="text-xs text-sumi/50 mb-4">
                資格・保険・実績はお客様が業者を選ぶ際の重要な参考情報です。申告情報として掲載されます。
              </p>

              <div>
                <label className="block text-sm text-sumi mb-3 font-medium">保有資格（複数選択可）</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {LICENSES.map((l) => (
                    <label key={l} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={form.licenses.includes(l)} onChange={() => toggleLicense(l)} className="accent-kincya" />
                      <span className="text-xs text-sumi">{l}</span>
                    </label>
                  ))}
                </div>
                <div className="mt-3">
                  <Field label="その他の資格">
                    <input type="text" placeholder="上記以外の資格があればご記入ください" className={inputCls} />
                  </Field>
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 cursor-pointer mb-2">
                  <input type="checkbox" checked={form.hasInsurance} onChange={(e) => setForm((f) => ({ ...f, hasInsurance: e.target.checked }))} className="accent-kincya" />
                  <span className="text-sm text-sumi font-medium">損害賠償保険に加入している</span>
                </label>
                <p className="text-xs text-sumi/40 ml-5">保険情報は申告情報として掲載されます。詳細はお客様からの問い合わせ時にご確認いただきます。</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="職人歴・経験年数">
                  <input type="text" value={form.experienceYears} onChange={(e) => setForm((f) => ({ ...f, experienceYears: e.target.value }))} placeholder="例：20年" className={inputCls} />
                </Field>
                <Field label="施工実績件数（目安）">
                  <input type="text" value={form.completedCount} onChange={(e) => setForm((f) => ({ ...f, completedCount: e.target.value }))} placeholder="例：500件以上" className={inputCls} />
                </Field>
              </div>

              <div className="flex gap-3">
                <button type="button" onClick={() => next(3)} className="flex-1 border border-border text-sumi text-sm py-3 hover:bg-kiji/30 transition-colors">← 戻る</button>
                <button type="button" onClick={() => next(5)} className="flex-1 bg-ai text-white py-3 text-sm hover:bg-ai/80 transition-colors">次へ：写真登録 →</button>
              </div>
            </div>
          )}

          {/* ── ステップ5：写真アップロード ── */}
          {step === 5 && (
            <div className="bg-white border border-border p-6 space-y-6">
              <h2 className="text-lg text-sumi mb-2" style={{ fontFamily: "var(--font-serif)" }}>写真登録</h2>
              <p className="text-xs text-sumi/50 mb-4">
                プロフィール写真や施工事例の写真を登録できます。写真があると依頼率が高まります。
              </p>

              <div>
                <label className="block text-sm text-sumi mb-3 font-medium">プロフィール写真（店舗・職人写真）</label>
                <div className="border-2 border-dashed border-border rounded p-8 text-center hover:border-ai/50 transition-colors cursor-pointer">
                  <svg className="w-10 h-10 text-sumi/20 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-sm text-sumi/50 mb-2">クリックまたはドラッグ＆ドロップ</p>
                  <p className="text-xs text-sumi/30">JPG・PNG・WEBP 対応 / 最大5MB / 最大5枚</p>
                  <input type="file" accept="image/*" multiple className="hidden" />
                  <button type="button" className="mt-3 text-xs border border-border px-4 py-2 text-sumi/60 hover:border-ai hover:text-ai transition-colors">
                    ファイルを選択
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm text-sumi mb-3 font-medium">施工事例写真（任意）</label>
                <div className="border-2 border-dashed border-border rounded p-6 text-center hover:border-ai/50 transition-colors cursor-pointer">
                  <svg className="w-8 h-8 text-sumi/20 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                  </svg>
                  <p className="text-sm text-sumi/50 mb-1">施工前後の写真を追加</p>
                  <p className="text-xs text-sumi/30">最大10枚 / 1枚5MBまで</p>
                  <input type="file" accept="image/*" multiple className="hidden" />
                  <button type="button" className="mt-3 text-xs border border-border px-4 py-2 text-sumi/60 hover:border-ai hover:text-ai transition-colors">
                    写真を追加
                  </button>
                </div>
              </div>

              <p className="text-xs text-sumi/40">
                ※ 写真は登録後にダッシュボードからも追加・変更できます。スキップして後から登録することも可能です。
              </p>

              <div className="flex gap-3">
                <button type="button" onClick={() => next(4)} className="flex-1 border border-border text-sumi text-sm py-3 hover:bg-kiji/30 transition-colors">← 戻る</button>
                <button type="button" onClick={() => next(6)} className="flex-1 bg-ai text-white py-3 text-sm hover:bg-ai/80 transition-colors">次へ：プラン選択 →</button>
              </div>
            </div>
          )}

          {/* ── ステップ6：プラン選択 + 利用規約 ── */}
          {step === 6 && (
            <div className="bg-white border border-border p-6 space-y-6">
              <h2 className="text-lg text-sumi mb-2" style={{ fontFamily: "var(--font-serif)" }}>プラン選択・登録申請</h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  {
                    id: "free",
                    name: "無料プラン",
                    price: "0円",
                    features: ["基本プロフィール", "月3件まで問い合わせ受信", "サービス1カテゴリ"],
                  },
                  {
                    id: "standard",
                    name: "スタンダード",
                    price: "3,980円/月",
                    features: ["全機能利用可", "問い合わせ無制限", "全カテゴリ掲載", "上位表示", "写真10枚"],
                  },
                  {
                    id: "premium",
                    name: "プレミアム",
                    price: "9,800円/月",
                    features: ["スタンダード全機能", "最上位表示（固定）", "バッジ表示", "写真30枚", "施工事例10件"],
                  },
                ].map((plan) => (
                  <label key={plan.id} className={`border p-4 cursor-pointer transition-all ${form.planType === plan.id ? "border-kincya bg-kincya/5" : "border-border hover:border-kincya/50"}`}>
                    <input type="radio" name="plan" value={plan.id} checked={form.planType === plan.id} onChange={(e) => setForm((f) => ({ ...f, planType: e.target.value }))} className="hidden" />
                    <p className="text-sm font-medium text-sumi mb-1" style={{ fontFamily: "var(--font-serif)" }}>{plan.name}</p>
                    <p className="text-lg text-kincya mb-3">{plan.price}</p>
                    <ul className="space-y-1">
                      {plan.features.map((feat) => (
                        <li key={feat} className="text-xs text-sumi/70 flex items-center gap-1">
                          <span className="text-igusa">✓</span> {feat}
                        </li>
                      ))}
                    </ul>
                  </label>
                ))}
              </div>

              <p className="text-xs text-sumi/40">
                ※ プランはご登録後いつでも変更可能です。スタンダード・プレミアムは正式リリース後に課金が開始されます。
              </p>

              <label className="flex items-start gap-2 cursor-pointer">
                <input type="checkbox" checked={form.agreeTerms} onChange={(e) => setForm((f) => ({ ...f, agreeTerms: e.target.checked }))} className="accent-kincya mt-0.5" required />
                <span className="text-xs text-sumi/70">
                  <Link href="/terms" className="text-ai hover:underline" target="_blank">業者利用規約</Link>と
                  <Link href="/privacy" className="text-ai hover:underline" target="_blank">プライバシーポリシー</Link>
                  に同意します
                </span>
              </label>

              <div className="flex gap-3">
                <button type="button" onClick={() => next(5)} className="flex-1 border border-border text-sumi text-sm py-3 hover:bg-kiji/30 transition-colors">← 戻る</button>
                <button type="submit" className="flex-1 bg-kincya text-white py-3 text-sm tracking-wider hover:bg-do transition-colors">
                  登録申請する（無料）
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
