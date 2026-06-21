import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import FAQSection from "@/components/common/FAQSection";
import StickyBottomCTA from "@/components/common/StickyBottomCTA";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "畳業者の選び方ガイド｜見るべき5つのポイント",
  description: "畳業者を選ぶ際に確認すべき5つのポイント・見積書チェックリスト・追加費用が出やすいケースを解説。後悔しない業者選びのためのガイドです。",
  path: "/guide/how-to-choose",
});

const FIVE_POINTS = [
  {
    num: "01",
    title: "対応エリアと施工実績を確認する",
    body: "業者のサービスエリアに自宅が含まれているかを確認しましょう。エリア外だと出張費が高くなったり、対応を断られる場合があります。また、施工実績件数や口コミ評価も参考になります。",
    checklist: ["サービスエリアに含まれているか", "施工実績件数（多いほど経験豊富）", "口コミ評価の件数と内容"],
  },
  {
    num: "02",
    title: "資格・保険の有無を確認する",
    body: "「畳製作技能士」の資格（一級・二級）の有無は品質の目安になります。また、損害賠償保険への加入は工事中のトラブル時に重要です。業者からの申告情報として掲載されているため、気になる場合は業者に直接確認することをおすすめします。",
    checklist: ["畳製作技能士の資格（一級・二級）", "損害賠償保険への加入（申告情報）", "組合・団体への加盟"],
  },
  {
    num: "03",
    title: "見積もりの内訳を比較する",
    body: "総額だけでなく、内訳を確認することが大切です。畳表替えの単価・古畳処分費・家具移動費・出張費・追加費用などが含まれているかを確認しましょう。",
    checklist: ["畳表替え/新調の単価（1枚あたり）", "古畳の処分費用", "家具の移動費", "出張費・駐車場代", "追加費用の発生条件"],
  },
  {
    num: "04",
    title: "素材の説明が丁寧かを確認する",
    body: "国産い草・中国産い草・和紙畳・樹脂畳など、素材によって価格・耐久性・手触りが大きく異なります。業者が素材の違いを丁寧に説明してくれるかどうかが、信頼性の判断材料になります。",
    checklist: ["素材の種類（国産/中国産/和紙/樹脂）を説明してくれるか", "サンプルを持参してくれるか", "耐久性・手触りの違いを伝えてくれるか"],
  },
  {
    num: "05",
    title: "返信速度と対応姿勢を確認する",
    body: "問い合わせへの返信速度は、業者の対応品質を示す指標のひとつです。返信が速い業者は依頼後の対応も丁寧な場合が多いです。また、質問に対する回答の丁寧さや誠実さも重要なポイントです。",
    checklist: ["問い合わせへの返信速度（目安: 当日〜翌日）", "質問への丁寧な回答", "見積もりの説明が分かりやすいか"],
  },
];

const ADDITIONAL_COSTS = [
  { title: "家具の移動が必要な場合", detail: "タンスや押し入れの荷物などを移動する場合、別途費用がかかる業者があります。事前に確認しましょう。" },
  { title: "古畳の処分が必要な場合", detail: "古畳は産業廃棄物扱いになるため、処分費が発生します。金額は1枚数百円〜が目安ですが、業者によって異なります。" },
  { title: "特殊サイズ・形状の畳", detail: "標準サイズではない特注畳（半畳・炉畳・L字型など）は追加費用がかかる場合があります。" },
  { title: "傷みが予想以上に激しい場合", detail: "現地確認後に、表替えではなく新調が必要と判断される場合があります。最終金額は現地確認後に確定します。" },
  { title: "遠方への出張", detail: "業者のサービスエリア外や交通の便が悪い場所では出張費が発生する場合があります。" },
];

const faqs = [
  { question: "複数の業者に見積もりを取るべきですか？", answer: "1社だけでなく複数社に見積もりを取ることをおすすめします。料金・素材の提案・対応の丁寧さを比較することで、より納得のいく選択ができます。見積もり取得は基本的に無料です。" },
  { question: "見積もりの金額は後から変わることがありますか？", answer: "現地確認前の概算見積もりは変わる場合があります。畳の状態・傷みの程度・特殊サイズなど、実際に見てみて初めて判明することがあるためです。最終金額は現地確認後に確定するのが一般的です。見積もり内容を確認してから依頼することをおすすめします。" },
  { question: "一級畳製作技能士と二級の違いは何ですか？", answer: "畳製作技能士は国家資格で、一級のほうが技術レベルが高いとされています。ただし、二級保有者でも十分な実力を持つ方は多くいます。資格はあくまでひとつの参考指標です。" },
  { question: "施工後にクレームを言いにくいですが…", answer: "畳の出来に不満がある場合は、できるだけ早めに業者に連絡することをおすすめします。仕上がりの写真を撮って証拠を残しておくと良いでしょう。誠実な業者であれば対応してもらえる場合がほとんどです。" },
  { question: "インターネットで探した業者は信頼できますか？", answer: "口コミ・評価・施工実績などを参考に選ぶことで、信頼できる業者を見つけやすくなります。また、複数業者に見積もりを取ることで、相場からかけ離れた料金設定を避けることができます。" },
];

