import type { Service } from "@/lib/types";

export const TATAMI_SERVICES: Service[] = [
  {
    id: "tatami-omotegae",
    title: "畳表替え",
    subtitle: "い草の表面を新品に。最もポピュラーな畳工事。",
    description:
      "畳の表面（畳表）だけを新しいものに張り替えます。畳床はそのままに、い草の清潔感と香りを取り戻します。定期的なメンテナンスとして最も費用対効果の高い畳工事です。",
    href: "/services/tatami-omotegae",
    category: "tatami",
    features: [
      "い草の香りが復活",
      "畳床の状態が良ければ表替えで十分",
      "比較的短工期で対応可能",
      "和紙畳・樹脂畳への変更も可能",
    ],
    image: "/images/services/omotegae.jpg",
  },
  {
    id: "tatami-uragaeshi",
    title: "畳裏返し",
    subtitle: "表面を裏返して使える、経済的な選択肢。",
    description:
      "使用から3〜5年程度で、畳表の裏面を表に向けて使う工事です。まだ新しさが残る裏面を活かすことで、表替えより安価にリフレッシュできます。",
    href: "/services/tatami-uragaeshi",
    category: "tatami",
    features: [
      "表替えより費用を抑えられる",
      "い草本来の風合いを活かせる",
      "次の表替えまでのつなぎに最適",
      "通常3〜5年目の畳に適している",
    ],
    image: "/images/services/uragaeshi.jpg",
  },
  {
    id: "tatami-shinchou",
    title: "畳新調",
    subtitle: "畳床ごと新品に。完全な新品の仕上がり。",
    description:
      "畳床（芯材）から新品に作り直す工事です。長年使用で畳床が傷んでいる場合や、和室のリフォームに合わせて全体を一新したい場合に最適です。",
    href: "/services/tatami-shinchou",
    category: "tatami",
    features: [
      "踏み心地・断熱性が新品に",
      "畳床の種類から選べる",
      "サイズ調整が可能",
      "部屋のリフォームに合わせた新調も",
    ],
    image: "/images/services/shinchou.jpg",
  },
  {
    id: "herinashi-tatami",
    title: "縁なし畳",
    subtitle: "モダンな空間に映える、縁のないスタイル。",
    description:
      "縁（へり）のない畳で、半畳サイズを交互に敷くことで市松模様の独特な陰影が生まれます。リビングや書斎など、洋風の空間に和を取り入れたい方に人気です。",
    href: "/services/herinashi-tatami",
    category: "tatami",
    features: [
      "半畳タイプで市松模様に",
      "洋室・リビングにも合わせやすい",
      "フローリング上への設置も可能",
      "琉球畳風・和紙素材の縁なしも",
    ],
    image: "/images/services/herinashi.jpg",
  },
  {
    id: "ryukyu-tatami",
    title: "琉球畳・琉球畳風",
    subtitle: "七島い草の独特な表情と耐久性。",
    description:
      "沖縄原産の七島い草（しちとうい）を使った琉球畳と、同じ見た目で作られた琉球畳風（目積表）があります。頑丈で耐久性が高く、旅館やホテルでも多く採用されています。",
    href: "/services/ryukyu-tatami",
    category: "tatami",
    features: [
      "独特の表面パターン",
      "通常の畳より耐久性が高い",
      "旅館・ホテルの客室に多い",
      "縁なし仕上げが基本",
    ],
    image: "/images/services/ryukyu.jpg",
  },
  {
    id: "washi-tatami",
    title: "和紙畳",
    subtitle: "和紙素材で実現する、色彩と耐久性。",
    description:
      "い草の代わりに和紙をこより状にして編み込んだ畳表です。豊富なカラーバリエーション、ダニ・カビが発生しにくい、汚れに強いという特性で、現代の生活スタイルに適しています。",
    href: "/services/washi-tatami",
    category: "tatami",
    features: [
      "豊富なカラー展開",
      "ダニ・カビが発生しにくい",
      "ペットがいるご家庭に適している",
      "子育て世代・高齢者にも",
    ],
    image: "/images/services/washi.jpg",
  },
  {
    id: "resin-tatami",
    title: "樹脂畳",
    subtitle: "水に強く丈夫。お手入れしやすい素材。",
    description:
      "ポリプロピレンなどの樹脂素材で作られた畳表です。耐水性・耐久性に優れ、厨房に隣接した和室や、水まわりが近い空間でも安心して使えます。旅館や飲食店の畳にも採用されています。",
    href: "/services/resin-tatami",
    category: "tatami",
    features: [
      "水に強く汚れが落ちやすい",
      "耐久性が高い",
      "厨房・水まわり近くにも対応",
      "旅館・飲食店での実績多数",
    ],
    image: "/images/services/resin.jpg",
  },
  {
    id: "color-tatami",
    title: "カラー畳",
    subtitle: "空間のアクセントに。デザインの可能性を広げる。",
    description:
      "グリーン・ベージュ・グレーなど多彩なカラーから選べる畳です。和紙素材のカラー畳をはじめ、組み合わせで空間に個性を出すことができます。店舗・施設・ユニークな住宅空間に。",
    href: "/services/color-tatami",
    category: "tatami",
    features: [
      "豊富なカラーラインナップ",
      "複数色の組み合わせも可能",
      "店舗や施設の差別化に",
      "インテリアのアクセントとして",
    ],
    image: "/images/services/color.jpg",
  },
  {
    id: "tatami-beri",
    title: "畳縁（へり）交換",
    subtitle: "畳の印象を変える、縁のリフレッシュ。",
    description:
      "畳の縁（へり布）が傷んできた場合の交換工事です。シンプルな無地から、模様入り・金色のものまで種類があります。縁のデザインを変えるだけで畳の印象が大きく変わります。",
    href: "/services/tatami-beri",
    category: "tatami",
    features: [
      "縁のみ交換で費用を抑えられる",
      "デザインの幅が広い",
      "寺社仏閣向けの高級縁も扱う",
    ],
    image: "/images/services/beri.jpg",
  },
  {
    id: "fusuma-shoji-amido",
    title: "襖・障子・網戸",
    subtitle: "和室を構成する建具のリフレッシュ。",
    description:
      "畳と合わせて和室全体を整えたい場合、襖・障子・網戸の張替えも承ります。和紙・布・プラスチックなど素材から選べ、畳工事との同時施工で効率よく和室を一新できます。",
    href: "/services/fusuma-shoji-amido",
    category: "tatami",
    features: [
      "畳工事との同時施工が可能",
      "素材・デザインを選べる",
      "旅館・寺社・一般住宅に対応",
      "採光・断熱性の高い素材も",
    ],
    image: "/images/services/fusuma.jpg",
  },
];

