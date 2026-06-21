"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState } from "react";
import { SAITAMA_CITIES } from "@/data/cities";

// URLパラメータ駆動の絞り込みサイドバー
// PCは左サイドバー、スマホは下部ドロワー
export default function FilterSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [mobileOpen, setMobileOpen] = useState(false);

  const setParam = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === null || value === "") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  };

  const toggleBool = (key: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (params.get(key) === "true") params.delete(key);
    else params.set(key, "true");
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  };

  const isChecked = (key: string) => searchParams.get(key) === "true";
  const current = (key: string) => searchParams.get(key) ?? "";

  const cityGroups = [
    { label: "東京近郊", cities: ["川口市", "蕨市", "戸田市", "草加市", "三郷市", "八潮市", "朝霞市", "和光市", "新座市"] },
    { label: "さいたま・中部", cities: ["さいたま市", "上尾市", "富士見市", "ふじみ野市", "志木市", "鴻巣市"] },
    { label: "西部・川越", cities: ["川越市", "所沢市", "狭山市", "入間市", "飯能市", "東松山市"] },
    { label: "東部・春日部", cities: ["越谷市", "春日部市", "久喜市", "行田市", "加須市", "羽生市"] },
    { label: "北部・秩父", cities: ["熊谷市", "深谷市", "本庄市", "秩父市"] },
  ];

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div>
      <h3 className="text-sm font-medium text-sumi mb-3" style={{ fontFamily: "var(--font-serif)" }}>
        {title}
      </h3>
      {children}
    </div>
  );

  const Radio = ({ name, value, label }: { name: string; value: string; label: string }) => (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="radio"
        name={name}
        checked={current(name) === value}
        onChange={() => setParam(name, value)}
        className="accent-kincya"
      />
      <span className="text-xs text-sumi/80">{label}</span>
    </label>
  );

  const Check = ({ name, label }: { name: string; label: string }) => (
    <label className="flex items-center gap-2 cursor-pointer">
      <input type="checkbox" checked={isChecked(name)} onChange={() => toggleBool(name)} className="accent-kincya" />
      <span className="text-xs text-sumi/80">{label}</span>
    </label>
  );

  const content = (
    <div className="space-y-6">
      <Section title="市区町村">
        <div className="space-y-4 max-h-64 overflow-y-auto pr-1">
          {cityGroups.map((g) => (
            <div key={g.label}>
              <p className="text-xs text-sumi/50 mb-2">{g.label}</p>
              <div className="space-y-1.5">
                {g.cities.map((c) => (
                  <Radio key={c} name="city" value={c} label={c} />
                ))}
              </div>
            </div>
          ))}
        </div>
        {current("city") && (
          <button onClick={() => setParam("city", null)} className="mt-2 text-xs text-ai hover:underline">
            エリア指定を解除
          </button>
        )}
      </Section>

      <Section title="口コミ評価">
        <div className="space-y-1.5">
          <Radio name="rating" value="4.5" label="4.5以上" />
          <Radio name="rating" value="4.0" label="4.0以上" />
          <Radio name="rating" value="3.5" label="3.5以上" />
        </div>
        {current("rating") && (
          <button onClick={() => setParam("rating", null)} className="mt-2 text-xs text-ai hover:underline">
            評価フィルターを解除
          </button>
        )}
      </Section>

      <Section title="口コミ件数">
        <div className="space-y-1.5">
          <Radio name="reviewMin" value="50" label="50件以上" />
          <Radio name="reviewMin" value="30" label="30件以上" />
          <Radio name="reviewMin" value="10" label="10件以上" />
        </div>
        {current("reviewMin") && (
          <button onClick={() => setParam("reviewMin", null)} className="mt-2 text-xs text-ai hover:underline">
            解除
          </button>
        )}
      </Section>

      <Section title="対応可能時期">
        <div className="space-y-1.5">
          <Check name="sameDayResponse" label="即日対応" />
          <Check name="weekendResponse" label="土日対応" />
        </div>
      </Section>

      <Section title="資格">
        <div className="space-y-2">
          <Check name="hasLicense" label="一級畳製作技能士" />
          <Check name="hasInsurance" label="損害賠償保険加入" />
        </div>
      </Section>

      <Section title="対応業種">
        <div className="space-y-2">
          <Check name="acceptsCorporate" label="法人対応可" />
          <Check name="acceptsRealEstate" label="不動産・管理会社対応" />
          <Check name="acceptsRyokan" label="旅館・宿泊施設対応" />
          <Check name="acceptsTempleShrine" label="寺社・神社対応" />
        </div>
      </Section>

      <Section title="設備・サービス">
        <div className="space-y-2">
          <Check name="hasFurnitureMove" label="家具移動対応" />
          <Check name="parkingFree" label="駐車場代込み" />
          <Check name="hasEstimateFree" label="無料見積もり" />
          <Check name="hasPhotoEstimate" label="写真見積もり可" />
          <Check name="hasOldTatamiDisposal" label="古畳処分対応" />
          <Check name="acceptsCard" label="カード払い対応" />
          <Check name="acceptsInvoice" label="インボイス対応" />
          <Check name="canOnlineConsult" label="オンライン相談可" />
          <Check name="nightConsultation" label="夜間相談可" />
        </div>
      </Section>

      <button
        onClick={() => router.push(pathname)}
        className="w-full text-xs text-ai border border-ai py-2 hover:bg-ai hover:text-white transition-colors"
      >
        絞り込みをすべてリセット
      </button>
    </div>
  );

  return (
    <>
      {/* スマホ用ドロワートグル */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-full flex items-center justify-between border border-border bg-white px-4 py-3 text-sm text-sumi"
        >
          <span>絞り込み条件</span>
          <svg
            className={`w-4 h-4 transition-transform ${mobileOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {mobileOpen && <div className="border border-t-0 border-border bg-white p-4">{content}</div>}
      </div>

      {/* PC用サイドバー */}
      <div className="hidden lg:block bg-white border border-border p-5 sticky top-24">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-sm font-medium text-sumi" style={{ fontFamily: "var(--font-serif)" }}>
            絞り込み
          </h2>
        </div>
        {content}
      </div>
    </>
  );
}
