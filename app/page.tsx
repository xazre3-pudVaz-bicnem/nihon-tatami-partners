import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import SearchBox from "@/components/common/SearchBox";
import ProviderCard from "@/components/common/ProviderCard";
import ReviewCard from "@/components/common/ReviewCard";
import WorkCaseCard from "@/components/common/WorkCaseCard";
import TrustBadges from "@/components/common/TrustBadges";
import FAQSection from "@/components/common/FAQSection";
import CityLinkGrid from "@/components/common/CityLinkGrid";
import PriceCalculator from "@/components/common/PriceCalculator";
import { POPULAR_CATEGORIES, CATEGORY_GROUP_LABELS, SERVICE_CATEGORIES } from "@/data/categories";
import { getTopProviders, getHighRatedProviders, getNewProviders } from "@/data/providers";
import { getRecentReviews } from "@/data/reviews";
import { getFeaturedWorkCases } from "@/data/workcases";
import { SITE_NAME, SITE_URL } from "@/lib/metadata";
import { HERO_IMAGES, RYOKAN_IMAGES, TEMPLE_IMAGES, BUSINESS_IMAGES, STORE_IMAGES, TATAMI_CRAFT_IMAGES, TATAMI_IMAGES, SHOJI_IMAGES, FUSUMA_IMAGES, RENTAL_IMAGES, getCategoryImage } from "@/data/platformImages";

const SITE_DISPLAY_NAME = "日本畳パートナー";

export const metadata: Metadata = {
  title: `埼玉の畳・和室サービスを比較して探せる | ${SITE_DISPLAY_NAME}`,
  description: "埼玉県の畳表替え・新調・和室リフォーム・ふすま・障子張替えなど、畳・和室工事の業者を料金・口コミ・対応エリアで比較できます。不動産会社・旅館・寺社向けの対応業者も掲載。無料で見積依頼できます。",
  keywords: ["埼玉 畳", "埼玉 畳 張替え", "埼玉 畳 表替え", "埼玉 和室リフォーム", "埼玉 ふすま 張替え"],
  openGraph: {
    title: `埼玉の畳・和室サービスを比較して探せる | ${SITE_DISPLAY_NAME}`,
    description: "料金・口コミ・対応エリアで業者を比較。無料で見積相談できます。",
    url: SITE_URL,
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 }],
    locale: "ja_JP",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: SITE_URL },
};

const webSiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_DISPLAY_NAME,
  url: SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/search?query={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_DISPLAY_NAME,
  url: SITE_URL,
  description: "埼玉県の畳・和室サービス専門マーケットプレイス。料金・口コミ・対応エリアで業者を比較できます。",
  areaServed: { "@type": "State", name: "埼玉県" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "日本畳パートナーはどんなサービスですか？",
      acceptedAnswer: { "@type": "Answer", text: "埼玉県内の畳・和室工事業者を料金・口コミ・対応エリアで比較できるプラットフォームです。表替え・新調・和室リフォーム・ふすま・障子張替えなど、畳と和室に関するすべてのサービスを探せます。" },
    },
    {
      "@type": "Question",
      name: "利用料金はかかりますか？",
      acceptedAnswer: { "@type": "Answer", text: "ユーザーの利用は完全無料です。見積依頼・業者への問い合わせ・予約リクエストも費用はかかりません。" },
    },
    {
      "@type": "Question",
      name: "掲載業者はどのように確認されていますか？",
      acceptedAnswer: { "@type": "Answer", text: "掲載申請時に会社情報・連絡先・対応サービスの確認を行っています。資格・保険などの詳細は業者の申告情報として各業者のプロフィールに掲載しており、詳しくは各業者にご確認いただけます。" },
    },
    {
      "@type": "Question",
      name: "不動産会社・管理会社も利用できますか？",
      acceptedAnswer: { "@type": "Answer", text: "もちろんです。法人・不動産会社・管理会社・旅館・寺社など、多様な依頼者に対応した業者を多数掲載しています。絞り込み条件で「法人対応可」「不動産会社対応可」などを選択してください。" },
    },
  ],
};

