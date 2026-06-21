import type { Metadata } from "next";
import SeoLandingPage from "@/components/marketplace/SeoLandingPage";
import { MOCK_PROVIDERS } from "@/data/providers";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "埼玉県のクロス・壁紙張替え業者を比較",
  description:
    "埼玉県でクロス・壁紙の張替えに対応する業者を料金・口コミで比較。和室の砂壁からの変更、洋室のクロス張替え、賃貸退去時の原状回復まで対応。無料見積もり。",
  path: "/saitama/cross/harikae",
});

export default function Page() {
  const providers = MOCK_PROVIDERS.filter((p) => p.status === "active")
    .sort((a, b) => (a.rank ?? 99) - (b.rank ?? 99))
    .slice(0, 6);

  return (
    <SeoLandingPage
      path="/saitama/cross/harikae"
      breadcrumbs={[
        { label: "トップ", href: "/" },
        { label: "埼玉県", href: "/saitama" },
        { label: "内装・原状回復", href: "/saitama" },
        { label: "クロス張替え" },
      ]}
      h1="埼玉県のクロス・壁紙張替え — 料金比較・業者一覧"
      lead="埼玉県でクロス・壁紙の張り替えに対応する業者を比較できます。和室の砂壁からの変更、洋室のクロス張替え、賃貸退去時の原状回復まで対応。"
      priceRows={[
        { label: "クロス張替え（標準品）", price: "800円〜/m²", note: "量産クロス" },
        { label: "クロス張替え（輸入品）", price: "1,500円〜/m²", note: "デザイン・高級クロス" },
        { label: "下地処理費", price: "500円〜/m²", note: "旧壁の状態による" },
      ]}
      providers={providers}
      searchHref="/search?category=cross"
      faqs={[
        {
          question: "6畳の部屋のクロス張替えにかかる費用の目安は？",
          answer:
            "6畳の部屋（壁面積の目安：約30m²）で、標準品クロスを使用した場合、材料費込みで3〜5万円が一般的な目安です。下地処理が必要な場合は追加費用がかかります。正確な金額は見積もりでご確認ください。",
        },
        {
          question: "砂壁からクロスに変更できますか？",
          answer:
            "砂壁・聚楽壁からクロスへの変更に対応する業者があります。既存の砂壁を除去し、下地処理を行ったうえでクロスを貼ります。下地処理費用が別途かかる場合があります。概算は見積もりでご確認ください。",
        },
        {
          question: "賃貸の退去時に原状回復でクロスを依頼できますか？",
          answer:
            "賃貸の原状回復（クロス張替え）に対応する業者があります。管理会社・オーナーからのご依頼にも対応できます。",
        },
      ]}
      nearbyLinks={[
        { label: "空室対策リフォーム", href: "/saitama/vacancy-reform" },
        { label: "クッションフロア張替え", href: "/saitama/floor/cushion-floor" },
        { label: "和室リフォーム", href: "/saitama/washitsu/reform" },
        { label: "砂壁・聚楽壁の塗り替え", href: "/saitama/washitsu/sunakabe" },
      ]}
      nearbyTitle="関連する工事から探す"
    />
  );
}
