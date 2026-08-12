"use client";

import { useEffect } from "react";
import { FiAlertTriangle, FiRefreshCw } from "react-icons/fi";
import { Button } from "@heroui/react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-danger/10 text-2xl text-danger">
        <FiAlertTriangle />
      </div>
      <h1 className="font-display text-3xl font-semibold">Something went wrong</h1>
      <p className="max-w-sm text-muted">
        {error.message || "An unexpected error occurred. Please try again."}
      </p>
      <Button size="sm" onPress={reset}>
        <FiRefreshCw className="mr-1" /> Try again
      </Button>
    </div>
  );
}