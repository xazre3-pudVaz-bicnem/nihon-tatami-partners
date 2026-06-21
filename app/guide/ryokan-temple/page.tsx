import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import FAQSection from "@/components/common/FAQSection";
import StickyBottomCTA from "@/components/common/StickyBottomCTA";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "旅館・寺社の畳工事チェックリスト｜特殊施設向けガイド",
  description: "旅館・宿泊施設の客室畳、寺社・仏閣の本堂・拝殿の畳工事に関する注意点とチェックリスト。法人対応業者への相談方法もご紹介します。",
  path: "/guide/ryokan-temple",
});

const RYOKAN_POINTS = [
  {
    title: "客室畳の耐久性を重視する",
    detail: "旅館の客室畳は一般住宅と比べて使用頻度が高く、耐久性に優れた素材を選ぶことが重要です。和紙畳・樹脂畳など傷みにくい素材の採用も検討しましょう。",
  },
  {
    title: "繁忙期を避けたスケジュール調整",
    detail: "旅館の畳工事は営業に影響するため、オフシーズンや閑散期を選んで計画的に行うことが重要です。業者と十分に施工スケジュールを調整しましょう。",
  },
  {
    title: "複数客室の一括対応が可能な業者を選ぶ",
    detail: "客室数が多い場合は、短期間で複数室を施工できる業者を選ぶと効率的です。一括対応で費用が抑えられる場合もあります。",
  },
  {
    title: "設備・家具の移動や養生の確認",
    detail: "客室の床の間・押し入れ・家具の移動が必要な場合のコストと段取りを事前に業者と確認しましょう。施工中の他の客室への影響も確認が必要です。",
  },
  {
    title: "施工後の仕上がり確認と立会い",
    detail: "旅館は見た目の品質が直接サービス品質に影響します。施工後は全室の仕上がりを確認し、問題があれば速やかに対応してもらえる業者を選びましょう。",
  },
];

const RYOKAN_CHECKLIST = [
  "旅館向け工事実績のある業者かを確認する",
  "複数客室を短期間で施工できる体制があるか確認する",
  "繁忙期・閑散期を考慮した施工スケジュールを確認する",
  "耐久性の高い素材（和紙畳・樹脂畳など）の提案があるか確認する",
  "施工中の宿泊客への影響・対策を確認する",
  "施工費・素材費の見積書を複数業者から取り寄せる",
  "アフターメンテナンス（定期的な手入れ）の対応を確認する",
  "請求書払い・インボイス対応が可能かを確認する",
];

const TEMPLE_POINTS = [
  {
    title: "本堂・拝殿の格式を理解している業者を選ぶ",
    detail: "寺院・神社の本堂・拝殿は一般住宅と異なる格式・仕様が求められます。寺社の畳工事実績のある業者に依頼することで、適切な素材選定と施工が期待できます。",
  },
  {
    title: "特殊サイズ・炉畳・礼拝空間の対応確認",
    detail: "本堂の畳は京間サイズや特注寸法、炉切りなど特殊な仕様が必要な場合があります。業者がこれらに対応できるか事前に確認しましょう。",
  },
  {
    title: "素材の選定（国産い草・格式に合う縁素材）",
    detail: "格式ある空間にふさわしい高品質な国産い草や、格に合った縁（ヘリ）の素材を選ぶことが重要です。業者にサンプルを見せてもらいながら選びましょう。",
  },
  {
    title: "宗教行事・祭礼を避けたスケジュール調整",
    detail: "法要・祭礼・参拝の多い時期を避けて施工スケジュールを組むことが必要です。寺社のカレンダーに合わせた丁寧な段取りが求められます。",
  },
  {
    title: "搬入・搬出の制約を事前に確認する",
    detail: "境内への車両乗入れ制限・境内の通路幅・重機使用の可否など、現場固有の制約を事前に業者と確認しましょう。",
  },
];

