import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { createMetadata } from "@/lib/metadata";
import type { Question, QuestionCategory } from "@/lib/types-platform";

export const metadata: Metadata = createMetadata({
  title: "畳・内装工事 Q&A一覧",
  description:
    "畳の表替え・新調・ふすま・障子の料金や施工について、よくある質問と専門業者からの回答をまとめています。",
  path: "/questions",
});

// ─── サンプルQ&Aデータ ─────────────────────────────────────────────────────────

const SAMPLE_QUESTIONS: Question[] = [
  {
    id: "q-001",
    authorName: "匿名ユーザー",
    category: "process",
    categoryLabel: "工事",
    city: "さいたま市",
    title: "畳表替えと新調はどう違いますか？",
    body: "築10年の自宅の畳が傷んできました。表替えと新調のどちらを選べばよいでしょうか？",
    answerCount: 3,
    viewCount: 245,
    helpfulCount: 18,
    status: "answered",
    isSample: true,
    createdAt: "2025-04-10T10:00:00Z",
    updatedAt: "2025-04-12T14:00:00Z",
  },
  {
    id: "q-002",
    authorName: "賃貸オーナー",
    category: "rental",
    categoryLabel: "賃貸",
    city: "川口市",
    title: "賃貸退去時の畳費用は誰が負担しますか？",
    body: "入居者が退去しました。畳に黄ばみと小さな傷があります。費用負担はどうなりますか？",
    answerCount: 5,
    viewCount: 412,
    helpfulCount: 31,
    status: "answered",
    isSample: true,
    createdAt: "2025-03-22T09:00:00Z",
    updatedAt: "2025-03-25T16:00:00Z",
  },
  {
    id: "q-003",
    authorName: "匿名ユーザー",
    category: "maintenance",
    categoryLabel: "メンテナンス",
    city: "川越市",
    title: "カビが出た畳は張替えが必要ですか？",
    body: "押し入れに面した畳の隅にカビが生えています。拭き取っても繰り返します。",
    answerCount: 2,
    viewCount: 189,
    helpfulCount: 14,
    status: "answered",
    isSample: true,
    createdAt: "2025-05-05T11:00:00Z",
    updatedAt: "2025-05-07T09:00:00Z",
  },
  {
    id: "q-004",
    authorName: "ペットオーナー",
    category: "maintenance",
    categoryLabel: "メンテナンス",
    city: "所沢市",
    title: "ペットの尿のニオイは取れますか？",
    body: "犬が畳に粗相をしてしまい、ニオイが取れません。表替えで解決しますか？",
    answerCount: 4,
    viewCount: 367,
    helpfulCount: 27,
    status: "answered",
    isSample: true,
    createdAt: "2025-02-14T08:00:00Z",
    updatedAt: "2025-02-16T12:00:00Z",
  },
  {
    id: "q-005",
    authorName: "旅館スタッフ",
    category: "ryokan",
    categoryLabel: "旅館",
    city: "秩父市",
    title: "旅館の畳は何年ごとに替えるべきですか？",
    body: "20室ある旅館を運営しています。畳のメンテナンス周期の目安を教えてください。",
    answerCount: 2,
    viewCount: 156,
    helpfulCount: 12,
    status: "answered",
    isSample: true,
    createdAt: "2025-01-30T10:00:00Z",
    updatedAt: "2025-02-01T15:00:00Z",
  },
  {
    id: "q-006",
    authorName: "新築施主",
    category: "material",
    categoryLabel: "素材",
    city: "さいたま市",
    title: "和紙畳とい草畳はどちらが長持ちしますか？",
    body: "小さい子供がいます。ダニやカビが心配で和紙畳を検討していますが、耐久性はどうですか？",
    answerCount: 3,
    viewCount: 298,
    helpfulCount: 22,
    status: "answered",
    isSample: true,
    createdAt: "2025-04-28T13:00:00Z",
    updatedAt: "2025-04-30T09:00:00Z",
  },
  {
    id: "q-007",
    authorName: "寺院関係者",
    category: "temple",
    categoryLabel: "寺社",
    city: "熊谷市",
    title: "寺の本堂の畳工事で注意することは？",
    body: "本堂の畳が傷んできました。サイズが特殊で普通の業者に断られたことがあります。",
    answerCount: 1,
    viewCount: 134,
    helpfulCount: 9,
    status: "answered",
    isSample: true,
    createdAt: "2025-03-10T09:00:00Z",
    updatedAt: "2025-03-12T11:00:00Z",
  },
  {
    id: "q-008",
    authorName: "リフォーム検討中",
    category: "material",
    categoryLabel: "素材",
    city: "春日部市",
    title: "琉球畳と縁なし畳の違いは何ですか？",
    body: "和モダンな部屋にしたくて、琉球畳か縁なし畳を検討中です。何が違うのでしょうか？",
    answerCount: 2,
    viewCount: 221,
    helpfulCount: 17,
    status: "answered",
    isSample: true,
    createdAt: "2025-05-18T14:00:00Z",
    updatedAt: "2025-05-20T10:00:00Z",
  },
];

// ─── カテゴリ定義 ──────────────────────────────────────────────────────────────

