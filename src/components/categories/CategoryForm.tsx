"use client";

import { useState } from "react";
import { Form, TextField, Label, Input, TextArea, FieldError, Button } from "@heroui/react";
import { Category, CategoryPayload, CategoryStatus } from "@/types/category.types";

interface CategoryFormProps {
  initialData?: Category;
  isSubmitting?: boolean;
  onSubmit: (payload: CategoryPayload) => void;
}

export function CategoryForm({ initialData, isSubmitting, onSubmit }: CategoryFormProps) {
  const [status, setStatus] = useState<CategoryStatus>(initialData?.status ?? "ACTIVE");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit({
      name: String(formData.get("name") || ""),
      description: String(formData.get("description") || "") || undefined,
      status,
    });
  };

  return (
    <Form onSubmit={handleSubmit} className="space-y-5">
      <TextField name="name" isRequired minLength={2} defaultValue={initialData?.name}>
        <Label className="text-sm font-medium">Name</Label>
        <Input placeholder="e.g. Electronics" />
        <FieldError className="text-xs text-danger" />
      </TextField>

      <TextField name="description" defaultValue={initialData?.description ?? ""}>
        <Label className="text-sm font-medium">Description</Label>
        <TextArea placeholder="Short description (optional)" rows={3} />
      </TextField>

      <div>
        <label className="mb-1.5 block text-sm font-medium">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as CategoryStatus)}
          className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm"
        >
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
        </select>
      </div>

      <Button type="submit" className="w-full" isDisabled={isSubmitting}>
        {isSubmitting ? "Saving..." : initialData ? "Update category" : "Create category"}
      </Button>
    </Form>
  );
}