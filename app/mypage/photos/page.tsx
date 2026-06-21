import type { Metadata } from "next";
import Link from "next/link";
import SampleBadge from "@/components/common/SampleBadge";

export const metadata: Metadata = {
  title: "写真見積もり履歴 | マイページ | 日本畳パートナーズ",
  robots: "noindex,nofollow",
};

interface PhotoEstimateHistory {
  id: string;
  status: "submitted" | "replied";
  serviceCategory: string;
  city: string;
  imageCount: number;
  createdAt: string;
}

const SAMPLE_PHOTO_ESTIMATES: PhotoEstimateHistory[] = [
  {
    id: "pe-001",
    status: "replied",
    serviceCategory: "畳表替え",
    city: "さいたま市",
    imageCount: 3,
    createdAt: "2026-06-12",
  },
  {
    id: "pe-002",
    status: "submitted",
    serviceCategory: "ふすま張替え",
    city: "川口市",
    imageCount: 2,
    createdAt: "2026-06-19",
  },
];

const STATUS_MAP: Record<PhotoEstimateHistory["status"], { label: string; classes: string }> = {
  submitted: {
    label: "送信済み",
    classes: "bg-kincya/10 text-kincya border border-kincya/30",
  },
  replied: {
    label: "返信あり",
    classes: "bg-igusa/10 text-igusa border border-igusa/30",
  },
};

export default function MypagePhotosPage() {
  return (
    <div className="min-h-screen bg-cloud">
      {/* ページヘッダー */}
      <div className="bg-sumi">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-xs text-white/50 mb-1">
            <Link href="/mypage" className="hover:text-white/80">
              マイページ
            </Link>
            {" "}/ 写真見積もり
          </p>
          <h1 className="text-xl text-white" style={{ fontFamily: "var(--font-serif)" }}>
            写真見積もり履歴
          </h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 掲載イメージバナー */}
        <div className="bg-kiji border border-border px-4 py-2 flex items-center gap-2 mb-6">
          <SampleBadge />
          <p className="text-xs text-sumi/60">
            掲載イメージです。実際の写真見積もり履歴はログイン後に表示されます。
          </p>
        </div>

        {/* 新規依頼CTA */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-sumi">
            過去の写真見積もり依頼（<span className="text-ai font-medium">{SAMPLE_PHOTO_ESTIMATES.length}</span>件）
          </p>
          <Link
            href="/photo-estimate"
            className="text-sm bg-kincya text-white px-5 py-2 hover:bg-do transition-colors"
          >
            新しく写真見積もりを依頼する
          </Link>
        </div>

        {SAMPLE_PHOTO_ESTIMATES.length === 0 ? (
          <div className="bg-white border border-border p-12 text-center">
            <p className="text-sm text-sumi/50 mb-4">写真見積もりの履歴がありません</p>
            <Link
              href="/photo-estimate"
              className="text-sm text-white bg-kincya px-6 py-2 hover:bg-do transition-colors inline-block"
            >
              写真見積もりを依頼する
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {SAMPLE_PHOTO_ESTIMATES.map((item) => {
              const statusConfig = STATUS_MAP[item.status];
              return (
                <div key={item.id} className="bg-white border border-border p-5">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <p className="text-xs text-sumi/40 mb-0.5">依頼番号：{item.id}</p>
                      <h2
                        className="text-base text-sumi"
                        style={{ fontFamily: "var(--font-serif)" }}
                      >
                        {item.serviceCategory}
                      </h2>
                    </div>
                    <span className={`text-xs px-2 py-0.5 ${statusConfig.classes}`}>
                      {statusConfig.label}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs border-t border-kiji pt-3 mb-3">
                    <div>
                      <span className="text-sumi/40 block mb-0.5">依頼日</span>
                      {item.createdAt}
                    </div>
                    <div>
                      <span className="text-sumi/40 block mb-0.5">エリア</span>
                      {item.city}
                    </div>
                    <div>
                      <span className="text-sumi/40 block mb-0.5">添付写真</span>
                      {item.imageCount}枚
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      className="text-xs border border-border text-sumi/50 px-4 py-1.5 hover:border-ai hover:text-ai transition-colors cursor-pointer"
                    >
                      詳細を見る（準備中）
                    </button>
                    {item.status === "replied" && (
                      <Link
                        href="/bulk-quote"
                        className="text-xs border border-kincya text-kincya px-4 py-1.5 hover:bg-kincya hover:text-white transition-colors"
                      >
                        正式に依頼する
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-6">
          <Link href="/mypage" className="text-xs text-ai hover:underline">
            ← マイページに戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
