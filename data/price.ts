import type { PriceItem } from "@/lib/types";

export const TATAMI_PRICES: PriceItem[] = [
  {
    name: "畳裏返し",
    unit: "1枚あたり",
    priceLabel: "3,500円〜",
    note: "使用3〜5年が目安。素材・状態により変動",
  },
  {
    name: "畳表替え（い草）",
    unit: "1枚あたり",
    priceLabel: "5,000円〜",
    note: "い草のグレードにより変動",
  },
  {
    name: "畳表替え（和紙畳）",
    unit: "1枚あたり",
    priceLabel: "9,000円〜",
    note: "カラー・グレードにより変動",
  },
  {
    name: "畳表替え（樹脂畳）",
    unit: "1枚あたり",
    priceLabel: "8,000円〜",
    note: "素材・グレードにより変動",
  },
  {
    name: "畳表替え（琉球畳・縁なし）",
    unit: "1枚あたり（半畳）",
    priceLabel: "8,000円〜",
    note: "七島い草・目積表など素材により変動",
  },
  {
    name: "畳新調（稲わら床）",
    unit: "1枚あたり",
    priceLabel: "20,000円〜",
    note: "サイズ・素材により変動",
  },
  {
    name: "畳新調（建材床）",
    unit: "1枚あたり",
    priceLabel: "15,000円〜",
    note: "インシュレーション・スタイロフォームなど",
  },
  {
    name: "縁なし畳（新調）",
    unit: "1枚（半畳）あたり",
    priceLabel: "15,000円〜",
    note: "素材・サイズにより変動",
  },
];

export const INTERIOR_PRICES: PriceItem[] = [
  {
    name: "クロス張替え（壁紙）",
    unit: "1m²あたり",
    priceLabel: "800円〜",
    note: "素材・グレードにより変動",
  },
  {
    name: "フローリング張替え",
    unit: "1m²あたり",
    priceLabel: "5,000円〜",
    note: "素材・下地状態により変動",
  },
  {
    name: "クッションフロア張替え",
    unit: "1m²あたり",
    priceLabel: "2,500円〜",
    note: "素材・グレードにより変動",
  },
  {
    name: "フロアタイル張替え",
    unit: "1m²あたり",
    priceLabel: "3,000円〜",
    note: "素材・デザインにより変動",
  },
  {
    name: "障子張替え",
    unit: "1枚あたり",
    priceLabel: "2,500円〜",
    note: "素材・サイズにより変動",
  },
  {
    name: "襖張替え",
    unit: "1枚あたり",
    priceLabel: "3,500円〜",
    note: "素材・デザインにより変動",
  },
  {
    name: "網戸張替え",
    unit: "1枚あたり",
    priceLabel: "2,000円〜",
    note: "サイズにより変動",
  },
];

export const RESTORATION_PRICES: PriceItem[] = [
  {
    name: "原状回復（1K・畳+クロス）",
    unit: "1物件あたり",
    priceLabel: "30,000円〜",
    note: "物件規模・工事内容により変動",
  },
  {
    name: "原状回復（1LDK）",
    unit: "1物件あたり",
    priceLabel: "60,000円〜",
    note: "物件規模・工事内容により変動",
  },
  {
    name: "法人向け・複数物件",
    unit: "個別見積もり",
    priceLabel: "要相談",
    note: "継続取引の場合は料金体系をご相談ください",
  },
];

export const PRICE_NOTES = [
  "上記価格はすべて税別の目安金額です。消費税が別途かかります。",
  "現場の状況・素材のグレード・枚数・作業内容により金額は変動します。",
  "正確な金額は現地確認後にお見積もりします。見積もりは無料です。",
  "法人・管理会社・大量発注の場合は個別にご相談ください。",
  "離島・遠距離の場合は別途交通費・出張費が発生する場合があります。",
];
