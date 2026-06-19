import type { Metadata } from "next";
import AdminLayout from "@/components/layout/AdminLayout";
import { MOCK_PROVIDER_SERVICES } from "@/data/provider-services";
import { getProviderById } from "@/data/providers";
import { getCategoryConfigBySlug } from "@/config/categories";

export const metadata: Metadata = {
  title: "掲載サービス管理 | 管理画面 | 日本畳パートナーズ",
  robots: "noindex,nofollow",
};

export default function AdminServicesPage() {
  return (
    <AdminLayout currentPath="/admin/services">
      <div>
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <h1 className="text-xl text-sumi" style={{ fontFamily: "var(--font-serif)" }}>
            掲載サービス管理（{MOCK_PROVIDER_SERVICES.length}件）
          </h1>
          <input type="text" placeholder="サービス名・業者で検索" className="border border-border text-xs px-3 py-2 focus:outline-none focus:border-ai w-56" />
        </div>

        <div className="bg-white border border-border overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-kiji">
                <th className="text-left text-xs text-sumi/50 font-normal px-4 py-3">サービス</th>
                <th className="text-left text-xs text-sumi/50 font-normal px-4 py-3">カテゴリ</th>
                <th className="text-left text-xs text-sumi/50 font-normal px-4 py-3">業者</th>
                <th className="text-left text-xs text-sumi/50 font-normal px-4 py-3">料金</th>
                <th className="text-left text-xs text-sumi/50 font-normal px-4 py-3">状態</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {MOCK_PROVIDER_SERVICES.map((s) => {
                const provider = getProviderById(s.providerId);
                const cat = getCategoryConfigBySlug(s.categorySlug);
                return (
                  <tr key={s.id} className="border-b border-kiji last:border-0 hover:bg-kiji/20 transition-colors">
                    <td className="px-4 py-3">
                      <p className="text-sm text-sumi">{s.title}</p>
                      <p className="text-xs text-sumi/40">{s.id}</p>
                    </td>
                    <td className="px-4 py-3 text-xs text-sumi">{cat?.name ?? s.categorySlug}</td>
                    <td className="px-4 py-3 text-xs text-sumi">{provider?.tradeName ?? provider?.companyName ?? s.providerId}</td>
                    <td className="px-4 py-3 text-xs text-do">{s.priceLabel}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 ${s.active ? "bg-igusa/10 text-igusa" : "bg-kiji text-sumi/50"}`}>
                        {s.active ? "公開中" : "非公開"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button className="text-xs text-ai hover:underline mr-3">確認</button>
                      <button className="text-xs text-do hover:underline">非公開</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