const TEMPLE_CHECKLIST = [
  "寺社・仏閣の施工実績のある業者かを確認する",
  "炉切り・特殊サイズ畳への対応可否を確認する",
  "格式に合った縁（ヘリ）素材のサンプルを見せてもらう",
  "宗教行事・法要の日程を避けた施工スケジュールを確認する",
  "境内への車両乗入れ・搬入経路の制約を業者と共有する",
  "複数業者から見積もりを取り、費用と素材を比較する",
  "施工後の仕上がり確認と立会いの日程を設定する",
  "長期的なメンテナンス（次回の工事時期の目安）を確認する",
];

const faqs = [
  { question: "旅館の客室畳はどのくらいの頻度で交換が必要ですか？", answer: "使用頻度によりますが、一般的には3〜5年で裏返し、7〜10年で表替えが目安です。旅館は使用頻度が高いため、早めのメンテナンスが必要です。耐久性の高い素材（和紙畳・樹脂畳）を選ぶと交換頻度を抑えられる場合があります。" },
  { question: "旅館の客室すべてを一度に交換する必要がありますか？", answer: "一度にすべての客室を交換する必要はありません。劣化の激しい客室から優先的に施工し、計画的に進める方法もあります。業者と相談して効率的なプランを立てましょう。" },
  { question: "寺院の本堂の畳サイズは特注になりますか？", answer: "本堂・拝殿の畳は京間サイズや歴史的な建物固有の寸法になることが多く、特注対応が必要な場合があります。炉切りなど特殊な仕様が必要な場合もありますので、実績のある業者への相談をおすすめします。" },
  { question: "法人・管理会社として継続的に依頼できますか？", answer: "旅館・寺社・管理会社として継続的に依頼できる業者も掲載しています。「法人対応」「旅館対応」「寺社対応」の業者を検索・絞り込みしてご確認ください。" },
  { question: "請求書払いやインボイス対応の業者はいますか？", answer: "法人・管理会社向けに請求書払い・インボイス対応している業者も掲載しています。見積もり依頼時に「インボイス対応希望」と明記することをおすすめします。" },
];

