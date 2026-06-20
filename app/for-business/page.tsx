import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import CTASection from "@/components/common/CTASection";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "法人・施設向け 畳・内装の一括対応｜不動産・管理会社・旅館・寺社",
  description:
    "不動産会社・管理会社・賃貸オーナー・旅館・寺院・神社・店舗向けに、畳交換や原状回復をまとめて依頼できる業者を埼玉県で比較。請求書払い・継続取引に対応する業者を一覧から探せます。",
  path: "/for-business",
});

const SEGMENTS = [
  {
    href: "/for-real-estate",
    title: "不動産会社向け",
    desc: "退去後の原状回復を畳・クロス・床までまとめて。空室期間の短縮に。",
  },
  {
    href: "/for-property-management",
    title: "管理会社向け",
    desc: "管理物件の畳交換・原状回復を継続的にサポート。発注・精算を効率化。",
  },
  {
    href: "/for-landlords",
    title: "賃貸オーナー向け",
    desc: "費用を抑えて入居率を高める畳メンテナンス。空室対策のご相談に。",
  },
  {
    href: "/for-ryokan",
    title: "旅館・宿泊施設向け",
    desc: "客室の畳を耐久性の高い素材で。オフシーズンの一括施工に対応。",
  },
  {
    href: "/for-temple-shrine",
    title: "寺院・神社向け",
    desc: "本堂・拝殿の格式に合わせた畳・縁の選定。法要・神事前の施工に。",
  },
  {
    href: "/for-store",
    title: "店舗オーナー向け",
    desc: "小上がり・座敷の畳を営業時間外に。耐久性重視の素材をご提案。",
  },
];

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "トップ", item: "/" },
    { "@type": "ListItem", position: 2, name: "法人・施設向け", item: "/for-business" },
  ],
};

export default function ForBusinessPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <div className="min-h-screen bg-shiro">
        <div className="bg-white border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <Breadcrumbs items={[{ label: "トップ", href: "/" }, { label: "法人・施設向け" }]} />
          </div>
        </div>

        <div className="bg-sumi text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-2xl md:text-3xl mb-3" style={{ fontFamily: "var(--font-serif)" }}>
              法人・施設向け 畳・内装の一括対応
            </h1>
            <p className="text-sm text-white/70 leading-relaxed">
              不動産会社・管理会社・賃貸オーナー・旅館・寺社・店舗まで。畳交換や原状回復をまとめて依頼できる業者を埼玉県で比較できます。請求書払い・インボイス・継続取引に対応する業者も掲載しています。
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SEGMENTS.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="block bg-white border border-border p-6 hover:border-kincya/50 hover:shadow-sm transition-all"
              >
                <h2 className="text-lg text-sumi mb-2" style={{ fontFamily: "var(--font-serif)" }}>
                  {s.title}
                </h2>
                <p className="text-sm text-sumi/60 leading-relaxed mb-3">{s.desc}</p>
                <span className="text-xs text-ai">詳しく見る →</span>
              </Link>
            ))}
          </div>

          <div className="mt-8 bg-kiji/40 border border-kiji p-6">
            <h2 className="text-base text-sumi mb-2" style={{ fontFamily: "var(--font-serif)" }}>
              賃貸の原状回復をお探しの方へ
            </h2>
            <p className="text-sm text-sumi/70 leading-relaxed mb-3">
              退去時の畳張替えや原状回復の費用相場・業者の選び方は、専用ページでご案内しています。
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/saitama/rental-restoration/tatami" className="text-sm text-ai hover:underline">
                賃貸原状回復の畳張替え →
              </Link>
              <Link href="/bulk-quote" className="text-sm text-ai hover:underline">
                法人向け一括見積もり →
              </Link>
            </div>
          </div>
        </div>

        <CTASection showBusiness={false} />
      </div>
    </>
  );
}
