export interface PlatformImage {
  src: string;
  alt: string;
  category: string;
  recommendedUse: string[];
  caption?: string;
  priority?: boolean;
}

// ===== HERO =====
export const HERO_IMAGES: PlatformImage[] = [
  {
    src: "/images/platform/hero/hero-luxury-01.png",
    alt: "床の間・障子・庭園を備えた高級和室の畳空間",
    category: "hero",
    recommendedUse: ["homepage-hero", "tatami-top"],
    priority: true,
  },
  {
    src: "/images/platform/hero/hero-modern-table-01.png",
    alt: "埼玉の畳表替えで生まれ変わったモダンな和室",
    category: "hero",
    recommendedUse: ["homepage-hero-alt", "washitsu"],
    priority: true,
  },
  {
    src: "/images/platform/hero/hero-minimal-shoji-01.png",
    alt: "障子と縁なし畳で仕上げたミニマルモダンな和室",
    category: "hero",
    recommendedUse: ["tatami-modern", "hero-secondary"],
    priority: false,
  },
  {
    src: "/images/platform/hero/hero-traditional-01.png",
    alt: "床の間・掛け軸を備えた伝統的な和室の畳",
    category: "hero",
    recommendedUse: ["tatami-traditional", "ryokan-hero"],
    priority: false,
  },
  {
    src: "/images/platform/hero/hero-tatami-hall-01.png",
    alt: "大広間の畳敷き空間（旅館・寺社向け施工事例）",
    category: "hero",
    recommendedUse: ["ryokan", "temple", "for-business-hero"],
    priority: false,
  },
  {
    src: "/images/platform/hero/hero-ryokan-scroll-01.png",
    alt: "行燈と掛け軸で演出した旅館の和室畳空間",
    category: "hero",
    recommendedUse: ["ryokan-hero", "hero-evening"],
    priority: false,
  },
];

