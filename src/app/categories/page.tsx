"use client";

import { FiFolder } from "react-icons/fi";
import { useCategories } from "@/hooks/useCategories";
import { CategoryCard } from "@/components/categories/CategoryCard";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { EmptyState } from "@/components/ui/EmptyState";

export default function CategoriesPage() {
  const { data: categories, isLoading, isError } = useCategories();
  const visible = categories?.filter((c) => c.status === "ACTIVE") ?? [];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold">Categories</h1>
        <p className="mt-1 text-muted">Browse products by category</p>
      </div>

      {isLoading && <LoadingSpinner label="Loading categories..." />}

      {isError && (
        <EmptyState
          icon={<FiFolder />}
          title="Couldn't load categories"
          description="Something went wrong while fetching categories. Please try again."
        />
      )}

      {!isLoading && !isError && visible.length === 0 && (
        <EmptyState
          icon={<FiFolder />}
          title="No categories yet"
          description="Categories will show up here once an admin creates them."
        />
      )}

      {visible.length > 0 && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      )}
    </div>
  );
}