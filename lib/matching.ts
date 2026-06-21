import type { Provider } from "@/lib/types";
import type {
  MatchingCondition,
  MatchingScore,
  MatchingResult,
  MatchingReason,
} from "@/lib/types-platform";
import { MOCK_PROVIDERS } from "@/data/providers";

// ─── スコア算出 ──────────────────────────────────────────────
export function calcMatchingScore(
  provider: Provider,
  condition: MatchingCondition
): MatchingScore {
  const reasons: MatchingReason[] = [];
  let area = 0;
  let service = 0;
  let quality = 0;
  let responsiveness = 0;
  let specializations = 0;
  let price = 0;
  let schedule = 0;

  // 1. 対応エリア一致（25点）
  const cityMatch =
    condition.city &&
    provider.serviceAreas.some((a) =>
      a.includes(condition.city!) || condition.city!.includes(a)
    );
  if (cityMatch) {
    area = 25;
    reasons.push({ type: "area", label: `${condition.city}対応`, positive: true });
  } else if (condition.city) {
    area = 0;
    reasons.push({ type: "area", label: `${condition.city}対応外の可能性あり`, positive: false });
  } else {
    area = 10; // エリア未指定は中間点
  }

  // 2. サービスカテゴリ対応（15点）
  if (condition.serviceCategory) {
    // カテゴリslugからキーワードを抽出して業者の紹介文・強みと照合（簡易マッチ）
    const cat = condition.serviceCategory.toLowerCase();
    const intro = (provider.introduction + " " + (provider.strengths ?? []).join(" ")).toLowerCase();
    const matched =
      intro.includes("表替え") ||
      intro.includes("新調") ||
      intro.includes("裏返し") ||
      (cat.includes("ryukyu") && intro.includes("琉球")) ||
      (cat.includes("washi") && intro.includes("和紙")) ||
      (cat.includes("restoration") && intro.includes("原状回復")) ||
      (cat.includes("fusuma") && intro.includes("ふすま")) ||
      true; // デフォルトは基本対応とみなす
    if (matched) {
      service = 15;
      reasons.push({ type: "service", label: "依頼内容に対応", positive: true });
    }
  } else {
    service = 10;
  }

  // 3. 口コミ評価（15点）
  quality = Math.round((provider.averageRating / 5) * 15);
  if (provider.averageRating >= 4.5) {
    reasons.push({ type: "rating", label: `評価${provider.averageRating}（高評価）`, positive: true });
  }

  // 4. 返信速度（10点）
  const rt = provider.responseTimeHours ?? 48;
  if (rt <= 6) {
    responsiveness = 10;
    reasons.push({ type: "response_time", label: "返信目安6時間以内", positive: true });
  } else if (rt <= 12) {
    responsiveness = 7;
    reasons.push({ type: "response_time", label: "返信目安12時間以内", positive: true });
  } else if (rt <= 24) {
    responsiveness = 5;
    reasons.push({ type: "response_time", label: "返信目安24時間以内", positive: true });
  } else {
    responsiveness = 2;
  }

  // 5. 施工実績（max 10点）
  const countScore = Math.min(10, Math.round((provider.completedCount / 200) * 10));
  specializations += countScore;
  if (provider.completedCount >= 500) {
    reasons.push({ type: "completed_count", label: `施工実績${provider.completedCount}件以上`, positive: true });
  }

  // 6. 法人・旅館・寺社等の特殊対応（15点）
  let specialBonus = 0;
  if (condition.isCorporate && provider.acceptsCorporate) {
    specialBonus += 5;
    reasons.push({ type: "corporate", label: "法人・管理会社対応", positive: true });
  }
  if (condition.needsRyokan && provider.acceptsRyokan) {
    specialBonus += 5;
    reasons.push({ type: "ryokan", label: "旅館・宿泊施設対応", positive: true });
  }
  if (condition.needsTempleShrine && provider.acceptsTempleShrine) {
    specialBonus += 5;
    reasons.push({ type: "temple", label: "寺社対応", positive: true });
  }
  if (condition.needsWeekend && provider.canWeekendResponse) {
    specialBonus += 3;
    reasons.push({ type: "weekend", label: "土日対応", positive: true });
  }
  if (condition.needsPhotoEstimate && provider.hasPhotoEstimate) {
    specialBonus += 2;
    reasons.push({ type: "photo_estimate", label: "写真見積もり対応", positive: true });
  }
  if (condition.needsInvoice && provider.acceptsInvoice) {
    specialBonus += 2;
    reasons.push({ type: "invoice", label: "インボイス対応", positive: true });
  }
  specializations += Math.min(15, specialBonus);

  // 7. 料金帯（5点）
  if (condition.priceMax && provider.startingPrice) {
    if (provider.startingPrice <= condition.priceMax) {
      price = 5;
      reasons.push({ type: "price", label: `料金目安${provider.startingPrice.toLocaleString()}円/${provider.startingPriceUnit}〜`, positive: true });
    }
  } else {
    price = 3; // 未指定は中間点
  }

  // 合計（100点満点）
  const total = Math.min(100, area + service + quality + responsiveness + Math.min(15, specializations) + price + schedule);

  return {
    total,
    breakdown: {
      area,
      service,
      schedule,
      price,
      quality,
      responsiveness,
      specializations: Math.min(15, specializations),
    },
    reasons,
  };
}

// ─── マッチング実行 ──────────────────────────────────────────
export function getMatchingProviders(
  condition: MatchingCondition,
  limit = 5
): MatchingResult[] {
  const activeProviders = MOCK_PROVIDERS.filter((p) => p.status === "active");

  const scored = activeProviders.map((p) => ({
    provider: p,
    score: calcMatchingScore(p, condition),
  }));

  scored.sort((a, b) => b.score.total - a.score.total);

  const top = scored.slice(0, limit);

  return top.map((item, idx) => ({
    providerId: item.provider.id,
    score: item.score,
    rank: idx + 1,
    isSample: item.provider.isSample,
    createdAt: new Date().toISOString(),
  }));
}

// ─── 業者IDからProvider取得（マッチング結果表示用） ──────────
export function getProviderFromResults(
  results: MatchingResult[]
): Array<{ result: MatchingResult; provider: Provider }> {
  return results
    .map((r) => {
      const provider = MOCK_PROVIDERS.find((p) => p.id === r.providerId);
      if (!provider) return null;
      return { result: r, provider };
    })
    .filter((item): item is { result: MatchingResult; provider: Provider } => item !== null);
}
