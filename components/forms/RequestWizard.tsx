"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { RequestAnswer } from "@/lib/types-platform";

// ─── 型定義 ──────────────────────────────────────────────────
export interface ContactInfo {
  name: string;
  email: string;
  phone: string;
  city: string;
  isCorporate: boolean;
  companyName: string;
}

interface Props {
  onComplete?: (answers: RequestAnswer[], contact: ContactInfo) => void;
}

// ─── ステップ定義 ────────────────────────────────────────────
const STEP_LABELS = [
  "",                 // 0: タイトル画面
  "依頼内容",          // 1
  "建物の種類",         // 2
  "畳の状態",          // 3
  "枚数・広さ",         // 4
  "希望時期",          // 5
  "写真の準備",         // 6
];

const STEP1_OPTIONS = [
  "畳が色あせている",
  "畳が毛羽立っている",
  "畳が沈む・踏むと痛い",
  "カビ・ダニ・ニオイが気になる",
  "ペット汚れがある",
  "ふすま・障子も直したい",
  "退去前に直したい（原状回復）",
  "旅館・寺社・店舗の和室を直したい",
  "何を頼めばいいか分からない",
];

const STEP2_OPTIONS = [
  "戸建て",
  "マンション",
  "アパート",
  "賃貸物件",
  "店舗",
  "旅館",
  "寺",
  "神社",
  "茶室",
  "民泊",
  "介護施設",
  "管理物件",
];

const STEP3_OPTIONS = [
  "日焼け",
  "破れ",
  "沈み",
  "湿気・カビ",
  "ダニ",
  "ニオイ",
  "焦げ跡",
  "ペット汚れ",
  "水濡れ",
  "畳下の劣化が心配",
  "よく分からない",
];

const STEP4_OPTIONS = [
  "4.5畳以下",
  "6畳",
  "8畳",
  "10畳以上",
  "複数部屋",
  "分からない",
];

const STEP5_OPTIONS = [
  "できるだけ早く（1週間以内）",
  "1ヶ月以内",
  "3ヶ月以内",
  "退去日まで",
  "法要・繁忙期・入居日まで",
  "未定",
];

const STEP6_OPTIONS = [
  "畳全体の写真",
  "傷んでいる箇所のアップ",
  "部屋全体（広さが分かる写真）",
  "ふすま・障子の写真",
  "写真なしでも進める",
];

const TOTAL_STEPS = 6; // タイトル画面を除くステップ数

// ─── ユーティリティ ──────────────────────────────────────────
function ProgressBar({ current }: { current: number }) {
  if (current === 0) return null;
  const pct = Math.round((current / TOTAL_STEPS) * 100);
  return (
    <div className="w-full mb-6">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs text-sumi/60">
          STEP {current} / {TOTAL_STEPS}
        </span>
        <span className="text-xs text-kincya font-medium">{STEP_LABELS[current]}</span>
      </div>
      <div className="w-full h-1.5 bg-kiji rounded-full overflow-hidden">
        <div
          className="h-full bg-kincya rounded-full transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

type MultiSelectProps = {
  options: string[];
  selected: string[];
  onChange: (values: string[]) => void;
};

function MultiSelect({ options, selected, onChange }: MultiSelectProps) {
  const toggle = (val: string) => {
    if (selected.includes(val)) {
      onChange(selected.filter((v) => v !== val));
    } else {
      onChange([...selected, val]);
    }
  };
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      {options.map((opt) => {
        const active = selected.includes(opt);
        return (
          <button
            key={opt}
            type="button"
            onClick={() => toggle(opt)}
            className={`text-left px-4 py-3 rounded-lg border text-sm transition-all duration-150 ${
              active
                ? "border-kincya bg-kincya/10 text-sumi font-medium"
                : "border-border bg-shiro text-sumi/80 hover:border-kincya/50 hover:bg-kincya/5"
            }`}
          >
            <span className={`inline-block w-4 h-4 rounded border mr-2 align-text-bottom ${active ? "bg-kincya border-kincya" : "border-sumi/30"}`}>
              {active && (
                <svg viewBox="0 0 12 12" fill="none" className="w-4 h-4 -mt-px -ml-px">
                  <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </span>
            {opt}
          </button>
        );
      })}
    </div>
  );
}

type SingleSelectProps = {
  options: string[];
  selected: string;
  onChange: (value: string) => void;
};

function SingleSelect({ options, selected, onChange }: SingleSelectProps) {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      {options.map((opt) => {
        const active = selected === opt;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`text-left px-4 py-3 rounded-lg border text-sm transition-all duration-150 ${
              active
                ? "border-kincya bg-kincya/10 text-sumi font-medium"
                : "border-border bg-shiro text-sumi/80 hover:border-kincya/50 hover:bg-kincya/5"
            }`}
          >
            <span className={`inline-block w-4 h-4 rounded-full border mr-2 align-text-bottom ${active ? "bg-kincya border-kincya" : "border-sumi/30"}`} />
            {opt}
          </button>
        );
      })}
    </div>
  );
}

