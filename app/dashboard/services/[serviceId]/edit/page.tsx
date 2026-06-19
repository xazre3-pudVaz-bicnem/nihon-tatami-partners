import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ServiceForm from "@/components/dashboard/ServiceForm";
import { MOCK_PROVIDER_SERVICES, getServiceById } from "@/data/provider-services";

interface Props {
  params: Promise<{ serviceId: string }>;
}

export async function generateStaticParams() {
  return MOCK_PROVIDER_SERVICES.map((s) => ({ serviceId: s.id }));
}

export const metadata: Metadata = {
  title: "サービスを編集 | ダッシュボード | 日本畳パートナーズ",
  robots: "noindex,nofollow",
};

export default async function DashboardServiceEditPage({ params }: Props) {
  const { serviceId } = await params;
  const service = getServiceById(serviceId);
  if (!service) notFound();

  return (
    <DashboardLayout currentPath="/dashboard/services">
      <div>
        <div className="flex items-center gap-2 mb-1 text-xs text-sumi/40">
          <Link href="/dashboard/services" className="hover:text-ai">サービス管理</Link>
          <span>/</span>
          <span>編集</span>
        </div>
        <h1 className="text-xl text-sumi mb-6" style={{ fontFamily: "var(--font-serif)" }}>
          サービスを編集：{service.title}
        </h1>
        <ServiceForm mode="edit" initial={service} />
      </div>
    </DashboardLayout>
  );
}
