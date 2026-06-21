import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { SITE_URL } from "@/lib/metadata";
import type { Question, QuestionAnswer } from "@/lib/types-platform";

// ─── サンプルQ&Aデータ ─────────────────────────────────────────────────────────

const SAMPLE_QUESTIONS: Question[] = [
  {
    id: "q-001",
    authorName: "匿名ユーザー",
    category: "process",
    categoryLabel: "工事",
    city: "さいたま市",
    title: "畳表替えと新調はどう違いますか？",
    body: "築10年の自宅の畳が傷んできました。い草の色が茶色くなってきており、角の部分が少し崩れています。業者に聞いたら「表替えか新調か」と言われましたが、違いがよく分かりません。どちらを選べばよいでしょうか？費用の目安も教えてもらえると助かります。",
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
    body: "川口市で賃貸物件を所有しています。先日入居者が退去し、畳を確認したところ、全体に黄ばみがあり、一部に小さな傷（ペットの引っかき傷と思われます）がありました。入居期間は3年です。費用負担の考え方を教えてください。",
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
    body: "押し入れに面した畳の隅にカビが生えています。拭き取るとしばらくはきれいになるのですが、1〜2週間で再び黒ずんできます。張替えが必要でしょうか？それとも別の対処法がありますか？",
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
    body: "犬が畳に粗相をしてしまい、ニオイが取れません。すぐに拭き取りましたが、乾いた後もニオイが残っています。表替えをすればニオイは解消されますか？また素材によって違いはありますか？",
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
    body: "20室ある旅館を運営しています。客室の畳の交換周期を教えていただきたいです。稼働率によっても変わると思いますが、一般的な目安はありますか？",
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
    body: "小さい子供がいます。ダニやカビが心配で和紙畳を検討していますが、い草との耐久性の差や肌触りの違いも気になります。費用の差も含めて教えてください。",
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
    body: "本堂の畳が傷んできました。サイズが特殊（京間）で普通の業者に断られたことがあります。どのような業者に依頼すればよいでしょうか？また工事中の保護についても教えてください。",
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
    body: "和モダンな部屋にしたくて、琉球畳か縁なし畳を検討中です。インターネットで調べても違いがよく分かりません。費用・耐久性・見た目の違いを教えてください。",
    answerCount: 2,
    viewCount: 221,
    helpfulCount: 17,
    status: "answered",
    isSample: true,
    createdAt: "2025-05-18T14:00:00Z",
    updatedAt: "2025-05-20T10:00:00Z",
  },
];

// ─── サンプル回答データ ────────────────────────────────────────────────────────