export default function HowToChoideGuidePage() {
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
              { label: "業者の選び方" },
            ]}
          />
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 pt-4">
          <div className="text-xs text-white/40 mb-3">ガイド</div>
          <h1 className="text-2xl md:text-3xl text-white mb-3" style={{ fontFamily: "var(--font-serif)" }}>
            畳業者の選び方ガイド
          </h1>
          <p className="text-sm text-white/60 max-w-xl leading-relaxed">
            見積もりを取る前に知っておきたい5つのポイントと、見積書のチェックリストを解説します。
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* 見るべき5つのポイント */}
        <section className="mb-14">
          <h2 className="text-xl text-sumi mb-8" style={{ fontFamily: "var(--font-serif)" }}>
            見るべき5つのポイント
          </h2>
          <div className="space-y-8">
            {FIVE_POINTS.map((point) => (
              <div key={point.num} className="flex gap-5">
                <div className="shrink-0 w-12">
                  <span className="text-3xl font-bold text-kiji/60" style={{ fontFamily: "var(--font-serif)" }}>{point.num}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-medium text-sumi mb-2 leading-snug">{point.title}</h3>
                  <p className="text-sm text-sumi/70 leading-relaxed mb-3">{point.body}</p>
                  <div className="bg-kiji/30 border border-kiji p-4">
                    <p className="text-xs font-medium text-sumi mb-2">確認ポイント</p>
                    <ul className="space-y-1">
                      {point.checklist.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-xs text-sumi/70">
                          <span className="text-igusa shrink-0 mt-0.5">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 追加費用が出やすいケース */}
        <section className="mb-14">
          <h2 className="text-xl text-sumi mb-6" style={{ fontFamily: "var(--font-serif)" }}>
            追加費用が出やすいケース
          </h2>
          <p className="text-sm text-sumi/60 mb-6 leading-relaxed">
            概算見積もりより実際の費用が高くなるケースがあります。事前に業者に確認しておきましょう。
          </p>
          <div className="space-y-3">
            {ADDITIONAL_COSTS.map((ac, i) => (
              <div key={i} className="border border-border bg-white p-4">
                <h3 className="text-sm font-medium text-sumi mb-1">⚠ {ac.title}</h3>
                <p className="text-xs text-sumi/60 leading-relaxed">{ac.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 見積書チェックリスト */}
        <section className="mb-14">
          <h2 className="text-xl text-sumi mb-6" style={{ fontFamily: "var(--font-serif)" }}>
            見積書チェックリスト
          </h2>
          <div className="bg-white border border-border p-6">
            <p className="text-sm text-sumi/60 mb-5 leading-relaxed">
              見積書を受け取ったら以下の項目を確認しましょう
            </p>
            {[
              "畳表替え/新調の単価が明記されているか",
              "古畳の処分費が含まれているか（または別途発生するか）",
              "家具の移動費が明記されているか",
              "出張費・駐車場費が記載されているか",
              "素材の種類・グレードが明記されているか",
              "工事完了予定日が記載されているか",
              "アフターケア・保証の説明があるか",
              "追加費用が発生する条件の説明があるか",
            ].map((item, i) => (
              <label key={i} className="flex items-start gap-3 mb-3 cursor-pointer group">
                <div className="w-4 h-4 border border-border mt-0.5 shrink-0 group-hover:border-ai/40 transition-colors" />
                <span className="text-sm text-sumi/70">{item}</span>
              </label>
            ))}
          </div>
          <p className="text-xs text-sumi/40 mt-3 text-center">
            ※ 見積もり内容を確認してから依頼できます
          </p>
        </section>

        {/* 関連ページ */}
        <section className="mb-10">
          <h2 className="text-base text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>関連ガイド</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link href="/guide/estimate-checklist" className="border border-border bg-white p-4 hover:border-ai/40 transition-colors group">
              <p className="text-sm text-sumi group-hover:text-ai transition-colors">見積書チェックリスト →</p>
              <p className="text-xs text-sumi/50 mt-0.5">業者に確認すべき質問集</p>
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
            業者への見積もり依頼はこちら
          </h2>
          <p className="text-sm text-sumi/60 mb-5 leading-relaxed">
            1回の入力で複数業者にまとめて見積もりを依頼できます。料金・対応・口コミを比較して選べます。
          </p>
          <Link
            href="/bulk-quote/new"
            className="inline-block text-sm bg-kincya text-white px-8 py-3 font-bold hover:bg-do transition-colors"
          >
            無料で見積もり依頼
          </Link>
        </div>
      </div>

      <FAQSection items={faqs} title="業者選びに関するよくある質問" />

      <StickyBottomCTA
        primaryLabel="無料で見積もり依頼"
        primaryHref="/bulk-quote/new"
        secondaryLabel="業者を探す"
        secondaryHref="/search"
      />
    </div>
  );
}
