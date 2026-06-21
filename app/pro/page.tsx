import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { SITE_URL } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "業者を無料掲載｜畳・和室・内装工事業者の集客プラットフォーム | 日本畳パートナーズ",
  description:
    "埼玉の畳店・和室工事業者・内装業者を対象に、初期費用0円・月額0円で掲載できます。見積依頼の受信、口コミ蓄積、施工事例の登録、ダッシュボードでの案件管理に対応。",
  alternates: { canonical: `${SITE_URL}/pro` },
};

const BENEFITS = [
  {
    icon: "01",
    title: "見込み客が自然に集まる",
    desc: "「さいたま市 畳 表替え」「川口 ふすま張替え」など、地域×サービスで検索するユーザーが一覧ページを訪れます。SEO対策済みの下層ページ経由で業者ページへ誘導されます。",
    sub: "月間PV・問い合わせ数はダッシュボードで確認できます",
  },
  {
    icon: "02",
    title: "無料で掲載できる",
    desc: "基本プランは初期費用0円・月額0円。プロフィール・サービス・料金表・施工事例を登録して掲載できます。費用をかけずに始められます。",
    sub: "将来的な有料上位表示は任意です",
  },
  {
    icon: "03",
    title: "見積依頼・予約をまとめて管理",
    desc: "問い合わせ・見積依頼・予約リクエストがダッシュボードに一覧表示されます。返信・対応状況の管理も画面上で完結します。",
    sub: "スマホからも操作可能",
  },
  {
    icon: "04",
    title: "口コミが資産になる",
    desc: "施工後のお客様から口コミを集められます。蓄積した口コミが次の依頼者の判断材料になり、長期的な受注増につながります。口コミへの返信もできます。",
    sub: "施工事例も登録して差別化できます",
  },
  {
    icon: "05",
    title: "法人・旅館・寺社案件にも対応",
    desc: "個人顧客だけでなく、不動産会社・管理会社・旅館・寺社など法人からの見積依頼を受け取れます。対応業種をプロフィールに登録すれば絞り込みにも表示されます。",
    sub: "賃貸原状回復・一括対応にも対応業者として掲載",
  },
  {
    icon: "06",
    title: "サービスと料金表を公開できる",
    desc: "提供サービスごとに料金表・施工の流れ・対応エリア・キャンセルポリシーを登録できます。透明な料金情報が依頼者の安心感につながります。",
    sub: "写真・施工事例と組み合わせてアピール",
  },
];

const SUITABLE = [
  { label: "個人顧客を増やしたい畳店", detail: "リピーターだけでなく、新規顧客へのアプローチに" },
  { label: "法人・不動産会社から案件を受けたい業者", detail: "管理会社・賃貸オーナー向けに対応業種を登録" },
  { label: "口コミを蓄積してWEBでの評価を上げたい", detail: "施工後のお客様から口コミを集めやすい導線" },
  { label: "旅館・寺社・店舗から問い合わせを受けたい", detail: "法人・施設向けページ経由での流入あり" },
  { label: "料金表・施工事例を整備して差別化したい", detail: "ダッシュボードでサービス情報をいつでも編集" },
  { label: "受注管理をシンプルにしたい", detail: "見積・予約・メッセージをひとつの画面で管理" },
];

const FLOW = [
  { n: "01", title: "申請フォーム入力", desc: "会社情報・担当者・対応サービス・エリアを入力。6ステップで完了します。" },
  { n: "02", title: "運営側で確認", desc: "申請内容（会社情報・連絡先・対応サービス）を運営が確認します（1〜3営業日）。" },
  { n: "03", title: "掲載開始", desc: "確認後、掲載開始のご連絡をいたします。ダッシュボードにログインできるようになります。" },
  { n: "04", title: "情報を整備する", desc: "料金表・施工事例・写真・対応エリアを登録して、掲載内容を充実させていきます。" },
  { n: "05", title: "問い合わせを受け取る", desc: "見積依頼・予約リクエストが届いたらダッシュボードで確認し、返信します。" },
  { n: "06", title: "口コミを蓄積する", desc: "施工後に口コミ投稿の案内ができます。口コミが増えると検索での評価も上がります。" },
];

const DASHBOARD_ITEMS = [
  { label: "未対応の見積依頼", value: "3件" },
  { label: "未読メッセージ", value: "2件" },
  { label: "今月の閲覧数", value: "284" },
  { label: "今月の問い合わせ", value: "12件" },
  { label: "口コミ評価", value: "4.6" },
  { label: "施工実績", value: "142件" },
];