// ─── メインコンポーネント ──────────────────────────────────────
export default function RequestWizard({ onComplete }: Props) {
  const router = useRouter();
  const [step, setStep] = useState(0);

  // 各ステップの回答
  const [step1, setStep1] = useState<string[]>([]);
  const [step2, setStep2] = useState("");
  const [step3, setStep3] = useState<string[]>([]);
  const [step4, setStep4] = useState("");
  const [step5, setStep5] = useState("");
  const [step6, setStep6] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 「次へ」が有効かチェック
  const canNext = (): boolean => {
    if (step === 1) return step1.length > 0;
    if (step === 2) return step2 !== "";
    if (step === 3) return step3.length > 0;
    if (step === 4) return step4 !== "";
    if (step === 5) return step5 !== "";
    if (step === 6) return step6.length > 0;
    return true;
  };

  const next = () => {
    if (step < TOTAL_STEPS) setStep((s) => s + 1);
  };
  const back = () => {
    if (step > 1) setStep((s) => s - 1);
  };

  const handleSubmit = () => {
    if (!canNext()) return;
    setIsSubmitting(true);

    const answers: RequestAnswer[] = [
      { stepKey: "request_type", stepLabel: "依頼内容", values: step1 },
      { stepKey: "building_type", stepLabel: "建物の種類", values: [step2] },
      { stepKey: "tatami_condition", stepLabel: "畳の状態", values: step3 },
      { stepKey: "tatami_size", stepLabel: "枚数・広さ", values: [step4] },
      { stepKey: "schedule", stepLabel: "希望時期", values: [step5] },
      { stepKey: "photos", stepLabel: "写真の準備", values: step6 },
    ];

    const hasPhotos = step6.some((v) => v !== "写真なしでも進める");

    if (onComplete) {
      onComplete(answers, { name: "", email: "", phone: "", city: "", isCorporate: false, companyName: "" });
    } else {
      // デフォルト: URLパラメータで結果ページへ遷移
      const result = encodeURIComponent(
        JSON.stringify({ service: "tatami-omotegae", size: step4, schedule: step5, type: step1[0] ?? "", hasPhotos })
      );
      router.push(`/request/complete?result=${result}`);
    }
  };

  // ─── 各ステップのレンダリング ───────────────────────────────
  if (step === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
        <div className="w-16 h-16 rounded-full bg-kincya/10 flex items-center justify-center mb-6">
          <svg className="w-8 h-8 text-kincya" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-sumi mb-3" style={{ fontFamily: "var(--font-serif)" }}>
          かんたん依頼診断を始める
        </h2>
        <p className="text-sm text-sumi/65 mb-8 max-w-sm leading-relaxed">
          6つの質問に答えるだけで、あなたの状況に合ったおすすめの依頼種別と料金目安をご案内します。所要時間：約2〜3分
        </p>
        <ul className="text-left space-y-2 mb-8 max-w-xs w-full">
          {["匿名で試せます", "見積もりの義務なし", "結果はすぐ表示"].map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm text-sumi/70">
              <span className="text-igusa">✓</span>
              {item}
            </li>
          ))}
        </ul>
        <button
          onClick={() => setStep(1)}
          className="w-full max-w-xs px-8 py-3.5 bg-kincya text-white font-medium rounded-lg hover:bg-kincya/90 transition-colors duration-150 text-sm"
        >
          診断スタート
        </button>
      </div>
    );
  }

  return (
    <div className="px-2 py-4">
      <ProgressBar current={step} />

      {step === 1 && (
        <div>
          <h2 className="text-base font-bold text-sumi mb-1">依頼したい内容を教えてください</h2>
          <p className="text-xs text-sumi/55 mb-4">複数選択できます</p>
          <MultiSelect options={STEP1_OPTIONS} selected={step1} onChange={setStep1} />
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-base font-bold text-sumi mb-1">建物の種類を教えてください</h2>
          <p className="text-xs text-sumi/55 mb-4">1つ選択してください</p>
          <SingleSelect options={STEP2_OPTIONS} selected={step2} onChange={setStep2} />
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className="text-base font-bold text-sumi mb-1">畳の状態を教えてください</h2>
          <p className="text-xs text-sumi/55 mb-4">複数選択できます</p>
          <MultiSelect options={STEP3_OPTIONS} selected={step3} onChange={setStep3} />
        </div>
      )}

      {step === 4 && (
        <div>
          <h2 className="text-base font-bold text-sumi mb-1">畳の枚数・広さを教えてください</h2>
          <p className="text-xs text-sumi/55 mb-4">1つ選択してください</p>
          <SingleSelect options={STEP4_OPTIONS} selected={step4} onChange={setStep4} />
        </div>
      )}

      {step === 5 && (
        <div>
          <h2 className="text-base font-bold text-sumi mb-1">ご希望の時期を教えてください</h2>
          <p className="text-xs text-sumi/55 mb-4">1つ選択してください</p>
          <SingleSelect options={STEP5_OPTIONS} selected={step5} onChange={setStep5} />
        </div>
      )}

      {step === 6 && (
        <div>
          <h2 className="text-base font-bold text-sumi mb-1">写真の準備について教えてください</h2>
          <p className="text-xs text-sumi/55 mb-2">用意できる写真を選んでください（複数選択可）</p>
          <div className="flex items-start gap-2 bg-ai/10 border border-ai/20 rounded-lg px-3 py-2.5 mb-4">
            <span className="text-ai text-sm mt-0.5 flex-shrink-0">📷</span>
            <p className="text-xs text-sumi/70 leading-relaxed">
              写真があると業者が現状を把握しやすく、より正確な見積もりにつながります。写真がなくても診断を進められます。
            </p>
          </div>
          <MultiSelect options={STEP6_OPTIONS} selected={step6} onChange={setStep6} />
        </div>
      )}

      {/* ナビゲーション */}
      <div className={`mt-8 flex ${step > 1 ? "justify-between" : "justify-end"} gap-3`}>
        {step > 1 && (
          <button
            type="button"
            onClick={back}
            className="px-5 py-2.5 border border-border rounded-lg text-sm text-sumi/70 hover:bg-kiji transition-colors duration-150"
          >
            戻る
          </button>
        )}
        {step < TOTAL_STEPS ? (
          <button
            type="button"
            onClick={next}
            disabled={!canNext()}
            className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 ${
              canNext()
                ? "bg-kincya text-white hover:bg-kincya/90"
                : "bg-kiji text-sumi/30 cursor-not-allowed"
            }`}
          >
            次へ
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canNext() || isSubmitting}
            className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 ${
              canNext() && !isSubmitting
                ? "bg-kincya text-white hover:bg-kincya/90"
                : "bg-kiji text-sumi/30 cursor-not-allowed"
            }`}
          >
            {isSubmitting ? "診断中..." : "診断結果を見る"}
          </button>
        )}
      </div>
    </div>
  );
}
