import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import SearchBox from "@/components/common/SearchBox";
import CityLinkGrid from "@/components/common/CityLinkGrid";
import FAQSection from "@/components/common/FAQSection";
import FilterSidebar from "@/components/marketplace/FilterSidebar";
import SearchSortBar from "@/components/marketplace/SearchSortBar";
import FilterDrawer from "@/components/marketplace/FilterDrawer";
import ProviderListCard from "@/components/marketplace/ProviderListCard";
import PaginationLinks from "@/components/marketplace/PaginationLinks";
import StickyBottomCTA from "@/components/common/StickyBottomCTA";
import { filterAndSortProviders, type RawSearchParams } from "@/lib/search";
import { getCategoryConfigBySlug, POPULAR_CATEGORY_CONFIGS } from "@/config/categories";
import { createMetadata } from "@/lib/metadata";

interface Props {
  searchParams: Promise<RawSearchParams>;
}

export const metadata: Metadata = createMetadata({
  title: "畳・和室の業者を探す | 埼玉県の畳店比較",
  description:
    "埼玉県の畳表替え・新調・ふすま障子張替え・和室リフォーム業者を、料金・口コミ・対応エリアで比較。無料で見積もり依頼ができます。",
  path: "/search",
});

const get = (sp: RawSearchParams, key: string): string | undefined => {
  const v = sp[key];
  return Array.isArray(v) ? v[0] : v;
};

