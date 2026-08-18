"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { ShoppingCart, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import useGetProduct from "@/hooks/products/useGetProduct";
import { useCartStore } from "@/store/cartStore";
import { getProductImages } from "@/utils/product";
import ProductImageCarousel from "@/components/ProductImageCarousel";

export default function ProductDetailsPage() {
    const { id } = useParams();
    const { t, i18n } = useTranslation();
    const { data: product, isLoading, isError } = useGetProduct(id);
    const addToCart = useCartStore((state) => state.addToCart);
    const lang = i18n.language;

    function handleAddToCart(e) {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
        toast.success(t("productDetails.addedToCart"));
    }

    if (isLoading) {
        return (
            <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 animate-pulse">
                <div className="h-4 w-48 bg-gray-100 dark:bg-zinc-800/60 rounded mb-8" />
                <div className="grid md:grid-cols-12 gap-8 lg:gap-16 items-center">
                    <div className="md:col-span-6 aspect-square max-w-[500px] w-full bg-zinc-100/60 dark:bg-zinc-800/40 rounded-xl mx-auto" />
                    <div className="md:col-span-6 space-y-5">
                        <div className="h-4 w-24 bg-gray-200 dark:bg-zinc-800/60 rounded" />
                        <div className="h-10 w-3/4 bg-gray-200 dark:bg-zinc-800/60 rounded" />
                        <div className="h-8 w-28 bg-gray-200 dark:bg-zinc-800/60 rounded" />
                        <div className="h-24 w-full bg-gray-200 dark:bg-zinc-800/60 rounded" />
                        <div className="h-12 w-full bg-gray-200 dark:bg-zinc-800/60 rounded" />
                    </div>
                </div>
            </main>
        );
    }

    if (isError || !product) {
        return (
            <main className="max-w-6xl mx-auto px-4 sm:px-6 py-16 text-center">
                <div className="max-w-md mx-auto p-8 rounded-2xl border border-red-100 dark:border-red-900/30 bg-red-50/50 dark:bg-red-950/10">
                    <p className="text-sm font-medium text-red-600 dark:text-red-400">
                        {t("productDetails.loadError")}
                    </p>
                </div>
            </main>
        );
    }

    const { name, price, dimensions, desc, category, featured } = product;
    const localizedName = name?.[lang] || name?.en;
    const localizedDesc = desc?.[lang] || desc?.en;
    const localizedCategory = category?.[lang] || category?.en;
    const images = getProductImages(product);

    return (
        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-12">

            <nav className="flex items-center gap-2 text-xs font-medium text-gray-400 dark:text-zinc-500 mb-8 tracking-wide uppercase">
                <Link href="/" className="hover:text-blue-900 dark:hover:text-zinc-100 transition-colors">{t("productDetails.home")}</Link>
                <ChevronRight size={12} className="opacity-60 rtl:rotate-180" />
                <Link href="/collection" className="hover:text-blue-900 dark:hover:text-zinc-100 transition-colors">{t("productDetails.collection")}</Link>
                <ChevronRight size={12} className="opacity-60 rtl:rotate-180" />
                <span className="text-gray-600 dark:text-zinc-400 truncate max-w-[180px]">{localizedName}</span>
            </nav>

            <div className="grid md:grid-cols-12 gap-8 lg:gap-16 items-center">

                <div className="md:col-span-6 flex justify-center relative">
                    {featured && (
                        <span className="absolute top-3 right-3 z-10 px-3 py-1 bg-black/80 dark:bg-zinc-100/90 backdrop-blur-md text-white dark:text-zinc-950 text-[11px] font-semibold tracking-wider uppercase rounded-md shadow-sm">
                            {t("productDetails.featured")}
                        </span>
                    )}
                    <ProductImageCarousel
                        images={images}
                        alt={localizedName || t("productDetails.imageAlt")}
                    />
                </div>

                <div className="md:col-span-6 flex flex-col justify-center">

                    <div className="pb-6 border-b border-gray-100 dark:border-zinc-800">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-zinc-100 tracking-tight leading-tight">
                            {localizedName}
                        </h1>
                        <p className="mt-3 text-2xl font-extrabold text-blue-900 dark:text-blue-400 tracking-tight">
                            {Number(price ?? 0).toFixed(2)} L.E.
                        </p>
                    </div>

                    <div className="py-6 space-y-5">
                        {desc && (
                            <p className="text-sm sm:text-base text-gray-600 dark:text-zinc-400 leading-relaxed">
                                {localizedDesc}
                            </p>
                        )}

                        {dimensions && (
                            <div className="flex items-center gap-2">
                                <div className="inline-flex flex-col bg-zinc-50 dark:bg-zinc-900/50 border border-gray-100/85 dark:border-zinc-800 rounded-lg px-4 py-2.5 self-start">
                                    <span className="text-[10px] text-gray-400 dark:text-zinc-500 uppercase tracking-wider mb-0.5">{t("productDetails.frameSize")}</span>
                                    <span className="text-sm text-gray-900 dark:text-zinc-100 font-semibold">{dimensions} {t("productDetails.inches")}</span>
                                </div>
                                <div className="inline-flex flex-col bg-zinc-50 dark:bg-zinc-900/50 border border-gray-100/85 dark:border-zinc-800 rounded-lg px-4 py-2.5 self-start">
                                    <span className="text-[10px] text-gray-400 dark:text-zinc-500 uppercase tracking-wider mb-0.5">{t("productDetails.category")}</span>
                                    <span className="text-sm text-gray-900 dark:text-zinc-100 font-semibold">{localizedCategory}</span>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="pt-2">
                        <button
                            onClick={handleAddToCart}
                            className="w-full flex items-center justify-center gap-2.5 bg-blue-900 hover:bg-blue-950 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 rounded-xl py-3.5 text-sm font-semibold tracking-wide transition-all duration-200 cursor-pointer shadow-lg shadow-blue-900/15 dark:shadow-none active:scale-[0.98]"
                        >
                            <ShoppingCart className="w-4 h-4" />
                            {t("productDetails.addToCart")}
                        </button>
                    </div>

                </div>
            </div>
        </main>
    );
}