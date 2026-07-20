"use client";

import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { Trash2, Plus, Minus, ShoppingBag, ChevronRight, ArrowLeft } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

export default function CartPage() {
    const router = useRouter();
    const { t, i18n } = useTranslation();
    const lang = i18n.language;
    const cartItems = useCartStore((state) => state.cart);
    const updateQuantity = useCartStore((state) => state.updateQuantity);
    const removeFromCart = useCartStore((state) => state.removeFromCart);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    function getItemName(item) {
        if (typeof item.name === "object") {
            return item.name?.[lang] || item.name?.en || item.title || t("cart.product");
        }
        return item.name || item.title || t("cart.product");
    }

    function handleQuantityChange(id, currentQty, delta) {
        updateQuantity(id, currentQty + delta);
    }

    function handleRemove(id, name) {
        removeFromCart(id);
        toast.success(t("cart.removedItem", { name }));
    }

    function handleCheckoutClick(e) {
        if (!isAuthenticated) {
            e.preventDefault();
            toast.error(t("cart.signInToCheckout"));
            router.push("/sign-in");
        }
    }

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = subtotal > 150 ? 0 : 15.0;
    const total = subtotal + shipping;

    if (cartItems.length === 0) {
        return (
            <main className="max-w-4xl mx-auto px-4 py-16 sm:py-24 text-center">
                <div className="flex flex-col items-center justify-center space-y-6">
                    <div className="p-5 bg-blue-50/60 dark:bg-zinc-800/40 rounded-full border border-blue-100/50 dark:border-zinc-700/50 text-blue-900 dark:text-blue-400">
                        <ShoppingBag className="w-10 h-10" strokeWidth={1.5} />
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-zinc-100 tracking-tight">{t("cart.emptyTitle")}</h1>
                        <p className="text-sm text-gray-500 dark:text-zinc-400 max-w-sm mx-auto">
                            {t("cart.emptyDesc")}
                        </p>
                    </div>
                    <Link
                        href="/collection"
                        className="inline-flex items-center gap-2 bg-blue-900 hover:bg-blue-950 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 rounded-xl px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-200 cursor-pointer shadow-md shadow-blue-900/10 dark:shadow-none active:scale-95"
                    >
                        <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
                        {t("cart.exploreCollection")}
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
            <nav className="flex items-center gap-2 text-xs font-medium text-gray-400 dark:text-zinc-500 mb-8 tracking-wide uppercase">
                <Link href="/" className="hover:text-blue-900 dark:hover:text-zinc-100 transition-colors">{t("cart.home")}</Link>
                <ChevronRight size={12} className="opacity-60 rtl:rotate-180" />
                <span className="text-gray-600 dark:text-zinc-400">{t("cart.yourCart")}</span>
            </nav>

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-zinc-100 tracking-tight mb-8">
                {t("cart.yourCart")} ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
            </h1>

            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                <div className="lg:col-span-7 space-y-4">
                    {cartItems.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center gap-4 sm:gap-6 p-4 rounded-xl border border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 shadow-xs hover:border-blue-100/50 dark:hover:border-zinc-700 transition-colors duration-200"
                        >
                            <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 bg-zinc-50 dark:bg-zinc-900 rounded-lg flex items-center justify-center">
                                <Image
                                    src={item.image || "/placeholder.png"}
                                    alt={getItemName(item)}
                                    fill
                                    unoptimized
                                    sizes="96px"
                                    className="object-contain p-2 drop-shadow-[0_4px_12px_rgba(0,0,0,0.06)] dark:drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
                                />
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <h2 className="text-sm sm:text-base font-bold text-gray-900 dark:text-zinc-100 truncate">
                                            {getItemName(item)}
                                        </h2>
                                        {item.dimensions && (
                                            <span className="inline-block mt-1 text-[10px] font-bold tracking-wider text-blue-900 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 border border-blue-100/40 dark:border-blue-900/30 px-2 py-0.5 rounded uppercase">
                                                {item.dimensions} {t("cart.inches")}
                                            </span>
                                        )}
                                    </div>

                                    <span className="hidden sm:block text-sm font-bold text-gray-900 dark:text-zinc-100">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between mt-4">
                                    <div className="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-lg px-2.5 py-1">
                                        <button
                                            onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                                            className="text-gray-500 dark:text-zinc-400 hover:text-blue-900 dark:hover:text-zinc-100 p-0.5 transition-colors disabled:opacity-30 cursor-pointer"
                                            disabled={item.quantity <= 1}
                                            aria-label={t("cart.decreaseQuantity")}
                                        >
                                            <Minus className="w-3.5 h-3.5" />
                                        </button>
                                        <span className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-zinc-200 w-4 text-center select-none">
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                                            className="text-gray-500 dark:text-zinc-400 hover:text-blue-900 dark:hover:text-zinc-100 p-0.5 transition-colors cursor-pointer"
                                            aria-label={t("cart.increaseQuantity")}
                                        >
                                            <Plus className="w-3.5 h-3.5" />
                                        </button>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <span className="sm:hidden text-sm font-bold text-gray-900 dark:text-zinc-100">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </span>
                                        <button
                                            onClick={() => handleRemove(item.id, getItemName(item))}
                                            className="text-gray-400 dark:text-zinc-500 hover:text-red-500 dark:hover:text-red-400 p-1.5 transition-colors cursor-pointer"
                                            aria-label={t("cart.removeItem")}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    <Link
                        href="/collection"
                        className="inline-flex items-center gap-2 text-xs font-semibold text-blue-900 dark:text-blue-400 hover:text-blue-950 dark:hover:text-blue-300 transition-colors uppercase tracking-wider pt-2"
                    >
                        <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" />
                        {t("cart.continueShopping")}
                    </Link>
                </div>

                <div className="lg:col-span-5 bg-zinc-50/50 dark:bg-zinc-900/30 border border-gray-100 dark:border-zinc-800 rounded-2xl p-6 lg:p-8">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-zinc-100 tracking-tight pb-4 border-b border-gray-100 dark:border-zinc-800">
                        {t("cart.orderSummary")}
                    </h2>

                    <div className="py-6 space-y-4 border-b border-gray-100 dark:border-zinc-800 text-sm font-medium">
                        <div className="flex justify-between text-gray-500 dark:text-zinc-400">
                            <span>{t("cart.subtotal")}</span>
                            <span className="text-gray-950 dark:text-zinc-100">${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-gray-500 dark:text-zinc-400">
                            <span>{t("cart.shipping")}</span>
                            <span className="text-gray-950 dark:text-zinc-100">
                                {shipping === 0 ? (
                                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold uppercase tracking-wider text-xs bg-emerald-50 dark:bg-emerald-950/20 px-2 py-0.5 rounded border border-emerald-100/50 dark:border-emerald-900/30">
                                        {t("cart.free")}
                                    </span>
                                ) : (
                                    `$${shipping.toFixed(2)}`
                                )}
                            </span>
                        </div>
                    </div>

                    <div className="py-6 flex justify-between items-baseline">
                        <span className="text-base font-bold text-gray-900 dark:text-zinc-100">{t("cart.total")}</span>
                        <div className="text-right">
                            <span className="text-2xl font-extrabold text-blue-900 dark:text-blue-400 tracking-tight">
                                ${total.toFixed(2)}
                            </span>
                            {shipping > 0 && (
                                <p className="text-[10px] text-gray-400 dark:text-zinc-500 mt-1 font-medium">
                                    {t("cart.freeShippingNotice", { amount: (150 - subtotal).toFixed(2) })}
                                </p>
                            )}
                        </div>
                    </div>

                    <Link
                        href="/checkout"
                        onClick={handleCheckoutClick}
                        className="w-full flex items-center justify-center bg-blue-900 hover:bg-blue-950 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 rounded-xl py-3.5 text-sm font-semibold tracking-wide transition-all duration-200 cursor-pointer shadow-lg shadow-blue-900/15 dark:shadow-none active:scale-[0.98]"
                    >
                        {t("cart.proceedToCheckout")}
                    </Link>
                </div>
            </div>
        </main>
    );
}