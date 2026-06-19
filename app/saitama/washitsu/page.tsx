import type { Metadata } from "next";
import CategoryGroupPage from "@/components/marketplace/CategoryGroupPage";
import { CATEGORY_CONFIGS } from "@/config/categories";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "埼玉県の和室リフォーム｜砂壁・茶室・和室工事の業者比較",
  description:
    "埼玉県の和室リフォーム業者を料金・口コミで比較。畳・ふすま・障子・砂壁・聚楽壁・茶室まで対応。和室を洋室にするリフォームも。無料見積もり。",
  path: "/saitama/washitsu",
});

export default function SaitamaWashitsuPage() {
  const categories = CATEGORY_CONFIGS.filter((c) => c.group === "washitsu");
  return (
    <CategoryGroupPage
      groupLabel="和室リフォーム"
      groupSlug="washitsu"
      lead="埼玉県の和室リフォーム業者を料金・口コミで比較できます。畳・ふすま・障子・砂壁・聚楽壁から茶室の特殊工事まで、和室を活かすリフォームを提案します。"
      categories={categories}
      faqs={[
        { question: "和室リフォームの費用相場は？", answer: "内容により幅があります。畳・建具の張替え中心なら5万円〜、砂壁の塗り替えや床の間改修を含むと15万円〜が目安です。" },
        { question: "和室を洋室にすることもできますか？", answer: "対応する業者があります。畳をフローリングに、砂壁を壁紙に変更するなど、用途に合わせた提案が可能です。見積もり時にご相談ください。" },
        { question: "茶室の畳工事にも対応していますか？", answer: "炉切りや特殊寸法に対応できる経験豊富な業者が掲載されています。茶室・茶道向けの仕様もご相談ください。" },
      ]}
    />
  );
}
