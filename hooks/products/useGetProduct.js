"use client";

import { getProductById } from "@/api/products";
import { useQuery } from "@tanstack/react-query";

export default function useGetProduct(id) {
    return useQuery({
        queryKey: ["product", id],
        queryFn: () => getProductById(id),
        enabled: !!id,
    });
}