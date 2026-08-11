"use client";

import { useParams, useRouter } from "next/navigation";
import { CategoryForm } from "@/components/categories/CategoryForm";
import { useCategory, useUpdateCategory } from "@/hooks/useCategories";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

export default function EditCategoryPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { data: category, isLoading } = useCategory(id);
  const updateCategory = useUpdateCategory();

  if (isLoading) return <LoadingSpinner />;
  if (!category) return <p className="text-danger">Category not found.</p>;

  return (
    <div className="mx-auto max-w-lg">
      <h1 className="mb-6 font-display text-2xl font-semibold">Edit category</h1>
      <CategoryForm
        initialData={category}
        isSubmitting={updateCategory.isPending}
        onSubmit={(payload) =>
          updateCategory.mutate(
            { id, payload },
            { onSuccess: () => router.push("/dashboard/categories") }
          )
        }
      />
    </div>
  );
}