// ============================================================
// 日本畳パートナー — マーケットプレイス型定義
// ============================================================

// ─── 基本エンティティ ─────────────────────────────────────

export type ServiceCategory = "tatami" | "interior" | "restoration";

export interface Prefecture {
  id: string;
  name: string;
  slug: string;
}

export interface City {
  id: string;
  prefectureId: string;
  name: string;
  slug: string;
  postalCode?: string;
  lat?: number;
  lng?: number;
  description?: string;
  populationNote?: string;
}

export interface ServiceCategoryDef {
  id: string;
  slug: string;
  href: string;
  name: string;
  shortName: string;
  group: "tatami" | "washitsu" | "restoration";
  description: string;
  priceFrom?: number;
  unit?: string;
  icon?: string;
  popular?: boolean;
  // 拡張フィールド（SEO・ナビゲーション・マーケティング）
  parentSlug?: string;
  legacyHrefs?: string[];
  seoTitle?: string;
  seoDescription?: string;
  h1?: string;
  keywords?: string[];
  relatedCategoryIds?: string[];
  image?: string;
  alt?: string;
  isPopular?: boolean;
  targetUsers?: string[];
  businessUseCases?: string[];
}

// ─── ユーザー ─────────────────────────────────────────────

export type UserRole = "user" | "provider" | "admin";

export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
  phone?: string;
  prefecture?: string;
  city?: string;
  deletedAt?: string | null;
}

// ─── 業者 ─────────────────────────────────────────────────

export type ProviderStatus = "pending" | "active" | "suspended" | "rejected";
export type ProviderPlan = "free" | "standard" | "premium";

export interface Badge {
  id: string;
  label: string;
  color?: "gold" | "green" | "blue" | "gray";
}

export interface Provider {
  id: string;
  userId: string;
  companyName: string;
  tradeName?: string;
  representativeName: string;
  contactName?: string;
  phone?: string;
  email?: string;
  prefecture: string;
  city: string;
  address?: string;
  postalCode?: string;
  status: ProviderStatus;
  plan: ProviderPlan;
  catchCopy: string;
  introduction: string;
  strengths?: string[];
  foundedYear?: number;
  yearsOfExperience?: number;
  licenses?: string[];
  associations?: string[];
  hasInsurance: boolean;
  insuranceDetail?: string;
  acceptsCorporate: boolean;
  acceptsRyokan: boolean;
  acceptsTempleShrine: boolean;
  acceptsRealEstate: boolean;
  serviceAreas: string[];
  businessHours?: string;
  closedDays?: string;
  averageRating: number;
  reviewCount: number;
  completedCount: number;
  responseTimeHours?: number;
  canSameDayResponse: boolean;
  canWeekendResponse: boolean;
  canNightConsultation: boolean;
  acceptsCard: boolean;
  hasFurnitureMove: boolean;
  parkingFree: boolean;
  canOnlineConsult: boolean;
  hasEstimateFree: boolean;
  thumbnailUrl?: string;
  photos?: string[];
  badges?: Badge[];
  rank?: number;
  startingPrice?: number;
  startingPriceUnit?: string;
  // ─── サンプル / 公開状態フラグ ───
  isSample?: boolean;           // サンプルデータフラグ
  isSampleLabel?: string;       // "掲載イメージ" など
  isVerified?: boolean;         // 本人確認済み
  isPublished?: boolean;        // 公開中
  acceptsInvoice?: boolean;     // インボイス対応
  acceptsPropertyManagement?: boolean; // 管理会社対応
  acceptsStore?: boolean;       // 店舗対応
  hasOldTatamiDisposal?: boolean; // 古畳処分対応
  hasPhotoEstimate?: boolean;   // 写真見積対応
  createdAt: string;
  updatedAt: string;
}

// ─── サービス ──────────────────────────────────────────────

export interface ServicePriceRow {
  label: string;
  price: string;
  note?: string;
}

