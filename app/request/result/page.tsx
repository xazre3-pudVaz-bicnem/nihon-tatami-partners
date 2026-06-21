import { redirect } from "next/navigation";

interface Props {
  searchParams: Promise<Record<string, string>>;
}

export default async function RequestResultPage({ searchParams }: Props) {
  const sp = await searchParams;
  const result = sp.result;
  redirect(`/request/complete${result ? `?result=${result}` : ""}`);
}