export const INTERIOR_SERVICES: Service[] = [
  {
    id: "cross",
    title: "クロス張替え",
    subtitle: "壁紙の張替えで部屋の印象を一新。",
    description:
      "劣化・汚れ・傷んだ壁紙を新しいクロスに張り替えます。住宅・賃貸・店舗・旅館など幅広い用途に対応。原状回復での張替えも承ります。",
    href: "/interior/cross",
    category: "interior",
    image: "/images/services/cross.jpg",
  },
  {
    id: "floor",
    title: "床工事（フローリング）",
    subtitle: "フローリングの補修・張替え・新規施工。",
    description:
      "傷んだフローリングの張替えや新規施工を行います。部分補修から全面張替えまで対応。退去後の床補修、リフォームの床工事など幅広くお受けします。",
    href: "/interior/floor",
    category: "interior",
    image: "/images/services/floor.jpg",
  },
  {
    id: "cushion-floor",
    title: "クッションフロア",
    subtitle: "水まわりや賃貸物件の定番床材。",
    description:
      "防水性が高く手入れしやすいクッションフロアへの張替えです。トイレ・洗面・キッチンなど水まわりや、賃貸物件の原状回復に多く採用されています。",
    href: "/interior/cushion-floor",
    category: "interior",
    image: "/images/services/cf.jpg",
  },
  {
    id: "floor-tile",
    title: "フロアタイル",
    subtitle: "耐久性と意匠性を両立した床材。",
    description:
      "店舗・オフィスに多く使われるフロアタイルの施工です。傷に強く、部分補修も可能。木目・石目など豊富なデザインから空間に合わせて選べます。",
    href: "/interior/floor-tile",
    category: "interior",
    image: "/images/services/floortile.jpg",
  },
  {
    id: "store-interior",
    title: "店舗内装工事",
    subtitle: "開業・改装・退去に対応した店舗内装。",
    description:
      "飲食店・小売店・サロン・和食店などの内装工事を承ります。開業時の新規内装から改装・退去時の原状回復まで一括相談できます。",
    href: "/interior/store-interior",
    category: "interior",
    image: "/images/services/store.jpg",
  },
  {
    id: "house-renovation",
    title: "住宅内装リフォーム",
    subtitle: "和室を中心とした住宅リフォームの窓口に。",
    description:
      "畳・クロス・床・建具を組み合わせた住宅内装リフォームをまとめてお受けします。和室リフォームを中心に、隣接するリビングや廊下の内装改修にも対応しています。",
    href: "/interior/house-renovation",
    category: "interior",
    image: "/images/services/house.jpg",
  },
];

export const RESTORATION_SERVICES: Service[] = [
  {
    id: "restoration-rental",
    title: "賃貸物件の原状回復",
    subtitle: "退去後をスムーズに。まとめて対応できる強み。",
    description:
      "賃貸物件の退去後に必要な畳交換・クロス張替え・床補修・ハウスクリーニング連携まで一括対応します。不動産会社・管理会社・賃貸オーナーからの継続案件も承ります。",
    href: "/restoration/rental",
    category: "restoration",
    image: "/images/services/restoration-rental.jpg",
  },
  {
    id: "restoration-store",
    title: "店舗退去後の原状回復",
    subtitle: "内装解体から原状回復まで。店舗に特化した対応。",
    description:
      "飲食店・小売店などの退去後の原状回復工事を承ります。内装解体・床・壁・天井の復旧を含む、総合的な対応が可能です。",
    href: "/restoration/store",
    category: "restoration",
    image: "/images/services/restoration-store.jpg",
  },
  {
    id: "restoration-owner",
    title: "売買物件オーナー向け原状回復",
    subtitle: "売却前の内装整備で物件価値を高める。",
    description:
      "売買物件の売却前に、畳・クロス・床の状態を整えることで印象改善・価値向上につながります。買取業者・個人オーナーの方からのご依頼も承ります。",
    href: "/restoration/owner",
    category: "restoration",
    image: "/images/services/restoration-owner.jpg",
  },
  {
    id: "restoration-management",
    title: "管理会社向け対応",
    subtitle: "複数物件・継続案件を一元管理。",
    description:
      "管理会社様の複数物件における原状回復工事を継続的にお受けします。迅速な現地確認・見積もり・施工で、物件の回転率向上をサポートします。",
    href: "/restoration/management-company",
    category: "restoration",
    image: "/images/services/restoration-mgmt.jpg",
  },
];
