type Status =
  | "active" | "pending" | "suspended" | "rejected"
  | "confirmed" | "completed" | "cancelled"
  | "open" | "responded" | "closed" | "accepted"
  | "approved";

const STATUS_MAP: Record<string, { label: string; classes: string }> = {
  active: { label: "掲載中", classes: "bg-igusa/10 text-igusa border-igusa/30" },
  pending: { label: "審査中", classes: "bg-kincya/10 text-kincya border-kincya/30" },
  suspended: { label: "掲載停止", classes: "bg-do/10 text-do border-do/30" },
  rejected: { label: "否認", classes: "bg-sumi/10 text-sumi/60 border-border" },
  confirmed: { label: "確定", classes: "bg-ai/10 text-ai border-ai/20" },
  completed: { label: "完了", classes: "bg-igusa/10 text-igusa border-igusa/30" },
  cancelled: { label: "キャンセル", classes: "bg-sumi/10 text-sumi/60 border-border" },
  open: { label: "受付中", classes: "bg-igusa/10 text-igusa border-igusa/30" },
  responded: { label: "返信あり", classes: "bg-ai/10 text-ai border-ai/20" },
  closed: { label: "完了", classes: "bg-sumi/10 text-sumi/60 border-border" },
  accepted: { label: "成約済み", classes: "bg-kincya/10 text-kincya border-kincya/30" },
  approved: { label: "承認済み", classes: "bg-igusa/10 text-igusa border-igusa/30" },
};

interface Props {
  status: string;
  size?: "sm" | "default";
}

export default function StatusBadge({ status, size = "default" }: Props) {
  const config = STATUS_MAP[status] ?? { label: status, classes: "bg-sumi/10 text-sumi/60 border-border" };
  return (
    <span className={`inline-block border px-2 py-0.5 ${size === "sm" ? "text-xs" : "text-xs"} ${config.classes}`}>
      {config.label}
    </span>
  );
}
