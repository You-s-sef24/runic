"use client";

import { getOrders } from "@/api/orders";
import { getFeaturedProducts } from "@/api/products";
import { useQuery } from "@tanstack/react-query";

async function getBestsellerProducts() {
    const [orders, products] = await Promise.all([
        getOrders(),
        getFeaturedProducts(),
    ]);

    const salesCount = {};
    orders.forEach((order) => {
        order.items?.forEach((item) => {
            salesCount[item.productId] =
                (salesCount[item.productId] || 0) + item.quantity;
        });
    });

    const bestsellerIds = Object.entries(salesCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([productId]) => productId);

    const bestsellers = bestsellerIds
        .map((id) => products.find((p) => String(p.id) === String(id)))
        .filter(Boolean);

    return bestsellers;
}


export default function useGetBestseller() {
    return useQuery({
        queryKey: ["bestseller-products"],
        queryFn: getBestsellerProducts,
    });
}