import type { Metadata } from "next";
import Link from "next/link";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ServiceForm from "@/components/dashboard/ServiceForm";

export const metadata: Metadata = {
  title: "サービスを登録 | ダッシュボード | 日本畳パートナーズ",
  robots: "noindex,nofollow",
};

export default function DashboardServiceNewPage() {
  return (
    <DashboardLayout currentPath="/dashboard/services">
      <div>
        <div className="flex items-center gap-2 mb-1 text-xs text-sumi/40">
          <Link href="/dashboard/services" className="hover:text-ai">サービス管理</Link>
          <span>/</span>
          <span>新規登録</span>
        </div>
        <h1 className="text-xl text-sumi mb-6" style={{ fontFamily: "var(--font-serif)" }}>サービスを登録</h1>
        <ServiceForm mode="new" />
      </div>
    </DashboardLayout>
  );
}
