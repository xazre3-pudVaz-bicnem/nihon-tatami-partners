import type { Metadata } from "next";
import IndustryPage from "@/components/marketplace/IndustryPage";
import { INDUSTRY_CONFIGS } from "@/config/industries";
import { createMetadata } from "@/lib/metadata";

const cfg = INDUSTRY_CONFIGS["for-temple-shrine"];

export const metadata: Metadata = createMetadata({
  title: "寺院・神社向け 本堂・拝殿の畳工事｜埼玉",
  description: "寺院・神社様向けに、本堂・拝殿・客殿の畳工事に対応。特殊寸法・大判畳・伝統仕様にも経験豊富な職人が対応。行事に合わせた工期調整も可能です。",
  path: "/for-temple-shrine",
});

export default function Page() {
  return <IndustryPage config={cfg} />;
}
