import type { Metadata } from "next";
import IndustryPage from "@/components/marketplace/IndustryPage";
import { INDUSTRY_CONFIGS } from "@/config/industries";
import { createMetadata } from "@/lib/metadata";

const cfg = INDUSTRY_CONFIGS["for-landlords"];

export const metadata: Metadata = createMetadata({
  title: "賃貸オーナー向け 畳・原状回復をコスパよく｜埼玉",
  description: "賃貸オーナー様向けに、畳・内装の原状回復や空室対策をコストを抑えて提案。相見積もりで適正価格、オンライン相談で遠方物件にも対応。",
  path: "/for-landlords",
});

export default function Page() {
  return <IndustryPage config={cfg} />;
}
