"use client";

import { useState } from "react";
import { SAITAMA_CITIES } from "@/data/cities";

interface Props {
  providerId?: string;
  serviceCategory?: string;
  onSubmit?: (data: Record<string, unknown>) => void;
}

export default function BookingForm({ providerId, serviceCategory, onSubmit }: Props) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    serviceCategory: serviceCategory || "",
    address: "",
    buildingType: "",
    tatamiFlex: "",
    roomCount: "",
    tatamiFlexi: "",
    desiredDate1: "",
    desiredDate2: "",
    desiredDate3: "",
    photos: [] as string[],
    hasParking: "",
    needFurnitureMove: "",
    clientType: "individual",
    contactMethod: "email",
    notes: "",
    name: "",
    phone: "",
    email: "",
  });

  const update = (key: string, value: string) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) onSubmit({ ...form, providerId });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-white border border-border p-8 text-center">
        <div className="w-12 h-12 border-2 border-igusa flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-igusa" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg text-sumi mb-2" style={{ fontFamily: "var(--font-serif)" }}>予約リクエストを送信しました</h3>
        <p className="text-sm text-sumi/60 mb-6">業者より折り返しご連絡いたします。通常1〜2営業日以内にご連絡があります。</p>
        <button
          onClick={() => setSubmitted(false)}
          className="text-sm text-ai border border-ai px-4 py-2 hover:bg-ai hover:text-white transition-all duration-300"
        >
          別の予約を送る
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-border">
      <div className="border-b border-border px-5 py-4">
        <h3 className="text-base text-sumi" style={{ fontFamily: "var(--font-serif)" }}>予約リクエスト</h3>
        <p className="text-xs text-sumi/50 mt-1">入力後、業者に内容が送信されます。費用は発生しません。</p>
      </div>

      <div className="p-5 space-y-4">
        {/* 現場情報 */}
        <div>
          <label className="block text-xs text-sumi/60 mb-1.5">現場住所 <span className="text-do">*</span></label>
          <select
            value={form.address}
            onChange={(e) => update("address", e.target.value)}
            required
            className="w-full border border-border text-sm px-3 py-2 focus:outline-none focus:border-ai"
          >
            <option value="">市区町村を選択</option>
            {SAITAMA_CITIES.map((c) => (
              <option key={c.slug} value={c.name}>{c.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs text-sumi/60 mb-1.5">建物の種類 <span className="text-do">*</span></label>
          <select
            value={form.buildingType}
            onChange={(e) => update("buildingType", e.target.value)}
            required
            className="w-full border border-border text-sm px-3 py-2 focus:outline-none focus:border-ai"
          >
            <option value="">選択してください</option>
            <option value="house">一戸建て</option>
            <option value="apartment">マンション・アパート</option>
            <option value="rental">賃貸物件（退去後）</option>
            <option value="store">店舗・事務所</option>
            <option value="ryokan">旅館・宿泊施設</option>
            <option value="temple">寺院・神社</option>
            <option value="other">その他</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-sumi/60 mb-1.5">畳数の目安</label>
            <select
              value={form.tatamiFlex}
              onChange={(e) => update("tatamiFlex", e.target.value)}
              className="w-full border border-border text-sm px-3 py-2 focus:outline-none focus:border-ai"
            >
              <option value="">未定・わからない</option>
              <option value="4.5">4.5畳</option>
              <option value="6">6畳</option>
              <option value="8">8畳</option>
              <option value="10">10畳以上</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-sumi/60 mb-1.5">部屋数</label>
            <select
              value={form.roomCount}
              onChange={(e) => update("roomCount", e.target.value)}
              className="w-full border border-border text-sm px-3 py-2 focus:outline-none focus:border-ai"
            >
              <option value="">1部屋</option>
              <option value="2">2部屋</option>
              <option value="3">3部屋以上</option>
            </select>
          </div>
        </div>

        {/* 希望日 */}
        <div>
          <label className="block text-xs text-sumi/60 mb-1.5">希望日（第1希望）</label>
          <input
            type="date"
            value={form.desiredDate1}
            onChange={(e) => update("desiredDate1", e.target.value)}
            className="w-full border border-border text-sm px-3 py-2 focus:outline-none focus:border-ai"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-sumi/60 mb-1.5">第2希望</label>
            <input
              type="date"
              value={form.desiredDate2}
              onChange={(e) => update("desiredDate2", e.target.value)}
              className="w-full border border-border text-sm px-3 py-2 focus:outline-none focus:border-ai"
            />
          </div>
          <div>
            <label className="block text-xs text-sumi/60 mb-1.5">第3希望</label>
            <input
              type="date"
              value={form.desiredDate3}
              onChange={(e) => update("desiredDate3", e.target.value)}
              className="w-full border border-border text-sm px-3 py-2 focus:outline-none focus:border-ai"
            />
          </div>
        </div>

        {/* オプション */}
        <div className="flex gap-4">
          <label className="flex items-center gap-2 text-sm text-sumi/70">
            <input
              type="checkbox"
              checked={form.hasParking === "true"}
              onChange={(e) => update("hasParking", e.target.checked ? "true" : "false")}
              className="accent-kincya"
            />
            駐車場あり
          </label>
          <label className="flex items-center gap-2 text-sm text-sumi/70">
            <input
              type="checkbox"
              checked={form.needFurnitureMove === "true"}
              onChange={(e) => update("needFurnitureMove", e.target.checked ? "true" : "false")}
              className="accent-kincya"
            />
            家具移動希望
          </label>
        </div>

        {/* 依頼者種別 */}
        <div>
          <label className="block text-xs text-sumi/60 mb-1.5">ご依頼者の種別</label>
          <select
            value={form.clientType}
            onChange={(e) => update("clientType", e.target.value)}
            className="w-full border border-border text-sm px-3 py-2 focus:outline-none focus:border-ai"
          >
            <option value="individual">個人（ご自宅）</option>
            <option value="corporate">法人・会社</option>
            <option value="realestate">不動産会社</option>
            <option value="management">管理会社</option>
            <option value="ryokan">旅館・宿泊施設</option>
            <option value="temple">寺院・神社</option>
          </select>
        </div>

        {/* 連絡先 */}
        <div>
          <label className="block text-xs text-sumi/60 mb-1.5">お名前 <span className="text-do">*</span></label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            required
            placeholder="山田 太郎"
            className="w-full border border-border text-sm px-3 py-2 focus:outline-none focus:border-ai"
          />
        </div>
        <div>
          <label className="block text-xs text-sumi/60 mb-1.5">メールアドレス <span className="text-do">*</span></label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            required
            placeholder="example@email.com"
            className="w-full border border-border text-sm px-3 py-2 focus:outline-none focus:border-ai"
          />
        </div>
        <div>
          <label className="block text-xs text-sumi/60 mb-1.5">電話番号</label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="090-0000-0000"
            className="w-full border border-border text-sm px-3 py-2 focus:outline-none focus:border-ai"
          />
        </div>

        {/* 備考 */}
        <div>
          <label className="block text-xs text-sumi/60 mb-1.5">ご要望・備考</label>
          <textarea
            value={form.notes}
            onChange={(e) => update("notes", e.target.value)}
            rows={3}
            placeholder="素材のご希望、施工の注意事項など"
            className="w-full border border-border text-sm px-3 py-2 focus:outline-none focus:border-ai resize-none"
          />
        </div>

        <p className="text-xs text-sumi/40">
          送信することで
          <a href="/terms" className="text-ai hover:underline">利用規約</a>・
          <a href="/privacy" className="text-ai hover:underline">プライバシーポリシー</a>
          に同意したものとみなします。
        </p>

        <button
          type="submit"
          className="w-full bg-kincya text-white py-3 text-sm tracking-wider hover:bg-do transition-colors duration-300"
        >
          予約リクエストを送る
        </button>
      </div>
    </form>
  );
}
