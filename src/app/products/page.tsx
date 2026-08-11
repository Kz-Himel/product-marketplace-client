"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FiSearch } from "react-icons/fi";
import { useProducts } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";
import { ProductGrid } from "@/components/products/ProductGrid";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const initialCategoryId = searchParams.get("categoryId") ?? "";

  const { data: products, isLoading } = useProducts();
  const { data: categories } = useCategories();

  const [categoryId, setCategoryId] = useState(initialCategoryId);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!products) return [];
    return products
      .filter((p) => p.status !== "INACTIVE")
      .filter((p) => (categoryId ? p.categoryId === categoryId : true))
      .filter((p) =>
        search ? p.name.toLowerCase().includes(search.toLowerCase()) : true
      );
  }, [products, categoryId, search]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold">Products</h1>
        <p className="mt-1 text-muted">Browse everything on the marketplace</p>
      </div>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full rounded-lg border border-border bg-surface py-2 pl-9 pr-3 text-sm"
          />
        </div>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="rounded-lg border border-border bg-surface px-3 py-2 text-sm sm:w-56"
        >
          <option value="">All categories</option>
          {categories?.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {isLoading ? <LoadingSpinner label="Loading products..." /> : <ProductGrid products={filtered} />}
    </div>
  );
}