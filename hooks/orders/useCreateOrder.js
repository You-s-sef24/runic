"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrder } from "@/api/orders";

export default function useCreateOrder() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createOrder,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["orders", variables.userId] });
        },
    });
}