import type { Metadata } from "next";
import PageHeader from "@/components/common/PageHeader";
import CTASection from "@/components/common/CTASection";
import FAQSection from "@/components/common/FAQSection";
import { createMetadata } from "@/lib/metadata";
import type { FAQ } from "@/lib/types";

export const metadata: Metadata = createMetadata({
  title: "寺院・神社向け畳工事｜格式ある和室・本堂の畳替え",
  description: "寺院・神社の本堂・客殿・書院・庫裏の畳工事を承ります。格式ある空間に合わせた素材選定・高級縁・建具張替え。法要・行事の日程に配慮した工事計画。無料見積もり受付中。",
  path: "/business/temple-shrine",
});

const faqs: FAQ[] = [
  {
    question: "本堂の畳を張り替えたい。対応できますか？",
    answer:
      "はい、本堂の畳工事の実績があります。格式ある空間に合わせた素材選定・縁の選択（高麗縁・紫縁など）と丁寧な施工で、本堂にふさわしい仕上がりをご提供します。",
    category: "business",
  },
  {
    question: "法要・行事の前に間に合わせてほしい。",
    answer:
      "行事・法要のスケジュールを優先した工事計画を組みます。逆算して工程を組むことで、法要前に完成できるよう対応します。余裕を持って早めにご相談ください。",
    category: "business",
  },
  {
    question: "寺院向けの高級縁はどのようなものがありますか？",
    answer:
      "寺院には高麗縁（こうらいべり）・紫縁（むらさきべり）・繧繝縁（うんげんべり）などの格式ある縁が伝統的に使用されてきました。場所・格式に合わせてご提案します。",
    category: "business",
  },
  {
    question: "本堂以外の場所（客殿・庫裏・書院）も対応できますか？",
    answer:
      "はい、本堂に限らず客殿・庫裏・書院・座敷など寺社の各スペースの畳工事に対応しています。場所の格式・用途に合わせた素材・縁をご提案します。",
    category: "business",
  },
];

export default function TempleShrainePage() {
  return (
    <>
      <PageHeader
        title="寺院・神社向け畳工事"
        subtitle="格式と伝統を守る、丁寧な畳・建具工事。"
        description="寺院・神社の本堂・客殿・書院・庫裏の畳工事を承ります。格式ある空間に合わせた素材・縁の選択と丁寧な施工で、法要・行事に間に合う工事計画を組みます。"
        breadcrumbs={[
          { label: "法人向けサービス", href: "/business" },
          { label: "寺院・神社向け" },
        ]}
        badge="BUSINESS"
      />

      <section className="section-py bg-shiro">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10 bg-kincya" />
              <span className="text-xs tracking-widest text-kincya">ABOUT</span>
            </div>
            <h2 className="text-2xl text-sumi mb-6" style={{ fontFamily: "var(--font-serif)" }}>
              寺院・神社の畳工事について
            </h2>
            <div className="space-y-4 text-sm text-sumi/80 leading-relaxed">
              <p>
                寺院・神社の和室は、一般住宅と異なる格式・用途があります。本堂・客殿・書院など、それぞれの場所に合わせた素材選定・縁の種類・施工の丁寧さが求められます。
              </p>
              <p>
                特に本堂の畳は、格式を示す縁（高麗縁・紫縁など）の選択が重要です。長年の伝統的な約束事に基づいた縁の使い方についても、ご相談の上でご提案します。
              </p>
              <p>
                法要・行事のスケジュールに合わせた工事計画を組むことが最優先です。早めにご相談いただくことで、余裕を持った対応が可能になります。
              </p>
            </div>
          </div>

          {/* 対応場所 */}
          <div className="mb-14">
            <h3 className="text-lg text-sumi mb-6" style={{ fontFamily: "var(--font-serif)" }}>
              対応できる場所と素材
            </h3>
            <div className="space-y-4">
              {[
                { place: "本堂", material: "稲わら床 / 高麗縁・紫縁・繧繝縁", desc: "最も格式のある空間。素材と縁の選択を慎重に行います。" },
                { place: "客殿・座敷", material: "稲わら床・建材床 / 柄縁・無地縁", desc: "来客をもてなす空間。格式と実用性のバランスが重要。" },
                { place: "書院", material: "稲わら床 / 高麗縁など", desc: "格式ある和室。床の間との調和を考慮した素材選び。" },
                { place: "庫裏・控えの間", material: "建材床・稲わら床 / 無地縁", desc: "実用的な空間。耐久性と費用対効果を考慮したご提案。" },
              ].map((item) => (
                <div key={item.place} className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 border border-border bg-white">
                  <div>
                    <span className="text-xs text-kincya tracking-widest">場所</span>
                    <p className="text-sm font-medium text-sumi mt-1" style={{ fontFamily: "var(--font-serif)" }}>{item.place}</p>
                  </div>
                  <div>
                    <span className="text-xs text-kincya tracking-widest">素材・縁</span>
                    <p className="text-xs text-sumi/70 mt-1">{item.material}</p>
                  </div>
                  <div>
                    <span className="text-xs text-kincya tracking-widest">ポイント</span>
                    <p className="text-xs text-sumi/70 mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 対応サービス */}
          <div className="mb-14">
            <h3 className="text-lg text-sumi mb-5" style={{ fontFamily: "var(--font-serif)" }}>
              対応できる工事内容
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "本堂・客殿・書院・庫裏の畳工事",
                "格式ある縁（高麗縁・紫縁・繧繝縁）の使用",
                "稲わら床による高品質な畳新調",
                "障子・襖・建具の張替え",
                "法要・行事に合わせた工事スケジュール",
                "縁のデザイン相談・サンプル確認",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 p-3 border border-border bg-kiji/20">
                  <span className="w-1.5 h-1.5 bg-kincya rounded-full shrink-0" />
                  <span className="text-sm text-sumi/70">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* よくある相談 */}
          <div>
            <h3 className="text-lg text-sumi mb-6" style={{ fontFamily: "var(--font-serif)" }}>
              よくある相談例
            </h3>
            <div className="space-y-4">
              {[
                { q: "秋の法要前に本堂の畳を新調したい。", a: "法要の日程をお聞きして逆算した工事計画を組みます。余裕を持って早めにご相談ください。" },
                { q: "本堂の縁の種類について相談したい。", a: "格式・場所に合わせた縁の種類をご提案します。サンプルをお持ちして確認いただくことも可能です。" },
                { q: "客殿と庫裏の畳を一緒に替えたい。", a: "複数箇所を同時に施工する場合、スケジュールを効率化できます。一括でご相談ください。" },
              ].map((item, i) => (
                <div key={i} className="border border-border bg-white p-5">
                  <p className="text-sm font-medium text-sumi mb-2" style={{ fontFamily: "var(--font-serif)" }}>Q. {item.q}</p>
                  <p className="text-sm text-sumi/70 leading-relaxed">A. {item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FAQSection items={faqs} title="寺院・神社様からよくある質問" />

      <CTASection
        title="寺院・神社の畳工事ご相談はこちら"
        description="法要・行事の日程に合わせた工事計画を組みます。縁のサンプルや素材のご相談もお気軽にどうぞ。"
        showBusiness={false}
      />
    </>
  );
}
