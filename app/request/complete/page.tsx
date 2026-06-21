import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "診断結果 | かんたん依頼診断",
  description: "依頼診断の結果です。おすすめの施工種別と料金目安をご確認ください。",
  path: "/request/complete",
  noindex: true,
});

interface Props {
  searchParams: Promise<{ result?: string }>;
}

interface ParsedResult {
  service: string;
  size: string;
  schedule: string;
}

function parseResult(raw?: string): ParsedResult {
  if (!raw) return { service: "tatami-omotegae", size: "6畳", schedule: "未定" };
  try {
    const parsed = JSON.parse(decodeURIComponent(raw));
    return {
      service: parsed.service ?? "tatami-omotegae",
      size: parsed.size ?? "6畳",
      schedule: parsed.schedule ?? "未定",
    };
  } catch {
    return { service: "tatami-omotegae", size: "6畳", schedule: "未定" };
  }
}

// サービス → 表示ラベル・料金・説明のマッピング（mock）
const SERVICE_INFO: Record<string, { label: string; priceMin: number; priceMax: number; unit: string; description: string }> = {
  "tatami-omotegae": {
    label: "畳表替え",
    priceMin: 3200,
    priceMax: 6500,
    unit: "枚",
    description:
      "畳の表面（ゴザ）だけを新しいものに替える最も一般的なメンテナンスです。色あせ・日焼け・毛羽立ちに適しています。",
  },
  "tatami-uragaeshi": {
    label: "畳裏返し",
    priceMin: 2200,
    priceMax: 3800,
    unit: "枚",
    description:
      "まだ使える畳表をひっくり返して再利用する工事です。コストを抑えたい方に向いています。",
  },
  "tatami-shinchou": {
    label: "畳新調",
    priceMin: 12000,
    priceMax: 25000,
    unit: "枚",
    description:
      "畳床ごと新しく作り替える工事です。踏み込みが沈む・傷みが激しい場合に必要です。",
  },
};

const NEXT_ACTIONS = [
  {
    id: "bulk",
    icon: "📝",
    title: "一括見積もりに進む",
    description: "複数の業者に同時見積もり依頼。料金・日程を比較して選べます。",
    href: "/quote/new",
    primary: true,
  },
  {
    id: "list",
    icon: "🔍",
    title: "業者を自分で比較する",
    description: "エリア・評価・料金でフィルタリングして自分で業者を探せます。",
    href: "/tatami-omotegae",
    primary: false,
  },
  {
    id: "concierge",
    icon: "💬",
    title: "コンシェルジュに相談",
    description: "状況が複雑・迷っている場合はお気軽にご相談ください。",
    href: "/contact",
    primary: false,
  },
];

