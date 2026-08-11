"use client";

import { useParams, useRouter } from "next/navigation";
import { ProductForm } from "@/components/products/ProductForm";
import { useProduct, useUpdateProduct } from "@/hooks/useProducts";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { data: product, isLoading } = useProduct(id);
  const updateProduct = useUpdateProduct();

  if (isLoading) return <LoadingSpinner />;
  if (!product) return <p className="text-danger">Product not found.</p>;

  return (
    <div className="mx-auto max-w-lg">
      <h1 className="mb-6 font-display text-2xl font-semibold">Edit product</h1>
      <ProductForm
        initialData={product}
        isSubmitting={updateProduct.isPending}
        onSubmit={(payload) =>
          updateProduct.mutate(
            { id, payload },
            { onSuccess: () => router.push("/dashboard/products") }
          )
        }
      />
    </div>
  );
}