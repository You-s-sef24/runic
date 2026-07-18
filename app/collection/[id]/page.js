"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { ShoppingCart, ChevronRight } from "lucide-react";
import useGetProduct from "@/hooks/products/useGetProduct";
import { useCartStore } from "@/store/cartStore";

export default function ProductDetailsPage() {
    const { id } = useParams();
    const { data: product, isLoading, isError } = useGetProduct(id);
    const addToCart = useCartStore((state) => state.addToCart);

    function handleAddToCart(e) {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
        toast.success("Added to your cart");
    }

    if (isLoading) {
        return (
            <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 animate-pulse">
                <div className="h-4 w-48 bg-gray-100 dark:bg-zinc-800/60 rounded mb-8" />
                <div className="grid md:grid-cols-12 gap-8 lg:gap-16 items-center">
                    <div className="md:col-span-6 aspect-square max-w-[500px] w-full bg-zinc-100/60 dark:bg-zinc-800/40 rounded-xl mx-auto" />
                    <div className="md:col-span-6 space-y-5">
                        <div className="h-4 w-24 bg-gray-200 dark:bg-zinc-800/60 rounded" />
                        <div className="h-10 w-3/4 bg-gray-200 dark:bg-zinc-800/60 rounded" />
                        <div className="h-8 w-28 bg-gray-200 dark:bg-zinc-800/60 rounded" />
                        <div className="h-24 w-full bg-gray-200 dark:bg-zinc-800/60 rounded" />
                        <div className="h-12 w-full bg-gray-200 dark:bg-zinc-800/60 rounded" />
                    </div>
                </div>
            </main>
        );
    }

    if (isError || !product) {
        return (
            <main className="max-w-6xl mx-auto px-4 sm:px-6 py-16 text-center">
                <div className="max-w-md mx-auto p-8 rounded-2xl border border-red-100 dark:border-red-900/30 bg-red-50/50 dark:bg-red-950/10">
                    <p className="text-sm font-medium text-red-600 dark:text-red-400">
                        Failed to load this product. Please try again later.
                    </p>
                </div>
            </main>
        );
    }

    const { image, name, price, dimensions, desc, category } = product;

    return (
        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-12">

            <nav className="flex items-center gap-2 text-xs font-medium text-gray-400 dark:text-zinc-500 mb-8 tracking-wide uppercase">
                <Link href="/" className="hover:text-blue-900 dark:hover:text-zinc-100 transition-colors">Home</Link>
                <ChevronRight size={12} className="opacity-60" />
                <Link href="/collection" className="hover:text-blue-900 dark:hover:text-zinc-100 transition-colors">Collection</Link>
                <ChevronRight size={12} className="opacity-60" />
                <span className="text-gray-600 dark:text-zinc-400 truncate max-w-[180px]">{name?.en}</span>
            </nav>

            <div className="grid md:grid-cols-12 gap-8 lg:gap-16 items-center">

                <div className="md:col-span-6 flex justify-center">
                    <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center">
                        <Image
                            src={image || "/placeholder.png"}
                            alt={name?.en || "Product image"}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
                            className="object-contain w-full h-full rounded-xl drop-shadow-[0_12px_32px_rgba(0,0,0,0.08)] dark:drop-shadow-[0_12px_32px_rgba(0,0,0,0.4)] hover:scale-[1.02] transition-transform duration-500 ease-out"
                            priority
                        />
                    </div>
                </div>

                <div className="md:col-span-6 flex flex-col justify-center">

                    <div className="pb-6 border-b border-gray-100 dark:border-zinc-800">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-zinc-100 tracking-tight leading-tight">
                            {name?.en}
                        </h1>
                        <p className="mt-3 text-2xl font-extrabold text-blue-900 dark:text-blue-400 tracking-tight">
                            ${Number(price ?? 0).toFixed(2)}
                        </p>
                    </div>

                    <div className="py-6 space-y-5">
                        {desc && (
                            <p className="text-sm sm:text-base text-gray-600 dark:text-zinc-400 leading-relaxed">
                                {desc.en}
                            </p>
                        )}

                        {dimensions && (
                            <div className="flex items-center gap-2">
                                <div className="inline-flex flex-col bg-zinc-50 dark:bg-zinc-900/50 border border-gray-100/85 dark:border-zinc-800 rounded-lg px-4 py-2.5 self-start">
                                    <span className="text-[10px] text-gray-400 dark:text-zinc-500 uppercase tracking-wider mb-0.5">Frame Size</span>
                                    <span className="text-sm text-gray-900 dark:text-zinc-100 font-semibold">{dimensions} in</span>
                                </div>
                                <div className="inline-flex flex-col bg-zinc-50 dark:bg-zinc-900/50 border border-gray-100/85 dark:border-zinc-800 rounded-lg px-4 py-2.5 self-start">
                                    <span className="text-[10px] text-gray-400 dark:text-zinc-500 uppercase tracking-wider mb-0.5">Category</span>
                                    <span className="text-sm text-gray-900 dark:text-zinc-100 font-semibold">{category?.en}</span>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="pt-2">
                        <button
                            onClick={handleAddToCart}
                            className="w-full flex items-center justify-center gap-2.5 bg-blue-900 hover:bg-blue-950 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 rounded-xl py-3.5 text-sm font-semibold tracking-wide transition-all duration-200 cursor-pointer shadow-lg shadow-blue-900/15 dark:shadow-none active:scale-[0.98]"
                        >
                            <ShoppingCart className="w-4 h-4" />
                            Add to Cart
                        </button>
                    </div>

                </div>
            </div>
        </main>
    );
}