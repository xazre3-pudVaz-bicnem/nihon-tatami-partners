import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import FAQSection from "@/components/common/FAQSection";
import StickyBottomCTA from "@/components/common/StickyBottomCTA";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "賃貸退去時の畳張替え確認リスト｜費用負担の目安・原状回復",
  description: "賃貸退去時の畳張替えにかかる費用負担の目安（管理会社の判断や契約内容による）、入居前・退去後のチェックリスト、原状回復対応業者の探し方を解説します。",
  path: "/guide/rental-restoration",
});

const ENTRY_CHECKLIST = [
  "入居時に畳の状態を写真で記録しておく",
  "畳の色・日焼け・傷の有無を確認しておく",
  "ヘリ（縁）の状態を確認しておく",
  "管理会社に畳の状態について確認書類をもらう（あれば）",
  "契約書の原状回復に関する条項を確認しておく",
  "入居時の写真は退去まで大切に保管する",
];

const EXIT_CHECKLIST = [
  "退去前に畳の現状を写真で記録する",
  "入居時の写真と比較して変化を確認する",
  "自分の責任（故意・過失）による傷みと経年劣化を区別する",
  "管理会社の立会い前に清掃を行う",
  "立会い時の指摘事項を書面で確認する（サインする前に内容を確認）",
  "不当な請求を感じた場合は、即サインせずに持ち帰って確認する",
];

const COST_GUIDE = [
  {
    category: "経年劣化（通常の使用による）",
    examples: ["日照・時間経過による変色・褐変", "使用による摩耗（通常の範囲内）"],
    burden: "一般的に貸主（大家）負担",
    note: "ただし管理会社の判断や契約内容、賃貸借契約の特約条項によって異なります。",
    color: "border-igusa",
  },
  {
    category: "故意・過失による損傷",
    examples: ["タバコの焦げ跡", "ペット（ひっかき傷・尿）", "水をこぼして放置したカビ", "重い家具を長期間放置したへこみ"],
    burden: "借主（入居者）が費用を負担することが多い",
    note: "いずれも管理会社の判断・契約書の内容・双方の合意によって決まります。",
    color: "border-do",
  },
];

const PROVIDER_TIPS = [
  "「賃貸退去後の原状回復」「管理会社対応可」と明示している業者を選ぶ",
  "複数業者に見積もりを取って比較する",
  "管理会社指定の業者と相見積もりを取ることも可能",
  "写真見積もりに対応している業者なら遠方でも対応しやすい",
  "請求書払い・インボイス対応業者を選ぶと会計処理がしやすい（管理会社向け）",
];

const faqs = [
  { question: "退去時に畳の張替えは必ず必要ですか？", answer: "必ずしも必要ではありません。通常の使用による経年劣化であれば、貸主負担とされるのが一般的です。ただし、管理会社の判断や契約内容によって異なります。入居前と退去時の状態の差が「通常の使用範囲を超える」と判断された場合に費用が発生します。" },
  { question: "ペットを飼っていた場合、畳の費用はどうなりますか？", answer: "ペットによるひっかき傷や尿などは通常の使用範囲を超えると判断される場合が多く、借主負担となることが多いです。ただし、具体的な金額や範囲は管理会社・契約内容によって異なります。" },
  { question: "管理会社に高額な費用を請求されましたが…", answer: "請求内容が不当と感じる場合は、国土交通省の「原状回復をめぐるトラブルとガイドライン」を確認するか、弁護士・消費者センターなどに相談することをおすすめします。サインをする前に内容をよく確認しましょう。" },
  { question: "自分で業者を手配することはできますか？", answer: "管理会社が特定の業者を指定していない場合、自分で業者を手配することが可能です。ただし管理会社への事前確認は必要です。自分で手配する場合は、複数業者に見積もりを取って比較してみましょう。" },
  { question: "退去時の確認写真はいつ撮れば良いですか？", answer: "荷物を搬出した後、管理会社の立会い前に撮影することをおすすめします。全体・問題のある箇所・床との境目など複数の角度から記録しておきましょう。" },
];

