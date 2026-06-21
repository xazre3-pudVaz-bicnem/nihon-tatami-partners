import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import StickyBottomCTA from "@/components/common/StickyBottomCTA";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "畳・和室のガイド｜選び方・費用・判定チェックリスト",
  description: "畳業者の選び方、表替え・裏返し・新調の判定方法、見積書チェックリスト、賃貸退去時の確認リストなど、畳工事に役立つガイドを提供します。",
  path: "/guide",
});

const GUIDES = [
  {
    href: "/guide/how-to-choose",
    title: "畳業者の選び方ガイド",
    description: "見るべき5つのポイント・見積書チェックリスト・追加費用が出やすいケース。失敗しない業者選びの基本を解説します。",
    tags: ["業者選び", "費用", "見積もり"],
    icon: "🔍",
  },
  {
    href: "/guide/omotegae-or-shinchou",
    title: "表替え・裏返し・新調の判定チェックリスト",
    description: "どの工事が必要か迷ったときのフローチャートと判定チェックリスト。費用の目安も解説します。",
    tags: ["表替え", "裏返し", "新調"],
    icon: "📋",
  },
  {
    href: "/guide/estimate-checklist",
    title: "見積書チェックリスト",
    description: "見積書で確認すべき項目・追加費用が出やすい条件・業者に聞くべき質問集をまとめました。",
    tags: ["見積書", "費用確認", "チェックリスト"],
    icon: "✅",
  },
  {
    href: "/guide/rental-restoration",
    title: "賃貸退去時の畳張替え確認リスト",
    description: "退去時の費用負担の目安（管理会社の判断や契約内容による）・入居前・退去後のチェックリスト。",
    tags: ["賃貸", "退去", "原状回復"],
    icon: "🏠",
  },
  {
    href: "/guide/ryokan-temple",
    title: "旅館・寺社の畳工事チェックリスト",
    description: "旅館・宿泊施設の客室畳、寺社の本堂・拝殿の特殊工事に関する注意点とチェックリスト。",
    tags: ["旅館", "寺社", "法人向け"],
    icon: "⛩️",
  },
];

export default function GuideTopPage() {
  return (
    <div className="min-h-screen bg-shiro">
      <div className="bg-sumi">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumbs
            variant="dark"
            items={[
              { label: "トップ", href: "/" },
              { label: "ガイド" },
            ]}
          />
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 pt-4">
          <h1 className="text-2xl md:text-3xl text-white mb-3" style={{ fontFamily: "var(--font-serif)" }}>
            畳・和室工事ガイド
          </h1>
          <p className="text-sm text-white/60 max-w-xl leading-relaxed">
            業者の選び方から工事の判定方法、費用の目安まで。知っておくべき情報をわかりやすく解説します。
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {GUIDES.map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="group bg-white border border-border hover:border-ai/40 transition-all duration-200 hover:shadow-sm flex flex-col"
            >
              <div className="p-6 flex-1">
                <div className="text-3xl mb-4">{guide.icon}</div>
                <h2 className="text-base text-sumi mb-2 group-hover:text-ai transition-colors leading-snug" style={{ fontFamily: "var(--font-serif)" }}>
                  {guide.title}
                </h2>
                <p className="text-xs text-sumi/60 leading-relaxed mb-4">{guide.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {guide.tags.map((tag) => (
                    <span key={tag} className="text-[10px] border border-kincya/30 text-kincya px-1.5 py-0.5">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="px-6 py-3 border-t border-kiji bg-kiji/20 flex items-center justify-between">
                <span className="text-xs text-ai">詳しく読む</span>
                <span className="text-ai text-xs group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 bg-sumi text-white p-8 text-center">
          <h2 className="text-xl mb-3" style={{ fontFamily: "var(--font-serif)" }}>
            ガイドを読んだら、次は無料で見積もりを取りましょう
          </h2>
          <p className="text-sm text-white/60 mb-6 max-w-lg mx-auto leading-relaxed">
            1回の入力で複数の業者に見積もりを依頼できます。料金・対応・口コミを比較して、納得の1社を選べます。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/bulk-quote/new"
              className="text-sm bg-kincya text-white px-8 py-3 font-bold hover:bg-do transition-colors"
            >
              無料で見積もり依頼
            </Link>
            <Link
              href="/search"
              className="text-sm border border-white/30 text-white px-8 py-3 hover:bg-white/10 transition-colors"
            >
              業者を探す
            </Link>
          </div>
        </div>
      </div>

      <StickyBottomCTA
        primaryLabel="無料で見積もり依頼"
        primaryHref="/bulk-quote/new"
        secondaryLabel="業者を探す"
        secondaryHref="/search"
      />
    </div>
  );
}
