import Link from "next/link";
import Image from "next/image";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import ProviderListCard from "@/components/marketplace/ProviderListCard";
import { SITE_URL } from "@/lib/metadata";
import type { Provider } from "@/lib/types";

export interface SeoPriceRow {
  label: string;
  price: string;
  note?: string;
}

export interface SeoFaq {
  question: string;
  answer: string;
}

export interface SeoFlowStep {
  title: string;
  desc: string;
}

export interface SeoLinkItem {
  label: string;
  href: string;
}

export interface SeoLandingProps {
  breadcrumbs: { label: string; href?: string }[];
  h1: string;
  lead: string;
  path: string;
  heroImage?: { src: string; alt: string };
  intro?: React.ReactNode;
  priceTitle?: string;
  priceRows?: SeoPriceRow[];
  priceNote?: string;
  providers: Provider[];
  providersTitle?: string;
  searchHref?: string;
  flow?: SeoFlowStep[];
  faqs: SeoFaq[];
  nearbyLinks?: SeoLinkItem[];
  nearbyTitle?: string;
  bodySections?: { heading: string; body: React.ReactNode }[];
}

const DEFAULT_FLOW: SeoFlowStep[] = [
  { title: "①  業者を探す・選ぶ", desc: "料金・口コミ・対応エリアで比較し、気になる業者を選びます。" },
  { title: "②  見積もりを依頼", desc: "フォームから無料で見積もりを依頼。写真を送れば概算も可能です。" },
  { title: "③  内容・日程を相談", desc: "素材や仕上がり、施工日を業者と相談して決めます。" },
  { title: "④  施工・確認", desc: "当日施工。仕上がりを確認し、追加費用の有無もチェックします。" },
  { title: "⑤  口コミを投稿", desc: "施工後に口コミを投稿して、次に依頼する人の参考にできます。" },
];

export default function SeoLandingPage({
  breadcrumbs,
  h1,
  lead,
  path,
  heroImage,
  intro,
  priceTitle = "料金相場の目安",
  priceRows,
  priceNote = "※ あくまで一般的な目安です。正確な料金は各業者の見積もりをご確認ください。",
  providers,
  providersTitle = "対応業者一覧",
  searchHref = "/search",
  flow = DEFAULT_FLOW,
  faqs,
  nearbyLinks,
  nearbyTitle = "近隣エリアから探す",
  bodySections,
}: SeoLandingProps) {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((b, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: b.label,
      item: `${SITE_URL}${b.href || path}`,
    })),
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="min-h-screen bg-shiro">
        <div className="bg-white border-b border-border">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        </div>

        {/* ヒーロー */}
        <div className="relative bg-sumi text-white overflow-hidden">
          {heroImage && (
            <>
              <Image src={heroImage.src} alt={heroImage.alt} fill className="object-cover object-center" priority sizes="100vw" />
              <div className="absolute inset-0 bg-gradient-to-r from-sumi via-sumi/85 to-sumi/50" />
            </>
          )}
          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-2xl md:text-3xl mb-3 leading-snug" style={{ fontFamily: "var(--font-serif)" }}>
              {h1}
            </h1>
            <p className="text-sm text-white/70 leading-relaxed max-w-3xl">{lead}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={searchHref} className="bg-kincya text-white px-6 py-3 text-sm tracking-wide hover:bg-do transition-colors">
                業者を比較する
              </Link>
              <Link href="/bulk-quote" className="border border-white/40 text-white px-6 py-3 text-sm tracking-wide hover:border-white transition-colors">
                一括見積もりを依頼
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          {intro && (
            <section className="bg-white border border-border p-6">
              <div className="text-sm text-sumi/70 leading-relaxed space-y-3">{intro}</div>
            </section>
          )}

          {/* 任意の本文セクション */}
          {bodySections?.map((s) => (
            <section key={s.heading} className="bg-white border border-border p-6">
              <h2 className="text-lg text-sumi mb-3" style={{ fontFamily: "var(--font-serif)" }}>{s.heading}</h2>
              <div className="text-sm text-sumi/70 leading-relaxed space-y-3">{s.body}</div>
            </section>
          ))}

          {/* 料金相場 */}
          {priceRows && priceRows.length > 0 && (
            <section>
              <h2 className="text-lg text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>{priceTitle}</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-border bg-white">
                  <thead>
                    <tr className="bg-kiji/60 text-sumi/70">
                      <th className="text-left px-3 py-2 font-medium border-b border-border">内容</th>
                      <th className="text-left px-3 py-2 font-medium border-b border-border">目安料金</th>
                      <th className="text-left px-3 py-2 font-medium border-b border-border">備考</th>
                    </tr>
                  </thead>
                  <tbody className="text-sumi/70">
                    {priceRows.map((r) => (
                      <tr key={r.label} className="border-b border-kiji last:border-0">
                        <td className="px-3 py-2">{r.label}</td>
                        <td className="px-3 py-2 text-do whitespace-nowrap">{r.price}</td>
                        <td className="px-3 py-2 text-xs">{r.note || "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-sumi/40 mt-2">{priceNote}</p>
              <Link href="/prices" className="text-sm text-ai hover:underline mt-2 inline-block">料金相場をもっと詳しく →</Link>
            </section>
          )}

          {/* 対応業者一覧 */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg text-sumi" style={{ fontFamily: "var(--font-serif)" }}>{providersTitle}</h2>
              <Link href={searchHref} className="text-sm text-ai hover:underline">すべて見る →</Link>
            </div>
            {providers.length === 0 ? (
              <div className="bg-white border border-border p-8 text-center">
                <p className="text-sm text-sumi/50 mb-3">該当する業者は準備中です</p>
                <Link href="/bulk-quote" className="inline-block bg-kincya text-white px-5 py-2.5 text-sm hover:bg-do transition-colors">
                  一括見積もりを依頼する
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {providers.map((p) => (
                  <ProviderListCard key={p.id} provider={p} />
                ))}
              </div>
            )}
          </section>

          {/* 施工の流れ */}
          {flow.length > 0 && (
            <section>
              <h2 className="text-lg text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>施工の流れ</h2>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                {flow.map((step) => (
                  <div key={step.title} className="bg-white border border-border p-4">
                    <p className="text-sm text-sumi font-medium mb-1">{step.title}</p>
                    <p className="text-xs text-sumi/60 leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* FAQ */}
          <section>
            <h2 className="text-lg text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>よくある質問</h2>
            <div className="bg-white border border-border divide-y divide-kiji">
              {faqs.map((faq) => (
                <details key={faq.question} className="group p-4">
                  <summary className="cursor-pointer text-sm text-sumi font-medium flex items-start gap-2 list-none">
                    <span className="text-kincya shrink-0">Q.</span>
                    <span className="flex-1">{faq.question}</span>
                    <span className="text-sumi/30 group-open:rotate-180 transition-transform shrink-0">▾</span>
                  </summary>
                  <p className="text-sm text-sumi/70 leading-relaxed mt-2 pl-6">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>

          {/* 近隣エリアリンク */}
          {nearbyLinks && nearbyLinks.length > 0 && (
            <section>
              <h2 className="text-base text-sumi mb-3" style={{ fontFamily: "var(--font-serif)" }}>{nearbyTitle}</h2>
              <div className="flex flex-wrap gap-2">
                {nearbyLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="text-sm border border-border text-sumi/70 hover:border-ai hover:text-ai transition-colors px-4 py-2 bg-white"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
