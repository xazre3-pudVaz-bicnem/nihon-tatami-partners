import type { Metadata } from "next";
import SeoLandingPage from "@/components/marketplace/SeoLandingPage";
import { MOCK_PROVIDERS } from "@/data/providers";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "埼玉県の網戸張替え業者を料金・口コミで比較",
  description:
    "埼玉県で網戸の張替えに対応する業者を料金・口コミ・対応エリアで比較。さいたま市・川口市・川越市ほか全域対応。標準メッシュから強化メッシュまで。無料見積もり。",
  path: "/saitama/amido/harikae",
});

export default function Page() {
  const providers = MOCK_PROVIDERS.filter((p) => p.status === "active")
    .sort((a, b) => (a.rank ?? 99) - (b.rank ?? 99))
    .slice(0, 6);

  return (
    <SeoLandingPage
      path="/saitama/amido/harikae"
      breadcrumbs={[
        { label: "トップ", href: "/" },
        { label: "埼玉県", href: "/saitama" },
        { label: "和室工事", href: "/saitama/washitsu" },
        { label: "網戸張替え" },
      ]}
      h1="埼玉県の網戸張替え — 料金比較・業者一覧"
      lead="埼玉県で網戸の張替えに対応する業者を料金・口コミで比較できます。破れた網戸を新しく張り替えることで、防虫・防風機能が回復します。"
      priceRows={[
        { label: "標準メッシュ", price: "2,000円〜/枚", note: "一般的な住宅向け" },
        { label: "強化メッシュ", price: "3,500円〜/枚", note: "ペット・花粉・防虫対応" },
      ]}
      providers={providers}
      searchHref="/search?category=amido"
      faqs={[
        {
          question: "網戸張替えにかかる時間はどのくらいですか？",
          answer:
            "1枚あたり数十分〜1時間程度が目安です。枚数が多い場合は1日で完了することも多いです。当日施工に対応している業者もあります。",
        },
        {
          question: "強化メッシュと標準メッシュの違いは何ですか？",
          answer:
            "強化メッシュはペットの爪による傷や、風圧に強い素材を使用しています。花粉対策用や防虫効果の高いメッシュもあります。用途に合わせてお選びください。料金は概算です。詳細は見積もりでご確認ください。",
        },
        {
          question: "畳・ふすまの張替えとあわせて網戸も依頼できますか？",
          answer:
            "和室まわりの工事を一括対応する業者があります。畳・ふすま・障子・網戸をまとめて依頼すると、日程調整や費用を効率的にまとめられます。",
        },
      ]}
      nearbyLinks={[
        { label: "ふすま張替え", href: "/saitama/fusuma/harikae" },
        { label: "障子張替え", href: "/saitama/shoji/harikae" },
        { label: "和室リフォーム", href: "/saitama/washitsu/reform" },
      ]}
      nearbyTitle="関連する工事から探す"
    />
  );
}
