"use client";

import { getOrders } from "@/api/orders";
import { getFeaturedProducts } from "@/api/products";
import { useQuery } from "@tanstack/react-query";

async function getBestsellerProducts() {
    const [orders, products] = await Promise.all([
        getOrders(),
        getFeaturedProducts(),
    ]);

    console.log("ORDERS:", orders);
    console.log("PRODUCTS:", products);

    const salesCount = {};
    orders.forEach((order) => {
        order.items?.forEach((item) => {
            salesCount[item.productId] =
                (salesCount[item.productId] || 0) + item.quantity;
        });
    });

    console.log("SALES COUNT:", salesCount);

    const bestsellerIds = Object.entries(salesCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([productId]) => productId);

    console.log("BESTSELLER IDS:", bestsellerIds);

    const bestsellers = bestsellerIds
        .map((id) => products.find((p) => String(p.id) === String(id)))
        .filter(Boolean);

    console.log("BESTSELLERS:", bestsellers);
    console.log("SALES COUNT:", JSON.stringify(salesCount, null, 2));
    console.log("BESTSELLER IDS:", JSON.stringify(bestsellerIds));
    console.log("PRODUCTS IDS:", JSON.stringify(products.map(p => p.id)));

    return bestsellers;
}


export default function useGetBestseller() {
    return useQuery({
        queryKey: ["bestseller-products"],
        queryFn: getBestsellerProducts,
    });
}