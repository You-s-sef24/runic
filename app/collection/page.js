"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import ProductCard from "@/components/ProductCard";
import useGetProducts from "@/hooks/products/useGetProducts";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const PAGE_SIZE = 8;

export default function AllProductsPage() {
    const { t } = useTranslation();
    const SORT_OPTIONS = [
        { value: `${t(`collection.sortOptions.newest`)}`, labelKey: "collection.sortOptions.newest", sortBy: "id", order: "desc" },
        { value: `${t(`collection.sortOptions.priceLowToHigh`)}`, labelKey: "collection.sortOptions.priceLowToHigh", sortBy: "price", order: "asc" },
        { value: `${t(`collection.sortOptions.priceHighToLow`)}`, labelKey: "collection.sortOptions.priceHighToLow", sortBy: "price", order: "desc" },
    ];
    const [page, setPage] = useState(1);
    const [sortValue, setSortValue] = useState(`${t(`collection.sortOptions.newest`)}`);
    const { sortBy, order } = SORT_OPTIONS.find((o) => o.value === sortValue) || SORT_OPTIONS[0];

    const { data: products, isLoading, isError, isPlaceholderData } = useGetProducts({
        page,
        limit: PAGE_SIZE,
        sortBy,
        order,
    });

    const hasNextPage = products?.length === PAGE_SIZE;

    function handleSortChange(value) {
        setSortValue(value);
        setPage(1);
    }

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
            <nav className="flex items-center gap-2 text-xs font-medium text-gray-400 dark:text-zinc-500 mb-8 tracking-wide uppercase">
                <Link href="/" className="hover:text-blue-900 dark:hover:text-zinc-100 transition-colors">
                    {t("collection.home")}
                </Link>
                <ChevronRight size={12} className="opacity-60 rtl:rotate-180" />
                <span className="text-gray-600 dark:text-zinc-400 truncate max-w-[180px]">
                    {t("collection.title")}
                </span>
            </nav>

            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-zinc-100">
                    {t("collection.title")}
                </h1>

                <Select value={t(`${sortValue}`)} onValueChange={handleSortChange}>
                    <SelectTrigger className="w-[200px] border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-gray-900 dark:text-zinc-100">
                        <SelectValue placeholder={t("collection.sortBy")} />
                    </SelectTrigger>
                    <SelectContent className="border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-gray-900 dark:text-zinc-100">
                        {SORT_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {t(option.labelKey)}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {isLoading && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                    {[...Array(8)].map((_, i) => (
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
                    {t("collection.error")}
                </p>
            )}

            {!isLoading && !isError && products?.length === 0 && (
                <p className="text-sm text-gray-500 dark:text-zinc-400">
                    {t("collection.noProducts")}
                </p>
            )}

            {!isLoading && !isError && products?.length > 0 && (
                <>
                    <div
                        className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 transition-opacity ${isPlaceholderData ? "opacity-50" : "opacity-100"
                            }`}
                    >
                        {products.map((product) => (
                            <ProductCard product={product} key={product.id} />
                        ))}
                    </div>

                    <Pagination className="mt-10">
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    text={t("collection.pagination.previous")}
                                    onClick={() => page > 1 && setPage((p) => p - 1)}
                                    className={
                                        page === 1
                                            ? "pointer-events-none opacity-40 text-gray-400 dark:text-zinc-600"
                                            : "cursor-pointer text-gray-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-800"
                                    }
                                />
                            </PaginationItem>

                            <PaginationItem>
                                <PaginationLink isActive className="bg-gray-900 dark:bg-zinc-100 text-white dark:text-zinc-950">
                                    {page}
                                </PaginationLink>
                            </PaginationItem>

                            <PaginationItem>
                                <PaginationNext
                                    text={t("collection.pagination.next")}
                                    onClick={() =>
                                        hasNextPage && !isPlaceholderData && setPage((p) => p + 1)
                                    }
                                    className={
                                        !hasNextPage || isPlaceholderData
                                            ? "pointer-events-none opacity-40 text-gray-400 dark:text-zinc-600"
                                            : "cursor-pointer text-gray-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-800"
                                    }
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </>
            )}
        </main>
    );
}