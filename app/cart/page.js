"use client";

import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { Trash2, Plus, Minus, ShoppingBag, ChevronRight, ArrowLeft } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

export default function CartPage() {
    const cartItems = useCartStore((state) => state.cart);
    const updateQuantity = useCartStore((state) => state.updateQuantity);
    const removeFromCart = useCartStore((state) => state.removeFromCart);

    function handleQuantityChange(id, currentQty, delta) {
        updateQuantity(id, currentQty + delta);
    }

    function handleRemove(id, name) {
        removeFromCart(id);
        toast.success(`Removed ${name} from cart`);
    }

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = subtotal > 150 ? 0 : 15.0;
    const total = subtotal + shipping;

    if (cartItems.length === 0) {
        return (
            <main className="max-w-4xl mx-auto px-4 py-16 sm:py-24 text-center">
                <div className="flex flex-col items-center justify-center space-y-6">
                    <div className="p-5 bg-blue-50/60 rounded-full border border-blue-100/50 text-blue-900">
                        <ShoppingBag className="w-10 h-10" strokeWidth={1.5} />
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Your Cart is Empty</h1>
                        <p className="text-sm text-gray-500 max-w-sm mx-auto">
                            It looks like you haven&apos;t added any frames to your collection yet.
                        </p>
                    </div>
                    <Link
                        href="/collection"
                        className="inline-flex items-center gap-2 bg-blue-900 hover:bg-blue-950 active:scale-95 text-white rounded-xl px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-200 cursor-pointer shadow-md shadow-blue-900/10"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Explore Collection
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
            <nav className="flex items-center gap-2 text-xs font-medium text-gray-400 mb-8 tracking-wide uppercase">
                <Link href="/" className="hover:text-blue-900 transition-colors">Home</Link>
                <ChevronRight size={12} className="opacity-60" />
                <Link href="/collection" className="hover:text-blue-900 transition-colors">Collection</Link>
                <ChevronRight size={12} className="opacity-60" />
                <span className="text-gray-600">Your Cart</span>
            </nav>

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight mb-8">
                Your Cart ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
            </h1>

            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                <div className="lg:col-span-7 space-y-4">
                    {cartItems.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center gap-4 sm:gap-6 p-4 rounded-xl border border-gray-100 bg-white shadow-xs hover:border-blue-100/50 transition-colors duration-200"
                        >
                            <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 bg-zinc-50 rounded-lg flex items-center justify-center">
                                <Image
                                    src={item.image || "/placeholder.png"}
                                    alt={item.name?.en || item.title || "Product"}
                                    fill
                                    sizes="96px"
                                    className="object-contain p-2 drop-shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
                                />
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <h2 className="text-sm sm:text-base font-bold text-gray-900 truncate">
                                            {item.name?.en || item.title}
                                        </h2>
                                        {item.dimensions && (
                                            <span className="inline-block mt-1 text-[10px] font-bold tracking-wider text-blue-900 bg-blue-50 border border-blue-100/40 px-2 py-0.5 rounded uppercase">
                                                {item.dimensions} in
                                            </span>
                                        )}
                                    </div>

                                    <span className="hidden sm:block text-sm font-bold text-gray-900">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between mt-4">
                                    <div className="flex items-center gap-3 bg-zinc-50 border border-gray-100 rounded-lg px-2.5 py-1">
                                        <button
                                            onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                                            className="text-gray-500 hover:text-blue-900 p-0.5 transition-colors disabled:opacity-30 cursor-pointer"
                                            disabled={item.quantity <= 1}
                                            aria-label="Decrease quantity"
                                        >
                                            <Minus className="w-3.5 h-3.5" />
                                        </button>
                                        <span className="text-xs sm:text-sm font-semibold text-gray-800 w-4 text-center select-none">
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                                            className="text-gray-500 hover:text-blue-900 p-0.5 transition-colors cursor-pointer"
                                            aria-label="Increase quantity"
                                        >
                                            <Plus className="w-3.5 h-3.5" />
                                        </button>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <span className="sm:hidden text-sm font-bold text-gray-900">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </span>
                                        <button
                                            onClick={() => handleRemove(item.id, item.name?.en || item.title)}
                                            className="text-gray-400 hover:text-red-500 p-1.5 transition-colors cursor-pointer"
                                            aria-label="Remove item"
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
                        className="inline-flex items-center gap-2 text-xs font-semibold text-blue-900 hover:text-blue-950 transition-colors uppercase tracking-wider pt-2"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        Continue Shopping
                    </Link>
                </div>

                <div className="lg:col-span-5 bg-zinc-50/50 border border-gray-100 rounded-2xl p-6 lg:p-8">
                    <h2 className="text-lg font-bold text-gray-900 tracking-tight pb-4 border-b border-gray-100">
                        Order Summary
                    </h2>

                    <div className="py-6 space-y-4 border-b border-gray-100 text-sm font-medium">
                        <div className="flex justify-between text-gray-500">
                            <span>Subtotal</span>
                            <span className="text-gray-950">${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-gray-500">
                            <span>Shipping</span>
                            <span className="text-gray-950">
                                {shipping === 0 ? (
                                    <span className="text-emerald-600 font-semibold uppercase tracking-wider text-xs bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100/50">
                                        Free
                                    </span>
                                ) : (
                                    `$${shipping.toFixed(2)}`
                                )}
                            </span>
                        </div>
                    </div>

                    <div className="py-6 flex justify-between items-baseline">
                        <span className="text-base font-bold text-gray-900">Total</span>
                        <div className="text-right">
                            <span className="text-2xl font-extrabold text-blue-900 tracking-tight">
                                ${total.toFixed(2)}
                            </span>
                            {shipping > 0 && (
                                <p className="text-[10px] text-gray-400 mt-1 font-medium">
                                    Add ${(150 - subtotal).toFixed(2)} more for free shipping
                                </p>
                            )}
                        </div>
                    </div>

                    <Link
                        href={"/checkout"}
                        className="w-full flex items-center justify-center bg-blue-900 hover:bg-blue-950 active:scale-[0.98] text-white rounded-xl py-3.5 text-sm font-semibold tracking-wide transition-all duration-200 cursor-pointer shadow-lg shadow-blue-900/15"
                    >
                        Proceed to Checkout
                    </Link>
                </div>
            </div>
        </main>
    );
}