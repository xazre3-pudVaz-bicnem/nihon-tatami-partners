import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { SITE_URL } from "@/lib/metadata";

const ARTICLES: Record<string, {
  title: string;
  category: string;
  publishedAt: string;
  readTime: string;
  body: { type: "p" | "h2" | "h3" | "ul"; content: string | string[] }[];
  relatedServices: { name: string; slug: string }[];
}> = {
  "tatami-omotegae-timing": {
    title: "畳の表替えはいつするべき？時期の目安と判断基準を解説",
    category: "畳のメンテナンス",
    publishedAt: "2024-11-10",
    readTime: "5分",
    body: [
      { type: "p", content: "畳の表替えは、適切なタイミングで行うことが重要です。早すぎると費用がもったいなく、遅すぎると畳が傷みすぎてしまいます。本記事では、表替えの適切なタイミングと判断基準を解説します。" },
      { type: "h2", content: "畳の表替えが必要なサイン" },
      { type: "ul", content: ["畳の色が黄色や茶色に変色してきた", "い草の香りがなくなった", "表面がボロボロと毛羽立ってきた", "ダニやカビが発生している", "畳を踏んだときにフカフカ感が減った"] },
      { type: "h2", content: "一般的な表替えの目安年数" },
      { type: "p", content: "標準的な使用状況（1部屋・日常的に使用）の場合、畳表替えの目安は5〜7年です。ただし、使用頻度・日当たり・湿度環境によって大きく変わります。" },
      { type: "h2", content: "表替えに最適な季節" },
      { type: "p", content: "畳の表替えに最適な季節は春（3〜5月）と秋（9〜11月）です。気温・湿度が安定しており、施工後の畳が乾燥しやすいためです。梅雨の時期（6〜7月）は避けるか、施工後の乾燥管理に注意が必要です。" },
      { type: "h2", content: "埼玉で表替えを依頼するには" },
      { type: "p", content: "日本畳パートナーでは、埼玉県内の畳表替え業者を料金・口コミで比較できます。無料見積もりに対応した業者も多数掲載しています。" },
    ],
    relatedServices: [
      { name: "畳表替え", slug: "tatami-omotegae" },
      { name: "畳裏返し", slug: "tatami-uragaeshi" },
      { name: "畳新調", slug: "tatami-shinchou" },
    ],
  },
  "tatami-price-guide": {
    title: "【2025年版】畳表替えの費用相場を徹底解説｜6畳でいくら？",
    category: "費用・相場",
    publishedAt: "2024-11-05",
    readTime: "8分",
    body: [
      { type: "p", content: "畳の表替えを検討している方の多くが「費用がいくらかかるのか」を知りたいと思っています。本記事では2025年時点の相場を素材別・枚数別に詳しく解説します。" },
      { type: "h2", content: "畳表替えの費用相場（埼玉県）" },
      { type: "ul", content: ["標準い草（外国産）：3,800円〜5,000円/枚", "国産い草：7,000円〜12,000円/枚", "和紙畳：8,000円〜13,000円/枚", "樹脂畳：8,000円〜12,000円/枚"] },
      { type: "h2", content: "6畳で表替えするといくら？" },
      { type: "p", content: "一般的な6畳の表替え費用は、標準い草で2万3,000円〜3万円、国産い草で4万2,000円〜7万2,000円が目安です。業者によって料金差があるため、複数の業者から見積もりを取ることをおすすめします。" },
      { type: "h2", content: "追加料金が発生するケース" },
      { type: "ul", content: ["家具の移動が必要な場合（1点あたり500〜2,000円）", "駐車場がない場合（コインパーキング代実費）", "縁（へり）のアップグレード", "特殊サイズの畳（別途見積もり）"] },
      { type: "h2", content: "費用を安く抑えるコツ" },
      { type: "p", content: "複数の業者から見積もりを取り、料金・サービス内容を比較することが最も効果的です。また、複数部屋・複数枚まとめて発注することで割引になる業者も多くいます。" },
    ],
    relatedServices: [
      { name: "畳表替え", slug: "tatami-omotegae" },
    ],
  },
  "tatami-material-choose": {
    title: "国産い草・和紙畳・樹脂畳の違いと選び方",
    category: "素材・種類",
    publishedAt: "2024-10-25",
    readTime: "6分",
    body: [
      { type: "p", content: "畳表の素材選びは、仕上がりの品質・耐久性・コスト・用途によって大きく変わります。主要素材の特徴を比較して、あなたに合う素材を選びましょう。" },
      { type: "h2", content: "素材別の特徴比較" },
      { type: "h3", content: "国産い草" },
      { type: "p", content: "国産（主に熊本産）のい草は、品質・香り・耐久性すべてにおいて優れています。価格は外国産の約2倍ですが、長持ちするため長期的なコストパフォーマンスは良い場合もあります。" },
      { type: "h3", content: "和紙畳" },
      { type: "p", content: "和紙を使用した畳表で、ダニ・カビが発生しにくく耐久性が高い素材です。色のバリエーションも豊富で、モダンな和室にも合います。ペットや小さなお子さんがいるご家庭におすすめです。" },
      { type: "h3", content: "樹脂畳" },
      { type: "p", content: "ポリプロピレン等の樹脂製で、水拭きができ耐久性が非常に高い素材です。旅館・民泊・土足対応の施設で多く使われています。い草の香りはありません。" },
    ],
    relatedServices: [
      { name: "畳表替え", slug: "tatami-omotegae" },
      { name: "和紙畳", slug: "washi-tatami" },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(ARTICLES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES[slug];
  if (!article) return {};
  return {
    title: `${article.title} | 日本畳パートナー マガジン`,
    description: `${article.body[0].type === "p" ? String(article.body[0].content).slice(0, 120) : ""}`,
    alternates: { canonical: `${SITE_URL}/magazine/${slug}` },
  };
}

export default async function MagazineArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = ARTICLES[slug];
  if (!article) notFound();

  return (
    <div className="min-h-screen bg-shiro">
      <div className="bg-sumi">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumbs items={[
            { label: "トップ", href: "/" },
            { label: "マガジン", href: "/magazine" },
            { label: article.title },
          ]} />
        </div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 pt-2">
          <span className="text-xs border border-kiji/60 text-white/50 px-2 py-0.5 mb-3 inline-block">{article.category}</span>
          <h1 className="text-xl md:text-2xl text-white leading-tight" style={{ fontFamily: "var(--font-serif)" }}>{article.title}</h1>
          <p className="text-xs text-white/40 mt-3">{article.publishedAt} | 読了目安 {article.readTime}</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <article className="bg-white border border-border p-6 sm:p-8 mb-8 space-y-4">
          {article.body.map((block, i) => {
            if (block.type === "h2") return <h2 key={i} className="text-lg text-sumi mt-6 mb-2 pb-2 border-b border-kiji" style={{ fontFamily: "var(--font-serif)" }}>{String(block.content)}</h2>;
            if (block.type === "h3") return <h3 key={i} className="text-base text-sumi mt-4 mb-1" style={{ fontFamily: "var(--font-serif)" }}>{String(block.content)}</h3>;
            if (block.type === "p") return <p key={i} className="text-sm text-sumi/80 leading-relaxed">{String(block.content)}</p>;
            if (block.type === "ul") return (
              <ul key={i} className="space-y-1">
                {(block.content as string[]).map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-sumi/80">
                    <span className="text-igusa mt-0.5 shrink-0">・</span>{item}
                  </li>
                ))}
              </ul>
            );
            return null;
          })}
        </article>

        {/* 関連サービスへの誘導 */}
        <div className="bg-kiji/40 border border-kiji p-5 mb-6">
          <h2 className="text-sm text-sumi mb-3" style={{ fontFamily: "var(--font-serif)" }}>この記事に関連するサービス</h2>
          <div className="flex flex-wrap gap-2">
            {article.relatedServices.map((s) => (
              <Link key={s.slug} href={`/${s.slug}`} className="text-sm bg-white border border-border text-sumi/70 hover:border-ai hover:text-ai transition-colors px-4 py-2">
                埼玉の{s.name}業者を探す →
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <Link href="/magazine" className="text-xs text-ai hover:underline">&larr; マガジン一覧に戻る</Link>
        </div>
      </div>
    </div>
  );
}
