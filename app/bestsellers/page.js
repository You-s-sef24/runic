"use client";

import { useTranslation } from "react-i18next";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { ChevronRight, TrendingUp } from "lucide-react";
import useGetBestseller from "@/hooks/products/useGetBestSeller";

export default function BestSellersPage() {
    const { t } = useTranslation();
    const { data: products, isLoading, isError } = useGetBestseller();

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
            <nav className="flex items-center gap-2 text-xs font-medium text-gray-400 dark:text-zinc-500 mb-8 tracking-wide uppercase">
                <Link href="/" className="hover:text-blue-900 dark:hover:text-zinc-100 transition-colors">
                    {t("bestsellers.home")}
                </Link>
                <ChevronRight size={12} className="opacity-60 rtl:rotate-180" />
                <span className="text-gray-600 dark:text-zinc-400 truncate max-w-[180px]">
                    {t("bestsellers.title")}
                </span>
            </nav>

            <div className="mb-8">
                <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <span className="text-xs font-semibold tracking-widest uppercase text-blue-600 dark:text-blue-400">
                        {t("bestsellers.badge")}
                    </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-zinc-100">
                    {t("bestsellers.title")}
                </h1>
                <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1">
                    {t("bestsellers.subtitle")}
                </p>
            </div>

            {isLoading && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
                    {[...Array(3)].map((_, i) => (
                        <div
                            key={i}
                            className="rounded-2xl border border-gray-200 dark:border-zinc-800 p-4 animate-pulse"
                        >
                            <div className="aspect-[3/4] mb-4 bg-gray-100 dark:bg-zinc-800/60 rounded-md" />
                            <div className="h-3 w-16 bg-gray-100 dark:bg-zinc-800/60 rounded mb-2" />
                            <div className="h-4 w-32 bg-gray-100 dark:bg-zinc-800/60 rounded mb-2" />
                            <div className="h-4 w-20 bg-gray-100 dark:bg-zinc-800/60 rounded" />
                        </div>
                    ))}
                </div>
            )}

            {isError && (
                <p className="text-sm text-red-600 dark:text-red-400">
                    {t("bestsellers.error")}
                </p>
            )}

            {!isLoading && !isError && products?.length === 0 && (
                <p className="text-sm text-gray-500 dark:text-zinc-400">
                    {t("bestsellers.noProducts")}
                </p>
            )}

            {!isLoading && !isError && products?.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
                    {products.map((product, index) => (
                        <div key={product.id} className="relative">
                            <span className="absolute top-2 start-2 z-10 flex items-center justify-center w-7 h-7 rounded-full bg-blue-950 dark:bg-zinc-100 text-white dark:text-zinc-950 text-xs font-bold shadow-md">
                                #{index + 1}
                            </span>
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
}