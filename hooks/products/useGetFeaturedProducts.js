"use client";

import { getFeaturedProducts } from "@/api/products";
import { useQuery } from "@tanstack/react-query";

export default function useGetFeaturedProducts() {
    return useQuery({
        queryKey: ["featured-products"],
        queryFn: getFeaturedProducts,
    });
}