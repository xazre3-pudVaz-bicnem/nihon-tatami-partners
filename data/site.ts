export const SITE_CONFIG = {
  name: "日本畳パートナーズ",
  nameEn: "Nihon Tatami Partners",
  tagline: "畳から、空間の価値を整える。",
  subTagline: "住宅・旅館・寺社・店舗まで。畳と内装の専門パートナー。",
  description:
    "畳の表替え・裏返し・新調から内装工事・原状回復まで。住宅・旅館・寺社・店舗・賃貸物件に幅広く対応する畳・内装の専門パートナーです。",
  tel: "0120-XXX-XXX",
  telRaw: "0120XXXXXX",
  email: "info@nihontatami.jp",
  line: "https://lin.ee/XXXXXX",
  hours: "平日 9:00〜18:00（土曜応相談）",
  area: "対応エリアはお問い合わせください",
  areaNote: "※エリア外もご相談ください",
  address: "（住所は後日更新）",
  postalCode: "〒XXX-XXXX",
  social: {
    instagram: "",
    twitter: "",
  },
} as const;

export const NAV_ITEMS = [
  {
    label: "サービス",
    href: "/services",
    children: [
      { label: "畳工事", href: "/services/tatami" },
      { label: "内装工事", href: "/interior" },
      { label: "原状回復", href: "/restoration" },
    ],
  },
  {
    label: "法人・施設向け",
    href: "/business",
    children: [
      { label: "不動産会社・管理会社", href: "/business/property-management" },
      { label: "賃貸オーナー", href: "/business/rental-owner" },
      { label: "旅館・宿泊施設", href: "/business/ryokan" },
      { label: "寺院・神社", href: "/business/temple-shrine" },
      { label: "店舗オーナー", href: "/business/store" },
      { label: "空室対策", href: "/business/vacancy-measures" },
    ],
  },
  { label: "施工事例", href: "/works" },
  { label: "料金", href: "/price" },
  { label: "コラム", href: "/column" },
  { label: "会社案内", href: "/about" },
] as const;

export const FOOTER_LINKS = {
  services: [
    { label: "畳表替え", href: "/services/tatami-omotegae" },
    { label: "畳裏返し", href: "/services/tatami-uragaeshi" },
    { label: "畳新調", href: "/services/tatami-shinchou" },
    { label: "縁なし畳", href: "/services/herinashi-tatami" },
    { label: "和紙畳・樹脂畳", href: "/services/washi-tatami" },
    { label: "クロス張替え", href: "/interior/cross" },
    { label: "床工事", href: "/interior/floor" },
    { label: "原状回復工事", href: "/restoration" },
  ],
  business: [
    { label: "不動産会社・管理会社", href: "/business/property-management" },
    { label: "賃貸オーナー", href: "/business/rental-owner" },
    { label: "旅館・宿泊施設", href: "/business/ryokan" },
    { label: "寺院・神社", href: "/business/temple-shrine" },
    { label: "店舗オーナー", href: "/business/store" },
    { label: "空室対策", href: "/business/vacancy-measures" },
  ],
  info: [
    { label: "施工事例", href: "/works" },
    { label: "料金案内", href: "/price" },
    { label: "ご依頼の流れ", href: "/flow" },
    { label: "よくある質問", href: "/faq" },
    { label: "対応エリア", href: "/area" },
    { label: "会社案内", href: "/about" },
    { label: "お問い合わせ", href: "/contact" },
  ],
  column: [
    { label: "専門コラム", href: "/column" },
    { label: "ブログ", href: "/blog" },
  ],
} as const;
