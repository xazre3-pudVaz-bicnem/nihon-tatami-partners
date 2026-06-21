"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";

interface PriceItem {
  id: string;
  serviceType: string;
  unit: string;
  priceFrom: number;
  priceTo?: number;
  note?: string;
  updatedAt: string;
}

const INITIAL_PRICES: PriceItem[] = [
  {
    id: "price-001",
    serviceType: "畳表替え（い草・標準）",
    unit: "枚",
    priceFrom: 3200,
    priceTo: 5500,
    note: "国産い草・中国産い草から選択可",
    updatedAt: "2026-06-01T00:00:00Z",
  },
  {
    id: "price-002",
    serviceType: "畳裏返し",
    unit: "枚",
    priceFrom: 2200,
    priceTo: 3500,
    note: "状態確認後にご案内します",
    updatedAt: "2026-06-01T00:00:00Z",
  },
  {
    id: "price-003",
    serviceType: "畳新調",
    unit: "枚",
    priceFrom: 12000,
    priceTo: 25000,
    note: "畳床・畳表すべて新品に交換",
    updatedAt: "2026-06-01T00:00:00Z",
  },
];

type EditForm = Omit<PriceItem, "id" | "updatedAt">;

const EMPTY_FORM: EditForm = {
  serviceType: "",
  unit: "枚",
  priceFrom: 0,
  priceTo: undefined,
  note: "",
};

const UNIT_OPTIONS = ["枚", "畳", "平米", "式", "部屋"];

function formatYen(n: number) {
  return n.toLocaleString() + "円";
}

function formatDate(iso: string) {
  return iso.slice(0, 10);
}

