import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import FAQSection from "@/components/common/FAQSection";
import SimpleMarkdown from "@/components/common/SimpleMarkdown";
import { COLUMN_ARTICLES } from "@/data/columns";
import { SITE_URL } from "@/lib/metadata";
import { formatDate } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

const getArticle = (slug: string) => COLUMN_ARTICLES.find((a) => a.slug === slug);

export async function generateStaticParams() {
  return COLUMN_ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: `${article.title} | 日本畳パートナーズ`,
    description: article.description,
    alternates: { canonical: `${SITE_URL}/articles/${slug}` },
    openGraph: { title: article.title, description: article.description, type: "article", locale: "ja_JP" },
    twitter: { card: "summary_large_image" },
  };
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const related = (article.relatedSlugs ?? [])
    .map((s) => getArticle(s))
    .filter(Boolean)
    .slice(0, 3);
  const fallbackRelated =
    related.length > 0
      ? related
      : COLUMN_ARTICLES.filter((a) => a.category === article.category && a.slug !== slug).slice(0, 3);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "トップ", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "コラム", item: `${SITE_URL}/articles` },
      { "@type": "ListItem", position: 3, name: article.title, item: `${SITE_URL}/articles/${slug}` },
    ],
  };
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    author: { "@type": "Organization", name: "日本畳パートナーズ" },
    publisher: { "@type": "Organization", name: "日本畳パートナーズ", url: SITE_URL },
    mainEntityOfPage: `${SITE_URL}/articles/${slug}`,
  };
  const faqJsonLd = article.faqs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: article.faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      }
    : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      {faqJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />}

      <div className="min-h-screen bg-shiro">
        <div className="bg-sumi">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumbs
              variant="dark"
              items={[{ label: "トップ", href: "/" }, { label: "コラム", href: "/articles" }, { label: article.title }]}
            />
          </div>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 pt-4">
            <span className="text-xs text-kincya border border-kincya/30 px-2 py-0.5">{article.category}</span>
            <h1 className="text-xl md:text-3xl text-white mt-3 leading-tight" style={{ fontFamily: "var(--font-serif)" }}>
              {article.title}
            </h1>
            <p className="text-sm text-white/50 mt-3">
              {formatDate(article.publishedAt)}
              {article.readTime ? `・約${article.readTime}分で読めます` : ""}
            </p>
          </div>
        </div>

        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-sm text-sumi/70 leading-relaxed bg-kiji/40 border border-kiji p-4 mb-6">
            {article.description}
          </p>

          <SimpleMarkdown source={article.body} />

          {/* FAQ */}
          {article.faqs && article.faqs.length > 0 && (
            <div className="mt-8 -mx-4 sm:-mx-6 lg:-mx-8">
              <FAQSection items={article.faqs} title="この記事に関するよくある質問" />
            </div>
          )}

          {/* 関連サービス・CTA */}
          <section className="mt-10 bg-kiji/40 border border-kiji p-6 text-center">
            <h2 className="text-lg text-sumi mb-2" style={{ fontFamily: "var(--font-serif)" }}>
              畳・和室の工事を依頼するなら
            </h2>
            <p className="text-sm text-sumi/60 mb-4">埼玉県の業者を料金・口コミで比較。無料で見積もり依頼ができます。</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/search" className="bg-kincya text-white px-6 py-3 text-sm hover:bg-do transition-colors">
                業者を探す
              </Link>
              <Link href="/prices" className="border border-ai text-ai px-6 py-3 text-sm hover:bg-ai hover:text-white transition-colors">
                料金相場を見る
              </Link>
            </div>
          </section>

          {/* 関連記事 */}
          {fallbackRelated.length > 0 && (
            <section className="mt-10">
              <h2 className="text-base text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>
                関連記事
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {fallbackRelated.map((r) => (
                  <Link key={r!.slug} href={`/articles/${r!.slug}`} className="group bg-white border border-border overflow-hidden hover:border-kincya/40 transition-all">
                    <div className="aspect-[16/9] bg-kiji/50 tatami-pattern" />
                    <div className="p-3">
                      <p className="text-xs text-ai mb-1">{r!.category}</p>
                      <h3 className="text-sm text-sumi group-hover:text-ai transition-colors line-clamp-2">{r!.title}</h3>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>
      </div>
    </>
  );
}
