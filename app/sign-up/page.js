"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Eye, EyeOff, Lock, Mail, User, Phone, ArrowRight } from "lucide-react";
import { signUpSchema } from "@/lib/validation/auth";
import { registerUser } from "@/api/auth";
import { useAuthStore } from "@/store/authStore";

export default function SignUpPage() {
    const router = useRouter();
    const setUser = useAuthStore((state) => state.setUser);

    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    async function handleSignUp(e) {
        e.preventDefault();

        const formData = { name, email, phone, password, confirmPassword };
        const result = signUpSchema.safeParse(formData);

        if (!result.success) {
            const fieldErrors = {};
            result.error.issues.forEach((issue) => {
                fieldErrors[issue.path[0]] = issue.message;
            });
            setErrors(fieldErrors);
            return;
        }

        setErrors({});
        setIsLoading(true);

        try {
            const user = await registerUser({ name, email, phone, password });
            setUser(user);
            toast.success(`Account created successfully! Welcome, ${user.name}`);
            router.push("/");
        } catch (err) {
            toast.error(err.message || "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <main className="min-h-[85vh] flex items-center justify-center px-4 py-12 sm:px-6">
            <div className="w-full max-w-md space-y-6">
                <div className="text-center space-y-2">
                    <Link
                        href="/"
                        className="inline-block text-2xl font-extrabold tracking-[0.2em] text-blue-900 uppercase"
                    >
                        Runic
                    </Link>
                    <p className="text-sm text-gray-500">
                        Begin building your curated space
                    </p>
                </div>

                <div className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 shadow-xs">
                    <h2 className="text-lg font-bold text-gray-900 tracking-tight mb-6">
                        Create Your Account
                    </h2>

                    <form onSubmit={handleSignUp} className="space-y-4" noValidate>
                        <div className="space-y-1.5">
                            <label htmlFor="name" className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Full Name
                            </label>
                            <div className="relative">
                                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-gray-100 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-blue-900/50 focus:bg-white transition-all"
                                    placeholder="Youssef Ahmed"
                                />
                            </div>
                            {errors.name && (
                                <p className="text-xs text-red-600 mt-1">{errors.name}</p>
                            )}
                        </div>

                        <div className="space-y-1.5">
                            <label htmlFor="email" className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-gray-100 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-900/50 focus:bg-white transition-all"
                                    placeholder="name@email.com"
                                />
                            </div>
                            {errors.email && (
                                <p className="text-xs text-red-600 mt-1">{errors.email}</p>
                            )}
                        </div>

                        <div className="space-y-1.5">
                            <label htmlFor="phone" className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Phone Number
                            </label>
                            <div className="relative">
                                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="tel"
                                    id="phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-gray-100 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-900/50 focus:bg-white transition-all"
                                    placeholder="01012345678"
                                />
                            </div>
                            {errors.phone && (
                                <p className="text-xs text-red-600 mt-1">{errors.phone}</p>
                            )}
                        </div>

                        <div className="space-y-1.5">
                            <label htmlFor="password" className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-10 py-2.5 bg-zinc-50 border border-gray-100 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-900/50 focus:bg-white transition-all"
                                    placeholder="Create password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 p-0.5 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-xs text-red-600 mt-1">{errors.password}</p>
                            )}
                        </div>

                        <div className="space-y-1.5">
                            <label htmlFor="confirmPassword" className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-gray-100 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-900/50 focus:bg-white transition-all"
                                    placeholder="Confirm password"
                                />
                            </div>
                            {errors.confirmPassword && (
                                <p className="text-xs text-red-600 mt-1">{errors.confirmPassword}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full mt-2 flex items-center justify-center gap-2 bg-blue-900 hover:bg-blue-950 active:scale-[0.98] text-white rounded-xl py-3 text-sm font-semibold tracking-wide transition-all duration-200 cursor-pointer shadow-lg shadow-blue-900/15 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {isLoading ? "Creating account..." : "Create Account"}
                            {!isLoading && <ArrowRight className="w-4 h-4" />}
                        </button>
                    </form>

                    <p className="text-center text-xs text-gray-500 mt-6">
                        Already have an account?{" "}
                        <Link href="/sign-in" className="font-bold text-blue-900 hover:text-blue-950 underline transition-colors">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
}