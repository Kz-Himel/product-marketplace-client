"use client";

import { useRouter } from "next/navigation";
import { ProductForm } from "@/components/products/ProductForm";
import { useCreateProduct } from "@/hooks/useProducts";

export default function NewProductPage() {
  const router = useRouter();
  const createProduct = useCreateProduct();

  return (
    <div className="mx-auto max-w-lg">
      <h1 className="mb-6 font-display text-2xl font-semibold">New product</h1>
      <ProductForm
        isSubmitting={createProduct.isPending}
        onSubmit={(payload) =>
          createProduct.mutate(payload, {
            onSuccess: () => router.push("/dashboard/products"),
          })
        }
      />
      {createProduct.isError && (
        <p className="mt-4 text-sm text-danger">{(createProduct.error as Error).message}</p>
      )}
    </div>
  );
}