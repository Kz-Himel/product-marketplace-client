"use client";

import Link from "next/link";
import { useState } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiPackage } from "react-icons/fi";
import { Button } from "@heroui/react";
import { useProducts, useDeleteProduct } from "@/hooks/useProducts";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { EmptyState } from "@/components/ui/EmptyState";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { StatusBadge } from "@/components/ui/StatusBadge";

export default function AdminProductsPage() {
  const { data: products, isLoading } = useProducts();
  const deleteProduct = useDeleteProduct();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold">Products</h1>
          <p className="mt-1 text-sm text-muted">Manage marketplace products</p>
        </div>
        <Link href="/dashboard/products/new">
          <Button size="sm">
            <FiPlus className="mr-1" /> New product
          </Button>
        </Link>
      </div>

      {isLoading && <LoadingSpinner />}

      {products && products.length === 0 && (
        <EmptyState icon={<FiPackage />} title="No products yet" description="Add your first product." />
      )}

      {products && products.length > 0 && (
        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-surface-secondary text-left text-muted">
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
                  <td className="px-4 py-3 text-muted">{product.category?.name ?? "-"}</td>
                  <td className="px-4 py-3 font-mono">${product.price.toFixed(2)}</td>
                  <td className="px-4 py-3">{product.stock}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={product.status} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Link href={`/dashboard/products/${product.id}/edit`}>
                        <Button size="sm" variant="ghost" isIconOnly>
                          <FiEdit2 />
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        variant="ghost"
                        isIconOnly
                        onPress={() => setDeleteId(product.id)}
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
        title="Delete product"
        description="This will soft-delete the product. It won't show up in the storefront anymore."
        isLoading={deleteProduct.isPending}
        onConfirm={() => deleteId && deleteProduct.mutate(deleteId, { onSuccess: () => setDeleteId(null) })}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}