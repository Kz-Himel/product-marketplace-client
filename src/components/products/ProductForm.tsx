"use client";

import { useState } from "react";
import { Form, TextField, Label, Input, FieldError, Button } from "@heroui/react";
import { useCategories } from "@/hooks/useCategories";
import { Product, ProductPayload, ProductStatus } from "../../types/products.types";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

interface ProductFormProps {
  initialValues?: Product;
  onSubmit: (payload: ProductPayload) => Promise<void>;
  isSubmitting?: boolean;
  submitLabel?: string;
}

export function ProductForm({
  initialValues,
  onSubmit,
  isSubmitting,
  submitLabel = "Save product",
}: ProductFormProps) {
  const { data: categories, isLoading: loadingCategories } = useCategories();
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<ProductStatus>(initialValues?.status ?? "ACTIVE");
  const [categoryId, setCategoryId] = useState(
    initialValues?.categoryId ?? ""
  );

  if (loadingCategories) return <LoadingSpinner label="Loading categories..." />;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name") || "");
    const description = String(formData.get("description") || "");
    const price = Number(formData.get("price") || 0);
    const stock = Number(formData.get("stock") || 0);
    const image = String(formData.get("image") || "");

    const finalCategoryId = categoryId || categories?.[0]?.id || "";
    if (!finalCategoryId) {
      setError("Please select a category");
      return;
    }

    try {
      await onSubmit({
        name,
        description,
        price,
        stock,
        image: image || undefined,
        status,
        categoryId: finalCategoryId,
      });
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="w-full max-w-xl space-y-4 rounded-2xl border border-border bg-surface p-6">
      <TextField name="name" isRequired defaultValue={initialValues?.name}>
        <Label className="text-sm font-medium">Name</Label>
        <Input placeholder="e.g. Wireless Headphones" />
        <FieldError className="text-xs text-danger" />
      </TextField>

      <TextField name="description" defaultValue={initialValues?.description ?? ""}>
        <Label className="text-sm font-medium">Description</Label>
        <Input placeholder="Short description" />
      </TextField>

      <div className="grid grid-cols-2 gap-4">
        <TextField name="price" type="number" isRequired defaultValue={String(initialValues?.price ?? "")}>
          <Label className="text-sm font-medium">Price ($)</Label>
          <Input type="number" step="0.01" min={0} />
          <FieldError className="text-xs text-danger" />
        </TextField>

        <TextField name="stock" type="number" isRequired defaultValue={String(initialValues?.stock ?? "")}>
          <Label className="text-sm font-medium">Stock</Label>
          <Input type="number" min={0} />
          <FieldError className="text-xs text-danger" />
        </TextField>
      </div>

      <TextField name="image" defaultValue={initialValues?.image ?? ""}>
        <Label className="text-sm font-medium">Image URL</Label>
        <Input placeholder="https://... (optional)" />
      </TextField>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium">Category</label>
          <select
            value={categoryId || categories?.[0]?.id || ""}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
          >
            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as ProductStatus)}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
          >
            <option value="ACTIVE">ACTIVE</option>
            <option value="INACTIVE">INACTIVE</option>
            <option value="OUT_OF_STOCK">OUT_OF_STOCK</option>
          </select>
        </div>
      </div>

      {error && <p className="rounded-lg bg-danger/10 px-3 py-2 text-sm text-danger">{error}</p>}

      <Button type="submit" className="w-full" isDisabled={isSubmitting}>
        {isSubmitting ? "Saving..." : submitLabel}
      </Button>
    </Form>
  );
}