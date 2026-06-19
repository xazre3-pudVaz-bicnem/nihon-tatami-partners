import type { Metadata } from "next";
import PageHeader from "@/components/common/PageHeader";
import CTASection from "@/components/common/CTASection";
import FAQSection from "@/components/common/FAQSection";
import ServiceCard from "@/components/common/ServiceCard";
import { createMetadata } from "@/lib/metadata";
import { TATAMI_SERVICES } from "@/data/services";
import type { FAQ } from "@/lib/types";

export const metadata: Metadata = createMetadata({
  title: "畳新調｜畳床ごと新品に交換",
  description: "畳新調は畳床（芯材）から新しく作り直す完全リフレッシュの畳工事です。踏み心地・断熱性・防音性が新品になります。住宅リフォームにも対応。無料見積もり受付中。",
  path: "/services/tatami-shinchou",
});

const faqs: FAQ[] = [
  {
    question: "畳新調が必要なのはどんなタイミングですか？",
    answer:
      "使用15〜20年以上が経過した場合や、踏んだ時に沈む・へこむ感覚がある場合が目安です。表替えを繰り返しても畳床が傷んでいると意味がないため、床から作り直す新調が必要になります。現地確認で状態をご確認します。",
    category: "general",
  },
  {
    question: "畳新調の費用はどのくらいですか？",
    answer:
      "畳床の種類・畳表の素材によって異なりますが、1枚あたり15,000〜35,000円程度が目安です。稲わら床・建材床・ボード床など芯材の選択によって金額が変わります。まずは無料見積もりをご利用ください。",
    category: "price",
  },
  {
    question: "畳床（芯材）の種類について教えてください。",
    answer:
      "主な畳床は「稲わら床」「建材床（インシュレーションボード）」「ボード床」の3種類です。稲わら床は通気性・踏み心地が優れていますが重く高価です。建材床は軽く価格が手頃で現代住宅に多く使われます。用途・予算に合わせてご提案します。",
    category: "general",
  },
  {
    question: "リフォームに合わせて畳サイズを変更できますか？",
    answer:
      "はい、可能です。新調の場合、部屋の寸法に合わせてオーダー製作するため、リフォームで部屋のサイズが変わった場合も対応できます。フローリングから和室への変更や、洋室から和室への転換リフォームにも承ります。",
    category: "general",
  },
  {
    question: "新調にかかる工期はどのくらいですか？",
    answer:
      "通常1〜2週間程度が目安です。製作・加工の期間が表替えより長くなります。急ぎの場合はご相談ください。旅館や施設での大量新調は別途スケジュールを組みます。",
    category: "process",
  },
];

