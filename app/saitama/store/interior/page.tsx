import type { Metadata } from "next";
import SeoLandingPage from "@/components/marketplace/SeoLandingPage";
import { MOCK_PROVIDERS } from "@/data/providers";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "埼玉県の店舗内装業者を比較",
  description:
    "埼玉県で店舗内装工事に対応する業者を料金・口コミで比較。飲食店・美容室・小売店・和室を活かした店舗など、用途に合わせた提案が可能な業者を探せます。無料見積もり。",
  path: "/saitama/store/interior",
});

export default function Page() {
  const providers = MOCK_PROVIDERS.filter((p) => p.status === "active")
    .sort((a, b) => (a.rank ?? 99) - (b.rank ?? 99))
    .slice(0, 6);

  return (
    <SeoLandingPage
      path="/saitama/store/interior"
      breadcrumbs={[
        { label: "トップ", href: "/" },
        { label: "埼玉県", href: "/saitama" },
        { label: "内装・原状回復", href: "/saitama" },
        { label: "店舗内装" },
      ]}
      h1="埼玉県の店舗内装工事 — 料金比較・業者一覧"
      lead="埼玉県で店舗内装工事に対応する業者を比較できます。飲食店・美容室・小売店・和室を活かした店舗など、用途に合わせた提案が可能な業者を探せます。"
      priceRows={[
        { label: "和室内装（畳+ふすま）", price: "50,000円〜/室", note: "素材・面積により変動" },
        { label: "一般内装リフォーム", price: "100,000円〜/式", note: "内容・規模により変動" },
      ]}
      providers={providers}
      searchHref="/search?category=store"
      faqs={[
        {
          question: "飲食店や和室を使った店舗の内装に対応できますか？",
          answer:
            "飲食店・和室を活かした店舗の内装工事に対応する業者があります。畳・ふすま・障子など和室素材を店舗空間にコーディネートすることも可能です。概算は見積もりでご確認ください。",
        },
        {
          question: "店舗内装の工期はどのくらいかかりますか？",
          answer:
            "内容・規模によって大きく異なります。小規模な内装（畳・壁の張替えなど）であれば数日〜1週間程度が目安です。大規模な改装は1ヶ月以上かかる場合があります。",
        },
        {
          question: "店舗の和室内装をまとめて依頼できますか？",
          answer:
            "畳・ふすま・障子・壁まで和室内装を一括対応する業者があります。窓口が一つになることで、統一感のある仕上がりと工期短縮が期待できます。",
        },
      ]}
      nearbyLinks={[
        { label: "和室リフォーム", href: "/saitama/washitsu/reform" },
        { label: "畳工事", href: "/saitama/tatami" },
        { label: "クロス張替え", href: "/saitama/cross/harikae" },
        { label: "空室対策リフォーム", href: "/saitama/vacancy-reform" },
      ]}
      nearbyTitle="関連する工事から探す"
    />
  );
}
