/**
 * check-routes.ts
 * 定義済みURLが実際に存在するルートファイルに対応しているかを検証するスクリプト。
 *
 * 使い方: npx tsx scripts/check-routes.ts
 */

import fs from "fs";
import path from "path";

// ─── ユーティリティ ────────────────────────────────────────────────────────
const APP_DIR = path.join(process.cwd(), "app");
const errors: string[] = [];
const warnings: string[] = [];

function routeExists(href: string): boolean {
  // クエリ文字列・ハッシュを除去
  const pathname = href.split("?")[0].split("#")[0];
  // 動的セグメントに変換: /saitama/kawaguchi → check /saitama/[city]/page.tsx
  // 完全一致チェック + 動的チェック
  return checkExact(pathname) || checkDynamic(pathname);
}

function checkExact(pathname: string): boolean {
  const candidates = [
    path.join(APP_DIR, pathname, "page.tsx"),
    path.join(APP_DIR, pathname, "page.ts"),
    path.join(APP_DIR, `${pathname}.tsx`),
  ];
  return candidates.some((f) => fs.existsSync(f));
}

function checkDynamic(pathname: string): boolean {
  // 1段ずつ親を辿り、動的セグメントが適合するか確認
  const segments = pathname.split("/").filter(Boolean);
  return matchDynamic(APP_DIR, segments);
}

function matchDynamic(dir: string, segments: string[]): boolean {
  if (segments.length === 0) {
    return (
      fs.existsSync(path.join(dir, "page.tsx")) ||
      fs.existsSync(path.join(dir, "page.ts"))
    );
  }
  const [head, ...rest] = segments;
  // 直接一致
  const directDir = path.join(dir, head);
  if (fs.existsSync(directDir) && fs.statSync(directDir).isDirectory()) {
    if (matchDynamic(directDir, rest)) return true;
  }
  // 動的セグメント ([xxx]) を探す
  if (fs.existsSync(dir)) {
    const entries = fs.readdirSync(dir);
    for (const entry of entries) {
      if (entry.startsWith("[") && entry.endsWith("]")) {
        const dynamicDir = path.join(dir, entry);
        if (fs.statSync(dynamicDir).isDirectory()) {
          if (matchDynamic(dynamicDir, rest)) return true;
        }
      }
    }
  }
  return false;
}

// ─── チェック対象: カテゴリURL ───────────────────────────────────────────
// categories.ts を直接読み込む代わりにhrefの一覧をハードコード
const CATEGORY_HREFS = [
  "/saitama/tatami/omotegae",
  "/saitama/tatami/uragaeshi",
  "/saitama/tatami/shinchou",
  "/saitama/tatami/ryukyu",
  "/saitama/tatami/herinashi",
  "/saitama/tatami/washi",
  "/saitama/tatami/kokusan-igusa",
  "/saitama/tatami/color",
  "/saitama/tatami/pet",
  "/saitama/tatami/anti-mite-mold",
  "/saitama/tatami/disposal",
  "/saitama/tatami/repair",
  "/saitama/tatami/cleaning",
  "/saitama/fusuma/harikae",
  "/saitama/shoji/harikae",
  "/saitama/amido/harikae",
  "/saitama/washitsu/reform",
  "/saitama/washitsu/sunakabe",
  "/saitama/washitsu/akunuki",
  "/saitama/washitsu/tokonoma",
  "/saitama/washitsu/chashitsu",
  "/saitama/ryokan/tatami",
  "/saitama/temple/tatami",
  "/saitama/rental-restoration/tatami",
  "/saitama/cross/harikae",
  "/saitama/floor/cushion-floor",
  "/saitama/floor/repair",
  "/saitama/store/interior",
  "/saitama/vacancy-reform",
  "/saitama/property-management/tatami",
];

// ─── チェック対象: ナビゲーション・フッターURL ────────────────────────────
const NAV_HREFS = [
  "/",
  "/search",
  "/saitama",
  "/prices",
  "/cases",
  "/articles",
  "/bulk-quote",
  "/bulk-quote/new",
  "/compare",
  "/categories",
  "/mypage",
  "/pro",
  "/pro/register",
  "/matching",
  "/request/start",
  "/photo-estimate",
  "/concierge",
  "/calculator",
  "/questions",
  "/map",
  "/guide",
  "/guide/how-to-choose",
  "/guide/omotegae-or-shinchou",
  "/guide/estimate-checklist",
  "/guide/rental-restoration",
  "/for-real-estate",
  "/for-property-management",
  "/for-landlords",
  "/for-ryokan",
  "/for-temple-shrine",
  "/business/bulk-request",
  "/about",
  "/contact",
  "/terms",
  "/privacy",
  "/safety",
  "/request/diagnosis",
  "/request/result",
  "/dashboard/questions",
  "/dashboard/prices",
];

