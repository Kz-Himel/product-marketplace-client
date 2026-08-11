import { Spinner } from "@heroui/react";

export function LoadingSpinner({ label = "Loading..." }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-muted">
      <Spinner size="lg" />
      <p className="text-sm">{label}</p>
    </div>
  );
}