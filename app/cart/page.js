"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, ShoppingBag, ArrowRight } from "lucide-react";

export default function CartPage() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const items = useCartStore((state) => state.cart);
  const nails = useCartStore((state) => state.nails);
  const setNails = useCartStore((state) => state.setNails);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const NAIL_PRICE = 10;
  const nailsTotal = nails * NAIL_PRICE;
  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  function getItemName(item) {
    if (typeof item.name === "object") {
      return item.name?.[lang] || item.name?.en || "Product";
    }
    return item.name || "Product";
  }

  if (items.length === 0) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="flex justify-center mb-4">
          <ShoppingBag className="w-16 h-16 text-muted-foreground/40" />
        </div>
        <h1 className="text-xl font-bold mb-2">
          {t("cart.emptyTitle", "Your cart is empty")}
        </h1>
        <p className="text-sm text-muted-foreground mb-6">
          {t(
            "cart.emptyDesc",
            "Looks like you haven't added anything to your cart yet.",
          )}
        </p>
        <Button asChild>
          <Link href="/products">
            {t("cart.continueShopping", "Continue Shopping")}
          </Link>
        </Button>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold mb-8">
        {t("cart.title", "Shopping Cart")}
      </h1>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-4">
          {items.map((item) => (
            <Card key={item.id} className="border-border bg-card">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="relative w-20 h-20 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={item.images?.[0] || "/placeholder.png"}
                    alt={getItemName(item)}
                    fill
                    unoptimized
                    className="object-contain p-2"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold truncate">
                    {getItemName(item)}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {item.price.toFixed(2)} L.E.
                  </p>

                  <div className="flex items-center gap-2 mt-3">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() =>
                        updateQuantity(item.id, Math.max(1, item.quantity - 1))
                      }
                    >
                      -
                    </Button>
                    <span className="text-xs font-semibold px-2">
                      {item.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>

                <div className="text-right flex flex-col items-end gap-2">
                  <span className="text-sm font-bold">
                    {(item.price * item.quantity).toFixed(2)} L.E.
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:bg-destructive/10"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          <Card className="border-border bg-card">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold">
                  {t("cart.extraNails", "Extra Nails")}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {NAIL_PRICE.toFixed(2)} L.E. {t("cart.perNail", "per nail")}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setNails(Math.max(0, nails - 1))}
                >
                  -
                </Button>
                <span className="text-sm font-bold px-2">{nails}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setNails(nails + 1)}
                >
                  +
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-4">
          <Card className="border-border bg-card">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-lg font-bold border-b border-border pb-3">
                {t("cart.summary", "Order Summary")}
              </h2>

              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  {t("cart.subtotal", "Subtotal")}
                </span>
                <span className="font-bold">{subtotal.toFixed(2)} L.E.</span>
              </div>

              {nails > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {t("cart.nails", "Extra Nails")} ({nails})
                  </span>
                  <span className="font-bold">
                    {nailsTotal.toFixed(2)} L.E.
                  </span>
                </div>
              )}

              <div className="flex justify-between text-xs text-muted-foreground border-b border-border pb-3">
                <span>{t("cart.shipping", "Shipping")}</span>
                <span>
                  {t("cart.calculatedAtCheckout", "Calculated at checkout")}
                </span>
              </div>

              <div className="flex justify-between text-base font-bold pt-1">
                <span>{t("cart.total", "Total")}</span>
                <span>{(subtotal + nailsTotal).toFixed(2)} L.E.</span>
              </div>

              <Button asChild className="w-full mt-4" size="lg">
                <Link
                  href="/checkout"
                  className="flex items-center justify-center gap-2"
                >
                  {t("cart.proceedToCheckout", "Proceed to Checkout")}
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
