import Link from "next/link";
import { FiFolder } from "react-icons/fi";
import { Category } from "@/types/category.types";
import { StatusBadge } from "@/components/ui/StatusBadge";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/products?categoryId=${category.id}`}
      className="group flex flex-col gap-3 rounded-2xl border border-border bg-surface p-5 transition-shadow hover:shadow-lg"
    >
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
          <FiFolder />
        </div>
        <StatusBadge status={category.status} />
      </div>
      <h3 className="font-display text-lg font-semibold group-hover:text-accent">
        {category.name}
      </h3>
      {category.description && (
        <p className="line-clamp-2 text-sm text-muted">{category.description}</p>
      )}
    </Link>
  );
}