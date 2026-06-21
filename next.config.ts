import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.wordpress.com",
      },
      {
        protocol: "https",
        hostname: "secure.gravatar.com",
      },
    ],
  },
  async redirects() {
    return [
      // ─── 旧カテゴリURL → 正規URL ─────────────────────────────────────
      { source: "/saitama/tatami-omotegae",   destination: "/saitama/tatami/omotegae",           permanent: true },
      { source: "/saitama/tatami-uragaeshi",  destination: "/saitama/tatami/uragaeshi",          permanent: true },
      { source: "/saitama/tatami-shinchou",   destination: "/saitama/tatami/shinchou",           permanent: true },
      { source: "/saitama/tatami-shincho",    destination: "/saitama/tatami/shinchou",           permanent: true },
      { source: "/saitama/ryukyu-tatami",     destination: "/saitama/tatami/ryukyu",             permanent: true },
      { source: "/saitama/herinashi-tatami",  destination: "/saitama/tatami/herinashi",          permanent: true },
      { source: "/saitama/washi-tatami",      destination: "/saitama/tatami/washi",              permanent: true },
      { source: "/saitama/kokusandatami",     destination: "/saitama/tatami/kokusan-igusa",      permanent: true },
      { source: "/saitama/color-tatami",      destination: "/saitama/tatami/color",              permanent: true },
      { source: "/saitama/pet-tatami",        destination: "/saitama/tatami/pet",                permanent: true },
      { source: "/saitama/mold-dani-tatami",  destination: "/saitama/tatami/anti-mite-mold",    permanent: true },
      { source: "/saitama/tatami-disposal",   destination: "/saitama/tatami/disposal",           permanent: true },
      { source: "/saitama/tatami-repair",     destination: "/saitama/tatami/repair",             permanent: true },
      { source: "/saitama/tatami-cleaning",   destination: "/saitama/tatami/cleaning",           permanent: true },
      { source: "/saitama/fusuma-harikae",    destination: "/saitama/fusuma/harikae",            permanent: true },
      { source: "/saitama/shoji-harikae",     destination: "/saitama/shoji/harikae",             permanent: true },
      { source: "/saitama/amido-harikae",     destination: "/saitama/amido/harikae",             permanent: true },
      { source: "/saitama/washitsu-reform",   destination: "/saitama/washitsu/reform",           permanent: true },
      { source: "/saitama/sunamikabe-nurikae",destination: "/saitama/washitsu/sunakabe",         permanent: true },
      { source: "/saitama/shiraki-akuarai",   destination: "/saitama/washitsu/akunuki",          permanent: true },
      { source: "/saitama/tokonoma-reform",   destination: "/saitama/washitsu/tokonoma",         permanent: true },
      { source: "/saitama/chasitsu",          destination: "/saitama/washitsu/chashitsu",        permanent: true },
      { source: "/saitama/ryokan-tatami",     destination: "/saitama/ryokan/tatami",             permanent: true },
      { source: "/saitama/temple-shrine-tatami",destination: "/saitama/temple/tatami",           permanent: true },
      { source: "/saitama/rental-tatami",     destination: "/saitama/rental-restoration/tatami", permanent: true },
      { source: "/saitama/genjoukaifuku",     destination: "/saitama/rental-restoration/tatami", permanent: true },
      { source: "/saitama/cloth-harikae",     destination: "/saitama/cross/harikae",             permanent: true },
      { source: "/saitama/cf-harikae",        destination: "/saitama/floor/cushion-floor",       permanent: true },
      { source: "/saitama/flooring-repair",   destination: "/saitama/floor/repair",              permanent: true },
      { source: "/saitama/store-interior",    destination: "/saitama/store/interior",            permanent: true },
      { source: "/saitama/vacancy-reform",    destination: "/saitama/vacancy-reform",            permanent: true },
      { source: "/saitama/management-tatami", destination: "/saitama/property-management/tatami",permanent: true },
      // ─── さいたま市スラッグ互換 ──────────────────────────────────────
      { source: "/saitama/saitama",           destination: "/saitama/saitama-city",              permanent: true },
      // ─── 畳新調: /saitama/tatami/shincho → 正規URL ─────────────────
      { source: "/saitama/tatami/shincho",    destination: "/saitama/tatami/shinchou",           permanent: true },
      // ─── 国産畳: kokusan → kokusan-igusa ───────────────────────────
      { source: "/saitama/tatami/kokusan",    destination: "/saitama/tatami/kokusan-igusa",      permanent: true },
      // ─── 賃貸原状回復: /full → /tatami ─────────────────────────────
      { source: "/saitama/rental-restoration/full", destination: "/saitama/rental-restoration/tatami", permanent: true },
      // ─── 診断ページ旧URL ─────────────────────────────────────────────
      { source: "/request/diagnose",          destination: "/request/start",                     permanent: true },
      // ─── quote → bulk-quote ──────────────────────────────────────────
      { source: "/quote/new",                 destination: "/bulk-quote/new",                    permanent: true },
      // ─── 記事スラッグ互換（旧テストURL） ───────────────────────────────
      { source: "/articles/tatami-omotegae-shincho-difference", destination: "/articles/tatami-omotegae-uragaeshi-shinchou", permanent: true },
      { source: "/articles/tatami-omotegae-shincho", destination: "/articles/tatami-omotegae-uragaeshi-shinchou", permanent: true },
      // ─── 施工事例ID互換 ──────────────────────────────────────────────
      { source: "/cases/case-001",            destination: "/cases/wc-001",                      permanent: true },
      { source: "/cases/case-002",            destination: "/cases/wc-002",                      permanent: true },
      { source: "/works/case-001",            destination: "/works/wc-001",                      permanent: true },
      // ─── Q&A ID互換 ─────────────────────────────────────────────────
      { source: "/questions/question-001",    destination: "/questions/q-001",                   permanent: true },
      // ─── サービス詳細 (IDなし場合は業者詳細へ) ──────────────────────
      { source: "/providers/:id/services/service-:num", destination: "/providers/:id", permanent: false },
    ];
  },
};

export default nextConfig;
