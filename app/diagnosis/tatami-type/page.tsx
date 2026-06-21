import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import MaterialDiagnosisClient from "@/components/forms/MaterialDiagnosisClient";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "畳タイプ診断 | あなたに合った畳素材を診断",
  description:
    "予算・耐久性・ペット・デザインなど10の質問で、い草・和紙・樹脂・琉球畳など最適な畳素材を診断。埼玉県の畳業者に見積もり依頼もできます。",
  path: "/diagnosis/tatami-type",
});

const MATERIAL_OVERVIEW = [
  { label: "い草畳", note: "コスパ重視・香りが良い" },
  { label: "国産い草", note: "品質・格式を重視" },
  { label: "和紙畳", note: "カビ・ダニに強い" },
  { label: "樹脂畳", note: "ペット・水回りに強い" },
  { label: "琉球畳", note: "モダンな和室に" },
  { label: "カラー畳", note: "デザインで選ぶ" },
];

export default function TatamiTypePage() {
  return (
    <div className="bg-cloud min-h-screen">
      {/* ヘッダー */}
      <div className="bg-sumi text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs
            items={[
              { label: "トップ", href: "/" },
              { label: "診断", href: "/diagnosis/material" },
              { label: "畳タイプ診断" },
            ]}
            variant="dark"
          />
          <h1
            className="text-2xl sm:text-3xl font-bold mt-4 mb-2"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            畳タイプ診断
          </h1>
          <p className="text-white/70 text-sm">
            あなたの状況に合った畳素材を診断します。い草・和紙・樹脂・琉球など多様な素材の中から最適な選択肢をご提案。
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
            {/* 素材一覧 */}
            <div className="bg-shiro border border-border rounded-xl p-5">
              <h2 className="text-sm font-bold text-sumi mb-3" style={{ fontFamily: "var(--font-serif)" }}>
                畳素材の種類
              </h2>
              <div className="space-y-2">
                {MATERIAL_OVERVIEW.map((m) => (
                  <div key={m.label} className="flex items-center justify-between text-xs">
                    <span className="font-medium text-sumi">{m.label}</span>
                    <span className="text-sumi/55">{m.note}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 依頼診断へ */}
            <div className="bg-kincya/5 border border-kincya/20 rounded-xl p-5">
              <h2 className="text-sm font-bold text-sumi mb-2" style={{ fontFamily: "var(--font-serif)" }}>
                素材より先に施工内容を決めたい方
              </h2>
              <p className="text-xs text-sumi/65 mb-3 leading-relaxed">
                まず「依頼診断」を試して、表替え・裏返し・新調など施工内容を確認しましょう。
              </p>
              <Link
                href="/request/start"
                className="block text-center text-xs font-medium text-kincya border border-kincya rounded-lg py-2 hover:bg-kincya hover:text-white transition-colors duration-150"
              >
                かんたん依頼診断へ
              </Link>
            </div>

            {/* 注意書き */}
            <div className="bg-kiji rounded-xl p-4">
              <p className="text-xs text-sumi/50 leading-relaxed">
                診断結果はあくまで参考情報です。素材の選択は業者にサンプルを見せてもらいながら、実際の和室の状況に合わせてご確認ください。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
