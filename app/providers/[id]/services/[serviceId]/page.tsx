import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { MOCK_PROVIDER_SERVICES, getServiceById } from "@/data/provider-services";
import { getProviderById } from "@/data/providers";
import { getCategoryConfigBySlug } from "@/config/categories";
import { SITE_URL } from "@/lib/metadata";

interface Props {
  params: Promise<{ id: string; serviceId: string }>;
}

export async function generateStaticParams() {
  return MOCK_PROVIDER_SERVICES.map((s) => ({ id: s.providerId, serviceId: s.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, serviceId } = await params;
  const service = getServiceById(serviceId);
  const provider = getProviderById(id);
  if (!service || !provider) return {};
  const name = provider.tradeName || provider.companyName;
  return {
    title: `${service.title}｜${name} | 日本畳パートナーズ`,
    description: `${name}の${service.title}。${service.priceLabel}。${service.description.slice(0, 70)}`,
    alternates: { canonical: `${SITE_URL}/providers/${id}/services/${serviceId}` },
  };
}

export default async function ProviderServiceDetailPage({ params }: Props) {
  const { id, serviceId } = await params;
  const service = getServiceById(serviceId);
  const provider = getProviderById(id);
  if (!service || !provider || service.providerId !== id) notFound();

  const name = provider.tradeName || provider.companyName;
  const cat = getCategoryConfigBySlug(service.categorySlug);
  const otherServices = MOCK_PROVIDER_SERVICES.filter((s) => s.providerId === id && s.id !== serviceId);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "トップ", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: name, item: `${SITE_URL}/providers/${id}` },
      { "@type": "ListItem", position: 3, name: service.title, item: `${SITE_URL}/providers/${id}/services/${serviceId}` },
    ],
  };
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    serviceType: cat?.name ?? service.categorySlug,
    provider: { "@type": "LocalBusiness", name, address: { "@type": "PostalAddress", addressRegion: provider.prefecture, addressLocality: provider.city } },
    areaServed: service.serviceAreas.map((a) => ({ "@type": "City", name: a })),
    ...(service.priceFrom ? { offers: { "@type": "Offer", priceCurrency: "JPY", price: service.priceFrom } } : {}),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />

      <div className="min-h-screen bg-shiro">
        <div className="bg-sumi">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumbs
              variant="dark"
              items={[
                { label: "トップ", href: "/" },
                { label: name, href: `/providers/${id}` },
                { label: service.title },
              ]}
            />
          </div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 pt-4">
            {cat && <span className="text-xs text-kincya border border-kincya/30 px-2 py-0.5">{cat.name}</span>}
            <h1 className="text-xl md:text-2xl text-white mt-2" style={{ fontFamily: "var(--font-serif)" }}>
              {service.title}
            </h1>
            {service.subtitle && <p className="text-sm text-white/60 mt-1">{service.subtitle}</p>}
            <p className="text-sm text-kincya mt-2">{service.priceLabel}</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {service.catchCopy && (
                <p className="text-base text-sumi leading-relaxed" style={{ fontFamily: "var(--font-serif)" }}>
                  {service.catchCopy}
                </p>
              )}
              <section className="bg-white border border-border p-5">
                <h2 className="text-base text-sumi mb-2" style={{ fontFamily: "var(--font-serif)" }}>サービス内容</h2>
                <p className="text-sm text-sumi/70 leading-relaxed">{service.description}</p>
              </section>

              {/* 料金表 */}
              {service.priceTable && service.priceTable.length > 0 && (
                <section className="bg-white border border-border p-5">
                  <h2 className="text-base text-sumi mb-3" style={{ fontFamily: "var(--font-serif)" }}>料金表</h2>
                  <table className="w-full text-sm">
                    <tbody>
                      {service.priceTable.map((row, i) => (
                        <tr key={i} className="border-b border-border/60 last:border-0">
                          <td className="py-2.5 pr-4 text-sumi">
                            {row.label}
                            {row.note && <span className="block text-xs text-sumi/40">{row.note}</span>}
                          </td>
                          <td className="py-2.5 text-do font-medium text-right whitespace-nowrap">{row.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </section>
              )}

              {/* オプション料金 */}
              {service.optionPrices && service.optionPrices.length > 0 && (
                <section className="bg-white border border-border p-5">
                  <h2 className="text-base text-sumi mb-3" style={{ fontFamily: "var(--font-serif)" }}>オプション料金</h2>
                  <table className="w-full text-sm">
                    <tbody>
                      {service.optionPrices.map((row, i) => (
                        <tr key={i} className="border-b border-border/60 last:border-0">
                          <td className="py-2.5 pr-4 text-sumi">{row.label}</td>
                          <td className="py-2.5 text-sumi/70 text-right whitespace-nowrap">{row.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </section>
              )}

              {/* 施工の流れ */}
              {service.workFlow && service.workFlow.length > 0 && (
                <section className="bg-white border border-border p-5">
                  <h2 className="text-base text-sumi mb-3" style={{ fontFamily: "var(--font-serif)" }}>施工の流れ</h2>
                  <ol className="space-y-2">
                    {service.workFlow.map((step, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-sumi/70">
                        <span className="w-5 h-5 bg-ai/10 text-ai flex items-center justify-center text-xs shrink-0 mt-0.5">{i + 1}</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </section>
              )}

              {/* 注意事項 */}
              {(service.extraChargeCase?.length || service.cannotHandle?.length || service.customerNote) && (
                <section className="bg-kiji/40 border border-kiji p-5 space-y-3">
                  <h2 className="text-base text-sumi" style={{ fontFamily: "var(--font-serif)" }}>ご依頼前の確認事項</h2>
                  {service.customerNote && <p className="text-xs text-sumi/70 leading-relaxed">{service.customerNote}</p>}
                  {service.extraChargeCase && service.extraChargeCase.length > 0 && (
                    <div>
                      <p className="text-xs text-sumi/50 mb-1">追加費用が発生する場合</p>
                      <ul className="space-y-1">
                        {service.extraChargeCase.map((c, i) => (
                          <li key={i} className="text-xs text-sumi/70 flex items-start gap-1.5"><span className="text-do">＋</span>{c}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {service.cannotHandle && service.cannotHandle.length > 0 && (
                    <div>
                      <p className="text-xs text-sumi/50 mb-1">対応できないこと</p>
                      <ul className="space-y-1">
                        {service.cannotHandle.map((c, i) => (
                          <li key={i} className="text-xs text-sumi/70 flex items-start gap-1.5"><span className="text-sumi/40">×</span>{c}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {service.cancelPolicy && (
                    <div>
                      <p className="text-xs text-sumi/50 mb-1">キャンセルについて</p>
                      <p className="text-xs text-sumi/70">{service.cancelPolicy}</p>
                    </div>
                  )}
                </section>
              )}
            </div>

            {/* サイドバー */}
            <div className="space-y-4">
              <div className="bg-white border border-border p-5 sticky top-24">
                <p className="text-xs text-sumi/40 mb-0.5">料金</p>
                <p className="text-xl font-bold text-sumi mb-3">{service.priceLabel}</p>
                {service.serviceAreas.length > 0 && (
                  <p className="text-xs text-sumi/60 mb-3">
                    <span className="text-sumi/40 block mb-0.5">対応エリア</span>
                    {service.serviceAreas.join("・")}
                  </p>
                )}
                {service.availableDays && (
                  <p className="text-xs text-sumi/60 mb-4">
                    <span className="text-sumi/40 block mb-0.5">対応日</span>
                    {service.availableDays}
                  </p>
                )}
                <Link href={`/booking/new?provider=${id}&category=${service.categorySlug}`} className="block text-center bg-kincya text-white py-2.5 text-sm hover:bg-do transition-colors mb-2">
                  このサービスを予約
                </Link>
                <Link href={`/quote/new?provider=${id}&category=${service.categorySlug}`} className="block text-center border border-ai text-ai py-2.5 text-sm hover:bg-ai hover:text-white transition-colors">
                  見積もりを依頼
                </Link>
              </div>

              <div className="bg-white border border-border p-5">
                <h3 className="text-sm text-sumi mb-3" style={{ fontFamily: "var(--font-serif)" }}>提供業者</h3>
                <p className="text-sm font-medium text-sumi mb-0.5">{name}</p>
                <p className="text-xs text-sumi/50 mb-3">{provider.city}</p>
                <Link href={`/providers/${id}`} className="block text-center text-xs border border-border text-sumi/70 py-2 hover:border-ai hover:text-ai transition-colors">
                  業者の詳細を見る
                </Link>
              </div>

              {otherServices.length > 0 && (
                <div className="bg-white border border-border p-5">
                  <h3 className="text-sm text-sumi mb-3" style={{ fontFamily: "var(--font-serif)" }}>この業者の他のサービス</h3>
                  <ul className="space-y-2">
                    {otherServices.map((s) => (
                      <li key={s.id}>
                        <Link href={`/providers/${id}/services/${s.id}`} className="text-xs text-ai hover:underline">
                          {s.title}（{s.priceLabel}）
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
