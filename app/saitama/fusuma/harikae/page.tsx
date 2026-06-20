import type { Metadata } from "next";
import SeoLandingPage from "@/components/marketplace/SeoLandingPage";
import { MOCK_PROVIDERS } from "@/data/providers";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "埼玉のふすま張替え業者を比較｜料金・口コミ",
  description:
    "埼玉県のふすま（襖）張替えに対応する業者を料金・口コミ・対応エリアで比較。畳とあわせて和室まわりをまとめて依頼できる業者も掲載。無料で見積もり依頼ができます。",
  path: "/saitama/fusuma/harikae",
});

export default function Page() {
  const providers = MOCK_PROVIDERS.filter((p) => p.status === "active")
    .filter((p) => p.strengths?.some((s) => s.includes("ふすま")) || p.licenses?.some((l) => l.includes("表具")) || p.acceptsRyokan)
    .sort((a, b) => (a.rank ?? 99) - (b.rank ?? 99))
    .slice(0, 8);

  return (
    <SeoLandingPage
      path="/saitama/fusuma/harikae"
      breadcrumbs={[
        { label: "トップ", href: "/" },
        { label: "埼玉県", href: "/saitama" },
        { label: "ふすま張替え" },
      ]}
      h1="埼玉県のふすま張替え — 料金比較・業者一覧"
      lead="埼玉県でふすま（襖）の張替えに対応する業者を、料金・口コミ・対応エリアで比較できます。汚れ・破れ・日焼けが気になるふすまを一新。畳・障子とあわせて和室まわりをまとめて依頼することもできます。"
      priceRows={[
        { label: "ふすま張替え（普及品）", price: "3,500円〜/枚", note: "量産紙" },
        { label: "ふすま張替え（中級）", price: "5,000円〜/枚", note: "上質紙" },
        { label: "ふすま新調", price: "8,000円〜/枚", note: "枠ごと交換" },
        { label: "引手交換", price: "500円〜/個", note: "デザイン変更可" },
      ]}
      providers={providers}
      searchHref="/search"
      faqs={[
        { question: "ふすま1枚だけでも依頼できますか？", answer: "枚数が少なくても対応する業者があります。出張費の扱いを含め、見積もり時にご確認ください。" },
        { question: "ふすまと畳をまとめて頼めますか？", answer: "畳・ふすま・障子をまとめて対応する業者が掲載されています。和室全体の統一感を出したい場合におすすめです。" },
        { question: "張替えと新調はどう違いますか？", answer: "張替えは枠を残して紙だけ替える工事、新調は枠ごと作り替える工事です。反りや破損が大きい場合は新調を検討します。" },
        { question: "どのくらいで仕上がりますか？", answer: "枚数によりますが、持ち帰り作業の場合は数日、現場張りの場合は当日で仕上がることもあります。" },
        { question: "デザインは選べますか？", answer: "無地・柄物・和紙調など、さまざまな紙を選べます。引手の交換も可能です。サンプルを持参する業者もあります。" },
      ]}
      nearbyLinks={[
        { label: "障子張替え", href: "/saitama/shoji/harikae" },
        { label: "和室リフォーム", href: "/saitama/washitsu/reform" },
        { label: "畳表替え", href: "/saitama/tatami/omotegae" },
      ]}
    />
  );
}
