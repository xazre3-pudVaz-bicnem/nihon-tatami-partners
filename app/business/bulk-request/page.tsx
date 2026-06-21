"use client";

import { useState } from "react";
import Link from "next/link";

const REQUEST_TYPES = [
  { value: "restoration", label: "退去後原状回復" },
  { value: "vacancy", label: "空室対策" },
  { value: "renovation", label: "入居前清掃・リフォーム" },
  { value: "maintenance", label: "定期メンテナンス" },
  { value: "other", label: "その他" },
];

const PROPERTY_COUNT_OPTIONS = ["1〜5件", "6〜20件", "21〜50件", "51件以上"];
const PROPERTY_TYPES = ["戸建て", "マンション・アパート", "店舗", "旅館", "その他"];
const TATAMI_COUNTS = ["1畳", "2畳", "3畳", "4畳", "4.5畳", "6畳", "8畳", "10畳", "12畳", "15畳", "20畳以上"];

interface PropertyItem {
  id: string;
  address: string;
  city: string;
  propertyType: string;
  tatamiCount: string;
  fusuma: string;
  moveDate: string;
  notes: string;
}

function newProperty(): PropertyItem {
  return {
    id: crypto.randomUUID(),
    address: "",
    city: "",
    propertyType: "",
    tatamiCount: "",
    fusuma: "",
    moveDate: "",
    notes: "",
  };
}

type Step = 1 | 2 | 3;

interface FormData {
  companyName: string;
  contactName: string;
  department: string;
  email: string;
  phone: string;
  requestType: string;
  propertyCount: string;
  properties: PropertyItem[];
  wantInvoice: boolean;
  wantContinuousSupport: boolean;
  wantInvoiceRegistered: boolean;
  notes: string;
}

const INITIAL_FORM: FormData = {
  companyName: "",
  contactName: "",
  department: "",
  email: "",
  phone: "",
  requestType: "",
  propertyCount: "",
  properties: [newProperty()],
  wantInvoice: false,
  wantContinuousSupport: false,
  wantInvoiceRegistered: false,
  notes: "",
};

