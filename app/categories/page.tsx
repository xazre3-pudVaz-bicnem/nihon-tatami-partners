import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { SERVICE_CATEGORIES, CATEGORY_GROUP_LABELS } from "@/data/categories";
import { SITE_URL } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "サービスカテゴリ一覧 | 畳・和室・内装工事 | 日本畳パートナー",
  description: "畳表替え・新調・琉球畳・和紙畳・ふすま・障子・和室リフォーム・原状回復など、埼玉県内で対応できるすべてのカテゴリ一覧です。",
  alternates: { canonical: `${SITE_URL}/categories` },
};

const GROUPS = ["tatami", "washitsu", "restoration"] as const;

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-shiro">
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumbs items={[
            { label: "トップ", href: "/" },
            { label: "カテゴリ一覧" },
          ]} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-2xl md:text-3xl text-sumi mb-2" style={{ fontFamily: "var(--font-serif)" }}>
          サービスカテゴリ一覧
        </h1>
        <p className="text-sm text-sumi/60 mb-10">埼玉県内の畳・和室・内装工事サービスを探せます。</p>

        {GROUPS.map((group) => {
          const cats = SERVICE_CATEGORIES.filter((c) => c.group === group);
          return (
            <div key={group} className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <h2 className="text-xl text-sumi" style={{ fontFamily: "var(--font-serif)" }}>{CATEGORY_GROUP_LABELS[group]}</h2>
                <div className="flex-1 h-px bg-border" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cats.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/saitama/${cat.slug}`}
                    className="group border border-border bg-white hover:border-kincya/40 hover:shadow-sm transition-all duration-300 p-5"
                  >
                    <h3 className="text-base text-sumi group-hover:text-ai transition-colors mb-2" style={{ fontFamily: "var(--font-serif)" }}>
                      {cat.name}
                    </h3>
                    <p className="text-xs text-sumi/60 leading-relaxed mb-3">{cat.description}</p>
                    {cat.priceFrom && (
                      <p className="text-xs text-kincya">
                        {cat.priceFrom.toLocaleString()}円〜/{cat.unit}（目安）
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
