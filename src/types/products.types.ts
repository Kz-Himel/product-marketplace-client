export type ProductStatus = "ACTIVE" | "INACTIVE" | "OUT_OF_STOCK";

export interface ProductCategoryRef {
  id: string;
  name: string;
}

export interface ProductReviewRef {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  user: { id: string; name: string };
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image?: string | null;
  status: ProductStatus;
  categoryId: string;
  category?: ProductCategoryRef;
  reviews?: ProductReviewRef[];
  isDeleted?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductPayload {
  name: string;
  description?: string;
  price: number;
  stock: number;
  image?: string;
  status?: ProductStatus;
  categoryId: string;
}