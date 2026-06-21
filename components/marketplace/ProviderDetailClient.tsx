"use client";

import { useState } from "react";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import ReviewCard from "@/components/common/ReviewCard";
import WorkCaseCard from "@/components/common/WorkCaseCard";
import BookingForm from "@/components/common/BookingForm";
import QuoteForm from "@/components/common/QuoteForm";
import ServiceListingCard from "@/components/common/ServiceListingCard";
import SampleBadge from "@/components/common/SampleBadge";
import { formatRating } from "@/lib/utils";
import type { Provider, Review, WorkCase, ProviderService } from "@/lib/types";

function sanitizeInsurance(detail?: string): string | undefined {
  if (!detail) return detail;
  return detail.replace(/（?(上限|最大)[0-9０-９,，]+万円）?/g, "（申告情報）").trim();
}

const PROVIDER_FAQS = [
  { q: "料金はいつ確定しますか？", a: "現地確認または写真確認のうえ、正式なお見積もりで金額が確定します。見積もり内容にご納得いただいてからのご依頼となります。" },
  { q: "写真だけで見積もれますか？", a: "写真見積もりに対応している業者であれば、概算のお見積もりが可能です。最終金額は現地確認後に確定する場合があります。" },
  { q: "家具の移動は必要ですか？", a: "家具移動に対応している業者もあります。対応可否や追加費用の有無は、見積もり時にご確認ください。" },
  { q: "追加費用はありますか？", a: "家具移動・古畳処分・出張費などで追加費用が発生する場合があります。条件を事前に書面でご確認ください。" },
  { q: "古い畳は処分してもらえますか？", a: "古畳処分に対応している業者であれば回収可能です。処分費用がかかる場合があります。" },
  { q: "法人対応・請求書払いはできますか？", a: "法人対応・インボイス対応の有無は業者により異なります。対応欄をご確認のうえ、見積もり時にご相談ください。" },
  { q: "見積もりは無料ですか？", a: "無料見積もりに対応している業者が多くありますが、出張範囲などにより異なる場合があります。各業者にご確認ください。" },
  { q: "支払い方法は選べますか？", a: "現金・振込・カードなど、対応する支払い方法は業者により異なります。事前にご確認ください。" },
  { q: "保険には加入していますか？", a: "損害賠償保険の加入状況は業者の申告情報として掲載しています。詳細は各業者に直接ご確認ください。" },
  { q: "工事中の立ち会いは必要ですか？", a: "立ち会いの要否は工事内容によります。鍵の受け渡し方法なども含め、業者とご相談ください。" },
];

type Tab = "about" | "services" | "reviews" | "works" | "faq";

interface Props {
  provider: Provider;
  reviews: Review[];
  workCases: WorkCase[];
  services: ProviderService[];
  relatedProviders: Provider[];
}

