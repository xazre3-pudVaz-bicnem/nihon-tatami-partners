"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import DashboardLayout from "@/components/layout/DashboardLayout";

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

function toDateKey(year: number, month: number, day: number): string {
  const mm = String(month + 1).padStart(2, "0");
  const dd = String(day).padStart(2, "0");
  return `${year}-${mm}-${dd}`;
}

export default function CalendarPage() {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [availabilities, setAvailabilities] = useState<
    Record<string, { morning: boolean; afternoon: boolean }>
  >({});
  const [closedDates, setClosedDates] = useState<string[]>([]);
  const [canSameDayConsult, setCanSameDayConsult] = useState(false);
  const [busyMessage, setBusyMessage] = useState("");
  const [saved, setSaved] = useState(false);

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfWeek(viewYear, viewMonth);
  const todayKey = toDateKey(today.getFullYear(), today.getMonth(), today.getDate());

  const weeks = useMemo(() => {
    const cells: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);
    while (cells.length % 7 !== 0) cells.push(null);
    const rows: (number | null)[][] = [];
    for (let i = 0; i < cells.length; i += 7) rows.push(cells.slice(i, i + 7));
    return rows;
  }, [viewYear, viewMonth, daysInMonth, firstDay]);

  const toggleClosed = (key: string) => {
    setClosedDates((prev) =>
      prev.includes(key) ? prev.filter((d) => d !== key) : [...prev, key]
    );
  };

  const toggleSlot = (key: string, slot: "morning" | "afternoon") => {
    setAvailabilities((prev) => {
      const current = prev[key] ?? { morning: false, afternoon: false };
      return { ...prev, [key]: { ...current, [slot]: !current[slot] } };
    });
  };

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear((y) => y - 1); setViewMonth(11); }
    else setViewMonth((m) => m - 1);
  };

  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear((y) => y + 1); setViewMonth(0); }
    else setViewMonth((m) => m + 1);
  };

  const handleSave = () => {
    // TODO: Supabase に保存
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const WEEKDAYS = ["日", "月", "火", "水", "木", "金", "土"];
  const MONTH_NAMES = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];

  return (
    <DashboardLayout currentPath="/dashboard/calendar">
      <div className="space-y-6">
        {/* ページタイトル */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl text-sumi" style={{ fontFamily: "var(--font-serif)" }}>
              カレンダー管理
            </h1>
            <p className="text-xs text-sumi/50 mt-0.5">
              営業可能日・時間帯を設定してください
            </p>
          </div>
          <Link href="/dashboard" className="text-xs text-ai hover:underline">
            ← ダッシュボード
          </Link>
        </div>

        {/* 掲載イメージバナー */}
        <div className="bg-kiji border border-border px-4 py-2 flex items-center gap-2">
          <span className="text-[10px] bg-sumi/10 text-sumi/50 px-2 py-0.5">掲載イメージ</span>
          <p className="text-xs text-sumi/60">
            掲載イメージです。本番では実際の予約システムに連携します。
          </p>
        </div>

        {/* カレンダー本体 */}
        <section className="bg-white border border-border p-5">
          {/* 月ナビゲーション */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={prevMonth}
              className="w-8 h-8 border border-border flex items-center justify-center text-sumi/60 hover:border-ai hover:text-ai transition-colors"
            >
              ‹
            </button>
            <h2 className="text-base text-sumi" style={{ fontFamily: "var(--font-serif)" }}>
              {viewYear}年 {MONTH_NAMES[viewMonth]}
            </h2>
            <button
              onClick={nextMonth}
              className="w-8 h-8 border border-border flex items-center justify-center text-sumi/60 hover:border-ai hover:text-ai transition-colors"
            >
              ›
            </button>
          </div>

          {/* 凡例 */}
          <div className="flex flex-wrap gap-3 text-xs text-sumi/60 mb-4">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 border-2 border-igusa inline-block" />空きあり
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 bg-do/20 border border-do inline-block" />休業日
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 bg-ai border-ai inline-block border-2" />今日
            </span>
          </div>

          {/* 曜日ヘッダー */}
          <div className="grid grid-cols-7 mb-1">
            {WEEKDAYS.map((w, i) => (
              <div
                key={w}
                className={`text-center text-xs py-1 font-medium ${
                  i === 0 ? "text-do" : i === 6 ? "text-ai" : "text-sumi/60"
                }`}
              >
                {w}
              </div>
            ))}
          </div>

          {/* カレンダーグリッド */}
          <div className="space-y-1">
            {weeks.map((week, wi) => (
              <div key={wi} className="grid grid-cols-7 gap-1">
                {week.map((day, di) => {
                  if (day === null) {
                    return <div key={`empty-${di}`} className="aspect-square sm:aspect-auto sm:min-h-[80px]" />;
                  }
                  const key = toDateKey(viewYear, viewMonth, day);
                  const isClosed = closedDates.includes(key);
                  const isToday = key === todayKey;
                  const avail = availabilities[key] ?? { morning: false, afternoon: false };

                  return (
                    <div
                      key={key}
                      className={`border p-1 min-h-[70px] sm:min-h-[80px] transition-colors ${
                        isClosed
                          ? "bg-do/10 border-do/40"
                          : isToday
                          ? "border-ai bg-ai/5"
                          : "border-border bg-white"
                      }`}
                    >
                      {/* 日付 */}
                      <div className="flex items-center justify-between mb-1">
                        <span
                          className={`text-xs font-medium leading-none ${
                            isClosed
                              ? "text-do"
                              : isToday
                              ? "text-ai"
                              : di === 0
                              ? "text-do"
                              : di === 6
                              ? "text-ai"
                              : "text-sumi"
                          }`}
                        >
                          {day}
                        </span>
                        {/* 休業ボタン */}
                        <button
                          onClick={() => toggleClosed(key)}
                          className={`text-[9px] leading-none px-1 py-0.5 border transition-colors ${
                            isClosed
                              ? "bg-do text-white border-do"
                              : "border-sumi/20 text-sumi/30 hover:border-do hover:text-do"
                          }`}
                          title="休業日にする"
                        >
                          休
                        </button>
                      </div>

                      {/* 午前・午後トグル */}
                      {!isClosed && (
                        <div className="space-y-0.5">
                          <button
                            onClick={() => toggleSlot(key, "morning")}
                            className={`w-full text-[9px] py-0.5 border transition-colors leading-tight ${
                              avail.morning
                                ? "bg-igusa/20 border-igusa text-igusa"
                                : "border-sumi/15 text-sumi/30 hover:border-igusa/50"
                            }`}
                          >
                            午前
                          </button>
                          <button
                            onClick={() => toggleSlot(key, "afternoon")}
                            className={`w-full text-[9px] py-0.5 border transition-colors leading-tight ${
                              avail.afternoon
                                ? "bg-igusa/20 border-igusa text-igusa"
                                : "border-sumi/15 text-sumi/30 hover:border-igusa/50"
                            }`}
                          >
                            午後
                          </button>
                        </div>
                      )}
                      {isClosed && (
                        <p className="text-[9px] text-do/70 text-center mt-1">休業</p>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </section>

        {/* 繁忙期メッセージ */}
        <section className="bg-white border border-border p-5">
          <h2 className="text-base text-sumi mb-3" style={{ fontFamily: "var(--font-serif)" }}>
            繁忙期メッセージ
          </h2>
          <p className="text-xs text-sumi/50 mb-2">
            予約が混み合っている時期にお客様に表示するメッセージを設定できます。
          </p>
          <textarea
            value={busyMessage}
            onChange={(e) => setBusyMessage(e.target.value)}
            rows={3}
            placeholder="例：3〜4月は大変混み合っております。お早めにご相談ください。"
            className="w-full border border-border text-sm px-3 py-2.5 focus:outline-none focus:border-ai resize-none"
          />
          <p className="text-xs text-sumi/40 mt-1">{busyMessage.length} / 100文字</p>
        </section>

        {/* 即日相談トグル */}
        <section className="bg-white border border-border p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base text-sumi" style={{ fontFamily: "var(--font-serif)" }}>
                即日相談
              </h2>
              <p className="text-xs text-sumi/50 mt-0.5">
                ONにすると「即日相談可」バッジがプロフィールに表示されます
              </p>
            </div>
            <button
              onClick={() => setCanSameDayConsult((v) => !v)}
              className={`relative w-12 h-6 transition-colors duration-200 ${
                canSameDayConsult ? "bg-igusa" : "bg-sumi/20"
              }`}
            >
              <span
                className={`absolute top-1 w-4 h-4 bg-white transition-transform duration-200 ${
                  canSameDayConsult ? "left-7" : "left-1"
                }`}
              />
            </button>
          </div>
        </section>

        {/* 保存ボタン */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleSave}
            className="bg-kincya text-white px-8 py-3 text-sm tracking-wider hover:bg-do transition-colors duration-300"
          >
            保存する
          </button>
          {saved && (
            <span className="text-sm text-igusa">保存しました</span>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
