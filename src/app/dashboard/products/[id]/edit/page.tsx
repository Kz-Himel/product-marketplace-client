"use client";

import { useParams, useRouter } from "next/navigation";
import { ProductForm } from "@/components/products/ProductForm";
import { useProduct, useUpdateProduct } from "@/hooks/useProducts";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { data: product, isLoading } = useProduct(id);
  const updateProduct = useUpdateProduct(id);

  if (isLoading) return <LoadingSpinner />;
  if (!product) return null;

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-semibold">Edit product</h1>
      <ProductForm
        initialValues={product}
        submitLabel="Update product"
        isSubmitting={updateProduct.isPending}
        onSubmit={async (payload) => {
          await updateProduct.mutateAsync(payload);
          router.push("/dashboard/products");
        }}
      />
    </div>
  );
}