import type { Metadata } from "next";
import IndustryPage from "@/components/marketplace/IndustryPage";
import { INDUSTRY_CONFIGS } from "@/config/industries";
import { createMetadata } from "@/lib/metadata";

const cfg = INDUSTRY_CONFIGS["for-store"];

export const metadata: Metadata = createMetadata({
  title: "店舗・飲食店向け 小上がり・座敷の畳工事｜埼玉",
  description: "店舗・飲食店様向けに、小上がり・個室・座敷の畳工事に対応。営業時間に配慮した施工、汚れに強い素材、店舗の雰囲気に合うデザイン畳を提案します。",
  path: "/for-store",
});

export default function Page() {
  return <IndustryPage config={cfg} />;
}