// ===== TATAMI ROOMS =====
export const TATAMI_IMAGES: PlatformImage[] = [
  {
    src: "/images/platform/tatami/tatami-ryukyu-modern-01.png",
    alt: "縁なし琉球畳を使ったモダンな和室インテリア",
    category: "tatami",
    recommendedUse: ["tatami-ryukyu", "category-tatami", "guide-ryukyu"],
  },
  {
    src: "/images/platform/tatami/tatami-border-material-01.png",
    alt: "畳縁（たたみべり）素材のクローズアップ",
    category: "tatami",
    recommendedUse: ["guide-tatami-material", "tatami-detail"],
    caption: "畳縁のカラーバリエーション",
  },
  {
    src: "/images/platform/tatami/tatami-luxury-01.png",
    alt: "高級い草畳を使った伝統的な和室の施工事例",
    category: "tatami",
    recommendedUse: ["tatami-kokusan", "guide-igusa"],
  },
  {
    src: "/images/platform/tatami/tatami-luxury-02.png",
    alt: "埼玉の畳職人による丁寧な表替え施工後の和室",
    category: "tatami",
    recommendedUse: ["tatami-omotegae", "work-case"],
  },
  {
    src: "/images/platform/tatami/tatami-luxury-03.png",
    alt: "庭に面した趣ある和室の畳表替え施工例",
    category: "tatami",
    recommendedUse: ["tatami-omotegae", "work-case"],
  },
  {
    src: "/images/platform/tatami/tatami-luxury-04.png",
    alt: "和の空間を引き立てる高品質な国産い草畳",
    category: "tatami",
    recommendedUse: ["tatami-kokusan", "guide-igusa"],
  },
  {
    src: "/images/platform/tatami/tatami-luxury-05.png",
    alt: "照明と畳の質感が調和した落ち着きある和室",
    category: "tatami",
    recommendedUse: ["tatami-shinchou", "guide-new"],
  },
  {
    src: "/images/platform/tatami/tatami-luxury-06.png",
    alt: "伝統的な畳の間で感じる日本の美意識",
    category: "tatami",
    recommendedUse: ["tatami-omotegae", "hero-secondary"],
  },
  {
    src: "/images/platform/tatami/tatami-luxury-07.png",
    alt: "窓からの自然光が映える清潔感のある和室畳",
    category: "tatami",
    recommendedUse: ["tatami-shinchou", "guide-new"],
  },
  {
    src: "/images/platform/tatami/tatami-luxury-08.png",
    alt: "和モダンスタイルの畳リフォーム施工後の空間",
    category: "tatami",
    recommendedUse: ["tatami-reform", "washitsu-reform"],
  },
  {
    src: "/images/platform/tatami/tatami-luxury-09.png",
    alt: "埼玉県の熟練職人が手がけた高品質な畳新調",
    category: "tatami",
    recommendedUse: ["tatami-shinchou", "guide-material"],
  },
  {
    src: "/images/platform/tatami/tatami-luxury-10.png",
    alt: "清々しい香りの新しい畳で仕上げた和室",
    category: "tatami",
    recommendedUse: ["tatami-omotegae", "work-case"],
  },
  {
    src: "/images/platform/tatami/tatami-traditional-01.png",
    alt: "伝統的な書院造りに合わせた本格和室の畳敷き",
    category: "tatami",
    recommendedUse: ["tatami-traditional", "ryokan", "temple"],
  },
  {
    src: "/images/platform/tatami/tatami-traditional-02.png",
    alt: "日本の伝統美を引き継いだ格式ある畳の間",
    category: "tatami",
    recommendedUse: ["tatami-traditional", "guide-history"],
  },
  {
    src: "/images/platform/tatami/tatami-traditional-03.png",
    alt: "床の間を設えた伝統的な和室の畳表替え",
    category: "tatami",
    recommendedUse: ["tatami-traditional", "work-case"],
  },
  {
    src: "/images/platform/tatami/tatami-traditional-04.png",
    alt: "庭の緑を望む書院風和室の畳施工事例",
    category: "tatami",
    recommendedUse: ["tatami-traditional", "ryokan"],
  },
  {
    src: "/images/platform/tatami/tatami-traditional-05.png",
    alt: "重厚な梁と畳が織りなす伝統的な和の空間",
    category: "tatami",
    recommendedUse: ["tatami-traditional", "guide-history"],
  },
  {
    src: "/images/platform/tatami/tatami-traditional-06.png",
    alt: "格式ある和室のための高品質畳表替え施工",
    category: "tatami",
    recommendedUse: ["tatami-traditional", "work-case"],
  },
  {
    src: "/images/platform/tatami/tatami-traditional-07.png",
    alt: "古民家リノベーションに合わせた畳の新調",
    category: "tatami",
    recommendedUse: ["tatami-shinchou", "restoration"],
  },
  {
    src: "/images/platform/tatami/tatami-traditional-08.png",
    alt: "日本家屋の風格を活かした伝統的な畳空間",
    category: "tatami",
    recommendedUse: ["tatami-traditional", "guide-history"],
  },
  {
    src: "/images/platform/tatami/tatami-traditional-09.png",
    alt: "丁寧に施工された伝統和室の畳表替え完成例",
    category: "tatami",
    recommendedUse: ["tatami-omotegae", "work-case"],
  },
  {
    src: "/images/platform/tatami/tatami-hall-01.png",
    alt: "旅館の大広間・座敷向け大型畳敷き施工事例",
    category: "tatami",
    recommendedUse: ["ryokan", "temple", "tatami-hall"],
  },
  {
    src: "/images/platform/tatami/tatami-hall-02.png",
    alt: "格式ある広間の畳表替え施工（埼玉県対応）",
    category: "tatami",
    recommendedUse: ["ryokan", "temple", "tatami-hall"],
  },
  {
    src: "/images/platform/tatami/tatami-hall-03.png",
    alt: "広々とした和室大広間の畳新調施工事例",
    category: "tatami",
    recommendedUse: ["ryokan", "tatami-hall"],
  },
  {
    src: "/images/platform/tatami/tatami-hall-04.png",
    alt: "落ち着きある雰囲気の宴会場・座敷の畳敷き",
    category: "tatami",
    recommendedUse: ["ryokan", "tatami-hall", "work-case"],
  },
  {
    src: "/images/platform/tatami/tatami-hall-05.png",
    alt: "上質な国産い草を使った大広間の畳表替え",
    category: "tatami",
    recommendedUse: ["ryokan", "tatami-kokusan", "tatami-hall"],
  },
  {
    src: "/images/platform/tatami/tatami-hall-06.png",
    alt: "広間に整然と並ぶ新しい畳の清潔感",
    category: "tatami",
    recommendedUse: ["tatami-hall", "guide-ryokan"],
  },
  {
    src: "/images/platform/tatami/tatami-hall-07.png",
    alt: "光が差し込む和室大広間の畳施工完成例",
    category: "tatami",
    recommendedUse: ["tatami-hall", "work-case"],
  },
  {
    src: "/images/platform/tatami/tatami-hall-08.png",
    alt: "旅館・ホテル向け大規模畳表替えの施工例",
    category: "tatami",
    recommendedUse: ["ryokan", "tatami-hall", "guide-ryokan"],
  },
  {
    src: "/images/platform/tatami/tatami-hall-09.png",
    alt: "趣ある和の空間を演出する大広間畳の施工",
    category: "tatami",
    recommendedUse: ["ryokan", "tatami-hall"],
  },
  {
    src: "/images/platform/tatami/tatami-tokonoma-01.png",
    alt: "床の間付き和室の格式を高める畳表替え",
    category: "tatami",
    recommendedUse: ["tatami-traditional", "tatami-omotegae"],
  },
  {
    src: "/images/platform/tatami/tatami-tokonoma-02.png",
    alt: "掛け軸・床の間が映える高品質畳の表替え",
    category: "tatami",
    recommendedUse: ["tatami-traditional", "work-case"],
  },
  {
    src: "/images/platform/tatami/tatami-tokonoma-03.png",
    alt: "庭を望む床の間付き和室の畳新調施工例",
    category: "tatami",
    recommendedUse: ["tatami-traditional", "tatami-shinchou"],
  },
  {
    src: "/images/platform/tatami/tatami-tokonoma-04.png",
    alt: "格調高い床の間和室に映える国産い草畳",
    category: "tatami",
    recommendedUse: ["tatami-kokusan", "work-case"],
  },
  {
    src: "/images/platform/tatami/tatami-tokonoma-05.png",
    alt: "伝統の美意識が宿る和室の畳敷き施工事例",
    category: "tatami",
    recommendedUse: ["tatami-traditional", "guide-igusa"],
  },
  {
    src: "/images/platform/tatami/tatami-tokonoma-06.png",
    alt: "日本の美を凝縮した床の間付き和室の畳",
    category: "tatami",
    recommendedUse: ["tatami-traditional", "guide-history"],
  },
  {
    src: "/images/platform/tatami/tatami-tokonoma-07.png",
    alt: "上品な佇まいの床の間和室・畳表替え完成",
    category: "tatami",
    recommendedUse: ["tatami-omotegae", "work-case"],
  },
  {
    src: "/images/platform/tatami/tatami-tokonoma-08.png",
    alt: "格式ある和室の床の間に合わせた上質な畳",
    category: "tatami",
    recommendedUse: ["tatami-traditional", "tatami-kokusan"],
  },
  {
    src: "/images/platform/tatami/tatami-tokonoma-09.png",
    alt: "和の趣深い床の間付き和室の畳新調施工",
    category: "tatami",
    recommendedUse: ["tatami-shinchou", "work-case"],
  },
  {
    src: "/images/platform/tatami/tatami-tokonoma-10.png",
    alt: "床の間の格調を際立てる熟練職人の畳表替え",
    category: "tatami",
    recommendedUse: ["tatami-omotegae", "vendor-portfolio"],
  },
  {
    src: "/images/platform/tatami/tatami-luxury-11.png",
    alt: "夕暮れ時の温かみある光に包まれた和室の畳",
    category: "tatami",
    recommendedUse: ["ryokan", "guide-ryokan"],
  },
  {
    src: "/images/platform/tatami/tatami-luxury-12.png",
    alt: "上質な自然素材で仕上げた現代和室の畳敷き",
    category: "tatami",
    recommendedUse: ["tatami-kokusan", "work-case"],
  },
  {
    src: "/images/platform/tatami/tatami-luxury-13.png",
    alt: "凛とした和の空間に映える新しい畳の表替え",
    category: "tatami",
    recommendedUse: ["tatami-omotegae", "tatami-traditional"],
  },
  {
    src: "/images/platform/tatami/tatami-luxury-14.png",
    alt: "日本庭園に面した和室の落ち着きある畳空間",
    category: "tatami",
    recommendedUse: ["ryokan", "tatami-traditional"],
  },
  {
    src: "/images/platform/tatami/tatami-luxury-15.png",
    alt: "豊かな緑を眺める庭園付き和室の畳施工例",
    category: "tatami",
    recommendedUse: ["ryokan", "work-case"],
  },
  {
    src: "/images/platform/tatami/tatami-luxury-16.png",
    alt: "静寂と品格が漂う日本の和室畳空間",
    category: "tatami",
    recommendedUse: ["tatami-traditional", "guide-history"],
  },
  {
    src: "/images/platform/tatami/tatami-luxury-17.png",
    alt: "上品な照明と畳が調和した高級和室の施工",
    category: "tatami",
    recommendedUse: ["ryokan", "tatami-shinchou"],
  },
  {
    src: "/images/platform/tatami/tatami-luxury-18.png",
    alt: "端正な和室の畳表替えで生まれ変わった空間",
    category: "tatami",
    recommendedUse: ["tatami-omotegae", "work-case"],
  },
];

