import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProviderById, getRelatedProviders, MOCK_PROVIDERS } from "@/data/providers";
import { getReviewsByProviderId } from "@/data/reviews";
import { getWorkCasesByProviderId } from "@/data/workcases";
import { getServicesByProviderId } from "@/data/provider-services";
import ProviderDetailClient from "@/components/marketplace/ProviderDetailClient";
import { SITE_URL } from "@/lib/metadata";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return MOCK_PROVIDERS.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const provider = getProviderById(id);
  if (!provider) return { title: "業者が見つかりません" };
  const name = provider.tradeName || provider.companyName;
  return {
    title: `${name} | 埼玉の畳・和室業者`,
    description: provider.catchCopy,
    alternates: { canonical: `${SITE_URL}/providers/${id}` },
  };
}

export default async function ProviderDetailPage({ params }: Props) {
  const { id } = await params;
  const provider = getProviderById(id);
  if (!provider) notFound();

  const reviews = getReviewsByProviderId(id);
  const workCases = getWorkCasesByProviderId(id);
  const services = getServicesByProviderId(id);
  const relatedProviders = getRelatedProviders(provider, 3);

  return (
    <ProviderDetailClient
      provider={provider}
      reviews={reviews}
      workCases={workCases}
      services={services}
      relatedProviders={relatedProviders}
    />
  );
}
