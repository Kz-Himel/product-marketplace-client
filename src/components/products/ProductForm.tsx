"use client";

import { useState } from "react";
import { Form, TextField, Label, Input, TextArea, FieldError, Button } from "@heroui/react";
import { useCategories } from "@/hooks/useCategories";
import { Product, ProductPayload, ProductStatus } from "../../types/products.types";

interface ProductFormProps {
  initialData?: Product;
  isSubmitting?: boolean;
  onSubmit: (payload: ProductPayload) => void;
}

export function ProductForm({ initialData, isSubmitting, onSubmit }: ProductFormProps) {
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const [status, setStatus] = useState<ProductStatus>(initialData?.status ?? "ACTIVE");
  const [categoryId, setCategoryId] = useState(initialData?.categoryId ?? "");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!categoryId) return;
    const formData = new FormData(e.currentTarget);

    onSubmit({
      name: String(formData.get("name") || ""),
      description: String(formData.get("description") || ""),
      price: Number(formData.get("price") || 0),
      stock: Number(formData.get("stock") || 0),
      image: String(formData.get("image") || "") || undefined,
      status,
      categoryId,
    });
  };

  return (
    <Form onSubmit={handleSubmit} className="space-y-5">
      <TextField name="name" isRequired minLength={2} defaultValue={initialData?.name}>
        <Label className="text-sm font-medium">Product name</Label>
        <Input placeholder="e.g. Wireless Headphones" />
        <FieldError className="text-xs text-danger" />
      </TextField>

      <TextField
        name="description"
        isRequired
        minLength={5}
        defaultValue={initialData?.description}
      >
        <Label className="text-sm font-medium">Description</Label>
        <TextArea placeholder="Describe the product" rows={3} />
        <FieldError className="text-xs text-danger" />
      </TextField>

      <div className="grid grid-cols-2 gap-4">
        <TextField
          name="price"
          type="number"
          isRequired
          minValue={0}
          defaultValue={initialData?.price}
        >
          <Label className="text-sm font-medium">Price ($)</Label>
          <Input placeholder="0.00" step="0.01" />
          <FieldError className="text-xs text-danger" />
        </TextField>

        <TextField
          name="stock"
          type="number"
          isRequired
          minValue={0}
          defaultValue={initialData?.stock}
        >
          <Label className="text-sm font-medium">Stock</Label>
          <Input placeholder="0" />
          <FieldError className="text-xs text-danger" />
        </TextField>
      </div>

      <TextField name="image" defaultValue={initialData?.image ?? ""}>
        <Label className="text-sm font-medium">Image URL</Label>
        <Input placeholder="https://..." />
      </TextField>

      <div>
        <label className="mb-1.5 block text-sm font-medium">Category</label>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          required
          className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm"
        >
          <option value="" disabled>
            {categoriesLoading ? "Loading categories..." : "Select a category"}
          </option>
          {categories?.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as ProductStatus)}
          className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm"
        >
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
          <option value="OUT_OF_STOCK">Out of stock</option>
        </select>
      </div>

      <Button type="submit" className="w-full" isDisabled={isSubmitting || !categoryId}>
        {isSubmitting ? "Saving..." : initialData ? "Update product" : "Create product"}
      </Button>
    </Form>
  );
}