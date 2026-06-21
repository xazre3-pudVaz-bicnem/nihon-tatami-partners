"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import StickyBottomCTA from "@/components/common/StickyBottomCTA";

// ─── 定数 ────────────────────────────────────────────────────────────────────

const WORK_TYPES = [
  { value: "omotegae", label: "畳表替え" },
  { value: "uragaeshi", label: "畳裏返し" },
  { value: "shinchou", label: "畳新調" },
  { value: "fusuma", label: "ふすま張替えのみ" },
  { value: "shoji", label: "障子張替えのみ" },
  { value: "reform", label: "和室リフォーム" },
] as const;

type WorkType = (typeof WORK_TYPES)[number]["value"];

const GRADES = [
  { value: "economy", label: "普及品" },
  { value: "standard", label: "中級" },
  { value: "premium", label: "高級" },
] as const;

type Grade = (typeof GRADES)[number]["value"];

const AREAS = [
  { value: "saitama", label: "さいたま市" },
  { value: "kawaguchi", label: "川口市" },
  { value: "kawagoe", label: "川越市" },
  { value: "other", label: "その他エリア" },
] as const;

// ─── 単価テーブル（参考概算） ──────────────────────────────────────────────

const UNIT_PRICE: Record<string, Record<Grade, number>> = {
  omotegae: { economy: 3200, standard: 5500, premium: 9000 },
  uragaeshi: { economy: 1800, standard: 2500, premium: 3500 },
  shinchou:  { economy: 8000, standard: 14000, premium: 22000 },
  reform:    { economy: 10000, standard: 18000, premium: 30000 },
};

const FUSUMA_PRICE = 4500; // 枚
const SHOJI_PRICE  = 2800; // 枚
const DISPOSAL_PRICE  = 500;   // 古畳処分/枚
const FURNITURE_PRICE = 3000;  // 家具移動（目安）

interface CalcForm {
  workType: WorkType;
  tatamiCount: number;
  fusumaCount: number;
  shojiCount: number;
  grade: Grade;
  hasDisposal: boolean;
  hasFurniture: boolean;
  area: string;
  isCorporate: boolean;
}

const INITIAL: CalcForm = {
  workType: "omotegae",
  tatamiCount: 6,
  fusumaCount: 2,
  shojiCount: 2,
  grade: "standard",
  hasDisposal: false,
  hasFurniture: false,
  area: "saitama",
  isCorporate: false,
};

interface BreakdownRow {
  label: string;
  unitPrice: number;
  qty: number;
  total: number;
  note?: string;
}

interface CalcResult {
  rows: BreakdownRow[];
  subtotal: number;
  low: number;
  mid: number;
  high: number;
}

function calculate(form: CalcForm): CalcResult {
  const rows: BreakdownRow[] = [];

  // 畳工事
  if (["omotegae", "uragaeshi", "shinchou", "reform"].includes(form.workType) && form.tatamiCount > 0) {
    const priceMap = UNIT_PRICE[form.workType];
    const label = WORK_TYPES.find((w) => w.value === form.workType)?.label ?? "";
    const unitPrice = priceMap?.[form.grade] ?? 0;
    rows.push({
      label: `${label}（${GRADES.find((g) => g.value === form.grade)?.label}）`,
      unitPrice,
      qty: form.tatamiCount,
      total: unitPrice * form.tatamiCount,
    });
  }

  // ふすま（workType が fusuma or reform or 合わせて）
  if ((form.workType === "fusuma" || form.workType === "reform") && form.fusumaCount > 0) {
    rows.push({
      label: "ふすま張替え",
      unitPrice: FUSUMA_PRICE,
      qty: form.fusumaCount,
      total: FUSUMA_PRICE * form.fusumaCount,
    });
  } else if (form.fusumaCount > 0 && form.workType !== "shoji") {
    // オプション追加
    rows.push({
      label: "ふすま張替え（追加）",
      unitPrice: FUSUMA_PRICE,
      qty: form.fusumaCount,
      total: FUSUMA_PRICE * form.fusumaCount,
    });
  }

  // 障子
  if (form.workType === "shoji" && form.shojiCount > 0) {
    rows.push({
      label: "障子張替え",
      unitPrice: SHOJI_PRICE,
      qty: form.shojiCount,
      total: SHOJI_PRICE * form.shojiCount,
    });
  } else if (form.shojiCount > 0 && form.workType !== "fusuma") {
    rows.push({
      label: "障子張替え（追加）",
      unitPrice: SHOJI_PRICE,
      qty: form.shojiCount,
      total: SHOJI_PRICE * form.shojiCount,
    });
  }

  // 古畳処分
  if (form.hasDisposal && form.tatamiCount > 0) {
    rows.push({
      label: "古畳処分",
      unitPrice: DISPOSAL_PRICE,
      qty: form.tatamiCount,
      total: DISPOSAL_PRICE * form.tatamiCount,
      note: "業者により異なります",
    });
  }

  // 家具移動
  if (form.hasFurniture) {
    rows.push({
      label: "家具移動（目安）",
      unitPrice: FURNITURE_PRICE,
      qty: 1,
      total: FURNITURE_PRICE,
      note: "規模・点数により変動します",
    });
  }

  const subtotal = rows.reduce((s, r) => s + r.total, 0);
  const low  = Math.round(subtotal * 0.85);
  const mid  = subtotal;
  const high = Math.round(subtotal * 1.25);

  return { rows, subtotal, low, mid, high };
}

