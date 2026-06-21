import type { Metadata } from "next";
import Link from "next/link";
import StatusBadge from "@/components/common/StatusBadge";
import SampleBadge from "@/components/common/SampleBadge";

export const metadata: Metadata = {
  title: "依頼履歴 | マイページ | 日本畳パートナーズ",
  robots: "noindex,nofollow",
};

interface Request {
  id: string;
  service: string;
  status: string;
  createdAt: string;
  city: string;
  providerName: string;
}

const SAMPLE_REQUESTS: Request[] = [
  {
    id: "req-001",
    service: "畳表替え（6畳）",
    status: "completed",
    createdAt: "2026-05-15",
    city: "さいたま市",
    providerName: "山田畳店",
  },
  {
    id: "req-002",
    service: "ふすま張替え（4枚）",
    status: "in_progress",
    createdAt: "2026-06-01",
    city: "川口市",
    providerName: "（業者検討中）",
  },
  {
    id: "req-003",
    service: "畳新調（8畳）",
    status: "pending",
    createdAt: "2026-06-18",
    city: "川越市",
    providerName: "（提案待ち）",
  },
];

export default function RequestsPage() {
  return (
    <div className="min-h-screen bg-cloud">
      {/* ページヘッダー */}
      <div className="bg-sumi">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-xs text-white/50 mb-1">
            <Link href="/mypage" className="hover:text-white/80">
              マイページ
            </Link>
            {" "}/ 依頼履歴
          </p>
          <h1 className="text-xl text-white" style={{ fontFamily: "var(--font-serif)" }}>
            依頼履歴
          </h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 掲載イメージバナー */}
        <div className="bg-kiji border border-border px-4 py-2 flex items-center gap-2 mb-6">
          <SampleBadge />
          <p className="text-xs text-sumi/60">
            掲載イメージです。実際の依頼履歴はログイン後に表示されます。
          </p>
        </div>

        {SAMPLE_REQUESTS.length === 0 ? (
          <div className="bg-white border border-border p-12 text-center">
            <p className="text-sm text-sumi/50 mb-4">まだ依頼履歴がありません</p>
            <Link
              href="/bulk-quote"
              className="text-sm text-white bg-kincya px-6 py-2 hover:bg-do transition-colors inline-block"
            >
              見積もりを依頼する
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {SAMPLE_REQUESTS.map((req) => (
              <div key={req.id} className="bg-white border border-border p-5">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <p className="text-xs text-sumi/40 mb-0.5">依頼番号：{req.id}</p>
                    <h2
                      className="text-base text-sumi"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      {req.service}
                    </h2>
                  </div>
                  <StatusBadge status={req.status} />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs border-t border-kiji pt-3 mb-3">
                  <div>
                    <span className="text-sumi/40 block mb-0.5">依頼日</span>
                    {req.createdAt}
                  </div>
                  <div>
                    <span className="text-sumi/40 block mb-0.5">エリア</span>
                    {req.city}
                  </div>
                  <div>
                    <span className="text-sumi/40 block mb-0.5">担当業者</span>
                    <span className={req.providerName.startsWith("（") ? "text-sumi/40" : "text-sumi"}>
                      {req.providerName}
                    </span>
                  </div>
                </div>

                {req.status === "completed" && (
                  <div className="flex gap-3 flex-wrap">
                    <Link
                      href="/bulk-quote"
                      className="text-xs border border-kincya text-kincya px-4 py-1.5 hover:bg-kincya hover:text-white transition-colors"
                    >
                      再依頼する
                    </Link>
                    <Link
                      href="/mypage/reviews/new"
                      className="text-xs border border-border text-sumi/60 px-4 py-1.5 hover:border-ai hover:text-ai transition-colors"
                    >
                      口コミを書く
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="mt-6">
          <Link href="/mypage" className="text-xs text-ai hover:underline">
            ← マイページに戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