export default function HomePage() {
  const topProviders = getTopProviders(6);
  const highRatedProviders = getHighRatedProviders(4);
  const newProviders = getNewProviders(4);
  const recentReviews = getRecentReviews(3);
  const featuredCases = getFeaturedWorkCases(6);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <HeroSection />
      <PopularCategoriesSection />
      <TopProvidersSection providers={topProviders} />
      <HowItWorksSection />
      <GuidedFlowSection />
      <TrustSection />
      <HighRatedSection providers={highRatedProviders} />
      <WorkCasesSection cases={featuredCases} />
      <PriceCalculatorSection />
      <RecentReviewsSection reviews={recentReviews} />
      <NewProvidersSection providers={newProviders} />
      <ForBusinessSection />
      <ForProviderSection />
      <FAQSection
        items={[
          { question: "日本畳パートナーはどんなサービスですか？", answer: "埼玉県内の畳・和室工事業者を料金・口コミ・対応エリアで比較できるプラットフォームです。表替え・新調・和室リフォーム・ふすま・障子張替えなど、畳と和室に関するすべてのサービスを探せます。" },
          { question: "利用料金はかかりますか？", answer: "ユーザーの利用は完全無料です。見積依頼・業者への問い合わせ・予約リクエストも費用はかかりません。" },
          { question: "掲載業者はどのように確認されていますか？", answer: "掲載申請時に会社情報・連絡先・対応サービスの確認を行っています。資格・保険などは業者の申告情報として各業者のプロフィールに掲載しており、詳細は各業者にご確認いただけます。" },
          { question: "見積もりはどれくらい早くもらえますか？", answer: "業者によって異なりますが、多くの業者は1〜2営業日以内に返信しています。即日対応可能な業者も掲載しています。" },
          { question: "不動産会社・管理会社も利用できますか？", answer: "もちろんです。法人・不動産会社・管理会社・旅館・寺社など、多様な依頼者に対応した業者を多数掲載しています。" },
          { question: "業者の口コミは信頼できますか？", answer: "口コミは実際の利用者が投稿しており、管理者による確認を経て掲載しています。不適切な口コミは報告機能で申告できます。" },
        ]}
        title="よくある質問"
        subtitle="ご利用前によく寄せられるご質問にお答えします"
      />
      <SeoTextSection />
      <CityLinkGrid title="市区町村から畳業者を探す" />
    </>
  );
}

