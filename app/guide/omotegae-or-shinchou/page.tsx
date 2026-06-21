import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import FAQSection from "@/components/common/FAQSection";
import StickyBottomCTA from "@/components/common/StickyBottomCTA";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "表替え・裏返し・新調の判定チェックリスト｜どの工事が必要？",
  description: "畳の状態に合わせた工事を判定するフローチャートとチェックリスト。表替え・裏返し・新調それぞれの費用目安と特徴を解説します。",
  path: "/guide/omotegae-or-shinchou",
});

const WORK_TYPES = [
  {
    id: "uragaeshi",
    name: "裏返し",
    nameEn: "Tatami Uragaeshi",
    priceRange: "2,500〜4,000円/枚",
    timing: "使用開始から3〜5年",
    description: "畳表（ゴザ部分）をひっくり返して使う工事です。まだ使える状態の裏面を表にして再利用します。コストを抑えたい場合に最適ですが、できる状態には限りがあります。",
    conditions: [
      "使用から3〜5年が経過している",
      "変色・日焼けが気になる程度",
      "目立った傷・穴・深いへこみがない",
      "畳が沈んでいない（床板に問題がない）",
      "縁（ヘリ）に大きな傷みがない",
    ],
    notSuitable: ["使用から7年以上経過", "深い傷や穴がある", "湿気・カビが発生している"],
    color: "border-igusa bg-igusa/5",
    badge: "最安値",
    badgeColor: "bg-igusa text-white",
  },
  {
    id: "omotegae",
    name: "表替え",
    nameEn: "Tatami Omotegae",
    priceRange: "3,500〜9,000円/枚（素材により異なります）",
    timing: "使用開始から7〜10年",
    description: "畳表（ゴザ）を新しいものに交換する工事です。畳床（わら・木材など）はそのまま使用します。最も一般的なメンテナンス工事で、新しい畳の香りと感触が蘇ります。",
    conditions: [
      "使用から7〜10年が経過している",
      "変色・日焼け・すり切れが目立つ",
      "裏返しをすでに行ったことがある",
      "畳のへりに傷みがある",
      "床（畳床）はまだしっかりしている",
    ],
    notSuitable: ["畳がフカフカして沈む", "踏み込むとへこむ感覚がある", "使用から15年以上経過"],
    color: "border-ai bg-ai/5",
    badge: "最も一般的",
    badgeColor: "bg-ai text-white",
  },
  {
    id: "shinchou",
    name: "新調",
    nameEn: "Tatami Shinchou",
    priceRange: "12,000〜30,000円/枚（素材・仕様により異なります）",
    timing: "使用開始から15〜20年、または傷みが激しい場合",
    description: "畳床（わら・木材など）ごと新しく作り替える工事です。踏み込みがフカフカしている・大きく沈む・湿気がひどいなど傷みが深刻な場合に必要です。",
    conditions: [
      "踏み込むと沈む・フカフカする",
      "使用から15〜20年以上経過している",
      "湿気・カビが深刻で臭いがある",
      "害虫（チャタテムシなど）が発生している",
      "補修不可能なほどの傷みや穴がある",
    ],
    notSuitable: [],
    color: "border-kincya bg-kincya/5",
    badge: "根本解決",
    badgeColor: "bg-kincya text-white",
  },
];

const CHECKLIST_ITEMS = [
  { label: "使用年数", questions: ["3〜5年: 裏返しを検討", "7〜10年: 表替えを検討", "15年以上: 新調を検討"] },
  { label: "畳の状態", questions: ["日焼け・変色 → 裏返し or 表替え", "深い傷・穴 → 表替え or 新調", "フカフカ感 → 新調を検討"] },
  { label: "臭い・衛生面", questions: ["い草の香りがない → 表替え", "カビ臭・湿気臭 → 新調を検討", "虫が発生 → 新調を推奨"] },
  { label: "コスト優先度", questions: ["コストを抑えたい → 裏返し検討", "長持ちさせたい → 表替え以上", "根本的に解決したい → 新調"] },
];

