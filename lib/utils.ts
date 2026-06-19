import type { Provider, SearchParams } from "@/lib/types";
import { MOCK_PROVIDERS } from "@/data/providers";

export function formatRating(rating: number): string {
  return rating.toFixed(1);
}

export function formatPrice(price: number): string {
  return price.toLocaleString("ja-JP");
}

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}

export function formatDateShort(dateStr: string): string {
  const d = new Date(dateStr);
  return `${d.getMonth() + 1}/${d.getDate()}`;
}

export function timeAgo(dateStr: string): string {
  const now = new Date();
  const d = new Date(dateStr);
  const diffMs = now.getTime() - d.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "今日";
  if (diffDays === 1) return "昨日";
  if (diffDays < 7) return `${diffDays}日前`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}週間前`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)}ヶ月前`;
  return `${Math.floor(diffDays / 365)}年前`;
}

export function renderStars(rating: number): string {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return "★".repeat(full) + (half ? "☆" : "") + "☆".repeat(empty);
}

export function getResponseTimeLabel(hours?: number): string {
  if (!hours) return "—";
  if (hours <= 2) return "2時間以内";
  if (hours <= 6) return "6時間以内";
  if (hours <= 12) return "12時間以内";
  if (hours <= 24) return "24時間以内";
  return `${hours}時間以内`;
}

export function truncate(str: string, max: number): string {
  if (str.length <= max) return str;
  return str.slice(0, max) + "…";
}

export function searchProviders(params: SearchParams): { providers: Provider[]; total: number } {
  let result = MOCK_PROVIDERS.filter((p) => p.status === "active");

  if (params.city) {
    result = result.filter((p) => p.serviceAreas.some((a) => a.includes(params.city!)));
  }
  if (params.rating) {
    result = result.filter((p) => p.averageRating >= params.rating!);
  }
  if (params.sameDayResponse) {
    result = result.filter((p) => p.canSameDayResponse);
  }
  if (params.weekendResponse) {
    result = result.filter((p) => p.canWeekendResponse);
  }
  if (params.nightConsultation) {
    result = result.filter((p) => p.canNightConsultation);
  }
  if (params.acceptsCorporate) {
    result = result.filter((p) => p.acceptsCorporate);
  }
  if (params.acceptsRyokan) {
    result = result.filter((p) => p.acceptsRyokan);
  }
  if (params.acceptsTempleShrine) {
    result = result.filter((p) => p.acceptsTempleShrine);
  }
  if (params.acceptsRealEstate) {
    result = result.filter((p) => p.acceptsRealEstate);
  }
  if (params.hasInsurance) {
    result = result.filter((p) => p.hasInsurance);
  }
  if (params.hasEstimateFree) {
    result = result.filter((p) => p.hasEstimateFree);
  }
  if (params.parkingFree) {
    result = result.filter((p) => p.parkingFree);
  }
  if (params.hasFurnitureMove) {
    result = result.filter((p) => p.hasFurnitureMove);
  }
  if (params.acceptsCard) {
    result = result.filter((p) => p.acceptsCard);
  }
  if (params.canOnlineConsult) {
    result = result.filter((p) => p.canOnlineConsult);
  }

  const total = result.length;

  switch (params.sortBy) {
    case "rating":
      result.sort((a, b) => b.averageRating - a.averageRating);
      break;
    case "review_count":
      result.sort((a, b) => b.reviewCount - a.reviewCount);
      break;
    case "newest":
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      break;
    default:
      result.sort((a, b) => (a.rank ?? 99) - (b.rank ?? 99));
  }

  const page = params.page ?? 1;
  const limit = params.limit ?? 12;
  const start = (page - 1) * limit;
  result = result.slice(start, start + limit);

  return { providers: result, total };
}

export function buildProviderSlug(id: string): string {
  return `/providers/${id}`;
}

export function buildCategoryPath(categorySlug: string): string {
  return `/saitama/${categorySlug}`;
}

export function buildCityPath(citySlug: string, categorySlug?: string): string {
  if (categorySlug) return `/saitama/${citySlug}/${categorySlug}`;
  return `/saitama/${citySlug}`;
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
