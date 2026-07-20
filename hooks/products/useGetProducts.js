"use client";

import { getProducts } from "@/api/products";
import { useQuery } from "@tanstack/react-query";

export default function useGetProducts({ page = 1, limit = 8, sortBy, order, category } = {}) {
    return useQuery({
        queryKey: ["products", page, limit, sortBy, order, category],
        queryFn: () => getProducts({ page, limit, sortBy, order, category }),
        placeholderData: (previousData) => previousData,
    });
}