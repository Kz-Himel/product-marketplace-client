"use client";

import { useState } from "react";
import Link from "next/link";
import { FiShoppingCart, FiPlus } from "react-icons/fi";
import { Button } from "@heroui/react";
import { useOrders, useUpdateOrder } from "../../hooks/useOrders";
import { OrderTable } from "../../components/orders/OrderTable";
import { LoadingSpinner } from "../../components/ui/LoadingSpinner";
import { EmptyState } from "@/components/ui/EmptyState";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";

export default function OrdersPage() {
  const { data: orders, isLoading } = useOrders();
  const updateOrder = useUpdateOrder();
  const [pendingCancelId, setPendingCancelId] = useState<string | null>(null);

  const handleConfirmCancel = async () => {
    if (!pendingCancelId) return;
    await updateOrder.mutateAsync({ id: pendingCancelId, payload: { status: "CANCELLED" } });
    setPendingCancelId(null);
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold">My orders</h1>
          <p className="mt-1 text-muted">Track and manage your purchases</p>
        </div>
        <Link href="/orders/new">
          <Button size="sm">
            <FiPlus className="mr-1" /> Place order
          </Button>
        </Link>
      </div>

      {isLoading && <LoadingSpinner label="Loading your orders..." />}
      {orders && orders.length === 0 && (
        <EmptyState
          icon={<FiShoppingCart />}
          title="No orders yet"
          description="Once you place an order, it will show up here."
          action={
            <Link href="/orders/new">
              <Button size="sm">Place your first order</Button>
            </Link>
          }
        />
      )}
      {orders && orders.length > 0 && (
        <OrderTable
          orders={orders}
          isAdmin={false}
          onCancel={(id) => setPendingCancelId(id)}
          mutatingId={updateOrder.isPending ? pendingCancelId : null}
        />
      )}

      <ConfirmDialog
        isOpen={!!pendingCancelId}
        title="Cancel this order?"
        description="This will mark your order as cancelled."
        confirmLabel="Cancel order"
        isLoading={updateOrder.isPending}
        onConfirm={handleConfirmCancel}
        onCancel={() => setPendingCancelId(null)}
      />
    </div>
  );
}