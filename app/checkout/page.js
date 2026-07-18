"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { ChevronRight, ArrowLeft, Truck, ShieldCheck, Minus, Plus } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import useCreateOrder from "@/hooks/orders/useCreateOrder";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import ProtectedRoutes from "@/components/ProtectedRoutes";

const EGYPT_GOVERNORATES = [
    "Cairo", "Giza", "Alexandria", "Qalyubia", "Sharqia", "Dakahlia",
    "Beheira", "Gharbia", "Monufia", "Kafr El Sheikh", "Damietta",
    "Port Said", "Ismailia", "Suez", "North Sinai", "South Sinai",
    "Beni Suef", "Fayoum", "Minya", "Assiut", "Sohag", "Qena",
    "Luxor", "Aswan", "Red Sea", "New Valley", "Matrouh",
];

const NAIL_PRICE = 2;

const checkoutSchema = z.object({
    email: z.string().min(1, "Email is required").email("Enter a valid email"),
    phone: z
        .string()
        .min(1, "Phone number is required")
        .regex(/^01[0125][0-9]{8}$/, "Enter a valid Egyptian phone number (e.g. 01012345678)"),
    fullName: z.string().min(3, "Full name must be at least 3 characters"),
    address: z.string().min(5, "Address must be at least 5 characters"),
    governorate: z.string().min(1, "Please select a governorate"),
    city: z.string().min(2, "City / district is required"),
});

