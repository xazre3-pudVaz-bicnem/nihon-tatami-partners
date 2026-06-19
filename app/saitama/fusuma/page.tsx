import type { Metadata } from "next";
import CategoryGroupPage from "@/components/marketplace/CategoryGroupPage";
import { CATEGORY_CONFIGS } from "@/config/categories";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "埼玉県のふすま・障子・網戸張替え｜業者比較",
  description:
    "埼玉県のふすま張替え・障子張替え・網戸張替えの業者を料金・口コミで比較。1枚から対応・即日対応の業者も。さいたま市ほか全域対応、無料見積もり。",
  path: "/saitama/fusuma",
});

export default function SaitamaFusumaPage() {
  const categories = CATEGORY_CONFIGS.filter((c) => c.group === "fusuma" || c.group === "shoji" || c.slug === "amido-harikae");
  return (
    <CategoryGroupPage
      groupLabel="ふすま・障子・網戸"
      groupSlug="fusuma"
      lead="埼玉県のふすま・障子・網戸の張替え業者を料金・口コミで比較できます。1枚からの依頼や、畳の表替えと併せた和室まるごとリフレッシュにも対応。"
      categories={categories}
      faqs={[
        { question: "ふすま1枚の張替え費用は？", answer: "量産品で3,500円〜、上等な織物ふすま紙で6,000円〜が目安です。枚数・絵柄により変動します。" },
        { question: "障子は破れていなくても張替えできますか？", answer: "もちろん可能です。日焼けによる変色や数年経過した障子紙は、貼り替えると一気に明るく清潔になります。" },
        { question: "ふすま・障子・畳をまとめて依頼できますか？", answer: "対応可能です。和室まるごとの張替えはまとめて依頼すると効率的で、出張費も抑えられる場合があります。" },
      ]}
    />
  );
}
