export const SITE_CONFIG = {
  name: "日本畳パートナーズ",
  nameEn: "Nihon Tatami Partners",
  tagline: "畳から、空間の価値を整える。",
  subTagline: "住宅・旅館・寺社・店舗まで。畳と内装の専門パートナー。",
  description:
    "畳の表替え・裏返し・新調から内装工事・原状回復まで。住宅・旅館・寺社・店舗・賃貸物件に幅広く対応する畳・内装の専門パートナーです。",
  // 電話窓口は準備中。お問い合わせはフォームよりお願いします。
  tel: undefined as string | undefined,
  telRaw: undefined as string | undefined,
  email: undefined as string | undefined,
  line: undefined as string | undefined,
  hours: "受付時間はお問い合わせフォームより24時間受付",
  area: "埼玉県全域",
  areaNote: "※エリア外もご相談ください",
  address: "（住所は後日更新）",
  postalCode: undefined as string | undefined,
  social: {
    instagram: "",
    twitter: "",
  },
} as const;

export const NAV_ITEMS = [
  {
    label: "業者を探す",
    href: "/search",
    children: [
      { label: "業者を比較する", href: "/search" },
      { label: "地域から探す", href: "/saitama" },
      { label: "地図から探す", href: "/map" },
      { label: "おまかせマッチング", href: "/matching" },
      { label: "業者を比較する（比較リスト）", href: "/compare" },
    ],
  },
  {
    label: "依頼する",
    href: "/bulk-quote",
    children: [
      { label: "かんたん依頼診断", href: "/request/start" },
      { label: "一括見積もり依頼", href: "/bulk-quote" },
      { label: "写真で見積もり相談", href: "/photo-estimate" },
      { label: "コンシェルジュに相談", href: "/concierge" },
    ],
  },
  {
    label: "料金・事例",
    href: "/prices",
    children: [
      { label: "料金相場", href: "/prices" },
      { label: "料金シミュレーター", href: "/calculator" },
      { label: "施工事例", href: "/cases" },
      { label: "畳素材診断", href: "/diagnosis/tatami-type" },
    ],
  },
  {
    label: "ガイド・コラム",
    href: "/guide",
    children: [
      { label: "業者の選び方", href: "/guide/how-to-choose" },
      { label: "表替え・新調の判定", href: "/guide/omotegae-or-shinchou" },
      { label: "見積書チェックリスト", href: "/guide/estimate-checklist" },
      { label: "賃貸退去確認リスト", href: "/guide/rental-restoration" },
      { label: "Q&A", href: "/questions" },
      { label: "コラム", href: "/articles" },
    ],
  },
  {
    label: "法人・施設向け",
    href: "/for-business",
    children: [
      { label: "不動産会社", href: "/for-real-estate" },
      { label: "管理会社", href: "/for-property-management" },
      { label: "複数物件一括依頼", href: "/business/bulk-request" },
      { label: "賃貸オーナー", href: "/for-landlords" },
      { label: "旅館・宿泊施設", href: "/for-ryokan" },
      { label: "寺院・神社", href: "/for-temple-shrine" },
    ],
  },
  { label: "業者を掲載", href: "/pro" },
] as const;

export const FOOTER_LINKS = {
  services: [
    { label: "畳表替え", href: "/saitama/tatami/omotegae" },
    { label: "畳裏返し", href: "/saitama/tatami/uragaeshi" },
    { label: "畳新調", href: "/saitama/tatami/shinchou" },
    { label: "琉球畳", href: "/saitama/tatami/ryukyu" },
    { label: "縁なし畳", href: "/saitama/tatami/herinashi" },
    { label: "和紙畳", href: "/saitama/tatami/washi" },
    { label: "ふすま張替え", href: "/saitama/fusuma/harikae" },
    { label: "障子張替え", href: "/saitama/shoji/harikae" },
    { label: "和室リフォーム", href: "/saitama/washitsu/reform" },
  ],
  areas: [
    { label: "さいたま市", href: "/saitama/saitama" },
    { label: "川口市", href: "/saitama/kawaguchi" },
    { label: "川越市", href: "/saitama/kawagoe" },
    { label: "越谷市", href: "/saitama/koshigaya" },
    { label: "所沢市", href: "/saitama/tokorozawa" },
    { label: "春日部市", href: "/saitama/kasukabe" },
    { label: "草加市", href: "/saitama/soka" },
    { label: "熊谷市", href: "/saitama/kumagaya" },
  ],
  business: [
    { label: "不動産会社向け", href: "/for-real-estate" },
    { label: "管理会社向け", href: "/for-property-management" },
    { label: "賃貸オーナー向け", href: "/for-landlords" },
    { label: "旅館・宿泊施設向け", href: "/for-ryokan" },
    { label: "寺院・神社向け", href: "/for-temple-shrine" },
    { label: "店舗オーナー向け", href: "/for-store" },
    { label: "賃貸原状回復", href: "/saitama/rental-restoration/tatami" },
  ],
  info: [
    { label: "施工事例", href: "/cases" },
    { label: "料金相場", href: "/prices" },
    { label: "一括見積もり", href: "/bulk-quote" },
    { label: "コラム", href: "/articles" },
    { label: "業者を掲載する", href: "/pro" },
    { label: "お問い合わせ", href: "/contact" },
  ],
  guide: [
    { label: "ご利用ガイド・ヘルプ", href: "/help" },
    { label: "安心への取り組み", href: "/safety" },
    { label: "口コミガイドライン", href: "/guidelines/review" },
    { label: "掲載業者ガイドライン", href: "/guidelines/provider" },
    { label: "利用規約", href: "/terms" },
    { label: "プライバシーポリシー", href: "/privacy" },
    { label: "運営会社", href: "/about" },
  ],
} as const;