// ===== TATAMI CRAFTSMEN =====
export const TATAMI_CRAFT_IMAGES: PlatformImage[] = [
  {
    src: "/images/platform/tatami-craft/tatami-craft-border-01.png",
    alt: "埼玉の畳職人が畳縁を丁寧に仕上げる施工風景",
    category: "tatami-craft",
    recommendedUse: ["vendor-card", "guide-craft", "hero-craft"],
    caption: "一枚一枚丁寧に仕上げる畳職人の技",
  },
  {
    src: "/images/platform/tatami-craft/tatami-craft-scissors-01.png",
    alt: "熟練の畳職人が鋏で畳縁を裁断する作業",
    category: "tatami-craft",
    recommendedUse: ["vendor-card", "guide-craft", "work-case"],
    caption: "長年の経験が光る職人の手仕事",
  },
  {
    src: "/images/platform/tatami-craft/tatami-craft-floor-laying-01.png",
    alt: "埼玉県で畳の新調下地工事を行う職人の施工風景",
    category: "tatami-craft",
    recommendedUse: ["guide-shinchou", "work-case", "guide-craft"],
    caption: "畳新調では床下地から丁寧に仕上げます",
  },
];

// ===== SHOJI =====
export const SHOJI_IMAGES: PlatformImage[] = [
  { src: "/images/platform/shoji/shoji-craft-01.png", alt: "埼玉の障子職人が障子を建て込む施工風景", category: "shoji", recommendedUse: ["shoji-harikae", "vendor-card"] },
  { src: "/images/platform/shoji/shoji-craft-02.png", alt: "障子職人が障子枠に紙を貼る丁寧な作業", category: "shoji", recommendedUse: ["shoji-harikae", "guide-shoji"] },
  { src: "/images/platform/shoji/shoji-craft-03.png", alt: "住宅の和室に障子を取り付ける施工場面", category: "shoji", recommendedUse: ["shoji-harikae", "work-case"] },
  { src: "/images/platform/shoji/shoji-craft-04.png", alt: "障子骨組みに丁寧に紙を張る職人の手元", category: "shoji", recommendedUse: ["guide-shoji", "shoji-detail"] },
  { src: "/images/platform/shoji/shoji-craft-05.png", alt: "旅館の和室で障子を建て込む2名の職人", category: "shoji", recommendedUse: ["shoji-ryokan", "ryokan", "work-case"] },
  { src: "/images/platform/shoji/shoji-craft-06.png", alt: "古くなった障子の張り替え前の取り外し作業", category: "shoji", recommendedUse: ["shoji-harikae", "guide-shoji-step"] },
  { src: "/images/platform/shoji/shoji-craft-07.png", alt: "工房で障子枠のサイズを計測する熟練職人", category: "shoji", recommendedUse: ["vendor-card", "guide-craft", "shoji-harikae"] },
  { src: "/images/platform/shoji/shoji-craft-08.png", alt: "障子の建て付けを丁寧に調整する職人の作業", category: "shoji", recommendedUse: ["shoji-harikae", "work-case"] },
  { src: "/images/platform/shoji/shoji-craft-09.png", alt: "障子の修繕・張り替え施工の現場風景", category: "shoji", recommendedUse: ["shoji-harikae", "guide-shoji"] },
  { src: "/images/platform/shoji/shoji-craft-10.png", alt: "モダンな住宅の和室で障子を設置する職人", category: "shoji", recommendedUse: ["shoji-harikae", "work-case"] },
  { src: "/images/platform/shoji/shoji-craft-11.png", alt: "庭に面した和室への障子建て込み施工", category: "shoji", recommendedUse: ["shoji-harikae", "work-case"] },
  { src: "/images/platform/shoji/shoji-craft-12.png", alt: "障子紙を枠に丁寧に張る熟練職人の作業", category: "shoji", recommendedUse: ["guide-shoji", "shoji-harikae"] },
  { src: "/images/platform/shoji/shoji-craft-13.png", alt: "住宅の和室に障子を取り付ける施工作業", category: "shoji", recommendedUse: ["shoji-harikae", "work-case"] },
  { src: "/images/platform/shoji/shoji-craft-14.png", alt: "旅館での大規模障子張り替え施工の様子", category: "shoji", recommendedUse: ["shoji-ryokan", "ryokan", "guide-shoji"] },
  { src: "/images/platform/shoji/shoji-craft-15.png", alt: "古い障子を丁寧に撤去する施工前の作業", category: "shoji", recommendedUse: ["shoji-harikae", "guide-shoji-step"] },
  { src: "/images/platform/shoji/shoji-craft-16.png", alt: "障子紙の張り替えを行う職人の手元アップ", category: "shoji", recommendedUse: ["guide-shoji", "shoji-detail"] },
  { src: "/images/platform/shoji/shoji-craft-17.png", alt: "工房で障子の採寸・加工を行う熟練職人", category: "shoji", recommendedUse: ["vendor-card", "guide-craft"] },
  { src: "/images/platform/shoji/shoji-craft-18.png", alt: "障子を建て込む職人（埼玉県対応）", category: "shoji", recommendedUse: ["shoji-harikae", "work-case"] },
  { src: "/images/platform/shoji/shoji-craft-19.png", alt: "古い障子の修繕・紙の張り替え作業現場", category: "shoji", recommendedUse: ["shoji-harikae", "guide-shoji"] },
  { src: "/images/platform/shoji/shoji-craft-20.png", alt: "工房で障子の最終仕上げを確認する職人", category: "shoji", recommendedUse: ["vendor-card", "guide-craft"] },
];

