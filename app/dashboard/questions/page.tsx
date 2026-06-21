"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { formatDate } from "@/lib/utils";

type QuestionStatus = "pending" | "answered";

interface Question {
  id: string;
  body: string;
  createdAt: string;
  status: QuestionStatus;
  answer?: string;
}

const MOCK_QUESTIONS: Question[] = [
  {
    id: "q-001",
    body: "畳の表替えと新調の違いを教えてください。どちらが費用対効果が高いですか？",
    createdAt: "2026-06-18T09:30:00Z",
    status: "pending",
  },
  {
    id: "q-002",
    body: "琉球畳（半帖タイプ）の6帖間への施工は対応していますか？費用の目安も教えてください。",
    createdAt: "2026-06-15T14:20:00Z",
    status: "pending",
  },
  {
    id: "q-003",
    body: "退去時の原状回復として畳の表替えをお願いしたい場合、立ち合いは必要ですか？",
    createdAt: "2026-06-10T11:00:00Z",
    status: "answered",
    answer:
      "立ち合いは基本的に不要です。鍵の受け渡し方法さえご調整いただければ、ご不在でも施工可能です。施工後に写真報告をお送りしますのでご安心ください。",
  },
];

type Tab = "pending" | "answered";

export default function DashboardQuestionsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("pending");
  const [answerInputs, setAnswerInputs] = useState<Record<string, string>>({});
  const [answeredIds, setAnsweredIds] = useState<string[]>([]);

  const pendingQuestions = MOCK_QUESTIONS.filter(
    (q) => q.status === "pending" && !answeredIds.includes(q.id)
  );
  const answeredQuestions = [
    ...MOCK_QUESTIONS.filter((q) => q.status === "answered"),
    ...MOCK_QUESTIONS.filter((q) => answeredIds.includes(q.id)),
  ];

  const displayQuestions =
    activeTab === "pending" ? pendingQuestions : answeredQuestions;

  const handleAnswer = (questionId: string) => {
    if (!answerInputs[questionId]?.trim()) return;
    // TODO: Supabase に回答を保存
    setAnsweredIds((prev) => [...prev, questionId]);
  };

  return (
    <DashboardLayout currentPath="/dashboard/questions">
      <div>
        <h1
          className="text-xl text-sumi mb-1"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Q&A管理
        </h1>
        <p className="text-xs text-sumi/50 mb-5">
          Q&Aに回答することで、ユーザーからの信頼が高まります
        </p>

        {/* タブ */}
        <div className="flex border-b border-border mb-5">
          <button
            onClick={() => setActiveTab("pending")}
            className={`text-sm px-4 py-2.5 border-b-2 transition-colors duration-150 ${
              activeTab === "pending"
                ? "border-ai text-ai font-medium"
                : "border-transparent text-sumi/50 hover:text-sumi"
            }`}
          >
            回答待ち
            {pendingQuestions.length > 0 && (
              <span className="ml-1.5 text-xs bg-do text-white px-1.5 py-0.5 rounded-full">
                {pendingQuestions.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("answered")}
            className={`text-sm px-4 py-2.5 border-b-2 transition-colors duration-150 ${
              activeTab === "answered"
                ? "border-ai text-ai font-medium"
                : "border-transparent text-sumi/50 hover:text-sumi"
            }`}
          >
            回答済み
          </button>
        </div>

        {/* 質問一覧 */}
        {displayQuestions.length === 0 ? (
          <div className="bg-white border border-border p-12 text-center">
            <p className="text-sm text-sumi/50 mb-1">
              {activeTab === "pending"
                ? "回答待ちの質問はありません"
                : "まだ回答済みの質問はありません"}
            </p>
            {activeTab === "pending" && (
              <p className="text-xs text-sumi/40">
                ユーザーから質問が届くとここに表示されます
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {displayQuestions.map((question) => {
              const isAnswered =
                question.status === "answered" ||
                answeredIds.includes(question.id);
              return (
                <div
                  key={question.id}
                  className="bg-white border border-border p-5"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`text-xs px-2 py-0.5 ${
                            isAnswered
                              ? "bg-igusa/10 border border-igusa/30 text-igusa"
                              : "bg-do/10 border border-do/30 text-do"
                          }`}
                        >
                          {isAnswered ? "回答済み" : "回答待ち"}
                        </span>
                        <span className="text-xs text-sumi/40">
                          {formatDate(question.createdAt)}
                        </span>
                      </div>
                      <p className="text-sm text-sumi leading-relaxed">
                        Q. {question.body}
                      </p>
                    </div>
                  </div>

                  {isAnswered ? (
                    <div className="bg-kiji/50 border-l-2 border-ai p-3 mt-3">
                      <p className="text-xs text-sumi/50 mb-1">業者からの回答</p>
                      <p className="text-xs text-sumi leading-relaxed">
                        {question.answer || answerInputs[question.id]}
                      </p>
                    </div>
                  ) : (
                    <div className="mt-3 border-t border-kiji pt-3">
                      <p className="text-xs text-sumi/50 mb-2">回答を投稿する</p>
                      <textarea
                        value={answerInputs[question.id] || ""}
                        onChange={(e) =>
                          setAnswerInputs((prev) => ({
                            ...prev,
                            [question.id]: e.target.value,
                          }))
                        }
                        rows={3}
                        placeholder="丁寧な回答がユーザーの信頼につながります"
                        className="w-full border border-border text-xs px-3 py-2 focus:outline-none focus:border-ai resize-none mb-2"
                      />
                      <button
                        onClick={() => handleAnswer(question.id)}
                        className="text-xs bg-ai text-white px-4 py-1.5 hover:opacity-80 transition-opacity"
                      >
                        回答する
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
