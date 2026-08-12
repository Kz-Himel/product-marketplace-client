"use client";

import { motion } from "framer-motion";
import { FiBox, FiTag, FiShoppingCart, FiStar, FiUsers, FiDollarSign } from "react-icons/fi";
import { useProducts } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";
import { useOrders } from "@/hooks/useOrders";
import { useReviews } from "@/hooks/useReviews";
import { useUsers } from "@/hooks/useUsers";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

function StatCard({
  icon,
  label,
  value,
  index,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="rounded-2xl border border-border bg-surface p-5"
    >
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
        {icon}
      </div>
      <p className="font-mono text-2xl font-semibold">{value}</p>
      <p className="mt-1 text-sm text-muted">{label}</p>
    </motion.div>
  );
}

export default function DashboardOverviewPage() {
  const { data: products, isLoading: loadingProducts } = useProducts();
  const { data: categories, isLoading: loadingCategories } = useCategories();
  const { data: orders, isLoading: loadingOrders } = useOrders();
  const { data: reviews, isLoading: loadingReviews } = useReviews();
  const { data: users, isLoading: loadingUsers } = useUsers();

  const isLoading =
    loadingProducts || loadingCategories || loadingOrders || loadingReviews || loadingUsers;

  const totalRevenue =
    orders
      ?.filter((order) => order.status !== "CANCELLED")
      .reduce((sum, order) => sum + order.totalPrice, 0) ?? 0;

  if (isLoading) return <LoadingSpinner label="Loading overview..." />;

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-semibold">Overview</h1>
        <p className="mt-1 text-muted">A quick snapshot of your marketplace</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard icon={<FiBox />} label="Products" value={products?.length ?? 0} index={0} />
        <StatCard icon={<FiTag />} label="Categories" value={categories?.length ?? 0} index={1} />
        <StatCard icon={<FiShoppingCart />} label="Orders" value={orders?.length ?? 0} index={2} />
        <StatCard icon={<FiStar />} label="Reviews" value={reviews?.length ?? 0} index={3} />
        <StatCard icon={<FiUsers />} label="Users" value={users?.length ?? 0} index={4} />
        <StatCard
          icon={<FiDollarSign />}
          label="Revenue (excl. cancelled)"
          value={`$${totalRevenue.toFixed(2)}`}
          index={5}
        />
      </div>
    </div>
  );
}