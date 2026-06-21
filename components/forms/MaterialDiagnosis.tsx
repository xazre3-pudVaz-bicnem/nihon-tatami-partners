"use client";

import { useState } from "react";
import Link from "next/link";
import type { MaterialDiagnosisResult } from "@/lib/types-platform";

// ─── 診断項目 ─────────────────────────────────────────────────
const DIAGNOSIS_ITEMS = [
  { key: "budget", label: "予算を抑えたい" },
  { key: "design", label: "見た目・デザイン重視" },
  { key: "durability", label: "耐久性を重視したい" },
  { key: "pet", label: "ペットがいる" },
  { key: "child", label: "小さい子どもがいる" },
  { key: "mold", label: "カビや湿気が気になる" },
  { key: "modern", label: "和モダンにしたい" },
  { key: "commercial", label: "旅館・店舗・寺社での使用" },
  { key: "domestic", label: "国産い草にこだわりたい" },
  { key: "clean", label: "掃除しやすさを重視" },
];

// ─── 素材データ ────────────────────────────────────────────────
const MATERIALS: MaterialDiagnosisResult[] = [
  {
    material: "igusa",
    materialLabel: "い草畳（一般）",
    score: 0,
    reasons: [],
    priceRange: { min: 3200, max: 5500, unit: "枚" },
    features: { durability: 3, cleanability: 2, appearance: 3, moldResistance: 2, petFriendly: 2, cost: 5 },
  },
  {
    material: "igusa_domestic",
    materialLabel: "国産い草畳",
    score: 0,
    reasons: [],
    priceRange: { min: 5000, max: 9000, unit: "枚" },
    features: { durability: 4, cleanability: 2, appearance: 5, moldResistance: 2, petFriendly: 2, cost: 3 },
  },
  {
    material: "washi",
    materialLabel: "和紙畳",
    score: 0,
    reasons: [],
    priceRange: { min: 7000, max: 12000, unit: "枚" },
    features: { durability: 4, cleanability: 4, appearance: 4, moldResistance: 5, petFriendly: 4, cost: 2 },
  },
  {
    material: "jushi",
    materialLabel: "樹脂畳",
    score: 0,
    reasons: [],
    priceRange: { min: 6000, max: 10000, unit: "枚" },
    features: { durability: 5, cleanability: 5, appearance: 3, moldResistance: 5, petFriendly: 5, cost: 2 },
  },
  {
    material: "ryukyu",
    materialLabel: "琉球畳（縁なし）",
    score: 0,
    reasons: [],
    priceRange: { min: 8000, max: 18000, unit: "枚" },
    features: { durability: 3, cleanability: 3, appearance: 5, moldResistance: 3, petFriendly: 3, cost: 1 },
  },
  {
    material: "herinashi",
    materialLabel: "縁なし畳",
    score: 0,
    reasons: [],
    priceRange: { min: 7000, max: 14000, unit: "枚" },
    features: { durability: 3, cleanability: 3, appearance: 5, moldResistance: 3, petFriendly: 3, cost: 2 },
  },
  {
    material: "color",
    materialLabel: "カラー畳",
    score: 0,
    reasons: [],
    priceRange: { min: 8000, max: 14000, unit: "枚" },
    features: { durability: 3, cleanability: 3, appearance: 5, moldResistance: 4, petFriendly: 3, cost: 2 },
  },
  {
    material: "pet",
    materialLabel: "ペット対応畳",
    score: 0,
    reasons: [],
    priceRange: { min: 8000, max: 13000, unit: "枚" },
    features: { durability: 5, cleanability: 5, appearance: 3, moldResistance: 5, petFriendly: 5, cost: 2 },
  },
];