export default function RentalRestorationPage() {
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
              { label: "賃貸退去時の確認リスト" },
            ]}
          />
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 pt-4">
          <div className="text-xs text-white/40 mb-3">ガイド</div>
          <h1 className="text-2xl md:text-3xl text-white mb-3" style={{ fontFamily: "var(--font-serif)" }}>
            賃貸退去時の畳張替え確認リスト
          </h1>
          <p className="text-sm text-white/60 max-w-xl leading-relaxed">
            退去時の費用負担の目安・チェックリスト・原状回復対応業者の探し方をまとめました。
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* 重要注記 */}
        <div className="bg-kincya/5 border border-kincya/30 p-5 mb-10">
          <p className="text-sm text-sumi font-medium mb-2">このガイドについて</p>
          <p className="text-xs text-sumi/70 leading-relaxed">
            このガイドでは退去時の費用負担の「一般的な目安」を説明します。実際の費用負担は
            <strong>管理会社の判断・賃貸借契約の内容・特約条項</strong>によって異なります。
            具体的な判断は管理会社や専門家に確認することをおすすめします。
          </p>
        </div>

        {/* 費用負担の目安 */}
        <section className="mb-14">
          <h2 className="text-xl text-sumi mb-6" style={{ fontFamily: "var(--font-serif)" }}>
            費用負担の目安（一般的な考え方）
          </h2>
          <div className="space-y-5">
            {COST_GUIDE.map((cg) => (
              <div key={cg.category} className={`border-l-4 ${cg.color} bg-white border border-border p-5`}>
                <h3 className="text-base font-medium text-sumi mb-3">{cg.category}</h3>
                <div className="mb-3">
                  <p className="text-xs text-sumi/40 mb-1.5">例</p>
                  <ul className="space-y-1">
                    {cg.examples.map((e, i) => (
                      <li key={i} className="text-xs text-sumi/70 flex items-start gap-2">
                        <span className="shrink-0">・</span>{e}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-kiji/30 p-3">
                  <p className="text-xs font-medium text-sumi mb-1">一般的な費用負担</p>
                  <p className="text-sm text-sumi">{cg.burden}</p>
                  <p className="text-[11px] text-sumi/50 mt-2 leading-relaxed">{cg.note}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-sumi/40 mt-3 leading-relaxed">
            ※ 上記はあくまで一般的な目安です。実際の費用は管理会社の判断や契約内容によって異なります。
          </p>
        </section>

        {/* 入居前チェックリスト */}
        <section className="mb-14">
          <h2 className="text-xl text-sumi mb-6" style={{ fontFamily: "var(--font-serif)" }}>
            入居前チェックリスト
          </h2>
          <p className="text-sm text-sumi/60 mb-4 leading-relaxed">
            入居時に畳の状態を記録しておくことで、退去時のトラブルを防ぐことができます。
          </p>
          <div className="bg-white border border-border p-6">
            <ul className="space-y-3">
              {ENTRY_CHECKLIST.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-4 h-4 border border-border mt-0.5 shrink-0" />
                  <span className="text-sm text-sumi/70">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 退去後チェックリスト */}
        <section className="mb-14">
          <h2 className="text-xl text-sumi mb-6" style={{ fontFamily: "var(--font-serif)" }}>
            退去後チェックリスト
          </h2>
          <p className="text-sm text-sumi/60 mb-4 leading-relaxed">
            退去前・立会い時に確認しておくべき項目です。
          </p>
          <div className="bg-white border border-border p-6">
            <ul className="space-y-3">
              {EXIT_CHECKLIST.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-4 h-4 border border-border mt-0.5 shrink-0" />
                  <span className="text-sm text-sumi/70">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 原状回復対応業者の探し方 */}
        <section className="mb-14">
          <h2 className="text-xl text-sumi mb-6" style={{ fontFamily: "var(--font-serif)" }}>
            原状回復対応業者の探し方
          </h2>
          <div className="bg-white border border-border p-6">
            <ul className="space-y-3">
              {PROVIDER_TIPS.map((tip, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-sumi/70">
                  <span className="text-igusa shrink-0 font-medium">{i + 1}</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 管理会社向けCTA */}
        <div className="bg-sumi text-white p-6 text-center mb-10">
          <h2 className="text-lg mb-2" style={{ fontFamily: "var(--font-serif)" }}>
            管理会社・不動産オーナーの方へ
          </h2>
          <p className="text-sm text-white/60 mb-5 leading-relaxed">
            退去後の畳工事を複数業者に一括で相談できます。請求書払い・インボイス対応業者も掲載しています。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/business/bulk-request"
              className="text-sm bg-kincya text-white px-8 py-3 font-bold hover:bg-do transition-colors"
            >
              法人・管理会社向け一括相談
            </Link>
            <Link
              href="/bulk-quote/new"
              className="text-sm border border-white/30 text-white px-8 py-3 hover:bg-white/10 transition-colors"
            >
              見積もりを依頼する
            </Link>
          </div>
        </div>
      </div>

      <FAQSection items={faqs} title="賃貸退去・原状回復に関するよくある質問" />

      <StickyBottomCTA
        primaryLabel="無料で見積もり依頼"
        primaryHref="/bulk-quote/new"
        secondaryLabel="業者を探す"
        secondaryHref="/search"
      />
    </div>
  );
}
