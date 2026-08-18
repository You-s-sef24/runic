"use client";

import { useTranslation } from "react-i18next";
import ProductCard from "./ProductCard";
import useGetFeaturedProducts from "@/hooks/products/useGetFeaturedProducts";

export default function FeaturedProducts() {
  const { t } = useTranslation();
  const { data: products, isLoading, isError } = useGetFeaturedProducts();

  return (
    <section className="py-10 sm:py-14">
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-zinc-100 tracking-tight">
          {t("featuredProducts.title")}
        </h2>
      </div>

      {isLoading && (
        <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="rounded-xl bg-gray-100/70 dark:bg-zinc-900/50 p-5 sm:p-6 animate-pulse"
            >
              <div className="aspect-square mb-4 bg-gray-200 dark:bg-zinc-800 rounded-md" />
              <div className="h-3 w-16 bg-gray-200 dark:bg-zinc-800 rounded mb-2" />
              <div className="h-4 w-32 bg-gray-200 dark:bg-zinc-800 rounded mb-2" />
              <div className="h-4 w-20 bg-gray-200 dark:bg-zinc-800 rounded" />
            </div>
          ))}
        </div>
      )}

      {isError && (
        <p className="text-sm text-red-600 dark:text-red-400">
          {t("featuredProducts.error")}
        </p>
      )}

      {!isLoading && !isError && products?.length === 0 && (
        <p className="text-sm text-gray-500 dark:text-zinc-400">
          {t("featuredProducts.empty")}
        </p>
      )}

      {!isLoading && !isError && products?.length > 0 && (
        <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
          {products.slice(0, 3).map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      )}
    </section>
  );
}
