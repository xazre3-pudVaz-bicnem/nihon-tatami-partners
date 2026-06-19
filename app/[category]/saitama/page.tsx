import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getCategoryBySlug, SERVICE_CATEGORIES } from "@/data/categories";
import { SITE_URL } from "@/lib/metadata";

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return SERVICE_CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) return {};
  return {
    title: `埼玉県の${cat.name}を料金と口コミで比較！おすすめ業者ランキング | 日本畳パートナー`,
    alternates: { canonical: `${SITE_URL}/${category}` },
    robots: "noindex,follow",
  };
}

// 埼玉専用サイトのため /[category]/saitama/ は /[category]/ にリダイレクト
export default async function CategorySaitamaPage({ params }: Props) {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) notFound();
  redirect(`/${category}`);
}