// ===== FUSUMA =====
export const FUSUMA_IMAGES: PlatformImage[] = [
  { src: "/images/platform/fusuma/fusuma-craft-01.png", alt: "埼玉の内装職人が押入れふすまを建て込む施工", category: "fusuma", recommendedUse: ["fusuma-harikae", "vendor-card"] },
  { src: "/images/platform/fusuma/fusuma-craft-02.png", alt: "ふすまの張り替え・建て込み施工の現場", category: "fusuma", recommendedUse: ["fusuma-harikae", "work-case"] },
  { src: "/images/platform/fusuma/fusuma-craft-03.png", alt: "和室の押入れにふすまを取り付ける職人", category: "fusuma", recommendedUse: ["fusuma-harikae", "work-case"] },
  { src: "/images/platform/fusuma/fusuma-craft-04.png", alt: "丁寧にふすまを建て込む職人の施工風景", category: "fusuma", recommendedUse: ["fusuma-harikae", "guide-fusuma"] },
  { src: "/images/platform/fusuma/fusuma-craft-05.png", alt: "ふすまの建て付け調整を行う職人（埼玉県）", category: "fusuma", recommendedUse: ["fusuma-harikae", "vendor-card"] },
  { src: "/images/platform/fusuma/fusuma-craft-06.png", alt: "住宅和室のふすまを交換する施工現場", category: "fusuma", recommendedUse: ["fusuma-harikae", "work-case"] },
  { src: "/images/platform/fusuma/fusuma-craft-07.png", alt: "押入れのふすまを取り付ける施工作業", category: "fusuma", recommendedUse: ["fusuma-harikae", "guide-fusuma"] },
  { src: "/images/platform/fusuma/fusuma-craft-08.png", alt: "ふすまの張り替え後の仕上がりを確認する職人", category: "fusuma", recommendedUse: ["fusuma-harikae", "vendor-card"] },
  { src: "/images/platform/fusuma/fusuma-craft-09.png", alt: "熟練職人によるふすまの精密な建て込み", category: "fusuma", recommendedUse: ["fusuma-harikae", "work-case"] },
  { src: "/images/platform/fusuma/fusuma-craft-10.png", alt: "和室の押入れを彩る新しいふすまの設置", category: "fusuma", recommendedUse: ["fusuma-harikae", "guide-fusuma"] },
  { src: "/images/platform/fusuma/fusuma-craft-11.png", alt: "ふすまの張り替え・建て込み施工（埼玉県）", category: "fusuma", recommendedUse: ["fusuma-harikae", "work-case"] },
  { src: "/images/platform/fusuma/fusuma-craft-12.png", alt: "丁寧なふすまの取り付けで和室が生まれ変わる", category: "fusuma", recommendedUse: ["fusuma-harikae", "guide-fusuma"] },
  { src: "/images/platform/fusuma/fusuma-craft-13.png", alt: "職人がふすまの建て付けを微調整する様子", category: "fusuma", recommendedUse: ["fusuma-harikae", "vendor-card"] },
  { src: "/images/platform/fusuma/fusuma-craft-14.png", alt: "新しいふすまを和室に設置する施工現場", category: "fusuma", recommendedUse: ["fusuma-harikae", "work-case"] },
  { src: "/images/platform/fusuma/fusuma-craft-15.png", alt: "和室の押入れへのふすま張り替え施工例", category: "fusuma", recommendedUse: ["fusuma-harikae", "guide-fusuma"] },
  { src: "/images/platform/fusuma/fusuma-craft-16.png", alt: "ふすまの施工品質を確認する職人の視点", category: "fusuma", recommendedUse: ["fusuma-harikae", "vendor-card"] },
  { src: "/images/platform/fusuma/fusuma-craft-17.png", alt: "和室を美しく整えるふすまの建て込み作業", category: "fusuma", recommendedUse: ["fusuma-harikae", "work-case"] },
  { src: "/images/platform/fusuma/fusuma-craft-18.png", alt: "熟練職人が丁寧に行うふすまの設置施工", category: "fusuma", recommendedUse: ["fusuma-harikae", "guide-fusuma"] },
  { src: "/images/platform/fusuma/fusuma-craft-19.png", alt: "ふすまの建て込みを行う内装職人（埼玉県）", category: "fusuma", recommendedUse: ["fusuma-harikae", "vendor-card"] },
  { src: "/images/platform/fusuma/fusuma-craft-20.png", alt: "押入れのふすまが生まれ変わる施工完成の瞬間", category: "fusuma", recommendedUse: ["fusuma-harikae", "work-case"] },
];

