import type { Metadata } from "next";
import SeoLandingPage from "@/components/marketplace/SeoLandingPage";
import { MOCK_PROVIDERS } from "@/data/providers";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "神社向け 拝殿・社務所の畳張替え業者を比較｜埼玉",
  description:
    "埼玉県で神社の拝殿・社務所の畳張替えに対応する業者を比較。格式に合わせた縁・素材の選定、神事前のスケジュール対応、特殊サイズの畳に応じる業者を一覧から探せます。無料見積もり。",
  path: "/saitama/shrine/tatami",
});

export default function Page() {
  const providers = MOCK_PROVIDERS.filter((p) => p.status === "active")
    .filter((p) => p.acceptsTempleShrine)
    .sort((a, b) => (a.rank ?? 99) - (b.rank ?? 99))
    .slice(0, 8);

  return (
    <SeoLandingPage
      path="/saitama/shrine/tatami"
      breadcrumbs={[
        { label: "トップ", href: "/" },
        { label: "埼玉県", href: "/saitama" },
        { label: "神社向け畳張替え" },
      ]}
      h1="埼玉県の神社向け 拝殿・社務所の畳張替え"
      lead="埼玉県で神社の拝殿・社務所の畳張替えに対応する業者を、料金・口コミ・対応エリアで比較できます。格式に合わせた縁・素材の選定、神事前のスケジュール対応、特殊サイズの畳に応じる業者を掲載しています。"
      intro={
        <p>神社の拝殿・社務所の畳工事は、格式と用途に応じた縁・素材の選定が大切です。京間・本間など大きな寸法への対応や、神事・祭事のスケジュールに合わせた工事計画が求められます。神聖な空間への敬意をもって作業できる業者を選ぶと安心です。</p>
      }
      priceRows={[
        { label: "拝殿畳 表替え（上等い草）", price: "6,000円〜/枚", note: "格式に応じて" },
        { label: "紋縁・高麗縁", price: "要見積もり", note: "縁の種類による" },
        { label: "特殊寸法（京間・本間）", price: "要見積もり", note: "現地採寸が必要" },
        { label: "社務所の畳", price: "4,000円〜/枚", note: "用途による" },
      ]}
      providers={providers}
      providersTitle="神社対応の業者"
      searchHref="/search?acceptsTempleShrine=true"
      faqs={[
        { question: "拝殿の畳が大きいサイズですが対応できますか？", answer: "京間・本間など大きなサイズや特殊な形状にもオーダー製作で対応する業者があります。現地でのサイズ測定が必要です。" },
        { question: "社紋を入れた縁を選べますか？", answer: "紋縁・高麗縁など格式に応じた縁を選べます。社紋を入れた縁の相談に応じる業者もあります。" },
        { question: "神事の前に間に合わせたいのですが？", answer: "祭事が決まったら早めにご相談ください。スケジュールに合わせた工事計画を立てられる業者があります。" },
        { question: "社務所と拝殿をまとめて頼めますか？", answer: "用途に応じて素材・縁を変えながら、まとめて対応する業者があります。現地確認後にご提案します。" },
        { question: "神聖な空間への配慮はしてもらえますか？", answer: "敬意をもって作業し、什器の取り扱いにも配慮する業者があります。事前に確認のうえ対応します。" },
      ]}
      nearbyLinks={[
        { label: "寺院・神社向け（詳細）", href: "/for-temple-shrine" },
        { label: "寺院向け", href: "/saitama/temple/tatami" },
        { label: "旅館向け", href: "/saitama/ryokan/tatami" },
      ]}
    />
  );
}