export interface ProviderService {
  id: string;
  providerId: string;
  categorySlug: string;
  title: string;
  subtitle?: string;
  description: string;
  catchCopy?: string;
  priceFrom?: number;
  priceTo?: number;
  priceLabel: string;
  priceTable?: ServicePriceRow[];
  optionPrices?: ServicePriceRow[];
  travelFee?: string;
  parkingFee?: string;
  workingTimeHours?: number;
  workersCount?: number;
  serviceAreas: string[];
  availableDays?: string;
  photos?: string[];
  workFlow?: string[];
  customerNote?: string;
  cancelPolicy?: string;
  extraChargeCase?: string[];
  cannotHandle?: string[];
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

// ─── 予約・見積 ────────────────────────────────────────────

export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";
export type BuildingType = "house" | "apartment" | "rental" | "office" | "store" | "ryokan" | "temple" | "other";
export type ClientType = "individual" | "corporate" | "realestate" | "management" | "ryokan" | "temple" | "other";

export interface Booking {
  id: string;
  userId: string;
  providerId: string;
  serviceId: string;
  status: BookingStatus;
  serviceCategory: string;
  address: string;
  buildingType: BuildingType;
  tatamiFlex?: number;
  roomCount?: number;
  tatamiFlexi?: string;
  photos?: string[];
  desiredDate1?: string;
  desiredDate2?: string;
  desiredDate3?: string;
  hasParking?: boolean;
  needFurnitureMove?: boolean;
  clientType: ClientType;
  contactMethod?: "email" | "phone" | "line";
  notes?: string;
  estimatedPrice?: number;
  confirmedDate?: string;
  createdAt: string;
  updatedAt: string;
}

export type QuoteStatus = "open" | "responded" | "closed" | "accepted";

export interface QuoteRequest {
  id: string;
  userId: string;
  workType: string;
  address: string;
  photos?: string[];
  desiredPeriod?: string;
  budget?: string;
  needsSiteVisit?: boolean;
  clientType: ClientType;
  notes?: string;
  status: QuoteStatus;
  respondedProviders?: string[];
  acceptedProviderId?: string;
  createdAt: string;
  updatedAt: string;
}

// ─── メッセージ ────────────────────────────────────────────

export type MessageSenderRole = "user" | "provider" | "admin";
export type ThreadStatus = "open" | "pending" | "closed";

export interface MessageThread {
  id: string;
  userId: string;
  providerId: string;
  bookingId?: string;
  quoteId?: string;
  status: ThreadStatus;
  lastMessage?: string;
  lastMessageAt?: string;
  unreadUser?: number;
  unreadProvider?: number;
  createdAt: string;
}

export interface Message {
  id: string;
  threadId: string;
  senderRole: MessageSenderRole;
  senderId: string;
  body: string;
  attachments?: string[];
  proposedPrice?: number;
  proposedDates?: string[];
  readAt?: string;
  createdAt: string;
}

// ─── 口コミ ────────────────────────────────────────────────

export type ReviewStatus = "pending" | "approved" | "rejected";

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatarUrl?: string;
  providerId: string;
  serviceId?: string;
  bookingId?: string;
  rating: number;
  ratingBreakdown?: {
    quality: number;
    price: number;
    speed: number;
    communication: number;
  };
  title?: string;
  body: string;
  photos?: string[];
  usedService?: string;
  serviceDate?: string;
  status: ReviewStatus;
  reply?: ReviewReply;
  helpful?: number;
  isSample?: boolean;
  sampleLabel?: string;
  serviceCategory?: string;
  buildingType?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewReply {
  id: string;
  reviewId: string;
  providerId: string;
  body: string;
  createdAt: string;
}

// ─── お気に入り ────────────────────────────────────────────

export interface Favorite {
  id: string;
  userId: string;
  providerId: string;
  createdAt: string;
}

// ─── 写真・施工事例 ────────────────────────────────────────

export interface Photo {
  id: string;
  providerId: string;
  url: string;
  alt?: string;
  isBefore?: boolean;
  isAfter?: boolean;
  workCaseId?: string;
  createdAt: string;
}

export interface WorkCase {
  id: string;
  providerId: string;
  providerName: string;
  providerSlug?: string;
  title: string;
  categorySlug: string;
  categoryName: string;
  cityName?: string;
  prefectureName?: string;
  description: string;
  challenge?: string;
  proposal?: string;
  point?: string;
  beforePhotoUrl?: string;
  afterPhotoUrl?: string;
  photos?: string[];
  tatamiFlex?: number;
  estimatedCostLabel?: string;
  workingDays?: number;
  buildingType?: BuildingType;
  clientType?: ClientType;
  relatedCategorySlugs?: string[];
  featured?: boolean;
  isSample?: boolean;
  sampleLabel?: string;
  publishedAt: string;
  createdAt: string;
}

// ─── 管理者 ────────────────────────────────────────────────

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: "super" | "editor" | "support";
  createdAt: string;
}

