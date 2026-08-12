"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FiShoppingBag } from "react-icons/fi";
import { useProducts } from "@/hooks/useProducts";
import { useCreateOrder } from "@/hooks/useOrders";
import { OrderForm } from "@/components/orders/OrderForm";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { EmptyState } from "@/components/ui/EmptyState";

function NewOrderContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: products, isLoading } = useProducts();
  const createOrder = useCreateOrder();

  if (isLoading) return <LoadingSpinner label="Loading products..." />;
  if (!products || products.length === 0) {
    return (
      <EmptyState
        icon={<FiShoppingBag />}
        title="No products available"
        description="Check back later."
      />
    );
  }

  return (
    <OrderForm
      products={products}
      defaultProductId={searchParams.get("productId") ?? undefined}
      isSubmitting={createOrder.isPending}
      onSubmit={async (payload) => {
        await createOrder.mutateAsync(payload);
        router.push("/orders");
      }}
    />
  );
}

export default function NewOrderPage() {
  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-semibold">Place an order</h1>
      <Suspense fallback={<LoadingSpinner />}>
        <NewOrderContent />
      </Suspense>
    </div>
  );
}