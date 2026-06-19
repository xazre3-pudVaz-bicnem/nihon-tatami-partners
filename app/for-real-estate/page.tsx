import type { Metadata } from "next";
import IndustryPage from "@/components/marketplace/IndustryPage";
import { INDUSTRY_CONFIGS } from "@/config/industries";
import { createMetadata } from "@/lib/metadata";

const cfg = INDUSTRY_CONFIGS["for-real-estate"];

export const metadata: Metadata = createMetadata({
  title: "不動産会社向け 畳・原状回復の一括対応｜埼玉",
  description: "不動産会社様向けの畳交換・クロス・床の原状回復を一括対応。迅速な現地確認と明朗な見積もりで空室期間を短縮。請求書払い・継続取引歓迎。",
  path: "/for-real-estate",
});

export default function Page() {
  return <IndustryPage config={cfg} />;
}
