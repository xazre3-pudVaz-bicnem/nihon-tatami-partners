import type { Metadata } from "next";
import SeoLandingPage from "@/components/marketplace/SeoLandingPage";
import { MOCK_PROVIDERS } from "@/data/providers";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "埼玉の和室リフォーム業者を比較｜畳・ふすま・障子・壁",
  description:
    "埼玉県の和室リフォーム（畳・ふすま・障子・砂壁）に対応する業者を料金・口コミで比較。古くなった和室をまとめて一新。1社で対応できる業者を一覧から探せます。無料見積もり。",
  path: "/saitama/washitsu/reform",
});

export default function Page() {
  const providers = MOCK_PROVIDERS.filter((p) => p.status === "active")
    .filter((p) => p.strengths?.some((s) => s.includes("リフォーム") || s.includes("ふすま") || s.includes("和室")) || p.licenses?.some((l) => l.includes("表具") || l.includes("内装")))
    .sort((a, b) => (a.rank ?? 99) - (b.rank ?? 99))
    .slice(0, 8);

  return (
    <SeoLandingPage
      path="/saitama/washitsu/reform"
      breadcrumbs={[
        { label: "トップ", href: "/" },
        { label: "埼玉県", href: "/saitama" },
        { label: "和室リフォーム" },
      ]}
      h1="埼玉県の和室リフォーム — 料金比較・業者一覧"
      lead="埼玉県で和室リフォーム（畳・ふすま・障子・砂壁）に対応する業者を、料金・口コミ・対応エリアで比較できます。畳の表替えからふすま・障子の張替え、砂壁・聚楽壁の塗り替えまで、1社でまとめて依頼できる業者も掲載しています。"
      intro={
        <>
          <p>和室リフォームは、畳・ふすま・障子・壁を別々の業者に頼むと、見積もりや日程の調整が煩雑になりがちです。畳店のなかには、表具や内装まで一括で対応できる業者があり、まとめて依頼することで工期短縮と統一感のある仕上がりが期待できます。</p>
          <p>古くなった和室を上質な空間によみがえらせたい方、洋室から和室化したい方、リノベーションの一部として和室を整えたい方に向いています。</p>
        </>
      }
      priceRows={[
        { label: "畳表替え", price: "3,200円〜/枚", note: "素材で変動" },
        { label: "ふすま張替え", price: "3,500円〜/枚", note: "—" },
        { label: "障子張替え", price: "2,500円〜/枚", note: "—" },
        { label: "砂壁・聚楽壁の塗り替え", price: "要見積もり", note: "面積による" },
        { label: "和室6畳まるごと（目安）", price: "120,000円〜", note: "内容により変動" },
      ]}
      providers={providers}
      searchHref="/search"
      faqs={[
        { question: "畳・ふすま・障子をまとめて頼めますか？", answer: "和室まわりを一括対応する業者が掲載されています。窓口が一つになり、日程調整や仕上がりの統一がしやすくなります。" },
        { question: "和室6畳のリフォーム費用の目安は？", answer: "内容によりますが、畳・ふすま・障子・壁まで含めて12万円〜が一つの目安です。正確な金額は見積もりでご確認ください。" },
        { question: "工期はどのくらいですか？", answer: "内容によりますが、数日〜1週間程度が目安です。壁の塗り替えを含む場合は乾燥期間が必要になることがあります。" },
        { question: "洋室を和室にすることはできますか？", answer: "下地の状態によりますが、和室化に対応する業者もあります。現地確認のうえご提案します。" },
        { question: "砂壁の塗り替えもできますか？", answer: "砂壁・聚楽壁の塗り替えに対応する業者があります。和室リフォームとあわせてご相談ください。" },
      ]}
      nearbyLinks={[
        { label: "畳表替え", href: "/saitama/tatami/omotegae" },
        { label: "ふすま張替え", href: "/saitama/fusuma/harikae" },
        { label: "障子張替え", href: "/saitama/shoji/harikae" },
      ]}
    />
  );
}
