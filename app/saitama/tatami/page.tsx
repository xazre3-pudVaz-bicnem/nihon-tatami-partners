import type { Metadata } from "next";
import CategoryGroupPage from "@/components/marketplace/CategoryGroupPage";
import { CATEGORY_CONFIGS } from "@/config/categories";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "埼玉県の畳工事｜表替え・新調・裏返しの業者比較",
  description:
    "埼玉県の畳工事（表替え・新調・裏返し・琉球畳・和紙畳など）の業者を料金・口コミで比較。さいたま市・川口市・川越市ほか全域対応。無料見積もり。",
  path: "/saitama/tatami",
});

export default function SaitamaTatamiPage() {
  const categories = CATEGORY_CONFIGS.filter((c) => c.group === "tatami");
  return (
    <CategoryGroupPage
      groupLabel="畳工事"
      groupSlug="tatami"
      lead="埼玉県全域の畳店を、料金・口コミ・対応エリアで比較できます。表替え・新調・裏返しから琉球畳・和紙畳・カラー畳まで、住宅・旅館・寺社・賃貸物件に対応。"
      categories={categories}
      faqs={[
        { question: "畳の表替え・裏返し・新調の違いは？", answer: "裏返しは畳表をひっくり返して再利用、表替えは畳表を新しく張り替え、新調は畳床ごと作り替える工事です。畳の年数と状態で選びます。" },
        { question: "埼玉県内ならどこでも対応していますか？", answer: "業者ごとに対応エリアが異なります。市区町村を指定して検索すると、そのエリアに対応する畳店を絞り込めます。" },
        { question: "畳1枚の表替えはいくらくらい？", answer: "普及品で3,800円〜、国産い草で6,000円〜、特選品で9,000円〜が目安です。素材と状態により変動します。" },
      ]}
    />
  );
}
