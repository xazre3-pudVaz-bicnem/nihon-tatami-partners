import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/common/PageHeader";
import CTASection from "@/components/common/CTASection";
import FAQSection from "@/components/common/FAQSection";
import { createMetadata } from "@/lib/metadata";
import { FAQ_BUSINESS } from "@/data/faq";

export const metadata: Metadata = createMetadata({
  title: "法人・管理会社・施設向け畳・内装工事",
  description: "不動産会社・管理会社・賃貸オーナー・旅館・寺院・店舗向けの畳・内装工事。複数物件の一括対応・継続案件・迅速対応で物件の回転率向上をサポートします。",
  path: "/business",
});

const targets = [
  {
    title: "不動産会社",
    subtitle: "退去後の原状回復を迅速に",
    desc: "退去ごとの畳・クロス・床補修を一括依頼。迅速な現地確認で次の入居者募集をスムーズに進めます。",
    href: "/business/real-estate",
    points: ["複数物件の一括対応", "迅速な現地確認・見積もり", "継続取引の専用窓口"],
  },
  {
    title: "管理会社",
    subtitle: "継続案件を効率化・一元管理",
    desc: "退去のたびに連絡いただければ、最短で現地確認・見積もり・施工まで対応。複数物件も一括管理。",
    href: "/business/property-management",
    points: ["退去連絡後の迅速対応", "複数物件の一元管理", "請求書払い対応"],
  },
  {
    title: "賃貸オーナー",
    subtitle: "空室期間を最短に。費用対効果の高い工事を",
    desc: "リフォーム費用を抑えながら物件の魅力を高め、入居率向上をサポートします。",
    href: "/business/rental-owner",
    points: ["費用対効果重視のご提案", "空室対策プラン対応", "まとめて依頼でコスト削減"],
  },
  {
    title: "旅館・宿泊施設",
    subtitle: "営業を止めない、まとめて新調",
    desc: "全客室一括施工・繁忙期を避けたスケジュール調整で、旅館営業への影響を最小化します。",
    href: "/business/ryokan",
    points: ["全客室一括施工", "繁忙期回避スケジュール", "琉球畳・樹脂畳など選択肢豊富"],
  },
  {
    title: "寺院・神社",
    subtitle: "格式と伝統を守る畳・建具工事",
    desc: "本堂・客殿・書院など用途に合わせた素材選定と丁寧な施工。法要・行事の日程に配慮した工事計画を組みます。",
    href: "/business/temple-shrine",
    points: ["寺社向け高級縁・素材対応", "行事日程への配慮", "本堂・客殿・庫裏すべて対応"],
  },
  {
    title: "店舗オーナー",
    subtitle: "開業・改装・退去の内装工事",
    desc: "飲食店・サロン・小売店の開業・改装・退去時の内装工事を一括対応。畳・クロス・床を同時に依頼できます。",
    href: "/business/store",
    points: ["開業・改装・退去対応", "畳・クロス・床の一括工事", "短工期での対応も相談可"],
  },
];

const faqItems = FAQ_BUSINESS.slice(0, 6);

export default function BusinessPage() {
  return (
    <>
      <PageHeader
        title="法人・管理会社・施設向け畳・内装工事"
        subtitle="不動産会社・管理会社・旅館・寺社・店舗など、法人様からのご依頼をお待ちしています。"
        description="複数物件の一括対応・継続案件・迅速見積もりで、物件の回転率向上と施設の品質維持をサポートします。"
        breadcrumbs={[{ label: "法人向けサービス" }]}
        badge="BUSINESS"
      />

      {/* 法人ターゲット一覧 */}
      <section className="section-py bg-shiro">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10 bg-kincya" />
              <span className="text-xs tracking-widest text-kincya">FOR BUSINESS</span>
            </div>
            <h2
              className="text-2xl md:text-3xl text-sumi mb-4"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              対応する法人・施設の種類
            </h2>
            <p className="text-sm text-sumi/70 max-w-2xl leading-relaxed">
              業種・用途に合わせた対応プランをご用意しています。それぞれのページで詳細をご確認ください。
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {targets.map((target) => (
              <Link
                key={target.title}
                href={target.href}
                className="group block border border-border hover:border-kincya/40 transition-all duration-300 hover:shadow-md bg-white overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-1 h-8 bg-kincya" />
                    <div>
                      <h3
                        className="text-lg text-sumi group-hover:text-ai transition-colors"
                        style={{ fontFamily: "var(--font-serif)" }}
                      >
                        {target.title}
                      </h3>
                      <p className="text-xs text-kincya">{target.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-sm text-sumi/70 leading-relaxed mb-4">{target.desc}</p>
                  <ul className="space-y-1">
                    {target.points.map((point) => (
                      <li key={point} className="text-xs text-sumi/60 flex items-center gap-2">
                        <span className="w-1 h-1 bg-kincya rounded-full shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex items-center gap-2 text-xs text-ai group-hover:gap-3 transition-all">
                    <span>詳しく見る</span>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* BtoBの強み */}
      <section className="section-py bg-kiji/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-10 bg-kincya" />
              <span className="text-xs tracking-widest text-kincya">WHY US</span>
              <div className="h-px w-10 bg-kincya" />
            </div>
            <h2
              className="text-2xl md:text-3xl text-sumi"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              法人様に選ばれる理由
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: "01", title: "迅速な対応", desc: "退去連絡後、最短翌日の現地確認。物件の空き期間を最小化します。" },
              { num: "02", title: "一括対応力", desc: "畳・クロス・床・建具・ハウスクリーニング連携まで複数業者への依頼を一本化。" },
              { num: "03", title: "継続取引の実績", desc: "不動産会社・管理会社・旅館からの継続案件を多数対応。専用窓口をご用意。" },
              { num: "04", title: "請求書払い対応", desc: "法人様向けに請求書払いも対応。毎月の精算をまとめて管理できます。" },
            ].map((item) => (
              <div key={item.num} className="p-6 bg-white border border-border">
                <span className="text-3xl font-serif text-kincya/30">{item.num}</span>
                <h3
                  className="text-base text-sumi mt-2 mb-2"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {item.title}
                </h3>
                <p className="text-xs text-sumi/60 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQSection
        items={faqItems}
        title="法人様からよくある質問"
        subtitle="不動産会社・管理会社・旅館などからよく寄せられるご質問です。"
      />

      <CTASection
        title="法人・管理会社様のご相談はこちら"
        description="継続取引・複数物件の一括対応・請求書払いなど、法人様のご要望にあわせてご対応します。"
        showBusiness={false}
      />
    </>
  );
}
