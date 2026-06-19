import type { Metadata } from "next";
import PageHeader from "@/components/common/PageHeader";
import CTASection from "@/components/common/CTASection";
import FAQSection from "@/components/common/FAQSection";
import ServiceCard from "@/components/common/ServiceCard";
import { createMetadata } from "@/lib/metadata";
import { TATAMI_SERVICES } from "@/data/services";
import type { FAQ } from "@/lib/types";

export const metadata: Metadata = createMetadata({
  title: "襖・障子・網戸の張替え｜和室を丸ごとリフレッシュ",
  description: "畳工事との同時施工で和室全体を一新。襖・障子・網戸の張替えを承ります。和紙・布・プラスチック素材から選択可。旅館・寺社・一般住宅に対応。無料見積もり受付中。",
  path: "/services/fusuma-shoji-amido",
});

const faqs: FAQ[] = [
  {
    question: "畳工事と同時に襖・障子も張り替えられますか？",
    answer:
      "はい、同時施工が可能です。同時に行うことで来訪者の回数を減らせるほか、全体のスケジュールを効率化できます。和室全体をまとめてリフレッシュしたい場合はぜひ合わせてご相談ください。",
    category: "general",
  },
  {
    question: "障子紙の種類はどのくらいありますか？",
    answer:
      "薄手の和紙から破れにくいタイプ（プラスチック混入和紙）、採光性を高めた和紙、断熱性の高いタイプなど多くの種類があります。小さなお子様やペットがいるご家庭には「ワーロンシート」などの破れにくいタイプが人気です。",
    category: "general",
  },
  {
    question: "網戸の張替えも対応していますか？",
    answer:
      "はい、対応しています。標準の灰色ネットのほか、目が細かいタイプ（防虫・花粉対応）、ペット用の強化ネット、視野が広がる透けにくいタイプなどから選べます。",
    category: "general",
  },
  {
    question: "旅館の全客室の障子を張り替えたい場合も対応できますか？",
    answer:
      "はい、旅館・施設の大量施工に対応しています。繁忙期を避けたスケジュール調整、複数職人での並行施工など、営業への影響を最小限に抑えた対応が可能です。",
    category: "business",
  },
  {
    question: "費用はどのくらいかかりますか？",
    answer:
      "素材・サイズ・枚数によって異なりますが、障子の張替えは1枚あたり2,000〜8,000円程度、襖の張替えは1枚あたり3,000〜12,000円程度が目安です。網戸は1枚あたり2,000〜6,000円程度です。現地確認の上でお見積もりします。",
    category: "price",
  },
];

export default function FusumaShöjiAmidoPage() {
  const relatedServices = TATAMI_SERVICES.filter(
    (s) => s.id !== "fusuma-shoji-amido"
  ).slice(0, 4);

  return (
    <>
      <PageHeader
        title="襖・障子・網戸の張替え"
        subtitle="和室を構成する建具のリフレッシュ。"
        description="畳と合わせて和室全体を整えたい場合、襖・障子・網戸の張替えも承ります。畳工事との同時施工で効率よく和室を一新できます。"
        breadcrumbs={[
          { label: "サービス", href: "/services" },
          { label: "畳工事", href: "/services/tatami" },
          { label: "襖・障子・網戸" },
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
                和室の建具を丸ごとリフレッシュ
              </h2>
              <div className="space-y-4 text-sm text-sumi/80 leading-relaxed">
                <p>
                  和室は畳だけでなく、襖（ふすま）・障子（しょうじ）・網戸を含む建具によって空間の印象が決まります。畳を新しくした際に、これらの建具も合わせてリフレッシュすることで和室全体の統一感が生まれます。
                </p>
                <p>
                  日本畳パートナーズでは、畳工事との同時施工で建具の張替えも承ります。別々の業者に依頼する手間が省け、スケジュール調整も一本化できます。
                </p>
              </div>

              {/* 各建具の説明 */}
              <div className="mt-10 space-y-8">
                {/* 襖 */}
                <div>
                  <h3 className="text-lg text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>
                    襖（ふすま）の張替え
                  </h3>
                  <p className="text-sm text-sumi/70 leading-relaxed mb-4">
                    和室と和室、または和室と廊下を仕切る建具です。伝統的な和紙（鳥の子紙）から、量産タイプの布クロス・ビニールクロスまで素材の選択肢があります。
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { type: "本鳥の子", desc: "高級和紙。伝統的な和室・旅館に" },
                      { type: "機械すき和紙", desc: "一般的な和紙。住宅・賃貸に" },
                      { type: "布・ビニールクロス", desc: "丈夫で汚れにくい。現代住宅に" },
                    ].map((item) => (
                      <div key={item.type} className="p-3 border border-border bg-kiji/30">
                        <p className="text-xs font-medium text-sumi">{item.type}</p>
                        <p className="text-xs text-sumi/50 mt-1">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 障子 */}
                <div>
                  <h3 className="text-lg text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>
                    障子（しょうじ）の張替え
                  </h3>
                  <p className="text-sm text-sumi/70 leading-relaxed mb-4">
                    光を柔らかく通す障子は和室の採光・断熱に重要な役割を持ちます。破れにくいタイプや断熱性の高いタイプなど機能性素材も充実しています。
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { type: "普通障子紙", desc: "一般的な和紙タイプ" },
                      { type: "強化障子紙", desc: "破れにくい。子ども・ペット向け" },
                      { type: "断熱障子紙", desc: "保温効果が高い。省エネ対策に" },
                    ].map((item) => (
                      <div key={item.type} className="p-3 border border-border bg-kiji/30">
                        <p className="text-xs font-medium text-sumi">{item.type}</p>
                        <p className="text-xs text-sumi/50 mt-1">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 網戸 */}
                <div>
                  <h3 className="text-lg text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>
                    網戸の張替え
                  </h3>
                  <p className="text-sm text-sumi/70 leading-relaxed mb-4">
                    破れ・穴あき・劣化した網戸の張替えです。標準ネットのほか、防虫・花粉対応・ペット用強化タイプも選べます。
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { type: "標準ネット", desc: "一般的な灰色ネット" },
                      { type: "防虫・花粉対応", desc: "目が細かく、虫・花粉をブロック" },
                      { type: "ペット用強化ネット", desc: "引っかきに強い強化素材" },
                    ].map((item) => (
                      <div key={item.type} className="p-3 border border-border bg-kiji/30">
                        <p className="text-xs font-medium text-sumi">{item.type}</p>
                        <p className="text-xs text-sumi/50 mt-1">{item.desc}</p>
                      </div>
                    ))}
                  </div>
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
                      <span className="text-xs text-sumi/70">障子 張替え</span>
                      <span className="text-sm text-kincya">2,000〜8,000円/枚</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-xs text-sumi/70">襖 張替え</span>
                      <span className="text-sm text-kincya">3,000〜12,000円/枚</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-xs text-sumi/70">網戸 張替え</span>
                      <span className="text-sm text-kincya">2,000〜6,000円/枚</span>
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

      <FAQSection items={faqs} title="襖・障子・網戸に関するよくある質問" />

      <CTASection
        title="建具張替えの無料見積もり・ご相談はこちら"
        description="畳工事との同時施工で効率的に和室を整えます。素材サンプルのご確認も承ります。"
      />
    </>
  );
}
