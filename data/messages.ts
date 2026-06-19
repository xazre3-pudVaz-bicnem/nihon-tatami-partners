import type { MessageThread, Message } from "@/lib/types";

export const MOCK_THREADS: MessageThread[] = [
  {
    id: "thread-001",
    userId: "user-001",
    providerId: "prov-001",
    status: "open",
    lastMessage: "ご連絡ありがとうございます。来週の火曜日はいかがでしょうか。",
    lastMessageAt: "2025-06-15T14:30:00Z",
    unreadUser: 1,
    unreadProvider: 0,
    createdAt: "2025-06-14T10:00:00Z",
  },
  {
    id: "thread-002",
    userId: "user-002",
    providerId: "prov-003",
    status: "open",
    lastMessage: "写真を確認しました。現地調査なしでも対応できます。",
    lastMessageAt: "2025-06-17T09:00:00Z",
    unreadUser: 1,
    unreadProvider: 0,
    createdAt: "2025-06-16T11:00:00Z",
  },
  {
    id: "thread-003",
    userId: "user-003",
    providerId: "prov-002",
    status: "closed",
    lastMessage: "工事完了しました。ありがとうございました。",
    lastMessageAt: "2025-05-28T16:00:00Z",
    unreadUser: 0,
    unreadProvider: 0,
    createdAt: "2025-05-20T09:00:00Z",
  },
];

export const MOCK_MESSAGES: Message[] = [
  {
    id: "msg-001",
    threadId: "thread-001",
    senderRole: "user",
    senderId: "user-001",
    body: "はじめまして。さいたま市浦和区の一戸建ての和室6畳の畳表替えをお願いしたいのですが、ご対応いただけますか？来月中旬頃を希望しています。",
    createdAt: "2025-06-14T10:00:00Z",
  },
  {
    id: "msg-002",
    threadId: "thread-001",
    senderRole: "provider",
    senderId: "prov-001",
    body: "お問い合わせありがとうございます。さいたま市浦和区は対応エリアです。6畳の表替えも承ります。\n\n来月中旬とのことですが、具体的な希望日を教えていただけますか？また、い草の素材についてご希望がございましたら、お伝えください。",
    proposedDates: ["2025-07-12", "2025-07-13", "2025-07-14"],
    createdAt: "2025-06-14T13:00:00Z",
  },
  {
    id: "msg-003",
    threadId: "thread-001",
    senderRole: "user",
    senderId: "user-001",
    body: "ありがとうございます。7月12日（土）でお願いできますか？素材は国産い草を希望しています。",
    createdAt: "2025-06-15T09:00:00Z",
  },
  {
    id: "msg-004",
    threadId: "thread-001",
    senderRole: "provider",
    senderId: "prov-001",
    body: "ご連絡ありがとうございます。来週の火曜日はいかがでしょうか。\n\n7月12日（土）でご予約承りました。国産い草の特選品をご用意いたします。\n\n見積金額は以下の通りです：\n・6畳 表替え（国産い草・特選品）：45,000円（税込）\n・縁交換：5,500円（税込）\n・合計：50,500円（税込）\n\nご確認いただけますでしょうか。",
    proposedPrice: 50500,
    createdAt: "2025-06-15T14:30:00Z",
  },
];

export function getThreadsByUserId(userId: string): MessageThread[] {
  return MOCK_THREADS.filter((t) => t.userId === userId);
}

export function getThreadsByProviderId(providerId: string): MessageThread[] {
  return MOCK_THREADS.filter((t) => t.providerId === providerId);
}

export function getMessagesByThreadId(threadId: string): Message[] {
  return MOCK_MESSAGES.filter((m) => m.threadId === threadId);
}
