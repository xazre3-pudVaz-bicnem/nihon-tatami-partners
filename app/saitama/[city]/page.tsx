import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import ProviderCard from "@/components/common/ProviderCard";
import CityLinkGrid from "@/components/common/CityLinkGrid";
import { getCityBySlug, SAITAMA_CITIES } from "@/data/cities";
import { getProvidersByCity } from "@/data/providers";
import { POPULAR_CATEGORIES, SERVICE_CATEGORIES } from "@/data/categories";
import { SITE_URL } from "@/lib/metadata";

interface Props {
  params: Promise<{ city: string }>;
}

export async function generateStaticParams() {
  return SAITAMA_CITIES.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  const cityData = getCityBySlug(city);
  if (!cityData) return {};
  return {
    title: `${cityData.name}の畳・和室工事業者 | 料金・口コミで比較 | 日本畳パートナー`,
    description: `${cityData.name}（埼玉県）の畳表替え・和室リフォーム・ふすま・障子張替えなど畳・和室工事業者を料金・口コミで比較。無料で見積相談できます。`,
    alternates: { canonical: `${SITE_URL}/saitama/${city}` },
  };
}

export default async function CityTopPage({ params }: Props) {
  const { city } = await params;
  const cityData = getCityBySlug(city);
  if (!cityData) notFound();

  const providers = getProvidersByCity(cityData.name);
  const nearCities = SAITAMA_CITIES.filter((c) => c.slug !== city).slice(0, 8);

  return (
    <div className="min-h-screen bg-shiro">
      <div className="bg-sumi">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumbs items={[
            { label: "トップ", href: "/" },
            { label: "埼玉県", href: "/saitama" },
            { label: cityData.name },
          ]} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 pt-4">
          <h1 className="text-2xl md:text-3xl text-white mb-3" style={{ fontFamily: "var(--font-serif)" }}>
            {cityData.name}の畳・和室工事業者を探す
          </h1>
          <p className="text-sm text-white/60">{cityData.description}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* カテゴリ一覧 */}
        <section className="mb-10">
          <h2 className="text-xl text-sumi mb-5" style={{ fontFamily: "var(--font-serif)" }}>
            {cityData.name}で探せるサービス
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {POPULAR_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/saitama/${city}/${cat.slug}`}
                className="group border border-border bg-white hover:border-kincya/40 transition-all duration-300 p-4 text-center"
              >
                <h3 className="text-sm text-sumi group-hover:text-ai transition-colors mb-1" style={{ fontFamily: "var(--font-serif)" }}>
                  {cat.name}
                </h3>
                {cat.priceFrom && (
                  <p className="text-xs text-sumi/40">{cat.priceFrom.toLocaleString()}円〜</p>
                )}
              </Link>
            ))}
          </div>
        </section>

        {/* 業者一覧 */}
        <section className="mb-10">
          <h2 className="text-xl text-sumi mb-5" style={{ fontFamily: "var(--font-serif)" }}>
            {cityData.name}対応の業者
          </h2>
          {providers.length === 0 ? (
            <div className="bg-white border border-border p-8 text-center">
              <p className="text-sm text-sumi/50 mb-4">まだ登録された業者がありません</p>
              <Link href="/search" className="text-sm text-ai border border-ai px-4 py-2 hover:bg-ai hover:text-white transition-all duration-300">
                埼玉県全体で探す
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {providers.map((p) => (
                <ProviderCard key={p.id} provider={p} showFavorite />
              ))}
            </div>
          )}
        </section>

        {/* 近隣エリア */}
        <section className="mb-8">
          <h2 className="text-lg text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>近隣エリアの業者</h2>
          <div className="flex flex-wrap gap-3">
            {nearCities.map((c) => (
              <Link
                key={c.slug}
                href={`/saitama/${c.slug}`}
                className="text-sm border border-border text-sumi/70 hover:border-ai hover:text-ai transition-colors px-3 py-2"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </section>

        {/* 全カテゴリへのリンク */}
        <section className="mb-8">
          <h2 className="text-lg text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>
            {cityData.name}の全サービス
          </h2>
          <div className="flex flex-wrap gap-2">
            {SERVICE_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/saitama/${city}/${cat.slug}`}
                className="text-xs border border-border text-sumi/60 hover:border-ai hover:text-ai transition-colors px-3 py-1.5"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </section>
      </div>

      <CityLinkGrid currentCitySlug={city} title="他の市区町村でも探す" />
    </div>
  );
}
