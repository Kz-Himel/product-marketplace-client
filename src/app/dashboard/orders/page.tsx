"use client";

import { useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { useOrders, useUpdateOrder, useDeleteOrder } from "@/hooks/useOrders";
import { OrderTable } from "../../../components/orders/OrderTable";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { EmptyState } from "@/components/ui/EmptyState";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { OrderStatus } from "@/types/order.types";

export default function AdminOrdersPage() {
  const { data: orders, isLoading } = useOrders();
  const updateOrder = useUpdateOrder();
  const deleteOrder = useDeleteOrder();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  const handleStatusChange = async (id: string, status: OrderStatus) => {
    setActiveId(id);
    try {
      await updateOrder.mutateAsync({ id, payload: { status } });
    } finally {
      setActiveId(null);
    }
  };

  const handleConfirmDelete = async () => {
    if (!pendingDeleteId) return;
    await deleteOrder.mutateAsync(pendingDeleteId);
    setPendingDeleteId(null);
  };

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-semibold">Orders</h1>

      {isLoading && <LoadingSpinner />}
      {orders && orders.length === 0 && (
        <EmptyState icon={<FiShoppingCart />} title="No orders yet" />
      )}
      {orders && orders.length > 0 && (
        <OrderTable
          orders={orders}
          isAdmin
          onStatusChange={handleStatusChange}
          onDelete={(id) => setPendingDeleteId(id)}
          mutatingId={activeId}
        />
      )}

      <ConfirmDialog
        isOpen={!!pendingDeleteId}
        title="Delete this order?"
        description="This will soft-delete the order record."
        isLoading={deleteOrder.isPending}
        onConfirm={handleConfirmDelete}
        onCancel={() => setPendingDeleteId(null)}
      />
    </div>
  );
}