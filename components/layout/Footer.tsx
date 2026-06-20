import Link from "next/link";
import { SITE_CONFIG, FOOTER_LINKS } from "@/data/site";

export default function Footer() {
  return (
    <footer className="bg-sumi text-white">
      {/* メインフッター */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
          {/* ブランド */}
          <div className="col-span-2 lg:col-span-2">
            <div className="mb-4">
              <div className="text-xs tracking-widest text-kiji/60 mb-1">
                NIHON TATAMI PARTNERS
              </div>
              <div
                className="text-xl text-kiji tracking-wider"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                日本畳パートナーズ
              </div>
            </div>
            <p className="text-sm text-white/60 leading-relaxed mb-6 max-w-xs">
              畳を軸に、内装工事・原状回復まで一括対応できる専門パートナーを埼玉県内でお探しいただけます。住宅から旅館・寺社・店舗・賃貸物件まで幅広く対応。
            </p>
            <div className="space-y-2 text-sm text-white/70">
              <div className="flex items-start gap-2">
                <span className="text-kincya shrink-0">お問い合わせ</span>
                <Link href="/contact" className="hover:text-white transition-colors underline underline-offset-2">
                  フォームから受付中
                </Link>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-kincya shrink-0">受付</span>
                <span>{SITE_CONFIG.hours}</span>
              </div>
            </div>
          </div>

          {/* サービス */}
          <div>
            <h3 className="text-xs tracking-widest text-kincya mb-4 uppercase">Services</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* エリア */}
          <div>
            <h3 className="text-xs tracking-widest text-kincya mb-4 uppercase">Area</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.areas.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 法人向け */}
          <div>
            <h3 className="text-xs tracking-widest text-kincya mb-4 uppercase">Business</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.business.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 会社情報・ガイド */}
          <div>
            <h3 className="text-xs tracking-widest text-kincya mb-4 uppercase">Information</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.info.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="text-xs tracking-widest text-kincya mb-4 mt-6 uppercase">Guide</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.guide.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 区切り線 */}
        <div className="gold-line my-12 opacity-30" />

        {/* ボトム */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} 日本畳パートナーズ All Rights Reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-xs text-white/40 hover:text-white/70 transition-colors">
              プライバシーポリシー
            </Link>
            <Link href="/sitemap.xml" className="text-xs text-white/40 hover:text-white/70 transition-colors">
              サイトマップ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
