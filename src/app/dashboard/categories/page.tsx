"use client";

import Link from "next/link";
import { useState } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiFolder } from "react-icons/fi";
import { Button } from "@heroui/react";
import { useCategories, useDeleteCategory } from "@/hooks/useCategories";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { EmptyState } from "@/components/ui/EmptyState";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { StatusBadge } from "@/components/ui/StatusBadge";

export default function AdminCategoriesPage() {
  const { data: categories, isLoading } = useCategories();
  const deleteCategory = useDeleteCategory();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleConfirmDelete = () => {
    if (!deleteId) return;
    deleteCategory.mutate(deleteId, { onSuccess: () => setDeleteId(null) });
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold">Categories</h1>
          <p className="mt-1 text-sm text-muted">Manage marketplace categories</p>
        </div>
        <Link href="/dashboard/categories/new">
          <Button size="sm">
            <FiPlus className="mr-1" /> New category
          </Button>
        </Link>
      </div>

      {isLoading && <LoadingSpinner />}

      {categories && categories.length === 0 && (
        <EmptyState
          icon={<FiFolder />}
          title="No categories yet"
          description="Create your first category to start organizing products."
        />
      )}

      {categories && categories.length > 0 && (
        <div className="overflow-hidden rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-surface-secondary text-left text-muted">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Created</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id} className="border-t border-border">
                  <td className="px-4 py-3 font-medium">{category.name}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={category.status} />
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-muted">
                    {new Date(category.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Link href={`/dashboard/categories/${category.id}/edit`}>
                        <Button size="sm" variant="ghost" isIconOnly>
                          <FiEdit2 />
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        variant="ghost"
                        isIconOnly
                        onPress={() => setDeleteId(category.id)}
                      >
                        <FiTrash2 className="text-danger" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmDialog
        isOpen={!!deleteId}
        title="Delete category"
        description="This will soft-delete the category. Products under it stay, but it won't be visible anymore."
        isLoading={deleteCategory.isPending}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}