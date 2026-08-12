"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight, FiShoppingBag, FiTag } from "react-icons/fi";
import { Button } from "@heroui/react";
import { useCategories } from "@/hooks/useCategories";
import { CategoryCard } from "@/components/categories/CategoryCard";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

export default function HomePage() {
  const { data: categories, isLoading } = useCategories();
  const featured = categories?.slice(0, 3) ?? [];

  return (
    <div>
      <section className="flex flex-col items-center py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
            <FiShoppingBag /> Product Marketplace
          </span>
          <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Shop from a catalog{" "}
            <span className="text-accent">built for the moment</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            Browse categories, compare products, and check out — with real-time
            stock and reviews from real buyers.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Link href="/products">
              <Button>
                Browse products <FiArrowRight className="ml-1" />
              </Button>
            </Link>
            <Link href="/categories">
              <Button variant="ghost">Explore categories</Button>
            </Link>
          </div>
        </motion.div>
      </section>

      <section className="pb-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-display text-2xl font-semibold">Featured categories</h2>
          <Link href="/categories" className="flex items-center gap-1 text-sm font-medium text-accent hover:underline">
            View all <FiArrowRight />
          </Link>
        </div>

        {isLoading && <LoadingSpinner label="Loading categories..." />}

        {!isLoading && featured.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border py-16 text-center text-muted">
            <FiTag className="text-2xl" />
            <p>No categories yet — check back soon.</p>
          </div>
        )}

        {featured.length > 0 && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.08 }}
              >
                <CategoryCard category={category} />
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}