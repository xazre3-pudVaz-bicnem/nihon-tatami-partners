"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import StickyBottomCTA from "@/components/common/StickyBottomCTA";

// ─── 写真カテゴリ定義 ─────────────────────────────────────────────────────────
const PHOTO_CATEGORIES = [
  { key: "whole_room", label: "畳全体（部屋を引きで撮影）", hint: "部屋全体が写るよう引いて撮影してください" },
  { key: "damaged_area", label: "傷んでいる箇所", hint: "傷み・変色・へこみが分かる箇所をアップで" },
  { key: "full_room", label: "部屋全体", hint: "4方向から各1枚ずつ撮影すると◎" },
  { key: "fusuma", label: "ふすま", hint: "ふすま全体と、破れ・汚れがあれば近撮も" },
  { key: "shoji", label: "障子", hint: "障子全体と、破れ箇所のアップ" },
  { key: "under_tatami", label: "敷居・畳下", hint: "敷居の溝や畳下が見える場合は撮影を" },
] as const;

type PhotoCategoryKey = (typeof PHOTO_CATEGORIES)[number]["key"];

interface UploadedPhoto {
  id: string;
  categoryKey: PhotoCategoryKey;
  preview: string;
  fileName: string;
}

const SERVICE_OPTIONS = [
  { value: "tatami-omotegae", label: "畳表替え" },
  { value: "tatami-uragaeshi", label: "畳裏返し" },
  { value: "tatami-shinchou", label: "畳新調" },
  { value: "fusuma", label: "ふすま張替え" },
  { value: "shoji", label: "障子張替え" },
  { value: "washitsu-reform", label: "和室リフォーム" },
  { value: "other", label: "その他・分からない" },
];

const GOOD_PHOTO_TIPS = [
  "明るい時間帯・照明をつけて撮影",
  "正面・真上から撮ると状態が分かりやすい",
  "傷みのある箇所は近くからアップでも撮る",
  "畳の枚数・ふすまの枚数が分かるよう引きで1枚",
];

const BAD_PHOTO_TIPS = [
  "暗すぎてピントが合っていない写真",
  "一部しか写っていない写真（全体が見えない）",
  "手ブレで不鮮明な写真",
];

const FAQ_ITEMS = [
  {
    question: "写真だけで正確な見積もりは出ますか？",
    answer:
      "写真からはあくまで概算のご案内になります。素材・畳床の状態・採寸は現地確認が必要なため、正式な料金は現地見積もりでご確認ください。",
  },
  {
    question: "スマートフォンの写真で大丈夫ですか？",
    answer:
      "はい、スマートフォンの標準カメラで撮影した写真で十分です。できるだけ明るい場所・時間に撮影してください。",
  },
  {
    question: "写真は何枚まで送れますか？",
    answer: "このフォームでは最大8枚まで添付できます。",
  },
  {
    question: "送った写真はどうなりますか？",
    answer:
      "送信された写真は業者が確認し、概算料金をご案内する目的のみに使用します。第三者への提供は行いません。",
  },
];

