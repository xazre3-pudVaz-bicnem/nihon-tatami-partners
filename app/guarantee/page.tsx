import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { SITE_URL } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "損害賠償補償制度 | 日本畳パートナー",
  description: "日本畳パートナーで予約した工事でトラブルが発生した場合の損害賠償補償制度についてご説明します。",
  alternates: { canonical: `${SITE_URL}/guarantee` },
};

const STEPS = [
  {
    num: "01",
    title: "当サービスからネット予約した",
    desc: "ネット予約を通じて成立した依頼が対象です。直接連絡して発注した場合は対象外となります。",
  },
  {
    num: "02",
    title: "施工完了から30日以内に申請",
    desc: "施工完了日から30日以内に補償申請フォームよりお申し出ください。",
  },
  {
    num: "03",
    title: "被害状況の確認・調査",
    desc: "当サービスが業者と連絡を取り、被害状況を確認します。",
  },
  {
    num: "04",
    title: "補償額の決定・お支払い",
    desc: "調査結果をもとに補償額を決定し、申請者にお支払いします。",
  },
];

export default function GuaranteePage() {
  return (
    <div className="min-h-screen bg-shiro">
      <div className="bg-sumi">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumbs items={[{ label: "トップ", href: "/" }, { label: "損害賠償補償制度" }]} />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 pt-2">
          <h1 className="text-2xl md:text-3xl text-white mb-2" style={{ fontFamily: "var(--font-serif)" }}>
            損害賠償補償制度
          </h1>
          <p className="text-sm text-white/60">当サービスを通じて依頼した工事でのトラブルをサポートします</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* 概要 */}
        <div className="bg-white border border-igusa/30 p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-igusa/10 border border-igusa/30 flex items-center justify-center shrink-0 text-igusa">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg text-sumi mb-2" style={{ fontFamily: "var(--font-serif)" }}>当サービスの補償制度とは</h2>
              <p className="text-sm text-sumi/70 leading-relaxed">
                日本畳パートナーに掲載されている業者へネット予約を通じて依頼した工事において、業者の施工ミスや故意・過失により損害が発生した場合に、一定の条件のもと当サービスが損害を補償する制度です。
              </p>
            </div>
          </div>
        </div>

        {/* 補償内容 */}
        <section className="mb-8">
          <h2 className="text-lg text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>補償内容</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: "補償上限", value: "1件あたり最大10万円" },
              { label: "対象", value: "ネット予約で成立した依頼に起因する損害" },
              { label: "申請期限", value: "施工完了から30日以内" },
              { label: "対象業者", value: "保険加入済みの掲載業者（全員）" },
            ].map((item) => (
              <div key={item.label} className="flex gap-4 bg-white border border-border p-4">
                <span className="text-xs text-sumi/40 shrink-0 w-20">{item.label}</span>
                <span className="text-sm text-sumi font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 申請フロー */}
        <section className="mb-8">
          <h2 className="text-lg text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>申請の流れ</h2>
          <div className="space-y-3">
            {STEPS.map((step) => (
              <div key={step.num} className="flex gap-4 bg-white border border-border p-4">
                <div className="w-8 h-8 bg-sumi text-white text-xs font-bold flex items-center justify-center shrink-0">{step.num}</div>
                <div>
                  <h3 className="text-sm text-sumi font-medium mb-0.5">{step.title}</h3>
                  <p className="text-xs text-sumi/60">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 対象外 */}
        <section className="mb-8">
          <h2 className="text-lg text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>補償対象外となるケース</h2>
          <div className="bg-white border border-border p-5">
            <ul className="space-y-2">
              {[
                "当サービスを経由せず直接業者に連絡した依頼",
                "施工完了から30日を超えた申請",
                "経年劣化・自然消耗による損害",
                "お客様側の過失・不注意による損害",
                "見積もり・打ち合わせのみで施工が完了していない案件",
                "既存の建物に起因する損害（シロアリ被害・雨漏り等）",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-sumi/70">
                  <span className="text-do shrink-0 mt-0.5">✕</span>{item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 掲載業者の審査基準 */}
        <section className="mb-8 bg-kiji/40 border border-kiji p-6">
          <h2 className="text-lg text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>掲載業者の審査基準</h2>
          <p className="text-sm text-sumi/70 mb-4 leading-relaxed">
            日本畳パートナーは、以下の基準を満たした業者のみを掲載しています。業者の品質を担保することで、トラブルを事前に防ぐことを目的としています。
          </p>
          <ul className="space-y-2">
            {[
              "損害賠償保険への加入が確認できること",
              "実名・住所・電話番号が確認できること",
              "畳製作技能士などの資格を保有していること（または相当の実務経験）",
              "反社会的勢力との関与がないこと",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-sumi/70">
                <span className="text-igusa shrink-0 mt-0.5">✓</span>{item}
              </li>
            ))}
          </ul>
        </section>

        {/* CTA */}
        <div className="text-center">
          <p className="text-sm text-sumi/60 mb-4">補償についてご不明な点はお問い合わせください</p>
          <Link href="/contact" className="inline-block bg-sumi text-white px-8 py-3 text-sm tracking-wider hover:bg-sumi/80 transition-colors">
            お問い合わせ
          </Link>
        </div>
      </div>
    </div>
  );
}
