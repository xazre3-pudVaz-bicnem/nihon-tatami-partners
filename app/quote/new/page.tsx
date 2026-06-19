"use client";

import { useState } from "react";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { SAITAMA_CITIES } from "@/data/cities";
import { SERVICE_CATEGORIES } from "@/data/categories";
import { MOCK_PROVIDERS } from "@/data/providers";
import { formatRating } from "@/lib/utils";

type Step = 1 | 2 | 3 | 4;

interface QuoteForm {
  // Step 1 — 工事内容
  serviceCategory: string;
  buildingType: string;
  tatami: string;
  roomCount: string;
  // Step 2 — 現場情報
  city: string;
  address: string;
  desiredPeriod: string;
  hasParking: boolean;
  needFurnitureMove: boolean;
  budget: string;
  needsSiteVisit: boolean;
  notes: string;
  // Step 3 — 依頼者情報
  clientType: string;
  name: string;
  phone: string;
  email: string;
  contactMethod: string;
  // Step 4 — 業者選択
  selectedProviders: string[];
}

const INITIAL_FORM: QuoteForm = {
  serviceCategory: "",
  buildingType: "",
  tatami: "",
  roomCount: "1",
  city: "",
  address: "",
  desiredPeriod: "",
  hasParking: true,
  needFurnitureMove: false,
  budget: "",
  needsSiteVisit: false,
  notes: "",
  clientType: "individual",
  name: "",
  phone: "",
  email: "",
  contactMethod: "email",
  selectedProviders: [],
};

