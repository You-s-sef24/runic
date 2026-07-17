"use client";

import { useQuery } from "@tanstack/react-query";
import { getOrdersByUser } from "@/api/orders";

export default function useGetOrders(userId) {
    return useQuery({
        queryKey: ["orders", userId],
        queryFn: () => getOrdersByUser(userId),
        enabled: !!userId,
    });
}