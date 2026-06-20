// isSample=true の業者・口コミ・施工事例に表示する「掲載イメージ」バッジ
export default function SampleBadge({ label = "掲載イメージ" }: { label?: string }) {
  return (
    <span className="inline-block text-[10px] bg-kiji border border-sumi/20 text-sumi/50 px-2 py-0.5 tracking-wide">
      {label}
    </span>
  );
}