const STANDARDS = [
  "申請時に会社情報・連絡先・対応サービスの確認を行います。",
  "掲載後も口コミ・問い合わせ内容を運営が確認します。",
  "不適切な情報や利用規約に反する内容は掲載停止になることがあります。",
  "資格・保険の有無は業者の申告情報として掲載します（運営による現地確認は行いません）。",
];

const FAQS = [
  { q: "掲載は本当に無料ですか？", a: "基本プランは初期費用0円・月額0円で完全無料です。上位表示などを希望する場合は、将来的に有料プランもご用意予定です。" },
  { q: "どんな業者でも掲載できますか？", a: "埼玉県内で畳・和室・内装工事（ふすま、障子、クロス、原状回復など）を行っている業者様を対象としています。申請時に会社情報・連絡先・対応サービスを確認します。" },
  { q: "個人事業主でも掲載できますか？", a: "はい。個人事業主・一人親方の方も掲載いただけます。" },
  { q: "掲載までどれくらいかかりますか？", a: "申請内容を確認のうえ、通常1〜3営業日以内に掲載開始のご連絡をいたします。" },
  { q: "掲載後に内容を変更できますか？", a: "ダッシュボードからプロフィール・サービス・料金表・施工事例・対応エリアをいつでも編集できます。" },
  { q: "法人・旅館・寺社案件も受けられますか？", a: "はい。プロフィールで対応業種（法人・不動産・旅館・寺社など）を登録すると、該当する案件の絞り込みにも表示されます。" },
  { q: "問い合わせはどのように届きますか？", a: "見積依頼・予約リクエストはダッシュボードに通知されます。メッセージ機能でユーザーとやり取りできます。" },
  { q: "掲載をやめたいときはどうすればよいですか？", a: "ダッシュボードの設定から掲載停止を申請できます。" },
];

