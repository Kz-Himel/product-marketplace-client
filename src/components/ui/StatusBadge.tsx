const STATUS_STYLES: Record<string, string> = {
  ACTIVE: "bg-success/15 text-success",
  PUBLISHED: "bg-success/15 text-success",
  CONFIRMED: "bg-success/15 text-success",
  DELIVERED: "bg-success/15 text-success",
  PENDING: "bg-warning/15 text-warning",
  OUT_OF_STOCK: "bg-warning/15 text-warning",
  SHIPPED: "bg-warning/15 text-warning",
  INACTIVE: "bg-danger/15 text-danger",
  HIDDEN: "bg-danger/15 text-danger",
  CANCELLED: "bg-danger/15 text-danger",
};

export function StatusBadge({ status }: { status: string }) {
  const style = STATUS_STYLES[status] ?? "bg-default/15 text-default";
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${style}`}>
      {status.replace(/_/g, " ")}
    </span>
  );
}