// ─── コンポーネント ────────────────────────────────────────────────────────

export default function CalculatorPage() {
  const [form, setForm] = useState<CalcForm>(INITIAL);
  const result = useMemo(() => calculate(form), [form]);

  const set = <K extends keyof CalcForm>(key: K, value: CalcForm[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <>
      {/* ヘッダー */}
      <div className="bg-sumi py-10 px-4">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            variant="dark"
            items={[
              { label: "ホーム", href: "/" },
              { label: "料金シミュレーター" },
            ]}
          />
          <h1
            className="text-2xl md:text-3xl text-white mt-4 mb-2"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            畳・内装工事 料金シミュレーター
          </h1>
          <p className="text-white/60 text-sm">
            条件を選ぶだけで参考概算を算出します。正式料金は業者見積もりでご確認ください。
          </p>
        </div>
      </div>

      {/* 警告バナー */}
      <div className="bg-do/10 border-b border-do/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <p className="text-sm text-do font-medium leading-relaxed">
            ※ これはあくまで参考概算です。実際の料金は業者の見積もりをご確認ください。
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* 左：入力フォーム */}
          <div className="lg:col-span-3 space-y-6">
            {/* 工事内容 */}
            <div className="border border-border bg-white p-5">
              <h2 className="text-base text-sumi mb-4 pb-2 border-b border-kiji" style={{ fontFamily: "var(--font-serif)" }}>
                工事内容
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {WORK_TYPES.map((wt) => (
                  <button
                    key={wt.value}
                    type="button"
                    onClick={() => set("workType", wt.value)}
                    className={`text-center text-sm py-2.5 px-2 border transition-colors ${
                      form.workType === wt.value
                        ? "border-ai bg-ai text-white"
                        : "border-border text-sumi/70 hover:border-ai hover:text-ai"
                    }`}
                  >
                    {wt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 数量 */}
            <div className="border border-border bg-white p-5">
              <h2 className="text-base text-sumi mb-4 pb-2 border-b border-kiji" style={{ fontFamily: "var(--font-serif)" }}>
                数量
              </h2>
              <div className="space-y-4">
                {/* 畳数 */}
                {!["fusuma", "shoji"].includes(form.workType) && (
                  <div>
                    <label className="block text-sm text-sumi mb-1.5">
                      畳の枚数（{form.tatamiCount}枚）
                    </label>
                    <div className="flex items-center gap-3">
                      <button type="button" onClick={() => set("tatamiCount", Math.max(1, form.tatamiCount - 1))}
                        className="w-9 h-9 border border-border text-sumi hover:border-ai hover:text-ai transition-colors">
                        −
                      </button>
                      <input
                        type="range"
                        min={1}
                        max={20}
                        value={form.tatamiCount}
                        onChange={(e) => set("tatamiCount", Number(e.target.value))}
                        className="flex-1 accent-ai"
                      />
                      <button type="button" onClick={() => set("tatamiCount", Math.min(20, form.tatamiCount + 1))}
                        className="w-9 h-9 border border-border text-sumi hover:border-ai hover:text-ai transition-colors">
                        ＋
                      </button>
                      <span className="text-sm text-sumi w-10 text-right">{form.tatamiCount}枚</span>
                    </div>
                    <div className="flex justify-between text-[10px] text-sumi/40 mt-1 px-1">
                      <span>1枚</span><span>10枚</span><span>20枚</span>
                    </div>
                  </div>
                )}

                {/* ふすま */}
                {!["shoji"].includes(form.workType) && (
                  <div>
                    <label className="block text-sm text-sumi mb-1.5">
                      ふすまの枚数（{form.fusumaCount}枚）
                    </label>
                    <div className="flex items-center gap-3">
                      <button type="button" onClick={() => set("fusumaCount", Math.max(0, form.fusumaCount - 1))}
                        className="w-9 h-9 border border-border text-sumi hover:border-ai hover:text-ai transition-colors">
                        −
                      </button>
                      <input
                        type="range"
                        min={0}
                        max={10}
                        value={form.fusumaCount}
                        onChange={(e) => set("fusumaCount", Number(e.target.value))}
                        className="flex-1 accent-ai"
                      />
                      <button type="button" onClick={() => set("fusumaCount", Math.min(10, form.fusumaCount + 1))}
                        className="w-9 h-9 border border-border text-sumi hover:border-ai hover:text-ai transition-colors">
                        ＋
                      </button>
                      <span className="text-sm text-sumi w-10 text-right">{form.fusumaCount}枚</span>
                    </div>
                  </div>
                )}

                {/* 障子 */}
                {!["fusuma"].includes(form.workType) && (
                  <div>
                    <label className="block text-sm text-sumi mb-1.5">
                      障子の枚数（{form.shojiCount}枚）
                    </label>
                    <div className="flex items-center gap-3">
                      <button type="button" onClick={() => set("shojiCount", Math.max(0, form.shojiCount - 1))}
                        className="w-9 h-9 border border-border text-sumi hover:border-ai hover:text-ai transition-colors">
                        −
                      </button>
                      <input
                        type="range"
                        min={0}
                        max={10}
                        value={form.shojiCount}
                        onChange={(e) => set("shojiCount", Number(e.target.value))}
                        className="flex-1 accent-ai"
                      />
                      <button type="button" onClick={() => set("shojiCount", Math.min(10, form.shojiCount + 1))}
                        className="w-9 h-9 border border-border text-sumi hover:border-ai hover:text-ai transition-colors">
                        ＋
                      </button>
                      <span className="text-sm text-sumi w-10 text-right">{form.shojiCount}枚</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* グレード */}
            {!["fusuma", "shoji"].includes(form.workType) && (
              <div className="border border-border bg-white p-5">
                <h2 className="text-base text-sumi mb-4 pb-2 border-b border-kiji" style={{ fontFamily: "var(--font-serif)" }}>
                  素材グレード
                </h2>
                <div className="grid grid-cols-3 gap-2">
                  {GRADES.map((g) => (
                    <button
                      key={g.value}
                      type="button"
                      onClick={() => set("grade", g.value)}
                      className={`text-center text-sm py-3 border transition-colors ${
                        form.grade === g.value
                          ? "border-kincya bg-kincya text-white"
                          : "border-border text-sumi/70 hover:border-kincya hover:text-kincya"
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2 text-[10px] text-sumi/50 text-center">
                  <span>い草・廉価品</span>
                  <span>国産・中級品</span>
                  <span>高級い草・特選</span>
                </div>
              </div>
            )}

            {/* オプション */}
            <div className="border border-border bg-white p-5">
              <h2 className="text-base text-sumi mb-4 pb-2 border-b border-kiji" style={{ fontFamily: "var(--font-serif)" }}>
                オプション・条件
              </h2>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.hasDisposal}
                    onChange={(e) => set("hasDisposal", e.target.checked)}
                    className="w-4 h-4 accent-ai"
                  />
                  <span className="text-sm text-sumi">古畳の処分あり（{DISPOSAL_PRICE.toLocaleString()}円/枚 目安）</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.hasFurniture}
                    onChange={(e) => set("hasFurniture", e.target.checked)}
                    className="w-4 h-4 accent-ai"
                  />
                  <span className="text-sm text-sumi">家具移動あり（{FURNITURE_PRICE.toLocaleString()}円〜 目安）</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.isCorporate}
                    onChange={(e) => set("isCorporate", e.target.checked)}
                    className="w-4 h-4 accent-ai"
                  />
                  <span className="text-sm text-sumi">法人・管理会社として依頼</span>
                </label>
              </div>

              {/* エリア */}
              <div className="mt-4">
                <label className="block text-sm text-sumi mb-1.5">出張エリア</label>
                <select
                  value={form.area}
                  onChange={(e) => set("area", e.target.value)}
                  className="w-full border border-border px-3 py-2.5 text-sm text-sumi bg-white focus:outline-none focus:border-ai"
                >
                  {AREAS.map((a) => (
                    <option key={a.value} value={a.value}>{a.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* 右：結果表示 */}
          <div className="lg:col-span-2 space-y-4">
            {/* スティッキー */}
            <div className="lg:sticky lg:top-4 space-y-4">
              {/* 概算金額 */}
              <div className="border-2 border-kincya bg-white p-5">
                <p className="text-xs text-sumi/50 mb-2">参考概算（税込目安）</p>
                <p className="text-3xl font-bold text-sumi mb-1" style={{ fontFamily: "var(--font-serif)" }}>
                  ¥{result.mid.toLocaleString()}
                </p>
                <p className="text-[10px] text-sumi/40 mb-4">これはあくまで概算です。申告情報として掲載。</p>

                {/* 3レンジ */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="text-center bg-kiji/40 p-2.5">
                    <p className="text-[10px] text-sumi/50 mb-1">安い場合</p>
                    <p className="text-base font-medium text-sumi">¥{result.low.toLocaleString()}</p>
                  </div>
                  <div className="text-center bg-kincya/10 border border-kincya/30 p-2.5">
                    <p className="text-[10px] text-kincya mb-1">標準</p>
                    <p className="text-base font-medium text-sumi">¥{result.mid.toLocaleString()}</p>
                  </div>
                  <div className="text-center bg-kiji/40 p-2.5">
                    <p className="text-[10px] text-sumi/50 mb-1">高い場合</p>
                    <p className="text-base font-medium text-sumi">¥{result.high.toLocaleString()}</p>
                  </div>
                </div>

                {/* 内訳 */}
                {result.rows.length > 0 ? (
                  <div className="border-t border-kiji pt-4">
                    <p className="text-xs text-sumi/50 mb-2">概算内訳</p>
                    <table className="w-full text-xs">
                      <tbody>
                        {result.rows.map((row, i) => (
                          <tr key={i} className="border-b border-kiji/60">
                            <td className="py-2 text-sumi/70">{row.label}</td>
                            <td className="py-2 text-right text-sumi/50">{row.qty}点</td>
                            <td className="py-2 text-right text-sumi font-medium">
                              ¥{row.total.toLocaleString()}
                            </td>
                          </tr>
                        ))}
                        <tr>
                          <td colSpan={2} className="py-2 text-sm font-bold text-sumi">合計（概算）</td>
                          <td className="py-2 text-right text-sm font-bold text-sumi">
                            ¥{result.subtotal.toLocaleString()}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-xs text-sumi/40 text-center py-4">
                    条件を選択すると概算が表示されます
                  </p>
                )}
              </div>

              {/* 追加費用の説明 */}
              <div className="bg-kiji/40 border border-kiji p-4">
                <p className="text-xs font-medium text-sumi mb-2">追加費用が出やすいケース</p>
                <ul className="space-y-1.5 text-xs text-sumi/70">
                  {[
                    "駐車場が確保できない場合（コインパーキング代等）",
                    "市外・遠方への出張費",
                    "畳床が傷んでいて補修が必要な場合",
                    "搬出入経路が狭い・階段が多い場合",
                    "急ぎの対応・即日施工の場合",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-kincya shrink-0 mt-0.5">・</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="space-y-2">
                <Link
                  href="/bulk-quote"
                  className="block w-full text-center bg-kincya text-white py-3.5 text-sm font-bold hover:bg-do transition-colors"
                >
                  この条件で一括見積もりを依頼
                </Link>
                <Link
                  href="/search"
                  className="block w-full text-center border border-ai text-ai py-3 text-sm hover:bg-ai hover:text-white transition-colors"
                >
                  業者を探す
                </Link>
              </div>

              <p className="text-[10px] text-sumi/40 leading-relaxed">
                ※ 掲載料金はすべて参考概算です。申告情報として掲載。正式な料金は現地見積もりでご確認ください。消費税・出張費は含まれていない場合があります。
              </p>
            </div>
          </div>
        </div>
      </div>

      <StickyBottomCTA
        primaryLabel="一括見積もりを依頼"
        primaryHref="/bulk-quote"
        secondaryLabel="業者を探す"
        secondaryHref="/search"
      />
    </>
  );
}
