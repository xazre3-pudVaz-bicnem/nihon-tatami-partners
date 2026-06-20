import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { SITE_URL } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "トラブル時のサポートについて | 日本畳パートナーズ",
  description:
    "日本畳パートナーズで業者へ依頼した工事でお困りごとが発生した場合のサポート方針についてご説明します。契約・費用・補償は利用者と業者の間で取り決めていただきます。",
  alternates: { canonical: `${SITE_URL}/guarantee` },
};

const STEPS = [
  {
    num: "01",
    title: "まずは担当業者にご連絡",
    desc: "施工内容や仕上がりに関するお困りごとは、まず担当業者に直接ご相談ください。多くは当事者間で解決できます。",
  },
  {
    num: "02",
    title: "解決しない場合は運営へ相談",
    desc: "当事者間で解決が難しい場合は、お問い合わせフォームより運営にご相談ください。状況を伺います。",
  },
  {
    num: "03",
    title: "状況の確認・お取次ぎ",
    desc: "運営が状況を確認し、必要に応じて業者へのお取次ぎや、ご相談窓口のご案内を行います。",
  },
  {
    num: "04",
    title: "外部相談窓口のご案内",
    desc: "内容に応じて、消費生活センター等の公的な相談窓口をご案内する場合があります。",
  },
];

export default function GuaranteePage() {
  return (
    <div className="min-h-screen bg-shiro">
      <div className="bg-sumi">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumbs items={[{ label: "トップ", href: "/" }, { label: "トラブル時のサポート" }]} />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 pt-2">
          <h1 className="text-2xl md:text-3xl text-white mb-2" style={{ fontFamily: "var(--font-serif)" }}>
            トラブル時のサポートについて
          </h1>
          <p className="text-sm text-white/60">お困りごとが発生した際のご相談の流れをご案内します</p>
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
              <h2 className="text-lg text-sumi mb-2" style={{ fontFamily: "var(--font-serif)" }}>当サービスの位置づけ</h2>
              <p className="text-sm text-sumi/70 leading-relaxed">
                日本畳パートナーズは、畳・内装工事の業者と利用者をつなぐマッチングサービスです。工事の契約・費用・施工内容は、利用者と業者の間で直接取り決めていただきます。当サービスが工事の品質や費用を保証・補償するものではありません。
              </p>
            </div>
          </div>
        </div>

        {/* 重要なご案内 */}
        <section className="mb-8 bg-do/5 border border-do/30 p-6">
          <h2 className="text-lg text-sumi mb-3" style={{ fontFamily: "var(--font-serif)" }}>ご契約前にご確認ください</h2>
          <ul className="space-y-2">
            {[
              "見積もりの内訳（材料費・施工費・出張費・処分費など）をご確認ください。",
              "追加費用が発生する条件を事前に書面でご確認ください。",
              "保険の加入状況や資格の有無は、各業者に直接ご確認ください（掲載情報は業者の申告に基づきます）。",
              "契約・費用のお支払いは、利用者と業者の間で直接行っていただきます。",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-sumi/70">
                <span className="text-do shrink-0 mt-0.5">！</span>{item}
              </li>
            ))}
          </ul>
        </section>

        {/* 相談の流れ */}
        <section className="mb-8">
          <h2 className="text-lg text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>お困りごとが発生したときの流れ</h2>
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

        {/* 掲載時の確認について */}
        <section className="mb-8 bg-kiji/40 border border-kiji p-6">
          <h2 className="text-lg text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>掲載時の確認について</h2>
          <p className="text-sm text-sumi/70 mb-4 leading-relaxed">
            掲載申請時に、以下の基本情報の確認を行っています。これは業者の品質を保証するものではなく、利用者が業者を比較・検討するための情報提供を目的としています。
          </p>
          <ul className="space-y-2">
            {[
              "会社名・代表者名・所在地・連絡先などの基本情報",
              "対応サービス・対応エリア",
              "損害賠償保険の加入状況（業者の申告に基づく情報）",
              "保有資格（業者の申告に基づく情報）",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-sumi/70">
                <span className="text-igusa shrink-0 mt-0.5">✓</span>{item}
              </li>
            ))}
          </ul>
        </section>

        {/* CTA */}
        <div className="text-center">
          <p className="text-sm text-sumi/60 mb-4">ご不明な点やお困りごとはお問い合わせください</p>
          <Link href="/contact" className="inline-block bg-sumi text-white px-8 py-3 text-sm tracking-wider hover:bg-sumi/80 transition-colors">
            お問い合わせ
          </Link>
        </div>
      </div>
    </div>
  );
}
