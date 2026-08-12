"use client";

import { useState } from "react";
import Link from "next/link";
import { FiPlus, FiEdit2, FiTrash2, FiBox } from "react-icons/fi";
import { Button } from "@heroui/react";
import { useProducts, useDeleteProduct } from "@/hooks/useProducts";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { EmptyState } from "@/components/ui/EmptyState";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";

const STATUS_STYLES: Record<string, string> = {
  ACTIVE: "bg-success/15 text-success",
  INACTIVE: "bg-danger/15 text-danger",
  OUT_OF_STOCK: "bg-warning/15 text-warning",
};

export default function AdminProductsPage() {
  const { data: products, isLoading } = useProducts();
  const deleteProduct = useDeleteProduct();
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  const handleConfirmDelete = async () => {
    if (!pendingDeleteId) return;
    await deleteProduct.mutateAsync(pendingDeleteId);
    setPendingDeleteId(null);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold">Products</h1>
        <Link href="/dashboard/products/new">
          <Button size="sm">
            <FiPlus className="mr-1" /> New product
          </Button>
        </Link>
      </div>

      {isLoading && <LoadingSpinner />}
      {products && products.length === 0 && (
        <EmptyState icon={<FiBox />} title="No products yet" />
      )}

      {products && products.length > 0 && (
        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface-secondary text-muted">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Price</th>
                <th className="px-4 py-3 font-medium">Stock</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-t border-border">
                  <td className="px-4 py-3 font-medium">{product.name}</td>
                  <td className="px-4 py-3 text-muted">{product.category?.name ?? "—"}</td>
                  <td className="px-4 py-3 font-mono">${product.price.toFixed(2)}</td>
                  <td className="px-4 py-3 font-mono">{product.stock}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[product.status]}`}>
                      {product.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Link href={`/dashboard/products/${product.id}/edit`}>
                        <Button size="sm" variant="ghost"><FiEdit2 /></Button>
                      </Link>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-danger"
                        onPress={() => setPendingDeleteId(product.id)}
                      >
                        <FiTrash2 />
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
        isOpen={!!pendingDeleteId}
        title="Delete this product?"
        description="This will soft-delete the product."
        isLoading={deleteProduct.isPending}
        onConfirm={handleConfirmDelete}
        onCancel={() => setPendingDeleteId(null)}
      />
    </div>
  );
}