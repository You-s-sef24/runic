"use client";

import { getProducts } from "@/api/products";
import { useQuery } from "@tanstack/react-query";

export default function useGetProducts() {
    return useQuery({
        queryKey: ["products"],
        queryFn: getProducts,
    });
}