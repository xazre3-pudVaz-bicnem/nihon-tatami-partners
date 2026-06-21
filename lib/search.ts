import type { Provider } from "@/lib/types";
import { MOCK_PROVIDERS } from "@/data/providers";

// URLのsearchParams（文字列ベース）から業者を検索・ソートするServer用ヘルパー
// TODO: Supabase移行後はここをServer ActionまたはDBクエリに変更
export interface RawSearchParams {
  [key: string]: string | string[] | undefined;
}

export type SortKey =
  | "recommended"
  | "rating"
  | "review_count"
  | "price_asc"
  | "newest"
  | "response_time"
  | "completed_count";

const get = (sp: RawSearchParams, key: string): string | undefined => {
  const v = sp[key];
  return Array.isArray(v) ? v[0] : v;
};

const isTrue = (sp: RawSearchParams, key: string) => get(sp, key) === "true";

export function filterAndSortProviders(sp: RawSearchParams): {
  providers: Provider[];
  total: number;
  page: number;
  limit: number;
  sortBy: SortKey;
} {
  let result = MOCK_PROVIDERS.filter((p) => p.status === "active");

  const city = get(sp, "city");
  if (city) result = result.filter((p) => p.serviceAreas.some((a) => a.includes(city)) || p.city.includes(city));

  const category = get(sp, "category");
  // categoryは表示用（業者はカテゴリ横断のため絞り込みは限定的）。将来ProviderServiceで厳密化。

  const rating = get(sp, "rating");
  if (rating) result = result.filter((p) => p.averageRating >= parseFloat(rating));

  const reviewMin = get(sp, "reviewMin");
  if (reviewMin) result = result.filter((p) => p.reviewCount >= parseInt(reviewMin, 10));

  if (isTrue(sp, "sameDayResponse")) result = result.filter((p) => p.canSameDayResponse);
  if (isTrue(sp, "weekendResponse")) result = result.filter((p) => p.canWeekendResponse);
  if (isTrue(sp, "hasLicense")) result = result.filter((p) => (p.licenses?.length ?? 0) > 0);
  if (isTrue(sp, "hasInsurance")) result = result.filter((p) => p.hasInsurance);
  if (isTrue(sp, "acceptsCorporate")) result = result.filter((p) => p.acceptsCorporate);
  if (isTrue(sp, "acceptsRealEstate")) result = result.filter((p) => p.acceptsRealEstate);
  if (isTrue(sp, "acceptsRyokan")) result = result.filter((p) => p.acceptsRyokan);
  if (isTrue(sp, "acceptsTempleShrine")) result = result.filter((p) => p.acceptsTempleShrine);
  if (isTrue(sp, "hasFurnitureMove")) result = result.filter((p) => p.hasFurnitureMove);
  if (isTrue(sp, "parkingFree")) result = result.filter((p) => p.parkingFree);
  if (isTrue(sp, "hasEstimateFree")) result = result.filter((p) => p.hasEstimateFree);
  if (isTrue(sp, "acceptsCard")) result = result.filter((p) => p.acceptsCard);
  if (isTrue(sp, "canOnlineConsult")) result = result.filter((p) => p.canOnlineConsult);
  if (isTrue(sp, "hasPhotoEstimate")) result = result.filter((p) => p.hasPhotoEstimate);
  if (isTrue(sp, "hasOldTatamiDisposal")) result = result.filter((p) => p.hasOldTatamiDisposal);
  if (isTrue(sp, "acceptsInvoice")) result = result.filter((p) => p.acceptsInvoice);
  if (isTrue(sp, "nightConsultation")) result = result.filter((p) => p.canNightConsultation);

  const priceMax = get(sp, "priceMax");
  if (priceMax) result = result.filter((p) => !p.startingPrice || p.startingPrice <= parseInt(priceMax, 10));

  const total = result.length;
  const sortBy = (get(sp, "sortBy") as SortKey) || "recommended";

  switch (sortBy) {
    case "rating":
      result.sort((a, b) => b.averageRating - a.averageRating);
      break;
    case "review_count":
      result.sort((a, b) => b.reviewCount - a.reviewCount);
      break;
    case "price_asc":
      result.sort((a, b) => (a.startingPrice ?? 9e9) - (b.startingPrice ?? 9e9));
      break;
    case "newest":
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      break;
    case "response_time":
      result.sort((a, b) => (a.responseTimeHours ?? 9e9) - (b.responseTimeHours ?? 9e9));
      break;
    case "completed_count":
      result.sort((a, b) => b.completedCount - a.completedCount);
      break;
    default:
      result.sort((a, b) => (a.rank ?? 99) - (b.rank ?? 99));
  }

  const page = parseInt(get(sp, "page") || "1", 10);
  const limit = 10;
  const start = (page - 1) * limit;
  const paged = result.slice(start, start + limit);

  return { providers: paged, total, page, limit, sortBy };
}
