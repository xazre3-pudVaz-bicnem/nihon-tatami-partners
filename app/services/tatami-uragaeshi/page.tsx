import type { Metadata } from "next";
import PageHeader from "@/components/common/PageHeader";
import CTASection from "@/components/common/CTASection";
import FAQSection from "@/components/common/FAQSection";
import ServiceCard from "@/components/common/ServiceCard";
import { createMetadata } from "@/lib/metadata";
import { TATAMI_SERVICES } from "@/data/services";
import type { FAQ } from "@/lib/types";

export const metadata: Metadata = createMetadata({
  title: "畳裏返し｜経済的に畳をリフレッシュ",
  description: "畳裏返しは使用3〜5年の畳を裏面に向けて使う経済的な畳工事です。表替えの半分以下の費用でい草の清潔感を取り戻せます。無料見積もり受付中。",
  path: "/services/tatami-uragaeshi",
});

const faqs: FAQ[] = [
  {
    question: "裏返しできる畳とできない畳はどう見分けますか？",
    answer:
      "使用3〜5年程度で、裏面のい草がまだ新しさを保っているものが適しています。10年以上経過した畳や、両面使用済みの畳、畳床が傷んでいる場合は裏返しできません。現地確認で状態を確認してからご案内します。",
    category: "general",
  },
  {
    question: "裏返しの費用はどのくらいですか？",
    answer:
      "い草の表替えと比べ、費用は半分〜3分の2程度が目安です。1枚あたり3,000〜8,000円程度となる場合が多いです。現場状況や枚数によって変わりますのでお見積もりにてご確認ください。",
    category: "price",
  },
  {
    question: "裏返しした後、次は何をすれば良いですか？",
    answer:
      "裏返しの後、さらに3〜5年使用したら「表替え」のタイミングになります。表替えを行った後、さらに長期間使用して畳床が傷んできたら「新調」を検討します。定期的なメンテナンスで畳を長持ちさせることができます。",
    category: "general",
  },
  {
    question: "裏返しの工期はどのくらいですか？",
    answer:
      "通常、表替えと同程度の3〜7日が目安です。畳を工場に持ち帰って作業する場合と、現場での即日作業の場合があります。ご希望をお聞きした上で対応します。",
    category: "process",
  },
];

export default function TatamiUragaeshiPage() {
  const relatedServices = TATAMI_SERVICES.filter(
    (s) => s.id !== "tatami-uragaeshi"
  ).slice(0, 4);

  return (
    <>
      <PageHeader
        title="畳裏返し"
        subtitle="表面を裏返して使える、経済的な選択肢。"
        description="使用3〜5年の畳表の裏面を活かす工事です。表替えより費用を抑えながら、い草本来の風合いでリフレッシュできます。"
        breadcrumbs={[
          { label: "サービス", href: "/services" },
          { label: "畳工事", href: "/services/tatami" },
          { label: "畳裏返し" },
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
              <h2
                className="text-2xl text-sumi mb-6"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                畳裏返しとは
              </h2>
              <div className="space-y-4 text-sm text-sumi/80 leading-relaxed">
                <p>
                  畳裏返しは、表面が使用で変色・毛羽立ってきた畳を一旦外し、畳表の裏面（まだ使用されていない面）を表に向けて張り直す工事です。表替えよりも安価にい草の清潔感を取り戻すことができます。
                </p>
                <p>
                  使用年数3〜5年が裏返しの最適なタイミングです。この段階では裏面のい草はまだ十分な状態を保っており、裏返すことで実質「新しい表面」として使うことができます。
                </p>
                <p>
                  裏返しを適切なタイミングで行うことで、次の表替えまでの期間を延ばし、長期的なコストを抑えることができます。「裏返し→表替え→新調」のサイクルで畳を大切に使い続けることが畳の賢い使い方です。
                </p>
              </div>

              {/* メリット */}
              <div className="mt-10">
                <h3
                  className="text-lg text-sumi mb-5"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  裏返しのメリット
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { title: "費用が抑えられる", desc: "表替えの約半分〜3分の2の費用でリフレッシュ可能" },
                    { title: "い草の風合いが残る", desc: "まだ使っていない裏面のい草が表に出てくる" },
                    { title: "環境にやさしい", desc: "既存の素材を活かすため廃材が少なく済む" },
                    { title: "短工期で対応可能", desc: "表替えと同程度の工期で完了" },
                  ].map((item) => (
                    <div key={item.title} className="p-4 border border-border bg-kiji/30">
                      <p className="text-sm font-medium text-sumi mb-1" style={{ fontFamily: "var(--font-serif)" }}>{item.title}</p>
                      <p className="text-xs text-sumi/60">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 畳メンテナンスサイクル */}
              <div className="mt-10">
                <h3
                  className="text-lg text-sumi mb-5"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  畳の理想的なメンテナンスサイクル
                </h3>
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />
                  <div className="space-y-6 pl-12">
                    {[
                      { year: "3〜5年目", title: "裏返し", desc: "表面が軽く変色し始めたタイミング。裏面を使ってコスパよくリフレッシュ。" },
                      { year: "7〜10年目", title: "表替え", desc: "裏返しから数年後。畳表を新品に張り替えて清潔感を完全回復。" },
                      { year: "15〜20年以上", title: "新調", desc: "畳床が傷んで踏み心地が悪くなってきたら床ごと新品に。" },
                    ].map((item, i) => (
                      <div key={i} className="relative">
                        <div className="absolute -left-8 w-4 h-4 rounded-full bg-ai border-2 border-white" style={{ top: "2px" }} />
                        <span className="text-xs text-kincya font-medium">{item.year}</span>
                        <h4 className="text-sm font-medium text-sumi mt-0.5" style={{ fontFamily: "var(--font-serif)" }}>{item.title}</h4>
                        <p className="text-xs text-sumi/60 mt-1">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 注意点 */}
              <div className="mt-10 p-6 bg-kiji/40 border border-border">
                <h3
                  className="text-base text-sumi mb-3"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  裏返しができない場合
                </h3>
                <ul className="space-y-2 text-sm text-sumi/70">
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 bg-sumi/40 rounded-full mt-2 shrink-0" />
                    <span>使用10年以上で裏面のい草も劣化している場合</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 bg-sumi/40 rounded-full mt-2 shrink-0" />
                    <span>過去に既に裏返しを行っている場合</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 bg-sumi/40 rounded-full mt-2 shrink-0" />
                    <span>カビ・ダニが内部まで進行している場合</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 bg-sumi/40 rounded-full mt-2 shrink-0" />
                    <span>畳床が大きく傷んでいる場合</span>
                  </li>
                </ul>
                <p className="text-xs text-sumi/50 mt-3">※現地確認の上、裏返しが可能かどうかをご判断します。</p>
              </div>
            </div>

            {/* サイドバー */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                <div className="p-6 bg-kiji border border-border">
                  <h3
                    className="text-base text-sumi mb-4"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    費用の目安
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-xs text-sumi/70">畳裏返し（標準）</span>
                      <span className="text-sm text-kincya">3,000〜8,000円/枚</span>
                    </div>
                  </div>
                  <p className="text-xs text-sumi/50 mt-4">※枚数・現場状況により変わります。</p>
                </div>
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

      <FAQSection items={faqs} title="畳裏返しに関するよくある質問" />

      <CTASection
        title="畳裏返しの無料見積もり・ご相談はこちら"
        description="現地で状態を確認した上で、裏返しが可能かどうかご案内します。"
      />
    </>
  );
}
