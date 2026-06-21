"use client";

import dynamic from "next/dynamic";

const RequestWizard = dynamic(
  () => import("@/components/forms/RequestWizard"),
  { ssr: false }
);

export default function RequestWizardClient() {
  return <RequestWizard />;
}
