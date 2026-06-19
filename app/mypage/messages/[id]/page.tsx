"use client";

import { useState } from "react";
import Link from "next/link";
import { MOCK_THREADS, MOCK_MESSAGES, getMessagesByThreadId } from "@/data/messages";
import { MOCK_PROVIDERS } from "@/data/providers";
import { formatDate } from "@/lib/utils";

interface Props { params: Promise<{ id: string }> }

export default function MessageThreadPage({ params }: Props) {
  // TODO: React.use(params) after React 19 stabilizes; for now use client-side workaround
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(MOCK_MESSAGES.filter((m) => m.threadId === "thread-001"));

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages((prev) => [...prev, {
      id: `msg-new-${Date.now()}`,
      threadId: "thread-001",
      senderRole: "user",
      senderId: "user-001",
      body: input,
      createdAt: new Date().toISOString(),
    }]);
    setInput("");
  };

  const thread = MOCK_THREADS[0];
  const provider = MOCK_PROVIDERS.find((p) => p.id === thread?.providerId);

  return (
    <div className="min-h-screen bg-cloud flex flex-col">
      {/* ヘッダー */}
      <div className="bg-white border-b border-border px-4 sm:px-6 py-3 flex items-center gap-3">
        <Link href="/mypage/messages" className="text-sm text-ai hover:underline">← 一覧</Link>
        <div className="w-8 h-8 bg-ai/10 flex items-center justify-center text-sm text-ai font-medium shrink-0">
          {provider?.tradeName?.charAt(0) || "?"}
        </div>
        <div>
          <p className="text-sm font-medium text-sumi">{provider?.tradeName || provider?.companyName}</p>
          <p className="text-xs text-sumi/40">{provider?.city}</p>
        </div>
      </div>

      {/* メッセージ */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-4 max-w-3xl mx-auto w-full">
        {messages.map((msg) => {
          const isUser = msg.senderRole === "user";
          return (
            <div key={msg.id} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
              {!isUser && (
                <div className="w-8 h-8 bg-ai/10 flex items-center justify-center text-xs text-ai font-medium shrink-0 mr-2 mt-1">
                  {provider?.tradeName?.charAt(0)}
                </div>
              )}
              <div className={`max-w-[75%] ${isUser ? "items-end" : "items-start"} flex flex-col`}>
                <div className={`px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                  isUser ? "bg-ai text-white" : "bg-white border border-border text-sumi"
                }`}>
                  {msg.body}
                  {msg.proposedPrice && (
                    <div className="mt-2 pt-2 border-t border-white/20 text-xs">
                      <span className="opacity-70">見積金額：</span>
                      <span className="font-medium">{msg.proposedPrice.toLocaleString()}円（税込）</span>
                    </div>
                  )}
                  {msg.proposedDates && msg.proposedDates.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-white/20 text-xs">
                      <p className="opacity-70 mb-1">提案日程：</p>
                      {msg.proposedDates.map((d) => <p key={d}>{d}</p>)}
                    </div>
                  )}
                </div>
                <p className="text-xs text-sumi/40 mt-1">{formatDate(msg.createdAt)}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* 入力エリア */}
      <div className="bg-white border-t border-border px-4 sm:px-6 py-4">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSend} className="flex gap-3">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="メッセージを入力..."
              rows={2}
              className="flex-1 border border-border text-sm px-3 py-2 focus:outline-none focus:border-ai resize-none"
              onKeyDown={(e) => { if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) handleSend(e); }}
            />
            <button type="submit" className="bg-ai text-white px-5 text-sm hover:bg-ai-light transition-colors self-end py-2">
              送信
            </button>
          </form>
          <p className="text-xs text-sumi/40 mt-1">Ctrl+Enter で送信</p>
        </div>
      </div>
    </div>
  );
}
