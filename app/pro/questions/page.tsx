import type { Metadata } from "next";
import Link from "next/link";
import DashboardLayout from "@/components/layout/DashboardLayout";
import SampleBadge from "@/components/common/SampleBadge";
import type { QuestionCategory } from "@/lib/types-platform";

export const metadata: Metadata = {
  title: "Q&A回答 | 業者ダッシュボード | 日本畳パートナーズ",
  robots: "noindex,nofollow",
};

interface UnansweredQuestion {
  id: string;
  title: string;
  category: QuestionCategory;
  viewCount: number;
}

const CATEGORY_LABEL: Record<QuestionCategory, string> = {
  price: "料金",
  material: "素材",
  process: "施工工程",
  rental: "賃貸",
  corporate: "法人",
  ryokan: "旅館・ホテル",
  temple: "寺社仏閣",
  maintenance: "メンテナンス",
  other: "その他",
};

const UNANSWERED: UnansweredQuestion[] = [
  {
    id: "q-003",
    title: "カビが出た畳は張替えが必要ですか？",
    category: "maintenance",
    viewCount: 189,
  },
  {
    id: "q-004",
    title: "ペットの尿のニオイは取れますか？",
    category: "maintenance",
    viewCount: 367,
  },
];

const ANSWERED_SAMPLE = [
  {
    id: "q-001",
    title: "畳の表替えと裏返しの違いは何ですか？",
    category: "process" as QuestionCategory,
    viewCount: 542,
    answeredAt: "2026-06-10",
  },
  {
    id: "q-002",
    title: "和紙畳と通常の畳どちらがおすすめですか？",
    category: "material" as QuestionCategory,
    viewCount: 321,
    answeredAt: "2026-06-08",
  },
];

export default function ProQuestionsPage() {
  return (
    <DashboardLayout currentPath="/pro/questions">
      <div className="space-y-6">
        {/* ページタイトル */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl text-sumi" style={{ fontFamily: "var(--font-serif)" }}>
              Q&A回答管理
            </h1>
            <p className="text-xs text-sumi/50 mt-0.5">
              質問に回答するとプロフィールの露出が増加します
            </p>
          </div>
          <Link href="/dashboard" className="text-xs text-ai hover:underline shrink-0">
            ← ダッシュボード
          </Link>
        </div>

        {/* 効果の説明 */}
        <div className="bg-ai/5 border border-ai/20 p-4">
          <h2 className="text-sm text-ai mb-1" style={{ fontFamily: "var(--font-serif)" }}>
            回答するとプロフィール露出が増えます
          </h2>
          <p className="text-xs text-sumi/70">
            Q&Aへの回答は業者名・プロフィールへのリンクとともに掲載されます。
            専門的な回答を行うことで信頼性が高まり、問い合わせ増加につながります。
          </p>
        </div>

        {/* 掲載イメージバナー */}
        <div className="bg-kiji border border-border px-4 py-2 flex items-center gap-2">
          <SampleBadge />
          <p className="text-xs text-sumi/60">
            掲載イメージです。実際の質問はプラットフォームのQ&Aより表示されます。
          </p>
        </div>

        {/* 未回答の質問 */}
        <section className="bg-white border border-border p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base text-sumi" style={{ fontFamily: "var(--font-serif)" }}>
              未回答の質問
              <span className="ml-2 text-xs bg-do/10 text-do border border-do/30 px-2 py-0.5">
                {UNANSWERED.length}件
              </span>
            </h2>
          </div>

          {UNANSWERED.length === 0 ? (
            <p className="text-sm text-sumi/50 py-4 text-center">
              未回答の質問はありません
            </p>
          ) : (
            <div className="space-y-4">
              {UNANSWERED.map((q) => (
                <div
                  key={q.id}
                  className="border border-kiji p-4 hover:border-ai transition-colors"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] bg-kiji border border-sumi/20 text-sumi/50 px-2 py-0.5">
                          {CATEGORY_LABEL[q.category]}
                        </span>
                        <span className="text-xs text-sumi/40">
                          閲覧数：{q.viewCount.toLocaleString()}回
                        </span>
                      </div>
                      <h3 className="text-sm text-sumi">{q.title}</h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/questions/${q.id}`}
                      className="text-xs bg-kincya text-white px-4 py-1.5 hover:bg-do transition-colors"
                    >
                      回答する
                    </Link>
                    <Link
                      href={`/questions/${q.id}`}
                      className="text-xs text-ai hover:underline"
                    >
                      質問を確認する →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* 回答済み（サンプル） */}
        <section className="bg-white border border-border p-5">
          <h2 className="text-base text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>
            回答済みの質問
          </h2>
          <div className="space-y-3">
            {ANSWERED_SAMPLE.map((q) => (
              <div
                key={q.id}
                className="flex items-start justify-between gap-3 border-b border-kiji pb-3 last:border-0 last:pb-0"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] bg-igusa/10 text-igusa border border-igusa/30 px-2 py-0.5">
                      回答済み
                    </span>
                    <span className="text-xs text-sumi/40">{q.answeredAt}</span>
                    <span className="text-xs text-sumi/40">
                      閲覧数：{q.viewCount.toLocaleString()}回
                    </span>
                  </div>
                  <p className="text-sm text-sumi">{q.title}</p>
                </div>
                <Link
                  href={`/questions/${q.id}`}
                  className="text-xs text-ai hover:underline shrink-0"
                >
                  確認 →
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-kiji">
            <Link
              href="/questions"
              className="text-xs text-ai hover:underline"
            >
              すべての質問一覧を見る →
            </Link>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
