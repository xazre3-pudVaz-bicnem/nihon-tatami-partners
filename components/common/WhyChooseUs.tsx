const REASONS = [
  {
    title: "ネットで簡単予約",
    desc: "24時間いつでもスマホから予約OK。電話不要で気軽に依頼できます。",
  },
  {
    title: "料金が明確",
    desc: "掲載料金は業者が設定した透明価格。追加料金が発生する場合は事前に明示されます。",
  },
  {
    title: "口コミで比較できる",
    desc: "実際に依頼したユーザーの口コミ・評価を公開。業者の実力を事前に確認できます。",
  },
  {
    title: "保険情報を掲載",
    desc: "各業者の損害賠償保険の加入状況（申告情報）を掲載。比較の参考にできます。",
  },
  {
    title: "掲載時に基本情報を確認",
    desc: "掲載申請時に会社情報・連絡先・対応サービスを確認しています。",
  },
  {
    title: "見積もり無料",
    desc: "多くの業者が無料見積もりに対応。複数の業者に相談して比較できます。",
  },
];

interface Props {
  compact?: boolean;
}

export default function WhyChooseUs({ compact = false }: Props) {
  return (
    <section className="py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-lg text-sumi text-center mb-8" style={{ fontFamily: "var(--font-serif)" }}>
          日本畳パートナーが選ばれる6つの理由
        </h2>
        <div className={`grid gap-4 ${compact ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"}`}>
          {REASONS.map((r, i) => (
            <div key={i} className="flex gap-3 bg-white border border-border p-4">
              <div className="w-6 h-6 rounded-full bg-igusa/10 border border-igusa/30 text-igusa text-xs flex items-center justify-center shrink-0 mt-0.5">
                {i + 1}
              </div>
              <div>
                <h3 className="text-sm text-sumi font-medium mb-1">{r.title}</h3>
                <p className="text-xs text-sumi/60 leading-relaxed">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
