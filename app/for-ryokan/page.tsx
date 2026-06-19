import type { Metadata } from "next";
import IndustryPage from "@/components/marketplace/IndustryPage";
import { INDUSTRY_CONFIGS } from "@/config/industries";
import { createMetadata } from "@/lib/metadata";

const cfg = INDUSTRY_CONFIGS["for-ryokan"];

export const metadata: Metadata = createMetadata({
  title: "旅館・宿泊施設向け 客室の畳工事｜埼玉",
  description: "旅館・宿泊施設様向けに、客室の畳交換・耐久素材への変更・複数室の一括施工に対応。営業への影響を抑えた工期調整で、おもてなしの空間を整えます。",
  path: "/for-ryokan",
});

export default function Page() {
  return <IndustryPage config={cfg} />;
}