// ─── 通知 ──────────────────────────────────────────────────

export type NotificationType =
  | "booking_new"
  | "booking_confirmed"
  | "booking_completed"
  | "message_new"
  | "review_new"
  | "review_reply"
  | "quote_response"
  | "system";

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  body: string;
  href?: string;
  readAt?: string;
  createdAt: string;
}

// ─── プラン ────────────────────────────────────────────────

export interface Plan {
  id: string;
  name: string;
  slug: ProviderPlan;
  priceMonthly: number;
  features: string[];
  maxServices: number;
  maxPhotos: number;
  topListing: boolean;
  analyticsAccess: boolean;
  prioritySupport: boolean;
}

// ─── 報告・違反 ────────────────────────────────────────────

export type ReportType = "review" | "provider" | "message";
export type ReportStatus = "open" | "under_review" | "resolved" | "dismissed";

export interface Report {
  id: string;
  reporterId: string;
  targetType: ReportType;
  targetId: string;
  reason: string;
  detail?: string;
  status: ReportStatus;
  resolvedAt?: string;
  createdAt: string;
}

// ─── コンテンツ ────────────────────────────────────────────

export interface Article {
  id: string;
  slug: string;
  title: string;
  description: string;
  body: string;
  category: "column" | "news" | "guide" | "help";
  tags?: string[];
  thumbnailUrl?: string;
  authorName?: string;
  publishedAt: string;
  updatedAt?: string;
  readTime?: number;
  isSample?: boolean;
}

export interface FAQ {
  question: string;
  answer: string;
  category?: "general" | "business" | "price" | "process" | "provider" | "area";
}

// ─── 既存互換 (旧型定義) ───────────────────────────────────

export interface Service {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  href: string;
  category: ServiceCategory;
  features?: string[];
  image?: string;
}

export interface Reason {
  id: number;
  title: string;
  description: string;
  icon?: string;
}

export interface WorksItem {
  id: string;
  title: string;
  description: string;
  category: string;
  location?: string;
  image?: string;
  details?: string[];
  date?: string;
}

export interface ColumnArticle {
  slug: string;
  title: string;
  description: string;
  category: string;
  publishedAt: string;
  updatedAt?: string;
  readTime?: number;
  body: string;
  faqs?: FAQ[];
  relatedSlugs?: string[];
  isSample?: boolean;
}

export interface PriceItem {
  name: string;
  unit: string;
  priceMin?: number;
  priceMax?: number;
  priceLabel: string;
  note?: string;
}

export interface FlowStep {
  step: number;
  title: string;
  description: string;
  forBusiness?: string;
}

export interface TargetCard {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  href: string;
  points: string[];
}

export interface WordPressPost {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  date: string;
  modified: string;
  featured_media: number;
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url: string; alt_text: string }>;
    "wp:term"?: Array<Array<{ name: string; slug: string }>>;
  };
}

// ─── 検索・フィルター ──────────────────────────────────────

export interface SearchParams {
  query?: string;
  category?: string;
  city?: string;
  tatamiFlex?: number;
  period?: string;
  sortBy?:
    | "recommended"
    | "rating"
    | "review_count"
    | "price_asc"
    | "newest"
    | "response_time"
    | "completed_count";
  priceMax?: number;
  rating?: number;
  sameDayResponse?: boolean;
  weekendResponse?: boolean;
  nightConsultation?: boolean;
  acceptsCorporate?: boolean;
  acceptsRyokan?: boolean;
  acceptsTempleShrine?: boolean;
  acceptsRealEstate?: boolean;
  hasLicense?: boolean;
  hasInsurance?: boolean;
  hasEstimateFree?: boolean;
  parkingFree?: boolean;
  hasFurnitureMove?: boolean;
  acceptsCard?: boolean;
  canOnlineConsult?: boolean;
  page?: number;
  limit?: number;
}

export interface SearchResult {
  providers: Provider[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}
