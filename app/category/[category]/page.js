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
import { useParams } from "next/navigation";

const PAGE_SIZE = 8;

const SORT_OPTIONS = [
    { value: "Newest", label: "Newest", sortBy: "id", order: "desc" },
    { value: "Price: Low to High", label: "Price: Low to High", sortBy: "price", order: "asc" },
    { value: "Price: High to Low", label: "Price: High to Low", sortBy: "price", order: "desc" },
];

export default function CategoryProductsPage() {
    const { category } = useParams();

    const [page, setPage] = useState(1);
    const [sortValue, setSortValue] = useState("Newest");

    const { sortBy, order } = SORT_OPTIONS.find((o) => o.value === sortValue);

    const { data: allProducts, isLoading, isError } = useGetProducts();

    const filteredProducts = (allProducts || [])
        .filter((p) => p.category?.id?.toLowerCase() === category.toLowerCase())
        .sort((a, b) => {
            if (sortBy === "price") {
                return order === "asc" ? a.price - b.price : b.price - a.price;
            }
            return order === "desc" ? b.id - a.id : a.id - b.id;
        });

    const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE) || 1;
    const paginatedProducts = filteredProducts.slice(
        (page - 1) * PAGE_SIZE,
        page * PAGE_SIZE
    );

    function handleSortChange(value) {
        setSortValue(value);
        setPage(1);
    }

    const categoryTitle =
        filteredProducts[0]?.category?.en ||
        category.charAt(0).toUpperCase() + category.slice(1);

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14 text-foreground">
            {/* Breadcrumb Navigation */}
            <nav className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-8 tracking-wide uppercase">
                <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                <ChevronRight size={12} className="opacity-60" />
                <span className="text-foreground/70 truncate max-w-[180px]">{categoryTitle}</span>
            </nav>

            {/* Header Toolbar */}
            <div className="flex items-center justify-between mb-8 gap-4">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                    {categoryTitle}
                </h1>

                <Select value={sortValue} onValueChange={handleSortChange}>
                    <SelectTrigger className="w-[200px] bg-background border-input text-foreground">
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border text-popover-foreground">
                        {SORT_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Loading Skeleton Grid */}
            {isLoading && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                    {[...Array(PAGE_SIZE)].map((_, i) => (
                        <div
                            key={i}
                            className="rounded-2xl border border-border p-4 animate-pulse bg-card text-card-foreground"
                        >
                            <div className="aspect-[3/4] mb-4 bg-muted rounded-xl" />
                            <div className="h-3 w-16 bg-muted rounded mb-2" />
                            <div className="h-4 w-32 bg-muted rounded mb-2" />
                            <div className="h-4 w-20 bg-muted rounded" />
                        </div>
                    ))}
                </div>
            )}

            {/* Error state */}
            {isError && (
                <div className="p-6 bg-destructive/5 border border-destructive/10 rounded-2xl">
                    <p className="text-sm text-destructive font-medium">
                        Failed to load products for this category. Please try again later.
                    </p>
                </div>
            )}

            {/* Empty state */}
            {!isLoading && !isError && filteredProducts.length === 0 && (
                <div className="text-center py-12 border border-dashed border-border rounded-2xl bg-muted/10">
                    <p className="text-sm text-muted-foreground font-medium">No products found in this category.</p>
                </div>
            )}

            {/* Main Products Grid & Pagination */}
            {!isLoading && !isError && filteredProducts.length > 0 && (
                <>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                        {paginatedProducts.map((product) => (
                            <ProductCard product={product} key={product.id} />
                        ))}
                    </div>

                    <Pagination className="mt-12">
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() => page > 1 && setPage((p) => p - 1)}
                                    className={
                                        page === 1
                                            ? "pointer-events-none opacity-40 text-muted-foreground"
                                            : "cursor-pointer hover:bg-muted text-foreground transition-colors"
                                    }
                                />
                            </PaginationItem>

                            {[...Array(totalPages)].map((_, i) => (
                                <PaginationItem key={i}>
                                    <PaginationLink
                                        isActive={page === i + 1}
                                        onClick={() => setPage(i + 1)}
                                        className="cursor-pointer transition-colors"
                                    >
                                        {i + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}

                            <PaginationItem>
                                <PaginationNext
                                    onClick={() => page < totalPages && setPage((p) => p + 1)}
                                    className={
                                        page === totalPages
                                            ? "pointer-events-none opacity-40 text-muted-foreground"
                                            : "cursor-pointer hover:bg-muted text-foreground transition-colors"
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