"use client";

import { useState } from "react";
import type { FAQ } from "@/lib/types";

interface FAQSectionProps {
  items: FAQ[];
  title?: string;
  subtitle?: string;
}

export default function FAQSection({
  items,
  title = "よくある質問",
  subtitle,
}: FAQSectionProps) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="section-py bg-kiji/40">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* ヘッダー */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-10 bg-kincya" />
            <span className="text-xs tracking-widest text-kincya uppercase">FAQ</span>
            <div className="h-px w-10 bg-kincya" />
          </div>
          <h2
            className="text-2xl md:text-3xl text-sumi"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {title}
          </h2>
          {subtitle && (
            <p className="text-sm text-sumi/60 mt-3">{subtitle}</p>
          )}
        </div>

        {/* FAQ一覧 */}
        <div className="space-y-2">
          {items.map((item, i) => (
            <div key={i} className="border border-border bg-white">
              <button
                className="w-full text-left px-6 py-5 flex items-start gap-4 hover:bg-kiji/30 transition-colors"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span className="text-kincya font-serif text-lg shrink-0 mt-0.5">Q</span>
                <span className="text-sm md:text-base text-sumi leading-relaxed flex-1">
                  {item.question}
                </span>
                <span className="text-sumi/40 text-lg shrink-0 transition-transform duration-300" style={{ transform: open === i ? 'rotate(45deg)' : 'none' }}>+</span>
              </button>
              {open === i && (
                <div className="px-6 pb-5 pt-0">
                  <div className="pl-9 border-t border-kiji pt-4">
                    <div className="flex gap-4">
                      <span className="text-ai font-serif text-lg shrink-0">A</span>
                      <p className="text-sm md:text-base text-sumi/80 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