const faqs = [
  { question: "裏返しは自分でできますか？", answer: "畳の裏返しは専門技術が必要なため、業者に依頼することをおすすめします。重い畳を持ち上げて向きを変えるだけでなく、縁の処理や敷き直しが必要です。" },
  { question: "表替えのタイミングを逃すとどうなりますか？", answer: "畳表が劣化すると毛羽立ちやい草のほつれが生じます。放置すると畳床まで傷みが進行し、最終的に新調が必要になることがあります。傷みが深刻になる前に対応することでコストを抑えられます。" },
  { question: "国産い草と中国産い草の違いは何ですか？", answer: "国産（熊本産・八代産など）は香り・耐久性・手触りが優れていますが価格が高めです。中国産は価格が抑えられますが品質にばらつきがあります。業者に素材の説明を求めると良いでしょう。" },
  { question: "新調では床（フローリング）への変更はできますか？", answer: "畳からフローリングへの変更は可能ですが、別途大工工事が必要になります。畳工事専門の業者では対応できない場合もありますので、リフォーム業者への相談も検討してください。" },
  { question: "費用の目安を教えてください。", answer: "6畳間を例にすると、裏返し：1.5〜2.4万円、表替え（国産い草）：2.3〜5.4万円、新調：7.2〜18万円程度が目安です。素材・業者・エリアによって異なります。正確な費用は複数業者に見積もりを取ることをおすすめします。" },
];