// ===== RYOKAN =====
export const RYOKAN_IMAGES: PlatformImage[] = [
  { src: "/images/platform/ryokan/ryokan-tatami-day-01.png", alt: "旅館の和室客室に整えられた上質な畳と調度品", category: "ryokan", recommendedUse: ["ryokan-page", "for-business-ryokan"] },
  { src: "/images/platform/ryokan/ryokan-tatami-mountain-01.png", alt: "山の緑を望む旅館客室の上質な畳敷き", category: "ryokan", recommendedUse: ["ryokan-page", "hero-ryokan"] },
  { src: "/images/platform/ryokan/ryokan-tatami-evening-01.png", alt: "夕景の庭を眺める旅館和室の趣ある畳空間", category: "ryokan", recommendedUse: ["ryokan-page", "hero-evening"] },
  { src: "/images/platform/ryokan/ryokan-modern-suite-01.png", alt: "和洋室スイートの畳空間と寝室が融合した旅館客室", category: "ryokan", recommendedUse: ["ryokan-page", "guide-ryokan"] },
  { src: "/images/platform/ryokan/ryokan-tatami-table-01.png", alt: "旅館の和室客室に配置された座卓と畳の空間", category: "ryokan", recommendedUse: ["ryokan-page", "for-business-ryokan"] },
  { src: "/images/platform/ryokan/ryokan-tatami-table-02.png", alt: "くつろぎの旅館和室に整えられた畳と座卓", category: "ryokan", recommendedUse: ["ryokan-page", "work-case-ryokan"] },
  { src: "/images/platform/ryokan/ryokan-tatami-day-02.png", alt: "日中の旅館客室で光が差し込む美しい畳の間", category: "ryokan", recommendedUse: ["ryokan-page", "work-case-ryokan"] },
  { src: "/images/platform/ryokan/ryokan-tatami-day-03.png", alt: "旅館の格調ある和室の畳表替え施工事例", category: "ryokan", recommendedUse: ["ryokan-page", "guide-ryokan"] },
  { src: "/images/platform/ryokan/ryokan-tatami-evening-02.png", alt: "宿泊施設の夜の和室・畳空間の落ち着きある演出", category: "ryokan", recommendedUse: ["ryokan-page", "hero-evening"] },
  { src: "/images/platform/ryokan/ryokan-tatami-evening-03.png", alt: "旅館の夕暮れ時の和室に広がる上質な畳の間", category: "ryokan", recommendedUse: ["ryokan-page", "hero-evening"] },
  { src: "/images/platform/ryokan/ryokan-tatami-day-04.png", alt: "旅館客室の畳と調度品が織りなす和の空間", category: "ryokan", recommendedUse: ["ryokan-page", "for-business-ryokan"] },
  { src: "/images/platform/ryokan/ryokan-tatami-day-05.png", alt: "宿泊施設の和室客室向け畳新調施工例", category: "ryokan", recommendedUse: ["ryokan-page", "work-case-ryokan"] },
  { src: "/images/platform/ryokan/ryokan-tatami-table-03.png", alt: "旅館の座敷に整えられた清潔な畳と座布団", category: "ryokan", recommendedUse: ["ryokan-page", "for-business-ryokan"] },
  { src: "/images/platform/ryokan/ryokan-tatami-table-04.png", alt: "旅館の和室で緑の庭を望む畳の空間", category: "ryokan", recommendedUse: ["ryokan-page", "guide-ryokan"] },
];

