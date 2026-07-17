"use client";

import Image from "next/image";
import Link from "next/link";
import { Package, Clock, CheckCircle2, XCircle, Truck, ArrowLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import useGetOrders from "@/hooks/orders/useGetOrders";
import ProtectedRoutes from "@/components/ProtectedRoutes";

const STATUS_CONFIG = {
    pending: {
        bg: "bg-amber-50 text-amber-700 border-amber-100",
        icon: <Clock className="w-4 h-4 stroke-[2.5]" />,
    },
    delivered: {
        bg: "bg-emerald-50 text-emerald-700 border-emerald-100",
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
                    <nav className="flex items-center gap-2 text-xs font-medium text-gray-400 mb-8 tracking-wide uppercase">
                        <Link href="/" className="hover:text-blue-900 transition-colors">Home</Link>
                        <ChevronRight size={12} className="opacity-60" />
                        <span className="text-gray-600 truncate max-w-[180px]">Orders</span>
                    </nav>
                    <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
                        Your Orders
                    </h1>
                    <p className="text-zinc-500 text-sm mt-1">
                        Manage, track, and review your purchases.
                    </p>
                </div>

                {isLoading && (
                    <div className="space-y-4">
                        {[...Array(2)].map((_, i) => (
                            <div key={i} className="h-40 rounded-xl bg-zinc-100 animate-pulse" />
                        ))}
                    </div>
                )}

                {isError && (
                    <p className="text-sm text-red-600 text-center py-10">
                        Failed to load your orders. Please try again later.
                    </p>
                )}

                {!isLoading && !isError && sortedOrders.length === 0 && (
                    <div className="text-center py-16 border border-dashed border-zinc-200 rounded-2xl bg-zinc-50/50">
                        <Package className="w-12 h-12 text-zinc-300 mx-auto mb-4 stroke-[1.5]" />
                        <h3 className="font-semibold text-zinc-800 text-base">No orders found</h3>
                        <p className="text-zinc-400 text-xs mt-1 max-w-[280px] mx-auto">
                            Looks like you haven&apos;t placed any orders yet.
                        </p>
                        <Link href="/collection" className="inline-block mt-5">
                            <Button className="bg-blue-900 hover:bg-blue-950 text-xs font-bold uppercase tracking-wider px-6 py-2.5">
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
                                className="border border-zinc-100 rounded-xl bg-white shadow-sm overflow-hidden transition-all duration-300 hover:border-zinc-200"
                            >
                                <div className="bg-zinc-50/50 px-5 py-4 border-b border-zinc-100 flex flex-wrap gap-4 items-center justify-between text-xs text-zinc-500 font-medium">
                                    <div className="flex flex-wrap gap-x-6 gap-y-1">
                                        <span>
                                            Order placed:{" "}
                                            <strong className="text-zinc-800">
                                                {new Date(order.createdAt * 1000).toLocaleDateString("en-US", {
                                                    month: "short",
                                                    day: "numeric",
                                                    year: "numeric",
                                                })}
                                            </strong>
                                        </span>
                                        <span>
                                            Order ID: <strong className="text-zinc-800">#{order.id}</strong>
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-6">
                                        <div>
                                            Total:{" "}
                                            <strong className="text-zinc-950 text-sm font-bold">
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

                                <div className="divide-y divide-zinc-100">
                                    {order.items.map((item, i) => (
                                        <div key={`${order.id}-${i}`} className="p-5 flex items-start gap-4">
                                            <div className="relative w-16 h-20 rounded bg-zinc-50 border border-zinc-100 flex-shrink-0 overflow-hidden">
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
                                                <h4 className="font-semibold text-zinc-800 text-sm leading-tight hover:text-zinc-600 truncate">
                                                    <Link href={`/collection/${item.productId}`}>{item.name?.en}</Link>
                                                </h4>
                                                <div className="flex items-center gap-3 text-xs text-zinc-500 mt-2">
                                                    <span>
                                                        Qty: <strong className="text-zinc-700">{item.quantity}</strong>
                                                    </span>
                                                    <span className="w-1 h-1 rounded-full bg-zinc-300" />
                                                    <span>
                                                        Unit Price:{" "}
                                                        <strong className="text-zinc-700">${item.price.toFixed(2)}</strong>
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-2 self-center">
                                                <Link href={`/collection/${item.productId}`}>
                                                    <Button variant="outline" className="text-xs font-semibold py-1.5 px-3 h-auto cursor-pointer">
                                                        Buy Again
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </ProtectedRoutes>
    );
}