import { z } from "zod";

export const signInSchema = z.object({
    email: z.string().min(1, "Email is required").email("Enter a valid email"),
    password: z.string().min(1, "Password is required"),
});

export const signUpSchema = z
    .object({
        name: z.string().min(3, "Name must be at least 3 characters"),
        email: z.string().min(1, "Email is required").email("Enter a valid email"),
        phone: z
            .string()
            .min(1, "Phone number is required")
            .regex(/^01[0125][0-9]{8}$/, "Enter a valid Egyptian phone number"),
        password: z.string().min(8, "Password must be at least 8 characters"),
        confirmPassword: z.string().min(1, "Please confirm your password"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });