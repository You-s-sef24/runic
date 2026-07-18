"use client";

import Image from "next/image";
import Link from "next/link";
import { Package, Clock, CheckCircle2, Truck, ArrowLeft, Hammer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import useGetOrders from "@/hooks/orders/useGetOrders";
import ProtectedRoutes from "@/components/ProtectedRoutes";

const STATUS_CONFIG = {
    pending: {
        bg: "bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900/50",
        icon: <Clock className="w-4 h-4 stroke-[2.5]" />,
    },
    delivered: {
        bg: "bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900/50",
        icon: <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />,
    }
};

export default function OrdersPage() {
    const user = useAuthStore((state) => state.user);
    const { data: orders, isLoading, isError } = useGetOrders(user?.id);

    const sortedOrders = (orders || []).slice().sort((a, b) => b.createdAt - a.createdAt);

    return (
        <ProtectedRoutes>
            <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
                <div className="mb-8">
                    <Link
                        href="/collection"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors uppercase tracking-wider mb-4"
                    >
                        <ArrowLeft size={14} /> Back to Shop
                    </Link>
                    <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
                        Your Orders
                    </h1>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">
                        Manage, track, and review your purchases.
                    </p>
                </div>

                {isLoading && (
                    <div className="space-y-4">
                        {[...Array(2)].map((_, i) => (
                            <div key={i} className="h-40 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 animate-pulse" />
                        ))}
                    </div>
                )}

                {isError && (
                    <p className="text-sm text-red-600 dark:text-red-400 text-center py-10">
                        Failed to load your orders. Please try again later.
                    </p>
                )}

                {!isLoading && !isError && sortedOrders.length === 0 && (
                    <div className="text-center py-16 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/20">
                        <Package className="w-12 h-12 text-zinc-300 dark:text-zinc-700 mx-auto mb-4 stroke-[1.5]" />
                        <h3 className="font-semibold text-zinc-800 dark:text-zinc-200 text-base">No orders found</h3>
                        <p className="text-zinc-400 dark:text-zinc-500 text-xs mt-1 max-w-[280px] mx-auto">
                            Looks like you haven&apos;t placed any orders yet.
                        </p>
                        <Link href="/collection" className="inline-block mt-5">
                            <Button className="bg-blue-900 hover:bg-blue-950 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-white text-xs font-bold uppercase tracking-wider px-6 py-2.5">
                                Start Shopping
                            </Button>
                        </Link>
                    </div>
                )}

                {!isLoading && !isError && sortedOrders.length > 0 && (
                    <div className="space-y-6">
                        {sortedOrders.map((order) => (
                            <div
                                key={order.id}
                                className="border border-zinc-100 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-900 shadow-xs overflow-hidden transition-all duration-300 hover:border-zinc-200 dark:hover:border-zinc-700"
                            >
                                <div className="bg-zinc-50/50 dark:bg-zinc-900/50 px-5 py-4 border-b border-zinc-100 dark:border-zinc-800 flex flex-wrap gap-4 items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                                    <div className="flex flex-wrap gap-x-6 gap-y-1">
                                        <span>
                                            Order placed:{" "}
                                            <strong className="text-zinc-800 dark:text-zinc-200">
                                                {new Date(order.createdAt * 1000).toLocaleDateString("en-US", {
                                                    month: "short",
                                                    day: "numeric",
                                                    year: "numeric",
                                                })}
                                            </strong>
                                        </span>
                                        <span>
                                            Order ID: <strong className="text-zinc-800 dark:text-zinc-200">#{order.id}</strong>
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-6">
                                        <div>
                                            Total:{" "}
                                            <strong className="text-zinc-950 dark:text-zinc-100 text-sm font-bold">
                                                ${order.total.toFixed(2)}
                                            </strong>
                                        </div>

                                        <span
                                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border capitalize ${(STATUS_CONFIG[order.status] || STATUS_CONFIG.pending).bg
                                                }`}
                                        >
                                            {(STATUS_CONFIG[order.status] || STATUS_CONFIG.pending).icon}
                                            {order.status}
                                        </span>
                                    </div>
                                </div>

                                {order.items.length > 0 && (
                                    <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                                        {order.items.map((item, i) => (
                                            <div key={`${order.id}-${i}`} className="p-5 flex items-start gap-4">
                                                <div className="relative w-16 h-20 rounded bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-800 flex-shrink-0 overflow-hidden">
                                                    <Image
                                                        src={item.image || "/placeholder.png"}
                                                        alt={item.name?.en || "Product"}
                                                        fill
                                                        unoptimized
                                                        sizes="64px"
                                                        className="object-contain p-2"
                                                    />
                                                </div>

                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-semibold text-zinc-800 dark:text-zinc-200 text-sm leading-tight hover:text-zinc-600 dark:hover:text-zinc-400 truncate">
                                                        <Link href={`/collection/${item.productId}`}>{item.name?.en}</Link>
                                                    </h4>
                                                    <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400 mt-2">
                                                        <span>
                                                            Qty: <strong className="text-zinc-700 dark:text-zinc-300">{item.quantity}</strong>
                                                        </span>
                                                        <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                                                        <span>
                                                            Unit Price:{" "}
                                                            <strong className="text-zinc-700 dark:text-zinc-300">${item.price.toFixed(2)}</strong>
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col gap-2 self-center">
                                                    <Link href={`/collection/${item.productId}`}>
                                                        <Button variant="outline" className="text-xs font-semibold py-1.5 px-3 h-auto border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800 cursor-pointer">
                                                            Buy Again
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div className="px-5 py-3 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/30 dark:bg-zinc-900/30 space-y-1">
                                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                        Shipping to: <span className="text-zinc-700 dark:text-zinc-300">{order.shippingAddress}</span>
                                    </p>
                                    {order.nails > 0 && (
                                        <p className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
                                            <Hammer className="w-3 h-3" />
                                            Nails included: <span className="text-zinc-700 dark:text-zinc-300 font-medium">{order.nails}</span>
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </ProtectedRoutes>
    );
}