const CATEGORIES: { value: QuestionCategory | "all"; label: string }[] = [
  { value: "all", label: "すべて" },
  { value: "price", label: "料金" },
  { value: "material", label: "素材" },
  { value: "process", label: "工事" },
  { value: "rental", label: "賃貸" },
  { value: "corporate", label: "法人" },
  { value: "ryokan", label: "旅館" },
  { value: "temple", label: "寺社" },
  { value: "maintenance", label: "メンテナンス" },
];

const CATEGORY_COLOR: Record<string, string> = {
  price:       "bg-kincya/10 text-kincya border-kincya/30",
  material:    "bg-igusa/10 text-igusa border-igusa/30",
  process:     "bg-ai/10 text-ai border-ai/30",
  rental:      "bg-do/10 text-do border-do/30",
  corporate:   "bg-sumi/10 text-sumi/70 border-sumi/20",
  ryokan:      "bg-kincya/10 text-kincya border-kincya/30",
  temple:      "bg-igusa/10 text-igusa border-igusa/30",
  maintenance: "bg-ai/10 text-ai border-ai/30",
  other:       "bg-kiji text-sumi/60 border-border",
};

// ─── ページ（Server Component + URLSearchParams） ──────────────────────────

interface PageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function QuestionsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const activeCategory = params.category ?? "all";

  const filtered =
    activeCategory === "all"
      ? SAMPLE_QUESTIONS
      : SAMPLE_QUESTIONS.filter((q) => q.category === activeCategory);

  return (
    <>
      {/* ヘッダー */}
      <div className="bg-sumi py-10 px-4">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            variant="dark"
            items={[
              { label: "ホーム", href: "/" },
              { label: "Q&A一覧" },
            ]}
          />
          <h1
            className="text-2xl md:text-3xl text-white mt-4 mb-2"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            畳・内装工事 Q&A
          </h1>
          <p className="text-white/60 text-sm">
            よくある質問と、専門業者からの回答をまとめています。
          </p>
        </div>
      </div>

      {/* サンプルデータ注意書き */}
      <div className="bg-kincya/10 border-b border-kincya/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
          <p className="text-xs text-sumi/60">
            ※ 掲載されているQ&Aはイメージです。本番公開時に実際の質問・回答に差し替えます。
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          {/* カテゴリフィルター */}
          <div className="flex flex-wrap gap-1.5">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.value}
                href={cat.value === "all" ? "/questions" : `/questions?category=${cat.value}`}
                className={`text-xs px-3 py-1.5 border transition-colors ${
                  activeCategory === cat.value
                    ? "border-ai bg-ai text-white"
                    : "border-border text-sumi/60 hover:border-ai hover:text-ai"
                }`}
              >
                {cat.label}
              </Link>
            ))}
          </div>

          {/* 質問投稿ボタン */}
          <Link
            href="/questions/new"
            className="shrink-0 text-sm bg-kincya text-white px-5 py-2.5 font-bold hover:bg-do transition-colors"
          >
            質問を投稿する
          </Link>
        </div>

        {/* Q&A一覧 */}
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-sumi/40">
              このカテゴリの質問はまだありません。
            </div>
          ) : (
            filtered.map((q) => (
              <Link
                key={q.id}
                href={`/questions/${q.id}`}
                className="block bg-white border border-border hover:border-kincya/40 hover:shadow-sm transition-all duration-200 p-5"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span
                        className={`text-[10px] px-2 py-0.5 border ${
                          CATEGORY_COLOR[q.category] ?? CATEGORY_COLOR.other
                        }`}
                      >
                        {q.categoryLabel}
                      </span>
                      {q.city && (
                        <span className="text-[10px] text-sumi/40">{q.city}</span>
                      )}
                      {q.isSample && (
                        <span className="text-[10px] px-1.5 py-0.5 bg-kiji text-sumi/40 border border-border">
                          掲載イメージ
                        </span>
                      )}
                    </div>
                    <h2 className="text-sm md:text-base text-sumi leading-snug mb-2 hover:text-ai transition-colors">
                      {q.title}
                    </h2>
                    <p className="text-xs text-sumi/50 line-clamp-2 leading-relaxed">{q.body}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-3 pt-3 border-t border-kiji">
                  <span className="text-xs text-sumi/50 flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    回答 {q.answerCount}件
                  </span>
                  <span className="text-xs text-sumi/50 flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    閲覧 {q.viewCount}
                  </span>
                  <span className="text-xs text-sumi/50 flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                    参考 {q.helpfulCount}
                  </span>
                </div>
              </Link>
            ))
          )}
        </div>

        {/* ボトムCTA */}
        <div className="mt-10 text-center border border-border bg-white p-8">
          <h2
            className="text-base text-sumi mb-2"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            あなたの質問を投稿しましょう
          </h2>
          <p className="text-sm text-sumi/50 mb-5">
            専門業者から回答が届きます（無料）
          </p>
          <Link
            href="/questions/new"
            className="inline-block bg-kincya text-white px-8 py-3.5 text-sm font-bold hover:bg-do transition-colors"
          >
            質問を投稿する
          </Link>
        </div>
      </div>
    </>
  );
}
