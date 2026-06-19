import type { Metadata } from "next";
import PageHeader from "@/components/common/PageHeader";
import CTASection from "@/components/common/CTASection";
import FAQSection from "@/components/common/FAQSection";
import ServiceCard from "@/components/common/ServiceCard";
import { createMetadata } from "@/lib/metadata";
import { TATAMI_SERVICES } from "@/data/services";
import type { FAQ } from "@/lib/types";

export const metadata: Metadata = createMetadata({
  title: "畳表替え｜い草を新品に張り替え",
  description: "畳の表替えは畳表（い草）を新しく張り替える定番の畳工事です。費用対効果が高く、5〜10年に一度のメンテナンスとして最適。無料見積もり受付中。",
  path: "/services/tatami-omotegae",
});

const faqs: FAQ[] = [
  {
    question: "表替えと裏返しの違いは何ですか？",
    answer:
      "裏返しは畳表の裏面を表に向けて使う工事で、使用3〜5年目が目安です。表替えは畳表そのものを新しいものに張り替える工事で、5〜10年目が適しています。裏返しは費用が安く、表替えは清潔感・香りが完全に戻ります。",
    category: "general",
  },
  {
    question: "表替えで素材を変えることはできますか？",
    answer:
      "はい、可能です。表替えの際に、従来のい草から和紙畳・樹脂畳に変更することができます。ペットや小さなお子様がいるご家庭では耐久性の高い和紙畳へ変更する方も増えています。",
    category: "general",
  },
  {
    question: "表替えの費用はどのくらいですか？",
    answer:
      "素材によって異なりますが、い草の表替えは1枚あたり5,000〜15,000円程度が目安です。和紙畳・樹脂畳はやや費用が高くなります。枚数・現場状況により変わりますので、まずは無料見積もりをご利用ください。",
    category: "price",
  },
  {
    question: "表替えの工期はどのくらいかかりますか？",
    answer:
      "通常、畳を持ち帰って工場で加工する場合は3〜7日程度かかります。即日対応の現場施工も可能な場合がありますので、お急ぎの場合はご相談ください。",
    category: "process",
  },
  {
    question: "い草の産地にこだわりたい場合はどうすれば良いですか？",
    answer:
      "熊本産・中国産などい草の産地を指定してのご注文も可能です。国産い草は品質・耐久性・香りが優れており、費用は高めになりますが長持ちします。ご希望をお聞かせください。",
    category: "general",
  },
];

export default function TatamiOmotegaePage() {
  const relatedServices = TATAMI_SERVICES.filter(
    (s) => s.id !== "tatami-omotegae"
  ).slice(0, 4);

  return (
    <>
      <PageHeader
        title="畳表替え"
        subtitle="い草の清潔感と香りを取り戻す、定番の畳工事。"
        description="畳の表面（畳表）だけを新しいものに張り替えます。費用対効果が高く、5〜10年に一度のメンテナンスとして最も多く選ばれている工事です。"
        breadcrumbs={[
          { label: "サービス", href: "/services" },
          { label: "畳工事", href: "/services/tatami" },
          { label: "畳表替え" },
        ]}
        badge="TATAMI"
      />

      {/* メインコンテンツ */}
      <section className="section-py bg-shiro">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* 本文 */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-10 bg-kincya" />
                <span className="text-xs tracking-widest text-kincya">ABOUT</span>
              </div>
              <h2
                className="text-2xl text-sumi mb-6"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                畳表替えとは
              </h2>
              <div className="space-y-4 text-sm text-sumi/80 leading-relaxed">
                <p>
                  畳表替えは、畳の表面素材である「畳表（たたみおもて）」を新しいものに張り替える工事です。畳床（芯材）はそのまま使い、表面のい草のみを交換するため、費用を抑えながらい草本来の清潔感と香りを取り戻すことができます。
                </p>
                <p>
                  使用年数の目安は5〜10年ですが、日当たりや使用頻度によって変わります。色が著しく変わった、表面がざらついてきた、香りがしなくなったといった変化を感じたら、表替えのタイミングです。
                </p>
                <p>
                  表替えの際に素材を変更することも可能です。ペットや子どもがいるご家庭、旅館・施設などでは和紙畳や樹脂畳への変更を選ばれる方も増えています。
                </p>
              </div>

              {/* 適している状態 */}
              <div className="mt-10">
                <h3
                  className="text-lg text-sumi mb-5"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  表替えが適している状態
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: "使用5〜10年経過", desc: "い草の寿命を迎えたタイミング" },
                    { label: "色が著しく変色", desc: "い草が日光・摩擦で変色した場合" },
                    { label: "表面がざらつく", desc: "毛羽立ちやごわつきが出てきた場合" },
                    { label: "香りがしなくなった", desc: "い草本来の香りが失われた場合" },
                    { label: "引越し前後", desc: "入居前・退去後のリフレッシュに" },
                    { label: "素材変更をしたい", desc: "和紙畳・樹脂畳への切替に" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-3 p-4 border border-border bg-kiji/30">
                      <span className="w-1.5 h-1.5 bg-kincya rounded-full mt-2 shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-sumi">{item.label}</p>
                        <p className="text-xs text-sumi/60 mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 工事の流れ */}
              <div className="mt-10">
                <h3
                  className="text-lg text-sumi mb-5"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  表替えの流れ
                </h3>
                <div className="space-y-4">
                  {[
                    { step: 1, title: "ご相談・無料見積もり", desc: "お電話・メールでご連絡ください。現地確認の日程を調整します。" },
                    { step: 2, title: "現地確認", desc: "畳の状態・枚数・サイズを確認し、正確なお見積もりをご提示します。" },
                    { step: 3, title: "畳の回収・工場加工", desc: "畳を預かり、工場で新しい畳表を張り替えます。" },
                    { step: 4, title: "納品・設置", desc: "張り替えが完了した畳をお部屋に設置します。通常3〜7日程度です。" },
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-4">
                      <span className="w-8 h-8 bg-ai text-white text-xs flex items-center justify-center shrink-0 font-serif">
                        {item.step}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-sumi">{item.title}</p>
                        <p className="text-xs text-sumi/60 mt-1">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* サイドバー */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                {/* 費用目安 */}
                <div className="p-6 bg-kiji border border-border">
                  <h3
                    className="text-base text-sumi mb-4"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    費用の目安
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-xs text-sumi/70">い草（国産）</span>
                      <span className="text-sm text-kincya">8,000〜15,000円/枚</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-xs text-sumi/70">い草（中国産）</span>
                      <span className="text-sm text-kincya">5,000〜9,000円/枚</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-xs text-sumi/70">和紙畳への変更</span>
                      <span className="text-sm text-kincya">10,000〜20,000円/枚</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-xs text-sumi/70">樹脂畳への変更</span>
                      <span className="text-sm text-kincya">12,000〜22,000円/枚</span>
                    </div>
                  </div>
                  <p className="text-xs text-sumi/50 mt-4">※枚数・素材・現場状況によって変わります。正確な金額は現地確認にてご提示します。</p>
                </div>

                {/* 関連サービス */}
                <div>
                  <h3
                    className="text-sm text-sumi mb-3"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    関連する畳工事
                  </h3>
                  <div className="space-y-2">
                    {relatedServices.map((s) => (
                      <ServiceCard key={s.id} service={s} variant="compact" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQSection items={faqs} title="畳表替えに関するよくある質問" />

      <CTASection
        title="畳表替えの無料見積もり・ご相談はこちら"
        description="現地確認後に正確な金額をご提示します。い草の産地・素材選びのご相談もお気軽に。"
      />
    </>
  );
}
