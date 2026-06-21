"use client";

import dynamic from "next/dynamic";

const MaterialDiagnosis = dynamic(
  () => import("@/components/forms/MaterialDiagnosis"),
  { ssr: false }
);

export default function MaterialDiagnosisClient() {
  return <MaterialDiagnosis />;
}
