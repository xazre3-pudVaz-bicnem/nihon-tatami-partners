import type { Metadata } from "next";
import SeoLandingPage from "@/components/marketplace/SeoLandingPage";
import { MOCK_PROVIDERS } from "@/data/providers";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "不動産会社向け 畳張替え業者を比較｜埼玉",
  description:
    "埼玉県で不動産会社向けに畳張替え・原状回復を一括対応する業者を比較。売却前の内装整備や複数物件の対応、請求書払いに応じる業者を一覧から探せます。無料で一括見積もり。",
  path: "/saitama/real-estate/tatami",
});

export default function Page() {
  const providers = MOCK_PROVIDERS.filter((p) => p.status === "active")
    .filter((p) => p.acceptsRealEstate)
    .sort((a, b) => (a.rank ?? 99) - (b.rank ?? 99))
    .slice(0, 8);

  return (
    <SeoLandingPage
      path="/saitama/real-estate/tatami"
      breadcrumbs={[
        { label: "トップ", href: "/" },
        { label: "埼玉県", href: "/saitama" },
        { label: "不動産会社向け畳張替え" },
      ]}
      h1="埼玉県の不動産会社向け 畳張替え・原状回復"
      lead="埼玉県で不動産会社向けに畳張替え・原状回復を一括対応する業者を、料金・口コミ・対応エリアで比較できます。売却前の内装整備や複数物件の対応、請求書払いに応じる業者を掲載しています。"
      intro={
        <p>中古住宅の売却前に畳・内装を整えると、内見時の印象が大きく変わります。畳の表替えは比較的少ない費用で和室の印象を改善でき、成約率や売却価格に影響することがあります。畳・クロス・床までまとめて依頼できる業者を選ぶと、手配の手間を減らせます。</p>
      }
      priceRows={[
        { label: "畳表替え", price: "3,200円〜/枚", note: "売却前の印象改善に" },
        { label: "畳新調", price: "8,000円〜/枚", note: "傷みが大きい場合" },
        { label: "クロス張替え", price: "要見積もり", note: "面積による" },
        { label: "複数物件まとめて", price: "要見積もり", note: "継続取引で相談可" },
      ]}
      providers={providers}
      providersTitle="不動産会社対応の業者"
      searchHref="/search?acceptsRealEstate=true"
      faqs={[
        { question: "売却前の物件をまとめて整えたいのですが？", answer: "畳・クロス・床まで一括対応する業者があります。複数物件の継続取引にも応じる業者を掲載しています。" },
        { question: "請求書払いはできますか？", answer: "法人向けに請求書払い・インボイス対応の業者があります。対応欄をご確認のうえ、見積もり時にご相談ください。" },
        { question: "費用を抑えて印象を良くしたいのですが？", answer: "畳の表替えは比較的低コストで和室の印象を改善できます。優先順位をつけた提案ができる業者にご相談ください。" },
        { question: "内見に間に合うように急いでもらえますか？", answer: "即日〜数営業日で対応する業者があります。スケジュールを伝えてご相談ください。" },
        { question: "見積もりの内訳は明確ですか？", answer: "材料費・施工費・出張費などの内訳を提示する業者を選ぶと、貸主・売主への説明がしやすくなります。" },
      ]}
      nearbyLinks={[
        { label: "不動産会社向け（詳細）", href: "/for-real-estate" },
        { label: "管理会社向け", href: "/saitama/property-management/tatami" },
        { label: "賃貸原状回復", href: "/saitama/rental-restoration/tatami" },
      ]}
    />
  );
}
