import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import FAQSection from "@/components/common/FAQSection";
import StickyBottomCTA from "@/components/common/StickyBottomCTA";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "畳工事の見積書チェックリスト｜確認すべき項目・追加費用",
  description: "畳工事の見積書で確認すべき項目一覧・追加費用が出やすい条件・業者に聞くべき質問集をまとめました。見積もりを取る前に必読のガイドです。",
  path: "/guide/estimate-checklist",
});

const CHECKLIST_SECTIONS = [
  {
    title: "基本費用の確認",
    icon: "💰",
    items: [
      "畳表替え/裏返し/新調の単価（1枚あたりの金額）が明記されているか",
      "畳床（土台）の費用が別途発生するか確認されているか",
      "縁（ヘリ）の素材・費用が含まれているか",
      "素材の種類・グレード（国産い草/中国産/和紙/樹脂）が明記されているか",
      "枚数と合計金額の計算があっているか",
    ],
  },
  {
    title: "追加費用の確認",
    icon: "⚠️",
    items: [
      "古畳の処分費が含まれているか（または別途発生か）",
      "家具の移動費が含まれているか",
      "出張費・交通費が記載されているか",
      "駐車場代が発生する場合の対応が明記されているか",
      "特殊サイズ・特注形状の場合の追加費用があるか",
    ],
  },
  {
    title: "施工内容の確認",
    icon: "📋",
    items: [
      "工事完了予定日が記載されているか",
      "施工中の荷物・家具の扱い方が説明されているか",
      "古畳を引き取ってもらえるかが確認されているか",
      "仕上がりの確認方法が明記されているか",
      "施工後の養生・乾燥時間について説明があるか",
    ],
  },
  {
    title: "アフターケアの確認",
    icon: "🛡️",
    items: [
      "施工後の保証期間・内容が記載されているか",
      "仕上がりに不満がある場合の対応が明確か",
      "連絡先（業者の電話/メール）が記載されているか",
      "領収書・請求書の発行ができるか",
    ],
  },
];

const ADDITIONAL_COST_CONDITIONS = [
  { condition: "古畳の処分", detail: "古い畳は産業廃棄物扱いです。処分費は1枚あたり500〜1,500円が目安ですが業者によって異なります。見積もりに含まれているか確認しましょう。" },
  { condition: "家具の移動", detail: "タンス・箪笥・冷蔵庫などの重い家具を移動する場合、別途費用が発生する業者があります。事前にお伝えして確認しておきましょう。" },
  { condition: "特殊サイズ・形状", detail: "京間・中京間・江戸間など地域によって畳のサイズが異なります。また、L字型や斜め切りなど特殊形状の場合は追加費用が発生します。" },
  { condition: "傷みが予想以上に激しい場合", detail: "現地確認で畳床の傷みが発見された場合、当初の見積もりより費用が上がることがあります。最終金額は現地確認後に確定します。" },
  { condition: "出張・交通費", detail: "業者のサービスエリア外や遠方の場合は出張費が発生することがあります。見積もり依頼時に住所を正確に伝えましょう。" },
  { condition: "駐車場代", detail: "駐車場がない場合やコインパーキングを使用する場合、別途駐車場代を請求される場合があります。事前に確認しておきましょう。" },
];

const QUESTIONS_TO_ASK = [
  { category: "費用について", questions: [
    "見積書に含まれていない費用は何かありますか？",
    "古畳の処分費は含まれていますか？",
    "家具の移動が必要な場合、別途費用はかかりますか？",
    "現地確認後に金額が変わることはありますか？",
  ]},
  { category: "素材について", questions: [
    "使用する素材の産地・グレードを教えてください",
    "国産い草と中国産い草の違いを教えてください",
    "ダニ・カビに強い素材はありますか？",
    "サンプルを見せてもらえますか？",
  ]},
  { category: "施工について", questions: [
    "施工はどのくらいの時間がかかりますか？",
    "新しい畳を敷いた後の注意点はありますか？",
    "工事中は在宅している必要がありますか？",
    "施工後に気になる点があった場合はどうすれば良いですか？",
  ]},
  { category: "支払いについて", questions: [
    "支払い方法はどのような種類に対応していますか？",
    "請求書払い・カード払いは可能ですか？",
    "支払いのタイミングはいつですか（施工前/後）？",
    "領収書の発行はできますか？",
  ]},
];

const faqs = [
  { question: "見積もりは書面でもらうべきですか？", answer: "必ず書面（紙またはメール・PDF）でもらうことをおすすめします。口頭での約束はトラブルの原因になる場合があります。見積書には内訳・素材・施工日・金額・追加費用の条件が明記されているか確認しましょう。" },
  { question: "見積もりと実際の請求金額が異なった場合はどうすれば？", answer: "見積書の内容と実際の請求が大きく異なる場合は、速やかに業者に確認しましょう。追加費用が発生した場合は理由の説明を求める権利があります。事前に「追加費用が発生する場合は事前に連絡をほしい」と伝えておくと安心です。" },
  { question: "見積もりは無料ですか？", answer: "多くの畳業者は無料で見積もりを行っています。ただし、遠方への出張見積もりは費用が発生する場合もあります。依頼前に無料かどうか確認しましょう。" },
  { question: "複数業者の見積もりを比較する際のポイントは？", answer: "総額だけでなく「素材の種類」「含まれるサービスの範囲」「追加費用の条件」を比較してください。安い業者が必ずしも良いわけではなく、含まれるサービスの差が価格差になっている場合があります。" },
];

