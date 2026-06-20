import type { Metadata } from "next";
import SeoLandingPage from "@/components/marketplace/SeoLandingPage";
import { MOCK_PROVIDERS } from "@/data/providers";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "管理会社向け 畳張替え業者を比較｜埼玉",
  description:
    "埼玉県で管理会社向けに畳張替え・原状回復を継続対応する業者を比較。入退去のたびの手配を効率化し、請求書払い・複数物件の一括対応に応じる業者を一覧から探せます。無料見積もり。",
  path: "/saitama/property-management/tatami",
});

export default function Page() {
  const providers = MOCK_PROVIDERS.filter((p) => p.status === "active")
    .filter((p) => p.acceptsPropertyManagement || p.acceptsRealEstate)
    .sort((a, b) => (a.rank ?? 99) - (b.rank ?? 99))
    .slice(0, 8);

  return (
    <SeoLandingPage
      path="/saitama/property-management/tatami"
      breadcrumbs={[
        { label: "トップ", href: "/" },
        { label: "埼玉県", href: "/saitama" },
        { label: "管理会社向け畳張替え" },
      ]}
      h1="埼玉県の管理会社向け 畳張替え・原状回復"
      lead="埼玉県で管理会社向けに畳張替え・原状回復を継続対応する業者を、料金・口コミ・対応エリアで比較できます。入退去のたびの手配を効率化し、請求書払い・複数物件の一括対応に応じる業者を掲載しています。"
      intro={
        <p>管理物件が増えるほど、入退去のたびの見積もり・発注・立ち会いが業務を圧迫します。担当窓口を決めて継続的に依頼できる業者を選ぶと、発注から精算までを効率化でき、オーナーへの報告もしやすくなります。</p>
      }
      priceRows={[
        { label: "畳裏返し", price: "2,500円〜/枚", note: "状態が良い場合" },
        { label: "畳表替え", price: "3,200円〜/枚", note: "標準的な原状回復" },
        { label: "畳新調", price: "8,000円〜/枚", note: "傷みが大きい場合" },
        { label: "複数物件・継続取引", price: "要見積もり", note: "窓口一本化で相談可" },
      ]}
      providers={providers}
      providersTitle="管理会社対応の業者"
      searchHref="/search?acceptsRealEstate=true"
      faqs={[
        { question: "入退去のたびに発注するのが大変です", answer: "担当窓口を決めて継続対応する業者があります。退去連絡から現地確認・施工までの流れを定型化できます。" },
        { question: "請求書払い・月次精算はできますか？", answer: "請求書払い・インボイス対応の業者があります。月次でまとめた精算に応じる業者もあります。" },
        { question: "オーナーへの報告資料は出せますか？", answer: "施工内容や費用の内訳、写真付き報告に対応する業者があります。報告のしやすさを基準に選ぶと便利です。" },
        { question: "緊急対応はできますか？", answer: "雨漏り後の畳交換など、急ぎの依頼に対応する業者があります。即日対応の可否を条件で絞り込めます。" },
        { question: "複数物件をまとめて頼めますか？", answer: "複数物件の一括対応に応じる業者を掲載しています。継続取引の条件もご相談いただけます。" },
      ]}
      nearbyLinks={[
        { label: "管理会社向け（詳細）", href: "/for-property-management" },
        { label: "不動産会社向け", href: "/saitama/real-estate/tatami" },
        { label: "賃貸原状回復", href: "/saitama/rental-restoration/tatami" },
      ]}
    />
  );
}