// ─── スコアリングロジック ─────────────────────────────────────
function calcMaterialScores(selected: string[]): MaterialDiagnosisResult[] {
  return MATERIALS.map((mat) => {
    let score = 0;
    const reasons: string[] = [];

    if (selected.includes("budget")) {
      if (mat.material === "igusa") { score += 20; reasons.push("コスパが良い"); }
      else if (mat.priceRange.min > 7000) { score -= 5; }
    }
    if (selected.includes("design")) {
      if (["ryukyu", "herinashi", "color"].includes(mat.material)) { score += 20; reasons.push("デザイン性が高い"); }
      if (mat.material === "igusa_domestic") { score += 10; reasons.push("上質な見た目"); }
    }
    if (selected.includes("durability")) {
      score += mat.features.durability * 3;
      if (mat.features.durability >= 4) reasons.push("耐久性が高い");
    }
    if (selected.includes("pet")) {
      score += mat.features.petFriendly * 4;
      if (mat.features.petFriendly >= 4) reasons.push("ペットの引っかき傷に強い");
    }
    if (selected.includes("child")) {
      if (["washi", "jushi", "pet"].includes(mat.material)) { score += 15; reasons.push("子ども向けに安心の素材"); }
    }
    if (selected.includes("mold")) {
      score += mat.features.moldResistance * 3;
      if (mat.features.moldResistance >= 4) reasons.push("カビ・ダニに強い");
    }
    if (selected.includes("modern")) {
      if (["ryukyu", "herinashi", "color", "washi"].includes(mat.material)) { score += 15; reasons.push("和モダンに合う"); }
    }
    if (selected.includes("commercial")) {
      if (mat.features.durability >= 4) { score += 15; reasons.push("業務用途の耐久性"); }
      if (mat.material === "igusa_domestic") { score += 10; reasons.push("格式ある空間に適した素材"); }
    }
    if (selected.includes("domestic")) {
      if (mat.material === "igusa_domestic") { score += 25; reasons.push("国産い草・産地こだわり"); }
    }
    if (selected.includes("clean")) {
      score += mat.features.cleanability * 3;
      if (mat.features.cleanability >= 4) reasons.push("掃除がしやすい");
    }

    // ベーススコア（いずれの条件にも合う汎用性）
    score += 10;

    return {
      ...mat,
      score: Math.min(100, Math.max(0, score)),
      reasons: [...new Set(reasons)].slice(0, 3),
    };
  });
}

// ─── UIパーツ ─────────────────────────────────────────────────
function StarRow({ label, value }: { label: string; value: 1 | 2 | 3 | 4 | 5 }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-sumi/60">{label}</span>
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <span key={i} className={`text-xs ${i <= value ? "text-kincya" : "text-sumi/20"}`}>
            ★
          </span>
        ))}
      </div>
    </div>
  );
}

function MaterialCard({
  result,
  rank,
}: {
  result: MaterialDiagnosisResult;
  rank: number;
}) {
  return (
    <div className={`bg-shiro border rounded-xl p-5 ${rank === 1 ? "border-kincya ring-1 ring-kincya/20" : "border-border"}`}>
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          {rank === 1 && (
            <span className="inline-block text-xs font-bold text-kincya bg-kincya/10 border border-kincya/20 rounded px-2 py-0.5 mb-1">
              あなたにイチオシ
            </span>
          )}
          <h3 className="text-base font-bold text-sumi" style={{ fontFamily: "var(--font-serif)" }}>
            {result.materialLabel}
          </h3>
          <p className="text-xs text-sumi/55 mt-0.5">
            {result.priceRange.min.toLocaleString()}円〜{result.priceRange.max.toLocaleString()}円/{result.priceRange.unit}
          </p>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-2xl font-bold text-kincya">{result.score}</p>
          <p className="text-xs text-sumi/50">pt</p>
        </div>
      </div>

      {result.reasons.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {result.reasons.map((r) => (
            <span key={r} className="text-xs bg-igusa/10 text-igusa border border-igusa/20 rounded px-2 py-0.5">
              ✓ {r}
            </span>
          ))}
        </div>
      )}

      <div className="space-y-1.5 mb-4">
        <StarRow label="耐久性" value={result.features.durability} />
        <StarRow label="掃除しやすさ" value={result.features.cleanability} />
        <StarRow label="カビ耐性" value={result.features.moldResistance} />
        <StarRow label="ペット対応" value={result.features.petFriendly} />
        <StarRow label="デザイン" value={result.features.appearance} />
        <StarRow label="コスパ" value={result.features.cost} />
      </div>

      <div className="flex gap-2">
        <Link
          href={`/${result.material === "igusa" ? "tatami-omotegae" : result.material === "igusa_domestic" ? "kokusandatami" : result.material === "jushi" ? "resin-tatami" : result.material}`}
          className="flex-1 text-center text-xs font-medium text-sumi border border-border rounded-lg py-2 hover:bg-kiji transition-colors duration-150"
        >
          この素材で業者を探す
        </Link>
        <Link
          href="/quote/new"
          className="flex-1 text-center text-xs font-medium text-white bg-kincya rounded-lg py-2 hover:bg-kincya/90 transition-colors duration-150"
        >
          見積もりに進む
        </Link>
      </div>
    </div>
  );
}