export default function DashboardPricesPage() {
  const [prices, setPrices] = useState<PriceItem[]>(INITIAL_PRICES);
  const [editId, setEditId] = useState<string | "new" | null>(null);
  const [form, setForm] = useState<EditForm>(EMPTY_FORM);
  const [saved, setSaved] = useState(false);

  const startNew = () => {
    setForm(EMPTY_FORM);
    setEditId("new");
  };

  const startEdit = (item: PriceItem) => {
    setForm({
      serviceType: item.serviceType,
      unit: item.unit,
      priceFrom: item.priceFrom,
      priceTo: item.priceTo,
      note: item.note ?? "",
    });
    setEditId(item.id);
  };

  const handleDelete = (id: string) => {
    setPrices((prev) => prev.filter((p) => p.id !== id));
  };

  const handleSave = () => {
    if (!form.serviceType || !form.priceFrom) return;
    const now = new Date().toISOString();
    if (editId === "new") {
      setPrices((prev) => [
        ...prev,
        { ...form, id: `price-${Date.now()}`, updatedAt: now },
      ]);
    } else {
      setPrices((prev) =>
        prev.map((p) =>
          p.id === editId ? { ...p, ...form, updatedAt: now } : p
        )
      );
    }
    setEditId(null);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <DashboardLayout currentPath="/dashboard/prices">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1
              className="text-xl text-sumi"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              料金表管理
            </h1>
            <p className="text-xs text-sumi/50 mt-0.5">
              サービスごとの料金目安を登録・管理します
            </p>
          </div>
          <button
            onClick={startNew}
            className="bg-ai text-white px-4 py-2 text-sm hover:opacity-80 transition-opacity flex items-center gap-2"
          >
            <span>＋</span> 料金を登録する
          </button>
        </div>

        {saved && (
          <div className="p-3 bg-igusa/10 border border-igusa text-xs text-igusa">
            料金表を保存しました
          </div>
        )}

        {/* 料金表一覧 */}
        {!editId && (
          <div className="space-y-3">
            {prices.length === 0 && (
              <div className="bg-white border border-border p-8 text-center">
                <p className="text-sm text-sumi/50 mb-2">
                  料金表がまだ登録されていません
                </p>
                <p className="text-xs text-sumi/40 mb-4">
                  「料金を登録する」から料金情報を追加してください
                </p>
                <button
                  onClick={startNew}
                  className="text-sm text-ai border border-ai px-4 py-2 hover:bg-ai hover:text-white transition-all duration-300"
                >
                  料金を追加する
                </button>
              </div>
            )}

            {prices.length > 0 && (
              <div className="bg-white border border-border overflow-hidden">
                {/* テーブルヘッダー */}
                <div className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 px-5 py-3 bg-kiji border-b border-border text-xs text-sumi/50 font-medium">
                  <span>サービス種別</span>
                  <span className="text-right">最低料金</span>
                  <span className="text-right">単位</span>
                  <span className="text-right">更新日</span>
                  <span></span>
                </div>

                {prices.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 items-center px-5 py-4 border-b border-kiji last:border-0"
                  >
                    <div>
                      <p className="text-sm text-sumi font-medium">
                        {item.serviceType}
                      </p>
                      {item.note && (
                        <p className="text-xs text-sumi/50 mt-0.5">{item.note}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-kincya font-medium">
                        {formatYen(item.priceFrom)}
                        {item.priceTo
                          ? ` 〜 ${formatYen(item.priceTo)}`
                          : "〜"}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-sumi/60 bg-kiji px-2 py-0.5">
                        /{item.unit}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-sumi/40">
                        {formatDate(item.updatedAt)}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => startEdit(item)}
                        className="text-xs border border-ai text-ai px-2.5 py-1 hover:bg-ai hover:text-white transition-all duration-300"
                      >
                        編集
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-xs border border-sumi/20 text-sumi/40 px-2.5 py-1 hover:border-do hover:text-do transition-all duration-300"
                      >
                        削除
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 編集フォーム */}
        {editId && (
          <div className="bg-white border border-border p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h2
                className="text-lg text-sumi"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {editId === "new" ? "料金を新規登録" : "料金を編集"}
              </h2>
              <button
                onClick={() => setEditId(null)}
                className="text-xs text-sumi/40 hover:text-sumi transition-colors"
              >
                ← 一覧に戻る
              </button>
            </div>

            {/* サービス種別 */}
            <div>
              <label className="block text-xs text-sumi/60 mb-2">
                サービス種別 <span className="text-do">*</span>
              </label>
              <input
                type="text"
                value={form.serviceType}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, serviceType: e.target.value }))
                }
                placeholder="例：畳表替え（い草・標準）"
                className="w-full border border-border text-sm px-3 py-2.5 focus:outline-none focus:border-ai"
              />
            </div>

            {/* 料金・単位 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-sumi/60 mb-2">
                  最低料金（円）<span className="text-do">*</span>
                </label>
                <input
                  type="number"
                  value={form.priceFrom || ""}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      priceFrom: Number(e.target.value),
                    }))
                  }
                  placeholder="3200"
                  className="w-full border border-border text-sm px-3 py-2.5 focus:outline-none focus:border-ai"
                />
              </div>
              <div>
                <label className="block text-xs text-sumi/60 mb-2">
                  最高料金（円・任意）
                </label>
                <input
                  type="number"
                  value={form.priceTo ?? ""}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      priceTo: e.target.value ? Number(e.target.value) : undefined,
                    }))
                  }
                  placeholder="5500"
                  className="w-full border border-border text-sm px-3 py-2.5 focus:outline-none focus:border-ai"
                />
              </div>
              <div>
                <label className="block text-xs text-sumi/60 mb-2">
                  単位 <span className="text-do">*</span>
                </label>
                <select
                  value={form.unit}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, unit: e.target.value }))
                  }
                  className="w-full border border-border text-sm px-3 py-2.5 focus:outline-none focus:border-ai"
                >
                  {UNIT_OPTIONS.map((u) => (
                    <option key={u} value={u}>
                      {u}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 備考 */}
            <div>
              <label className="block text-xs text-sumi/60 mb-2">
                備考・補足（任意）
              </label>
              <input
                type="text"
                value={form.note ?? ""}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, note: e.target.value }))
                }
                placeholder="例：素材の種類や条件など"
                className="w-full border border-border text-sm px-3 py-2.5 focus:outline-none focus:border-ai"
              />
            </div>

            {/* ボタン */}
            <div className="flex gap-3">
              <button
                onClick={handleSave}
                disabled={!form.serviceType || !form.priceFrom}
                className="flex-1 bg-ai text-white py-3 text-sm tracking-wider hover:opacity-80 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {editId === "new" ? "料金を登録する" : "変更を保存する"}
              </button>
              <button
                onClick={() => setEditId(null)}
                className="px-6 border border-border text-sumi/60 py-3 text-sm hover:border-sumi/40 transition-colors"
              >
                キャンセル
              </button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
