"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { ChevronRight, ArrowLeft, Truck, ShieldCheck } from "lucide-react";
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

    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = subtotal > 150 ? 0 : 15.0;
    const total = subtotal + shipping;

    function handleChange(e) {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    }

    function handleGovernorateChange(value) {
        setFormData((prev) => ({ ...prev, governorate: value }));
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

        const orderPayload = {
            userId: user.id,
            items: items.map((item) => ({
                productId: item.id,
                name: item.name,
                image: item.image,
                price: item.price,
                quantity: item.quantity,
            })),
            shippingInfo: formData,
            subtotal,
            shipping,
            total,
            status: "pending",
            paymentMethod: "cash_on_delivery",
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
                <p className="text-sm text-gray-500">
                    Your cart is empty.{" "}
                    <Link href="/products" className="text-blue-900 font-semibold underline">
                        Browse products
                    </Link>
                </p>
            </main>
        );
    }

    return (
        <ProtectedRoutes>
            <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
                <nav className="flex items-center gap-2 text-xs font-medium text-gray-400 mb-8 tracking-wide uppercase">
                    <Link href="/" className="hover:text-blue-900 transition-colors">Home</Link>
                    <ChevronRight size={12} className="opacity-60" />
                    <Link href="/cart" className="hover:text-blue-900 transition-colors">Cart</Link>
                    <ChevronRight size={12} className="opacity-60" />
                    <span className="text-gray-600">Checkout</span>
                </nav>

                <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                    <form id="checkout-form" onSubmit={handlePlaceOrder} className="lg:col-span-7 space-y-6" noValidate>
                        <Card className="border-gray-100">
                            <CardContent className="p-6 space-y-4">
                                <h2 className="text-lg font-bold text-gray-900 tracking-tight flex items-center gap-2">
                                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-50 text-blue-950 text-xs font-bold">1</span>
                                    Contact Information
                                </h2>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <Label htmlFor="email">Email Address</Label>
                                        <Input type="email" id="email" value={formData.email} onChange={handleChange} placeholder="name@email.com" />
                                        {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label htmlFor="phone">Phone Number</Label>
                                        <Input type="tel" id="phone" value={formData.phone} onChange={handleChange} placeholder="01012345678" />
                                        {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-gray-100">
                            <CardContent className="p-6 space-y-4">
                                <h2 className="text-lg font-bold text-gray-900 tracking-tight flex items-center gap-2">
                                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-50 text-blue-950 text-xs font-bold">2</span>
                                    Shipping Address
                                </h2>

                                <div className="space-y-1.5">
                                    <Label htmlFor="fullName">Full Name</Label>
                                    <Input type="text" id="fullName" value={formData.fullName} onChange={handleChange} placeholder="Youssef Ahmed" />
                                    {errors.fullName && <p className="text-xs text-red-600 mt-1">{errors.fullName}</p>}
                                </div>

                                <div className="space-y-1.5">
                                    <Label htmlFor="address">Street Address</Label>
                                    <Input type="text" id="address" value={formData.address} onChange={handleChange} placeholder="123 El Nasr Street, Building 4, Apt 12" />
                                    {errors.address && <p className="text-xs text-red-600 mt-1">{errors.address}</p>}
                                </div>

                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <Label htmlFor="governorate">Governorate</Label>
                                        <Select value={formData.governorate} onValueChange={handleGovernorateChange}>
                                            <SelectTrigger id="governorate" className="w-full">
                                                <SelectValue placeholder="Select governorate" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {EGYPT_GOVERNORATES.map((gov) => (
                                                    <SelectItem key={gov} value={gov}>{gov}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.governorate && <p className="text-xs text-red-600 mt-1">{errors.governorate}</p>}
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label htmlFor="city">City / District</Label>
                                        <Input type="text" id="city" value={formData.city} onChange={handleChange} placeholder="Nasr City" />
                                        {errors.city && <p className="text-xs text-red-600 mt-1">{errors.city}</p>}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-gray-100">
                            <CardContent className="p-6 space-y-4">
                                <h2 className="text-lg font-bold text-gray-900 tracking-tight flex items-center gap-2">
                                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-50 text-blue-950 text-xs font-bold">3</span>
                                    Payment Method
                                </h2>

                                <div className="flex items-start gap-3 p-4 bg-blue-50/60 border border-blue-100 rounded-xl">
                                    <Truck className="w-5 h-5 text-blue-900 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">Cash on Delivery</p>
                                        <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                                            Pay in cash when your order arrives at your doorstep. No card details needed.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </form>

                    <div className="lg:col-span-5 lg:sticky lg:top-8 space-y-6">
                        <Card className="bg-zinc-50/50 border-gray-100">
                            <CardContent className="p-6 lg:p-8">
                                <h2 className="text-lg font-bold text-gray-900 tracking-tight pb-4 border-b border-gray-100">
                                    Review Order
                                </h2>

                                <div className="divide-y divide-gray-100 max-h-[240px] overflow-y-auto">
                                    {items.map((item) => (
                                        <div key={item.id} className="flex items-center gap-4 py-4 first:pt-4 last:pb-0">
                                            <div className="relative w-14 h-14 bg-white border border-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <Image
                                                    src={item.image || "/placeholder.png"}
                                                    alt={item.name?.en || "Product"}
                                                    fill
                                                    sizes="56px"
                                                    className="object-contain p-1 drop-shadow-xs"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-sm font-bold text-gray-900 truncate">
                                                    {item.name?.en}
                                                </h3>
                                                <p className="text-xs text-gray-400 mt-0.5">
                                                    Qty: {item.quantity} {item.dimensions && `• ${item.dimensions}`}
                                                </p>
                                            </div>
                                            <span className="text-sm font-bold text-gray-900 flex-shrink-0">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="py-6 border-t border-b border-gray-100 text-sm font-medium space-y-3 mt-4">
                                    <div className="flex justify-between text-gray-500">
                                        <span>Subtotal</span>
                                        <span className="text-gray-950">${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-500">
                                        <span>Shipping</span>
                                        <span className="text-gray-950">
                                            {shipping === 0 ? (
                                                <span className="text-emerald-600 font-semibold uppercase tracking-wider text-xs">Free</span>
                                            ) : (
                                                `$${shipping.toFixed(2)}`
                                            )}
                                        </span>
                                    </div>
                                </div>

                                <div className="py-6 flex justify-between items-center">
                                    <span className="text-base font-bold text-gray-900">Total Due</span>
                                    <span className="text-2xl font-extrabold text-blue-900 tracking-tight">
                                        ${total.toFixed(2)}
                                    </span>
                                </div>

                                <Button
                                    type="submit"
                                    form="checkout-form"
                                    disabled={isPending}
                                    className="w-full bg-blue-900 hover:bg-blue-950 active:scale-[0.98] rounded-xl py-3.5 text-sm font-semibold tracking-wide transition-all duration-200 cursor-pointer shadow-lg shadow-blue-900/15 disabled:opacity-60"
                                >
                                    {isPending ? "Placing order..." : "Place Order"}
                                </Button>
                            </CardContent>
                        </Card>

                        <div className="flex items-start gap-3 px-4 py-3 bg-zinc-50 border border-gray-100 rounded-xl">
                            <ShieldCheck className="w-5 h-5 text-blue-900 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                            <div className="space-y-0.5">
                                <p className="text-xs font-semibold text-gray-900 uppercase tracking-wider">Runic Buyer Promise</p>
                                <p className="text-[11px] text-gray-500 leading-normal">
                                    Enjoy zero-risk checkout with safe transit and full-value package insurance.
                                </p>
                            </div>
                        </div>

                        <div className="text-center">
                            <Link
                                href="/cart"
                                className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-blue-900 transition-colors uppercase tracking-wider"
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