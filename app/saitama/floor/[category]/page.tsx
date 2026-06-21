import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SeoLandingPage, { type SeoPriceRow } from "@/components/marketplace/SeoLandingPage";
import { MOCK_PROVIDERS } from "@/data/providers";
import { createMetadata } from "@/lib/metadata";

interface CategoryDef {
  slug: string;
  name: string;
  lead: string;
  priceRows: SeoPriceRow[];
  faqs: { question: string; answer: string }[];
}

const CATEGORIES: Record<string, CategoryDef> = {
  "cushion-floor": {
    slug: "cushion-floor",
    name: "クッションフロア張替え",
    lead:
      "埼玉県でクッションフロアの張替えに対応する業者を料金・口コミで比較できます。賃貸の原状回復から洗面所・トイレ・キッチンの床リフォームまで、幅広い用途に対応する業者を探せます。",
    priceRows: [
      { label: "クッションフロア張替え", price: "3,000円〜/m²", note: "材料費・施工費込みの目安" },
      { label: "既存床の撤去費", price: "500円〜/m²", note: "状態により変動" },
    ],
    faqs: [
      {
        question: "クッションフロアとフローリングの違いは何ですか？",
        answer:
          "クッションフロアはシート状の床材で、防水性・クッション性があり、比較的安価に施工できます。フローリングは木質の板材で耐久性が高く、高級感があります。用途や予算にあわせて選択できます。",
      },
      {
        question: "賃貸物件の退去時にクッションフロアの張替えを依頼できますか？",
        answer:
          "賃貸の原状回復（クッションフロア張替え）に対応する業者があります。管理会社・オーナーからのご依頼にも対応できます。概算は見積もりでご確認ください。",
      },
      {
        question: "クッションフロアの張替えにかかる期間は？",
        answer:
          "1部屋あたり半日〜1日が目安です。既存床の撤去・下地処理が必要な場合は追加の時間がかかります。",
      },
    ],
  },
  repair: {
    slug: "repair",
    name: "フローリング補修",
    lead:
      "埼玉県でフローリングの補修に対応する業者を料金・口コミで比較できます。傷・凹み・剥がれ・軋みなど、部分的な補修で全面張替えを避けたい方に向いています。賃貸物件の退去時の補修にも対応。",
    priceRows: [
      { label: "フローリング補修（1箇所）", price: "5,000円〜/箇所", note: "傷・凹みの目安" },
      { label: "フローリング補修（広範囲）", price: "15,000円〜/式", note: "状態により変動" },
      { label: "床鳴り・軋みの補修", price: "10,000円〜/箇所", note: "原因・構造による" },
    ],
    faqs: [
      {
        question: "フローリングの傷はどこまで補修できますか？",
        answer:
          "小さな傷や凹みであれば充填剤・補修剤で目立たなくする補修が可能です。傷の深さや広さによって仕上がりが異なります。現地確認のうえご提案します。",
      },
      {
        question: "賃貸退去時のフローリング補修も対応できますか？",
        answer:
          "賃貸物件の退去時のフローリング補修に対応する業者があります。敷金精算に関わる補修の概算も業者にご確認ください。",
      },
      {
        question: "床鳴りの補修もできますか？",
        answer:
          "床鳴り・軋みの補修に対応する業者があります。原因（フローリング材の乾燥・下地の問題など）によって対処方法が異なります。現地確認が必要な場合があります。",
      },
    ],
  },
};

const CATEGORY_SLUGS = Object.keys(CATEGORIES);

export function generateStaticParams() {
  return CATEGORY_SLUGS.map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const def = CATEGORIES[category];
  if (!def)
    return createMetadata({
      title: "床工事 | 埼玉県",
      description: "埼玉県の床工事業者を料金・口コミで比較。",
      path: "/saitama/floor",
    });
  return createMetadata({
    title: `埼玉県の${def.name}業者を料金・口コミで比較`,
    description: `埼玉県で${def.name}に対応する業者を料金・口コミ・対応エリアで比較。さいたま市・川口市・川越市ほか全域対応。無料で見積もり依頼ができます。`,
    path: `/saitama/floor/${def.slug}`,
  });
}

const NEARBY = [
  { label: "クッションフロア張替え", href: "/saitama/floor/cushion-floor" },
  { label: "フローリング補修", href: "/saitama/floor/repair" },
  { label: "クロス張替え", href: "/saitama/cross/harikae" },
  { label: "空室対策リフォーム", href: "/saitama/vacancy-reform" },
];

export default async function Page({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const def = CATEGORIES[category];
  if (!def) notFound();

  const providers = MOCK_PROVIDERS.filter((p) => p.status === "active")
    .sort((a, b) => (a.rank ?? 99) - (b.rank ?? 99))
    .slice(0, 6);

  return (
    <SeoLandingPage
      path={`/saitama/floor/${def.slug}`}
      breadcrumbs={[
        { label: "トップ", href: "/" },
        { label: "埼玉県", href: "/saitama" },
        { label: "内装・原状回復", href: "/saitama" },
        { label: def.name },
      ]}
      h1={`埼玉県の${def.name} — 料金比較・業者一覧`}
      lead={def.lead}
      priceRows={def.priceRows}
      providers={providers}
      searchHref="/search?category=floor"
      faqs={def.faqs}
      nearbyLinks={NEARBY.filter((n) => n.href !== `/saitama/floor/${def.slug}`)}
      nearbyTitle="関連する工事から探す"
    />
  );
}
