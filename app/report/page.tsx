"use client";

import { useState } from "react";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";

// 不正・不適切情報の報告フォーム
// TODO: Supabase移行後は送信をServer Action / API Routeに変更
const TARGET_TYPES = [
  { value: "review", label: "口コミ" },
  { value: "provider", label: "業者・掲載情報" },
  { value: "message", label: "メッセージ" },
  { value: "other", label: "その他" },
];

const REASONS = [
  "事実と異なる・虚偽の内容",
  "誹謗中傷・不適切な表現",
  "なりすまし・自作自演",
  "個人情報・プライバシーの侵害",
  "宣伝・スパム",
  "その他",
];

export default function ReportPage() {
  const [targetType, setTargetType] = useState("");
  const [targetId, setTargetId] = useState("");
  const [reason, setReason] = useState("");
  const [detail, setDetail] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
          <h2 className="text-xl text-sumi mb-3" style={{ fontFamily: "var(--font-serif)" }}>報告を受け付けました</h2>
          <p className="text-sm text-sumi/60 mb-8 leading-relaxed">
            ご報告ありがとうございます。内容を確認のうえ、必要に応じて対応いたします。個別の対応結果はお返事できない場合があります。
          </p>
          <Link href="/" className="block text-center bg-ai text-white py-3 text-sm hover:bg-ai-light transition-colors">
            トップへ戻る
          </Link>
        </div>
      </div>
    );
  }

  const inputClass = "w-full border border-border text-sm px-3 py-2.5 focus:outline-none focus:border-ai";

  return (
    <div className="min-h-screen bg-shiro">
      <div className="bg-sumi border-b border-white/10">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-4">
          <Breadcrumbs variant="dark" items={[{ label: "トップ", href: "/" }, { label: "不適切な情報の報告" }]} />
        </div>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 pb-6 pt-2">
          <h1 className="text-2xl text-white mb-1" style={{ fontFamily: "var(--font-serif)" }}>不適切な情報の報告</h1>
          <p className="text-sm text-white/60">虚偽の情報・不適切な口コミ・トラブルにつながる行為などをご報告ください。</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <form onSubmit={handleSubmit} className="bg-white border border-border p-6 space-y-5">
          <div>
            <label className="block text-xs text-sumi/60 mb-2">報告の対象 <span className="text-do">*</span></label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {TARGET_TYPES.map((t) => (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => setTargetType(t.value)}
                  className={`p-2.5 border text-sm transition-colors ${
                    targetType === t.value ? "border-kincya bg-kincya/5 text-kincya" : "border-border text-sumi hover:border-kincya/30"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs text-sumi/60 mb-1.5">対象のURL・業者名・ID（任意）</label>
            <input type="text" value={targetId} onChange={(e) => setTargetId(e.target.value)} placeholder="例：/providers/prov-001、○○畳店" className={inputClass} />
          </div>

          <div>
            <label className="block text-xs text-sumi/60 mb-2">報告の理由 <span className="text-do">*</span></label>
            <select required value={reason} onChange={(e) => setReason(e.target.value)} className={inputClass}>
              <option value="">選択してください</option>
              {REASONS.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs text-sumi/60 mb-1.5">詳しい状況 <span className="text-do">*</span></label>
            <textarea required rows={5} value={detail} onChange={(e) => setDetail(e.target.value)} placeholder="どのような点が不適切か、具体的にご記入ください。" className={`${inputClass} resize-none`} />
          </div>

          <div>
            <label className="block text-xs text-sumi/60 mb-1.5">連絡先メール（任意）</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@email.com" className={inputClass} />
            <p className="text-xs text-sumi/40 mt-1">追加で確認が必要な場合にのみ使用します。</p>
          </div>

          <p className="text-xs text-sumi/40">
            送信することで<Link href="/privacy" className="text-ai hover:underline">プライバシーポリシー</Link>に同意したものとみなします。
          </p>

          <button type="submit" className="w-full bg-do text-white py-3 text-sm tracking-wider hover:opacity-90 transition-opacity">
            この内容で報告する
          </button>
        </form>
      </div>
    </div>
  );
}
