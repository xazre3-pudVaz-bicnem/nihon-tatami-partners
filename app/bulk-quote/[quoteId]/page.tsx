import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import SampleBadge from "@/components/common/SampleBadge";
import { createMetadata } from "@/lib/metadata";
import type { BulkQuote } from "@/lib/types-platform";
import { MOCK_PROVIDERS } from "@/data/providers";

interface Props {
  params: Promise<{ quoteId: string }>;
}

export async function generateStaticParams() {
  return [{ quoteId: "demo" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { quoteId } = await params;
  return createMetadata({
    title: `見積もり依頼 #${quoteId} | 依頼詳細`,
    description: "見積もり依頼の詳細と各業者の返信ステータスを確認できます。",
    path: `/bulk-quote/${quoteId}`,
    noindex: true,
  });
}

const DEMO_BULK_QUOTE: BulkQuote = {
  id: "demo",
  services: ["tatami-omotegae", "tatami-shinchou"],
  propertyType: "戸建て",
  tatamiCount: "6畳",
  city: "さいたま市",
  prefecture: "埼玉県",
  schedule: "1ヶ月以内",
  notes: "築30年の戸建て和室6畳。新調か表替えかご相談したいです。",
  providerIds: ["prov-001", "prov-002", "prov-003"],
  providers: [
    {
      providerId: "prov-001",
      status: "replied",
      repliedAt: "2026-06-19T14:30:00Z",
      estimateTotal: 25200,
      estimateBreakdown: {
        tatamiOmotegae: 22800,
        oldTatamiDisposal: 1800,
        furnitureMove: 600,
        total: 25200,
        unitLabel: "6畳の場合",
        note: "表材は国産い草（上等）をご提案します",
      },
      earliestDate: "2026-07-05",
      paymentMethods: ["現金", "振込"],
      isSample: true,
    },
    {
      providerId: "prov-002",
      status: "pending",
      isSample: true,
    },
    {
      providerId: "prov-003",
      status: "replied",
      repliedAt: "2026-06-19T16:00:00Z",
      estimateTotal: 22800,
      estimateBreakdown: {
        tatamiOmotegae: 21000,
        oldTatamiDisposal: 1800,
        total: 22800,
        unitLabel: "6畳の場合",
        note: "写真見積もりのため現地確認後に確定します",
      },
      earliestDate: "2026-07-03",
      paymentMethods: ["現金", "カード", "振込"],
      isSample: true,
    },
  ],
  status: "receiving",
  isSample: true,
  createdAt: "2026-06-19T10:00:00Z",
  updatedAt: "2026-06-19T16:00:00Z",
};

const STATUS_MAP: Record<string, { label: string; color: string }> = {
  replied: { label: "返信済み", color: "text-igusa border-igusa bg-igusa/5" },
  pending: { label: "確認中", color: "text-kincya border-kincya/40 bg-kincya/5" },
  declined: { label: "辞退", color: "text-sumi/40 border-border bg-kiji/30" },
  selected: { label: "選定済み", color: "text-ai border-ai bg-ai/5" },
  not_selected: { label: "見送り", color: "text-sumi/40 border-border bg-kiji/30" },
};

const QUOTE_STATUS_MAP: Record<string, string> = {
  draft: "下書き",
  sent: "送信済み",
  receiving: "返信受付中",
  completed: "完了",
  expired: "期限切れ",
};

export default async function BulkQuoteDetailPage({ params }: Props) {
  const { quoteId } = await params;
  const quote = quoteId === "demo" ? DEMO_BULK_QUOTE : null;

  if (!quote) {
    return (
      <div className="min-h-screen bg-shiro flex items-center justify-center">
        <div className="text-center">
          <p className="text-sumi/60 mb-4">依頼が見つかりませんでした</p>
          <Link href="/bulk-quote" className="text-ai text-sm hover:underline">一括見積もりトップへ</Link>
        </div>
      </div>
    );
  }

  const repliedCount = quote.providers.filter((p) => p.status === "replied").length;
  const pendingCount = quote.providers.filter((p) => p.status === "pending").length;

  return (
    <div className="min-h-screen bg-shiro">
      {/* Header */}
      <div className="bg-sumi">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumbs
            variant="dark"
            items={[
              { label: "トップ", href: "/" },
              { label: "一括見積もり", href: "/bulk-quote" },
              { label: `依頼 #${quote.id}` },
            ]}
          />
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 pt-3">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-xl md:text-2xl text-white" style={{ fontFamily: "var(--font-serif)" }}>
              見積もり依頼の詳細
            </h1>
            <span className="text-xs border border-white/20 text-white/60 px-2 py-0.5">
              {QUOTE_STATUS_MAP[quote.status]}
            </span>
          </div>
          <p className="text-xs text-white/40">
            依頼ID: {quote.id} ／ {new Date(quote.createdAt).toLocaleDateString("ja-JP")} 依頼
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* デモバナー */}
        {quote.isSample && (
          <div className="bg-kiji/50 border border-kincya/20 p-4 mb-6 flex items-start gap-3">
            <SampleBadge label="掲載イメージ" />
            <p className="text-xs text-sumi/60">
              これはサンプルデータです。実際の依頼状況を反映したものではありません。
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* 依頼内容サマリー */}
            <section className="bg-white border border-border p-6 mb-6">
              <h2 className="text-base text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>依頼内容</h2>
              <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                <div>
                  <dt className="text-xs text-sumi/40 mb-0.5">サービス</dt>
                  <dd className="text-sumi">{quote.services.join("・")}</dd>
                </div>
                <div>
                  <dt className="text-xs text-sumi/40 mb-0.5">建物種別</dt>
                  <dd className="text-sumi">{quote.propertyType}</dd>
                </div>
                <div>
                  <dt className="text-xs text-sumi/40 mb-0.5">畳の枚数</dt>
                  <dd className="text-sumi">{quote.tatamiCount}</dd>
                </div>
                <div>
                  <dt className="text-xs text-sumi/40 mb-0.5">エリア</dt>
                  <dd className="text-sumi">{quote.prefecture} {quote.city}</dd>
                </div>
                <div>
                  <dt className="text-xs text-sumi/40 mb-0.5">希望時期</dt>
                  <dd className="text-sumi">{quote.schedule}</dd>
                </div>
              </dl>
              {quote.notes && (
                <div className="mt-4 pt-4 border-t border-kiji">
                  <dt className="text-xs text-sumi/40 mb-1">補足</dt>
                  <dd className="text-sm text-sumi/70">{quote.notes}</dd>
                </div>
              )}
            </section>

            {/* 業者別返信ステータス */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base text-sumi" style={{ fontFamily: "var(--font-serif)" }}>業者の返信状況</h2>
                <span className="text-xs text-sumi/50">{repliedCount}社返信済み / {quote.providers.length}社依頼中</span>
              </div>
              <div className="space-y-4">
                {quote.providers.map((qp) => {
                  const provider = MOCK_PROVIDERS.find((p) => p.id === qp.providerId);
                  const statusInfo = STATUS_MAP[qp.status] ?? STATUS_MAP.pending;
                  return (
                    <div key={qp.providerId} className="bg-white border border-border p-5">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div>
                          <p className="text-sm font-medium text-sumi">
                            {provider?.tradeName || provider?.companyName || qp.providerId}
                          </p>
                          {provider && (
                            <p className="text-xs text-sumi/40 mt-0.5">{provider.city}</p>
                          )}
                        </div>
                        <span className={`text-xs border px-2 py-1 shrink-0 ${statusInfo.color}`}>
                          {statusInfo.label}
                        </span>
                      </div>

                      {qp.status === "replied" && qp.estimateTotal && (
                        <div className="border-t border-kiji pt-3">
                          <div className="flex items-end gap-2 mb-2">
                            <p className="text-xl font-bold text-sumi">
                              ¥{qp.estimateTotal.toLocaleString()}
                            </p>
                            <p className="text-xs text-sumi/40 mb-1">（概算・{qp.estimateBreakdown?.unitLabel}）</p>
                          </div>
                          {qp.estimateBreakdown?.note && (
                            <p className="text-xs text-sumi/60 mb-2">{qp.estimateBreakdown.note}</p>
                          )}
                          {qp.earliestDate && (
                            <p className="text-xs text-igusa">
                              最短対応: {new Date(qp.earliestDate).toLocaleDateString("ja-JP")}〜
                            </p>
                          )}
                          {qp.paymentMethods && qp.paymentMethods.length > 0 && (
                            <p className="text-xs text-sumi/50 mt-1">
                              支払い: {qp.paymentMethods.join("・")}
                            </p>
                          )}
                          {qp.repliedAt && (
                            <p className="text-[11px] text-sumi/30 mt-2">
                              返信: {new Date(qp.repliedAt).toLocaleString("ja-JP")}
                            </p>
                          )}
                        </div>
                      )}

                      {qp.status === "pending" && (
                        <div className="border-t border-kiji pt-3">
                          <p className="text-xs text-sumi/50">返信を待っています。数時間〜1営業日でご連絡が届く予定です。</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          {/* サイドバー */}
          <div className="space-y-4">
            <div className="bg-white border border-border p-5">
              <h3 className="text-sm text-sumi mb-3" style={{ fontFamily: "var(--font-serif)" }}>返信サマリー</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-sumi/50">返信済み</span>
                  <span className="text-igusa font-medium">{repliedCount}社</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sumi/50">確認中</span>
                  <span className="text-kincya font-medium">{pendingCount}社</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sumi/50">依頼合計</span>
                  <span className="text-sumi font-medium">{quote.providers.length}社</span>
                </div>
              </div>
            </div>

            {repliedCount >= 2 && (
              <div className="bg-kiji/40 border border-kiji p-5">
                <h3 className="text-sm text-sumi mb-2" style={{ fontFamily: "var(--font-serif)" }}>比較して選ぶ</h3>
                <p className="text-xs text-sumi/60 mb-3">{repliedCount}社から返信が届いています。金額・対応内容を比較しましょう。</p>
                <Link
                  href={`/bulk-quote/${quoteId}/compare`}
                  className="block text-center text-sm bg-kincya text-white py-3 font-bold hover:bg-do transition-colors"
                >
                  比較する →
                </Link>
              </div>
            )}

            <div className="bg-white border border-border p-5">
              <h3 className="text-sm text-sumi mb-2" style={{ fontFamily: "var(--font-serif)" }}>他の業者を探す</h3>
              <p className="text-xs text-sumi/60 mb-3">もっと多くの業者から見積もりを取りたい場合はこちら。</p>
              <Link
                href="/bulk-quote/new"
                className="block text-center text-xs border border-ai text-ai py-2 hover:bg-ai hover:text-white transition-colors"
              >
                新しく見積もり依頼
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
