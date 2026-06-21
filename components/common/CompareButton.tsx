"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "nihontatami_compare_ids";
const MAX_COMPARE = 3;

export function useCompare() {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setIds(JSON.parse(stored));
    } catch {}
  }, []);

  const add = (id: string) => {
    setIds((prev) => {
      if (prev.includes(id) || prev.length >= MAX_COMPARE) return prev;
      const next = [...prev, id];
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  };

  const remove = (id: string) => {
    setIds((prev) => {
      const next = prev.filter((x) => x !== id);
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  };

  const toggle = (id: string) => (ids.includes(id) ? remove(id) : add(id));
  const has = (id: string) => ids.includes(id);
  const isFull = ids.length >= MAX_COMPARE;

  return { ids, toggle, has, isFull };
}

interface Props {
  providerId: string;
}

export default function CompareButton({ providerId }: Props) {
  const { toggle, has, isFull } = useCompare();
  const inList = has(providerId);

  return (
    <button
      onClick={(e) => { e.preventDefault(); toggle(providerId); }}
      className={`text-[10px] px-2 py-1 border transition-colors ${
        inList
          ? "border-ai bg-ai/10 text-ai"
          : isFull
          ? "border-border text-sumi/30 cursor-not-allowed"
          : "border-border text-sumi/50 hover:border-ai hover:text-ai"
      }`}
      disabled={isFull && !inList}
      title={inList ? "比較リストから削除" : isFull ? "比較リストは3社まで" : "比較リストに追加"}
    >
      {inList ? "比較中 ✓" : "比較に追加"}
    </button>
  );
}
