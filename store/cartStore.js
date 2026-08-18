import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
    persist(
        (set, get) => ({
            cart: [],
            nails: 0,

            addToCart: (product) =>
                set((state) => {
                    const existing = state.cart.find((item) => item.id === product.id);

                    if (existing) {
                        return {
                            cart: state.cart.map((item) =>
                                item.id === product.id
                                    ? { ...item, quantity: item.quantity + 1 }
                                    : item
                            ),
                        };
                    }

                    return { cart: [...state.cart, { ...product, quantity: 1 }] };
                }),

            removeFromCart: (id) =>
                set((state) => ({
                    cart: state.cart.filter((item) => item.id !== id),
                })),

            updateQuantity: (id, quantity) =>
                set((state) => ({
                    cart: state.cart.map((item) =>
                        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
                    ),
                })),

            setNails: (nails) => set({ nails: Math.max(0, nails) }),

            clearCart: () => set({ cart: [], nails: 0 }),

            getTotalItems: () => get().cart.reduce((sum, item) => sum + item.quantity, 0),

            getTotalPrice: () =>
                get().cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
        }),
        { name: "cart-storage" }
    )
)