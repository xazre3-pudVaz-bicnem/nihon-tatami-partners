import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { SERVICE_CATEGORIES, CATEGORY_GROUP_LABELS } from "@/data/categories";
import { SITE_URL } from "@/lib/metadata";

type GroupKey = "tatami" | "washitsu" | "restoration";

interface Props {
  searchParams: Promise<{ group?: string }>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { group } = await searchParams;
  if (group === "tatami") {
    return {
      title: "畳工事カテゴリ一覧 | 日本畳パートナーズ",
      description:
        "畳表替え・新調・裏返し・琉球畳・和紙畳など、埼玉県内で対応できる畳工事カテゴリの一覧です。",
      alternates: { canonical: `${SITE_URL}/categories?group=tatami` },
    };
  }
  if (group === "washitsu") {
    return {
      title: "和室工事カテゴリ一覧 | 日本畳パートナーズ",
      description:
        "ふすま・障子・欄間・床の間・押入れ内装など、和室リフォームに対応するカテゴリ一覧です。",
      alternates: { canonical: `${SITE_URL}/categories?group=washitsu` },
    };
  }
  if (group === "restoration" || group === "interior" || group === "naisou") {
    return {
      title: "原状回復・内装工事カテゴリ一覧 | 日本畳パートナーズ",
      description:
        "賃貸退去・原状回復・フローリング・クロス張替えなど、内装工事カテゴリ一覧です。",
      alternates: { canonical: `${SITE_URL}/categories?group=restoration` },
    };
  }
  return {
    title: "サービスカテゴリ一覧 | 畳・和室・内装工事 | 日本畳パートナーズ",
    description:
      "畳表替え・新調・琉球畳・和紙畳・ふすま・障子・和室リフォーム・原状回復など、埼玉県内で対応できるすべてのカテゴリ一覧です。",
    alternates: { canonical: `${SITE_URL}/categories` },
  };
}

const ALL_GROUPS: GroupKey[] = ["tatami", "washitsu", "restoration"];

// 旧グループ名・エイリアスのマッピング
const GROUP_ALIAS: Record<string, GroupKey> = {
  interior: "restoration",
  naisou: "restoration",
  business: "restoration",
  reform: "washitsu",
  tatami: "tatami",
  washitsu: "washitsu",
  restoration: "restoration",
};

export default async function CategoriesPage({ searchParams }: Props) {
  const { group } = await searchParams;
  const normalizedGroup = group ? (GROUP_ALIAS[group] ?? null) : null;
  const GROUPS: GroupKey[] = normalizedGroup
    ? [normalizedGroup]
    : ALL_GROUPS;

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
          {normalizedGroup && CATEGORY_GROUP_LABELS[normalizedGroup]
            ? `${CATEGORY_GROUP_LABELS[normalizedGroup]}カテゴリ一覧`
            : "サービスカテゴリ一覧"}
        </h1>
        <p className="text-sm text-sumi/60 mb-6">埼玉県内の畳・和室・内装工事サービスを探せます。</p>

        {/* グループフィルター */}
        <div className="flex flex-wrap gap-2 mb-10">
          <Link
            href="/categories"
            className={`text-xs px-3 py-1.5 border transition-colors duration-150 ${
              !normalizedGroup
                ? "bg-sumi text-white border-sumi"
                : "border-border text-sumi/60 hover:border-sumi/40"
            }`}
          >
            すべて
          </Link>
          {ALL_GROUPS.map((g) => (
            <Link
              key={g}
              href={`/categories?group=${g}`}
              className={`text-xs px-3 py-1.5 border transition-colors duration-150 ${
                normalizedGroup === g
                  ? "bg-sumi text-white border-sumi"
                  : "border-border text-sumi/60 hover:border-sumi/40"
              }`}
            >
              {CATEGORY_GROUP_LABELS[g]}
            </Link>
          ))}
        </div>

        {GROUPS.map((g) => {
          const cats = SERVICE_CATEGORIES.filter((c) => c.group === g);
          return (
            <div key={g} className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <h2 className="text-xl text-sumi" style={{ fontFamily: "var(--font-serif)" }}>{CATEGORY_GROUP_LABELS[g]}</h2>
                <div className="flex-1 h-px bg-border" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cats.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={cat.href}
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
