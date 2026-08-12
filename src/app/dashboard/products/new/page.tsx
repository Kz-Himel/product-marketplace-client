"use client";

import { useRouter } from "next/navigation";
import { ProductForm } from "@/components/products/ProductForm";
import { useCreateProduct } from "@/hooks/useProducts";

export default function NewProductPage() {
  const router = useRouter();
  const createProduct = useCreateProduct();

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-semibold">New product</h1>
      <ProductForm
        isSubmitting={createProduct.isPending}
        onSubmit={async (payload) => {
          await createProduct.mutateAsync(payload);
          router.push("/dashboard/products");
        }}
      />
    </div>
  );
}