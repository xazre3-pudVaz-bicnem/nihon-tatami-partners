import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { SITE_URL } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "畳・和室リフォームのお役立ちガイド | 日本畳パートナー マガジン",
  description: "畳の表替え・新調の時期・費用相場・選び方など、畳と和室に関する役立つ情報を発信しています。",
  alternates: { canonical: `${SITE_URL}/magazine` },
};

const ARTICLES = [
  {
    slug: "tatami-omotegae-timing",
    category: "畳のメンテナンス",
    title: "畳の表替えはいつするべき？時期の目安と判断基準を解説",
    excerpt: "畳の表替えのベストタイミングを、畳の状態・年数・費用の観点から詳しく解説。「そろそろかな」と思った時に参考にしてください。",
    readTime: "5分",
    publishedAt: "2024-11-10",
  },
  {
    slug: "tatami-price-guide",
    category: "費用・相場",
    title: "【2025年版】畳表替えの費用相場を徹底解説｜6畳でいくら？",
    excerpt: "埼玉県での畳表替えの費用相場を素材別（標準・国産・和紙）に比較。追加料金が発生するケースも解説します。",
    readTime: "8分",
    publishedAt: "2024-11-05",
  },
  {
    slug: "tatami-material-choose",
    category: "素材・種類",
    title: "国産い草・和紙畳・樹脂畳の違いと選び方｜あなたに合う素材は？",
    excerpt: "畳表の素材は多種多様。国産い草・外国産い草・和紙・樹脂それぞれのメリット・デメリットをわかりやすく比較します。",
    readTime: "6分",
    publishedAt: "2024-10-25",
  },
  {
    slug: "fusuma-diy-or-professional",
    category: "ふすま・障子",
    title: "ふすまの張替えはDIYと業者どちらが得？費用と仕上がりを比較",
    excerpt: "ふすまの張替えを自分でやるか業者に頼むか迷っている方へ。費用差・仕上がりの違い・難易度を正直に解説します。",
    readTime: "5分",
    publishedAt: "2024-10-15",
  },
  {
    slug: "ryukyu-tatami-guide",
    category: "素材・種類",
    title: "琉球畳・縁なし畳の魅力と費用相場｜おしゃれな和室へのリフォームガイド",
    excerpt: "モダンな和室に人気の琉球畳・縁なし畳。費用相場・デザインの選び方・敷き方のポイントを解説します。",
    readTime: "7分",
    publishedAt: "2024-10-01",
  },
  {
    slug: "rental-tatami-guide",
    category: "賃貸・原状回復",
    title: "賃貸退去時の畳張替え費用は誰が負担する？ガイドラインと事例解説",
    excerpt: "退去時の畳の費用負担について、国土交通省のガイドラインをもとに解説。家主・入居者それぞれの負担範囲を明確にします。",
    readTime: "6分",
    publishedAt: "2024-09-20",
  },
  {
    slug: "tatami-mold-prevention",
    category: "畳のメンテナンス",
    title: "畳のカビ・ダニを防ぐ正しいお手入れ方法｜日常ケアから本格対策まで",
    excerpt: "梅雨時期の畳のカビ・ダニ対策を徹底解説。日常のお手入れから本格的な対策、業者への相談が必要な状態の見分け方まで。",
    readTime: "8分",
    publishedAt: "2024-09-10",
  },
  {
    slug: "saitama-tatami-shop-choose",
    category: "業者選び",
    title: "埼玉の畳業者の選び方｜資格・口コミ・料金で失敗しない選び方",
    excerpt: "埼玉で畳業者を選ぶ際のポイントを解説。一級畳製作技能士などの資格・口コミの見方・料金比較の方法をご紹介します。",
    readTime: "5分",
    publishedAt: "2024-08-30",
  },
];

const CATEGORIES = ["すべて", "畳のメンテナンス", "費用・相場", "素材・種類", "ふすま・障子", "賃貸・原状回復", "業者選び"];

export default function MagazinePage() {
  return (
    <div className="min-h-screen bg-shiro">
      <div className="bg-sumi">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumbs items={[{ label: "トップ", href: "/" }, { label: "マガジン" }]} />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 pt-2">
          <h1 className="text-2xl md:text-3xl text-white mb-2" style={{ fontFamily: "var(--font-serif)" }}>
            畳・和室リフォームのお役立ちガイド
          </h1>
          <p className="text-sm text-white/60">費用相場・選び方・メンテナンスなど役立つ情報を発信</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* カテゴリフィルタ */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((cat, i) => (
            <button key={cat} className={`text-xs px-3 py-1.5 border transition-colors ${i === 0 ? "border-ai bg-ai text-white" : "border-border text-sumi/60 hover:border-ai hover:text-ai"}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* 記事グリッド */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ARTICLES.map((article) => (
            <Link
              key={article.slug}
              href={`/magazine/${article.slug}`}
              className="group bg-white border border-border hover:border-kincya/40 transition-all duration-300 hover:shadow-sm overflow-hidden"
            >
              <div className="h-36 bg-kiji/50 tatami-pattern flex items-end p-3">
                <span className="text-xs border border-kiji bg-white/80 text-sumi/60 px-2 py-0.5">
                  {article.category}
                </span>
              </div>
              <div className="p-4">
                <h2 className="text-sm text-sumi group-hover:text-ai transition-colors leading-snug mb-2 line-clamp-3" style={{ fontFamily: "var(--font-serif)" }}>
                  {article.title}
                </h2>
                <p className="text-xs text-sumi/60 line-clamp-2 mb-3">{article.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-sumi/40">
                  <span>{article.publishedAt}</span>
                  <span>読了 {article.readTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* サービス誘導 */}
        <div className="mt-12 bg-sumi text-white p-8 text-center">
          <h2 className="text-xl mb-2" style={{ fontFamily: "var(--font-serif)" }}>埼玉の畳・和室工事業者を探す</h2>
          <p className="text-sm text-white/60 mb-4">料金・口コミで比較して、安心して依頼できる業者を見つけてください</p>
          <Link href="/search" className="inline-block bg-kincya text-white px-8 py-3 text-sm tracking-wider hover:bg-do transition-colors duration-300">
            業者を探す
          </Link>
        </div>
      </div>
    </div>
  );
}
