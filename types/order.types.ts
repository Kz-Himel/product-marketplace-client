export type OrderStatus = "PENDING" | "CONFIRMED" | "SHIPPED" | "DELIVERED" | "CANCELLED";

export interface Order {
  id: string;
  quantity: number;
  totalPrice: number;
  status: OrderStatus;
  userId: string;
  productId: string;
  user?: { id: string; name: string; email: string };
  product?: { id: string; name: string; price: number };
  isDeleted?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderPayload {
  quantity: number;
  productId: string;
}

export interface UpdateOrderPayload {
  status?: OrderStatus;
  quantity?: number;
}