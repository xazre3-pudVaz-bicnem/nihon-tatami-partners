// ─── Platform-specific types for 日本畳パートナーズ ───────────────────────────
// All entities have isSample: true when displaying demo data.

// ─────────────────────────────────────────────────────────────────────────────
// Request Wizard / かんたん依頼診断
// ─────────────────────────────────────────────────────────────────────────────
export interface RequestAnswer {
  stepKey: string;
  stepLabel: string;
  values: string[];
}

export interface DiagnosisResult {
  recommendedService: string; // e.g. 'tatami-omotegae'
  serviceLabel: string;
  confidence: "high" | "medium" | "low";
  priceRange: { min: number; max: number; unit: string };
  reasons: string[];
  additionalCostWarnings: string[];
  suggestedProviderIds?: string[];
  createdAt: string;
}

export interface RequestWizardSession {
  id: string;
  sessionToken: string;
  step: number;
  answers: RequestAnswer[];
  diagnosisResult?: DiagnosisResult;
  contactInfo?: {
    name: string;
    email?: string;
    phone?: string;
    city: string;
    isCorporate?: boolean;
    companyName?: string;
  };
  status: "in_progress" | "completed" | "abandoned";
  isSample?: boolean;
  createdAt: string;
  updatedAt: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Matching / おまかせマッチング
// ─────────────────────────────────────────────────────────────────────────────
export interface MatchingCondition {
  city?: string;
  serviceCategory?: string;
  schedule?: string;
  priceMax?: number;
  isCorporate?: boolean;
  propertyType?: string;
  needsLicense?: boolean;
  needsInsurance?: boolean;
  needsRyokan?: boolean;
  needsTempleShrine?: boolean;
  needsRealEstate?: boolean;
  needsSameDay?: boolean;
  needsWeekend?: boolean;
  needsPhotoEstimate?: boolean;
  needsInvoice?: boolean;
}

export type MatchingReasonType =
  | "area"
  | "service"
  | "schedule"
  | "price"
  | "rating"
  | "response_time"
  | "license"
  | "corporate"
  | "ryokan"
  | "temple"
  | "photo_estimate"
  | "invoice"
  | "weekend"
  | "completed_count";

export interface MatchingReason {
  type: MatchingReasonType;
  label: string;
  positive: boolean;
}

export interface MatchingScore {
  total: number; // 0–100
  breakdown: {
    area: number;
    service: number;
    schedule: number;
    price: number;
    quality: number;
    responsiveness: number;
    specializations: number;
  };
  reasons: MatchingReason[];
}

export interface MatchingResult {
  providerId: string;
  score: MatchingScore;
  rank: number;
  isSample?: boolean;
  createdAt: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Bulk Quote / 一括見積もり
// ─────────────────────────────────────────────────────────────────────────────
export interface EstimateBreakdown {
  tatamiOmotegae?: number;
  tatamiShinchou?: number;
  tatamiUragaeshi?: number;
  fusumaHarikae?: number;
  shojiHarikae?: number;
  oldTatamiDisposal?: number;
  furnitureMove?: number;
  travel?: number;
  parking?: number;
  inspection?: number;
  other?: number;
  total: number;
  unitLabel: string; // e.g. "6畳の場合"
  note?: string;
}

export interface BulkQuoteProvider {
  providerId: string;
  status: "pending" | "replied" | "declined" | "selected" | "not_selected";
  repliedAt?: string;
  estimateTotal?: number;
  estimateBreakdown?: EstimateBreakdown;
  availableDates?: string[];
  earliestDate?: string;
  paymentMethods?: string[];
  notes?: string;
  isSample?: boolean;
}

export interface BulkQuote {
  id: string;
  userId?: string;
  sessionId?: string;
  services: string[];
  propertyType: string;
  tatamiCount: string;
  city: string;
  prefecture: string;
  schedule: string;
  notes?: string;
  photos?: string[];
  providerIds: string[];
  providers: BulkQuoteProvider[];
  status: "draft" | "sent" | "receiving" | "completed" | "expired";
  isSample?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface QuoteComparison {
  bulkQuoteId: string;
  providers: {
    providerId: string;
    totalEstimate?: number;
    breakdown?: EstimateBreakdown;
    earliestDate?: string;
    responseTimeHours?: number;
    paymentMethods?: string[];
  }[];
  createdAt: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Photo Estimate / 写真見積もり
// ─────────────────────────────────────────────────────────────────────────────
export type PhotoEstimateImageType =
  | "whole_room"
  | "damaged_area"
  | "full_tatami"
  | "fusuma"
  | "shoji"
  | "under_tatami"
  | "entrance"
  | "other";

export interface PhotoEstimateImage {
  id: string;
  type: PhotoEstimateImageType;
  typeLabel: string;
  url?: string;
  preview?: string; // base64 data URL for local preview
  note?: string;
}

export interface PhotoEstimate {
  id: string;
  images: PhotoEstimateImage[];
  serviceCategory?: string;
  city?: string;
  notes?: string;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  status: "draft" | "submitted" | "replied";
  isSample?: boolean;
  createdAt: string;
  updatedAt: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Concierge / 相談コンシェルジュ
// ─────────────────────────────────────────────────────────────────────────────
export interface ConciergeRequest {
  id: string;
  consultType: string;
  city: string;
  propertyType: string;
  concern: string;
  photos?: string[];
  schedule?: string;
  isCorporate?: boolean;
  companyName?: string;
  name: string;
  email?: string;
  phone?: string;
  notes?: string;
  status: "new" | "in_review" | "responded" | "closed";
  isSample?: boolean;
  createdAt: string;
  updatedAt: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Q&A / 相談掲示板
// ─────────────────────────────────────────────────────────────────────────────
export type QuestionCategory =
  | "price"
  | "material"
  | "process"
  | "rental"
  | "corporate"
  | "ryokan"
  | "temple"
  | "maintenance"
  | "other";

export interface Question {
  id: string;
  authorId?: string;
  authorName: string;
  category: QuestionCategory;
  categoryLabel: string;
  city?: string;
  title: string;
  body: string;
  photos?: string[];
  answerCount: number;
  viewCount: number;
  helpfulCount: number;
  status: "open" | "answered" | "closed";
  isSample?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface QuestionAnswer {
  id: string;
  questionId: string;
  providerId?: string;
  providerName?: string;
  providerCity?: string;
  body: string;
  helpfulCount: number;
  isSelectedAnswer?: boolean;
  isSample?: boolean;
  createdAt: string;
  updatedAt: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Provider Calendar / 業者カレンダー
// ─────────────────────────────────────────────────────────────────────────────
export interface ProviderAvailability {
  date: string; // YYYY-MM-DD
  morning: boolean;
  afternoon: boolean;
  evening: boolean;
  note?: string;
}

export interface ProviderCalendar {
  providerId: string;
  availabilities: ProviderAvailability[];
  closedDates: string[];
  canSameDayConsult: boolean;
  busySeasonMessage?: string;
  updatedAt: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Message Templates / メッセージテンプレート
// ─────────────────────────────────────────────────────────────────────────────
export interface MessageTemplate {
  id: string;
  type: "user" | "provider";
  category:
    | "photo_request"
    | "estimate"
    | "schedule"
    | "additional_cost"
    | "inspection"
    | "confirmation"
    | "other";
  label: string;
  body: string;
}

export interface EstimateTemplate {
  id: string;
  providerId: string;
  name: string;
  items: {
    label: string;
    unit: string;
    unitPrice: number;
    note?: string;
  }[];
  note?: string;
  createdAt: string;
  updatedAt: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Business / 法人・管理会社
// ─────────────────────────────────────────────────────────────────────────────
export interface BusinessProperty {
  id: string;
  requestId: string;
  address: string;
  city: string;
  propertyType: string;
  tatamiCount: string;
  fusuma?: number;
  shoji?: number;
  photos?: string[];
  moveOutDate?: string;
  moveInDate?: string;
  notes?: string;
  status: "pending" | "estimating" | "confirmed" | "completed";
  isSample?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BusinessBulkRequest {
  id: string;
  companyName: string;
  department?: string;
  contactName: string;
  email: string;
  phone?: string;
  requestType: "restoration" | "vacancy" | "renovation" | "maintenance" | "other";
  propertyCount: number;
  properties: BusinessProperty[];
  wantInvoice?: boolean;
  wantContinuousSupport?: boolean;
  notes?: string;
  status: "new" | "in_review" | "matched" | "completed" | "closed";
  isSample?: boolean;
  createdAt: string;
  updatedAt: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// User Saved Features / ユーザー保存機能
// ─────────────────────────────────────────────────────────────────────────────
export interface UserSavedSearch {
  id: string;
  userId: string;
  label?: string;
  params: Record<string, string>;
  isSample?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserRecentlyViewed {
  userId?: string;
  providerId: string;
  viewedAt: string;
}

export interface UserDiagnosisHistory {
  id: string;
  userId?: string;
  sessionId: string;
  diagnosisType: "request" | "material";
  resultSummary: string;
  isSample?: boolean;
  createdAt: string;
  updatedAt: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Analytics / 分析
// ─────────────────────────────────────────────────────────────────────────────
export interface ProviderAnalytics {
  providerId: string;
  period: "daily" | "weekly" | "monthly";
  date: string;
  views: number;
  quoteRequests: number;
  bookings: number;
  messageThreads: number;
  compareAdds: number;
  conversionRate: number;
  areaBreakdown: { city: string; count: number }[];
  serviceBreakdown: { slug: string; count: number }[];
  isSample?: boolean;
}

export interface AdminMatchingLog {
  id: string;
  requestId: string;
  conditions: MatchingCondition;
  results: MatchingResult[];
  totalCandidates: number;
  createdAt: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Material Diagnosis / 素材診断
// ─────────────────────────────────────────────────────────────────────────────
export interface MaterialDiagnosisAnswer {
  key: string;
  label: string;
  selected: boolean;
}

export interface MaterialDiagnosisResult {
  material: string; // e.g. 'igusa', 'washi', 'jushi', 'ryukyu', 'color', 'pet'
  materialLabel: string;
  score: number;
  reasons: string[];
  priceRange: { min: number; max: number; unit: string };
  features: {
    durability: 1 | 2 | 3 | 4 | 5;
    cleanability: 1 | 2 | 3 | 4 | 5;
    appearance: 1 | 2 | 3 | 4 | 5;
    moldResistance: 1 | 2 | 3 | 4 | 5;
    petFriendly: 1 | 2 | 3 | 4 | 5;
    cost: 1 | 2 | 3 | 4 | 5;
  };
}
