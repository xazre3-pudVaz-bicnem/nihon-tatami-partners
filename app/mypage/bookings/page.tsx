import type { Metadata } from "next";
import Link from "next/link";
import { MOCK_BOOKINGS } from "@/data/bookings";
import StatusBadge from "@/components/common/StatusBadge";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "予約履歴 | マイページ | 日本畳パートナー",
  robots: "noindex,nofollow",
};

const MOCK_USER_ID = "user-001";

export default function BookingsPage() {
  const bookings = MOCK_BOOKINGS.filter((b) => b.userId === MOCK_USER_ID);

  return (
    <div className="min-h-screen bg-cloud">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/mypage" className="text-sm text-ai hover:underline">← マイページ</Link>
          <h1 className="text-xl text-sumi" style={{ fontFamily: "var(--font-serif)" }}>予約履歴</h1>
        </div>

        <div className="space-y-4">
          {bookings.length === 0 ? (
            <div className="bg-white border border-border p-12 text-center">
              <p className="text-sm text-sumi/50 mb-4">予約履歴はありません</p>
              <Link href="/search" className="text-sm text-ai border border-ai px-4 py-2 hover:bg-ai hover:text-white transition-all duration-300 inline-block">
                業者を探す
              </Link>
            </div>
          ) : (
            bookings.map((booking) => (
              <div key={booking.id} className="bg-white border border-border p-5">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <p className="text-xs text-sumi/40 mb-0.5">予約番号：{booking.id}</p>
                    <p className="text-base text-sumi" style={{ fontFamily: "var(--font-serif)" }}>{booking.serviceCategory}</p>
                    <p className="text-xs text-sumi/60 mt-0.5">{booking.address}</p>
                  </div>
                  <StatusBadge status={booking.status} />
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs border-t border-kiji pt-3">
                  <div>
                    <span className="text-sumi/40 block mb-0.5">希望日時</span>
                    <span className="text-sumi">
                      {[booking.desiredDate1, booking.desiredDate2, booking.desiredDate3].filter(Boolean).join(" / ") || "未定"}
                    </span>
                  </div>
                  <div>
                    <span className="text-sumi/40 block mb-0.5">畳の枚数</span>
                    <span className="text-sumi">{booking.tatamiFlex ? `${booking.tatamiFlex}畳` : "未定"}</span>
                  </div>
                  <div>
                    <span className="text-sumi/40 block mb-0.5">建物種別</span>
                    <span className="text-sumi">{booking.buildingType}</span>
                  </div>
                  <div>
                    <span className="text-sumi/40 block mb-0.5">申込日</span>
                    <span className="text-sumi">{formatDate(booking.createdAt)}</span>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Link href={`/providers/${booking.providerId}`} className="text-xs text-ai border border-ai px-3 py-1.5 hover:bg-ai hover:text-white transition-all duration-300">
                    業者詳細を見る
                  </Link>
                  {booking.status === "completed" && (
                    <Link href="/mypage/reviews/new" className="text-xs text-kincya border border-kincya px-3 py-1.5 hover:bg-kincya hover:text-white transition-all duration-300">
                      口コミを投稿する
                    </Link>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