export default function ProPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <div className="min-h-screen bg-shiro">

        {/* パンくず */}
        <div className="bg-white border-b border-border">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <Breadcrumbs items={[{ label: "トップ", href: "/" }, { label: "業者を掲載する" }]} />
          </div>
        </div>

        {/* ヒーロー */}
        <section className="bg-sumi py-20 md:py-28 relative overflow-hidden">
          <div className="absolute inset-0 tatami-pattern opacity-5" />
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-xs text-kincya tracking-widest uppercase mb-4">For Providers</p>
              <h1 className="text-3xl md:text-5xl text-white mb-6 leading-tight" style={{ fontFamily: "var(--font-serif)" }}>
                畳・和室の専門業者として、<br />埼玉の見込み客に届ける
              </h1>
              <p className="text-base text-white/60 max-w-xl leading-relaxed mb-8">
                初期費用0円・月額0円。掲載するだけで「地域 × サービス」で検索したユーザーに見つけてもらえます。見積依頼から口コミまで、ひとつのダッシュボードで管理できます。
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/pro/register" className="inline-block bg-kincya text-white px-10 py-4 text-sm tracking-wider hover:bg-do transition-colors duration-300 font-medium">
                  無料で掲載申請する
                </Link>
                <Link href="#flow" className="inline-block border border-white/30 text-white/80 px-8 py-4 text-sm hover:border-white hover:text-white transition-colors duration-300">
                  掲載の流れを見る
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 数値実績 */}
        <section className="bg-white border-b border-border">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              {[
                { num: "20社+", label: "掲載業者数（準備中）" },
                { num: "31市区", label: "対応市区町村" },
                { num: "1,500+", label: "SEOページ数" },
                { num: "0円", label: "基本プラン費用" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-3xl text-kincya mb-1" style={{ fontFamily: "var(--font-serif)" }}>{s.num}</p>
                  <p className="text-xs text-sumi/50">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* メリット */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <p className="text-xs text-kincya tracking-widest uppercase mb-3">Benefits</p>
            <h2 className="text-2xl md:text-3xl text-sumi" style={{ fontFamily: "var(--font-serif)" }}>
              掲載するとできること
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BENEFITS.map((b) => (
              <div key={b.icon} className="bg-white border border-border p-6 hover:border-kincya/30 transition-colors duration-300">
                <span className="text-xs text-kincya tracking-widest">{b.icon}</span>
                <h3 className="text-base text-sumi mt-2 mb-2" style={{ fontFamily: "var(--font-serif)" }}>{b.title}</h3>
                <p className="text-xs text-sumi/70 leading-relaxed mb-3">{b.desc}</p>
                <p className="text-xs text-igusa">{b.sub}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ダッシュボードプレビュー */}
        <section className="bg-kiji/40 py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <p className="text-xs text-kincya tracking-widest uppercase mb-3">Dashboard</p>
              <h2 className="text-2xl text-sumi" style={{ fontFamily: "var(--font-serif)" }}>
                ダッシュボードで案件を一元管理
              </h2>
              <p className="text-sm text-sumi/60 mt-3">見積依頼・予約・口コミ・閲覧数をひとつの画面で確認できます</p>
            </div>
            <div className="bg-white border border-border p-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                {DASHBOARD_ITEMS.map((item) => (
                  <div key={item.label} className="bg-kiji/30 border border-border p-4">
                    <p className="text-xs text-sumi/50 mb-1">{item.label}</p>
                    <p className="text-2xl text-sumi" style={{ fontFamily: "var(--font-serif)" }}>{item.value}</p>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { label: "プロフィール編集", href: "/dashboard/profile" },
                  { label: "サービス・料金表", href: "/dashboard/services" },
                  { label: "見積依頼を確認", href: "/dashboard/quotes" },
                  { label: "施工事例を登録", href: "/dashboard/cases" },
                ].map((a) => (
                  <div key={a.label} className="border border-border text-center text-xs text-sumi/60 py-2.5 px-2">
                    {a.label}
                  </div>
                ))}
              </div>
              <p className="text-xs text-sumi/40 mt-3 text-center">※ イメージです。実際のダッシュボードは掲載申請後にご利用いただけます。</p>
            </div>
          </div>
        </section>

        {/* 向いている業者 */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl text-sumi" style={{ fontFamily: "var(--font-serif)" }}>こんな業者に向いています</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SUITABLE.map((s) => (
              <div key={s.label} className="bg-white border border-border p-4 flex items-start gap-3">
                <span className="text-igusa mt-0.5 shrink-0">✓</span>
                <div>
                  <p className="text-sm text-sumi font-medium">{s.label}</p>
                  <p className="text-xs text-sumi/50 mt-0.5">{s.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 掲載できるサービス一覧 */}
        <section className="bg-sumi py-12">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl text-white text-center mb-8" style={{ fontFamily: "var(--font-serif)" }}>
              掲載できるサービス・対象業者
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                "畳表替え", "畳裏返し", "畳新調", "琉球・縁なし畳",
                "和紙畳・樹脂畳", "カラー畳", "ペット対応畳", "畳処分・補修",
                "ふすま張替え", "障子張替え", "網戸張替え", "床の間工事",
                "和室リフォーム", "砂壁・聚楽壁", "茶室工事", "白木あく洗い",
                "クロス張替え", "床工事", "原状回復", "店舗内装",
              ].map((s) => (
                <div key={s} className="bg-white/10 text-white/80 text-xs text-center py-2.5 px-2">
                  {s}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 掲載の流れ */}
        <section id="flow" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <p className="text-xs text-kincya tracking-widest uppercase mb-3">Flow</p>
            <h2 className="text-2xl text-sumi" style={{ fontFamily: "var(--font-serif)" }}>掲載までの流れ</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FLOW.map((f) => (
              <div key={f.n} className="bg-white border border-border p-5 flex gap-4">
                <span className="text-kincya text-xl font-bold shrink-0" style={{ fontFamily: "var(--font-serif)" }}>{f.n}</span>
                <div>
                  <h3 className="text-sm text-sumi mb-1 font-medium" style={{ fontFamily: "var(--font-serif)" }}>{f.title}</h3>
                  <p className="text-xs text-sumi/60 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/pro/register" className="inline-block bg-kincya text-white px-10 py-4 text-sm tracking-wider hover:bg-do transition-colors duration-300 font-medium">
              無料で掲載申請する（申請5分）
            </Link>
          </div>
        </section>

        {/* 料金プラン */}
        <section className="bg-kiji/30 py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl text-sumi" style={{ fontFamily: "var(--font-serif)" }}>料金プラン</h2>
              <p className="text-sm text-sumi/60 mt-2">基本プランは完全無料。まず始めてみてください。</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {[
                {
                  name: "無料プラン",
                  price: "0円",
                  period: "永久無料",
                  features: [
                    "基本プロフィール掲載",
                    "サービス登録（2カテゴリまで）",
                    "施工事例（3件まで）",
                    "見積依頼の受信",
                    "メッセージ機能",
                    "ダッシュボード利用",
                  ],
                  cta: "無料で申請する",
                  highlight: false,
                  note: "まずここから始める",
                },
                {
                  name: "スタンダード",
                  price: "準備中",
                  period: "",
                  features: [
                    "全機能（無料プラン含む）",
                    "サービス登録（無制限）",
                    "施工事例（20件まで）",
                    "上位表示",
                    "写真10枚",
                    "口コミバッジ表示",
                  ],
                  cta: "準備中（近日公開）",
                  highlight: true,
                  note: "上位表示・反響強化",
                },
                {
                  name: "プレミアム",
                  price: "準備中",
                  period: "",
                  features: [
                    "スタンダード全機能",
                    "最上位固定表示",
                    "施工事例（無制限）",
                    "写真30枚",
                    "分析レポート",
                    "優先サポート",
                  ],
                  cta: "準備中（近日公開）",
                  highlight: false,
                  note: "法人・旅館向け強化",
                },
              ].map((plan) => (
                <div key={plan.name} className={`bg-white border p-6 flex flex-col ${plan.highlight ? "border-kincya" : "border-border"}`}>
                  {plan.highlight && (
                    <p className="text-xs text-kincya mb-2 font-medium">今後公開予定</p>
                  )}
                  <p className="text-xs text-sumi/50 mb-1">{plan.note}</p>
                  <h3 className="text-lg text-sumi mb-1" style={{ fontFamily: "var(--font-serif)" }}>{plan.name}</h3>
                  <p className="text-2xl text-kincya mb-1" style={{ fontFamily: "var(--font-serif)" }}>{plan.price}</p>
                  {plan.period && <p className="text-xs text-sumi/40 mb-4">{plan.period}</p>}
                  <ul className="space-y-2 mb-6 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="text-xs text-sumi/70 flex items-start gap-1.5">
                        <span className="text-igusa text-sm shrink-0">✓</span> {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/pro/register"
                    className={`block text-center text-sm py-3 transition-all duration-300 ${
                      plan.highlight
                        ? "bg-kincya/10 text-kincya border border-kincya/40 hover:bg-kincya hover:text-white"
                        : plan.name === "無料プラン"
                        ? "bg-kincya text-white hover:bg-do"
                        : "border border-border text-sumi/50 cursor-default"
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 掲載基準 */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white border border-border p-6">
            <h2 className="text-lg text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>掲載について</h2>
            <ul className="space-y-2">
              {STANDARDS.map((s) => (
                <li key={s} className="text-sm text-sumi/70 flex items-start gap-2">
                  <span className="text-ai shrink-0 mt-0.5">—</span>{s}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-kiji/30 py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl text-sumi text-center mb-8" style={{ fontFamily: "var(--font-serif)" }}>
              よくある質問
            </h2>
            <div className="divide-y divide-border bg-white border border-border">
              {FAQS.map((faq, i) => (
                <details key={i} className="group p-4">
                  <summary className="cursor-pointer text-sm text-sumi font-medium flex items-start gap-2 list-none">
                    <span className="text-kincya shrink-0">Q.</span>
                    <span className="flex-1">{faq.q}</span>
                    <span className="text-sumi/30 group-open:rotate-180 transition-transform shrink-0">▾</span>
                  </summary>
                  <p className="text-sm text-sumi/60 leading-relaxed mt-2 pl-6">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* 最終CTA */}
        <section className="bg-sumi py-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 tatami-pattern opacity-5" />
          <div className="relative">
            <h2 className="text-2xl md:text-3xl text-white mb-4" style={{ fontFamily: "var(--font-serif)" }}>
              まずは無料で掲載申請する
            </h2>
            <p className="text-sm text-white/60 mb-8 max-w-md mx-auto">申請は5〜10分で完了。申請内容を確認後、掲載開始のご連絡をいたします。</p>
            <Link href="/pro/register" className="inline-block bg-kincya text-white px-12 py-5 text-sm tracking-wider hover:bg-do transition-colors duration-300 font-medium">
              無料で掲載申請する
            </Link>
            <p className="text-xs text-white/40 mt-4">初期費用0円 ・ 月額0円 ・ いつでも掲載停止可</p>
          </div>
        </section>
      </div>
    </>
  );
}
