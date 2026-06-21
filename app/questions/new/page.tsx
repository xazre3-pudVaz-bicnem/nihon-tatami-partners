"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import type { QuestionCategory } from "@/lib/types-platform";

const CATEGORIES: { value: QuestionCategory; label: string }[] = [
  { value: "price", label: "料金・見積もり" },
  { value: "material", label: "素材・畳の種類" },
  { value: "process", label: "工事・施工" },
  { value: "rental", label: "賃貸・退去" },
  { value: "corporate", label: "法人・管理会社" },
  { value: "ryokan", label: "旅館・ホテル" },
  { value: "temple", label: "寺社・仏閣" },
  { value: "maintenance", label: "メンテナンス" },
  { value: "other", label: "その他" },
];

interface FormData {
  title: string;
  category: QuestionCategory | "";
  city: string;
  body: string;
  authorName: string;
}

const INITIAL: FormData = {
  title: "",
  category: "",
  city: "",
  body: "",
  authorName: "",
};

export default function QuestionNewPage() {
  const [form, setForm] = useState<FormData>(INITIAL);
  const [photoPreview, setPhotoPreview] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const set = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []).slice(0, 3 - photoPreview.length);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setPhotoPreview((prev) => [...prev, ev.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removePhoto = (index: number) => {
    setPhotoPreview((prev) => prev.filter((_, i) => i !== index));
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    if (!form.title.trim()) newErrors.title = "質問タイトルを入力してください";
    if (!form.category) newErrors.category = "カテゴリを選択してください";
    if (!form.body.trim()) newErrors.body = "質問の内容を入力してください";
    if (!form.authorName.trim()) newErrors.authorName = "お名前（ニックネーム可）を入力してください";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
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
          質問を投稿しました
        </h2>
        <p className="text-sm text-sumi/60 max-w-sm mb-3 leading-relaxed">
          専門の業者から回答が届いた場合にお知らせします。
        </p>
        <p className="text-xs text-sumi/40 max-w-sm mb-8 leading-relaxed">
          投稿内容は運営が確認します。不適切な内容は非公開となる場合があります。
        </p>
        <div className="flex gap-3 flex-wrap justify-center">
          <Link
            href="/questions"
            className="border border-border text-sumi/60 px-6 py-3 text-sm hover:border-ai hover:text-ai transition-colors"
          >
            Q&A一覧に戻る
          </Link>
          <Link
            href="/search"
            className="bg-kincya text-white px-6 py-3 text-sm font-bold hover:bg-do transition-colors"
          >
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
              { label: "Q&A一覧", href: "/questions" },
              { label: "質問を投稿" },
            ]}
          />
          <h1
            className="text-2xl text-white mt-4 mb-2"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            質問を投稿する
          </h1>
          <p className="text-white/60 text-sm">
            専門業者から回答が届きます（無料）
          </p>
        </div>
      </div>

      {/* 注意書き */}
      <div className="bg-kiji/60 border-b border-kiji">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
          <p className="text-xs text-sumi/60">
            投稿内容は運営が確認します。不適切な内容は非公開となる場合があります。
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* タイトル */}
          <div>
            <label className="block text-sm text-sumi mb-1.5">
              質問タイトル <span className="text-do text-xs">必須</span>
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="例：畳表替えと新調はどう違いますか？"
              className={`w-full border px-3 py-2.5 text-sm focus:outline-none transition-colors placeholder:text-sumi/30 ${
                errors.title ? "border-do" : "border-border focus:border-ai"
              }`}
            />
            {errors.title && <p className="text-xs text-do mt-1">{errors.title}</p>}
          </div>

          {/* カテゴリ */}
          <div>
            <label className="block text-sm text-sumi mb-2">
              カテゴリ <span className="text-do text-xs">必須</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => set("category", cat.value)}
                  className={`text-sm px-3 py-2.5 border text-left transition-colors ${
                    form.category === cat.value
                      ? "border-ai bg-ai/5 text-ai"
                      : "border-border text-sumi/70 hover:border-ai/50"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
            {errors.category && <p className="text-xs text-do mt-1">{errors.category}</p>}
          </div>

          {/* 地域 */}
          <div>
            <label className="block text-sm text-sumi mb-1.5">
              地域・市区町村（任意）
            </label>
            <input
              type="text"
              value={form.city}
              onChange={(e) => set("city", e.target.value)}
              placeholder="例：さいたま市・川口市"
              className="w-full border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-ai transition-colors placeholder:text-sumi/30"
            />
          </div>

          {/* 質問内容 */}
          <div>
            <label className="block text-sm text-sumi mb-1.5">
              質問の内容 <span className="text-do text-xs">必須</span>
            </label>
            <textarea
              value={form.body}
              onChange={(e) => set("body", e.target.value)}
              rows={6}
              placeholder="現在の状況・お困りの内容・知りたいことなどを具体的に書いてください。"
              className={`w-full border px-3 py-2.5 text-sm focus:outline-none transition-colors placeholder:text-sumi/30 resize-none ${
                errors.body ? "border-do" : "border-border focus:border-ai"
              }`}
            />
            {errors.body && <p className="text-xs text-do mt-1">{errors.body}</p>}
            <p className="text-xs text-sumi/40 mt-1">個人情報（住所・電話番号等）は含めないでください</p>
          </div>

          {/* 名前 */}
          <div>
            <label className="block text-sm text-sumi mb-1.5">
              お名前 <span className="text-sumi/40 text-xs">ニックネーム可</span>{" "}
              <span className="text-do text-xs">必須</span>
            </label>
            <input
              type="text"
              value={form.authorName}
              onChange={(e) => set("authorName", e.target.value)}
              placeholder="例：さいたまの田中 / 匿名ユーザー"
              className={`w-full border px-3 py-2.5 text-sm focus:outline-none transition-colors placeholder:text-sumi/30 ${
                errors.authorName ? "border-do" : "border-border focus:border-ai"
              }`}
            />
            {errors.authorName && <p className="text-xs text-do mt-1">{errors.authorName}</p>}
          </div>

          {/* 写真添付（任意・mock） */}
          <div>
            <label className="block text-sm text-sumi mb-1.5">
              写真を添付（任意・最大3枚）
            </label>
            {photoPreview.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {photoPreview.map((src, i) => (
                  <div key={i} className="relative w-20 h-20">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt={`添付写真${i + 1}`} className="w-full h-full object-cover border border-border" />
                    <button
                      type="button"
                      onClick={() => removePhoto(i)}
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-do text-white text-xs flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
            {photoPreview.length < 3 && (
              <label className="flex items-center gap-2 text-xs px-4 py-2.5 border border-ai text-ai cursor-pointer hover:bg-ai/5 transition-colors w-fit">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                </svg>
                写真を追加
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="sr-only"
                  ref={fileInputRef}
                  onChange={handlePhotoChange}
                />
              </label>
            )}
            <p className="text-xs text-sumi/40 mt-1.5">
              ※ 写真添付は現在準備中のため、本番公開前に機能します
            </p>
          </div>

          {/* 送信 */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full sm:w-auto bg-kincya text-white px-10 py-3.5 font-bold text-sm hover:bg-do transition-colors"
            >
              質問を投稿する
            </button>
          </div>
        </form>

        {/* 代替手段 */}
        <div className="mt-10 border-t border-kiji pt-8">
          <p className="text-sm text-sumi/60 mb-4">
            すぐに業者に聞きたい場合は
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/bulk-quote"
              className="border border-ai text-ai text-sm px-5 py-2.5 hover:bg-ai hover:text-white transition-colors"
            >
              一括見積もりを依頼
            </Link>
            <Link
              href="/concierge"
              className="border border-border text-sumi/60 text-sm px-5 py-2.5 hover:border-ai hover:text-ai transition-colors"
            >
              業者選びを相談する
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
