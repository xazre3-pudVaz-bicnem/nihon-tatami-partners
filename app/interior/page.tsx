import type { Metadata } from "next";
import PageHeader from "@/components/common/PageHeader";
import CTASection from "@/components/common/CTASection";
import FAQSection from "@/components/common/FAQSection";
import ServiceCard from "@/components/common/ServiceCard";
import { createMetadata } from "@/lib/metadata";
import { INTERIOR_SERVICES } from "@/data/services";
import { FAQ_GENERAL } from "@/data/faq";

export const metadata: Metadata = createMetadata({
  title: "内装工事一覧｜クロス・床・フローリング・店舗内装",
  description: "クロス張替え・フローリング・クッションフロア・フロアタイル・店舗内装・住宅内装リフォームまで。畳工事と合わせて一括依頼できる内装工事サービス一覧。",
  path: "/interior",
});

const interiorFaqs = FAQ_GENERAL.filter((_, i) => i >= 4).slice(0, 4);

export default function InteriorPage() {
  return (
    <>
      <PageHeader
        title="内装工事一覧"
        subtitle="クロス・床・フローリング・店舗内装まで。畳工事と合わせて一括対応。"
        description="壁紙（クロス）の張替えから、フローリング・クッションフロア・フロアタイルの床工事、店舗内装・住宅リフォームまで幅広く対応します。畳工事との同時施工で効率よく内装を整えられます。"
        breadcrumbs={[{ label: "内装工事" }]}
        badge="INTERIOR"
      />

      {/* サービス一覧 */}
      <section className="section-py bg-shiro">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10 bg-kincya" />
              <span className="text-xs tracking-widest text-kincya">SERVICES</span>
            </div>
            <h2 className="text-2xl md:text-3xl text-sumi" style={{ fontFamily: "var(--font-serif)" }}>
              内装工事の種類
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {INTERIOR_SERVICES.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* 内装工事の強み */}
      <section className="section-py bg-kiji/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10 bg-kincya" />
              <span className="text-xs tracking-widest text-kincya">STRENGTHS</span>
            </div>
            <h2 className="text-2xl text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>
              内装工事をまとめて頼める強み
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { title: "畳工事との同時施工", desc: "畳の表替え・新調と同時にクロス張替え・床工事を実施。業者をまとめることで工期短縮・手間削減になります。" },
              { title: "一括見積もりで費用が明確", desc: "複数の工事をまとめて見積もりするため、全体の費用感が把握しやすくなります。" },
              { title: "住宅・賃貸・店舗すべてに対応", desc: "一般住宅・賃貸物件の原状回復・店舗内装まで幅広い用途に対応しています。" },
              { title: "法人様の継続案件も歓迎", desc: "不動産会社・管理会社の退去ごとの内装工事を継続的に承ります。一社でまとめることで管理が楽になります。" },
            ].map((item) => (
              <div key={item.title} className="p-6 bg-white border border-border">
                <h3 className="text-base text-sumi mb-2" style={{ fontFamily: "var(--font-serif)" }}>{item.title}</h3>
                <p className="text-sm text-sumi/60 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQSection
        items={interiorFaqs}
        title="内装工事に関するよくある質問"
      />

      <CTASection
        title="内装工事のご相談・無料見積もりはこちら"
        description="畳工事との同時施工も承ります。まずはご希望の工事内容をお聞かせください。"
      />
    </>
  );
}
