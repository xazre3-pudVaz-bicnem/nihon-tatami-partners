import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import ReviewCard from "@/components/common/ReviewCard";
import WorkCaseCard from "@/components/common/WorkCaseCard";
import BookingForm from "@/components/common/BookingForm";
import QuoteForm from "@/components/common/QuoteForm";
import { getProviderById, MOCK_PROVIDERS } from "@/data/providers";
import { getReviewsByProviderId } from "@/data/reviews";
import { getWorkCasesByCategory } from "@/data/workcases";
import { formatRating } from "@/lib/utils";
import { SITE_URL } from "@/lib/metadata";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return MOCK_PROVIDERS.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const provider = getProviderById(id);
  if (!provider) return {};
  const name = provider.tradeName || provider.companyName;
  return {
    title: `${name} | ${provider.city}の畳・和室工事業者 | 日本畳パートナー`,
    description: provider.catchCopy,
    alternates: { canonical: `${SITE_URL}/providers/${id}` },
  };
}

export default async function ProviderDetailPage({ params }: Props) {
  const { id } = await params;
  const provider = getProviderById(id);
  if (!provider) notFound();

  const reviews = getReviewsByProviderId(id);
  const workCases = getWorkCasesByCategory(id).slice(0, 3);
  const name = provider.tradeName || provider.companyName;
  const stars = Array.from({ length: 5 }, (_, i) => i < Math.round(provider.averageRating));

  const providerJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name,
    description: provider.catchCopy,
    telephone: provider.phone,
    address: {
      "@type": "PostalAddress",
      addressRegion: provider.prefecture,
      addressLocality: provider.city,
      postalCode: provider.postalCode,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: provider.averageRating,
      reviewCount: provider.reviewCount,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "畳・和室工事サービス",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(providerJsonLd) }} />

      <div className="min-h-screen bg-shiro">
        {/* ヘッダーエリア */}
        <div className="bg-white border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumbs items={[
              { label: "トップ", href: "/" },
              { label: "業者を探す", href: "/search" },
              { label: name },
            ]} />
          </div>
        </div>

        {/* 業者ヘッダー */}
        <div className="bg-white border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* サムネイル */}
              <div className="w-full md:w-48 h-48 bg-kiji shrink-0 overflow-hidden">
                <div className="w-full h-full tatami-pattern flex items-center justify-center">
                  <span className="text-xs text-sumi/20">写真</span>
                </div>
              </div>

              {/* 基本情報 */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs text-sumi/50 mb-1">{provider.prefecture} {provider.city}</p>
                    <h1 className="text-2xl md:text-3xl text-sumi mb-1" style={{ fontFamily: "var(--font-serif)" }}>
                      {name}
                    </h1>
                    {provider.companyName !== provider.tradeName && (
                      <p className="text-xs text-sumi/50 mb-2">{provider.companyName}</p>
                    )}
                  </div>
                  <button className="text-sumi/30 hover:text-kincya transition-colors shrink-0" aria-label="お気に入り">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>

                <p className="text-sm text-sumi/70 mb-4">{provider.catchCopy}</p>

                {/* 評価 */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex">
                    {stars.map((f, i) => (
                      <span key={i} className={`text-xl ${f ? "text-kincya" : "text-border"}`}>★</span>
                    ))}
                  </div>
                  <span className="text-2xl font-medium text-sumi">{formatRating(provider.averageRating)}</span>
                  <span className="text-sm text-sumi/50">（口コミ {provider.reviewCount}件 / 施工実績 {provider.completedCount}件）</span>
                </div>

                {/* バッジ */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {provider.badges?.map((badge) => (
                    <span key={badge.id} className={`text-xs px-3 py-1 border ${
                      badge.color === "gold" ? "border-kincya/40 text-kincya bg-kincya/5" :
                      badge.color === "green" ? "border-igusa/40 text-igusa bg-igusa/5" :
                      badge.color === "blue" ? "border-ai/20 text-ai bg-ai/5" :
                      "border-border text-sumi/60"
                    }`}>{badge.label}</span>
                  ))}
                  {provider.canSameDayResponse && (
                    <span className="text-xs px-3 py-1 border border-do/30 text-do bg-do/5">即日対応</span>
                  )}
                </div>

                {/* 対応エリア */}
                <div>
                  <span className="text-xs text-sumi/50">対応エリア：</span>
                  <span className="text-xs text-sumi/70">{provider.serviceAreas.join("・")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* メインコンテンツ */}
            <div className="flex-1 min-w-0 space-y-8">

              {/* 自己紹介 */}
              <section className="bg-white border border-border p-6">
                <h2 className="text-lg text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>業者紹介</h2>
                <p className="text-sm text-sumi/70 leading-relaxed mb-4">{provider.introduction}</p>
                {provider.strengths && (
                  <div>
                    <h3 className="text-sm text-sumi mb-2">強み・特徴</h3>
                    <ul className="space-y-1">
                      {provider.strengths.map((s) => (
                        <li key={s} className="text-sm text-sumi/70 flex items-start gap-2">
                          <span className="text-kincya mt-0.5 shrink-0">—</span>{s}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>

              {/* 基本情報 */}
              <section className="bg-white border border-border p-6">
                <h2 className="text-lg text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>基本情報</h2>
                <table className="w-full text-sm">
                  <tbody>
                    {[
                      { label: "所在地", value: `${provider.prefecture} ${provider.city}${provider.address ? " " + provider.address : ""}` },
                      { label: "創業", value: provider.foundedYear ? `${provider.foundedYear}年（職人歴 ${provider.yearsOfExperience}年）` : "—" },
                      { label: "営業時間", value: provider.businessHours || "—" },
                      { label: "定休日", value: provider.closedDays || "—" },
                      { label: "電話", value: provider.phone },
                      { label: "対応エリア", value: provider.serviceAreas.join("、") },
                    ].map((row) => (
                      <tr key={row.label} className="border-b border-kiji last:border-0">
                        <td className="py-3 pr-4 text-xs text-sumi/50 whitespace-nowrap w-28">{row.label}</td>
                        <td className="py-3 text-sumi/80">{row.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>

              {/* 資格・保険 */}
              <section className="bg-white border border-border p-6">
                <h2 className="text-lg text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>資格・保険・組合加盟</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <h3 className="text-xs text-sumi/50 mb-2">保有資格</h3>
                    {provider.licenses && provider.licenses.length > 0 ? (
                      <ul className="space-y-1">
                        {provider.licenses.map((l) => (
                          <li key={l} className="text-sm text-sumi flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 bg-kincya rounded-full shrink-0" />{l}
                          </li>
                        ))}
                      </ul>
                    ) : <p className="text-xs text-sumi/40">情報なし</p>}
                  </div>
                  <div>
                    <h3 className="text-xs text-sumi/50 mb-2">加盟団体</h3>
                    {provider.associations && provider.associations.length > 0 ? (
                      <ul className="space-y-1">
                        {provider.associations.map((a) => (
                          <li key={a} className="text-sm text-sumi flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 bg-igusa rounded-full shrink-0" />{a}
                          </li>
                        ))}
                      </ul>
                    ) : <p className="text-xs text-sumi/40">なし</p>}
                  </div>
                  <div>
                    <h3 className="text-xs text-sumi/50 mb-2">損害賠償保険</h3>
                    {provider.hasInsurance ? (
                      <p className="text-sm text-igusa">{provider.insuranceDetail || "加入済み"}</p>
                    ) : <p className="text-xs text-sumi/40">未加入</p>}
                  </div>
                </div>
              </section>

              {/* 対応内容 */}
              <section className="bg-white border border-border p-6">
                <h2 className="text-lg text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>対応可能な依頼</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: "個人（一般住宅）", ok: true },
                    { label: "法人・企業", ok: provider.acceptsCorporate },
                    { label: "不動産会社", ok: provider.acceptsRealEstate },
                    { label: "管理会社", ok: provider.acceptsRealEstate },
                    { label: "旅館・宿泊施設", ok: provider.acceptsRyokan },
                    { label: "寺院・神社", ok: provider.acceptsTempleShrine },
                    { label: "即日対応", ok: provider.canSameDayResponse },
                    { label: "土日対応", ok: provider.canWeekendResponse },
                    { label: "家具移動", ok: provider.hasFurnitureMove },
                    { label: "駐車場代込み", ok: provider.parkingFree },
                    { label: "カード決済", ok: provider.acceptsCard },
                    { label: "オンライン相談", ok: provider.canOnlineConsult },
                  ].map((item) => (
                    <div key={item.label} className={`flex items-center gap-2 text-xs ${item.ok ? "text-sumi" : "text-sumi/30"}`}>
                      <span className={`text-base ${item.ok ? "text-igusa" : "text-border"}`}>
                        {item.ok ? "●" : "○"}
                      </span>
                      {item.label}
                    </div>
                  ))}
                </div>
              </section>

              {/* 口コミ */}
              <section>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-lg text-sumi" style={{ fontFamily: "var(--font-serif)" }}>
                    口コミ（{reviews.length}件）
                  </h2>
                </div>
                {reviews.length === 0 ? (
                  <div className="bg-white border border-border p-6 text-center">
                    <p className="text-sm text-sumi/50">まだ口コミがありません</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {reviews.map((r) => (
                      <ReviewCard key={r.id} review={r} showProviderReply />
                    ))}
                  </div>
                )}
              </section>
            </div>

            {/* サイドバー（問い合わせフォーム等） */}
            <div className="w-full lg:w-80 shrink-0">
              <div className="sticky top-6 space-y-4">
                <BookingForm providerId={provider.id} />
                <QuoteForm providerId={provider.id} />

                {/* 電話・LINE */}
                <div className="bg-white border border-border p-4">
                  <p className="text-xs text-sumi/50 mb-3">直接連絡する</p>
                  <a href={`tel:${provider.phone}`} className="flex items-center gap-2 text-sm text-sumi hover:text-ai transition-colors mb-2">
                    <span className="text-ai">TEL</span> {provider.phone}
                  </a>
                  <p className="text-xs text-sumi/40">{provider.businessHours}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