export default function PhotoEstimatePage() {
  const [photos, setPhotos] = useState<UploadedPhoto[]>([]);
  const [serviceCategory, setServiceCategory] = useState("");
  const [city, setCity] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const MAX_PHOTOS = 8;

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    categoryKey: PhotoCategoryKey
  ) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;

    const remaining = MAX_PHOTOS - photos.length;
    const toProcess = files.slice(0, remaining);

    toProcess.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const preview = ev.target?.result as string;
        setPhotos((prev) => [
          ...prev,
          {
            id: `${Date.now()}-${Math.random()}`,
            categoryKey,
            preview,
            fileName: file.name,
          },
        ]);
      };
      reader.readAsDataURL(file);
    });

    // reset input
    if (fileInputRefs.current[categoryKey]) {
      fileInputRefs.current[categoryKey]!.value = "";
    }
  };

  const removePhoto = (id: string) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
          送信が完了しました
        </h2>
        <p className="text-sm text-sumi/60 max-w-sm mb-8 leading-relaxed">
          写真と相談内容を受け付けました。内容を確認のうえ、概算料金をご案内できる場合にご連絡します（通常1〜2営業日以内）。
          <br />
          正確な料金は現地確認後の見積もりでご案内します。
        </p>
        <div className="flex gap-3 flex-wrap justify-center">
          <Link href="/search" className="bg-kincya text-white px-6 py-3 text-sm font-bold hover:bg-do transition-colors">
            業者を探す
          </Link>
          <Link href="/bulk-quote" className="border border-ai text-ai px-6 py-3 text-sm hover:bg-ai hover:text-white transition-colors">
            一括見積もり依頼
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
              { label: "写真で見積もり相談" },
            ]}
          />
          <h1
            className="text-2xl md:text-3xl text-white mt-4 mb-2"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            写真を送って見積もり相談
          </h1>
          <p className="text-white/60 text-sm">
            写真からおおよその料金をご案内できる場合があります。正確な料金は現地確認後の見積もりになります。
          </p>
        </div>
      </div>

      {/* 注意バナー */}
      <div className="bg-kincya/10 border-b border-kincya/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <p className="text-xs text-sumi/70 leading-relaxed">
            ※ 写真だけで概算のご案内ができる場合があります。正確な料金は現地確認後の見積もりになります。掲載料金はあくまで参考概算です。
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左：メインフォーム */}
          <div className="lg:col-span-2 space-y-8">
            {/* 写真アップロードエリア */}
            <section>
              <h2
                className="text-lg text-sumi mb-1"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                写真を追加する
              </h2>
              <p className="text-xs text-sumi/50 mb-5">
                最大{MAX_PHOTOS}枚まで。複数カテゴリから選んで追加できます。
                現在{photos.length}枚追加済み。
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {PHOTO_CATEGORIES.map((cat) => {
                  const catPhotos = photos.filter((p) => p.categoryKey === cat.key);
                  const isDisabled = photos.length >= MAX_PHOTOS;

                  return (
                    <div key={cat.key} className="border border-border bg-white p-4">
                      <p className="text-sm font-medium text-sumi mb-1">{cat.label}</p>
                      <p className="text-xs text-sumi/50 mb-3">{cat.hint}</p>

                      {catPhotos.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {catPhotos.map((photo) => (
                            <div key={photo.id} className="relative w-20 h-20">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={photo.preview}
                                alt={photo.fileName}
                                className="w-full h-full object-cover border border-border"
                              />
                              <button
                                type="button"
                                onClick={() => removePhoto(photo.id)}
                                className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-do text-white text-xs flex items-center justify-center hover:bg-sumi transition-colors"
                                aria-label="削除"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      )}

                      <label
                        className={`flex items-center gap-2 text-xs px-3 py-2 border cursor-pointer transition-colors ${
                          isDisabled
                            ? "border-border text-sumi/30 cursor-not-allowed bg-kiji/30"
                            : "border-ai text-ai hover:bg-ai/5"
                        }`}
                      >
                        <svg
                          className="w-4 h-4 shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                        写真を追加
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          disabled={isDisabled}
                          className="sr-only"
                          ref={(el) => {
                            fileInputRefs.current[cat.key] = el;
                          }}
                          onChange={(e) => handleFileChange(e, cat.key)}
                        />
                      </label>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* フォーム */}
            <section className="space-y-5">
              <h2 className="text-lg text-sumi" style={{ fontFamily: "var(--font-serif)" }}>
                相談内容
              </h2>

              {/* サービス種別 */}
              <div>
                <label className="block text-sm text-sumi mb-1.5">
                  ご相談のサービス
                </label>
                <select
                  value={serviceCategory}
                  onChange={(e) => setServiceCategory(e.target.value)}
                  className="w-full border border-border px-3 py-2.5 text-sm text-sumi bg-white focus:outline-none focus:border-ai transition-colors"
                >
                  <option value="">選択してください</option>
                  {SERVICE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* 市区町村 */}
              <div>
                <label className="block text-sm text-sumi mb-1.5">
                  現場の市区町村
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="例：さいたま市浦和区"
                  className="w-full border border-border px-3 py-2.5 text-sm text-sumi bg-white focus:outline-none focus:border-ai transition-colors placeholder:text-sumi/30"
                />
              </div>

              {/* 補足メモ */}
              <div>
                <label className="block text-sm text-sumi mb-1.5">
                  補足メモ（任意）
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  placeholder="畳の枚数・築年数・気になること・ご希望時期など"
                  className="w-full border border-border px-3 py-2.5 text-sm text-sumi bg-white focus:outline-none focus:border-ai transition-colors placeholder:text-sumi/30 resize-none"
                />
              </div>

              {/* 送信 */}
              <div>
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-kincya text-white px-10 py-3.5 font-bold text-sm hover:bg-do transition-colors"
                >
                  業者に送る
                </button>
                <p className="text-xs text-sumi/40 mt-2">
                  ※ 申告情報として業者に共有されます。見積もりは現地確認後になります。
                </p>
              </div>
            </section>
          </div>

          {/* 右サイドバー */}
          <aside className="space-y-6">
            {/* 良い写真の例 */}
            <div className="border border-border bg-white p-5">
              <h3
                className="text-base text-sumi mb-4"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                写真の撮り方のポイント
              </h3>

              <div className="mb-4">
                <p className="text-xs font-medium text-igusa mb-2">良い写真の例</p>
                <ul className="space-y-2">
                  {GOOD_PHOTO_TIPS.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-sumi/70">
                      <span className="text-igusa mt-0.5 shrink-0">✓</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-kiji pt-4">
                <p className="text-xs font-medium text-do mb-2">避けたい写真</p>
                <ul className="space-y-2">
                  {BAD_PHOTO_TIPS.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-sumi/70">
                      <span className="text-do mt-0.5 shrink-0">×</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* サンプルカード */}
            <div className="bg-kiji/40 border border-kiji p-5">
              <p className="text-xs text-sumi/50 mb-3 font-medium">撮影イメージ</p>
              <div className="grid grid-cols-2 gap-2">
                {["畳全体", "傷み箇所", "ふすま", "部屋全体"].map((label) => (
                  <div key={label} className="aspect-square bg-white border border-border flex items-center justify-center">
                    <span className="text-[10px] text-sumi/30 text-center px-1">{label}</span>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-sumi/40 mt-2 text-center">撮影例イメージ（実際の写真に置き換え予定）</p>
            </div>

            {/* よくある質問 */}
            <div className="border border-border bg-white p-5">
              <h3
                className="text-base text-sumi mb-4"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                よくある質問
              </h3>
              <div className="space-y-1">
                {FAQ_ITEMS.map((faq, i) => (
                  <div key={i} className="border-b border-kiji last:border-0">
                    <button
                      type="button"
                      className="w-full text-left py-3 flex items-start gap-2 hover:text-ai transition-colors"
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    >
                      <span className="text-kincya text-xs shrink-0 mt-0.5">Q</span>
                      <span className="text-xs text-sumi leading-relaxed">{faq.question}</span>
                      <span className="ml-auto text-sumi/30 shrink-0">{openFaq === i ? "−" : "+"}</span>
                    </button>
                    {openFaq === i && (
                      <div className="pb-3 pl-4">
                        <p className="text-xs text-sumi/70 leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 代替手段 */}
            <div className="bg-ai/5 border border-ai/20 p-5">
              <p className="text-xs text-ai font-medium mb-3">写真なしでも相談できます</p>
              <div className="space-y-2">
                <Link
                  href="/bulk-quote"
                  className="block w-full text-center text-xs border border-ai text-ai py-2.5 hover:bg-ai hover:text-white transition-colors"
                >
                  一括見積もりを依頼
                </Link>
                <Link
                  href="/concierge"
                  className="block w-full text-center text-xs border border-border text-sumi/60 py-2.5 hover:border-ai hover:text-ai transition-colors"
                >
                  業者選びを相談する
                </Link>
              </div>
            </div>
          </aside>
        </form>
      </div>

      <StickyBottomCTA
        primaryLabel="一括見積もりを依頼"
        primaryHref="/bulk-quote"
        secondaryLabel="業者を探す"
        secondaryHref="/search"
      />
    </>
  );
}