export default async function SearchPage({ searchParams }: Props) {
  const sp = await searchParams;
  const { providers, total, page, limit } = filterAndSortProviders(sp);

  const cityLabel = get(sp, "city");
  const categorySlug = get(sp, "category");
  const cat = categorySlug ? getCategoryConfigBySlug(categorySlug) : undefined;

  // 検索条件タグ
  const conditionTags: string[] = [];
  if (cityLabel) conditionTags.push(cityLabel);
  if (cat) conditionTags.push(cat.name);
  if (get(sp, "rating")) conditionTags.push(`評価${get(sp, "rating")}以上`);
  if (get(sp, "reviewMin")) conditionTags.push(`口コミ${get(sp, "reviewMin")}件以上`);
  if (get(sp, "hasLicense") === "true") conditionTags.push("一級技能士");
  if (get(sp, "hasInsurance") === "true") conditionTags.push("保険加入");
  if (get(sp, "acceptsCorporate") === "true") conditionTags.push("法人対応");
  if (get(sp, "sameDayResponse") === "true") conditionTags.push("即日対応");
  if (get(sp, "weekendResponse") === "true") conditionTags.push("土日対応");
  if (get(sp, "hasEstimateFree") === "true") conditionTags.push("見積無料");
  if (get(sp, "hasPhotoEstimate") === "true") conditionTags.push("写真見積対応");
  if (get(sp, "hasFurnitureMove") === "true") conditionTags.push("家具移動対応");

  const h1 =
    cat && cityLabel
      ? `${cityLabel}の${cat.name}業者を比較`
      : cat
      ? `埼玉県の${cat.name}業者を比較`
      : cityLabel
      ? `${cityLabel}の畳・和室業者を比較`
      : "埼玉県の畳・和室業者を比較";

  // pagination用にstringのみのsearchParamsを抽出
  const plainSp: Record<string, string> = {};
  Object.entries(sp).forEach(([k, v]) => {
    if (typeof v === "string") plainSp[k] = v;
  });

  return (
    <div className="min-h-screen bg-shiro">
      {/* 検索バー */}
      <div className="bg-sumi border-b border-white/10 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<div className="h-12" />}>
            <SearchBox variant="inline" defaultCategory={categorySlug} defaultCity={cityLabel} />
          </Suspense>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs
          items={[
            { label: "トップ", href: "/" },
            { label: "業者を探す", href: "/search" },
            ...(cityLabel ? [{ label: cityLabel }] : []),
            ...(cat ? [{ label: cat.name }] : []),
          ]}
        />

        {/* 検索ヘッダー */}
        <div className="mt-4 mb-5">
          <h1 className="text-xl md:text-2xl text-sumi" style={{ fontFamily: "var(--font-serif)" }}>
            {h1}
          </h1>
          <p className="text-sm text-sumi/50 mt-1">
            {total > 0 ? (
              <>
                <span className="font-bold text-sumi">{total}</span>件の業者が見つかりました
              </>
            ) : (
              "条件に合う業者が見つかりませんでした"
            )}
          </p>

          {conditionTags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mt-3">
              <span className="text-xs text-sumi/40">条件:</span>
              {conditionTags.map((t) => (
                <span key={t} className="text-xs bg-kiji border border-border px-2.5 py-1 text-sumi/70">
                  {t}
                </span>
              ))}
              <Link href="/search" className="text-xs text-ai hover:underline ml-1">
                すべてリセット
              </Link>
            </div>
          )}
        </div>

        <div className="flex gap-6">
          {/* PC左サイドバー */}
          <div className="w-60 shrink-0 hidden lg:block">
            <Suspense fallback={<div className="h-96 bg-white border border-border" />}>
              <FilterSidebar />
            </Suspense>
          </div>

          <div className="flex-1 min-w-0">
            {/* ソートバー（件数・ソート・スマホフィルター） */}
            <div className="mb-4">
              <Suspense fallback={<div className="h-10" />}>
                <SearchSortBar total={total} />
              </Suspense>
            </div>

            {providers.length === 0 ? (
              /* ゼロ件UI */
              <div className="bg-white border border-border px-6 py-14 text-center">
                <div className="text-4xl mb-4">🔍</div>
                <p className="text-base text-sumi mb-1.5" style={{ fontFamily: "var(--font-serif)" }}>
                  条件に合う業者が見つかりませんでした
                </p>
                <p className="text-xs text-sumi/50 mb-8">
                  絞り込み条件を変えるか、一括見積もりで複数業者にまとめてご相談ください
                </p>
                <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3">
                  <Link
                    href="/search"
                    className="inline-flex items-center justify-center text-sm text-ai border border-ai px-5 py-2.5 hover:bg-ai hover:text-white transition-all"
                  >
                    条件をリセットして再検索
                  </Link>
                  <Link
                    href={`/search${categorySlug ? `?category=${categorySlug}` : ""}`}
                    className="inline-flex items-center justify-center text-sm text-sumi border border-border px-5 py-2.5 hover:border-sumi transition-all"
                  >
                    エリアを広げて検索
                  </Link>
                  <Link
                    href="/bulk-quote"
                    className="inline-flex items-center justify-center text-sm bg-kincya text-white px-5 py-2.5 hover:bg-do transition-all font-medium"
                  >
                    一括見積もりで複数社に相談する
                  </Link>
                </div>

                {/* 関連カテゴリ */}
                <div className="mt-10">
                  <p className="text-xs text-sumi/50 mb-3">サービスから探す</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {POPULAR_CATEGORY_CONFIGS.slice(0, 6).map((c) => (
                      <Link
                        key={c.slug}
                        href={`/search?category=${c.slug}`}
                        className="text-xs border border-border text-sumi/60 hover:border-ai hover:text-ai transition-colors px-3 py-1.5"
                      >
                        {c.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  {providers.map((p) => (
                    <ProviderListCard key={p.id} provider={p} categorySlug={categorySlug} />
                  ))}
                </div>
                <PaginationLinks page={page} total={total} limit={limit} basePath="/search" searchParams={plainSp} />
              </>
            )}

            {/* ページ下部CTA */}
            {providers.length > 0 && (
              <section className="mt-10 bg-ai/5 border border-ai/20 p-6">
                <h2 className="text-base text-sumi mb-1" style={{ fontFamily: "var(--font-serif)" }}>
                  複数社に一括で相談しませんか？
                </h2>
                <p className="text-xs text-sumi/60 mb-4">
                  希望条件を一度入力するだけで、複数の業者から見積もりが届きます。
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/bulk-quote"
                    className="inline-flex items-center justify-center text-sm bg-kincya text-white px-5 py-2.5 hover:bg-do transition-colors font-medium"
                  >
                    一括見積もりを依頼
                  </Link>
                  <Link
                    href="/diagnose"
                    className="inline-flex items-center justify-center text-sm border border-sumi text-sumi px-5 py-2.5 hover:bg-kiji transition-colors"
                  >
                    かんたん診断で探す
                  </Link>
                  <Link
                    href="/photo-estimate"
                    className="inline-flex items-center justify-center text-sm border border-sumi text-sumi px-5 py-2.5 hover:bg-kiji transition-colors"
                  >
                    写真で見積もりを依頼
                  </Link>
                </div>
              </section>
            )}

            {/* 料金相場セクション */}
            <section className="mt-10 bg-white border border-border p-6">
              <h2 className="text-lg text-sumi mb-1" style={{ fontFamily: "var(--font-serif)" }}>
                畳・和室工事の料金相場
              </h2>
              <p className="text-xs text-sumi/50 mb-4">※ 目安料金です。素材・サイズ・オプションにより変動します。必ず見積もりでご確認ください。</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-border">
                  <thead>
                    <tr className="bg-kiji/60 text-sumi/70">
                      <th className="text-left px-3 py-2.5 font-medium border-b border-border">工事の種類</th>
                      <th className="text-left px-3 py-2.5 font-medium border-b border-border">目安料金（1枚）</th>
                      <th className="text-left px-3 py-2.5 font-medium border-b border-border hidden sm:table-cell">こんな時に</th>
                    </tr>
                  </thead>
                  <tbody className="text-sumi/70">
                    <tr className="border-b border-kiji">
                      <td className="px-3 py-2.5 font-medium text-sumi">裏返し</td>
                      <td className="px-3 py-2.5 text-do font-medium">2,500円〜</td>
                      <td className="px-3 py-2.5 text-xs hidden sm:table-cell">新調・表替えから3〜5年。裏面がきれいな場合に</td>
                    </tr>
                    <tr className="border-b border-kiji">
                      <td className="px-3 py-2.5 font-medium text-sumi">表替え（い草）</td>
                      <td className="px-3 py-2.5 text-do font-medium">3,200円〜</td>
                      <td className="px-3 py-2.5 text-xs hidden sm:table-cell">色あせ・毛羽立ちが気になってきたら</td>
                    </tr>
                    <tr className="border-b border-kiji">
                      <td className="px-3 py-2.5 font-medium text-sumi">表替え（和紙・樹脂）</td>
                      <td className="px-3 py-2.5 text-do font-medium">5,000円〜</td>
                      <td className="px-3 py-2.5 text-xs hidden sm:table-cell">耐久性・防水・ペット対応を重視する場合</td>
                    </tr>
                    <tr className="border-b border-kiji">
                      <td className="px-3 py-2.5 font-medium text-sumi">新調（い草）</td>
                      <td className="px-3 py-2.5 text-do font-medium">8,000円〜</td>
                      <td className="px-3 py-2.5 text-xs hidden sm:table-cell">踏むと沈む・15年以上経過した場合</td>
                    </tr>
                    <tr className="border-b border-kiji">
                      <td className="px-3 py-2.5 font-medium text-sumi">琉球・縁なし畳（新調）</td>
                      <td className="px-3 py-2.5 text-do font-medium">15,000円〜</td>
                      <td className="px-3 py-2.5 text-xs hidden sm:table-cell">モダンな和室・半畳サイズにしたい場合</td>
                    </tr>
                    <tr className="border-b border-kiji">
                      <td className="px-3 py-2.5 font-medium text-sumi">ふすま張替え</td>
                      <td className="px-3 py-2.5 text-do font-medium">3,500円〜</td>
                      <td className="px-3 py-2.5 text-xs hidden sm:table-cell">破れ・日焼けが目立ってきたら</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2.5 font-medium text-sumi">和室リフォーム</td>
                      <td className="px-3 py-2.5 text-do font-medium">50,000円〜</td>
                      <td className="px-3 py-2.5 text-xs hidden sm:table-cell">畳・建具・壁をまとめて一新したい場合</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link href="/prices" className="text-sm text-ai hover:underline">料金相場をもっと詳しく →</Link>
                <Link href="/bulk-quote" className="text-sm bg-kincya text-white px-4 py-2 hover:bg-do transition-colors font-medium">
                  無料で見積もりを比較する
                </Link>
              </div>
            </section>

            {/* かんたん診断CTA */}
            <section className="mt-6 bg-igusa/10 border border-igusa/30 p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex-1">
                  <p className="text-xs text-igusa font-medium mb-1">3問で完了</p>
                  <h2 className="text-base text-sumi mb-1" style={{ fontFamily: "var(--font-serif)" }}>
                    どの工事が必要か迷っていませんか？
                  </h2>
                  <p className="text-xs text-sumi/60">
                    畳の状態・築年数・ご要望を答えるだけで、表替え・裏返し・新調のどれが適切かをご案内します。
                  </p>
                </div>
                <Link
                  href="/diagnose"
                  className="shrink-0 inline-flex items-center gap-2 text-sm bg-sumi text-white px-5 py-3 hover:bg-sumi/80 transition-colors font-medium"
                >
                  かんたん診断を試す
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </section>

            {/* 業者選びのポイント */}
            <section className="mt-6 bg-white border border-border p-6">
              <h2 className="text-lg text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>
                失敗しない業者選びのポイント
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex gap-3">
                  <div className="shrink-0 w-8 h-8 bg-kincya/10 text-kincya flex items-center justify-center text-sm font-bold">1</div>
                  <div>
                    <p className="text-sm font-medium text-sumi mb-1">複数社の見積もりを比較する</p>
                    <p className="text-xs text-sumi/60 leading-relaxed">
                      同じ工事でも業者により料金・素材・施工方法が異なります。最低3社の見積もりを比較して適正価格を把握しましょう。
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="shrink-0 w-8 h-8 bg-kincya/10 text-kincya flex items-center justify-center text-sm font-bold">2</div>
                  <div>
                    <p className="text-sm font-medium text-sumi mb-1">資格・保険の有無を確認する</p>
                    <p className="text-xs text-sumi/60 leading-relaxed">
                      一級畳製作技能士の在籍や損害賠償保険への加入は安心の目安のひとつです。申告情報のため、詳細は各業者へご確認ください。
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="shrink-0 w-8 h-8 bg-kincya/10 text-kincya flex items-center justify-center text-sm font-bold">3</div>
                  <div>
                    <p className="text-sm font-medium text-sumi mb-1">口コミ・施工実績を参考にする</p>
                    <p className="text-xs text-sumi/60 leading-relaxed">
                      評価の高さだけでなく、口コミ件数・施工実績数もあわせて確認しましょう。コミュニケーションや仕上がりへの評価内容も参考になります。
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="shrink-0 w-8 h-8 bg-kincya/10 text-kincya flex items-center justify-center text-sm font-bold">4</div>
                  <div>
                    <p className="text-sm font-medium text-sumi mb-1">追加費用の条件を事前に確認する</p>
                    <p className="text-xs text-sumi/60 leading-relaxed">
                      見積もり時に、古畳の処分費用・家具移動費・出張費・消費税の内訳を確認しましょう。後から費用が増えるトラブルを防げます。
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 関連カテゴリ */}
            <section className="mt-6 bg-kiji/40 border border-border p-6">
              <h2 className="text-base text-sumi mb-4" style={{ fontFamily: "var(--font-serif)" }}>
                サービスから絞り込む
              </h2>
              <div className="flex flex-wrap gap-2">
                {POPULAR_CATEGORY_CONFIGS.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/search?category=${c.slug}${cityLabel ? `&city=${encodeURIComponent(cityLabel)}` : ""}`}
                    className={`text-sm border px-4 py-2 transition-colors ${
                      categorySlug === c.slug
                        ? "border-kincya bg-kincya text-white"
                        : "border-border text-sumi/70 bg-white hover:border-ai hover:text-ai"
                    }`}
                  >
                    {c.name}
                    {c.priceFrom && (
                      <span className="ml-1.5 text-xs opacity-60">{c.priceFrom.toLocaleString()}円〜</span>
                    )}
                  </Link>
                ))}
              </div>
            </section>

            {/* SEO本文 */}
            <section className="mt-6 bg-white border border-border p-6">
              <h2 className="text-lg text-sumi mb-3" style={{ fontFamily: "var(--font-serif)" }}>
                {cityLabel ? `${cityLabel}で` : "埼玉県で"}畳・和室の業者を選ぶには
              </h2>
              <p className="text-sm text-sumi/70 leading-relaxed mb-3">
                日本畳パートナーズでは、{cityLabel ? `${cityLabel}を含む` : ""}埼玉県内の畳店・内装業者を、料金・口コミ・対応エリア・資格で比較できます。
                畳の表替えや新調、ふすま・障子の張替え、和室リフォーム、賃貸の原状回復まで幅広く対応。
                気になる業者には無料で見積もりを依頼でき、複数社を比較して納得のいく1社を選べます。
              </p>
              <p className="text-sm text-sumi/70 leading-relaxed mb-6">
                業者を選ぶ際は、料金だけでなく口コミ評価・施工実績・保有資格・保険加入の有無を確認しましょう。
                一級畳製作技能士の在籍や損害賠償保険への加入は、安心して依頼できる目安のひとつです。（申告情報のため詳細は各業者へご確認ください）
              </p>

              {/* 表替え・裏返し・新調の違い */}
              <h3 className="text-base text-sumi mb-2 font-medium">表替え・裏返し・新調の違い</h3>
              <ul className="text-sm text-sumi/70 leading-relaxed mb-6 space-y-1.5">
                <li><span className="text-kincya">●</span> <strong>表替え</strong>：畳床はそのままに、畳表（ゴザ）を新しく張り替える工事。色あせ・毛羽立ちが気になってきたら。</li>
                <li><span className="text-kincya">●</span> <strong>裏返し</strong>：今の畳表を裏返して再利用する工事。新調・表替えから3〜5年で、まだ裏面がきれいな場合に。1枚につき1回だけ。</li>
                <li><span className="text-kincya">●</span> <strong>新調</strong>：畳床から新しく作り替える工事。15〜20年以上、踏むと沈む・床が傷んでいる場合に。</li>
              </ul>

              {/* 業者選びの注意点 */}
              <h3 className="text-base text-sumi mb-2 font-medium">埼玉県で業者を選ぶときの5つの注意点</h3>
              <ol className="text-sm text-sumi/70 leading-relaxed mb-3 space-y-1.5 list-decimal pl-5">
                <li>見積もりの内訳（材料費・施工費・出張費・古畳処分費）を確認する</li>
                <li>追加費用が発生する条件を事前に書面で確認する</li>
                <li>口コミ評価と施工実績の件数をあわせて見る</li>
                <li>保有資格・損害賠償保険の加入状況を確認する（申告情報のため詳細は各業者へ）</li>
                <li>対応エリア・希望時期・即日対応の可否を確認する</li>
              </ol>

              <div className="flex flex-wrap gap-3">
                <Link href="/articles" className="text-sm text-ai hover:underline">畳のコラムを読む →</Link>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* スマホ下部固定フィルタードロワーボタン */}
      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-40 lg:hidden">
        <Suspense fallback={null}>
          <FilterDrawer />
        </Suspense>
      </div>

      <FAQSection
        items={[
          {
            question: "業者を検索・比較するのに費用はかかりますか？",
            answer:
              "業者の検索・一覧表示・詳細ページの閲覧はすべて無料です。見積もり依頼・問い合わせも無料でご利用いただけます。料金が発生するのは、業者との間で実際に工事を発注した場合のみです。",
          },
          {
            question: "絞り込み条件はどのように使えばよいですか？",
            answer:
              "市区町村・サービス種別・口コミ評価・資格・対応オプションで絞り込めます。スマホはページ下部の「絞り込み」ボタン、PCは左サイドバーをご利用ください。複数条件を組み合わせることもできます。",
          },
          {
            question: "複数の業者にまとめて見積もり依頼できますか？",
            answer:
              "「一括見積もり」機能を使うと、希望条件を一度入力するだけで複数業者に同時に見積もりを依頼できます。各業者に個別に連絡する手間が省け、料金・対応を比較しやすくなります。",
          },
          {
            question: "掲載業者の情報はどのように確認されていますか？",
            answer:
              "掲載申請時に基本情報の確認を行っています。資格・保険・対応エリアなどは業者の申告情報です。詳細は各業者の詳細ページおよび直接のお問い合わせでご確認ください。",
          },
          {
            question: "特定の工事（ふすま・障子など）に対応する業者だけを探せますか？",
            answer:
              "サービス種別の絞り込みで「ふすま張替え」「障子張替え」「和室リフォーム」など工事の種類を指定して検索できます。カテゴリ別の検索ページもご利用ください。",
          },
        ]}
        title="業者検索に関するよくある質問"
      />

      <CityLinkGrid title="市区町村から探す" />
      <StickyBottomCTA primaryLabel="一括見積もりを依頼" primaryHref="/bulk-quote" secondaryLabel="絞り込む" secondaryHref="/search" />
    </div>
  );
}
