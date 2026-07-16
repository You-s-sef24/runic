"use client";

import { useState } from "react";
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

const SORT_OPTIONS = [
    { value: "Newest", label: "Newest", sortBy: "id", order: "desc" },
    { value: "Price: Low to High", label: "Price: Low to High", sortBy: "price", order: "asc" },
    { value: "Price: High to Low", label: "Price: High to Low", sortBy: "price", order: "desc" },
];

export default function AllProductsPage() {
    const [page, setPage] = useState(1);
    const [sortValue, setSortValue] = useState("Newest");

    const { sortBy, order } = SORT_OPTIONS.find((o) => o.value === sortValue);

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
            <nav className="flex items-center gap-2 text-xs font-medium text-gray-400 mb-8 tracking-wide uppercase">
                <Link href="/" className="hover:text-blue-900 transition-colors">Home</Link>
                <ChevronRight size={12} className="opacity-60" />
                <span className="text-gray-600 truncate max-w-[180px]">Collection</span>
            </nav>

            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    Collection
                </h1>

                <Select value={sortValue} onValueChange={handleSortChange}>
                    <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        {SORT_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
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
                            className="rounded-2xl border border-gray-200 p-4 animate-pulse"
                        >
                            <div className="aspect-[3/4] mb-4 bg-gray-100 rounded-md" />
                            <div className="h-3 w-16 bg-gray-100 rounded mb-2" />
                            <div className="h-4 w-32 bg-gray-100 rounded mb-2" />
                            <div className="h-4 w-20 bg-gray-100 rounded" />
                        </div>
                    ))}
                </div>
            )}

            {isError && (
                <p className="text-sm text-red-600">
                    Failed to load products. Please try again later.
                </p>
            )}

            {!isLoading && !isError && products?.length === 0 && (
                <p className="text-sm text-gray-500">No products found.</p>
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
                                    onClick={() => page > 1 && setPage((p) => p - 1)}
                                    className={
                                        page === 1
                                            ? "pointer-events-none opacity-40"
                                            : "cursor-pointer"
                                    }
                                />
                            </PaginationItem>

                            <PaginationItem>
                                <PaginationLink isActive>{page}</PaginationLink>
                            </PaginationItem>

                            <PaginationItem>
                                <PaginationNext
                                    onClick={() =>
                                        hasNextPage && !isPlaceholderData && setPage((p) => p + 1)
                                    }
                                    className={
                                        !hasNextPage || isPlaceholderData
                                            ? "pointer-events-none opacity-40"
                                            : "cursor-pointer"
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