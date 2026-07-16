"use client";

import { getProducts } from "@/api/products";
import { useQuery } from "@tanstack/react-query";

export default function useGetProducts({ page = 1, limit = 8, sortBy, order } = {}) {
    return useQuery({
        queryKey: ["products", page, limit, sortBy, order],
        queryFn: () => getProducts({ page, limit, sortBy, order }),
        placeholderData: (previousData) => previousData,
    });
}