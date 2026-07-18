"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import ProductCard from "./ProductCard";
import useGetFeaturedProducts from "@/hooks/products/useGetFeaturedProducts";

export default function FeaturedProducts() {
  const { data: products, isLoading, isError } = useGetFeaturedProducts();

  return (
    <section className="py-10 sm:py-14">
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-zinc-100 tracking-tight">
          Featured Collection
        </h2>
        <Link href="/collection">
          <Button className="bg-blue-900 hover:bg-blue-950 dark:bg-blue-700 dark:hover:bg-blue-600 text-white cursor-pointer">
            See All Collection
          </Button>
        </Link>
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
          Failed to load products. Please try again later.
        </p>
      )}

      {!isLoading && !isError && (
        <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
          {products?.slice(0, 3).map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      )}
    </section>
  );
}