// ===== TEMPLE / SHRINE =====
export const TEMPLE_IMAGES: PlatformImage[] = [
  {
    src: "/images/platform/temple/temple-tatami-hall-01.png",
    alt: "仏堂・本堂の大広間に敷き詰められた格式ある畳",
    category: "temple",
    recommendedUse: ["temple-page", "shrine-page", "for-business-temple"],
    caption: "寺院の本堂向け大規模畳敷き",
  },
  {
    src: "/images/platform/temple/temple-tatami-hall-02.png",
    alt: "荘厳な柱と梁が映える寺院・仏殿の畳敷き空間",
    category: "temple",
    recommendedUse: ["temple-page", "shrine-page", "for-business-temple"],
    caption: "寺社向け大型畳工事に対応",
  },
];

// ===== RENTAL / RESTORATION =====
export const RENTAL_IMAGES: PlatformImage[] = [
  {
    src: "/images/platform/rental/rental-apartment-tatami-01.png",
    alt: "賃貸アパートの和室畳を原状回復する表替え施工",
    category: "rental",
    recommendedUse: ["rental-page", "real-estate-page", "guide-genjou"],
    caption: "賃貸退去時の原状回復にも対応",
  },
  {
    src: "/images/platform/rental/rental-apartment-tatami-02.png",
    alt: "賃貸マンション退去後の和室畳・原状回復施工",
    category: "rental",
    recommendedUse: ["rental-page", "real-estate-page", "guide-genjou"],
    caption: "不動産会社・管理会社からのご依頼も歓迎",
  },
];

