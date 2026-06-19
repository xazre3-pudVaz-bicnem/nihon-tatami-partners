import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import StatusBadge from "@/components/common/StatusBadge";
import { MOCK_BOOKINGS } from "@/data/bookings";
import { getProviderById } from "@/data/providers";
import { getCategoryConfigBySlug } from "@/config/categories";
import { formatDate, formatPrice } from "@/lib/utils";

interface Props {
  params: Promise<{ bookingId: string }>;
}

const BUILDING_LABELS: Record<string, string> = {
  house: "一戸建て",
  apartment: "マンション・アパート",
  rental: "賃貸物件",
  office: "事務所",
  store: "店舗",
  ryokan: "旅館・宿泊施設",
  temple: "寺院・神社",
  other: "その他",
};

const CLIENT_LABELS: Record<string, string> = {
  individual: "個人",
  corporate: "法人",
  realestate: "不動産会社",
  management: "管理会社",
  ryokan: "旅館・施設",
  temple: "寺院・神社",
  other: "その他",
};

export async function generateStaticParams() {
  return MOCK_BOOKINGS.map((b) => ({ bookingId: b.id }));
}

export const metadata: Metadata = {
  title: "予約詳細 | 日本畳パートナーズ",
  robots: "noindex,nofollow",
};

export default async function BookingDetailPage({ params }: Props) {
  const { bookingId } = await params;
  const booking = MOCK_BOOKINGS.find((b) => b.id === bookingId);
  if (!booking) notFound();

  const provider = getProviderById(booking.providerId);
  const cat = getCategoryConfigBySlug(booking.serviceCategory);

  const Row = ({ label, value }: { label: string; value?: React.ReactNode }) =>
    value ? (
      <div className="flex justify-between gap-4 py-3 border-b border-border/60 last:border-0">
        <span className="text-xs text-sumi/50 shrink-0">{label}</span>
        <span className="text-sm text-sumi text-right">{value}</span>
      </div>
    ) : null;

  return (
    <div className="min-h-screen bg-shiro">
      <div className="bg-sumi border-b border-white/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
          <Breadcrumbs
            variant="dark"
            items={[
              { label: "トップ", href: "/" },
              { label: "予約一覧", href: "/mypage/bookings" },
              { label: "予約詳細" },
            ]}
          />
        </div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-6 pt-2 flex items-center justify-between gap-3">
          <h1 className="text-xl md:text-2xl text-white" style={{ fontFamily: "var(--font-serif)" }}>
            予約詳細
          </h1>
          <StatusBadge status={booking.status} />
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-5">
        {/* 業者情報 */}
        {provider && (
          <div className="bg-white border border-border p-5 flex items-center gap-4">
            <div className="w-14 h-14 bg-kiji shrink-0 tatami-pattern" />
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

        {/* 予約内容 */}
        <div className="bg-white border border-border p-5">
          <h2 className="text-base text-sumi mb-2" style={{ fontFamily: "var(--font-serif)" }}>
            予約内容
          </h2>
          <Row label="予約番号" value={booking.id} />
          <Row label="サービス" value={cat?.name ?? booking.serviceCategory} />
          <Row label="現場住所" value={booking.address} />
          <Row label="建物種別" value={BUILDING_LABELS[booking.buildingType] ?? booking.buildingType} />
          {booking.tatamiFlex && <Row label="畳数" value={`${booking.tatamiFlex}畳`} />}
          {booking.roomCount && <Row label="部屋数" value={`${booking.roomCount}部屋`} />}
          <Row label="依頼者種別" value={CLIENT_LABELS[booking.clientType] ?? booking.clientType} />
          {booking.needFurnitureMove !== undefined && <Row label="家具移動" value={booking.needFurnitureMove ? "希望する" : "不要"} />}
          {booking.hasParking !== undefined && <Row label="駐車場" value={booking.hasParking ? "あり" : "なし"} />}
          {booking.notes && <Row label="備考" value={booking.notes} />}
        </div>

        {/* 日程・費用 */}
        <div className="bg-white border border-border p-5">
          <h2 className="text-base text-sumi mb-2" style={{ fontFamily: "var(--font-serif)" }}>
            日程・費用
          </h2>
          {booking.confirmedDate && <Row label="確定日" value={formatDate(booking.confirmedDate)} />}
          {booking.desiredDate1 && <Row label="第1希望" value={formatDate(booking.desiredDate1)} />}
          {booking.desiredDate2 && <Row label="第2希望" value={formatDate(booking.desiredDate2)} />}
          {booking.desiredDate3 && <Row label="第3希望" value={formatDate(booking.desiredDate3)} />}
          {booking.estimatedPrice && <Row label="概算金額" value={`¥${formatPrice(booking.estimatedPrice)}`} />}
          <Row label="申込日" value={formatDate(booking.createdAt)} />
        </div>

        {/* アクション */}
        <div className="flex flex-wrap gap-3">
          {provider && (
            <Link href={`/mypage/messages`} className="flex-1 text-center bg-ai text-white py-3 text-sm hover:bg-ai-light transition-colors">
              メッセージを送る
            </Link>
          )}
          {booking.status === "completed" && (
            <Link href="/mypage/reviews/new" className="flex-1 text-center bg-kincya text-white py-3 text-sm hover:bg-do transition-colors">
              口コミを投稿する
            </Link>
          )}
          <Link href="/mypage/bookings" className="flex-1 text-center border border-border text-sumi/60 py-3 text-sm hover:border-sumi/40 transition-colors">
            予約一覧へ戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
