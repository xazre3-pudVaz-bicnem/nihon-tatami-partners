import type { Metadata } from "next";
import SeoLandingPage from "@/components/marketplace/SeoLandingPage";
import { MOCK_PROVIDERS } from "@/data/providers";
import { createMetadata } from "@/lib/metadata";
import { RYOKAN_IMAGES } from "@/data/platformImages";

export const metadata: Metadata = createMetadata({
  title: "旅館・宿泊施設向け 畳張替え業者を比較｜埼玉",
  description:
    "埼玉県で旅館・宿泊施設の客室畳の張替えに対応する業者を比較。耐久性の高い素材選びやオフシーズンの一括施工、複数室の同時対応に応じる業者を一覧から探せます。無料見積もり。",
  path: "/saitama/ryokan/tatami",
});

export default function Page() {
  const providers = MOCK_PROVIDERS.filter((p) => p.status === "active")
    .filter((p) => p.acceptsRyokan)
    .sort((a, b) => (a.rank ?? 99) - (b.rank ?? 99))
    .slice(0, 8);

  return (
    <SeoLandingPage
      path="/saitama/ryokan/tatami"
      heroImage={RYOKAN_IMAGES[0]}
      breadcrumbs={[
        { label: "トップ", href: "/" },
        { label: "埼玉県", href: "/saitama" },
        { label: "旅館・宿泊施設向け畳張替え" },
      ]}
      h1="埼玉県の旅館・宿泊施設向け 客室畳の張替え"
      lead="埼玉県で旅館・宿泊施設の客室畳の張替えに対応する業者を、料金・口コミ・対応エリアで比較できます。耐久性の高い素材選びやオフシーズンの一括施工、複数室の同時対応に応じる業者を掲載しています。"
      intro={
        <p>旅館の客室畳は、宿泊客が最初に触れる床面です。踏み心地・香り・清潔感は宿泊体験の質に直結し、口コミ評価にも影響します。客室は一般住宅より消耗が早いため、耐久性の高い素材選びと、オフシーズンを活用した計画的な一括施工が効率的です。</p>
      }
      priceRows={[
        { label: "客室畳 表替え（い草）", price: "4,000円〜/枚", note: "枚数で相談可" },
        { label: "客室畳 表替え（耐久素材）", price: "6,000円〜/枚", note: "高稼働の客室向け" },
        { label: "琉球畳・縁なし", price: "9,000円〜/枚", note: "和モダンの客室に" },
        { label: "複数室まとめて", price: "要見積もり", note: "オフシーズン一括施工" },
      ]}
      providers={providers}
      providersTitle="旅館・宿泊施設対応の業者"
      searchHref="/search?acceptsRyokan=true"
      faqs={[
        { question: "全客室をまとめて施工できますか？", answer: "複数職人で並行施工し、短期間で全室対応する業者があります。客室数と素材に応じてスケジュールを提案します。" },
        { question: "営業に影響しないよう施工できますか？", answer: "予約状況に合わせて空き室から順に施工するなど、営業への影響を抑える計画を立てられる業者があります。" },
        { question: "耐久性の高い素材はありますか？", answer: "踏み込みの多い客室には、耐久性の高い素材や樹脂畳が向いています。温泉旅館など湿気の多い環境にも対応できます。" },
        { question: "繁忙期前に間に合わせたいのですが？", answer: "オフシーズンを活用した計画的な施工がおすすめです。希望時期を伝えてスケジュールをご相談ください。" },
        { question: "施工報告書はもらえますか？", answer: "写真付きの施工報告書を提出する業者があります。施設の記録管理にご活用いただけます。" },
      ]}
      nearbyLinks={[
        { label: "旅館・宿泊施設向け（詳細）", href: "/for-ryokan" },
        { label: "寺院向け", href: "/saitama/temple/tatami" },
        { label: "神社向け", href: "/saitama/shrine/tatami" },
      ]}
    />
  );
}