export default function ProviderDetailClient({ provider, reviews, workCases, services, relatedProviders }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("about");
  const [favored, setFavored] = useState(false);

  const insuranceDisplay = sanitizeInsurance(provider.insuranceDetail);
  const name = provider.tradeName || provider.companyName;
  const stars = Array.from({ length: 5 }, (_, i) => i < Math.round(provider.averageRating));

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

  // isSample 業者には AggregateRating 構造化データを付与しない
  const providerJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name,
    description: provider.catchCopy,
    address: {
      "@type": "PostalAddress",
      addressRegion: provider.prefecture,
      addressLocality: provider.city,
      postalCode: provider.postalCode,
    },
    ...(provider.isSample
      ? {}
      : {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: provider.averageRating,
            reviewCount: provider.reviewCount,
          },
        }),
  };

  const TABS: { key: Tab; label: string; count?: number }[] = [
    { key: "about", label: "業者情報" },
    { key: "services", label: "提供サービス", count: services.length },
    { key: "reviews", label: "口コミ", count: reviews.length },
    { key: "works", label: "施工事例", count: workCases.length },
    { key: "faq", label: "よくある質問" },
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

        {/* 掲載イメージバナー */}
        {provider.isSample && (
          <div className="bg-kiji border-b border-sumi/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
              <p className="text-xs text-sumi/70 flex items-center gap-2">
                <SampleBadge label={provider.isSampleLabel || "掲載イメージ"} />
                このページは掲載イメージです。実際の業者情報は準備中です。表示内容はサンプルのため、実在する業者・連絡先ではありません。
              </p>
            </div>
          </div>
        )}

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
                  <button onClick={() => setActiveTab("reviews")} className="text-sm text-ai hover:underline">
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

                  <section className="bg-white border border-border p-6">
                    <h2 className="text-lg text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>基本情報</h2>
                    <table className="w-full text-sm">
                      <tbody>
                        {[
                          { label: "所在地", value: `${provider.prefecture} ${provider.city}${provider.address ? " " + provider.address : ""}` },
                          { label: "創業", value: provider.foundedYear ? `${provider.foundedYear}年（職人歴 ${provider.yearsOfExperience}年）` : "—" },
                          { label: "営業時間", value: provider.businessHours || "—" },
                          { label: "定休日", value: provider.closedDays || "—" },
                          { label: "連絡方法", value: "お問い合わせフォーム・見積依頼から（電話番号は掲載していません）" },
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
                    <p className="text-xs text-sumi/40 mt-4 leading-relaxed">
                      掲載情報は業者の申告に基づいています。資格・保険の詳細は各業者にご確認ください。
                    </p>
                  </section>

                  <section className="bg-white border border-border p-6">
                    <h2 className="text-lg text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>資格・保険・組合加盟</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <h3 className="text-xs text-sumi/50 mb-2">保有資格（申告情報）</h3>
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
                        <h3 className="text-xs text-sumi/50 mb-2">加盟団体（申告情報）</h3>
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
                        <h3 className="text-xs text-sumi/50 mb-2">損害賠償保険（申告情報）</h3>
                        {provider.hasInsurance ? (
                          <p className="text-sm text-igusa">{insuranceDisplay || "損害賠償保険加入（申告情報）"}</p>
                        ) : <p className="text-xs text-sumi/40">情報なし</p>}
                      </div>
                    </div>
                  </section>

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
                      <ServiceListingCard key={svc.id} service={svc} providerName={name} providerId={provider.id} />
                    ))
                  )}
                </div>
              )}

              {/* ── 口コミタブ ── */}
              {activeTab === "reviews" && (
                <div className="space-y-4">
                  {reviews.length > 0 && (
                    <div className="bg-white border border-border p-5">
                      <p className="text-xs text-sumi/40 mb-3">※ 以下の口コミはサンプル表示です。実際の口コミは業者登録後に順次掲載されます。</p>
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
                          <p className="text-xs text-sumi/50">{reviews.length}件の口コミ（サンプル）</p>
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
                    reviews.map((r) => <ReviewCard key={r.id} review={r} showProviderReply />)
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
                      {workCases.map((wc) => <WorkCaseCard key={wc.id} workCase={wc} />)}
                    </div>
                  )}
                </div>
              )}

              {/* ── よくある質問タブ ── */}
              {activeTab === "faq" && (
                <section className="bg-white border border-border p-6">
                  <h2 className="text-lg text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>よくある質問</h2>
                  <div className="divide-y divide-kiji">
                    {PROVIDER_FAQS.map((faq) => (
                      <details key={faq.q} className="group py-3">
                        <summary className="cursor-pointer text-sm text-sumi font-medium flex items-start gap-2 list-none">
                          <span className="text-kincya shrink-0">Q.</span>
                          <span className="flex-1">{faq.q}</span>
                          <span className="text-sumi/30 group-open:rotate-180 transition-transform shrink-0">▾</span>
                        </summary>
                        <p className="text-sm text-sumi/70 leading-relaxed mt-2 pl-6">{faq.a}</p>
                      </details>
                    ))}
                  </div>
                  <p className="text-xs text-sumi/40 mt-4">
                    ※ 回答は一般的な目安です。実際の対応・費用は業者により異なります。見積もり時にご確認ください。
                  </p>
                </section>
              )}

              {/* 関連業者 */}
              {relatedProviders.length > 0 && (
                <section className="mt-8">
                  <h2 className="text-lg text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>同じエリアの業者</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {relatedProviders.map((rp) => {
                      const rpName = rp.tradeName || rp.companyName;
                      return (
                        <Link key={rp.id} href={`/providers/${rp.id}`}
                          className="block bg-white border border-border p-4 hover:border-ai transition-colors">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm text-sumi font-medium truncate">{rpName}</span>
                            {rp.isSample && <SampleBadge label={rp.isSampleLabel || "掲載イメージ"} />}
                          </div>
                          <p className="text-xs text-sumi/50 mb-2">{rp.city}</p>
                          <div className="flex items-center gap-1 text-xs">
                            <span className="text-kincya">★ {formatRating(rp.averageRating)}</span>
                            <span className="text-sumi/40">（{rp.reviewCount}件）</span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </section>
              )}
            </div>

            {/* 右サイドバー */}
            <div className="w-full lg:w-80 shrink-0">
              <div className="sticky top-24 space-y-4">
                <div className="bg-sumi text-white p-5">
                  <p className="text-xs text-white/60 mb-3">この業者に見積もりを依頼する</p>
                  <Link href={`/quote/new?providerId=${provider.id}`}
                    className="block w-full text-center bg-kincya py-3 text-sm font-medium tracking-wide hover:bg-do transition-colors mb-2">
                    無料見積もりを依頼
                  </Link>
                  <Link href={`/booking/new?providerId=${provider.id}`}
                    className="block w-full text-center border border-white/40 py-3 text-sm tracking-wide hover:border-white transition-colors">
                    予約リクエスト
                  </Link>
                </div>

                <div className="bg-cloud border border-border p-4 text-center">
                  <p className="text-xs text-sumi/60 mb-2">複数業者から見積もりを取りたい方</p>
                  <Link href="/quote/new"
                    className="block w-full border border-sumi/30 text-sumi text-sm py-2.5 hover:bg-sumi hover:text-white transition-all duration-300 tracking-wide">
                    一括見積もりを依頼する
                  </Link>
                </div>

                <BookingForm providerId={provider.id} />
                <QuoteForm providerId={provider.id} />

                <div className="bg-white border border-border p-4">
                  <p className="text-xs text-sumi/50 mb-2">この業者への連絡方法</p>
                  <p className="text-sm text-sumi/80 leading-relaxed">
                    お問い合わせ・ご相談は、上記の見積依頼・予約リクエストフォームからお送りください。電話番号は掲載していません。
                  </p>
                  <p className="text-xs text-sumi/40 mt-2">受付時間：{provider.businessHours || "—"}</p>
                </div>

                <Link href="/guarantee" className="block bg-igusa/5 border border-igusa/20 p-4 hover:bg-igusa/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <svg className="w-8 h-8 text-igusa shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <div>
                      <p className="text-xs font-medium text-igusa">トラブル時のサポート</p>
                      <p className="text-xs text-sumi/60 mt-0.5">お困りごとが発生した際のご相談の流れをご案内します</p>
                    </div>
                  </div>
                </Link>

                <Link href={`/compare?ids=${provider.id}`}
                  className="block w-full text-center border border-border text-sumi/60 text-xs py-2.5 hover:border-ai hover:text-ai transition-all duration-300">
                  ＋ この業者を比較リストに追加
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* スマホ下部固定CTA */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-border px-4 py-3 grid grid-cols-2 gap-2">
          <Link href={`/quote/new?providerId=${provider.id}`}
            className="text-center py-3 bg-kincya text-white text-sm tracking-wide">
            見積依頼
          </Link>
          <Link href={`/booking/new?providerId=${provider.id}`}
            className="text-center py-3 border border-ai text-ai text-sm tracking-wide">
            予約リクエスト
          </Link>
        </div>
        <div className="lg:hidden h-16" aria-hidden />
      </div>
    </>
  );
}
