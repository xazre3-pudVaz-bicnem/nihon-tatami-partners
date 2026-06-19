"use client";

import { use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import ReviewCard from "@/components/common/ReviewCard";
import WorkCaseCard from "@/components/common/WorkCaseCard";
import BookingForm from "@/components/common/BookingForm";
import QuoteForm from "@/components/common/QuoteForm";
import ServiceListingCard from "@/components/common/ServiceListingCard";
import { getProviderById, MOCK_PROVIDERS } from "@/data/providers";
import { getReviewsByProviderId } from "@/data/reviews";
import { getWorkCasesByCategory } from "@/data/workcases";
import { getServicesByProviderId } from "@/data/provider-services";
import { formatRating } from "@/lib/utils";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ tab?: string }>;
}

type Tab = "about" | "services" | "reviews" | "works" | "booking" | "quote";

export default function ProviderDetailPage({ params, searchParams }: Props) {
  const { id } = use(params);
  const { tab: initialTab } = use(searchParams);

  const provider = getProviderById(id);
  if (!provider) notFound();

  const reviews = getReviewsByProviderId(id);
  const workCases = getWorkCasesByCategory(id);
  const services = getServicesByProviderId(id);
  const name = provider.tradeName || provider.companyName;
  const stars = Array.from({ length: 5 }, (_, i) => i < Math.round(provider.averageRating));

  const [activeTab, setActiveTab] = useState<Tab>((initialTab as Tab) || "about");
  const [favored, setFavored] = useState(false);

  // スコアの集計
  const avgBreakdown = reviews.reduce(
    (acc, r) => {
      if (r.ratingBreakdown) {
        acc.quality += r.ratingBreakdown.quality;
        acc.price += r.ratingBreakdown.price;
        acc.speed += r.ratingBreakdown.speed;
        acc.communication += r.ratingBreakdown.communication;
        acc.count++;
      }
      return acc;
    },
    { quality: 0, price: 0, speed: 0, communication: 0, count: 0 }
  );
  const hasBreakdown = avgBreakdown.count > 0;

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
  };

  const TABS: { key: Tab; label: string; count?: number }[] = [
    { key: "about", label: "業者情報" },
    { key: "services", label: "提供サービス", count: services.length },
    { key: "reviews", label: "口コミ", count: reviews.length },
    { key: "works", label: "施工事例", count: workCases.length },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(providerJsonLd) }} />

      <div className="min-h-screen bg-shiro">
        {/* パンくず */}
        <div className="bg-white border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
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
              <div className="w-full md:w-44 h-44 bg-kiji shrink-0 overflow-hidden">
                <div className="w-full h-full tatami-pattern flex items-center justify-center">
                  <span className="text-4xl" style={{ fontFamily: "var(--font-serif)" }}>
                    {name.charAt(0)}
                  </span>
                </div>
              </div>

              {/* 基本情報 */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-sumi/50">{provider.prefecture} {provider.city}</span>
                      {provider.plan === "premium" && (
                        <span className="text-xs px-2 py-0.5 bg-kincya/10 border border-kincya/30 text-kincya">おすすめ</span>
                      )}
                    </div>
                    <h1 className="text-2xl md:text-3xl text-sumi mb-1" style={{ fontFamily: "var(--font-serif)" }}>
                      {name}
                    </h1>
                    {provider.companyName !== provider.tradeName && (
                      <p className="text-xs text-sumi/50 mb-2">{provider.companyName}</p>
                    )}
                  </div>
                  <button
                    onClick={() => setFavored(!favored)}
                    className={`transition-colors shrink-0 ${favored ? "text-do" : "text-sumi/30 hover:text-do"}`}
                    aria-label={favored ? "お気に入りを解除" : "お気に入りに追加"}
                  >
                    <svg className="w-7 h-7" fill={favored ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>

                <p className="text-sm text-sumi/70 mb-3">{provider.catchCopy}</p>

                {/* 評価 */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex">
                    {stars.map((f, i) => (
                      <span key={i} className={`text-xl ${f ? "text-kincya" : "text-border"}`}>★</span>
                    ))}
                  </div>
                  <span className="text-2xl font-medium text-sumi">{formatRating(provider.averageRating)}</span>
                  <button
                    onClick={() => setActiveTab("reviews")}
                    className="text-sm text-ai hover:underline"
                  >
                    口コミ {provider.reviewCount}件
                  </button>
                  <span className="text-sumi/30">|</span>
                  <span className="text-sm text-sumi/50">施工実績 {provider.completedCount}件</span>
                </div>

                {/* バッジ */}
                <div className="flex flex-wrap gap-2 mb-3">
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
                  {provider.hasEstimateFree && (
                    <span className="text-xs px-3 py-1 border border-igusa/30 text-igusa bg-igusa/5">見積無料</span>
                  )}
                  {provider.canOnlineConsult && (
                    <span className="text-xs px-3 py-1 border border-sumi/20 text-sumi/60 bg-cloud">オンライン相談可</span>
                  )}
                </div>

                {/* 対応エリア */}
                <p className="text-xs text-sumi/50">
                  対応エリア：<span className="text-sumi/70">{provider.serviceAreas.join("・")}</span>
                </p>
              </div>
            </div>

            {/* タブ */}
            <div className="mt-6 flex gap-0 border-b border-border -mb-px overflow-x-auto">
              {TABS.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-1.5 px-5 py-3 text-sm whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === tab.key
                      ? "border-kincya text-kincya"
                      : "border-transparent text-sumi/60 hover:text-sumi"
                  }`}
                >
                  {tab.label}
                  {tab.count !== undefined && tab.count > 0 && (
                    <span className={`text-xs ${activeTab === tab.key ? "text-kincya/70" : "text-sumi/40"}`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* メインコンテンツ */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">

            {/* 左カラム（タブコンテンツ） */}
            <div className="flex-1 min-w-0">

              {/* ── 業者情報タブ ── */}
              {activeTab === "about" && (
                <div className="space-y-6">
                  {/* 自己紹介 */}
                  <section className="bg-white border border-border p-6">
                    <h2 className="text-lg text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>業者紹介</h2>
                    <p className="text-sm text-sumi/70 leading-relaxed mb-4">{provider.introduction}</p>
                    {provider.strengths && (
                      <div>
                        <h3 className="text-sm text-sumi mb-2 font-medium">強み・特徴</h3>
                        <ul className="space-y-1.5">
                          {provider.strengths.map((s) => (
                            <li key={s} className="text-sm text-sumi/70 flex items-start gap-2">
                              <span className="text-kincya mt-0.5 shrink-0">—</span>{s}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </section>

                  {/* 評価内訳 */}
                  {hasBreakdown && (
                    <section className="bg-white border border-border p-6">
                      <h2 className="text-lg text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>評価内訳</h2>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {[
                          { label: "仕上がり品質", value: avgBreakdown.quality / avgBreakdown.count },
                          { label: "料金の妥当性", value: avgBreakdown.price / avgBreakdown.count },
                          { label: "対応の速さ", value: avgBreakdown.speed / avgBreakdown.count },
                          { label: "コミュニケーション", value: avgBreakdown.communication / avgBreakdown.count },
                        ].map((item) => (
                          <div key={item.label} className="text-center">
                            <p className="text-xs text-sumi/50 mb-1">{item.label}</p>
                            <p className="text-2xl font-medium text-sumi mb-1">{item.value.toFixed(1)}</p>
                            <div className="w-full bg-kiji h-1.5">
                              <div className="bg-kincya h-1.5" style={{ width: `${(item.value / 5) * 100}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

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
                          { label: "平均応答時間", value: provider.responseTimeHours ? `${provider.responseTimeHours}時間以内` : "—" },
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

                  {/* 対応内容チェック */}
                  <section className="bg-white border border-border p-6">
                    <h2 className="text-lg text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>対応可能な依頼</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {[
                        { label: "個人（一般住宅）", ok: true },
                        { label: "法人・企業", ok: provider.acceptsCorporate },
                        { label: "不動産会社", ok: provider.acceptsRealEstate },
                        { label: "管理会社", ok: provider.acceptsRealEstate },
                        { label: "旅館・宿泊施設", ok: provider.acceptsRyokan },
                        { label: "寺院・神社", ok: provider.acceptsTempleShrine },
                        { label: "即日対応", ok: provider.canSameDayResponse },
                        { label: "土日対応", ok: provider.canWeekendResponse },
                        { label: "夜間相談", ok: provider.canNightConsultation },
                        { label: "家具移動", ok: provider.hasFurnitureMove },
                        { label: "駐車場代込み", ok: provider.parkingFree },
                        { label: "カード決済", ok: provider.acceptsCard },
                        { label: "オンライン相談", ok: provider.canOnlineConsult },
                        { label: "無料見積もり", ok: provider.hasEstimateFree },
                      ].map((item) => (
                        <div key={item.label} className={`flex items-center gap-2 text-xs py-2 border-b border-kiji/50 ${item.ok ? "text-sumi" : "text-sumi/30"}`}>
                          <span className={`text-base ${item.ok ? "text-igusa" : "text-border"}`}>
                            {item.ok ? "●" : "○"}
                          </span>
                          {item.label}
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              )}

              {/* ── 提供サービスタブ ── */}
              {activeTab === "services" && (
                <div className="space-y-5">
                  {services.length === 0 ? (
                    <div className="bg-white border border-border p-8 text-center">
                      <p className="text-sm text-sumi/50">現在サービスが登録されていません</p>
                      <p className="text-xs text-sumi/40 mt-2">業者に直接お問い合わせください</p>
                    </div>
                  ) : (
                    services.map((svc) => (
                      <ServiceListingCard
                        key={svc.id}
                        service={svc}
                        providerName={name}
                        providerId={provider.id}
                      />
                    ))
                  )}
                </div>
              )}

              {/* ── 口コミタブ ── */}
              {activeTab === "reviews" && (
                <div className="space-y-4">
                  {/* 評価サマリー */}
                  {reviews.length > 0 && (
                    <div className="bg-white border border-border p-5">
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <p className="text-5xl font-medium text-sumi" style={{ fontFamily: "var(--font-serif)" }}>
                            {formatRating(provider.averageRating)}
                          </p>
                          <div className="flex justify-center my-1">
                            {stars.map((f, i) => (
                              <span key={i} className={`text-xl ${f ? "text-kincya" : "text-border"}`}>★</span>
                            ))}
                          </div>
                          <p className="text-xs text-sumi/50">{reviews.length}件の口コミ</p>
                        </div>
                        <div className="flex-1">
                          {[5, 4, 3, 2, 1].map((star) => {
                            const count = reviews.filter((r) => Math.round(r.rating) === star).length;
                            const pct = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                            return (
                              <div key={star} className="flex items-center gap-2 mb-1">
                                <span className="text-xs text-sumi/50 w-4">{star}</span>
                                <span className="text-kincya text-xs">★</span>
                                <div className="flex-1 bg-kiji h-2">
                                  <div className="bg-kincya h-2" style={{ width: `${pct}%` }} />
                                </div>
                                <span className="text-xs text-sumi/40 w-6">{count}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  {reviews.length === 0 ? (
                    <div className="bg-white border border-border p-8 text-center">
                      <p className="text-sm text-sumi/50">まだ口コミがありません</p>
                    </div>
                  ) : (
                    reviews.map((r) => (
                      <ReviewCard key={r.id} review={r} showProviderReply />
                    ))
                  )}
                </div>
              )}

              {/* ── 施工事例タブ ── */}
              {activeTab === "works" && (
                <div>
                  {workCases.length === 0 ? (
                    <div className="bg-white border border-border p-8 text-center">
                      <p className="text-sm text-sumi/50">施工事例は準備中です</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {workCases.map((wc) => (
                        <WorkCaseCard key={wc.id} workCase={wc} />
                      ))}
                    </div>
                  )}
                </div>
              )}

            </div>

            {/* 右サイドバー */}
            <div className="w-full lg:w-80 shrink-0">
              <div className="sticky top-24 space-y-4">
                {/* 一括見積もりへの誘導 */}
                <div className="bg-cloud border border-border p-4 text-center">
                  <p className="text-xs text-sumi/60 mb-2">複数業者から見積もりを取りたい方</p>
                  <Link
                    href="/quote/new"
                    className="block w-full border border-sumi/30 text-sumi text-sm py-2.5 hover:bg-sumi hover:text-white transition-all duration-300 tracking-wide"
                  >
                    一括見積もりを依頼する
                  </Link>
                </div>

                <BookingForm providerId={provider.id} />
                <QuoteForm providerId={provider.id} />

                {/* 電話・直接連絡 */}
                <div className="bg-white border border-border p-4">
                  <p className="text-xs text-sumi/50 mb-3">直接連絡する</p>
                  <a href={`tel:${provider.phone}`} className="flex items-center gap-2 text-sm text-sumi hover:text-ai transition-colors mb-1">
                    <span className="text-ai">TEL</span> {provider.phone}
                  </a>
                  <p className="text-xs text-sumi/40">{provider.businessHours}</p>
                </div>

                {/* 保証バナー */}
                <Link href="/guarantee" className="block bg-igusa/5 border border-igusa/20 p-4 hover:bg-igusa/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <svg className="w-8 h-8 text-igusa shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <div>
                      <p className="text-xs font-medium text-igusa">損害賠償補償制度</p>
                      <p className="text-xs text-sumi/60 mt-0.5">当サービスのネット予約なら最大10万円の補償あり</p>
                    </div>
                  </div>
                </Link>

                {/* 比較に追加 */}
                <Link
                  href={`/compare?ids=${provider.id}`}
                  className="block w-full text-center border border-border text-sumi/60 text-xs py-2.5 hover:border-ai hover:text-ai transition-all duration-300"
                >
                  ＋ この業者を比較リストに追加
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