const SAMPLE_ANSWERS: Record<string, QuestionAnswer[]> = {
  "q-001": [
    {
      id: "a-001-1",
      questionId: "q-001",
      providerName: "山田畳店",
      providerCity: "さいたま市",
      body: "表替えは畳表（ゴザの部分）だけを新しくする工事です。畳床（芯の部分）はそのまま使います。費用は素材により異なりますが1枚あたり3,000〜9,000円程度が目安です。新調は畳床ごと作り替えるため、費用は1枚1万円〜が目安です。踏んだときに沈む感じがなければ表替えで十分な場合が多いです。",
      helpfulCount: 12,
      isSelectedAnswer: true,
      isSample: true,
      createdAt: "2025-04-11T09:00:00Z",
      updatedAt: "2025-04-11T09:00:00Z",
    },
    {
      id: "a-001-2",
      questionId: "q-001",
      providerName: "川口い草工業",
      providerCity: "川口市",
      body: "築10年であれば、畳床がしっかりしていれば表替えで十分なことがほとんどです。一度現地で踏み心地を確認させていただければ、どちらが適切かご判断できます。無料で下見に伺えますのでお気軽にどうぞ。",
      helpfulCount: 6,
      isSample: true,
      createdAt: "2025-04-12T10:00:00Z",
      updatedAt: "2025-04-12T10:00:00Z",
    },
  ],
  "q-002": [
    {
      id: "a-002-1",
      questionId: "q-002",
      providerName: "さいたま畳工房",
      providerCity: "さいたま市",
      body: "国土交通省のガイドラインでは、い草の自然な変色（経年劣化）は賃貸人（オーナー）負担が基本です。一方、ペットによる引っかき傷は入居者の過失として借主負担になることが多いです。ただし実際の判断は状況により異なるため、管理会社や専門家に確認されることをお勧めします。",
      helpfulCount: 18,
      isSelectedAnswer: true,
      isSample: true,
      createdAt: "2025-03-23T09:00:00Z",
      updatedAt: "2025-03-23T09:00:00Z",
    },
  ],
  "q-003": [
    {
      id: "a-003-1",
      questionId: "q-003",
      providerName: "川越畳店",
      providerCity: "川越市",
      body: "カビが繰り返す場合は畳床（芯）まで浸透している可能性があります。表替えだけでは解決しないケースも多く、畳を上げて床下の湿気対策と併せて行うことをお勧めします。一度現場確認させていただけると適切なご提案ができます。",
      helpfulCount: 10,
      isSelectedAnswer: true,
      isSample: true,
      createdAt: "2025-05-06T11:00:00Z",
      updatedAt: "2025-05-06T11:00:00Z",
    },
  ],
  "q-004": [
    {
      id: "a-004-1",
      questionId: "q-004",
      providerName: "山田畳店",
      providerCity: "さいたま市",
      body: "尿は畳表を通り畳床まで染み込んでいることが多いため、表替えだけではニオイが残る場合があります。新調か、少なくとも畳床の乾燥・消臭処理が必要なケースが多いです。和紙畳や樹脂畳は撥水性があるため、今後のペット対策としてご検討ください。",
      helpfulCount: 15,
      isSelectedAnswer: true,
      isSample: true,
      createdAt: "2025-02-15T09:00:00Z",
      updatedAt: "2025-02-15T09:00:00Z",
    },
  ],
  "q-005": [
    {
      id: "a-005-1",
      questionId: "q-005",
      providerName: "浦和畳工務店",
      providerCity: "さいたま市",
      body: "旅館の客室畳は一般家庭と比べて使用頻度が高いため、裏返し→表替え→新調のサイクルを短くすることが多いです。目安として稼働率が高い客室では裏返し1〜2年、表替え2〜3年、新調5〜8年が一般的です。まとめてご依頼いただける場合は割引対応も可能です。",
      helpfulCount: 8,
      isSelectedAnswer: true,
      isSample: true,
      createdAt: "2025-01-31T10:00:00Z",
      updatedAt: "2025-01-31T10:00:00Z",
    },
  ],
  "q-006": [
    {
      id: "a-006-1",
      questionId: "q-006",
      providerName: "和紙畳専門 浦和店",
      providerCity: "さいたま市",
      body: "和紙畳はダイケン工業の健やかおもて等が有名で、耐久性はい草の約3倍程度と言われています。ダニ・カビも発生しにくく、お子さんがいるご家庭に人気です。費用はい草の1.5〜2倍程度になりますが、長持ちを考えるとトータルコストは抑えられます。",
      helpfulCount: 14,
      isSelectedAnswer: true,
      isSample: true,
      createdAt: "2025-04-29T09:00:00Z",
      updatedAt: "2025-04-29T09:00:00Z",
    },
  ],
  "q-007": [
    {
      id: "a-007-1",
      questionId: "q-007",
      providerName: "埼玉寺社畳工房",
      providerCity: "熊谷市",
      body: "寺社の本堂畳は京間・本間サイズが多く、一般の業者では対応が難しい場合があります。寺社・旅館対応の実績がある業者をお選びください。施工中は本堂内の仏具・什器の養生も重要です。弊社では寺社の施工実績が多数ございますので、ぜひご相談ください。",
      helpfulCount: 7,
      isSelectedAnswer: true,
      isSample: true,
      createdAt: "2025-03-11T10:00:00Z",
      updatedAt: "2025-03-11T10:00:00Z",
    },
  ],
  "q-008": [
    {
      id: "a-008-1",
      questionId: "q-008",
      providerName: "川口畳デザイン",
      providerCity: "川口市",
      body: "琉球畳は本来、七島い草を使った正方形の畳のことですが、現在は半畳サイズの縁なし畳を総称して「琉球畳」と呼ぶことが多いです。厳密には素材や産地の違いがありますが、市販品の多くは同じ正方形・縁なしの形状です。費用・耐久性はほぼ同等で、素材（い草・和紙・樹脂）の違いで選ぶとよいでしょう。",
      helpfulCount: 11,
      isSelectedAnswer: true,
      isSample: true,
      createdAt: "2025-05-19T09:00:00Z",
      updatedAt: "2025-05-19T09:00:00Z",
    },
  ],
};

