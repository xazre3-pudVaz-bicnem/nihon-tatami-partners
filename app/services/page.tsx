import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/common/PageHeader";
import CTASection from "@/components/common/CTASection";
import FAQSection from "@/components/common/FAQSection";
import ServiceCard from "@/components/common/ServiceCard";
import { createMetadata } from "@/lib/metadata";
import { TATAMI_SERVICES, INTERIOR_SERVICES, RESTORATION_SERVICES } from "@/data/services";
import { FAQ_GENERAL } from "@/data/faq";

export const metadata: Metadata = createMetadata({
  title: "畳工事・内装工事・原状回復サービス一覧",
  description: "畳の表替え・新調・縁なし畳から、クロス張替え・フローリング、賃貸物件の原状回復まで。日本畳パートナーズのサービス一覧ページです。",
  path: "/services",
});

export default function ServicesPage() {
  const faqItems = FAQ_GENERAL.slice(0, 6);

  return (
    <>
      <PageHeader
        title="畳工事・内装工事・原状回復サービス一覧"
        subtitle="住宅・旅館・寺社・賃貸物件・店舗に対応。畳から内装まで一括してお任せください。"
        breadcrumbs={[{ label: "サービス一覧" }]}
        badge="SERVICES"
      />

      {/* 畳工事 */}
      <section className="section-py bg-shiro">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10 bg-kincya" />
              <span className="text-xs tracking-widest text-kincya uppercase">Tatami</span>
            </div>
            <h2
              className="text-2xl md:text-3xl text-sumi mb-4"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              畳工事
            </h2>
            <p className="text-sm text-sumi/70 max-w-2xl leading-relaxed">
              い草の表替えから縁なし畳・和紙畳・樹脂畳など多彩な素材選択まで対応。住宅・旅館・寺社の畳工事を専門的に承ります。
            </p>
            <div className="mt-4">
              <Link
                href="/services/tatami"
                className="inline-flex items-center gap-2 text-sm text-ai hover:text-kincya transition-colors"
              >
                <span>畳工事一覧を見る</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {TATAMI_SERVICES.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* 内装工事 */}
      <section className="section-py bg-kiji/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10 bg-kincya" />
              <span className="text-xs tracking-widest text-kincya uppercase">Interior</span>
            </div>
            <h2
              className="text-2xl md:text-3xl text-sumi mb-4"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              内装工事
            </h2>
            <p className="text-sm text-sumi/70 max-w-2xl leading-relaxed">
              クロス張替え・フローリング・クッションフロア・フロアタイルなど、畳以外の内装工事も一括対応。和室を含む住宅リフォームの窓口としてご利用ください。
            </p>
            <div className="mt-4">
              <Link
                href="/interior"
                className="inline-flex items-center gap-2 text-sm text-ai hover:text-kincya transition-colors"
              >
                <span>内装工事一覧を見る</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {INTERIOR_SERVICES.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* 原状回復 */}
      <section className="section-py bg-shiro">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10 bg-kincya" />
              <span className="text-xs tracking-widest text-kincya uppercase">Restoration</span>
            </div>
            <h2
              className="text-2xl md:text-3xl text-sumi mb-4"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              原状回復
            </h2>
            <p className="text-sm text-sumi/70 max-w-2xl leading-relaxed">
              賃貸物件・店舗・売買物件の退去後や売却前の原状回復工事を承ります。畳・クロス・床をまとめて依頼できるのが強みです。
            </p>
            <div className="mt-4">
              <Link
                href="/restoration"
                className="inline-flex items-center gap-2 text-sm text-ai hover:text-kincya transition-colors"
              >
                <span>原状回復一覧を見る</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {RESTORATION_SERVICES.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* 対応エリア */}
      <section className="py-12 bg-cloud border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs tracking-widest text-kincya mb-3">SERVICE AREA</p>
          <h3
            className="text-xl text-sumi mb-4"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            対応エリア
          </h3>
          <p className="text-sm text-sumi/70 leading-relaxed">
            東京都・神奈川県・埼玉県・千葉県を中心に対応しています。その他エリアについてはご相談ください。
          </p>
        </div>
      </section>

      <FAQSection
        items={faqItems}
        title="サービスに関するよくある質問"
        subtitle="畳工事・内装工事・原状回復に関してよく寄せられるご質問です。"
      />

      <CTASection />
    </>
  );
}