// ===== WASHITSU / REFORM =====
export const WASHITSU_IMAGES: PlatformImage[] = [
  {
    src: "/images/platform/washitsu/washitsu-reform-modern-01.png",
    alt: "リフォームで和室と洋室が融合したモダンな間取り",
    category: "washitsu",
    recommendedUse: ["washitsu-reform", "guide-reform", "real-estate"],
    caption: "和モダンリフォームで和室と洋室を連続させた事例",
  },
  {
    src: "/images/platform/washitsu/washitsu-reform-living-01.png",
    alt: "リビングに隣接した畳コーナー・小上がりの施工例",
    category: "washitsu",
    recommendedUse: ["washitsu-reform", "guide-reform"],
    caption: "LDKに隣接した和室・畳コーナーも承ります",
  },
];

// ===== BUSINESS =====
export const BUSINESS_IMAGES: PlatformImage[] = [
  {
    src: "/images/platform/business/business-floorplan-01.png",
    alt: "不動産会社・管理会社が物件の畳工事を検討する場面",
    category: "business",
    recommendedUse: ["for-business-real-estate", "real-estate-page", "property-management"],
    caption: "複数物件の一括依頼もお任せください",
  },
];

// ===== STORE =====
export const STORE_IMAGES: PlatformImage[] = [
  {
    src: "/images/platform/store/store-washitsu-01.png",
    alt: "和モダンな飲食店・小売店の畳座敷インテリア",
    category: "store",
    recommendedUse: ["for-business-store", "store-page", "guide-store"],
    caption: "飲食店・和モダン店舗の内装にも対応",
  },
];

