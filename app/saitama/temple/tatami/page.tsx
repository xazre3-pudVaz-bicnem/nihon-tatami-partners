import type { Metadata } from "next";
import SeoLandingPage from "@/components/marketplace/SeoLandingPage";
import { MOCK_PROVIDERS } from "@/data/providers";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "寺院向け 本堂・客殿の畳張替え業者を比較｜埼玉",
  description:
    "埼玉県で寺院の本堂・客殿の畳張替えに対応する業者を比較。格式に合わせた縁・素材の選定、法要前のスケジュール対応、特殊サイズの畳に応じる業者を一覧から探せます。無料見積もり。",
  path: "/saitama/temple/tatami",
});

export default function Page() {
  const providers = MOCK_PROVIDERS.filter((p) => p.status === "active")
    .filter((p) => p.acceptsTempleShrine)
    .sort((a, b) => (a.rank ?? 99) - (b.rank ?? 99))
    .slice(0, 8);

  return (
    <SeoLandingPage
      path="/saitama/temple/tatami"
      breadcrumbs={[
        { label: "トップ", href: "/" },
        { label: "埼玉県", href: "/saitama" },
        { label: "寺院向け畳張替え" },
      ]}
      h1="埼玉県の寺院向け 本堂・客殿の畳張替え"
      lead="埼玉県で寺院の本堂・客殿の畳張替えに対応する業者を、料金・口コミ・対応エリアで比較できます。格式に合わせた縁・素材の選定、法要前のスケジュール対応、特殊サイズの畳に応じる業者を掲載しています。"
      intro={
        <p>寺院の本堂・客殿の畳工事は、一般住宅とは異なる配慮が必要です。高麗縁・紋縁など格式に合わせた縁の選定、京間・本間といった大きな寸法への対応、法要・行事のスケジュールに合わせた工事計画が求められます。施工時の所作や什器・仏具の取り扱いにも配慮できる業者を選ぶと安心です。</p>
      }
      priceRows={[
        { label: "本堂畳 表替え（上等い草）", price: "6,000円〜/枚", note: "格式に応じて" },
        { label: "紋縁・高麗縁", price: "要見積もり", note: "縁の種類による" },
        { label: "特殊寸法（京間・本間）", price: "要見積もり", note: "現地採寸が必要" },
        { label: "本堂まるごと（目安）", price: "要見積もり", note: "枚数による" },
      ]}
      providers={providers}
      providersTitle="寺院対応の業者"
      searchHref="/search?acceptsTempleShrine=true"
      faqs={[
        { question: "本堂の畳が特殊サイズですが対応できますか？", answer: "京間・本間など大きなサイズや特殊な形状にもオーダー製作で対応する業者があります。現地でのサイズ測定が必要です。" },
        { question: "格式に合わせた縁を選べますか？", answer: "高麗縁・紋縁・無地縁など、用途と格式に応じた縁を選べます。寺紋を入れた縁の相談に応じる業者もあります。" },
        { question: "法要の前に間に合わせたいのですが？", answer: "行事が決まったら早めにご相談ください。スケジュールに合わせた工事計画を立てられる業者があります。" },
        { question: "仏具の取り扱いは配慮してもらえますか？", answer: "神聖な空間への敬意をもって、仏具・什器の移動を丁寧に行う業者があります。事前に確認のうえ対応します。" },
        { question: "枚数が多くても対応できますか？", answer: "複数職人で並行施工し、大型の本堂にも対応する業者があります。現地確認後にスケジュールを提案します。" },
      ]}
      nearbyLinks={[
        { label: "寺院・神社向け（詳細）", href: "/for-temple-shrine" },
        { label: "神社向け", href: "/saitama/shrine/tatami" },
        { label: "旅館向け", href: "/saitama/ryokan/tatami" },
      ]}
    />
  );
}
