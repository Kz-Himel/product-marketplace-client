"use client";

import { useRouter } from "next/navigation";
import { CategoryForm } from "@/components/categories/CategoryForm";
import { useCreateCategory } from "@/hooks/useCategories";

export default function NewCategoryPage() {
  const router = useRouter();
  const createCategory = useCreateCategory();

  return (
    <div className="mx-auto max-w-lg">
      <h1 className="mb-6 font-display text-2xl font-semibold">New category</h1>
      <CategoryForm
        isSubmitting={createCategory.isPending}
        onSubmit={(payload) =>
          createCategory.mutate(payload, {
            onSuccess: () => router.push("/dashboard/categories"),
          })
        }
      />
      {createCategory.isError && (
        <p className="mt-4 text-sm text-danger">
          {(createCategory.error as Error).message}
        </p>
      )}
    </div>
  );
}