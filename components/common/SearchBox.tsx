"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SERVICE_CATEGORIES } from "@/data/categories";
import { SAITAMA_CITIES } from "@/data/cities";

interface Props {
  variant?: "hero" | "inline" | "sticky";
  defaultCategory?: string;
  defaultCity?: string;
}

export default function SearchBox({ variant = "hero", defaultCategory = "", defaultCity = "" }: Props) {
  const router = useRouter();
  const [category, setCategory] = useState(defaultCategory);
  const [city, setCity] = useState(defaultCity);
  const [tatami, setTatami] = useState("");
  const [period, setPeriod] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (city) params.set("city", city);
    if (tatami) params.set("tatami", tatami);
    if (period) params.set("period", period);
    router.push(`/search?${params.toString()}`);
  };

  if (variant === "inline") {
    return (
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="flex-1 border border-border bg-white text-sumi text-sm px-3 py-2.5 focus:outline-none focus:border-ai"
        >
          <option value="">サービスを選択</option>
          <optgroup label="畳工事">
            {SERVICE_CATEGORIES.filter((c) => c.group === "tatami").map((c) => (
              <option key={c.slug} value={c.slug}>{c.name}</option>
            ))}
          </optgroup>
          <optgroup label="和室工事">
            {SERVICE_CATEGORIES.filter((c) => c.group === "washitsu").map((c) => (
              <option key={c.slug} value={c.slug}>{c.name}</option>
            ))}
          </optgroup>
          <optgroup label="内装・原状回復">
            {SERVICE_CATEGORIES.filter((c) => c.group === "restoration").map((c) => (
              <option key={c.slug} value={c.slug}>{c.name}</option>
            ))}
          </optgroup>
        </select>
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="flex-1 border border-border bg-white text-sumi text-sm px-3 py-2.5 focus:outline-none focus:border-ai"
        >
          <option value="">市区町村を選択</option>
          {SAITAMA_CITIES.map((c) => (
            <option key={c.slug} value={c.name}>{c.name}</option>
          ))}
        </select>
        <button type="submit" className="bg-kincya text-white text-sm px-6 py-2.5 hover:bg-do transition-colors whitespace-nowrap">
          検索する
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSearch} className={variant === "hero" ? "w-full max-w-3xl" : "w-full"}>
      <div className="bg-white/95 backdrop-blur-sm border border-white/20 shadow-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-border/50">
          {/* サービスカテゴリ */}
          <div className="p-4">
            <label className="block text-xs text-sumi/50 mb-1.5 tracking-wider">サービス</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full text-sm text-sumi bg-transparent focus:outline-none cursor-pointer appearance-none"
            >
              <option value="">すべてのサービス</option>
              <optgroup label="畳工事">
                {SERVICE_CATEGORIES.filter((c) => c.group === "tatami").map((c) => (
                  <option key={c.slug} value={c.slug}>{c.name}</option>
                ))}
              </optgroup>
              <optgroup label="和室工事">
                {SERVICE_CATEGORIES.filter((c) => c.group === "washitsu").map((c) => (
                  <option key={c.slug} value={c.slug}>{c.name}</option>
                ))}
              </optgroup>
              <optgroup label="内装・原状回復">
                {SERVICE_CATEGORIES.filter((c) => c.group === "restoration").map((c) => (
                  <option key={c.slug} value={c.slug}>{c.name}</option>
                ))}
              </optgroup>
            </select>
          </div>

          {/* エリア */}
          <div className="p-4">
            <label className="block text-xs text-sumi/50 mb-1.5 tracking-wider">エリア（市区町村）</label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full text-sm text-sumi bg-transparent focus:outline-none cursor-pointer appearance-none"
            >
              <option value="">埼玉県内すべて</option>
              {SAITAMA_CITIES.map((c) => (
                <option key={c.slug} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* 畳数 */}
          <div className="p-4">
            <label className="block text-xs text-sumi/50 mb-1.5 tracking-wider">畳数・部屋数</label>
            <select
              value={tatami}
              onChange={(e) => setTatami(e.target.value)}
              className="w-full text-sm text-sumi bg-transparent focus:outline-none cursor-pointer appearance-none"
            >
              <option value="">未定・相談したい</option>
              <option value="4.5">4.5畳（1部屋）</option>
              <option value="6">6畳（1部屋）</option>
              <option value="8">8畳（1部屋）</option>
              <option value="10">10畳以上</option>
              <option value="multi">複数部屋</option>
            </select>
          </div>

          {/* 希望時期 */}
          <div className="p-4">
            <label className="block text-xs text-sumi/50 mb-1.5 tracking-wider">希望時期</label>
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="w-full text-sm text-sumi bg-transparent focus:outline-none cursor-pointer appearance-none"
            >
              <option value="">いつでも</option>
              <option value="asap">できるだけ早く</option>
              <option value="week">1週間以内</option>
              <option value="month">1ヶ月以内</option>
              <option value="3months">3ヶ月以内</option>
              <option value="undecided">未定</option>
            </select>
          </div>
        </div>

        {/* 検索ボタン */}
        <div className="px-4 py-3 bg-sumi/5 flex items-center justify-between gap-4">
          <p className="text-xs text-sumi/40 hidden sm:block">埼玉県内の畳・和室サービスを比較できます</p>
          <button
            type="submit"
            className="w-full sm:w-auto bg-kincya text-white text-sm px-10 py-3 hover:bg-do transition-colors duration-300 tracking-wider"
          >
            業者を探す
          </button>
        </div>
      </div>
    </form>
  );
}
