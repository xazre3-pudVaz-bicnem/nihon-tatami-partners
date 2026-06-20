import Link from "next/link";
import { SITE_CONFIG } from "@/data/site";

interface CTASectionProps {
  title?: string;
  description?: string;
  showBusiness?: boolean;
  className?: string;
}

export default function CTASection({
  title = "畳・内装のことはお気軽にご相談ください",
  description = "無料で現地確認・お見積もりを行います。法人様・管理会社様のご依頼もお受けしています。",
  showBusiness = true,
  className = "",
}: CTASectionProps) {
  return (
    <section className={`bg-ai text-white py-16 md:py-20 ${className}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* 装飾線 */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px w-16 bg-kincya/60" />
          <span className="text-xs tracking-widest text-kincya">CONTACT</span>
          <div className="h-px w-16 bg-kincya/60" />
        </div>

        <h2
          className="text-2xl md:text-3xl text-white mb-4"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {title}
        </h2>
        <p className="text-white/70 text-sm md:text-base mb-10 max-w-xl mx-auto leading-relaxed">
          {description}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="px-8 py-4 border border-kincya text-kincya hover:bg-kincya hover:text-white transition-all duration-300 text-sm tracking-wider"
          >
            無料見積もりを申し込む
          </Link>
          {showBusiness && (
            <Link
              href="/for-business"
              className="px-8 py-4 border border-white/40 text-white hover:border-white transition-all duration-300 text-sm tracking-wider"
            >
              法人・管理会社の相談
            </Link>
          )}
          <Link
            href="/bulk-quote"
            className="px-8 py-4 bg-white text-ai hover:bg-kiji transition-all duration-300 text-sm tracking-wider"
          >
            一括見積もりを依頼
          </Link>
        </div>

        <p className="text-white/40 text-xs mt-6">{SITE_CONFIG.hours}</p>
      </div>
    </section>
  );
}
