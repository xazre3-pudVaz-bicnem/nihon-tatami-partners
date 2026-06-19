"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import BookingForm from "@/components/common/BookingForm";
import { getProviderById } from "@/data/providers";

// 予約フォームのメインフロー
// TODO: Supabase移行後は送信をServer Action / API Routeに変更
function BookingNewContent() {
  const searchParams = useSearchParams();
  const providerId = searchParams.get("provider") || undefined;
  const category = searchParams.get("category") || undefined;
  const provider = providerId ? getProviderById(providerId) : undefined;

  return (
    <div className="min-h-screen bg-shiro">
      <div className="bg-sumi border-b border-white/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
          <Breadcrumbs
            variant="dark"
            items={[
              { label: "トップ", href: "/" },
              ...(provider ? [{ label: provider.tradeName || provider.companyName, href: `/providers/${provider.id}` }] : []),
              { label: "予約リクエスト" },
            ]}
          />
        </div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-6 pt-2">
          <h1 className="text-2xl text-white mb-1" style={{ fontFamily: "var(--font-serif)" }}>
            予約リクエスト
          </h1>
          <p className="text-sm text-white/60">
            {provider ? `${provider.tradeName || provider.companyName}に予約リクエストを送ります。` : "希望の業者に予約リクエストを送ります。"}
            内容入力後、業者から折り返しご連絡します。費用は発生しません。
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {provider && (
          <div className="bg-white border border-border p-4 mb-5 flex items-center gap-4">
            <div className="w-12 h-12 bg-kiji shrink-0 tatami-pattern" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sumi">{provider.tradeName || provider.companyName}</p>
              <p className="text-xs text-sumi/50">{provider.city}</p>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="text-kincya text-xs">{"★".repeat(Math.floor(provider.averageRating))}</span>
                <span className="text-xs text-sumi/50">{provider.averageRating.toFixed(1)}（{provider.reviewCount}件）</span>
              </div>
            </div>
            <Link href={`/providers/${provider.id}`} className="text-xs text-ai hover:underline shrink-0">
              業者詳細
            </Link>
          </div>
        )}

        <BookingForm providerId={providerId} serviceCategory={category} />

        <div className="mt-6 bg-kiji/40 border border-kiji p-4">
          <p className="text-xs text-sumi/60 leading-relaxed">
            複数の業者を比較したい場合は、
            <Link href="/bulk-quote" className="text-ai hover:underline">一括見積もり</Link>
            もご利用いただけます。1回の入力で最大5社に見積もり依頼ができます。
          </p>
        </div>
      </div>
    </div>
  );
}

export default function BookingNewPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-shiro flex items-center justify-center">
          <p className="text-sm text-sumi/50">読み込み中...</p>
        </div>
      }
    >
      <BookingNewContent />
    </Suspense>
  );
}