// ─── チェック対象: 都市URL ────────────────────────────────────────────────
const CITY_HREFS = [
  "/saitama/saitama-city",
  "/saitama/kawaguchi",
  "/saitama/kawagoe",
  "/saitama/koshigaya",
  "/saitama/tokorozawa",
  "/saitama/kasukabe",
  "/saitama/soka",
  "/saitama/ageo",
  "/saitama/kumagaya",
];

// ─── チェック対象: 市区町村×サービスグループURL ──────────────────────────
const CITY_GROUP_HREFS = [
  "/saitama/saitama-city/tatami",
  "/saitama/kawaguchi/tatami",
  "/saitama/kawagoe/tatami",
];

// ─── 旧URL → リダイレクト確認 ────────────────────────────────────────────
// next.config.ts の redirects に含まれているかを確認する旧URL
const LEGACY_HREFS = [
  "/saitama/tatami-omotegae",
  "/saitama/tatami-shinchou",
  "/saitama/ryukyu-tatami",
  "/saitama/fusuma-harikae",
  "/saitama/shoji-harikae",
  "/saitama/washitsu-reform",
  "/saitama/genjoukaifuku",
  "/saitama/tatami/shincho",              // → shinchou へリダイレクト確認
  "/saitama/tatami/kokusan",              // → kokusan-igusa へリダイレクト確認
  "/saitama/rental-restoration/full",     // → rental-restoration/tatami へリダイレクト確認
  "/request/diagnose",                    // → request/start へリダイレクト確認
];

// next.config.ts の redirects に定義されているソースURLを読む
const NEXT_CONFIG_PATH = path.join(process.cwd(), "next.config.ts");
const nextConfigContent = fs.existsSync(NEXT_CONFIG_PATH)
  ? fs.readFileSync(NEXT_CONFIG_PATH, "utf-8")
  : "";

function legacyRedirectExists(href: string): boolean {
  return nextConfigContent.includes(`source: "${href}"`);
}

// ─── チェック実行 ──────────────────────────────────────────────────────────

console.log("\n🔍 日本畳パートナーズ — ルートチェック開始\n");

console.log("=== カテゴリURL ===");
for (const href of CATEGORY_HREFS) {
  const ok = routeExists(href);
  if (!ok) {
    errors.push(`[BROKEN] ${href} — 対応するpage.tsxが見つかりません`);
    console.log(`  ✗ ${href}`);
  } else {
    console.log(`  ✓ ${href}`);
  }
}

console.log("\n=== ナビゲーション・フッターURL ===");
for (const href of NAV_HREFS) {
  const ok = routeExists(href);
  if (!ok) {
    warnings.push(`[WARN] ${href} — ページが見つかりません（外部リンクの場合は無視可）`);
    console.log(`  △ ${href}`);
  } else {
    console.log(`  ✓ ${href}`);
  }
}

console.log("\n=== 市区町村URL ===");
for (const href of CITY_HREFS) {
  const ok = routeExists(href);
  if (!ok) {
    errors.push(`[BROKEN] ${href} — 対応するpage.tsxが見つかりません`);
    console.log(`  ✗ ${href}`);
  } else {
    console.log(`  ✓ ${href}`);
  }
}

console.log("\n=== 市区町村×サービスグループURL ===");
for (const href of CITY_GROUP_HREFS) {
  const ok = routeExists(href);
  if (!ok) {
    errors.push(`[BROKEN] ${href} — 対応するpage.tsxが見つかりません`);
    console.log(`  ✗ ${href}`);
  } else {
    console.log(`  ✓ ${href}`);
  }
}

console.log("\n=== 旧URL → リダイレクト確認 ===");
for (const href of LEGACY_HREFS) {
  const hasRedirect = legacyRedirectExists(href);
  if (!hasRedirect) {
    errors.push(`[NO REDIRECT] ${href} — next.config.ts にリダイレクトがありません`);
    console.log(`  ✗ ${href}`);
  } else {
    console.log(`  ✓ ${href} → redirect定義済み`);
  }
}

// ─── サマリー ──────────────────────────────────────────────────────────────

console.log("\n=== 結果サマリー ===");
if (errors.length === 0 && warnings.length === 0) {
  console.log("✅ 全てのルートが正常です！404リンクはありません。\n");
} else {
  if (errors.length > 0) {
    console.log(`\n❌ エラー ${errors.length}件:`);
    errors.forEach((e) => console.log(`  ${e}`));
  }
  if (warnings.length > 0) {
    console.log(`\n⚠️  警告 ${warnings.length}件:`);
    warnings.forEach((w) => console.log(`  ${w}`));
  }
  if (errors.length > 0) {
    process.exit(1);
  }
}