export default function TatamiSinchouPage() {
  const relatedServices = TATAMI_SERVICES.filter(
    (s) => s.id !== "tatami-shinchou"
  ).slice(0, 4);

  return (
    <>
      <PageHeader
        title="畳新調"
        subtitle="畳床ごと新品に。完全な新品の仕上がり。"
        description="長年使用で傷んだ畳床（芯材）から新しく作り直す工事です。踏み心地・断熱性・防音性が生まれ変わります。和室リフォームの締めくくりにも最適です。"
        breadcrumbs={[
          { label: "サービス", href: "/services" },
          { label: "畳工事", href: "/services/tatami" },
          { label: "畳新調" },
        ]}
        badge="TATAMI"
      />

      <section className="section-py bg-shiro">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-10 bg-kincya" />
                <span className="text-xs tracking-widest text-kincya">ABOUT</span>
              </div>
              <h2 className="text-2xl text-sumi mb-6" style={{ fontFamily: "var(--font-serif)" }}>
                畳新調とは
              </h2>
              <div className="space-y-4 text-sm text-sumi/80 leading-relaxed">
                <p>
                  畳新調は、畳の芯材である「畳床（たたみどこ）」から新しく製作する工事です。表替えや裏返しで対応できなくなった、あるいは和室を全面リフォームするタイミングで選ばれる工事です。
                </p>
                <p>
                  新調を行うことで踏み心地が完全に新品になるだけでなく、断熱性・防音性・調湿機能も回復します。特に稲わら床は吸湿・放湿機能に優れ、快適な和室の環境を作ります。
                </p>
                <p>
                  新調の際には畳床の素材だけでなく、畳表の素材（い草・和紙・樹脂）や縁のデザインも選ぶことができます。縁なし畳や琉球畳スタイルへの変更もこのタイミングで可能です。
                </p>
              </div>

              {/* 畳床の比較 */}
              <div className="mt-10">
                <h3 className="text-lg text-sumi mb-5" style={{ fontFamily: "var(--font-serif)" }}>
                  畳床（芯材）の種類と特徴
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse bg-white text-sm">
                    <thead>
                      <tr className="bg-ai text-white">
                        <th className="px-4 py-3 text-left font-normal text-xs">種類</th>
                        <th className="px-4 py-3 text-left font-normal text-xs">特徴</th>
                        <th className="px-4 py-3 text-left font-normal text-xs">向いている用途</th>
                        <th className="px-4 py-3 text-left font-normal text-xs">コスト</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      <tr className="hover:bg-kiji/20">
                        <td className="px-4 py-3 font-medium text-sumi">稲わら床</td>
                        <td className="px-4 py-3 text-sumi/70">通気性・調湿性が高く踏み心地が良い</td>
                        <td className="px-4 py-3 text-sumi/70">旅館・寺社・高級住宅</td>
                        <td className="px-4 py-3 text-kincya">高</td>
                      </tr>
                      <tr className="hover:bg-kiji/20">
                        <td className="px-4 py-3 font-medium text-sumi">建材床</td>
                        <td className="px-4 py-3 text-sumi/70">軽量で価格が手頃。現代住宅に多い</td>
                        <td className="px-4 py-3 text-sumi/70">一般住宅・賃貸物件</td>
                        <td className="px-4 py-3 text-kincya">中</td>
                      </tr>
                      <tr className="hover:bg-kiji/20">
                        <td className="px-4 py-3 font-medium text-sumi">ボード床</td>
                        <td className="px-4 py-3 text-sumi/70">ダニ・カビが発生しにくく衛生的</td>
                        <td className="px-4 py-3 text-sumi/70">アレルギー対策・医療施設</td>
                        <td className="px-4 py-3 text-kincya">中〜高</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 新調が適する場面 */}
              <div className="mt-10">
                <h3 className="text-lg text-sumi mb-5" style={{ fontFamily: "var(--font-serif)" }}>
                  新調が適している状態
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    "使用15〜20年以上経過した畳",
                    "踏んだ時に沈む・へこむ感触がある",
                    "畳床が腐食・虫食いで傷んでいる",
                    "和室リフォームに合わせて一新したい",
                    "フローリングから畳敷きに変更したい",
                    "縁なし畳・琉球畳スタイルに変えたい",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2 p-3 border border-border bg-kiji/20">
                      <span className="w-1.5 h-1.5 bg-kincya rounded-full mt-2 shrink-0" />
                      <span className="text-sm text-sumi/70">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                <div className="p-6 bg-kiji border border-border">
                  <h3 className="text-base text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>
                    費用の目安
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-xs text-sumi/70">建材床（標準）</span>
                      <span className="text-sm text-kincya">15,000〜25,000円/枚</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-xs text-sumi/70">稲わら床</span>
                      <span className="text-sm text-kincya">25,000〜40,000円/枚</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-xs text-sumi/70">縁なし・和紙仕様</span>
                      <span className="text-sm text-kincya">要お見積もり</span>
                    </div>
                  </div>
                  <p className="text-xs text-sumi/50 mt-4">※素材・枚数・現場状況により変わります。</p>
                </div>
                <div>
                  <h3 className="text-sm text-sumi mb-3" style={{ fontFamily: "var(--font-serif)" }}>
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

      <FAQSection items={faqs} title="畳新調に関するよくある質問" />

      <CTASection
        title="畳新調の無料見積もり・ご相談はこちら"
        description="畳床の状態を確認し、最適な芯材・畳表をご提案します。和室リフォームとの同時施工もお任せください。"
      />
    </>
  );
}
