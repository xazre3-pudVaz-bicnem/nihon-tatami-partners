import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SeoLandingPage, { type SeoPriceRow } from "@/components/marketplace/SeoLandingPage";
import { MOCK_PROVIDERS } from "@/data/providers";
import { createMetadata } from "@/lib/metadata";
import type { Provider } from "@/lib/types";

interface CategoryDef {
  slug: string;
  name: string;
  lead: string;
  priceRows: SeoPriceRow[];
  filter?: (p: Provider) => boolean;
  faqExtra?: { question: string; answer: string }[];
}

const CATEGORIES: Record<string, CategoryDef> = {
  omotegae: {
    slug: "omotegae",
    name: "畳表替え",
    lead:
      "埼玉県で畳の表替えに対応する業者を、料金・口コミ・対応エリアで比較できます。色あせや毛羽立ちが気になってきた畳を、畳床はそのままに畳表だけ新しく張り替えます。",
    priceRows: [
      { label: "中国産い草", price: "3,200円〜/枚", note: "コストを抑えたい場合" },
      { label: "国産い草", price: "5,800円〜/枚", note: "香り・耐久性のバランス" },
      { label: "和紙畳", price: "5,800円〜/枚", note: "色あせ・ダニに強い" },
      { label: "琉球畳（縁なし）", price: "9,000円〜/枚", note: "モダンな和空間に" },
    ],
  },
  uragaeshi: {
    slug: "uragaeshi",
    name: "畳裏返し",
    lead:
      "埼玉県で畳の裏返しに対応する業者を比較できます。新調・表替えから3〜5年で、畳表の裏面がまだきれいな場合に費用を抑えられる工事です。1枚につき1回まで。",
    priceRows: [
      { label: "裏返し", price: "2,500円〜/枚", note: "1枚につき1回まで" },
      { label: "（参考）表替え", price: "3,200円〜/枚", note: "裏面も傷んでいる場合" },
    ],
  },
  shinchou: {
    slug: "shinchou",
    name: "畳新調",
    lead:
      "埼玉県で畳の新調に対応する業者を比較できます。畳床から新しく作り替える工事で、15〜20年以上使った畳や、踏むと沈む・床が傷んだ畳の入れ替えに適しています。",
    priceRows: [
      { label: "新調（中国産い草）", price: "8,000円〜/枚", note: "建材床" },
      { label: "新調（国産い草）", price: "12,000円〜/枚", note: "い草グレードで変動" },
      { label: "古畳処分", price: "500円〜/枚", note: "別途かかる場合あり" },
    ],
  },
  ryukyu: {
    slug: "ryukyu",
    name: "琉球畳",
    lead:
      "埼玉県で琉球畳・縁なし畳に対応する業者を比較できます。リビング隣接の和室やリノベーション物件に映える、市松敷きやカラーコーディネートのご相談も可能です。",
    priceRows: [
      { label: "琉球畳（半畳・縁なし）", price: "9,000円〜/枚", note: "市松敷きが人気" },
      { label: "カラー琉球畳", price: "10,000円〜/枚", note: "色の組み合わせ自由" },
    ],
    filter: (p) => p.startingPrice !== undefined && p.startingPrice >= 4000,
  },
  herinashi: {
    slug: "herinashi",
    name: "縁なし畳",
    lead:
      "埼玉県で縁なし畳に対応する業者を比較できます。縁（へり）のないすっきりとした畳で、和モダンな空間づくりに人気。割付の精度が仕上がりを左右します。",
    priceRows: [
      { label: "縁なし畳（半畳）", price: "9,000円〜/枚", note: "割付・採寸が重要" },
      { label: "縁なし畳（一畳）", price: "12,000円〜/枚", note: "—" },
    ],
  },
  washi: {
    slug: "washi",
    name: "和紙畳",
    lead:
      "埼玉県で和紙畳に対応する業者を比較できます。色あせしにくく、ダニ・カビに強いのが特長。小さなお子様やペットのいるご家庭、アレルギーが気になる方に選ばれています。",
    priceRows: [
      { label: "和紙畳（表替え）", price: "5,800円〜/枚", note: "豊富なカラー展開" },
      { label: "和紙畳（新調）", price: "13,000円〜/枚", note: "—" },
    ],
  },
  "kokusan-igusa": {
    slug: "kokusan-igusa",
    name: "国産い草畳",
    lead:
      "埼玉県で国産い草の畳に対応する業者を比較できます。熊本県八代産を中心とした国産い草は、香り・色・耐久性に優れています。産地・等級を明示する業者も掲載しています。",
    priceRows: [
      { label: "国産い草（普及品）", price: "5,800円〜/枚", note: "—" },
      { label: "国産い草（上等品）", price: "9,000円〜/枚", note: "香り・耐久性が高い" },
    ],
  },
  pet: {
    slug: "pet",
    name: "ペット対応畳",
    lead:
      "埼玉県でペット対応の畳（和紙畳・樹脂畳）に対応する業者を比較できます。傷や汚れ、臭いに強い素材で、猫や犬のいるご家庭でも長持ちする畳に。",
    priceRows: [
      { label: "和紙畳", price: "5,800円〜/枚", note: "汚れが落としやすい" },
      { label: "樹脂畳", price: "8,000円〜/枚", note: "耐水性が最も高い" },
    ],
  },
  color: {
    slug: "color",
    name: "カラー畳",
    lead:
      "埼玉県でカラー畳に対応する業者を比較できます。グリーン・ブルー・グレー・ブラウンなど豊富な色から選べます。和モダンなインテリアや子ども部屋にも人気です。",
    priceRows: [
      { label: "カラー畳（和紙素材）", price: "9,000円〜/枚", note: "色あせしにくい" },
      { label: "カラー畳（樹脂素材）", price: "10,000円〜/枚", note: "耐水性が高い" },
    ],
  },
  "anti-mite-mold": {
    slug: "anti-mite-mold",
    name: "ダニ・カビ対策畳",
    lead:
      "埼玉県でダニ・カビ対策畳に対応する業者を比較できます。抗菌・防ダニ加工を施した畳で、お子様や高齢者がいるご家庭、アレルギー対策として選ばれています。",
    priceRows: [
      { label: "和紙畳（防ダニ）", price: "8,000円〜/枚", note: "カビが発生しにくい" },
      { label: "樹脂畳（耐水）", price: "9,500円〜/枚", note: "水拭き可能" },
    ],
  },
  disposal: {
    slug: "disposal",
    name: "畳処分",
    lead:
      "埼玉県で古畳の回収・処分に対応する業者を比較できます。表替えや新調工事と合わせての対応も可能。自治体の粗大ごみ回収に出せない場合はご相談ください。",
    priceRows: [
      { label: "古畳処分（工事と同時）", price: "500円〜/枚", note: "業者によって無料の場合も" },
      { label: "古畳処分（回収のみ）", price: "2,000円〜/枚", note: "枚数・エリアによる" },
    ],
  },
  repair: {
    slug: "repair",
    name: "畳補修",
    lead:
      "埼玉県で畳の補修に対応する業者を比較できます。部分的な傷み・穴・凹みの補修。全体張替えではなく部分補修で費用を抑えたい方にも対応しています。",
    priceRows: [
      { label: "部分補修（小）", price: "3,000円〜/箇所", note: "小さな傷・へこみ" },
      { label: "部分補修（大）", price: "8,000円〜/箇所", note: "広範囲の傷みの場合" },
    ],
  },
  cleaning: {
    slug: "cleaning",
    name: "畳クリーニング",
    lead:
      "埼玉県で畳のクリーニング・消臭に対応する業者を比較できます。カビ除去・抗菌・臭い対策など。賃貸退去時の清掃や、ペットの臭いが気になる方に。",
    priceRows: [
      { label: "畳クリーニング（標準）", price: "2,000円〜/枚", note: "消臭・除菌込み" },
      { label: "カビ除去クリーニング", price: "4,000円〜/枚", note: "専門薬剤使用" },
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
  if (!def) return createMetadata({ title: "畳工事 | 埼玉", description: "埼玉県の畳工事業者を比較。", path: "/saitama/tatami" });
  return createMetadata({
    title: `埼玉の${def.name}業者を比較｜料金・口コミ`,
    description: `埼玉県の${def.name}に対応する畳店を料金・口コミ・対応エリアで比較。さいたま市・川口市・川越市ほか全域対応。無料で見積もり依頼ができます。`,
    path: `/saitama/tatami/${def.slug}`,
  });
}

const NEARBY = [
  { label: "畳表替え", href: "/saitama/tatami/omotegae" },
  { label: "畳裏返し", href: "/saitama/tatami/uragaeshi" },
  { label: "畳新調", href: "/saitama/tatami/shinchou" },
  { label: "琉球畳", href: "/saitama/tatami/ryukyu" },
  { label: "縁なし畳", href: "/saitama/tatami/herinashi" },
  { label: "和紙畳", href: "/saitama/tatami/washi" },
  { label: "国産い草畳", href: "/saitama/tatami/kokusan-igusa" },
  { label: "ペット対応畳", href: "/saitama/tatami/pet" },
];

export default async function Page({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const def = CATEGORIES[category];
  if (!def) notFound();

  const providers = MOCK_PROVIDERS.filter((p) => p.status === "active")
    .filter(def.filter ?? (() => true))
    .sort((a, b) => (a.rank ?? 99) - (b.rank ?? 99))
    .slice(0, 8);

  const faqs = [
    {
      question: `${def.name}の料金はいくらくらいですか？`,
      answer: "素材や畳の状態によって変わります。料金表は一般的な目安です。正確な金額は各業者の見積もりでご確認ください。",
    },
    {
      question: `${def.name}はどのくらいの日数で終わりますか？`,
      answer: "枚数や内容によりますが、一般住宅の数畳であれば即日〜1日で完了することが多いです。枚数が多い場合は複数日かかることがあります。",
    },
    {
      question: "家具の移動は必要ですか？",
      answer: "家具移動に対応している業者もあります。対応可否や追加費用の有無は見積もり時にご確認ください。",
    },
    {
      question: "古い畳の処分はしてもらえますか？",
      answer: "新調時など、古畳の処分に対応している業者があります。処分費用がかかる場合があります。",
    },
    {
      question: "賃貸物件でも依頼できますか？",
      answer: "賃貸の原状回復に対応する業者も掲載しています。管理会社・オーナー様からのご依頼も承れます。",
    },
  ];

  return (
    <SeoLandingPage
      path={`/saitama/tatami/${def.slug}`}
      breadcrumbs={[
        { label: "トップ", href: "/" },
        { label: "埼玉県", href: "/saitama" },
        { label: "畳工事", href: "/saitama/tatami" },
        { label: def.name },
      ]}
      h1={`埼玉県の${def.name} — 料金比較・業者一覧`}
      lead={def.lead}
      priceRows={def.priceRows}
      providers={providers}
      searchHref="/search?category=tatami"
      faqs={faqs}
      nearbyLinks={NEARBY.filter((n) => n.href !== `/saitama/tatami/${def.slug}`)}
      nearbyTitle="ほかの畳工事から探す"
    />
  );
}