export default function CheckoutPage() {
    const router = useRouter();
    const items = useCartStore((state) => state.cart);
    const clearCart = useCartStore((state) => state.clearCart);
    const user = useAuthStore((state) => state.user);
    const { mutateAsync: createOrder, isPending } = useCreateOrder();

    const [formData, setFormData] = useState({
        email: user?.email || "",
        phone: user?.phone || "",
        fullName: user?.name || "",
        address: "",
        governorate: "",
        city: "",
    });
    const [errors, setErrors] = useState({});
    const [nails, setNails] = useState(0);

    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = subtotal > 150 ? 0 : 15.0;
    const nailsFee = nails * NAIL_PRICE;
    const total = subtotal + shipping + nailsFee;

    function handleChange(e) {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
        if (errors[id]) {
            setErrors((prev) => {
                const copy = { ...prev };
                delete copy[id];
                return copy;
            });
        }
    }

    function handleGovernorateChange(value) {
        setFormData((prev) => ({ ...prev, governorate: value }));
        if (errors.governorate) {
            setErrors((prev) => {
                const copy = { ...prev };
                delete copy.governorate;
                return copy;
            });
        }
    }

    async function handlePlaceOrder(e) {
        e.preventDefault();

        const result = checkoutSchema.safeParse(formData);

        if (!result.success) {
            const fieldErrors = {};
            result.error.issues.forEach((issue) => {
                fieldErrors[issue.path[0]] = issue.message;
            });
            setErrors(fieldErrors);
            return;
        }

        setErrors({});

        const shippingAddress = `${formData.address}, ${formData.city}, ${formData.governorate}`;

        const orderPayload = {
            userId: user.id,
            customerName: formData.fullName,
            customerEmail: formData.email,
            items: items.map((item) => ({
                productId: item.id,
                name: typeof item.name === "object" ? item.name?.en : item.name || "Product",
                image: item.image,
                price: item.price,
                quantity: item.quantity,
            })),
            total: Number(total.toFixed(2)),
            shippingAddress,
            status: "pending",
            nails,
            createdAt: Math.floor(Date.now() / 1000),
        };

        try {
            await createOrder(orderPayload);
            toast.success("Order placed successfully!");
            clearCart();
            router.push("/orders");
        } catch (err) {
            toast.error("Failed to place order. Please try again.");
        }
    }

    if (items.length === 0) {
        return (
            <main className="max-w-4xl mx-auto px-4 py-16 sm:py-24 text-center">
                <p className="text-sm text-muted-foreground">
                    Your cart is empty.{" "}
                    <Link href="/products" className="text-primary font-semibold underline underline-offset-4 hover:opacity-90">
                        Browse products
                    </Link>
                </p>
            </main>
        );
    }

    return (
        <ProtectedRoutes>
            <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-12 text-foreground">
                <nav className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-8 tracking-wide uppercase">
                    <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                    <ChevronRight size={12} className="opacity-60" />
                    <Link href="/cart" className="hover:text-primary transition-colors">Cart</Link>
                    <ChevronRight size={12} className="opacity-60" />
                    <span className="text-foreground/70">Checkout</span>
                </nav>

                <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                    <form id="checkout-form" onSubmit={handlePlaceOrder} className="lg:col-span-7 space-y-6" noValidate>
                        <Card className="border-border bg-card text-card-foreground">
                            <CardContent className="p-6 space-y-4">
                                <h2 className="text-lg font-bold tracking-tight flex items-center gap-2">
                                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-bold">1</span>
                                    Contact Information
                                </h2>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <Label htmlFor="email">Email Address</Label>
                                        <Input type="email" id="email" value={formData.email} onChange={handleChange} placeholder="name@email.com" className="bg-background border-input" />
                                        {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label htmlFor="phone">Phone Number</Label>
                                        <Input type="tel" id="phone" value={formData.phone} onChange={handleChange} placeholder="01012345678" className="bg-background border-input" />
                                        {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-border bg-card text-card-foreground">
                            <CardContent className="p-6 space-y-4">
                                <h2 className="text-lg font-bold tracking-tight flex items-center gap-2">
                                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-bold">2</span>
                                    Shipping Address
                                </h2>

                                <div className="space-y-1.5">
                                    <Label htmlFor="fullName">Full Name</Label>
                                    <Input type="text" id="fullName" value={formData.fullName} onChange={handleChange} placeholder="Youssef Ahmed" className="bg-background border-input" />
                                    {errors.fullName && <p className="text-xs text-destructive mt-1">{errors.fullName}</p>}
                                </div>

                                <div className="space-y-1.5">
                                    <Label htmlFor="address">Street Address</Label>
                                    <Input type="text" id="address" value={formData.address} onChange={handleChange} placeholder="123 El Nasr Street, Building 4, Apt 12" className="bg-background border-input" />
                                    {errors.address && <p className="text-xs text-destructive mt-1">{errors.address}</p>}
                                </div>

                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <Label htmlFor="governorate">Governorate</Label>
                                        <Select value={formData.governorate} onValueChange={handleGovernorateChange}>
                                            <SelectTrigger id="governorate" className="w-full bg-background border-input">
                                                <SelectValue placeholder="Select governorate" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-popover border-border text-popover-foreground">
                                                {EGYPT_GOVERNORATES.map((gov) => (
                                                    <SelectItem key={gov} value={gov}>{gov}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.governorate && <p className="text-xs text-destructive mt-1">{errors.governorate}</p>}
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label htmlFor="city">City / District</Label>
                                        <Input type="text" id="city" value={formData.city} onChange={handleChange} placeholder="Nasr City" className="bg-background border-input" />
                                        {errors.city && <p className="text-xs text-destructive mt-1">{errors.city}</p>}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-border bg-card text-card-foreground">
                            <CardContent className="p-6 space-y-4">
                                <h2 className="text-lg font-bold tracking-tight flex items-center gap-2">
                                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-bold">3</span>
                                    Payment Method
                                </h2>

                                <div className="flex items-start gap-3 p-4 bg-primary/5 border border-primary/10 rounded-xl">
                                    <Truck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                                    <div>
                                        <p className="text-sm font-semibold">Cash on Delivery</p>
                                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                                            Pay in cash when your order arrives at your doorstep. No card details needed.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </form>

                    <div className="lg:col-span-5 lg:sticky lg:top-8 space-y-6">
                        <Card className="bg-muted/30 border-border text-card-foreground">
                            <CardContent className="p-6 lg:p-8">
                                <h2 className="text-lg font-bold tracking-tight pb-4 border-b border-border">
                                    Review Order
                                </h2>

                                <div className="divide-y divide-border max-h-[240px] overflow-y-auto">
                                    {items.map((item) => (
                                        <div key={item.id} className="flex items-center gap-4 py-4 first:pt-4 last:pb-0">
                                            <div className="relative w-14 h-14 bg-background border border-border rounded-lg flex items-center justify-center flex-shrink-0">
                                                <Image
                                                    src={item.image || "/placeholder.png"}
                                                    alt={typeof item.name === "object" ? item.name?.en : item.name || "Product"}
                                                    fill
                                                    unoptimized
                                                    sizes="56px"
                                                    className="object-contain p-1 dark:invert-0"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-sm font-bold truncate">
                                                    {typeof item.name === "object" ? item.name?.en : item.name || "Product"}
                                                </h3>
                                                <p className="text-xs text-muted-foreground mt-0.5">
                                                    Qty: {item.quantity} {item.dimensions && `• ${item.dimensions}`}
                                                </p>
                                            </div>
                                            <span className="text-sm font-bold flex-shrink-0">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="py-4 border-b border-border flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-semibold">Add Nails</p>
                                        <p className="text-xs text-muted-foreground mt-0.5">${NAIL_PRICE.toFixed(2)} each</p>
                                    </div>
                                    <div className="flex items-center gap-3 bg-background border border-border rounded-lg px-2.5 py-1">
                                        <button
                                            type="button"
                                            onClick={() => setNails((n) => Math.max(0, n - 1))}
                                            disabled={nails <= 0}
                                            className="text-muted-foreground hover:text-primary p-0.5 transition-colors disabled:opacity-30 cursor-pointer"
                                            aria-label="Decrease nails"
                                        >
                                            <Minus className="w-3.5 h-3.5" />
                                        </button>
                                        <span className="text-sm font-semibold w-4 text-center select-none">
                                            {nails}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => setNails((n) => n + 1)}
                                            className="text-muted-foreground hover:text-primary p-0.5 transition-colors cursor-pointer"
                                            aria-label="Increase nails"
                                        >
                                            <Plus className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>

                                <div className="py-6 border-b border-border text-sm font-medium space-y-3">
                                    <div className="flex justify-between text-muted-foreground">
                                        <span>Subtotal</span>
                                        <span className="text-foreground">${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-muted-foreground">
                                        <span>Shipping</span>
                                        <span>
                                            {shipping === 0 ? (
                                                <span className="text-emerald-600 dark:text-emerald-500 font-semibold uppercase tracking-wider text-xs">Free</span>
                                            ) : (
                                                `$${shipping.toFixed(2)}`
                                            )}
                                        </span>
                                    </div>
                                    {nails > 0 && (
                                        <div className="flex justify-between text-muted-foreground">
                                            <span>Nails ({nails})</span>
                                            <span className="text-foreground">${nailsFee.toFixed(2)}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="py-6 flex justify-between items-center">
                                    <span className="text-base font-bold">Total Due</span>
                                    <span className="text-2xl font-extrabold text-primary tracking-tight">
                                        ${total.toFixed(2)}
                                    </span>
                                </div>

                                <Button
                                    type="submit"
                                    form="checkout-form"
                                    disabled={isPending}
                                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.98] rounded-xl py-3.5 text-sm font-semibold tracking-wide transition-all duration-200 cursor-pointer shadow-lg shadow-primary/10 disabled:opacity-60"
                                >
                                    {isPending ? "Placing order..." : "Place Order"}
                                </Button>
                            </CardContent>
                        </Card>

                        <div className="flex items-start gap-3 px-4 py-3 bg-muted/20 border border-border rounded-xl">
                            <ShieldCheck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                            <div className="space-y-0.5">
                                <p className="text-xs font-semibold uppercase tracking-wider">Runic Buyer Promise</p>
                                <p className="text-[11px] text-muted-foreground leading-normal">
                                    Enjoy zero-risk checkout with safe transit and full-value package insurance.
                                </p>
                            </div>
                        </div>

                        <div className="text-center">
                            <Link
                                href="/cart"
                                className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider"
                            >
                                <ArrowLeft className="w-3.5 h-3.5" />
                                Return to Cart
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </ProtectedRoutes>
    );
}