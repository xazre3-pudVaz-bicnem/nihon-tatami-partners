"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { SITE_CONFIG, NAV_ITEMS } from "@/data/site";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-sm shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* ロゴ */}
          <Link
            href="/"
            className="flex flex-col leading-tight"
            aria-label="日本畳パートナーズ トップページ"
          >
            <span
              className={`text-xs tracking-widest transition-colors duration-300 ${
                scrolled ? "text-ai" : "text-kiji-dark"
              }`}
            >
              NIHON TATAMI PARTNERS
            </span>
            <span
              className={`text-lg font-serif tracking-wider transition-colors duration-300 ${
                scrolled ? "text-sumi" : "text-white"
              }`}
              style={{ fontFamily: "var(--font-serif)" }}
            >
              日本畳パートナーズ
            </span>
          </Link>

          {/* デスクトップナビ */}
          <nav className="hidden lg:flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={`text-sm tracking-wide py-2 transition-colors duration-300 ${
                    scrolled ? "text-sumi hover:text-ai" : "text-white/90 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
                {"children" in item && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 mt-1 bg-white shadow-lg border border-border min-w-48 py-2">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-sumi hover:bg-kiji hover:text-ai transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTAボタン */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/quote/new"
              className={`px-4 py-2 text-sm tracking-wide transition-all duration-300 ${
                scrolled ? "text-sumi/60 hover:text-ai" : "text-white/70 hover:text-white"
              }`}
            >
              一括見積もり
            </Link>
            <Link
              href="/compare"
              className={`px-4 py-2 text-sm tracking-wide transition-all duration-300 ${
                scrolled ? "text-sumi/60 hover:text-ai" : "text-white/70 hover:text-white"
              }`}
            >
              業者を比較
            </Link>
            <Link
              href="/mypage"
              className={`px-4 py-2 text-sm tracking-wide transition-all duration-300 flex items-center gap-1.5 ${
                scrolled ? "text-sumi/60 hover:text-ai" : "text-white/70 hover:text-white"
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              マイページ
            </Link>
            <Link
              href="/quote/new"
              className="px-5 py-2.5 text-sm tracking-wide bg-kincya text-white hover:bg-do transition-all duration-300"
            >
              無料で見積もり
            </Link>
          </div>

          {/* モバイルハンバーガー */}
          <button
            className="lg:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="メニュー"
          >
            <span
              className={`block w-6 h-0.5 transition-all duration-300 ${
                scrolled ? "bg-sumi" : "bg-white"
              } ${mobileOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block w-6 h-0.5 transition-all duration-300 ${
                scrolled ? "bg-sumi" : "bg-white"
              } ${mobileOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-6 h-0.5 transition-all duration-300 ${
                scrolled ? "bg-sumi" : "bg-white"
              } ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* モバイルメニュー */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-border">
          <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {NAV_ITEMS.map((item) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  className="block py-3 text-sumi border-b border-kiji text-sm tracking-wide"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
                {"children" in item && (
                  <div className="pl-4 space-y-1 py-2">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block py-2 text-sm text-sumi-light hover:text-ai"
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4 flex flex-col gap-3">
              <Link
                href="/quote/new"
                className="text-center py-3 bg-kincya text-white text-sm tracking-wide"
                onClick={() => setMobileOpen(false)}
              >
                無料で一括見積もり
              </Link>
              <Link
                href="/compare"
                className="text-center py-3 border border-ai text-ai text-sm tracking-wide"
                onClick={() => setMobileOpen(false)}
              >
                業者を比較する
              </Link>
              <Link
                href="/mypage"
                className="text-center py-3 border border-sumi/20 text-sumi/60 text-sm tracking-wide"
                onClick={() => setMobileOpen(false)}
              >
                マイページ
              </Link>
              <a
                href={`tel:${SITE_CONFIG.telRaw}`}
                className="text-center py-3 bg-sumi text-white text-sm tracking-wide"
              >
                {SITE_CONFIG.tel}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