// ===== RESTORATION =====
export const RESTORATION_IMAGES: PlatformImage[] = [
  {
    src: "/images/platform/restoration/restoration-before-01.png",
    alt: "リノベーション中の古民家・日本家屋の施工前の様子",
    category: "restoration",
    recommendedUse: ["guide-renovation", "guide-before-after", "real-estate"],
    caption: "古民家・空き家再生の畳工事にも対応",
  },
];

// ===== 用途別ショートカット =====

export function getImagesForUse(use: string): PlatformImage[] {
  const all = [
    ...HERO_IMAGES,
    ...TATAMI_IMAGES,
    ...TATAMI_CRAFT_IMAGES,
    ...SHOJI_IMAGES,
    ...FUSUMA_IMAGES,
    ...RYOKAN_IMAGES,
    ...TEMPLE_IMAGES,
    ...RENTAL_IMAGES,
    ...WASHITSU_IMAGES,
    ...BUSINESS_IMAGES,
    ...STORE_IMAGES,
    ...RESTORATION_IMAGES,
  ];
  return all.filter((img) => img.recommendedUse.includes(use));
}

export function getHeroImage(index = 0): PlatformImage {
  return HERO_IMAGES[index % HERO_IMAGES.length];
}

export function getCategoryImage(category: string): PlatformImage | undefined {
  const map: Record<string, PlatformImage | undefined> = {
    tatami: TATAMI_IMAGES.find((i) => i.recommendedUse.includes("category-tatami")) ?? TATAMI_IMAGES[0],
    omotegae: TATAMI_IMAGES[1],
    uragaeshi: TATAMI_IMAGES[4],
    shinchou: TATAMI_IMAGES[6],
    ryukyu: TATAMI_IMAGES[0],
    herinashi: TATAMI_IMAGES[0],
    "kokusan-igusa": TATAMI_IMAGES[3],
    shoji: SHOJI_IMAGES[0],
    "shoji-harikae": SHOJI_IMAGES[0],
    fusuma: FUSUMA_IMAGES[0],
    "fusuma-harikae": FUSUMA_IMAGES[0],
    washitsu: WASHITSU_IMAGES[0],
    "washitsu-reform": WASHITSU_IMAGES[0],
    ryokan: RYOKAN_IMAGES[0],
    temple: TEMPLE_IMAGES[0],
    shrine: TEMPLE_IMAGES[1],
    rental: RENTAL_IMAGES[0],
    "rental-restoration": RENTAL_IMAGES[0],
    "real-estate": BUSINESS_IMAGES[0],
    store: STORE_IMAGES[0],
  };
  return map[category];
}