export default function OmotegaeOrShinchouPage() {
  return (
    <div className="min-h-screen bg-shiro">
      {/* Header */}
      <div className="bg-sumi">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumbs
            variant="dark"
            items={[
              { label: "トップ", href: "/" },
              { label: "ガイド", href: "/guide" },
              { label: "表替え・裏返し・新調の判定" },
            ]}
          />
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 pt-4">
          <div className="text-xs text-white/40 mb-3">ガイド</div>
          <h1 className="text-2xl md:text-3xl text-white mb-3" style={{ fontFamily: "var(--font-serif)" }}>
            表替え・裏返し・新調の<br className="sm:hidden" />判定チェックリスト
          </h1>
          <p className="text-sm text-white/60 max-w-xl leading-relaxed">
            畳の状態に合わせてどの工事が必要か判定できます。フローチャートと各工事の特徴・費用目安をご確認ください。
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* フローチャート（テキスト形式） */}
        <section className="mb-14">
          <h2 className="text-xl text-sumi mb-6" style={{ fontFamily: "var(--font-serif)" }}>
            工事の判定フローチャート
          </h2>
          <div className="bg-white border border-border p-6 space-y-5">
            {[
              {
                question: "Q1. 踏み込むと沈む・フカフカする感覚がありますか？",
                yes: "→ 新調を検討してください。畳床（土台部分）の傷みが考えられます。",
                no: "→ Q2へ",
              },
              {
                question: "Q2. カビ・湿気の臭いが強くありますか？",
                yes: "→ 新調、または業者に状態を確認してもらいましょう。",
                no: "→ Q3へ",
              },
              {
                question: "Q3. 使用から7年以上経過していますか？",
                yes: "→ 表替えを検討してください。",
                no: "→ Q4へ",
              },
              {
                question: "Q4. 変色・日焼けが気になりますか？（傷・穴は少ない）",
                yes: "→ 裏返しを検討できます。",
                no: "→ まだメンテナンス不要の可能性があります。次のメンテナンスは3〜5年後が目安です。",
              },
            ].map((f, i) => (
              <div key={i} className="border-l-2 border-kincya/40 pl-4">
                <p className="text-sm font-medium text-sumi mb-2">{f.question}</p>
                <div className="text-xs space-y-1 ml-2">
                  <p><span className="text-do font-medium">YES</span>: {f.yes}</p>
                  <p><span className="text-igusa font-medium">NO</span>: {f.no}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-sumi/40 mt-3 text-center">
            ※ 最終的な判断は業者による現地確認が必要です。
          </p>
        </section>

        {/* 各工事の説明 */}
        <section className="mb-14">
          <h2 className="text-xl text-sumi mb-6" style={{ fontFamily: "var(--font-serif)" }}>
            各工事の特徴と料金目安
          </h2>
          <div className="space-y-6">
            {WORK_TYPES.map((wt) => (
              <div key={wt.id} className={`border p-6 ${wt.color}`}>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="text-lg text-sumi" style={{ fontFamily: "var(--font-serif)" }}>{wt.name}</h3>
                    <p className="text-xs text-sumi/40 mt-0.5">{wt.nameEn}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 shrink-0 ${wt.badgeColor}`}>{wt.badge}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-xs">
                  <div>
                    <span className="text-sumi/40">料金目安</span>
                    <p className="text-sumi font-medium mt-0.5">{wt.priceRange}</p>
                  </div>
                  <div>
                    <span className="text-sumi/40">交換タイミング</span>
                    <p className="text-sumi mt-0.5">{wt.timing}</p>
                  </div>
                </div>
                <p className="text-sm text-sumi/70 leading-relaxed mb-4">{wt.description}</p>
                <div>
                  <p className="text-xs font-medium text-sumi mb-2">適しているケース</p>
                  <ul className="space-y-1">
                    {wt.conditions.map((c, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-sumi/70">
                        <span className="text-igusa shrink-0">✓</span>{c}
                      </li>
                    ))}
                  </ul>
                </div>
                {wt.notSuitable.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-border/40">
                    <p className="text-xs font-medium text-do mb-2">注意（これらの場合は不向き）</p>
                    <ul className="space-y-1">
                      {wt.notSuitable.map((ns, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-sumi/60">
                          <span className="text-do shrink-0">✕</span>{ns}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
          <p className="text-xs text-sumi/40 mt-3 leading-relaxed">
            ※ 料金は概算です。素材・業者・エリアによって異なります。正確な費用は現地確認後に業者が提示します。
          </p>
        </section>

        {/* チェックリスト表 */}
        <section className="mb-14">
          <h2 className="text-xl text-sumi mb-6" style={{ fontFamily: "var(--font-serif)" }}>
            判定チェックリスト
          </h2>
          <div className="space-y-4">
            {CHECKLIST_ITEMS.map((ci) => (
              <div key={ci.label} className="border border-border bg-white p-5">
                <h3 className="text-sm font-medium text-sumi mb-3">{ci.label}</h3>
                <ul className="space-y-2">
                  {ci.questions.map((q, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-sumi/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-kincya/60 shrink-0 mt-1.5" />
                      {q}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* 見積CTA */}
        <div className="bg-kincya/5 border border-kincya/20 p-6 text-center mb-10">
          <h2 className="text-lg text-sumi mb-2" style={{ fontFamily: "var(--font-serif)" }}>
            どの工事か迷ったら業者に相談してみましょう
          </h2>
          <p className="text-sm text-sumi/60 mb-5 leading-relaxed">
            無料で複数業者に見積もりを依頼できます。業者が現地を確認して最適な工事を提案します。
          </p>
          <Link
            href="/bulk-quote/new"
            className="inline-block text-sm bg-kincya text-white px-8 py-3 font-bold hover:bg-do transition-colors"
          >
            無料で見積もり依頼
          </Link>
        </div>
      </div>

      <FAQSection items={faqs} title="表替え・裏返し・新調に関するよくある質問" />

      <StickyBottomCTA
        primaryLabel="無料で見積もり依頼"
        primaryHref="/bulk-quote/new"
        secondaryLabel="業者を探す"
        secondaryHref="/search"
      />
    </div>
  );
}
