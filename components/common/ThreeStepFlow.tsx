interface Props {
  categoryName?: string;
}

export default function ThreeStepFlow({ categoryName = "業者" }: Props) {
  const steps = [
    {
      num: "01",
      title: "業者を比較する",
      desc: `エリアと料金で${categoryName}業者を比較。口コミ・評価・実績件数でじっくり選べます。`,
    },
    {
      num: "02",
      title: "ネットで予約する",
      desc: "希望日時を入力してネット予約。見積もりが必要な場合は無料で依頼できます。",
    },
    {
      num: "03",
      title: "施工完了・口コミを投稿",
      desc: "当日は職人がご自宅へ。施工後に口コミを投稿して次の方の参考にしてください。",
    },
  ];

  return (
    <section className="bg-kiji/40 border-y border-kiji py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-lg text-sumi text-center mb-8" style={{ fontFamily: "var(--font-serif)" }}>
          3ステップで簡単依頼
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <div key={step.num} className="relative flex flex-col items-center text-center">
              {i < steps.length - 1 && (
                <div className="hidden sm:block absolute top-5 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-px bg-kiji" />
              )}
              <div className="w-10 h-10 rounded-full bg-sumi text-white flex items-center justify-center text-xs font-bold mb-3 shrink-0 z-10">
                {step.num}
              </div>
              <h3 className="text-sm text-sumi font-medium mb-2" style={{ fontFamily: "var(--font-serif)" }}>{step.title}</h3>
              <p className="text-xs text-sumi/60 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
