import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "畳工事の依頼診断",
  description:
    "6つの質問に答えるだけで、あなたの状況に合った畳工事の種別と料金目安をご案内します。表替え・新調・裏返し・和紙畳・琉球畳など埼玉県対応の業者を比較できます。",
  path: "/request/diagnosis",
  noindex: true,
});

const STEPS = [
  { num: 1, label: "現在の状況を選択" },
  { num: 2, label: "お部屋の広さを入力" },
  { num: 3, label: "ご希望の時期を選択" },
  { num: 4, label: "建物種別を選択" },
  { num: 5, label: "ご要望を入力" },
  { num: 6, label: "連絡先の入力（任意）" },
];

const RECOMMEND_LIST = [
  "畳の張替えを検討しているが何を頼めばいいか分からない",
  "退去前・入居前に畳を直したい",
  "カビ・ダニが気になる、ニオイが取れない",
  "ペットの汚れ・引っかき傷で畳が傷んでいる",
  "和紙畳・琉球畳など機能性素材を試したい",
  "旅館・寺社・店舗など特殊な物件の和室工事",
];

export default function RequestDiagnosisPage() {
  return (
    <div className="bg-cloud min-h-screen">
      {/* ヘッダー */}
      <div className="bg-sumi text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs
            items={[
              { label: "トップ", href: "/" },
              { label: "依頼診断" },
            ]}
            variant="dark"
          />
          <h1
            className="text-2xl sm:text-3xl font-bold mt-4 mb-2"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            かんたん依頼診断
          </h1>
          <p className="text-white/70 text-sm">
            6つの質問に答えるだけで、あなたに合った施工種別と料金目安をご案内します。
          </p>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 説明カード */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-shiro border border-border rounded-xl p-8">
              <p className="text-xs font-medium text-kincya mb-3 uppercase tracking-widest">
                無料・1分で完了
              </p>
              <h2
                className="text-xl font-bold text-sumi mb-3"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                あなたに合った畳工事の種別を診断します
              </h2>
              <p className="text-sm text-sumi/65 leading-relaxed mb-6">
                畳の状態・お部屋の広さ・ご要望をもとに、最適な施工種別（表替え・裏返し・新調など）と料金の目安をご案内します。診断結果をもとに複数業者への一括見積もりも可能です。
              </p>

              {/* ステップ一覧 */}
              <div className="space-y-2 mb-8">
                {STEPS.map((step) => (
                  <div key={step.num} className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-ai/10 text-ai text-xs font-bold flex items-center justify-center flex-shrink-0">
                      {step.num}
                    </span>
                    <span className="text-sm text-sumi/75">{step.label}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/request/start"
                className="block w-full text-center bg-kincya text-white text-sm font-medium py-3.5 rounded-lg hover:opacity-90 transition-opacity duration-150"
              >
                診断をはじめる →
              </Link>

              <p className="text-xs text-sumi/40 text-center mt-3">
                ※ 登録不要・完全無料・見積もり依頼の義務なし
              </p>
            </div>
          </div>

          {/* サイドバー */}
          <div className="space-y-5">
            {/* こんな方におすすめ */}
            <div className="bg-shiro border border-border rounded-xl p-5">
              <h2
                className="text-sm font-bold text-sumi mb-3"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                こんな方におすすめ
              </h2>
              <ul className="space-y-2">
                {RECOMMEND_LIST.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-xs text-sumi/70 leading-relaxed"
                  >
                    <span className="text-igusa mt-0.5 flex-shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* 直接相談 */}
            <div className="bg-kincya/5 border border-kincya/20 rounded-xl p-5">
              <h2
                className="text-sm font-bold text-sumi mb-2"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                直接相談したい方へ
              </h2>
              <p className="text-xs text-sumi/65 mb-3 leading-relaxed">
                状況が複雑でどこに相談すれば良いか分からない方は、コンシェルジュへご相談ください。
              </p>
              <Link
                href="/contact"
                className="block text-center text-xs font-medium text-kincya border border-kincya rounded-lg py-2 hover:bg-kincya hover:text-white transition-colors duration-150"
              >
                コンシェルジュに相談する
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