export default function EstimateChecklistPage() {
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
              { label: "見積書チェックリスト" },
            ]}
          />
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 pt-4">
          <div className="text-xs text-white/40 mb-3">ガイド</div>
          <h1 className="text-2xl md:text-3xl text-white mb-3" style={{ fontFamily: "var(--font-serif)" }}>
            見積書チェックリスト
          </h1>
          <p className="text-sm text-white/60 max-w-xl leading-relaxed">
            畳工事の見積書を受け取ったら確認すべき項目、追加費用が出やすい条件、業者への質問集をまとめました。
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* 見積書チェックリスト */}
        <section className="mb-14">
          <h2 className="text-xl text-sumi mb-6" style={{ fontFamily: "var(--font-serif)" }}>
            見積書で確認すべき項目一覧
          </h2>
          <p className="text-sm text-sumi/60 mb-6 leading-relaxed">
            見積書を受け取ったら、以下の項目を確認しましょう。不明な点は業者に質問することをおすすめします。
          </p>
          <div className="space-y-5">
            {CHECKLIST_SECTIONS.map((section) => (
              <div key={section.title} className="bg-white border border-border p-5">
                <h3 className="text-sm font-medium text-sumi mb-4 flex items-center gap-2">
                  <span>{section.icon}</span>
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-4 h-4 border border-border mt-0.5 shrink-0" />
                      <span className="text-sm text-sumi/70">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-xs text-sumi/40 mt-3 text-center">
            ※ 見積もり内容を確認してから依頼できます
          </p>
        </section>

        {/* 追加費用が出やすい条件 */}
        <section className="mb-14">
          <h2 className="text-xl text-sumi mb-6" style={{ fontFamily: "var(--font-serif)" }}>
            追加費用が出やすい条件一覧
          </h2>
          <div className="space-y-3">
            {ADDITIONAL_COST_CONDITIONS.map((ac, i) => (
              <div key={i} className="border border-border bg-white p-5">
                <h3 className="text-sm font-medium text-sumi mb-2">
                  <span className="text-kincya mr-1.5">⚠</span>
                  {ac.condition}
                </h3>
                <p className="text-xs text-sumi/60 leading-relaxed">{ac.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 業者に聞くべき質問集 */}
        <section className="mb-14">
          <h2 className="text-xl text-sumi mb-6" style={{ fontFamily: "var(--font-serif)" }}>
            業者に聞くべき質問集
          </h2>
          <p className="text-sm text-sumi/60 mb-6 leading-relaxed">
            見積もり依頼・現地確認の際に業者へ質問しておくと安心な項目です。
          </p>
          <div className="space-y-5">
            {QUESTIONS_TO_ASK.map((qs) => (
              <div key={qs.category} className="bg-white border border-border p-5">
                <h3 className="text-sm font-medium text-sumi mb-3 border-b border-kiji pb-2">{qs.category}</h3>
                <ul className="space-y-2">
                  {qs.questions.map((q, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-sumi/70">
                      <span className="text-ai shrink-0 mt-0.5">Q</span>
                      {q}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* 関連ガイド */}
        <section className="mb-10">
          <h2 className="text-base text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>関連ガイド</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link href="/guide/how-to-choose" className="border border-border bg-white p-4 hover:border-ai/40 transition-colors group">
              <p className="text-sm text-sumi group-hover:text-ai transition-colors">畳業者の選び方 →</p>
              <p className="text-xs text-sumi/50 mt-0.5">見るべき5つのポイント</p>
            </Link>
            <Link href="/guide/omotegae-or-shinchou" className="border border-border bg-white p-4 hover:border-ai/40 transition-colors group">
              <p className="text-sm text-sumi group-hover:text-ai transition-colors">表替え・新調の判定チェックリスト →</p>
              <p className="text-xs text-sumi/50 mt-0.5">どの工事が必要か判定する</p>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <div className="bg-kincya/5 border border-kincya/20 p-6 text-center mb-10">
          <h2 className="text-lg text-sumi mb-2" style={{ fontFamily: "var(--font-serif)" }}>
            複数業者の見積もりを比較して選ぶ
          </h2>
          <p className="text-sm text-sumi/60 mb-5 leading-relaxed">
            1回の入力で最大5社に見積もり依頼。料金・素材・対応を比較できます。
          </p>
          <Link
            href="/bulk-quote/new"
            className="inline-block text-sm bg-kincya text-white px-8 py-3 font-bold hover:bg-do transition-colors"
          >
            無料で見積もり依頼
          </Link>
        </div>
      </div>

      <FAQSection items={faqs} title="見積もりに関するよくある質問" />

      <StickyBottomCTA
        primaryLabel="無料で見積もり依頼"
        primaryHref="/bulk-quote/new"
        secondaryLabel="業者を探す"
        secondaryHref="/search"
      />
    </div>
  );
}