export default async function RequestCompletePage({ searchParams }: Props) {
  const { result } = await searchParams;
  const parsed = parseResult(result);
  const info = SERVICE_INFO[parsed.service] ?? SERVICE_INFO["tatami-omotegae"];

  // 6畳相当の料金目安を計算（mockロジック）
  const sizeLabel = parsed.size || "6畳";
  const sizeNum = sizeLabel === "4.5畳以下" ? 4.5
    : sizeLabel === "6畳" ? 6
    : sizeLabel === "8畳" ? 8
    : sizeLabel === "10畳以上" ? 10
    : sizeLabel === "複数部屋" ? 12
    : 6;
  const estimateMin = Math.round(info.priceMin * sizeNum / 100) * 100;
  const estimateMax = Math.round(info.priceMax * sizeNum / 100) * 100;

  return (
    <div className="bg-cloud min-h-screen">
      {/* ヘッダー */}
      <div className="bg-sumi text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumbs
            items={[
              { label: "トップ", href: "/" },
              { label: "かんたん依頼診断", href: "/request/start" },
              { label: "診断結果" },
            ]}
            variant="dark"
          />
          <h1
            className="text-2xl sm:text-3xl font-bold mt-4 mb-2"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            診断結果
          </h1>
          <p className="text-white/70 text-sm">
            ご回答いただいた内容をもとに、おすすめの施工種別と料金目安をご案内します。
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-5">
            {/* おすすめ結果カード */}
            <div className="bg-shiro border border-border rounded-xl overflow-hidden">
              <div className="bg-kincya/10 border-b border-kincya/20 px-6 py-4">
                <p className="text-xs font-medium text-kincya mb-1">おすすめの依頼種別</p>
                <h2
                  className="text-2xl font-bold text-sumi"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {info.label}
                </h2>
              </div>
              <div className="px-6 py-5">
                <p className="text-sm text-sumi/70 leading-relaxed mb-5">{info.description}</p>

                <div className="bg-kiji rounded-lg p-4 mb-4">
                  <p className="text-xs font-medium text-sumi/60 mb-1">想定料金目安</p>
                  <p className="text-2xl font-bold text-kincya">
                    {estimateMin.toLocaleString()}円 〜 {estimateMax.toLocaleString()}円
                  </p>
                  <p className="text-xs text-sumi/50 mt-1">
                    ※ {sizeLabel}・{info.label}の目安。素材グレードにより変動します。
                  </p>
                </div>

                <div className="flex items-start gap-2 bg-cloud rounded-lg p-3">
                  <svg className="w-4 h-4 text-sumi/40 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-xs text-sumi/55 leading-relaxed">
                    上記はお答えいただいた情報に基づく目安です。正確な料金は現地確認後の見積もりをご確認ください。素材の選択・古畳処分・出張費などにより最終金額は異なります。
                  </p>
                </div>
              </div>
            </div>

            {/* 次のアクション */}
            <div className="bg-shiro border border-border rounded-xl p-6">
              <h2 className="text-base font-bold text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>
                次のステップを選んでください
              </h2>
              <div className="space-y-3">
                {NEXT_ACTIONS.map((action) => (
                  <Link
                    key={action.id}
                    href={action.href}
                    className={`flex items-start gap-4 p-4 rounded-lg border transition-all duration-150 group ${
                      action.primary
                        ? "border-kincya bg-kincya/5 hover:bg-kincya/10"
                        : "border-border bg-shiro hover:bg-kiji"
                    }`}
                  >
                    <span className="text-2xl flex-shrink-0">{action.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium mb-0.5 ${action.primary ? "text-kincya" : "text-sumi"}`}>
                        {action.title}
                      </p>
                      <p className="text-xs text-sumi/60 leading-relaxed">{action.description}</p>
                    </div>
                    <svg
                      className="w-4 h-4 text-sumi/30 flex-shrink-0 mt-1 group-hover:translate-x-0.5 transition-transform duration-150"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* サイドバー */}
          <div className="space-y-4">
            {/* 診断内容サマリ */}
            <div className="bg-shiro border border-border rounded-xl p-5">
              <h3 className="text-sm font-bold text-sumi mb-3" style={{ fontFamily: "var(--font-serif)" }}>
                あなたの回答
              </h3>
              <dl className="space-y-2">
                <div>
                  <dt className="text-xs text-sumi/50">希望時期</dt>
                  <dd className="text-sm text-sumi">{parsed.schedule || "未定"}</dd>
                </div>
                <div>
                  <dt className="text-xs text-sumi/50">枚数・広さ</dt>
                  <dd className="text-sm text-sumi">{parsed.size || "不明"}</dd>
                </div>
              </dl>
            </div>

            {/* 別の診断 */}
            <div className="bg-kiji border border-kiji rounded-xl p-5">
              <h3 className="text-sm font-bold text-sumi mb-2" style={{ fontFamily: "var(--font-serif)" }}>
                素材を選びたい方へ
              </h3>
              <p className="text-xs text-sumi/65 mb-3 leading-relaxed">
                い草・和紙・樹脂・琉球など、素材の特徴から最適な畳を診断します。
              </p>
              <Link
                href="/diagnosis/material"
                className="block text-center text-xs font-medium text-ai border border-ai rounded-lg py-2 hover:bg-ai hover:text-white transition-colors duration-150"
              >
                素材診断を試す
              </Link>
            </div>

            {/* マッチング */}
            <div className="bg-kiji border border-kiji rounded-xl p-5">
              <h3 className="text-sm font-bold text-sumi mb-2" style={{ fontFamily: "var(--font-serif)" }}>
                条件で業者を探したい方へ
              </h3>
              <p className="text-xs text-sumi/65 mb-3 leading-relaxed">
                エリア・建物種別・対応サービスで絞り込んで業者を提案します。
              </p>
              <Link
                href="/matching"
                className="block text-center text-xs font-medium text-ai border border-ai rounded-lg py-2 hover:bg-ai hover:text-white transition-colors duration-150"
              >
                おまかせマッチング
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
