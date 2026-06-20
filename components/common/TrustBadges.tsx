export default function TrustBadges() {
  const badges = [
    {
      title: "掲載時に基本情報を確認",
      description: "掲載申請時に会社情報・連絡先・対応サービスの確認を行います",
    },
    {
      title: "口コミで比較",
      description: "実際の利用者による口コミ評価で業者を比較できます",
    },
    {
      title: "無料で見積相談",
      description: "サービス利用料はかかりません。見積もり・相談は無料",
    },
    {
      title: "トラブル時サポート",
      description: "施工に関するご不満や問題が発生した際にご相談いただけます",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {badges.map((badge) => (
        <div key={badge.title} className="text-center p-4 border border-border bg-white">
          <div className="w-10 h-10 border border-kincya/30 flex items-center justify-center mx-auto mb-3">
            <div className="w-4 h-4 border-2 border-kincya" />
          </div>
          <h3 className="text-xs font-medium text-sumi mb-1" style={{ fontFamily: "var(--font-serif)" }}>
            {badge.title}
          </h3>
          <p className="text-xs text-sumi/60 leading-relaxed">{badge.description}</p>
        </div>
      ))}
    </div>
  );
}
