import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { SITE_URL } from "@/lib/metadata";

const HELP_ARTICLES: Record<string, { title: string; category: string; body: string[] }> = {
  "how-to-request": {
    title: "業者への依頼方法・流れ",
    category: "はじめての方へ",
    body: [
      "日本畳パートナーでは、以下のステップで業者に依頼することができます。",
      "【1. 業者を探す】地域やカテゴリから業者を検索してください。「さいたま市の畳表替え業者」「川口市のふすま張替え」など具体的に検索すると絞り込みやすくなります。",
      "【2. 業者のプロフィールを確認する】各業者のページで資格・実績・口コミを確認してください。無料見積もりや即日対応など、ご要望に合う業者を選びましょう。",
      "【3. メッセージを送る・見積もりを依頼する】業者のページから「メッセージを送る」または「見積もりを依頼する」ボタンをクリックしてください。会員登録が必要です。",
      "【4. 日程を調整する】業者と直接メッセージでやり取りし、施工日時を決定します。",
      "【5. 施工を受ける】当日は業者がご自宅へ伺います。施工後に内容を確認してください。",
      "【6. 口コミを投稿する】施工完了後にマイページから口コミを投稿できます。次に依頼する方の参考になります。",
    ],
  },
  "estimate-guide": {
    title: "見積もりの見方と注意点",
    category: "料金について",
    body: [
      "畳工事の見積もりには様々な費用が含まれます。以下の点を確認しましょう。",
      "【表示価格について】本サイトに掲載されている価格は「参考価格」です。実際の費用は畳の枚数・サイズ・素材・建物の状況によって異なります。",
      "【追加費用に注意】家具移動、廃材処理費、出張費などが別途かかる場合があります。見積もり時に必ず確認してください。",
      "【国産vs外国産い草】国産い草は品質が高く耐久性がありますが、外国産と比べて高価です。予算に応じて選択しましょう。",
      "【複数の業者に依頼】できれば2〜3社から見積もりを取ることをおすすめします。相場感を把握でき、適正価格で依頼できます。",
    ],
  },
  "review-guide": {
    title: "口コミの投稿方法",
    category: "口コミについて",
    body: [
      "施工が完了したら、ぜひ口コミを投稿してください。他のユーザーへの貴重な情報になります。",
      "【投稿方法】マイページ→「口コミを書く」→施工した業者と予約を選択→評価と感想を入力して送信。",
      "【評価基準の目安】5つ星：期待以上の対応・仕上がり。4つ星：満足できた。3つ星：普通。2つ星：やや不満あり。1つ星：大きな問題があった。",
      "【口コミのルール】事実に基づいた内容を記載してください。個人情報・誹謗中傷・関係のない内容は削除する場合があります。",
      "【業者からの返信】業者から口コミへの返信が来ることがあります。マイページのお知らせで通知されます。",
    ],
  },
  "provider-selection": {
    title: "良い業者の選び方",
    category: "業者選びのコツ",
    body: [
      "信頼できる畳業者を選ぶためのポイントをご紹介します。",
      "【資格・実績を確認】「一級畳製作技能士」の資格を持つ職人がいる業者は高い技術力の証明です。創業年数や施工実績も参考にしてください。",
      "【口コミの内容をよく読む】星の数だけでなく、コメントの内容を読んでください。丁寧な業者、時間を守る業者かどうかが分かります。",
      "【返信の速さ・丁寧さ】メッセージへの返信が速く、丁寧な業者は顧客対応も良い傾向があります。",
      "【無料見積もりを利用する】多くの業者が無料見積もりに対応しています。実際に自宅へ来てもらい、業者の人柄や対応を確認しましょう。",
      "【地域密着型を選ぶ】地元に根付いた業者は地域の気候・住宅事情をよく知っており、アフターフォローもしやすいです。",
    ],
  },
  "cancellation": {
    title: "キャンセルポリシーについて",
    category: "キャンセル・返金",
    body: [
      "キャンセルは施工日の前日18時までにメッセージでお申し出ください。",
      "【キャンセル料について】当日キャンセルの場合、業者の規定に基づくキャンセル料が発生することがあります。事前に業者へご確認ください。",
      "【施工後のトラブル】施工内容に問題がある場合は、業者へ直接ご連絡いただくか、マイページの「お問い合わせ」からご連絡ください。",
      "【返金対応】当サービスはマッチングプラットフォームのため、料金のやり取りは業者と利用者の間で行われます。返金に関しては業者と直接交渉していただく必要があります。",
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(HELP_ARTICLES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = HELP_ARTICLES[slug];
  if (!article) return {};
  return {
    title: `${article.title} | ヘルプ | 日本畳パートナー`,
    description: article.body[0].slice(0, 120),
    alternates: { canonical: `${SITE_URL}/help/${slug}` },
  };
}

export default async function HelpArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = HELP_ARTICLES[slug];
  if (!article) notFound();

  return (
    <div className="min-h-screen bg-shiro">
      <div className="bg-sumi">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumbs items={[
            { label: "トップ", href: "/" },
            { label: "ヘルプ", href: "/help" },
            { label: article.title },
          ]} />
        </div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 pt-2">
          <p className="text-xs text-white/40 mb-2">{article.category}</p>
          <h1 className="text-2xl text-white" style={{ fontFamily: "var(--font-serif)" }}>{article.title}</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white border border-border p-6 space-y-4">
          {article.body.map((paragraph, i) => (
            <p key={i} className="text-sm text-sumi/80 leading-relaxed">{paragraph}</p>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-kiji">
          <h2 className="text-sm text-sumi mb-3" style={{ fontFamily: "var(--font-serif)" }}>関連するヘルプ</h2>
          <div className="space-y-2">
            {Object.entries(HELP_ARTICLES).filter(([s]) => s !== slug).slice(0, 3).map(([s, a]) => (
              <Link key={s} href={`/help/${s}`} className="block text-sm text-ai hover:underline">
                {a.title}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <Link href="/help" className="text-xs text-ai hover:underline">&larr; ヘルプ一覧に戻る</Link>
        </div>
      </div>
    </div>
  );
}