// ─── メインコンポーネント ──────────────────────────────────────
export default function MaterialDiagnosis() {
  const [selected, setSelected] = useState<string[]>([]);
  const [results, setResults] = useState<MaterialDiagnosisResult[] | null>(null);

  const toggle = (key: string) => {
    setSelected((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleDiagnose = () => {
    const scored = calcMaterialScores(selected);
    scored.sort((a, b) => b.score - a.score);
    setResults(scored);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReset = () => {
    setSelected([]);
    setResults(null);
  };

  if (results) {
    return (
      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-bold text-sumi" style={{ fontFamily: "var(--font-serif)" }}>
            診断結果
          </h2>
          <button
            onClick={handleReset}
            className="text-xs text-ai border border-ai rounded-lg px-3 py-1.5 hover:bg-ai hover:text-white transition-colors duration-150"
          >
            やり直す
          </button>
        </div>

        <div className="bg-kiji border border-kiji rounded-lg p-3 mb-5 text-xs text-sumi/55 leading-relaxed">
          上記はご選択の条件に基づく参考情報です。実際の素材は業者にサンプルを見せてもらい、現地の状況に合わせてご確認ください。
        </div>

        <div className="space-y-4">
          {results.slice(0, 4).map((r, idx) => (
            <MaterialCard key={r.material} result={r} rank={idx + 1} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-base font-bold text-sumi mb-1" style={{ fontFamily: "var(--font-serif)" }}>
        当てはまる項目を選んでください
      </h2>
      <p className="text-xs text-sumi/55 mb-5">複数選択できます（0個でも診断できます）</p>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 mb-6">
        {DIAGNOSIS_ITEMS.map((item) => {
          const active = selected.includes(item.key);
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => toggle(item.key)}
              className={`text-left px-4 py-3 rounded-lg border text-sm transition-all duration-150 ${
                active
                  ? "border-kincya bg-kincya/10 text-sumi font-medium"
                  : "border-border bg-shiro text-sumi/80 hover:border-kincya/50 hover:bg-kincya/5"
              }`}
            >
              <span
                className={`inline-block w-4 h-4 rounded border mr-2 align-text-bottom ${
                  active ? "bg-kincya border-kincya" : "border-sumi/30"
                }`}
              >
                {active && (
                  <svg viewBox="0 0 12 12" fill="none" className="w-4 h-4 -mt-px -ml-px">
                    <path
                      d="M2 6l3 3 5-5"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </span>
              {item.label}
            </button>
          );
        })}
      </div>

      <button
        onClick={handleDiagnose}
        className="w-full py-3.5 bg-kincya text-white font-medium rounded-lg hover:bg-kincya/90 transition-colors duration-150 text-sm"
      >
        診断する
      </button>
    </div>
  );
}