export default function QuoteNewPage() {
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<QuoteForm>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);

  const update = <K extends keyof QuoteForm>(key: K, val: QuoteForm[K]) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  const toggleProvider = (id: string) => {
    setForm((prev) => ({
      ...prev,
      selectedProviders: prev.selectedProviders.includes(id)
        ? prev.selectedProviders.filter((p) => p !== id)
        : prev.selectedProviders.length < 5
        ? [...prev.selectedProviders, id]
        : prev.selectedProviders,
    }));
  };

  // Step 4 で絞り込み
  const candidateProviders = MOCK_PROVIDERS.filter((p) => {
    if (form.city && !p.serviceAreas.includes(form.city)) return false;
    return p.status === "active";
  });

  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-shiro flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white border border-border p-10 text-center">
          <div className="w-14 h-14 border-2 border-igusa flex items-center justify-center mx-auto mb-6">
            <svg className="w-7 h-7 text-igusa" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl text-sumi mb-3" style={{ fontFamily: "var(--font-serif)" }}>
            見積もり依頼を送信しました
          </h2>
          <p className="text-sm text-sumi/60 mb-2 leading-relaxed">
            <strong>{form.selectedProviders.length}社</strong>の業者に見積もり依頼を送りました。
          </p>
          <p className="text-sm text-sumi/60 mb-8 leading-relaxed">
            各業者からの返信はメール（{form.email}）でご連絡します。通常1〜2営業日以内に届きます。
          </p>
          <div className="flex flex-col gap-3">
            <Link href="/mypage/quotes" className="block text-center bg-ai text-white py-3 text-sm tracking-wider hover:opacity-80 transition-opacity">
              見積もりの進捗を確認する
            </Link>
            <Link href="/" className="block text-center border border-border text-sumi/60 py-2.5 text-sm hover:border-sumi/40 transition-colors">
              トップへ戻る
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-shiro">
      {/* ヘッダー */}
      <div className="bg-sumi border-b border-white/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
          <Breadcrumbs
            items={[{ label: "トップ", href: "/" }, { label: "一括見積もり依頼" }]}
            variant="dark"
          />
        </div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-6 pt-2">
          <h1 className="text-2xl text-white mb-1" style={{ fontFamily: "var(--font-serif)" }}>
            複数業者への一括見積もり依頼
          </h1>
          <p className="text-sm text-white/60">1回の入力で最大5社に同時見積もり依頼。比較して一番いい業者を選べます。</p>
        </div>
      </div>

      {/* ステップインジケーター */}
      <div className="bg-white border-b border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="flex">
            {[
              { n: 1, label: "工事内容" },
              { n: 2, label: "現場情報" },
              { n: 3, label: "依頼者情報" },
              { n: 4, label: "業者選択" },
            ].map((s) => (
              <div
                key={s.n}
                className={`flex-1 py-4 text-center border-b-2 transition-colors ${
                  step === s.n
                    ? "border-kincya text-kincya"
                    : step > s.n
                    ? "border-igusa text-igusa"
                    : "border-transparent text-sumi/40"
                }`}
              >
                <div className={`w-6 h-6 mx-auto mb-1 text-xs flex items-center justify-center border ${
                  step === s.n ? "border-kincya text-kincya" :
                  step > s.n ? "border-igusa bg-igusa text-white" :
                  "border-sumi/20 text-sumi/40"
                }`}>
                  {step > s.n ? "✓" : s.n}
                </div>
                <p className="text-xs hidden sm:block">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">

        {/* ── Step 1: 工事内容 ── */}
        {step === 1 && (
          <div className="bg-white border border-border p-6 space-y-5">
            <h2 className="text-lg text-sumi" style={{ fontFamily: "var(--font-serif)" }}>どんな工事をご希望ですか？</h2>

            <div>
              <label className="block text-xs text-sumi/60 mb-2">サービスの種類 <span className="text-do">*</span></label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {SERVICE_CATEGORIES.slice(0, 9).map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => update("serviceCategory", cat.slug)}
                    className={`text-left p-3 border text-sm transition-all duration-200 ${
                      form.serviceCategory === cat.slug
                        ? "border-kincya bg-kincya/5 text-kincya"
                        : "border-border text-sumi hover:border-kincya/30"
                    }`}
                  >
                    <p className="font-medium">{cat.name}</p>
                    {cat.priceFrom && (
                      <p className="text-xs text-sumi/40 mt-0.5">{cat.priceFrom.toLocaleString()}円〜/{cat.unit}</p>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs text-sumi/60 mb-2">建物の種類 <span className="text-do">*</span></label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { value: "house", label: "一戸建て" },
                  { value: "apartment", label: "マンション・アパート" },
                  { value: "rental", label: "賃貸物件（退去後）" },
                  { value: "store", label: "店舗・事務所" },
                  { value: "ryokan", label: "旅館・宿泊施設" },
                  { value: "temple", label: "寺院・神社" },
                ].map((bt) => (
                  <button
                    key={bt.value}
                    onClick={() => update("buildingType", bt.value)}
                    className={`p-3 border text-sm transition-all duration-200 ${
                      form.buildingType === bt.value
                        ? "border-kincya bg-kincya/5 text-kincya"
                        : "border-border text-sumi hover:border-kincya/30"
                    }`}
                  >
                    {bt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-sumi/60 mb-2">畳数の目安</label>
                <select
                  value={form.tatami}
                  onChange={(e) => update("tatami", e.target.value)}
                  className="w-full border border-border text-sm px-3 py-2.5 focus:outline-none focus:border-ai"
                >
                  <option value="">未定・わからない</option>
                  <option value="4.5">4.5畳</option>
                  <option value="6">6畳</option>
                  <option value="8">8畳</option>
                  <option value="10">10畳</option>
                  <option value="12">12畳以上</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-sumi/60 mb-2">部屋数</label>
                <select
                  value={form.roomCount}
                  onChange={(e) => update("roomCount", e.target.value)}
                  className="w-full border border-border text-sm px-3 py-2.5 focus:outline-none focus:border-ai"
                >
                  <option value="1">1部屋</option>
                  <option value="2">2部屋</option>
                  <option value="3">3〜4部屋</option>
                  <option value="5">5部屋以上</option>
                </select>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setStep(2)}
                disabled={!form.serviceCategory || !form.buildingType}
                className="w-full bg-kincya text-white py-3 text-sm tracking-wider hover:bg-do transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                次へ：現場情報を入力
              </button>
            </div>
          </div>
        )}

        {/* ── Step 2: 現場情報 ── */}
        {step === 2 && (
          <div className="bg-white border border-border p-6 space-y-5">
            <h2 className="text-lg text-sumi" style={{ fontFamily: "var(--font-serif)" }}>現場の情報を教えてください</h2>

            <div>
              <label className="block text-xs text-sumi/60 mb-2">現場の市区町村 <span className="text-do">*</span></label>
              <select
                value={form.city}
                onChange={(e) => update("city", e.target.value)}
                required
                className="w-full border border-border text-sm px-3 py-2.5 focus:outline-none focus:border-ai"
              >
                <option value="">選択してください</option>
                {SAITAMA_CITIES.map((c) => (
                  <option key={c.slug} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs text-sumi/60 mb-2">詳細住所（任意・業者選択後に共有）</label>
              <input
                type="text"
                value={form.address}
                onChange={(e) => update("address", e.target.value)}
                placeholder="例：浦和区常盤6丁目"
                className="w-full border border-border text-sm px-3 py-2.5 focus:outline-none focus:border-ai"
              />
            </div>

            <div>
              <label className="block text-xs text-sumi/60 mb-2">施工希望時期</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {["できるだけ早く", "1ヶ月以内", "2〜3ヶ月以内", "半年以内", "時期未定"].map((p) => (
                  <button
                    key={p}
                    onClick={() => update("desiredPeriod", p)}
                    className={`p-2.5 border text-sm transition-all duration-200 ${
                      form.desiredPeriod === p ? "border-kincya bg-kincya/5 text-kincya" : "border-border text-sumi hover:border-kincya/30"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs text-sumi/60 mb-2">予算の目安</label>
              <select
                value={form.budget}
                onChange={(e) => update("budget", e.target.value)}
                className="w-full border border-border text-sm px-3 py-2.5 focus:outline-none focus:border-ai"
              >
                <option value="">決まっていない</option>
                <option value="under30000">3万円以下</option>
                <option value="30000to50000">3〜5万円</option>
                <option value="50000to100000">5〜10万円</option>
                <option value="over100000">10万円以上</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={form.hasParking} onChange={(e) => update("hasParking", e.target.checked)} className="accent-kincya" />
                <span className="text-sm text-sumi/70">駐車場あり（または近くにコインパーキングあり）</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={form.needFurnitureMove} onChange={(e) => update("needFurnitureMove", e.target.checked)} className="accent-kincya" />
                <span className="text-sm text-sumi/70">家具の移動が必要</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={form.needsSiteVisit} onChange={(e) => update("needsSiteVisit", e.target.checked)} className="accent-kincya" />
                <span className="text-sm text-sumi/70">見積もり前に現地確認を希望する</span>
              </label>
            </div>

            <div>
              <label className="block text-xs text-sumi/60 mb-2">その他ご要望・状況</label>
              <textarea
                value={form.notes}
                onChange={(e) => update("notes", e.target.value)}
                rows={3}
                placeholder="素材の希望、築年数、特殊な状況など"
                className="w-full border border-border text-sm px-3 py-2.5 focus:outline-none focus:border-ai resize-none"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button onClick={() => setStep(1)} className="flex-1 border border-border text-sumi/60 py-3 text-sm hover:border-sumi/40 transition-colors">
                ← 戻る
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!form.city}
                className="flex-2 flex-grow bg-kincya text-white py-3 text-sm tracking-wider hover:bg-do transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                次へ：依頼者情報を入力
              </button>
            </div>
          </div>
        )}

        {/* ── Step 3: 依頼者情報 ── */}
        {step === 3 && (
          <div className="bg-white border border-border p-6 space-y-5">
            <h2 className="text-lg text-sumi" style={{ fontFamily: "var(--font-serif)" }}>依頼者の情報を入力してください</h2>

            <div>
              <label className="block text-xs text-sumi/60 mb-2">依頼者の種別</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { value: "individual", label: "個人（ご自宅）" },
                  { value: "corporate", label: "法人・会社" },
                  { value: "realestate", label: "不動産会社" },
                  { value: "management", label: "管理会社" },
                  { value: "ryokan", label: "旅館・施設" },
                  { value: "temple", label: "寺院・神社" },
                ].map((ct) => (
                  <button
                    key={ct.value}
                    onClick={() => update("clientType", ct.value)}
                    className={`p-2.5 border text-sm transition-all duration-200 ${
                      form.clientType === ct.value ? "border-kincya bg-kincya/5 text-kincya" : "border-border text-sumi hover:border-kincya/30"
                    }`}
                  >
                    {ct.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs text-sumi/60 mb-2">お名前 <span className="text-do">*</span></label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                required
                placeholder="山田 太郎"
                className="w-full border border-border text-sm px-3 py-2.5 focus:outline-none focus:border-ai"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-sumi/60 mb-2">メールアドレス <span className="text-do">*</span></label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  required
                  placeholder="example@email.com"
                  className="w-full border border-border text-sm px-3 py-2.5 focus:outline-none focus:border-ai"
                />
              </div>
              <div>
                <label className="block text-xs text-sumi/60 mb-2">電話番号</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="090-0000-0000"
                  className="w-full border border-border text-sm px-3 py-2.5 focus:outline-none focus:border-ai"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-sumi/60 mb-2">希望する連絡方法</label>
              <div className="flex gap-3">
                {[
                  { value: "email", label: "メール" },
                  { value: "phone", label: "電話" },
                  { value: "both", label: "どちらでも" },
                ].map((cm) => (
                  <label key={cm.value} className="flex items-center gap-2 text-sm text-sumi/70 cursor-pointer">
                    <input type="radio" name="contact" value={cm.value} checked={form.contactMethod === cm.value} onChange={() => update("contactMethod", cm.value)} className="accent-kincya" />
                    {cm.label}
                  </label>
                ))}
              </div>
            </div>

            <p className="text-xs text-sumi/40">
              送信することで<a href="/terms" className="text-ai hover:underline">利用規約</a>・<a href="/privacy" className="text-ai hover:underline">プライバシーポリシー</a>に同意したものとみなします。
            </p>

            <div className="flex gap-3 pt-2">
              <button onClick={() => setStep(2)} className="flex-1 border border-border text-sumi/60 py-3 text-sm hover:border-sumi/40 transition-colors">
                ← 戻る
              </button>
              <button
                onClick={() => setStep(4)}
                disabled={!form.name || !form.email}
                className="flex-2 flex-grow bg-kincya text-white py-3 text-sm tracking-wider hover:bg-do transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                次へ：業者を選ぶ
              </button>
            </div>
          </div>
        )}

        {/* ── Step 4: 業者選択 ── */}
        {step === 4 && (
          <div className="space-y-5">
            <div className="bg-white border border-border p-5">
              <h2 className="text-lg text-sumi mb-2" style={{ fontFamily: "var(--font-serif)" }}>
                見積もりを依頼する業者を選んでください
              </h2>
              <p className="text-sm text-sumi/60">
                {form.city}エリアの業者 {candidateProviders.length}社が見つかりました。最大5社まで選択できます。
              </p>
            </div>

            <div className="space-y-3">
              {candidateProviders.map((p) => {
                const name = p.tradeName || p.companyName;
                const selected = form.selectedProviders.includes(p.id);
                return (
                  <div
                    key={p.id}
                    onClick={() => toggleProvider(p.id)}
                    className={`bg-white border p-4 cursor-pointer transition-all duration-200 ${
                      selected ? "border-kincya bg-kincya/5" : "border-border hover:border-kincya/30"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-6 h-6 border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        selected ? "border-kincya bg-kincya" : "border-sumi/30"
                      }`}>
                        {selected && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                      </div>
                      <div className="w-12 h-12 bg-kiji shrink-0 tatami-pattern flex items-center justify-center text-sm" style={{ fontFamily: "var(--font-serif)" }}>
                        {name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-sm font-medium text-sumi">{name}</p>
                            <p className="text-xs text-sumi/50">{p.city}</p>
                          </div>
                          <div className="text-right shrink-0">
                            <div className="flex items-center gap-1 justify-end">
                              <span className="text-kincya text-sm">★</span>
                              <span className="text-sm font-medium text-sumi">{formatRating(p.averageRating)}</span>
                              <span className="text-xs text-sumi/40">({p.reviewCount}件)</span>
                            </div>
                            {p.startingPrice && (
                              <p className="text-xs text-do">{p.startingPrice.toLocaleString()}円〜/{p.startingPriceUnit}</p>
                            )}
                          </div>
                        </div>
                        <p className="text-xs text-sumi/60 mt-1 line-clamp-1">{p.catchCopy}</p>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {p.badges?.slice(0, 3).map((b) => (
                            <span key={b.id} className="text-xs px-2 py-0.5 border border-border text-sumi/50">{b.label}</span>
                          ))}
                          {p.responseTimeHours && (
                            <span className="text-xs px-2 py-0.5 border border-ai/20 text-ai">{p.responseTimeHours}h以内返信</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 選択状況 */}
            <div className="sticky bottom-0 bg-white border border-border shadow-lg p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-sumi">
                    <span className="font-medium text-kincya text-lg">{form.selectedProviders.length}</span>
                    <span className="text-sumi/50"> / 最大5社を選択中</span>
                  </p>
                  {form.selectedProviders.length === 0 && (
                    <p className="text-xs text-sumi/40">1社以上選択して依頼を送信してください</p>
                  )}
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={form.selectedProviders.length === 0}
                  className="bg-kincya text-white px-8 py-3 text-sm tracking-wider hover:bg-do transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {form.selectedProviders.length}社に見積もりを依頼する
                </button>
              </div>
            </div>

            <button onClick={() => setStep(3)} className="text-sm text-sumi/50 hover:text-ai transition-colors">
              ← 依頼者情報に戻る
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
