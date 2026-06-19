"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { SERVICE_CATEGORIES } from "@/data/categories";
import { MOCK_PROVIDER_SERVICES, getServicesByProviderId } from "@/data/provider-services";
import type { ProviderService } from "@/lib/types";

const MOCK_PROVIDER_ID = "prov-001";

type EditState = {
  id: string | null;
  isNew: boolean;
  form: Partial<ProviderService>;
};

const INITIAL_FORM: Partial<ProviderService> = {
  categorySlug: "",
  title: "",
  subtitle: "",
  description: "",
  catchCopy: "",
  priceLabel: "",
  priceFrom: undefined,
  workingTimeHours: undefined,
  workersCount: 1,
  travelFee: "",
  parkingFee: "",
  serviceAreas: [],
  availableDays: "",
  customerNote: "",
  cancelPolicy: "施工3日前まで無料キャンセル可。2日前〜当日は工費の30%をキャンセル料として申し受けます。",
  priceTable: [],
  workFlow: [],
  active: true,
};

export default function DashboardServicesPage() {
  const [services, setServices] = useState<ProviderService[]>(
    getServicesByProviderId(MOCK_PROVIDER_ID)
  );
  const [editState, setEditState] = useState<EditState | null>(null);
  const [saved, setSaved] = useState(false);

  // ── 新規作成 ───────────────────────────────────────────────
  const startNew = () => {
    setEditState({ id: null, isNew: true, form: { ...INITIAL_FORM } });
  };

  // ── 編集 ──────────────────────────────────────────────────
  const startEdit = (svc: ProviderService) => {
    setEditState({ id: svc.id, isNew: false, form: { ...svc } });
  };

  // ── 削除 ──────────────────────────────────────────────────
  const deleteService = (id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  // ── フォーム更新 ──────────────────────────────────────────
  const updateForm = <K extends keyof ProviderService>(key: K, val: ProviderService[K]) => {
    if (!editState) return;
    setEditState((prev) => prev ? { ...prev, form: { ...prev.form, [key]: val } } : null);
  };

  // ── 料金表行追加 ─────────────────────────────────────────
  const addPriceRow = () => {
    updateForm("priceTable", [...(editState?.form.priceTable ?? []), { label: "", price: "", note: "" }]);
  };
  const updatePriceRow = (i: number, key: "label" | "price" | "note", val: string) => {
    const rows = [...(editState?.form.priceTable ?? [])];
    rows[i] = { ...rows[i], [key]: val };
    updateForm("priceTable", rows);
  };
  const removePriceRow = (i: number) => {
    updateForm("priceTable", (editState?.form.priceTable ?? []).filter((_, idx) => idx !== i));
  };

  // ── 施工フロー ────────────────────────────────────────────
  const addFlowStep = () => {
    updateForm("workFlow", [...(editState?.form.workFlow ?? []), ""]);
  };
  const updateFlowStep = (i: number, val: string) => {
    const steps = [...(editState?.form.workFlow ?? [])];
    steps[i] = val;
    updateForm("workFlow", steps);
  };
  const removeFlowStep = (i: number) => {
    updateForm("workFlow", (editState?.form.workFlow ?? []).filter((_, idx) => idx !== i));
  };

  // ── 保存 ──────────────────────────────────────────────────
  const handleSave = () => {
    if (!editState) return;
    const newSvc: ProviderService = {
      id: editState.id ?? `svc-new-${Date.now()}`,
      providerId: MOCK_PROVIDER_ID,
      categorySlug: editState.form.categorySlug ?? "",
      title: editState.form.title ?? "",
      subtitle: editState.form.subtitle,
      description: editState.form.description ?? "",
      catchCopy: editState.form.catchCopy,
      priceLabel: editState.form.priceLabel ?? "要相談",
      priceFrom: editState.form.priceFrom,
      workingTimeHours: editState.form.workingTimeHours,
      workersCount: editState.form.workersCount,
      travelFee: editState.form.travelFee,
      parkingFee: editState.form.parkingFee,
      serviceAreas: editState.form.serviceAreas ?? [],
      availableDays: editState.form.availableDays,
      customerNote: editState.form.customerNote,
      cancelPolicy: editState.form.cancelPolicy,
      priceTable: editState.form.priceTable?.filter((r) => r.label && r.price),
      workFlow: editState.form.workFlow?.filter(Boolean),
      active: editState.form.active ?? true,
      createdAt: editState.isNew ? new Date().toISOString() : (services.find((s) => s.id === editState.id)?.createdAt ?? new Date().toISOString()),
      updatedAt: new Date().toISOString(),
    };

    setServices((prev) => {
      if (editState.isNew) return [...prev, newSvc];
      return prev.map((s) => s.id === editState.id ? newSvc : s);
    });
    setEditState(null);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const categoryMap = Object.fromEntries(SERVICE_CATEGORIES.map((c) => [c.slug, c.name]));

  return (
    <DashboardLayout currentPath="/dashboard/services">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl text-sumi" style={{ fontFamily: "var(--font-serif)" }}>サービス出品管理</h1>
            <p className="text-xs text-sumi/50 mt-0.5">ユーザーに見せるサービスメニュー・料金表を設定します</p>
          </div>
          <button
            onClick={startNew}
            className="bg-ai text-white px-4 py-2 text-sm hover:opacity-80 transition-opacity flex items-center gap-2"
          >
            <span>＋</span> 新しいサービスを追加
          </button>
        </div>

        {saved && (
          <div className="p-3 bg-igusa/10 border border-igusa text-xs text-igusa">
            サービスを保存しました
          </div>
        )}

        {/* ── サービス一覧 ── */}
        {!editState && (
          <div className="space-y-4">
            {services.length === 0 && (
              <div className="bg-white border border-border p-8 text-center">
                <p className="text-sm text-sumi/50 mb-2">まだサービスが登録されていません</p>
                <p className="text-xs text-sumi/40 mb-4">「新しいサービスを追加」からサービスを登録してください</p>
                <button
                  onClick={startNew}
                  className="text-sm text-ai border border-ai px-4 py-2 hover:bg-ai hover:text-white transition-all duration-300"
                >
                  サービスを追加する
                </button>
              </div>
            )}

            {services.map((svc) => (
              <div key={svc.id} className="bg-white border border-border p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs px-2 py-0.5 bg-kiji text-sumi/60">
                        {categoryMap[svc.categorySlug] ?? svc.categorySlug}
                      </span>
                      {svc.active ? (
                        <span className="text-xs px-2 py-0.5 bg-igusa/10 border border-igusa/30 text-igusa">公開中</span>
                      ) : (
                        <span className="text-xs px-2 py-0.5 bg-border text-sumi/40">非公開</span>
                      )}
                    </div>
                    <h3 className="text-base text-sumi font-medium" style={{ fontFamily: "var(--font-serif)" }}>
                      {svc.title}
                    </h3>
                    <p className="text-sm text-do font-medium mt-0.5">{svc.priceLabel}</p>
                    {svc.subtitle && <p className="text-xs text-sumi/50 mt-1">{svc.subtitle}</p>}
                    <div className="flex gap-3 mt-2 text-xs text-sumi/50">
                      {svc.workingTimeHours && <span>所要 {svc.workingTimeHours}h〜</span>}
                      {svc.priceTable && <span>料金表 {svc.priceTable.length}行</span>}
                      {svc.workFlow && <span>施工フロー {svc.workFlow.length}ステップ</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => startEdit(svc)}
                      className="text-xs border border-ai text-ai px-3 py-1.5 hover:bg-ai hover:text-white transition-all duration-300"
                    >
                      編集
                    </button>
                    <button
                      onClick={() => deleteService(svc.id)}
                      className="text-xs border border-sumi/20 text-sumi/40 px-3 py-1.5 hover:border-do hover:text-do transition-all duration-300"
                    >
                      削除
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── 編集フォーム ── */}
        {editState && (
          <div className="bg-white border border-border p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg text-sumi" style={{ fontFamily: "var(--font-serif)" }}>
                {editState.isNew ? "新しいサービスを追加" : "サービスを編集"}
              </h2>
              <button
                onClick={() => setEditState(null)}
                className="text-xs text-sumi/40 hover:text-sumi transition-colors"
              >
                ← 一覧に戻る
              </button>
            </div>

            {/* カテゴリ */}
            <div>
              <label className="block text-xs text-sumi/60 mb-2">サービスカテゴリ <span className="text-do">*</span></label>
              <select
                value={editState.form.categorySlug ?? ""}
                onChange={(e) => updateForm("categorySlug", e.target.value)}
                className="w-full sm:w-80 border border-border text-sm px-3 py-2.5 focus:outline-none focus:border-ai"
              >
                <option value="">選択してください</option>
                {SERVICE_CATEGORIES.map((cat) => (
                  <option key={cat.slug} value={cat.slug}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* タイトル */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-sumi/60 mb-2">サービス名 <span className="text-do">*</span></label>
                <input
                  type="text"
                  value={editState.form.title ?? ""}
                  onChange={(e) => updateForm("title", e.target.value)}
                  placeholder="例：畳表替え"
                  className="w-full border border-border text-sm px-3 py-2.5 focus:outline-none focus:border-ai"
                />
              </div>
              <div>
                <label className="block text-xs text-sumi/60 mb-2">サブタイトル</label>
                <input
                  type="text"
                  value={editState.form.subtitle ?? ""}
                  onChange={(e) => updateForm("subtitle", e.target.value)}
                  placeholder="例：い草・和紙・樹脂から選べます"
                  className="w-full border border-border text-sm px-3 py-2.5 focus:outline-none focus:border-ai"
                />
              </div>
            </div>

            {/* キャッチコピー */}
            <div>
              <label className="block text-xs text-sumi/60 mb-2">キャッチコピー（ユーザーの目を引く一文）</label>
              <input
                type="text"
                value={editState.form.catchCopy ?? ""}
                onChange={(e) => updateForm("catchCopy", e.target.value)}
                placeholder="例：国産い草でコスパ最高の表替え。30年の実績と技術で仕上げます"
                className="w-full border border-border text-sm px-3 py-2.5 focus:outline-none focus:border-ai"
              />
            </div>

            {/* 説明文 */}
            <div>
              <label className="block text-xs text-sumi/60 mb-2">サービス説明 <span className="text-do">*</span></label>
              <textarea
                value={editState.form.description ?? ""}
                onChange={(e) => updateForm("description", e.target.value)}
                rows={4}
                placeholder="このサービスの内容・特徴・おすすめポイントを記入してください"
                className="w-full border border-border text-sm px-3 py-2.5 focus:outline-none focus:border-ai resize-none"
              />
            </div>

            {/* 料金 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-sumi/60 mb-2">料金表示（代表表示） <span className="text-do">*</span></label>
                <input
                  type="text"
                  value={editState.form.priceLabel ?? ""}
                  onChange={(e) => updateForm("priceLabel", e.target.value)}
                  placeholder="例：3,800円〜/枚"
                  className="w-full border border-border text-sm px-3 py-2.5 focus:outline-none focus:border-ai"
                />
              </div>
              <div>
                <label className="block text-xs text-sumi/60 mb-2">最低料金（円）</label>
                <input
                  type="number"
                  value={editState.form.priceFrom ?? ""}
                  onChange={(e) => updateForm("priceFrom", e.target.value ? Number(e.target.value) : undefined)}
                  placeholder="3800"
                  className="w-full border border-border text-sm px-3 py-2.5 focus:outline-none focus:border-ai"
                />
              </div>
              <div>
                <label className="block text-xs text-sumi/60 mb-2">所要時間（時間）</label>
                <input
                  type="number"
                  value={editState.form.workingTimeHours ?? ""}
                  onChange={(e) => updateForm("workingTimeHours", e.target.value ? Number(e.target.value) : undefined)}
                  placeholder="3"
                  className="w-full border border-border text-sm px-3 py-2.5 focus:outline-none focus:border-ai"
                />
              </div>
            </div>

            {/* 料金表 */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs text-sumi/60 font-medium">料金表（素材・グレード別）</label>
                <button
                  onClick={addPriceRow}
                  className="text-xs text-ai border border-ai/30 px-2.5 py-1 hover:bg-ai/5 transition-colors"
                >
                  ＋ 行を追加
                </button>
              </div>
              {(editState.form.priceTable?.length ?? 0) === 0 ? (
                <p className="text-xs text-sumi/40 py-3">料金表が未設定です。「行を追加」で追加してください。</p>
              ) : (
                <div className="space-y-2">
                  {editState.form.priceTable?.map((row, i) => (
                    <div key={i} className="flex gap-2 items-center">
                      <input
                        type="text"
                        value={row.label}
                        onChange={(e) => updatePriceRow(i, "label", e.target.value)}
                        placeholder="例：国産い草（標準）"
                        className="flex-1 border border-border text-xs px-2.5 py-2 focus:outline-none focus:border-ai"
                      />
                      <input
                        type="text"
                        value={row.price}
                        onChange={(e) => updatePriceRow(i, "price", e.target.value)}
                        placeholder="例：5,500円/枚"
                        className="w-28 border border-border text-xs px-2.5 py-2 focus:outline-none focus:border-ai"
                      />
                      <input
                        type="text"
                        value={row.note ?? ""}
                        onChange={(e) => updatePriceRow(i, "note", e.target.value)}
                        placeholder="備考（任意）"
                        className="w-24 border border-border text-xs px-2.5 py-2 focus:outline-none focus:border-ai"
                      />
                      <button onClick={() => removePriceRow(i)} className="text-sumi/30 hover:text-do transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 施工の流れ */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs text-sumi/60 font-medium">施工の流れ</label>
                <button
                  onClick={addFlowStep}
                  className="text-xs text-ai border border-ai/30 px-2.5 py-1 hover:bg-ai/5 transition-colors"
                >
                  ＋ ステップを追加
                </button>
              </div>
              {(editState.form.workFlow?.length ?? 0) === 0 ? (
                <p className="text-xs text-sumi/40 py-3">施工フローが未設定です。</p>
              ) : (
                <div className="space-y-2">
                  {editState.form.workFlow?.map((step, i) => (
                    <div key={i} className="flex gap-2 items-center">
                      <span className="w-6 h-6 bg-sumi/10 text-sumi/40 text-xs flex items-center justify-center shrink-0">{i + 1}</span>
                      <input
                        type="text"
                        value={step}
                        onChange={(e) => updateFlowStep(i, e.target.value)}
                        placeholder="例：無料現地調査・採寸"
                        className="flex-1 border border-border text-xs px-2.5 py-2 focus:outline-none focus:border-ai"
                      />
                      <button onClick={() => removeFlowStep(i)} className="text-sumi/30 hover:text-do transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 出張費・駐車場 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-sumi/60 mb-2">出張費</label>
                <input
                  type="text"
                  value={editState.form.travelFee ?? ""}
                  onChange={(e) => updateForm("travelFee", e.target.value)}
                  placeholder="例：さいたま市内は無料"
                  className="w-full border border-border text-sm px-3 py-2.5 focus:outline-none focus:border-ai"
                />
              </div>
              <div>
                <label className="block text-xs text-sumi/60 mb-2">駐車場費用</label>
                <input
                  type="text"
                  value={editState.form.parkingFee ?? ""}
                  onChange={(e) => updateForm("parkingFee", e.target.value)}
                  placeholder="例：無料（ご用意ください）"
                  className="w-full border border-border text-sm px-3 py-2.5 focus:outline-none focus:border-ai"
                />
              </div>
            </div>

            {/* 顧客注意事項 */}
            <div>
              <label className="block text-xs text-sumi/60 mb-2">ご依頼前の注意事項</label>
              <textarea
                value={editState.form.customerNote ?? ""}
                onChange={(e) => updateForm("customerNote", e.target.value)}
                rows={3}
                placeholder="施工中の注意点・特殊な場合の追加費用など"
                className="w-full border border-border text-sm px-3 py-2.5 focus:outline-none focus:border-ai resize-none"
              />
            </div>

            {/* キャンセルポリシー */}
            <div>
              <label className="block text-xs text-sumi/60 mb-2">キャンセルポリシー</label>
              <input
                type="text"
                value={editState.form.cancelPolicy ?? ""}
                onChange={(e) => updateForm("cancelPolicy", e.target.value)}
                className="w-full border border-border text-sm px-3 py-2.5 focus:outline-none focus:border-ai"
              />
            </div>

            {/* 公開設定 */}
            <div className="flex items-center gap-3 border-t border-kiji pt-4">
              <label className="flex items-center gap-2 text-sm text-sumi cursor-pointer">
                <input
                  type="checkbox"
                  checked={editState.form.active ?? true}
                  onChange={(e) => updateForm("active", e.target.checked)}
                  className="accent-igusa"
                />
                このサービスをユーザーに公開する
              </label>
            </div>

            {/* 保存ボタン */}
            <div className="flex gap-3">
              <button
                onClick={handleSave}
                disabled={!editState.form.categorySlug || !editState.form.title || !editState.form.description || !editState.form.priceLabel}
                className="flex-1 bg-ai text-white py-3 text-sm tracking-wider hover:opacity-80 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {editState.isNew ? "サービスを登録する" : "変更を保存する"}
              </button>
              <button
                onClick={() => setEditState(null)}
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