export default function BusinessBulkRequestPage() {
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function updateProperty(index: number, key: keyof PropertyItem, value: string) {
    setForm((f) => {
      const props = [...f.properties];
      props[index] = { ...props[index], [key]: value };
      return { ...f, properties: props };
    });
  }

  function addProperty() {
    if (form.properties.length >= 5) return;
    setForm((f) => ({ ...f, properties: [...f.properties, newProperty()] }));
  }

  function removeProperty(index: number) {
    if (form.properties.length <= 1) return;
    setForm((f) => ({ ...f, properties: f.properties.filter((_, i) => i !== index) }));
  }

  function canNext(): boolean {
    switch (step) {
      case 1:
        return !!form.companyName && !!form.contactName && !!form.email && !!form.requestType && !!form.propertyCount;
      case 2:
        return form.properties.every((p) => !!p.address && !!p.propertyType && !!p.tatamiCount);
      case 3:
        return true;
      default:
        return false;
    }
  }

  async function handleSubmit() {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-shiro">
        <div className="bg-sumi">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="text-xs text-white/40">
              <Link href="/" className="hover:text-white/70 transition-colors">トップ</Link>
              <span className="mx-1.5 text-white/20">/</span>
              <Link href="/business" className="hover:text-white/70 transition-colors">法人・管理会社向け</Link>
              <span className="mx-1.5 text-white/20">/</span>
              <span className="text-white/60">複数物件一括相談</span>
            </nav>
          </div>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 pt-4">
            <h1 className="text-xl md:text-2xl text-white" style={{ fontFamily: "var(--font-serif)" }}>
              ご相談内容を受け付けました
            </h1>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <div className="w-14 h-14 bg-igusa/10 border border-igusa mx-auto flex items-center justify-center mb-6">
            <span className="text-igusa text-2xl">✓</span>
          </div>
          <h2 className="text-xl text-sumi mb-3" style={{ fontFamily: "var(--font-serif)" }}>
            お問い合わせを受け付けました
          </h2>
          <p className="text-sm text-sumi/60 leading-relaxed mb-8">
            複数物件・法人対応業者から個別にご連絡いたします。<br />
            通常1〜2営業日以内にご連絡差し上げます。
          </p>
          <div className="bg-kiji/30 border border-kiji p-5 text-xs text-sumi/60 text-left mb-8 leading-relaxed">
            <ul className="space-y-1">
              <li>・ 業者の情報は申告情報として掲載しています。</li>
              <li>・ 複数物件・法人対応業者から個別にご連絡いたします。</li>
              <li>・ 見積もり内容を確認してから依頼できます。</li>
            </ul>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/business" className="text-center text-sm border border-border text-sumi/60 px-8 py-3 hover:border-sumi/40 transition-colors">
              法人向けページへ
            </Link>
            <Link href="/" className="text-center text-sm bg-kincya text-white px-8 py-3 font-bold hover:bg-do transition-colors">
              トップへ戻る
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const stepLabels = ["会社情報", "物件情報", "希望条件・確認"];

  return (
    <div className="min-h-screen bg-shiro">
      {/* Header */}
      <div className="bg-sumi">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="text-xs text-white/40">
            <Link href="/" className="hover:text-white/70 transition-colors">トップ</Link>
            <span className="mx-1.5 text-white/20">/</span>
            <Link href="/business" className="hover:text-white/70 transition-colors">法人・管理会社向け</Link>
            <span className="mx-1.5 text-white/20">/</span>
            <span className="text-white/60">複数物件一括相談</span>
          </nav>
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 pt-3">
          <div className="inline-block text-xs border border-ai/40 text-ai px-3 py-1 mb-3">法人・管理会社向け</div>
          <h1 className="text-xl md:text-2xl text-white mb-2" style={{ fontFamily: "var(--font-serif)" }}>
            複数物件の畳工事 一括相談フォーム
          </h1>
          <p className="text-xs text-white/50">
            管理物件の畳工事をまとめて相談できます。法人対応・複数物件対応の業者から個別にご連絡します。
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ステップインジケーター */}
        <div className="flex items-center mb-8">
          {stepLabels.map((label, i) => {
            const s = (i + 1) as Step;
            const active = step === s;
            const done = step > s;
            return (
              <div key={i} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div className={`w-8 h-8 flex items-center justify-center text-xs font-bold border ${done ? "bg-igusa border-igusa text-white" : active ? "bg-sumi border-sumi text-white" : "bg-white border-border text-sumi/40"}`}>
                    {done ? "✓" : s}
                  </div>
                  <span className={`text-[10px] mt-1 text-center ${active ? "text-sumi font-bold" : "text-sumi/40"}`}>{label}</span>
                </div>
                {i < stepLabels.length - 1 && (
                  <div className={`h-px flex-1 mx-2 mb-4 ${done ? "bg-igusa" : "bg-border"}`} />
                )}
              </div>
            );
          })}
        </div>

        <div className="bg-white border border-border p-6 sm:p-8 mb-6">
          {/* Step 1: 会社情報 */}
          {step === 1 && (
            <div>
              <h2 className="text-lg text-sumi mb-6" style={{ fontFamily: "var(--font-serif)" }}>会社・担当者情報</h2>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm text-sumi mb-1.5">会社名 <span className="text-do">*</span></label>
                  <input
                    type="text"
                    value={form.companyName}
                    onChange={(e) => setForm((f) => ({ ...f, companyName: e.target.value }))}
                    placeholder="例: 株式会社○○不動産"
                    className="w-full border border-border p-2.5 text-sm focus:outline-none focus:border-ai"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-sumi mb-1.5">担当者名 <span className="text-do">*</span></label>
                    <input
                      type="text"
                      value={form.contactName}
                      onChange={(e) => setForm((f) => ({ ...f, contactName: e.target.value }))}
                      placeholder="例: 田中 太郎"
                      className="w-full border border-border p-2.5 text-sm focus:outline-none focus:border-ai"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-sumi mb-1.5">部署（任意）</label>
                    <input
                      type="text"
                      value={form.department}
                      onChange={(e) => setForm((f) => ({ ...f, department: e.target.value }))}
                      placeholder="例: 管理部"
                      className="w-full border border-border p-2.5 text-sm focus:outline-none focus:border-ai"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-sumi mb-1.5">メールアドレス <span className="text-do">*</span></label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    placeholder="例: tanaka@company.co.jp"
                    className="w-full border border-border p-2.5 text-sm focus:outline-none focus:border-ai"
                  />
                </div>
                <div>
                  <label className="block text-sm text-sumi mb-1.5">電話番号（任意）</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    placeholder="例: 03-1234-5678"
                    className="w-full border border-border p-2.5 text-sm focus:outline-none focus:border-ai"
                  />
                </div>
                <div>
                  <label className="block text-sm text-sumi mb-2">依頼種別 <span className="text-do">*</span></label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {REQUEST_TYPES.map((rt) => (
                      <button
                        key={rt.value}
                        onClick={() => setForm((f) => ({ ...f, requestType: rt.value }))}
                        className={`text-sm border py-2.5 px-3 text-left transition-all ${
                          form.requestType === rt.value
                            ? "border-ai bg-ai/5 text-ai"
                            : "border-border text-sumi hover:border-ai/40"
                        }`}
                      >
                        {rt.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-sumi mb-2">管理物件数 <span className="text-do">*</span></label>
                  <select
                    value={form.propertyCount}
                    onChange={(e) => setForm((f) => ({ ...f, propertyCount: e.target.value }))}
                    className="w-full border border-border p-2.5 text-sm text-sumi bg-white focus:outline-none focus:border-ai"
                  >
                    <option value="">選択してください</option>
                    {PROPERTY_COUNT_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: 物件情報 */}
          {step === 2 && (
            <div>
              <h2 className="text-lg text-sumi mb-2" style={{ fontFamily: "var(--font-serif)" }}>物件情報の入力</h2>
              <p className="text-xs text-sumi/50 mb-6">工事が必要な物件を入力してください。最大5件まで追加できます。</p>

              <div className="space-y-6">
                {form.properties.map((prop, i) => (
                  <div key={prop.id} className="border border-border p-5 relative">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-medium text-sumi">物件 {i + 1}</h3>
                      {form.properties.length > 1 && (
                        <button
                          onClick={() => removeProperty(i)}
                          className="text-xs text-do hover:underline"
                        >
                          削除
                        </button>
                      )}
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs text-sumi/60 mb-1">住所 <span className="text-do">*</span></label>
                        <input
                          type="text"
                          value={prop.address}
                          onChange={(e) => updateProperty(i, "address", e.target.value)}
                          placeholder="例: さいたま市浦和区常盤6丁目○番○号"
                          className="w-full border border-border p-2 text-sm focus:outline-none focus:border-ai"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs text-sumi/60 mb-1">建物種別 <span className="text-do">*</span></label>
                          <select
                            value={prop.propertyType}
                            onChange={(e) => updateProperty(i, "propertyType", e.target.value)}
                            className="w-full border border-border p-2 text-sm text-sumi bg-white focus:outline-none focus:border-ai"
                          >
                            <option value="">選択</option>
                            {PROPERTY_TYPES.map((pt) => (
                              <option key={pt} value={pt}>{pt}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs text-sumi/60 mb-1">畳数 <span className="text-do">*</span></label>
                          <select
                            value={prop.tatamiCount}
                            onChange={(e) => updateProperty(i, "tatamiCount", e.target.value)}
                            className="w-full border border-border p-2 text-sm text-sumi bg-white focus:outline-none focus:border-ai"
                          >
                            <option value="">選択</option>
                            {TATAMI_COUNTS.map((tc) => (
                              <option key={tc} value={tc}>{tc}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs text-sumi/60 mb-1">ふすま枚数（任意）</label>
                          <input
                            type="number"
                            min={0}
                            value={prop.fusuma}
                            onChange={(e) => updateProperty(i, "fusuma", e.target.value)}
                            placeholder="例: 4"
                            className="w-full border border-border p-2 text-sm focus:outline-none focus:border-ai"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-sumi/60 mb-1">退去日・入居予定日（任意）</label>
                          <input
                            type="date"
                            value={prop.moveDate}
                            onChange={(e) => updateProperty(i, "moveDate", e.target.value)}
                            className="w-full border border-border p-2 text-sm focus:outline-none focus:border-ai"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs text-sumi/60 mb-1">備考（任意）</label>
                        <input
                          type="text"
                          value={prop.notes}
                          onChange={(e) => updateProperty(i, "notes", e.target.value)}
                          placeholder="例: ペット可物件。傷みが激しい。"
                          className="w-full border border-border p-2 text-sm focus:outline-none focus:border-ai"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {form.properties.length < 5 && (
                <button
                  onClick={addProperty}
                  className="w-full mt-4 border border-dashed border-ai/40 text-ai text-sm py-3 hover:bg-ai/5 transition-colors"
                >
                  + 物件を追加（あと{5 - form.properties.length}件）
                </button>
              )}

              <div className="mt-6 bg-kiji/30 border border-kiji p-4 text-xs text-sumi/60">
                複数物件はCSVでまとめてご入力いただけます（準備中）。5件以上の物件はお問い合わせフォームよりご相談ください。
              </div>
            </div>
          )}

          {/* Step 3: 希望条件・確認 */}
          {step === 3 && (
            <div>
              <h2 className="text-lg text-sumi mb-6" style={{ fontFamily: "var(--font-serif)" }}>希望条件・内容確認</h2>

              <div className="space-y-4 mb-8">
                {[
                  { key: "wantInvoice" as const, label: "請求書払いを希望する" },
                  { key: "wantInvoiceRegistered" as const, label: "インボイス対応業者を希望する" },
                  { key: "wantContinuousSupport" as const, label: "継続的な依頼の可能性がある" },
                ].map(({ key, label }) => (
                  <label key={key} className="flex items-start gap-3 cursor-pointer group">
                    <div
                      className={`w-5 h-5 border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        form[key] ? "bg-ai border-ai" : "border-border group-hover:border-ai/40"
                      }`}
                      onClick={() => setForm((f) => ({ ...f, [key]: !f[key] }))}
                    >
                      {form[key] && <span className="text-white text-xs">✓</span>}
                    </div>
                    <span className="text-sm text-sumi">{label}</span>
                  </label>
                ))}
              </div>

              <div className="mb-8">
                <label className="block text-sm text-sumi mb-1.5">備考・特記事項（任意）</label>
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                  rows={4}
                  placeholder="例: 毎月5〜10件の退去工事があります。継続的な対応が可能な業者を希望します。"
                  className="w-full border border-border p-2.5 text-sm text-sumi focus:outline-none focus:border-ai resize-none"
                />
              </div>

              {/* 確認テーブル */}
              <div className="border border-border bg-kiji/20 p-5">
                <h3 className="text-sm text-sumi mb-3" style={{ fontFamily: "var(--font-serif)" }}>送信内容の確認</h3>
                <dl className="space-y-2 text-xs">
                  <div className="flex gap-3 pb-2 border-b border-kiji">
                    <dt className="text-sumi/40 w-28 shrink-0">会社名</dt>
                    <dd className="text-sumi">{form.companyName || "—"}</dd>
                  </div>
                  <div className="flex gap-3 pb-2 border-b border-kiji">
                    <dt className="text-sumi/40 w-28 shrink-0">担当者名</dt>
                    <dd className="text-sumi">{form.contactName || "—"}</dd>
                  </div>
                  <div className="flex gap-3 pb-2 border-b border-kiji">
                    <dt className="text-sumi/40 w-28 shrink-0">依頼種別</dt>
                    <dd className="text-sumi">{REQUEST_TYPES.find((r) => r.value === form.requestType)?.label || "—"}</dd>
                  </div>
                  <div className="flex gap-3 pb-2 border-b border-kiji">
                    <dt className="text-sumi/40 w-28 shrink-0">管理物件数</dt>
                    <dd className="text-sumi">{form.propertyCount || "—"}</dd>
                  </div>
                  <div className="flex gap-3 pb-2 border-b border-kiji">
                    <dt className="text-sumi/40 w-28 shrink-0">入力物件数</dt>
                    <dd className="text-sumi">{form.properties.length}件</dd>
                  </div>
                  <div className="flex gap-3">
                    <dt className="text-sumi/40 w-28 shrink-0">請求書払い</dt>
                    <dd className="text-sumi">{form.wantInvoice ? "希望する" : "未選択"}</dd>
                  </div>
                </dl>
              </div>

              <div className="mt-5 bg-kiji/30 border border-kiji p-4 text-xs text-sumi/60 leading-relaxed">
                複数物件・法人対応業者から個別にご連絡いたします。業者の情報は申告情報として掲載しています。見積もり内容を確認してから依頼できます。
              </div>
            </div>
          )}
        </div>

        {/* ナビゲーション */}
        <div className="flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={() => setStep((s) => (s - 1) as Step)}
              className="text-sm border border-border text-sumi/60 px-6 py-3 hover:border-sumi/40 transition-colors"
            >
              ← 前に戻る
            </button>
          ) : (
            <Link href="/business" className="text-sm text-sumi/40 hover:text-sumi transition-colors">
              ← 法人向けページへ
            </Link>
          )}

          {step < 3 ? (
            <button
              onClick={() => setStep((s) => (s + 1) as Step)}
              disabled={!canNext()}
              className={`text-sm px-8 py-3 font-bold transition-colors ${
                canNext() ? "bg-kincya text-white hover:bg-do" : "bg-sumi/20 text-white cursor-not-allowed"
              }`}
            >
              次へ →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className={`text-sm px-8 py-3 font-bold transition-colors ${
                !submitting ? "bg-kincya text-white hover:bg-do" : "bg-sumi/20 text-white cursor-not-allowed"
              }`}
            >
              {submitting ? "送信中..." : "相談を送信する"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