export default function RyokanTemplePage() {
  return (
    <div className="min-h-screen bg-shiro">
      {/* Header */}
      <div className="bg-sumi">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumbs
            variant="dark"
            items={[
              { label: "トップ", href: "/" },
              { label: "ガイド", href: "/guide" },
              { label: "旅館・寺社の畳工事" },
            ]}
          />
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 pt-4">
          <div className="text-xs text-white/40 mb-3">ガイド</div>
          <h1 className="text-2xl md:text-3xl text-white mb-3" style={{ fontFamily: "var(--font-serif)" }}>
            旅館・寺社の畳工事チェックリスト
          </h1>
          <p className="text-sm text-white/60 max-w-xl leading-relaxed">
            特殊な施設の畳工事には一般住宅とは異なる知識と経験が必要です。業者選びと準備のポイントを解説します。
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* 旅館向け */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-ai text-white flex items-center justify-center text-sm font-bold shrink-0">旅</div>
            <h2 className="text-xl text-sumi" style={{ fontFamily: "var(--font-serif)" }}>
              旅館・宿泊施設の畳工事
            </h2>
          </div>

          <p className="text-sm text-sumi/70 leading-relaxed mb-6">
            旅館・ホテルの客室畳は宿泊客が直接触れるため、品質と耐久性が特に重要です。適切なメンテナンスと計画的な施工で、宿泊品質を維持しましょう。
          </p>

          <div className="space-y-4 mb-8">
            {RYOKAN_POINTS.map((point, i) => (
              <div key={i} className="bg-white border border-border p-5">
                <h3 className="text-sm font-medium text-sumi mb-2 flex items-start gap-2">
                  <span className="text-ai shrink-0">{i + 1}.</span>
                  {point.title}
                </h3>
                <p className="text-xs text-sumi/60 leading-relaxed">{point.detail}</p>
              </div>
            ))}
          </div>

          <div className="bg-kiji/30 border border-kiji p-6 mb-6">
            <h3 className="text-sm font-medium text-sumi mb-4">旅館・宿泊施設向けチェックリスト</h3>
            <ul className="space-y-3">
              {RYOKAN_CHECKLIST.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-4 h-4 border border-sumi/30 mt-0.5 shrink-0 bg-white" />
                  <span className="text-sm text-sumi/70">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 寺社向け */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-kincya text-white flex items-center justify-center text-sm font-bold shrink-0">社</div>
            <h2 className="text-xl text-sumi" style={{ fontFamily: "var(--font-serif)" }}>
              寺社・仏閣の畳工事
            </h2>
          </div>

          <p className="text-sm text-sumi/70 leading-relaxed mb-6">
            寺院・神社の本堂・拝殿・社務所の畳工事は、格式・素材・施工方法など専門的な知識が求められます。実績のある業者への相談をおすすめします。
          </p>

          <div className="space-y-4 mb-8">
            {TEMPLE_POINTS.map((point, i) => (
              <div key={i} className="bg-white border border-border p-5">
                <h3 className="text-sm font-medium text-sumi mb-2 flex items-start gap-2">
                  <span className="text-kincya shrink-0">{i + 1}.</span>
                  {point.title}
                </h3>
                <p className="text-xs text-sumi/60 leading-relaxed">{point.detail}</p>
              </div>
            ))}
          </div>

          <div className="bg-kiji/30 border border-kiji p-6 mb-6">
            <h3 className="text-sm font-medium text-sumi mb-4">寺社・仏閣向けチェックリスト</h3>
            <ul className="space-y-3">
              {TEMPLE_CHECKLIST.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-4 h-4 border border-sumi/30 mt-0.5 shrink-0 bg-white" />
                  <span className="text-sm text-sumi/70">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 法人対応業者へのCTA */}
        <section className="mb-10">
          <div className="bg-sumi text-white p-8 text-center">
            <h2 className="text-xl mb-3" style={{ fontFamily: "var(--font-serif)" }}>
              旅館・寺社対応業者に相談する
            </h2>
            <p className="text-sm text-white/60 mb-6 max-w-lg mx-auto leading-relaxed">
              旅館・寺社への施工実績がある業者を絞り込みして一括で見積もりを依頼できます。複数物件の場合は法人向け相談フォームもご利用ください。
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/bulk-quote/new"
                className="text-sm bg-kincya text-white px-8 py-3 font-bold hover:bg-do transition-colors"
              >
                見積もりを依頼する
              </Link>
              <Link
                href="/business/bulk-request"
                className="text-sm border border-white/30 text-white px-8 py-3 hover:bg-white/10 transition-colors"
              >
                法人向け一括相談
              </Link>
            </div>
          </div>
        </section>

        {/* 関連ガイド */}
        <section className="mb-10">
          <h2 className="text-base text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>関連ガイド</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link href="/guide/how-to-choose" className="border border-border bg-white p-4 hover:border-ai/40 transition-colors group">
              <p className="text-sm text-sumi group-hover:text-ai transition-colors">畳業者の選び方 →</p>
              <p className="text-xs text-sumi/50 mt-0.5">見るべき5つのポイント</p>
            </Link>
            <Link href="/guide/estimate-checklist" className="border border-border bg-white p-4 hover:border-ai/40 transition-colors group">
              <p className="text-sm text-sumi group-hover:text-ai transition-colors">見積書チェックリスト →</p>
              <p className="text-xs text-sumi/50 mt-0.5">追加費用・業者への質問集</p>
            </Link>
          </div>
        </section>
      </div>

      <FAQSection items={faqs} title="旅館・寺社の畳工事に関するよくある質問" />

      <StickyBottomCTA
        primaryLabel="旅館・寺社対応業者に相談"
        primaryHref="/bulk-quote/new"
        secondaryLabel="法人向け一括相談"
        secondaryHref="/business/bulk-request"
      />
    </div>
  );
}
