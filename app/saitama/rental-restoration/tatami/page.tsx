import type { Metadata } from "next";
import SeoLandingPage from "@/components/marketplace/SeoLandingPage";
import { MOCK_PROVIDERS } from "@/data/providers";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "賃貸退去時の畳張替え費用の相場と業者の選び方｜埼玉",
  description:
    "賃貸の退去時に発生する畳張替え（原状回復）の費用相場と、借主・貸主の負担区分、業者の選び方を解説。埼玉県で原状回復に対応する業者を比較・一括見積もりできます。",
  path: "/saitama/rental-restoration/tatami",
});

export default function Page() {
  const providers = MOCK_PROVIDERS.filter((p) => p.status === "active")
    .filter((p) => p.acceptsRealEstate || p.acceptsPropertyManagement)
    .sort((a, b) => (a.rank ?? 99) - (b.rank ?? 99))
    .slice(0, 8);

  return (
    <SeoLandingPage
      path="/saitama/rental-restoration/tatami"
      breadcrumbs={[
        { label: "トップ", href: "/" },
        { label: "埼玉県", href: "/saitama" },
        { label: "賃貸原状回復の畳張替え" },
      ]}
      h1="賃貸退去時の畳張替え費用の相場と業者の選び方"
      lead="賃貸物件の退去時に発生する畳の張替え（原状回復）について、費用相場・負担区分の考え方・業者の選び方を解説します。埼玉県で原状回復に対応する業者を比較し、無料で一括見積もりを依頼できます。"
      intro={
        <>
          <p>賃貸物件の退去時には、畳の表替えや新調といった原状回復が必要になることがあります。費用の負担が借主・貸主のどちらになるかは、損傷の原因と契約内容によって変わります。</p>
          <p>判断に迷う場合は、国土交通省の「原状回復をめぐるトラブルとガイドライン」を参考にしてください。最終的な負担区分は契約内容と個別の事情によります。</p>
        </>
      }
      bodySections={[
        {
          heading: "敷金・借主負担・貸主負担の考え方",
          body: (
            <>
              <p><strong>借主負担になりやすいケース</strong>：タバコのヤニ汚れ・臭い、ペットによる傷や臭い（不可物件での飼育）、飲み物のシミ、換気不足によるカビなど、通常の使用を超える損傷。</p>
              <p><strong>貸主負担になりやすいケース</strong>：通常の使用による変色・摩耗、日焼けによる色あせなど、経年劣化に該当するもの。</p>
              <p>敷金から原状回復費用を差し引く場合も、その内訳が借主負担に該当するかを確認することが大切です。判断は契約内容と個別の事情によります。トラブルを避けるため、見積もりの内訳を書面で確認しましょう。</p>
            </>
          ),
        },
      ]}
      priceRows={[
        { label: "畳裏返し", price: "2,500円〜/枚", note: "比較的きれいな場合" },
        { label: "畳表替え", price: "3,200円〜/枚", note: "標準的な原状回復" },
        { label: "畳新調", price: "8,000円〜/枚", note: "傷みが大きい場合" },
        { label: "古畳処分", price: "500円〜/枚", note: "別途かかる場合あり" },
      ]}
      providers={providers}
      providersTitle="原状回復に対応する業者"
      searchHref="/search?acceptsRealEstate=true"
      faqs={[
        { question: "退去時の畳張替えは必ず借主負担ですか？", answer: "いいえ。通常の使用による経年劣化は貸主負担となるのが一般的です。借主の過失による損傷は借主負担になりやすいですが、判断は契約内容と個別の事情によります。" },
        { question: "国土交通省のガイドラインに沿った見積もりは出せますか？", answer: "ガイドラインを参考に、借主負担分・貸主負担分を分けた見積もりを作成できる業者があります。詳しくは見積もり時にご相談ください。" },
        { question: "管理会社・オーナーからまとめて依頼できますか？", answer: "複数物件の原状回復をまとめて対応する業者が掲載されています。請求書払い・継続取引に対応する業者もあります。" },
        { question: "退去から次の入居まで時間がありません。急いでもらえますか？", answer: "即日〜数営業日で対応する業者があります。お急ぎの場合は条件で絞り込むか、一括見積もりでご相談ください。" },
        { question: "裏返しと表替えどちらになりますか？", answer: "畳表の状態によります。裏面がまだきれいなら裏返し、傷みが進んでいれば表替えが目安です。現地確認で判断します。" },
      ]}
      nearbyLinks={[
        { label: "不動産会社向け", href: "/for-real-estate" },
        { label: "管理会社向け", href: "/for-property-management" },
        { label: "賃貸オーナー向け", href: "/for-landlords" },
        { label: "畳表替え", href: "/saitama/tatami/omotegae" },
      ]}
    />
  );
}
