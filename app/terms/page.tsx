import type { Metadata } from "next";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { SITE_URL } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "利用規約 | 日本畳パートナー",
  description: "日本畳パートナーの利用規約です。サービスをご利用いただく前に必ずお読みください。",
  alternates: { canonical: `${SITE_URL}/terms` },
};

const SECTIONS = [
  {
    title: "第1条（適用）",
    body: "本規約は、日本畳パートナー（以下「当サービス」）が提供するすべてのサービスに適用されます。ユーザーは、本規約に同意した上でサービスをご利用ください。",
  },
  {
    title: "第2条（会員登録）",
    body: "会員登録は、本規約に同意した成人個人または法人が行えます。虚偽情報による登録、他者へのアカウント譲渡は禁止します。",
  },
  {
    title: "第3条（禁止事項）",
    body: "以下の行為を禁止します。(1) 法令に違反する行為、(2) 他のユーザーへの迷惑行為・誹謗中傷、(3) 虚偽の口コミ・評価の投稿、(4) 当サービスを通じずに業者と直接契約することによる手数料の回避、(5) 本サービスへの不正アクセス・サービス妨害行為。",
  },
  {
    title: "第4条（業者の義務）",
    body: "登録業者は、掲載情報の正確性を維持する義務を負います。施工後に発生したトラブルは業者が一義的な責任を負います。当サービスは業者と利用者間のマッチングを提供するものであり、施工に関する責任を負いません。",
  },
  {
    title: "第5条（免責事項）",
    body: "当サービスは、業者と利用者間で締結される契約の内容、施工品質、料金に関して責任を負いません。利用者は自己の判断と責任において業者を選定し、依頼するものとします。",
  },
  {
    title: "第6条（個人情報の取り扱い）",
    body: "当サービスは、プライバシーポリシーに従って個人情報を適切に管理します。",
  },
  {
    title: "第7条（規約の変更）",
    body: "当サービスは、必要に応じて本規約を変更できるものとします。変更後も継続してサービスを利用した場合は、変更後の規約に同意したものとみなします。",
  },
  {
    title: "第8条（準拠法・管轄）",
    body: "本規約の準拠法は日本法とし、紛争は東京地方裁判所を専属的合意管轄裁判所とします。",
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-shiro">
      <div className="bg-sumi">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumbs items={[{ label: "トップ", href: "/" }, { label: "利用規約" }]} />
        </div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 pt-2">
          <h1 className="text-2xl text-white" style={{ fontFamily: "var(--font-serif)" }}>利用規約</h1>
          <p className="text-xs text-white/40 mt-2">最終更新日：2024年11月1日</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white border border-border p-6 sm:p-8 space-y-6">
          <p className="text-sm text-sumi/70 leading-relaxed">
            本利用規約（以下「本規約」）は、日本畳パートナー（以下「当サービス」）が提供するサービスの利用条件を定めるものです。ご利用前に必ずお読みください。
          </p>
          {SECTIONS.map((s) => (
            <section key={s.title}>
              <h2 className="text-base text-sumi mb-2" style={{ fontFamily: "var(--font-serif)" }}>{s.title}</h2>
              <p className="text-sm text-sumi/70 leading-relaxed">{s.body}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
