"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

interface Props {
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  visible?: boolean;
}

export default function StickyBottomCTA({
  primaryLabel = "無料で見積もりを依頼",
  primaryHref = "/bulk-quote",
  secondaryLabel = "業者を比較する",
  secondaryHref = "/search",
  visible = true,
}: Props) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible || !show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-border shadow-lg">
      <div className="flex gap-2 p-3 max-w-lg mx-auto">
        <Link
          href={secondaryHref}
          className="flex-1 text-center text-sm border border-ai text-ai py-3 font-medium active:bg-ai active:text-white transition-colors"
        >
          {secondaryLabel}
        </Link>
        <Link
          href={primaryHref}
          className="flex-1 text-center text-sm bg-kincya text-white py-3 font-bold active:bg-do transition-colors"
        >
          {primaryLabel}
        </Link>
      </div>
    </div>
  );
}