// ─── 型 ────────────────────────────────────────────────────────────────────────

interface Props {
  params: Promise<{ questionId: string }>;
}

// ─── generateStaticParams ─────────────────────────────────────────────────────

export async function generateStaticParams() {
  return SAMPLE_QUESTIONS.map((q) => ({ questionId: q.id }));
}

// ─── generateMetadata ─────────────────────────────────────────────────────────

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { questionId } = await params;
  const question = SAMPLE_QUESTIONS.find((q) => q.id === questionId);
  if (!question) return {};
  return {
    title: `${question.title} | Q&A | 日本畳パートナーズ`,
    description: question.body.slice(0, 120),
    alternates: { canonical: `${SITE_URL}/questions/${questionId}` },
  };
}

// ─── ページコンポーネント ──────────────────────────────────────────────────────

export default async function QuestionDetailPage({ params }: Props) {
  const { questionId } = await params;
  const question = SAMPLE_QUESTIONS.find((q) => q.id === questionId);
  if (!question) notFound();

  const answers = SAMPLE_ANSWERS[questionId] ?? [];

  const relatedQuestions = SAMPLE_QUESTIONS.filter(
    (q) => q.id !== questionId && q.category === question.category
  ).slice(0, 3);

  return (
    <>
      {/* ヘッダー */}
      <div className="bg-sumi py-10 px-4">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            variant="dark"
            items={[
              { label: "ホーム", href: "/" },
              { label: "Q&A一覧", href: "/questions" },
              { label: question.title.slice(0, 20) + "…" },
            ]}
          />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* メインコンテンツ */}
          <div className="lg:col-span-2 space-y-6">
            {/* 質問カード */}
            <div className="border border-border bg-white p-6">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="text-[10px] px-2 py-0.5 border bg-ai/5 border-ai/30 text-ai">
                  {question.categoryLabel}
                </span>
                {question.city && (
                  <span className="text-xs text-sumi/40">{question.city}</span>
                )}
                {question.isSample && (
                  <span className="text-[10px] px-2 py-0.5 border bg-kiji border-border text-sumi/40">
                    掲載イメージ
                  </span>
                )}
              </div>

              <h1
                className="text-xl md:text-2xl text-sumi mb-4 leading-snug"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {question.title}
              </h1>

              <div className="flex items-center gap-1 mb-5">
                <span className="text-lg text-kincya" style={{ fontFamily: "var(--font-serif)" }}>
                  Q
                </span>
              </div>

              <p className="text-sm text-sumi/80 leading-relaxed whitespace-pre-line">
                {question.body}
              </p>

              <div className="flex items-center gap-4 mt-5 pt-5 border-t border-kiji">
                <span className="text-xs text-sumi/40">{question.authorName}</span>
                <span className="text-xs text-sumi/40">
                  閲覧 {question.viewCount}
                </span>
              </div>
            </div>

            {/* 回答一覧 */}
            <div>
              <h2
                className="text-lg text-sumi mb-4"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                回答 {answers.length}件
              </h2>

              {answers.length === 0 ? (
                <div className="border border-border bg-white p-8 text-center text-sm text-sumi/40">
                  まだ回答がありません。
                </div>
              ) : (
                <div className="space-y-4">
                  {answers.map((answer) => (
                    <div
                      key={answer.id}
                      className={`border bg-white p-5 ${
                        answer.isSelectedAnswer ? "border-igusa" : "border-border"
                      }`}
                    >
                      {answer.isSelectedAnswer && (
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-[10px] px-2 py-0.5 bg-igusa text-white">
                            ベストアンサー
                          </span>
                        </div>
                      )}

                      <div className="flex items-center gap-1 mb-4">
                        <span
                          className="text-lg text-ai"
                          style={{ fontFamily: "var(--font-serif)" }}
                        >
                          A
                        </span>
                      </div>

                      <p className="text-sm text-sumi/80 leading-relaxed">
                        {answer.body}
                      </p>

                      <div className="flex items-center justify-between gap-4 mt-4 pt-4 border-t border-kiji">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-kiji border border-border flex items-center justify-center text-xs text-sumi/50">
                            業
                          </div>
                          <div>
                            <p className="text-xs font-medium text-sumi">{answer.providerName}</p>
                            <p className="text-[10px] text-sumi/40">{answer.providerCity}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            className="text-xs text-sumi/50 flex items-center gap-1 hover:text-ai transition-colors"
                            aria-label="参考になった"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                            </svg>
                            参考になった ({answer.helpfulCount})
                          </button>
                          <Link
                            href={`/providers/${answer.providerId ?? "search"}`}
                            className="text-xs text-ai hover:underline"
                          >
                            業者プロフィール
                          </Link>
                        </div>
                      </div>

                      {answer.isSample && (
                        <p className="text-[10px] text-sumi/30 mt-2">
                          ※ これはサンプルの回答です
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 見積もり依頼CTA */}
            <div className="bg-kincya/5 border border-kincya/20 p-6">
              <h3
                className="text-base text-sumi mb-2"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                この業者に見積もりを依頼する
              </h3>
              <p className="text-sm text-sumi/60 mb-4">
                回答してくれた業者に直接見積もりを依頼できます。
              </p>
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/bulk-quote"
                  className="bg-kincya text-white px-6 py-3 text-sm font-bold hover:bg-do transition-colors"
                >
                  一括見積もりを依頼
                </Link>
                <Link
                  href="/search"
                  className="border border-ai text-ai px-6 py-3 text-sm hover:bg-ai hover:text-white transition-colors"
                >
                  業者を探す
                </Link>
              </div>
            </div>
          </div>

          {/* サイドバー */}
          <aside className="space-y-6">
            {/* 関連質問 */}
            {relatedQuestions.length > 0 && (
              <div className="border border-border bg-white p-5">
                <h3
                  className="text-base text-sumi mb-4"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  関連する質問
                </h3>
                <div className="space-y-3">
                  {relatedQuestions.map((q) => (
                    <Link
                      key={q.id}
                      href={`/questions/${q.id}`}
                      className="block text-sm text-sumi/70 hover:text-ai transition-colors leading-snug border-b border-kiji pb-3 last:border-0 last:pb-0"
                    >
                      {q.title}
                      <span className="block text-xs text-sumi/40 mt-0.5">
                        回答 {q.answerCount}件
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* 関連コラム */}
            <div className="border border-border bg-white p-5">
              <h3
                className="text-base text-sumi mb-4"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                関連コラム
              </h3>
              <div className="space-y-2">
                <Link href="/articles" className="block text-sm text-ai hover:underline">
                  畳のメンテナンス完全ガイド
                </Link>
                <Link href="/articles" className="block text-sm text-ai hover:underline">
                  畳の種類と素材選び方
                </Link>
                <Link href="/articles" className="block text-sm text-ai hover:underline">
                  賃貸退去と原状回復費用Q&A
                </Link>
              </div>
            </div>

            {/* 質問投稿 */}
            <div className="bg-sumi/5 border border-border p-5 text-center">
              <p className="text-sm text-sumi mb-3">
                他に気になることがありますか？
              </p>
              <Link
                href="/questions/new"
                className="block w-full bg-kincya text-white py-3 text-sm font-bold hover:bg-do transition-colors"
              >
                質問を投稿する
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
