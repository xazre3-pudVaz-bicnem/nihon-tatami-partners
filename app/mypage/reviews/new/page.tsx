"use client";

import { useState } from "react";
import Link from "next/link";
import { MOCK_BOOKINGS } from "@/data/bookings";
import { MOCK_PROVIDERS } from "@/data/providers";
import { renderStars } from "@/lib/utils";

const MOCK_USER_ID = "user-001";

export default function NewReviewPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    bookingId: "",
    overallRating: 0,
    qualityRating: 0,
    priceRating: 0,
    speedRating: 0,
    communicationRating: 0,
    title: "",
    body: "",
    recommend: true,
  });

  const completedBookings = MOCK_BOOKINGS.filter(
    (b) => b.userId === MOCK_USER_ID && b.status === "completed"
  );

  const selectedBooking = completedBookings.find((b) => b.id === form.bookingId);
  const selectedProvider = selectedBooking
    ? MOCK_PROVIDERS.find((p) => p.id === selectedBooking.providerId)
    : null;

  const StarSelector = ({ value, onChange, label }: { value: number; onChange: (v: number) => void; label: string }) => (
    <div className="flex items-center gap-3">
      <span className="text-xs text-sumi/60 w-20">{label}</span>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className={`text-lg ${star <= value ? "text-kincya" : "text-sumi/20"} transition-colors hover:text-kincya`}
          >
            ★
          </button>
        ))}
      </div>
      {value > 0 && <span className="text-xs text-sumi/50">{value}.0</span>}
    </div>
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.bookingId || form.overallRating === 0) return;
    // TODO: Supabase にレビューを保存
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
          <h2 className="text-lg text-sumi mb-2" style={{ fontFamily: "var(--font-serif)" }}>口コミを投稿しました</h2>
          <p className="text-sm text-sumi/60 mb-6">口コミは審査後に公開されます。ご協力ありがとうございます。</p>
          <Link href="/mypage" className="text-sm text-ai border border-ai px-6 py-2 hover:bg-ai hover:text-white transition-all duration-300 inline-block">
            マイページへ戻る
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cloud">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/mypage" className="text-sm text-ai hover:underline">← マイページ</Link>
          <h1 className="text-xl text-sumi" style={{ fontFamily: "var(--font-serif)" }}>口コミを投稿する</h1>
        </div>

        <div className="bg-white border border-border p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs text-sumi/60 mb-1.5">対象の予約 <span className="text-do">*</span></label>
              <select
                value={form.bookingId}
                onChange={(e) => setForm((f) => ({ ...f, bookingId: e.target.value }))}
                required
                className="w-full border border-border text-sm px-3 py-2.5 focus:outline-none focus:border-ai"
              >
                <option value="">選択してください</option>
                {completedBookings.map((b) => (
                  <option key={b.id} value={b.id}>{b.serviceCategory}（{b.createdAt.slice(0, 10)}）</option>
                ))}
              </select>
              {selectedProvider && (
                <p className="text-xs text-sumi/50 mt-1">業者：{selectedProvider.tradeName || selectedProvider.companyName}</p>
              )}
            </div>

            <div className="space-y-3 border border-kiji p-4">
              <h3 className="text-sm text-sumi mb-2" style={{ fontFamily: "var(--font-serif)" }}>評価 <span className="text-do">*</span></h3>
              <StarSelector label="総合評価" value={form.overallRating} onChange={(v) => setForm((f) => ({ ...f, overallRating: v }))} />
              <StarSelector label="仕上がり" value={form.qualityRating} onChange={(v) => setForm((f) => ({ ...f, qualityRating: v }))} />
              <StarSelector label="価格" value={form.priceRating} onChange={(v) => setForm((f) => ({ ...f, priceRating: v }))} />
              <StarSelector label="スピード" value={form.speedRating} onChange={(v) => setForm((f) => ({ ...f, speedRating: v }))} />
              <StarSelector label="対応" value={form.communicationRating} onChange={(v) => setForm((f) => ({ ...f, communicationRating: v }))} />
            </div>

            <div>
              <label className="block text-xs text-sumi/60 mb-1.5">タイトル</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                placeholder="例：丁寧な仕事で満足でした"
                className="w-full border border-border text-sm px-3 py-2.5 focus:outline-none focus:border-ai"
              />
            </div>

            <div>
              <label className="block text-xs text-sumi/60 mb-1.5">口コミ本文 <span className="text-do">*</span></label>
              <textarea
                value={form.body}
                onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
                required
                rows={5}
                placeholder="実際に依頼した感想、良かった点・改善してほしい点などを教えてください"
                className="w-full border border-border text-sm px-3 py-2.5 focus:outline-none focus:border-ai resize-none"
              />
              <p className="text-xs text-sumi/40 mt-1">{form.body.length}文字</p>
            </div>

            <div>
              <label className="block text-xs text-sumi/60 mb-2">この業者をおすすめしますか？</label>
              <div className="flex gap-4">
                {[{ value: true, label: "おすすめする" }, { value: false, label: "おすすめしない" }].map((opt) => (
                  <label key={String(opt.value)} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="recommend"
                      checked={form.recommend === opt.value}
                      onChange={() => setForm((f) => ({ ...f, recommend: opt.value }))}
                      className="accent-kincya"
                    />
                    <span className="text-sm text-sumi">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={!form.bookingId || form.overallRating === 0}
              className="w-full bg-kincya text-white py-3 text-sm tracking-wider hover:bg-do transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              口コミを投稿する
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
