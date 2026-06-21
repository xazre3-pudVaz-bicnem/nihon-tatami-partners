import type { Metadata } from "next";
import SeoLandingPage from "@/components/marketplace/SeoLandingPage";
import { MOCK_PROVIDERS } from "@/data/providers";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "埼玉県の空室対策リフォーム業者を比較",
  description:
    "埼玉県で空室対策リフォームに対応する業者を料金・口コミで比較。畳・クロス・床をまとめてリフォームし、入居希望者へのアピールを高めます。無料見積もり。",
  path: "/saitama/vacancy-reform",
});

export default function Page() {
  const providers = MOCK_PROVIDERS.filter((p) => p.status === "active")
    .sort((a, b) => (a.rank ?? 99) - (b.rank ?? 99))
    .slice(0, 6);

  return (
    <SeoLandingPage
      path="/saitama/vacancy-reform"
      breadcrumbs={[
        { label: "トップ", href: "/" },
        { label: "埼玉県", href: "/saitama" },
        { label: "内装・原状回復", href: "/saitama" },
        { label: "空室対策リフォーム" },
      ]}
      h1="埼玉県の空室対策リフォーム — 料金比較・業者一覧"
      lead="埼玉県で空室対策リフォームに対応する業者を比較できます。畳・クロス・床をまとめてリフォームし、入居希望者へのアピールを高めます。"
      priceRows={[
        {
          label: "畳表替え+クロス張替えセット",
          price: "50,000円〜/室",
          note: "素材・面積により変動",
        },
        {
          label: "フルリフォーム（和室→洋室転換含む）",
          price: "100,000円〜/室",
          note: "内容・規模により変動",
        },
      ]}
      providers={providers}
      searchHref="/search?category=vacancy"
      faqs={[
        {
          question: "空室対策リフォームで効果的な工事はどれですか？",
          answer:
            "畳の表替え・クロスの張替えは費用対効果が高く、入居者の印象を大きく改善できます。和室を洋室に転換することで入居者層を広げる効果も期待できます。具体的な提案は業者の見積もりでご確認ください。",
        },
        {
          question: "和室を洋室に変更するリフォームも対応できますか？",
          answer:
            "和室から洋室への転換（和洋転換）に対応する業者があります。畳の撤去・フローリング敷設・クロス張替えをあわせて施工します。費用は規模・内容によって異なります。概算は見積もりでご確認ください。",
        },
        {
          question: "複数の物件をまとめて依頼できますか？",
          answer:
            "不動産会社・管理会社から複数物件をまとめて受け付けている業者があります。請求書払い・インボイス対応の業者も掲載しています。",
        },
      ]}
      nearbyLinks={[
        { label: "畳表替え", href: "/saitama/tatami/omotegae" },
        { label: "クロス張替え", href: "/saitama/cross/harikae" },
        { label: "クッションフロア張替え", href: "/saitama/floor/cushion-floor" },
        { label: "和室リフォーム", href: "/saitama/washitsu/reform" },
        { label: "賃貸原状回復", href: "/saitama/rental-restoration/tatami" },
      ]}
      nearbyTitle="関連する工事から探す"
    />
  );
}
