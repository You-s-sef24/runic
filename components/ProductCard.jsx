"use client";

import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { ShoppingCart } from "lucide-react";
import { Button } from "@base-ui/react";
import { useCartStore } from "@/store/cartStore";

export default function ProductCard({ product }) {
  const { image, name, price, dimensions, id, category } = product;
  const addToCart = useCartStore((state) => state.addToCart);

  function handleAddToCart(e) {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast.success("Added to your cart");
  }

  return (
    <Link href={`/collection/${id}`} className="group block w-full">
      <div className="flex flex-col w-full h-full rounded-xl border border-zinc-100 bg-white overflow-hidden transition-all duration-500 hover:border-zinc-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)]">
        <div className="relative aspect-[4/5] bg-zinc-50 flex items-center justify-center overflow-hidden">
          <Image
            src={image || "/placeholder.png"}
            alt={name.en}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain p-6 transition-transform duration-700 ease-out group-hover:scale-103"
          />

          {dimensions && (
            <span className="absolute top-3 left-3 text-[10px] font-semibold tracking-widest text-zinc-500 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded border border-zinc-200/50 uppercase">
              {dimensions} in
            </span>
          )}
        </div>

        <div className="flex flex-col flex-1 p-4">
          {category && (
            <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mb-1.5 block">
              {category.en}
            </span>
          )}

          <h3 className="font-medium text-zinc-800 text-[15px] tracking-tight line-clamp-1 leading-snug group-hover:text-zinc-600 transition-colors duration-300">
            {name.en}
          </h3>

          <div className="mt-1">
            <span className="font-semibold text-zinc-950 text-base tracking-tight">
              ${price?.toFixed(2)}
            </span>
          </div>

          <Button
            onClick={handleAddToCart}
            className="mt-4 w-full flex items-center justify-center gap-2 bg-blue-900 hover:bg-blue-950 text-white rounded-lg py-2.5 text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-sm cursor-pointer"
          >
            <ShoppingCart className="w-3.5 h-3.5 stroke-[2]" />
            Add to Cart
          </Button>
        </div>
      </div>
    </Link>
  );
}
