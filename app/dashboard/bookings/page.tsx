import type { Metadata } from "next";
import Link from "next/link";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatusBadge from "@/components/common/StatusBadge";
import { MOCK_BOOKINGS } from "@/data/bookings";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "予約管理 | ダッシュボード | 日本畳パートナー",
  robots: "noindex,nofollow",
};

const MOCK_PROVIDER_ID = "prov-001";

export default function DashboardBookingsPage() {
  const bookings = MOCK_BOOKINGS.filter((b) => b.providerId === MOCK_PROVIDER_ID);

  return (
    <DashboardLayout currentPath="/dashboard/bookings">
      <div>
        <h1 className="text-xl text-sumi mb-6" style={{ fontFamily: "var(--font-serif)" }}>予約管理</h1>

        <div className="flex gap-1 mb-5 border-b border-kiji">
          {["すべて", "予約確定", "完了", "キャンセル"].map((tab) => (
            <button key={tab} className={`text-xs px-4 py-2 transition-colors ${tab === "すべて" ? "border-b-2 border-ai text-ai" : "text-sumi/50 hover:text-sumi"}`}>
              {tab}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {bookings.length === 0 ? (
            <div className="bg-white border border-border p-12 text-center">
              <p className="text-sm text-sumi/50">まだ予約はありません</p>
            </div>
          ) : (
            bookings.map((booking) => (
              <div key={booking.id} className="bg-white border border-border p-5">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <p className="text-xs text-sumi/40 mb-0.5">予約番号：{booking.id}</p>
                    <p className="text-base text-sumi" style={{ fontFamily: "var(--font-serif)" }}>{booking.serviceCategory}</p>
                    <p className="text-xs text-sumi/60">{booking.address}</p>
                  </div>
                  <StatusBadge status={booking.status} />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs border-t border-kiji pt-3 mb-3">
                  <div><span className="text-sumi/40 block mb-0.5">希望日時</span>{booking.desiredDate1 || "未定"}</div>
                  <div><span className="text-sumi/40 block mb-0.5">畳の枚数</span>{booking.tatamiFlex ? `${booking.tatamiFlex}畳` : "未定"}</div>
                  <div><span className="text-sumi/40 block mb-0.5">建物種別</span>{booking.buildingType}</div>
                  <div><span className="text-sumi/40 block mb-0.5">申込日</span>{formatDate(booking.createdAt)}</div>
                </div>

                <div className="flex gap-2">
                  {booking.status === "pending" && (
                    <>
                      <button className="text-xs bg-igusa text-white px-4 py-1.5 hover:opacity-80 transition-opacity">承認する</button>
                      <button className="text-xs border border-do text-do px-4 py-1.5 hover:bg-do hover:text-white transition-colors">断る</button>
                    </>
                  )}
                  {booking.status === "confirmed" && (
                    <button className="text-xs bg-ai text-white px-4 py-1.5 hover:opacity-80 transition-opacity">完了にする</button>
                  )}
                  <Link href="/dashboard/messages" className="text-xs border border-border text-sumi/70 px-4 py-1.5 hover:border-ai hover:text-ai transition-colors">
                    メッセージを送る
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
