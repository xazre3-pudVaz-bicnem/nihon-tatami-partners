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
  sunakabe: {
    slug: "sunakabe",
    name: "砂壁・聚楽壁の塗り替え",
    lead:
      "埼玉県で砂壁・聚楽壁の塗り替えに対応する業者を料金・口コミで比較できます。剥がれ・ひび・汚れが気になる砂壁や聚楽壁を、塗り替えで美しく仕上げます。和室のリフォームとあわせてご相談ください。",
    priceRows: [
      { label: "砂壁塗り替え（標準）", price: "15,000円〜/室", note: "面積・状態により変動" },
      { label: "聚楽壁塗り替え", price: "20,000円〜/室", note: "下地処理費を含む場合あり" },
      { label: "クロスへの変更", price: "25,000円〜/室", note: "下地処理が別途必要な場合あり" },
    ],
    faqs: [
      {
        question: "砂壁の塗り替えと貼り替えはどちらがいいですか？",
        answer:
          "砂壁の状態によります。ひびや剥落が軽微であれば塗り替えが費用を抑えられます。下地が大きく傷んでいる場合はクロスへの変更も選択肢になります。概算は業者の見積もりでご確認ください。",
      },
      {
        question: "塗り替えにかかる期間はどのくらいですか？",
        answer:
          "1室あたり1〜2日が目安です。乾燥時間が必要なため、内容によっては数日かかることがあります。",
      },
      {
        question: "砂壁からクロスへの変更も依頼できますか？",
        answer:
          "砂壁・聚楽壁からクロスへの変更に対応する業者があります。下地処理が必要になる場合があり、費用が変わります。見積もりでご確認ください。",
      },
    ],
  },
  akunuki: {
    slug: "akunuki",
    name: "白木あく洗い",
    lead:
      "埼玉県で白木のあく洗い（柱・鴨居・敷居の洗浄）に対応する業者を料金・口コミで比較できます。年月で黒ずんだ白木を専用薬剤で洗い、明るい木地に戻します。",
    priceRows: [
      { label: "白木あく洗い（1室）", price: "10,000円〜/室", note: "柱・鴨居・敷居含む" },
      { label: "広間・続き間", price: "20,000円〜/式", note: "面積・本数による" },
    ],
    faqs: [
      {
        question: "白木あく洗いとはどのような施工ですか？",
        answer:
          "経年で黒ずんだ白木（柱・鴨居・敷居など）を専用の薬剤で洗浄し、元の明るい木地に近い状態に戻す施工です。塗装ではなく洗浄のため、木の質感を保ちながら美しく仕上げます。",
      },
      {
        question: "施工後に塗装や保護剤は必要ですか？",
        answer:
          "施工後にワックスや保護剤を塗布することで、効果が長持ちします。業者によって対応が異なります。見積もり時にご確認ください。",
      },
      {
        question: "古民家の白木にも対応できますか？",
        answer:
          "古民家・歴史的建物の白木洗浄に対応する業者があります。状態によっては特殊な対応が必要になる場合があります。概算は業者の見積もりでご確認ください。",
      },
    ],
  },
  tokonoma: {
    slug: "tokonoma",
    name: "床の間リフォーム",
    lead:
      "埼玉県で床の間のリフォームに対応する業者を料金・口コミで比較できます。床の間の塗り替え・補修から、空間を活かしたリフォームまで、和室に詳しい業者に相談できます。",
    priceRows: [
      { label: "床の間リフォーム（基本）", price: "30,000円〜/式", note: "内容により変動" },
      { label: "床の間撤去・洋室化", price: "80,000円〜/式", note: "下地工事含む" },
      { label: "床板・框の補修", price: "15,000円〜/式", note: "状態による" },
    ],
    faqs: [
      {
        question: "床の間を収納スペースに変えることはできますか？",
        answer:
          "床の間を収納スペースに転用するリフォームに対応する業者があります。下地の状態によって費用が変わります。概算は業者の見積もりでご確認ください。",
      },
      {
        question: "床の間の框（かまち）が傷んでいますが補修できますか？",
        answer:
          "床の間の框や床板の補修に対応する業者があります。傷みの程度によって補修方法が異なります。",
      },
      {
        question: "和室リフォームとあわせて依頼できますか？",
        answer:
          "畳・ふすま・障子・壁の工事とあわせて床の間リフォームを依頼できる業者があります。まとめて依頼することで工期短縮が期待できます。",
      },
    ],
  },
  chashitsu: {
    slug: "chashitsu",
    name: "茶室の畳・和室工事",
    lead:
      "埼玉県で茶室の畳工事・和室工事に対応する業者を料金・口コミで比較できます。炉畳・貴人畳など特殊な仕様に対応できる、茶室施工の経験がある業者を探せます。",
    priceRows: [
      { label: "茶室畳（炉畳含む）", price: "20,000円〜/枚", note: "特殊仕様のため変動あり" },
      { label: "炉の切り方・炉壇工事", price: "50,000円〜/式", note: "要現地確認" },
      { label: "数寄屋・茶室の内装まとめ", price: "要見積もり", note: "現地確認のうえご提案" },
    ],
    faqs: [
      {
        question: "茶室の炉畳を依頼できますか？",
        answer:
          "茶室の炉畳・炉の切り方に対応する業者があります。特殊な寸法や納まりへの対応が必要なため、専門知識を持つ業者への依頼をおすすめします。",
      },
      {
        question: "茶室の畳のサイズは特殊ですか？",
        answer:
          "茶室の畳は本間サイズや特殊な寸法になることがあります。現地採寸が必要な場合があります。概算は業者の見積もりでご確認ください。",
      },
      {
        question: "茶室のリフォームをまとめて依頼できますか？",
        answer:
          "茶室の畳工事に加え、壁・ふすま・障子・腰板など和室まわりをまとめて依頼できる業者があります。専門の施工経験を持つ業者に相談することをおすすめします。",
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
      title: "和室工事 | 埼玉県",
      description: "埼玉県の和室工事業者を料金・口コミで比較。",
      path: "/saitama/washitsu",
    });
  return createMetadata({
    title: `埼玉県の${def.name}業者を料金・口コミで比較`,
    description: `埼玉県で${def.name}に対応する業者を料金・口コミ・対応エリアで比較。さいたま市・川口市・川越市ほか全域対応。無料で見積もり依頼ができます。`,
    path: `/saitama/washitsu/${def.slug}`,
  });
}

const NEARBY = [
  { label: "和室リフォーム", href: "/saitama/washitsu/reform" },
  { label: "砂壁・聚楽壁の塗り替え", href: "/saitama/washitsu/sunakabe" },
  { label: "白木あく洗い", href: "/saitama/washitsu/akunuki" },
  { label: "床の間リフォーム", href: "/saitama/washitsu/tokonoma" },
  { label: "茶室の畳・和室工事", href: "/saitama/washitsu/chashitsu" },
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
      path={`/saitama/washitsu/${def.slug}`}
      breadcrumbs={[
        { label: "トップ", href: "/" },
        { label: "埼玉県", href: "/saitama" },
        { label: "和室工事", href: "/saitama/washitsu" },
        { label: def.name },
      ]}
      h1={`埼玉県の${def.name} — 料金比較・業者一覧`}
      lead={def.lead}
      priceRows={def.priceRows}
      providers={providers}
      searchHref="/search?category=washitsu"
      faqs={def.faqs}
      nearbyLinks={NEARBY.filter((n) => n.href !== `/saitama/washitsu/${def.slug}`)}
      nearbyTitle="ほかの和室工事から探す"
    />
  );
}
