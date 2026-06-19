import type { Metadata } from "next";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { SITE_URL } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "日本畳パートナーについて | 埼玉の畳・和室工事マッチングサービス",
  description: "日本畳パートナーは、埼玉県の畳職人・和室リフォーム業者と施主を繋ぐマッチングプラットフォームです。安心・丁寧・確かな技術の畳業者を見つけてください。",
  alternates: { canonical: `${SITE_URL}/about` },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-shiro">
      <div className="bg-sumi">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumbs items={[{ label: "トップ", href: "/" }, { label: "サービスについて" }]} />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 pt-4">
          <h1 className="text-2xl md:text-3xl text-white mb-2" style={{ fontFamily: "var(--font-serif)" }}>
            日本畳パートナーについて
          </h1>
          <p className="text-sm text-white/60">埼玉県の畳・和室工事業者と施主をつなぐマッチングサービス</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        <section>
          <h2 className="text-xl text-sumi mb-4 pb-2 border-b border-kiji" style={{ fontFamily: "var(--font-serif)" }}>
            サービスのミッション
          </h2>
          <p className="text-sm text-sumi/80 leading-relaxed mb-4">
            日本の伝統的な住まい文化である「畳」は、現代でも多くの家庭の暮らしを彩っています。しかし「近くの信頼できる畳業者が分からない」「料金が適正か判断できない」という声も多く聞かれます。
          </p>
          <p className="text-sm text-sumi/80 leading-relaxed">
            日本畳パートナーは、埼玉県内の優良な畳職人・和室リフォーム業者を「見える化」し、安心して依頼できる仕組みを作ることで、日本の伝統文化を次世代に繋いでいくことを目指しています。
          </p>
        </section>

        <section>
          <h2 className="text-xl text-sumi mb-6 pb-2 border-b border-kiji" style={{ fontFamily: "var(--font-serif)" }}>
            選ばれる3つの理由
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { title: "審査済みの優良業者のみ掲載", desc: "すべての業者は登録前に当社の審査を通過しています。資格・実績・対応品質を確認した業者のみをご紹介します。" },
              { title: "口コミで業者を比較", desc: "実際に依頼したユーザーの口コミを公開。評価・施工品質・対応の丁寧さなどを透明に比較できます。" },
              { title: "埼玉全市区町村をカバー", desc: "さいたま市から秩父まで、埼玉県内31市区町村の業者を掲載。地元に密着した業者をすぐに見つけられます。" },
            ].map((item) => (
              <div key={item.title} className="bg-white border border-border p-5">
                <h3 className="text-sm text-sumi font-medium mb-2 leading-snug" style={{ fontFamily: "var(--font-serif)" }}>{item.title}</h3>
                <p className="text-xs text-sumi/60 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl text-sumi mb-4 pb-2 border-b border-kiji" style={{ fontFamily: "var(--font-serif)" }}>
            対応エリア
          </h2>
          <p className="text-sm text-sumi/80 leading-relaxed">
            埼玉県内全域（さいたま市・川口市・越谷市・所沢市・草加市・春日部市・川越市・熊谷市・上尾市・狭山市・鴻巣市・深谷市・朝霞市・志木市・和光市・新座市・桶川市・久喜市・北本市・八潮市・富士見市・入間市・蕨市・戸田市・行田市・秩父市・東松山市・加須市・本庄市・飯能市・坂戸市）を対応エリアとしています。
          </p>
        </section>

        <section>
          <h2 className="text-xl text-sumi mb-4 pb-2 border-b border-kiji" style={{ fontFamily: "var(--font-serif)" }}>
            運営会社
          </h2>
          <table className="text-sm w-full max-w-lg">
            <tbody className="divide-y divide-kiji">
              {[
                ["サービス名", "日本畳パートナー"],
                ["運営", "株式会社 日本畳パートナー（仮）"],
                ["所在地", "埼玉県さいたま市（サービス準備中）"],
                ["お問い合わせ", "info@nihontatami.jp"],
              ].map(([label, value]) => (
                <tr key={label}>
                  <td className="py-2 pr-4 text-sumi/50 w-32 shrink-0">{label}</td>
                  <td className="py-2 text-sumi/80">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}
