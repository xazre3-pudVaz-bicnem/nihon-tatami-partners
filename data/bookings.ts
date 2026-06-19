import type { Booking, QuoteRequest } from "@/lib/types";

export const MOCK_BOOKINGS: Booking[] = [
  {
    id: "book-001",
    userId: "user-001",
    providerId: "prov-001",
    serviceId: "svc-001",
    status: "confirmed",
    serviceCategory: "tatami-omotegae",
    address: "さいたま市浦和区常盤6丁目",
    buildingType: "house",
    tatamiFlex: 6,
    roomCount: 1,
    desiredDate1: "2025-07-12",
    desiredDate2: "2025-07-13",
    hasParking: true,
    needFurnitureMove: false,
    clientType: "individual",
    contactMethod: "email",
    notes: "国産い草を希望しています。",
    estimatedPrice: 50500,
    confirmedDate: "2025-07-12",
    createdAt: "2025-06-14T10:00:00Z",
    updatedAt: "2025-06-15T14:30:00Z",
  },
  {
    id: "book-002",
    userId: "user-003",
    providerId: "prov-003",
    serviceId: "svc-003",
    status: "completed",
    serviceCategory: "genjoukaifuku",
    address: "越谷市南越谷2丁目",
    buildingType: "apartment",
    tatamiFlex: 4.5,
    roomCount: 1,
    desiredDate1: "2025-03-15",
    hasParking: false,
    needFurnitureMove: false,
    clientType: "management",
    contactMethod: "phone",
    notes: "退去後の原状回復。畳表替えとクロスの張り替えをお願いします。",
    estimatedPrice: 75000,
    confirmedDate: "2025-03-15",
    createdAt: "2025-03-10T09:00:00Z",
    updatedAt: "2025-03-17T16:00:00Z",
  },
  {
    id: "book-003",
    userId: "user-005",
    providerId: "prov-005",
    serviceId: "svc-005",
    status: "pending",
    serviceCategory: "washitsu-reform",
    address: "春日部市中央3丁目",
    buildingType: "house",
    tatamiFlex: 6,
    roomCount: 1,
    desiredDate1: "2025-07-20",
    desiredDate2: "2025-07-21",
    desiredDate3: "2025-07-26",
    hasParking: true,
    needFurnitureMove: true,
    clientType: "individual",
    contactMethod: "line",
    notes: "畳・ふすま・障子・砂壁すべてリフォームしたい。",
    createdAt: "2025-06-18T11:00:00Z",
    updatedAt: "2025-06-18T11:00:00Z",
  },
];

export const MOCK_QUOTE_REQUESTS: QuoteRequest[] = [
  {
    id: "quote-001",
    userId: "user-002",
    workType: "tatami-omotegae",
    address: "川口市本町4丁目",
    desiredPeriod: "7月中旬",
    budget: "50,000円以内",
    needsSiteVisit: false,
    clientType: "individual",
    notes: "4.5畳と6畳の2部屋を一緒にお願いしたい。",
    status: "responded",
    respondedProviders: ["prov-001", "prov-004"],
    createdAt: "2025-06-16T10:00:00Z",
    updatedAt: "2025-06-17T09:00:00Z",
  },
  {
    id: "quote-002",
    userId: "user-004",
    workType: "genjoukaifuku",
    address: "越谷市レイクタウン",
    desiredPeriod: "できるだけ早め",
    budget: "相談",
    needsSiteVisit: true,
    clientType: "realestate",
    notes: "売買前の物件の原状回復。畳・クロス・CF全対応の業者を探しています。",
    status: "open",
    respondedProviders: [],
    createdAt: "2025-06-19T08:00:00Z",
    updatedAt: "2025-06-19T08:00:00Z",
  },
];

export function getBookingsByUserId(userId: string): Booking[] {
  return MOCK_BOOKINGS.filter((b) => b.userId === userId);
}

export function getBookingsByProviderId(providerId: string): Booking[] {
  return MOCK_BOOKINGS.filter((b) => b.providerId === providerId);
}

export function getQuotesByUserId(userId: string): QuoteRequest[] {
  return MOCK_QUOTE_REQUESTS.filter((q) => q.userId === userId);
}
