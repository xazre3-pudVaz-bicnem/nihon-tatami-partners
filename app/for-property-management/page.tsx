import type { Metadata } from "next";
import IndustryPage from "@/components/marketplace/IndustryPage";
import { INDUSTRY_CONFIGS } from "@/config/industries";
import { createMetadata } from "@/lib/metadata";

const cfg = INDUSTRY_CONFIGS["for-property-management"];

export const metadata: Metadata = createMetadata({
  title: "管理会社向け 畳交換・原状回復の継続サポート｜埼玉",
  description: "管理会社様向けに、管理物件の畳交換・原状回復を継続サポート。発注から精算まで効率化し、入退去ごとの手配負担を軽減。請求書払い対応。",
  path: "/for-property-management",
});

export default function Page() {
  return <IndustryPage config={cfg} />;
}
