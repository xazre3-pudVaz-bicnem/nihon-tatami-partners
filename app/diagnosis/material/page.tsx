import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import MaterialDiagnosisClient from "@/components/forms/MaterialDiagnosisClient";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "素材診断 | 畳素材を選ぶ",
  description:
    "予算・耐久性・ペット・デザインなど条件を選んで、最適な畳素材（い草・和紙・樹脂・琉球畳など）を診断。埼玉県の業者に見積もり依頼もできます。",
  path: "/diagnosis/material",
});

const FAQ_ITEMS = [
  {
    q: "素材によって値段はどれくらい違いますか？",
    a: "い草畳（一般）が最もリーズナブルで3,200円〜/枚。和紙・樹脂・琉球畳は7,000〜18,000円/枚程度が目安です。素材グレードや業者により異なります。",
  },
  {
    q: "ペットがいる場合どの素材がおすすめですか？",
    a: "樹脂畳（ポリプロピレン素材）や和紙畳が耐久性・防汚性に優れ、ペットのいるご家庭に向いています。い草は爪による傷みが出やすい傾向があります。",
  },
  {
    q: "和紙畳とい草畳の違いは何ですか？",
    a: "和紙畳は和紙を原料とした機能性素材で、カビ・ダニが発生しにくく色あせもしにくい特長があります。い草の香りはありませんが、耐久性・メンテナンス性に優れます。",
  },
];

export default function MaterialDiagnosisPage() {
  return (
    <div className="bg-cloud min-h-screen">
      {/* ヘッダー */}
      <div className="bg-sumi text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs
            items={[
              { label: "トップ", href: "/" },
              { label: "素材診断" },
            ]}
            variant="dark"
          />
          <h1
            className="text-2xl sm:text-3xl font-bold mt-4 mb-2"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            素材診断
          </h1>
          <p className="text-white/70 text-sm">
            あなたの生活スタイルや優先条件から、最適な畳素材をご提案します。
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 診断コンポーネント */}
          <div className="lg:col-span-2">
            <div className="bg-shiro border border-border rounded-xl p-6 sm:p-8">
              <MaterialDiagnosisClient />
            </div>
          </div>

          {/* サイドバー */}
          <div className="space-y-5">
            {/* 素材別FAQ */}
            <div className="bg-shiro border border-border rounded-xl p-5">
              <h2 className="text-sm font-bold text-sumi mb-3" style={{ fontFamily: "var(--font-serif)" }}>
                素材でよくある質問
              </h2>
              <div className="space-y-4">
                {FAQ_ITEMS.map((faq) => (
                  <div key={faq.q}>
                    <p className="text-xs font-medium text-sumi mb-1">Q. {faq.q}</p>
                    <p className="text-xs text-sumi/60 leading-relaxed">A. {faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 畳タイプ診断へ */}
            <div className="bg-kiji border border-kiji rounded-xl p-5">
              <h2 className="text-sm font-bold text-sumi mb-2" style={{ fontFamily: "var(--font-serif)" }}>
                施工内容から決めたい方
              </h2>
              <p className="text-xs text-sumi/65 mb-3 leading-relaxed">
                表替え・裏返し・新調など施工種別から先に確認したい方はこちら。
              </p>
              <Link
                href="/request/start"
                className="block text-center text-xs font-medium text-ai border border-ai rounded-lg py-2 hover:bg-ai hover:text-white transition-colors duration-150"
              >
                かんたん依頼診断へ
              </Link>
            </div>

            {/* マッチング */}
            <div className="bg-kincya/5 border border-kincya/20 rounded-xl p-5">
              <h2 className="text-sm font-bold text-sumi mb-2" style={{ fontFamily: "var(--font-serif)" }}>
                業者を条件で絞り込む
              </h2>
              <p className="text-xs text-sumi/65 mb-3 leading-relaxed">
                エリア・対応サービス・特殊条件で業者を提案するおまかせマッチングを試してみましょう。
              </p>
              <Link
                href="/matching"
                className="block text-center text-xs font-medium bg-kincya text-white rounded-lg py-2 hover:bg-kincya/90 transition-colors duration-150"
              >
                おまかせマッチング
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
