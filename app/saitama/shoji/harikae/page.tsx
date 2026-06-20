import type { Metadata } from "next";
import SeoLandingPage from "@/components/marketplace/SeoLandingPage";
import { MOCK_PROVIDERS } from "@/data/providers";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "埼玉の障子張替え業者を比較｜料金・口コミ",
  description:
    "埼玉県の障子（しょうじ）張替えに対応する業者を料金・口コミ・対応エリアで比較。破れ・黄ばみが気になる障子を一新。畳・ふすまとまとめて依頼できる業者も掲載。無料見積もり。",
  path: "/saitama/shoji/harikae",
});

export default function Page() {
  const providers = MOCK_PROVIDERS.filter((p) => p.status === "active")
    .filter((p) => p.strengths?.some((s) => s.includes("障子") || s.includes("ふすま")) || p.licenses?.some((l) => l.includes("表具")) || p.acceptsRyokan)
    .sort((a, b) => (a.rank ?? 99) - (b.rank ?? 99))
    .slice(0, 8);

  return (
    <SeoLandingPage
      path="/saitama/shoji/harikae"
      breadcrumbs={[
        { label: "トップ", href: "/" },
        { label: "埼玉県", href: "/saitama" },
        { label: "障子張替え" },
      ]}
      h1="埼玉県の障子張替え — 料金比較・業者一覧"
      lead="埼玉県で障子（しょうじ）の張替えに対応する業者を、料金・口コミ・対応エリアで比較できます。破れ・黄ばみ・たるみが気になる障子を一新。畳・ふすまとあわせて和室まわりをまとめて依頼することもできます。"
      priceRows={[
        { label: "障子張替え（普及品）", price: "2,500円〜/枚", note: "量産紙" },
        { label: "障子張替え（強化紙）", price: "3,500円〜/枚", note: "破れにくい" },
        { label: "障子張替え（プラスチック）", price: "4,000円〜/枚", note: "ペット・子ども向け" },
        { label: "障子枠の補修", price: "要見積もり", note: "状態による" },
      ]}
      providers={providers}
      searchHref="/search"
      faqs={[
        { question: "障子1枚だけでも頼めますか？", answer: "枚数が少なくても対応する業者があります。出張費の扱いも含め、見積もり時にご確認ください。" },
        { question: "破れにくい障子紙はありますか？", answer: "強化紙やプラスチック障子など、破れにくい素材があります。小さなお子様やペットのいるご家庭におすすめです。" },
        { question: "畳・ふすまもまとめて依頼できますか？", answer: "畳・ふすま・障子を一括対応する業者が掲載されています。和室全体をまとめて整えたい場合に便利です。" },
        { question: "どのくらいで仕上がりますか？", answer: "枚数によりますが、現場張りで当日、持ち帰りの場合は数日で仕上がることが多いです。" },
        { question: "枠が傷んでいても張替えできますか？", answer: "枠の状態によっては補修や交換が必要な場合があります。現地確認のうえご提案します。" },
      ]}
      nearbyLinks={[
        { label: "ふすま張替え", href: "/saitama/fusuma/harikae" },
        { label: "和室リフォーム", href: "/saitama/washitsu/reform" },
        { label: "畳表替え", href: "/saitama/tatami/omotegae" },
      ]}
    />
  );
}
