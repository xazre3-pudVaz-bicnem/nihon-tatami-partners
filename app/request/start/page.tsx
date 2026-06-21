import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import RequestWizardClient from "@/components/forms/RequestWizardClient";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "かんたん依頼診断",
  description:
    "6つの質問に答えるだけで、あなたの状況に合った畳工事の種別と料金目安をご案内。畳の表替え・新調・裏返し・和紙畳・琉球畳など、埼玉県対応の業者を比較できます。",
  path: "/request/start",
});

const RECOMMEND_LIST = [
  "畳の張替えを検討しているが何を頼めばいいか分からない",
  "退去前・入居前に畳を直したい",
  "カビ・ダニが気になる、ニオイが取れない",
  "ペットの汚れ・引っかき傷で畳が傷んでいる",
  "和紙畳・琉球畳など機能性素材を試したい",
  "旅館・寺社・店舗など特殊な物件の和室工事",
];

const SIDE_FAQS = [
  {
    q: "無料で使えますか？",
    a: "はい、診断は無料です。見積もりの依頼義務も一切ありません。",
  },
  {
    q: "個人情報は必要ですか？",
    a: "連絡先入力（Step 6）はオプションです。診断結果だけ確認することもできます。",
  },
  {
    q: "診断結果は正確ですか？",
    a: "お答えいただいた情報に基づく目安です。正確な料金は現地確認後の見積もりをご確認ください。",
  },
];

export default function RequestStartPage() {
  return (
    <div className="bg-cloud min-h-screen">
      {/* ヘッダー */}
      <div className="bg-sumi text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs
            items={[
              { label: "トップ", href: "/" },
              { label: "かんたん依頼診断" },
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
            6つの質問に答えるだけで、あなたに合ったおすすめの施工内容と料金目安をご案内します。
          </p>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ウィザードカード */}
          <div className="lg:col-span-2">
            <div className="bg-shiro border border-border rounded-xl shadow-sm p-6 sm:p-8">
              <RequestWizardClient />
            </div>
          </div>

          {/* サイドバー */}
          <div className="space-y-5">
            {/* こんな方におすすめ */}
            <div className="bg-shiro border border-border rounded-xl p-5">
              <h2 className="text-sm font-bold text-sumi mb-3" style={{ fontFamily: "var(--font-serif)" }}>
                こんな方におすすめ
              </h2>
              <ul className="space-y-2">
                {RECOMMEND_LIST.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-sumi/70 leading-relaxed">
                    <span className="text-igusa mt-0.5 flex-shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* よくある質問 */}
            <div className="bg-shiro border border-border rounded-xl p-5">
              <h2 className="text-sm font-bold text-sumi mb-3" style={{ fontFamily: "var(--font-serif)" }}>
                よくある質問
              </h2>
              <div className="space-y-3">
                {SIDE_FAQS.map((faq) => (
                  <div key={faq.q}>
                    <p className="text-xs font-medium text-sumi mb-0.5">Q. {faq.q}</p>
                    <p className="text-xs text-sumi/60 leading-relaxed">A. {faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* サポート */}
            <div className="bg-kincya/5 border border-kincya/20 rounded-xl p-5">
              <h2 className="text-sm font-bold text-sumi mb-2" style={{ fontFamily: "var(--font-serif)" }}>
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
