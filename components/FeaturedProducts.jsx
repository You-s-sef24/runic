"use client";

import Link from "next/link";
import useGetProducts from "@/hooks/products/useGetProducts";
import { Button } from "./ui/button";
import ProductCard from "./ProductCard";

export default function FeaturedProducts() {
  const { data: products, isLoading, isError } = useGetProducts();

  return (
    <section className="py-10 sm:py-14">
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Featured Products
        </h2>
        <Link href="/all-products">
          <Button className="bg-blue-900 hover:bg-blue-950 cursor-pointer">
            See All Products
          </Button>
        </Link>
      </div>

      {isLoading && (
        <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="rounded-xl bg-gray-100/70 p-5 sm:p-6 animate-pulse"
            >
              <div className="aspect-square mb-4 bg-gray-200 rounded-md" />
              <div className="h-3 w-16 bg-gray-200 rounded mb-2" />
              <div className="h-4 w-32 bg-gray-200 rounded mb-2" />
              <div className="h-4 w-20 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      )}

      {isError && (
        <p className="text-sm text-red-600">
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
