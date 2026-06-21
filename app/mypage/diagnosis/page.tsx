import type { Metadata } from "next";
import Link from "next/link";
import SampleBadge from "@/components/common/SampleBadge";

export const metadata: Metadata = {
  title: "診断履歴 | マイページ | 日本畳パートナーズ",
  robots: "noindex,nofollow",
};

interface DiagnosisHistoryItem {
  id: string;
  diagnosisType: "request" | "material";
  resultSummary: string;
  createdAt: string;
}

const SAMPLE_HISTORY: DiagnosisHistoryItem[] = [
  {
    id: "d-001",
    diagnosisType: "request",
    resultSummary: "畳表替えが推奨されます",
    createdAt: "2026-06-15",
  },
  {
    id: "d-002",
    diagnosisType: "material",
    resultSummary: "和紙畳がおすすめです",
    createdAt: "2026-06-10",
  },
];

const DIAGNOSIS_TYPE_LABEL: Record<DiagnosisHistoryItem["diagnosisType"], string> = {
  request: "依頼内容診断",
  material: "素材診断",
};

const DIAGNOSIS_LINK: Record<DiagnosisHistoryItem["diagnosisType"], string> = {
  request: "/diagnosis",
  material: "/diagnosis/material",
};

export default function DiagnosisHistoryPage() {
  return (
    <div className="min-h-screen bg-cloud">
      {/* ページヘッダー */}
      <div className="bg-sumi">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-xs text-white/50 mb-1">
            <Link href="/mypage" className="hover:text-white/80">
              マイページ
            </Link>
            {" "}/ 診断履歴
          </p>
          <h1 className="text-xl text-white" style={{ fontFamily: "var(--font-serif)" }}>
            診断履歴
          </h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 掲載イメージバナー */}
        <div className="bg-kiji border border-border px-4 py-2 flex items-center gap-2 mb-6">
          <SampleBadge />
          <p className="text-xs text-sumi/60">
            掲載イメージです。実際の診断履歴はログイン後に表示されます。
          </p>
        </div>

        {SAMPLE_HISTORY.length === 0 ? (
          <div className="bg-white border border-border p-12 text-center">
            <p className="text-sm text-sumi/50 mb-4">診断履歴がありません</p>
            <Link
              href="/diagnosis"
              className="text-sm text-white bg-kincya px-6 py-2 hover:bg-do transition-colors inline-block"
            >
              診断を始める
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {SAMPLE_HISTORY.map((item) => (
              <div key={item.id} className="bg-white border border-border p-5">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs bg-ai/10 text-ai border border-ai/20 px-2 py-0.5">
                        {DIAGNOSIS_TYPE_LABEL[item.diagnosisType]}
                      </span>
                      <span className="text-xs text-sumi/40">{item.createdAt}</span>
                    </div>
                    <p className="text-base text-sumi" style={{ fontFamily: "var(--font-serif)" }}>
                      {item.resultSummary}
                    </p>
                  </div>
                </div>

                <div className="border-t border-kiji pt-3 flex gap-3">
                  <Link
                    href={DIAGNOSIS_LINK[item.diagnosisType]}
                    className="text-xs border border-kincya text-kincya px-4 py-1.5 hover:bg-kincya hover:text-white transition-colors"
                  >
                    もう一度診断する
                  </Link>
                  <Link
                    href="/bulk-quote"
                    className="text-xs border border-border text-sumi/60 px-4 py-1.5 hover:border-ai hover:text-ai transition-colors"
                  >
                    見積もりを依頼する
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 診断へのCTA */}
        <div className="mt-6 bg-white border border-border p-5">
          <h2 className="text-base text-sumi mb-2" style={{ fontFamily: "var(--font-serif)" }}>
            新しい診断を始める
          </h2>
          <p className="text-xs text-sumi/60 mb-4">
            畳の状態や用途にあった施工内容・素材を診断ツールでかんたんに調べられます。
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/diagnosis"
              className="text-sm border border-ai text-ai px-5 py-2 hover:bg-ai hover:text-white transition-colors"
            >
              依頼内容を診断する
            </Link>
            <Link
              href="/diagnosis/material"
              className="text-sm border border-border text-sumi/60 px-5 py-2 hover:border-ai hover:text-ai transition-colors"
            >
              素材を診断する
            </Link>
          </div>
        </div>

        <div className="mt-6">
          <Link href="/mypage" className="text-xs text-ai hover:underline">
            ← マイページに戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
