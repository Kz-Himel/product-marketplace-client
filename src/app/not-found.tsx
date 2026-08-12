import Link from "next/link";
import { FiSearch, FiArrowLeft } from "react-icons/fi";
import { Button } from "@heroui/react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-2xl text-accent">
        <FiSearch />
      </div>
      <h1 className="font-display text-3xl font-semibold">Page not found</h1>
      <p className="max-w-sm text-muted">
        The page you&apos;re looking for doesn&apos;t exist or may have been moved.
      </p>
      <Link href="/">
        <Button size="sm">
          <FiArrowLeft className="mr-1" /> Back to home
        </Button>
      </Link>
    </div>
  );
}