function HeroSection() {
  const heroImg = HERO_IMAGES[0];
  return (
    <section className="relative bg-sumi min-h-[580px] flex items-center overflow-hidden">
      {/* 背景画像 */}
      <div className="absolute inset-0">
        <Image
          src={heroImg.src}
          alt={heroImg.alt}
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-sumi via-sumi/90 to-sumi/50 z-10" />
        <div className="absolute inset-0 tatami-pattern opacity-5 z-10" />
      </div>

      {/* 縦書き装飾 */}
      <div className="absolute right-8 lg:right-16 top-1/2 -translate-y-1/2 z-20 hidden md:block">
        <div className="writing-vertical text-white/4 text-9xl lg:text-[10rem] tracking-widest select-none" style={{ fontFamily: "var(--font-serif)" }}>
          畳
        </div>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="max-w-4xl">
          {/* ラベル */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-10 bg-kincya" />
            <span className="text-xs tracking-widest text-kincya uppercase">埼玉県 畳・和室サービス専門</span>
          </div>

          {/* キャッチコピー */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl text-white leading-tight mb-4" style={{ fontFamily: "var(--font-serif)" }}>
            埼玉の畳・和室工事を<br />
            <span className="text-kincya">料金・口コミで比較</span>して探す
          </h1>
          <p className="text-sm md:text-base text-white/60 mb-8 leading-relaxed max-w-xl">
            表替え・新調・和室リフォーム・ふすま・障子まで。埼玉県内の畳専門業者を一覧で比較。個人から不動産会社・旅館・寺社まで対応。
          </p>

          {/* 検索ボックス */}
          <SearchBox variant="hero" />

          {/* クイックリンク */}
          <div className="mt-5 flex flex-wrap gap-2">
            {[
              { label: "畳表替え", href: "/saitama/tatami/omotegae" },
              { label: "畳新調", href: "/saitama/tatami/shinchou" },
              { label: "琉球畳", href: "/saitama/tatami/ryukyu" },
              { label: "ふすま張替え", href: "/saitama/fusuma/harikae" },
              { label: "和室リフォーム", href: "/saitama/washitsu/reform" },
              { label: "原状回復", href: "/saitama/rental-restoration/tatami" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-white/50 border border-white/15 hover:border-white/40 hover:text-white px-3 py-1.5 transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* スクロールインジケーター */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs tracking-widest text-white/20">SCROLL</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent" />
        </div>
      </div>
    </section>
  );
}

function PopularCategoriesSection() {
  const groups = [
    { key: "tatami", label: "畳工事" },
    { key: "washitsu", label: "和室工事" },
    { key: "restoration", label: "内装・原状回復" },
  ] as const;

  return (
    <section className="section-py bg-shiro">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="h-px w-8 bg-kincya" />
            <span className="text-xs tracking-widest text-kincya uppercase">Service Categories</span>
            <div className="h-px w-8 bg-kincya" />
          </div>
          <h2 className="text-2xl md:text-3xl text-sumi" style={{ fontFamily: "var(--font-serif)" }}>
            カテゴリから探す
          </h2>
        </div>

        {groups.map((group) => (
          <div key={group.key} className="mb-10 last:mb-0">
            <div className="flex items-center gap-4 mb-5">
              <h3 className="text-lg text-sumi" style={{ fontFamily: "var(--font-serif)" }}>{group.label}</h3>
              <div className="flex-1 h-px bg-border" />
              <Link href={`/categories?group=${group.key}`} className="text-xs text-ai hover:text-kincya transition-colors">
                すべて見る →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {SERVICE_CATEGORIES.filter((c) => c.group === group.key).slice(0, 10).map((cat) => {
                const catImg = getCategoryImage(cat.slug);
                return (
                  <Link
                    key={cat.slug}
                    href={cat.href}
                    className="group border border-border bg-white hover:border-kincya/40 hover:shadow-sm transition-all duration-300 overflow-hidden"
                  >
                    <div className="relative h-20 sm:h-24 bg-kiji overflow-hidden">
                      {catImg ? (
                        <Image src={catImg.src} alt={catImg.alt} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="200px" />
                      ) : (
                        <div className="absolute inset-0 tatami-pattern" />
                      )}
                    </div>
                    <div className="p-3 text-center">
                      <p className="text-xs text-sumi group-hover:text-ai transition-colors" style={{ fontFamily: "var(--font-serif)" }}>
                        {cat.name}
                      </p>
                      {cat.priceFrom && (
                        <p className="text-xs text-sumi/40 mt-0.5">
                          {cat.priceFrom.toLocaleString()}円〜/{cat.unit}
                        </p>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function TopProvidersSection({ providers }: { providers: ReturnType<typeof getTopProviders> }) {
  return (
    <section className="section-py bg-kiji/30 tatami-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-8 bg-kincya" />
              <span className="text-xs tracking-widest text-kincya uppercase">Recommended</span>
            </div>
            <h2 className="text-2xl md:text-3xl text-sumi" style={{ fontFamily: "var(--font-serif)" }}>
              おすすめの業者
            </h2>
            <p className="text-xs text-sumi/60 mt-1">実績・評価・対応力で選ばれた業者</p>
          </div>
          <Link href="/search" className="text-sm text-ai hover:text-kincya transition-colors hidden sm:block">
            すべての業者を見る →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {providers.map((p) => (
            <ProviderCard key={p.id} provider={p} showFavorite />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/search" className="inline-flex items-center gap-2 border border-ai text-ai hover:bg-ai hover:text-white transition-all duration-300 px-8 py-3 text-sm tracking-wider">
            すべての業者を比較する
          </Link>
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    { num: "01", title: "サービスとエリアを選ぶ", description: "畳表替え・ふすま張替えなどサービスカテゴリと、埼玉県内の市区町村を選択します。" },
    { num: "02", title: "業者を比較する", description: "料金・口コミ評価・対応エリア・資格・対応可能日などを一覧で比較。絞り込み条件で絞ることもできます。" },
    { num: "03", title: "見積・予約を依頼", description: "気になった業者に無料で見積相談や予約リクエストを送れます。費用は一切かかりません。" },
    { num: "04", title: "工事完了・口コミ投稿", description: "工事完了後、口コミを投稿して次の方の参考にしてください。口コミで埼玉の畳文化を支えます。" },
  ];

  return (
    <section className="section-py bg-ai">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="h-px w-8 bg-kincya" />
            <span className="text-xs tracking-widest text-kincya uppercase">How It Works</span>
            <div className="h-px w-8 bg-kincya" />
          </div>
          <h2 className="text-2xl md:text-3xl text-white" style={{ fontFamily: "var(--font-serif)" }}>
            ご利用の流れ
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div key={step.num} className="relative">
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-6 left-full w-6 h-px bg-white/20 -translate-y-1/2 z-10" />
              )}
              <div className="border border-white/10 bg-white/5 p-5">
                <div className="text-3xl text-kincya/30 mb-3" style={{ fontFamily: "var(--font-serif)" }}>{step.num}</div>
                <h3 className="text-sm text-white mb-2" style={{ fontFamily: "var(--font-serif)" }}>{step.title}</h3>
                <p className="text-xs text-white/50 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GuidedFlowSection() {
  const flows = [
    {
      icon: "📋",
      title: "かんたん依頼診断",
      description: "どんな工事が必要か分からない方へ。質問に答えるだけで必要なサービスと料金目安が分かります。",
      cta: "診断を始める（無料）",
      href: "/request/start",
      accent: "bg-kincya",
    },
    {
      icon: "🤝",
      title: "おまかせマッチング",
      description: "条件を入力するだけで、合いそうな業者を提案します。自分で探す手間を省きたい方に。",
      cta: "マッチングを試す",
      href: "/matching",
      accent: "bg-ai",
    },
    {
      icon: "📷",
      title: "写真で見積もり相談",
      description: "畳の写真を送って、業者に概算を相談できます。金額感を知りたいときに。",
      cta: "写真を送る",
      href: "/photo-estimate",
      accent: "bg-sumi",
    },
    {
      icon: "👥",
      title: "相談コンシェルジュ",
      description: "どこに頼んでいいか迷う方、法人・複数物件の相談も受け付けています。",
      cta: "相談してみる",
      href: "/concierge",
      accent: "bg-igusa",
    },
  ];

  return (
    <section className="section-py bg-kiji/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="h-px w-8 bg-kincya" />
            <span className="text-xs tracking-widest text-kincya uppercase">Guided Services</span>
            <div className="h-px w-8 bg-kincya" />
          </div>
          <h2 className="text-2xl md:text-3xl text-sumi" style={{ fontFamily: "var(--font-serif)" }}>
            探さずに頼める4つの方法
          </h2>
          <p className="text-sm text-sumi/50 mt-2">自分で業者を選ぶのが大変な方向けのサポートです</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {flows.map((f) => (
            <div key={f.href} className="bg-white border border-border flex flex-col">
              <div className={`${f.accent} h-1`} />
              <div className="p-5 flex flex-col flex-1">
                <div className="text-2xl mb-3">{f.icon}</div>
                <h3 className="text-sm text-sumi mb-2" style={{ fontFamily: "var(--font-serif)" }}>{f.title}</h3>
                <p className="text-xs text-sumi/60 leading-relaxed flex-1 mb-4">{f.description}</p>
                <Link
                  href={f.href}
                  className={`block text-center text-xs py-2.5 px-4 text-white ${f.accent} hover:opacity-90 transition-opacity`}
                >
                  {f.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrustSection() {
  return (
    <section className="py-12 bg-shiro border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TrustBadges />
      </div>
    </section>
  );
}

function HighRatedSection({ providers }: { providers: ReturnType<typeof getHighRatedProviders> }) {
  return (
    <section className="section-py bg-cloud">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-8 bg-kincya" />
              <span className="text-xs tracking-widest text-kincya uppercase">Top Rated</span>
            </div>
            <h2 className="text-2xl md:text-3xl text-sumi" style={{ fontFamily: "var(--font-serif)" }}>
              口コミ評価が高い業者
            </h2>
          </div>
          <Link href="/search?sortBy=rating" className="text-sm text-ai hover:text-kincya transition-colors hidden sm:block">
            評価順で見る →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {providers.map((p) => (
            <ProviderCard key={p.id} provider={p} variant="compact" />
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkCasesSection({ cases }: { cases: ReturnType<typeof getFeaturedWorkCases> }) {
  return (
    <section className="section-py bg-shiro">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-8 bg-kincya" />
              <span className="text-xs tracking-widest text-kincya uppercase">Work Cases</span>
            </div>
            <h2 className="text-2xl md:text-3xl text-sumi" style={{ fontFamily: "var(--font-serif)" }}>
              施工事例
            </h2>
            <p className="text-xs text-sumi/60 mt-1">埼玉県内の実際の施工写真と事例</p>
          </div>
          <Link href="/works" className="text-sm text-ai hover:text-kincya transition-colors hidden sm:block">
            すべての事例 →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cases.map((wc) => (
            <WorkCaseCard key={wc.id} workCase={wc} />
          ))}
        </div>
      </div>
    </section>
  );
}

function RecentReviewsSection({ reviews }: { reviews: ReturnType<typeof getRecentReviews> }) {
  return (
    <section className="section-py bg-kiji/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="h-px w-8 bg-kincya" />
            <span className="text-xs tracking-widest text-kincya uppercase">Reviews</span>
            <div className="h-px w-8 bg-kincya" />
          </div>
          <h2 className="text-2xl md:text-3xl text-sumi" style={{ fontFamily: "var(--font-serif)" }}>
            最新の口コミ
          </h2>
          <p className="text-xs text-sumi/60 mt-1">掲載イメージの口コミ例 — 本番公開時は実際の利用者口コミに差し替えます</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {reviews.map((r) => (
            <ReviewCard key={r.id} review={r} showProviderReply={false} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/search" className="inline-flex items-center gap-2 border border-sumi/20 text-sumi hover:border-ai hover:text-ai transition-all duration-300 px-6 py-3 text-sm tracking-wider">
            口コミを詳しく見る
          </Link>
        </div>
      </div>
    </section>
  );
}

function NewProvidersSection({ providers }: { providers: ReturnType<typeof getNewProviders> }) {
  return (
    <section className="section-py bg-shiro">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-8 bg-kincya" />
              <span className="text-xs tracking-widest text-kincya uppercase">New Providers</span>
            </div>
            <h2 className="text-2xl md:text-3xl text-sumi" style={{ fontFamily: "var(--font-serif)" }}>
              新着掲載業者
            </h2>
          </div>
          <Link href="/search?sortBy=newest" className="text-sm text-ai hover:text-kincya transition-colors hidden sm:block">
            新着順で見る →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {providers.map((p) => (
            <ProviderCard key={p.id} provider={p} variant="compact" />
          ))}
        </div>
      </div>
    </section>
  );
}

function ForBusinessSection() {
  const targets = [
    {
      title: "不動産会社・管理会社向け",
      description: "複数物件・退去後の原状回復を迅速対応できる業者を掲載。継続取引・法人請求書払い対応業者も多数。",
      href: "/search?acceptsRealEstate=true",
      items: ["複数物件一括対応", "退去後の原状回復", "継続取引歓迎", "法人請求対応"],
      image: BUSINESS_IMAGES[0],
    },
    {
      title: "旅館・宿泊施設向け",
      description: "客室畳の一括施工・耐久性素材の選定に対応できる業者。繁忙期前の施工計画もサポート。",
      href: "/search?acceptsRyokan=true",
      items: ["客室一括施工", "耐久性素材の提案", "スケジュール調整", "オフシーズン対応"],
      image: RYOKAN_IMAGES[0],
    },
    {
      title: "寺院・神社向け",
      description: "格式ある空間への対応実績がある業者。法要・祭礼前の施工にも対応しています。",
      href: "/search?acceptsTempleShrine=true",
      items: ["本堂・拝殿対応", "特殊寸法対応", "法要前の施工", "格式ある仕上がり"],
      image: TEMPLE_IMAGES[0],
    },
    {
      title: "法人・企業向け",
      description: "店舗・小上がり・和室の内装工事に対応。複数拠点の施工も一社でまとめて依頼できます。",
      href: "/search?acceptsCorporate=true",
      items: ["店舗・事務所対応", "小上がり工事", "複数拠点対応", "法人請求書払い"],
      image: STORE_IMAGES[0],
    },
  ];

  return (
    <section className="section-py bg-ai">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="h-px w-8 bg-kincya" />
            <span className="text-xs tracking-widest text-kincya uppercase">For Business</span>
            <div className="h-px w-8 bg-kincya" />
          </div>
          <h2 className="text-2xl md:text-3xl text-white" style={{ fontFamily: "var(--font-serif)" }}>
            法人・施設のご担当者様へ
          </h2>
          <p className="text-sm text-white/60 mt-2 max-w-lg mx-auto">業種・用途に合わせた対応業者を絞り込んで探せます。</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {targets.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="group border border-white/10 bg-white/5 hover:bg-white/10 hover:border-kincya/40 transition-all duration-300 overflow-hidden"
            >
              {t.image && (
                <div className="relative h-36 overflow-hidden">
                  <Image src={t.image.src} alt={t.image.alt} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="300px" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ai/80 via-ai/30 to-transparent" />
                </div>
              )}
              <div className="p-5">
                <h3 className="text-sm text-white mb-2 group-hover:text-kincya transition-colors" style={{ fontFamily: "var(--font-serif)" }}>
                  {t.title}
                </h3>
                <p className="text-xs text-white/50 leading-relaxed mb-3">{t.description}</p>
                <ul className="space-y-1">
                  {t.items.map((item) => (
                    <li key={item} className="text-xs text-white/40 flex items-center gap-1.5">
                      <span className="w-1 h-1 bg-kincya/40 rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function ForProviderSection() {
  return (
    <section className="section-py bg-kiji/30 tatami-pattern">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="h-px w-8 bg-kincya" />
          <span className="text-xs tracking-widest text-kincya uppercase">For Providers</span>
          <div className="h-px w-8 bg-kincya" />
        </div>
        <h2 className="text-2xl md:text-3xl text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>
          埼玉の畳・和室業者の方へ
        </h2>
        <p className="text-sm text-sumi/60 leading-relaxed mb-6 max-w-2xl mx-auto">
          日本畳パートナーへの掲載は無料です。サービス・料金・対応エリア・施工事例を掲載し、埼玉県内のユーザーから直接問い合わせを受け取れます。
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { title: "掲載費用 無料", description: "基本的な業者情報の掲載は完全無料。初期費用・月額費用なし。" },
            { title: "申請はかんたん", description: "申請フォーム入力後、内容を確認のうえ掲載開始のご連絡をいたします（1〜3営業日）。" },
            { title: "問い合わせを直接受取", description: "ユーザーからの見積・問い合わせが直接届きます。" },
          ].map((item) => (
            <div key={item.title} className="bg-white border border-border p-4 text-left">
              <h3 className="text-sm text-sumi mb-1" style={{ fontFamily: "var(--font-serif)" }}>{item.title}</h3>
              <p className="text-xs text-sumi/60 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/pro/register" className="inline-flex items-center justify-center px-8 py-3 bg-kincya text-white hover:bg-do transition-colors text-sm tracking-wider">
            無料で出店申請する
          </Link>
          <Link href="/pro" className="inline-flex items-center justify-center px-8 py-3 border border-sumi/30 text-sumi hover:border-ai hover:text-ai transition-all duration-300 text-sm tracking-wider">
            掲載の詳細を見る
          </Link>
        </div>
      </div>
    </section>
  );
}

function PriceCalculatorSection() {
  return (
    <section className="section-py bg-shiro">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-kincya" />
              <span className="text-xs tracking-widest text-kincya uppercase">Price Calculator</span>
            </div>
            <h2 className="text-2xl md:text-3xl text-sumi mb-3" style={{ fontFamily: "var(--font-serif)" }}>
              費用の目安を今すぐ確認
            </h2>
            <p className="text-sm text-sumi/60 leading-relaxed mb-6">
              畳数と素材を選ぶだけで概算費用がわかります。実際の費用は業者に見積もりを依頼してご確認ください。
            </p>
            <div className="space-y-4">
              {[
                { title: "比較して選べる", desc: "料金・評価・対応内容を一覧で比較。納得できる業者を選べます。" },
                { title: "最大5社に一括依頼", desc: "1回の入力で複数業者に同時見積もり。手間をかけずに相見積もりができます。" },
                { title: "無料で使える", desc: "見積もり依頼・問い合わせは完全無料。費用は一切かかりません。" },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-kincya/10 border border-kincya/30 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-kincya text-xs">✓</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-sumi">{item.title}</p>
                    <p className="text-xs text-sumi/60 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full lg:w-[480px] shrink-0">
            <PriceCalculator />
          </div>
        </div>
      </div>
    </section>
  );
}

function SeoTextSection() {
  return (
    <section className="section-py bg-white border-t border-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl text-sumi mb-6" style={{ fontFamily: "var(--font-serif)" }}>
          埼玉県の畳・和室工事なら日本畳パートナー
        </h2>
        <div className="space-y-4 text-sm text-sumi/70 leading-relaxed">
          <p>
            日本畳パートナーは、埼玉県内の畳・和室サービスに特化した業者比較プラットフォームです。さいたま市・川口市・川越市・越谷市・所沢市・草加市・春日部市など埼玉県内の主要市区町村をカバーし、地域密着の畳専門業者を多数掲載しています。
          </p>
          <p>
            畳の表替えは3〜5年に一度が目安です。い草の香りが薄れてきた、表面が毛羽立ってきた、色あせが目立つようになったといったサインが出てきたら、表替えを検討するタイミングです。和紙畳・琉球畳・カラー畳など、ライフスタイルや部屋の雰囲気に合わせた素材も選べます。
          </p>
          <p>
            不動産会社・管理会社の方には、退去後の原状回復を迅速に対応できる業者を多数掲載しています。畳の表替えだけでなく、クロス張替え・フローリング補修・クッションフロア張替えも同時に依頼できる業者を絞り込むことができます。
          </p>
          <p>
            旅館・宿泊施設の担当者様には、客室畳の一括施工に対応できる業者をご紹介しています。耐久性を重視した素材選定から、繁忙期前の計画的な施工まで、プロの視点でご提案します。寺院・神社の本堂・拝殿など格式ある空間への対応実績がある業者も掲載しています。
          </p>
        </div>
        <div className="mt-8 pt-6 border-t border-border">
          <h3 className="text-base text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>
            埼玉県内の畳・和室サービス対応エリア
          </h3>
          <div className="flex flex-wrap gap-2">
            {["さいたま市", "川口市", "川越市", "越谷市", "所沢市", "草加市", "春日部市", "上尾市", "熊谷市", "戸田市", "蕨市", "朝霞市", "志木市", "和光市", "新座市", "富士見市", "ふじみ野市", "三郷市", "八潮市", "久喜市", "狭山市", "入間市", "飯能市", "東松山市", "深谷市", "本庄市", "鴻巣市", "行田市", "加須市", "秩父市"].map((city) => (
              <span key={city} className="text-xs text-sumi/60 border border-border px-2 py-1">
                {city}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
