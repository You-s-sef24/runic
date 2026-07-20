"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Eye, EyeOff, Lock, Mail, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { signInSchema } from "@/lib/validation/auth";
import { loginUser } from "@/api/auth";
import { useAuthStore } from "@/store/authStore";

export default function SignInPage() {
    const { t } = useTranslation();
    const router = useRouter();
    const setUser = useAuthStore((state) => state.setUser);

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    async function handleSignIn(e) {
        e.preventDefault();

        const result = signInSchema.safeParse({ email, password });
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
            const user = await loginUser({ email, password });
            setUser(user);
            toast.success(`${t("auth.welcomeBack")} ${user.name}`);
            router.push("/");
        } catch (err) {
            toast.error(err.message || t("auth.somethingWentWrong"));
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
                        className="inline-block text-2xl font-extrabold tracking-[0.2em] text-blue-900 dark:text-zinc-100 uppercase"
                    >
                        Runic
                    </Link>
                    <p className="text-sm text-gray-500 dark:text-zinc-400">
                        {t("auth.signInTagline")}
                    </p>
                </div>

                <div className="bg-white dark:bg-zinc-900/50 border border-gray-100 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-xs">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-zinc-100 tracking-tight mb-6">
                        {t("auth.signInTitle")}
                    </h2>

                    <form onSubmit={handleSignIn} className="space-y-4" noValidate>
                        <div className="space-y-1.5">
                            <label htmlFor="email" className="text-xs font-semibold text-gray-500 dark:text-zinc-400 uppercase tracking-wider">
                                {t("auth.emailAddress")}
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-zinc-500" />
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 dark:bg-zinc-800/40 border border-gray-100 dark:border-zinc-800 rounded-lg text-sm text-gray-900 dark:text-zinc-100 placeholder-gray-400 dark:placeholder-zinc-500 focus:outline-none focus:border-blue-900/50 dark:focus:border-zinc-700 focus:bg-white dark:focus:bg-zinc-900 transition-all"
                                    placeholder="name@email.com"
                                />
                            </div>
                            {errors.email && (
                                <p className="text-xs text-red-600 dark:text-red-400 mt-1">{errors.email}</p>
                            )}
                        </div>

                        <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="text-xs font-semibold text-gray-500 dark:text-zinc-400 uppercase tracking-wider">
                                    {t("auth.password")}
                                </label>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-zinc-500" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-10 py-2.5 bg-zinc-50 dark:bg-zinc-800/40 border border-gray-100 dark:border-zinc-800 rounded-lg text-sm text-gray-900 dark:text-zinc-100 placeholder-gray-400 dark:placeholder-zinc-500 focus:outline-none focus:border-blue-900/50 dark:focus:border-zinc-700 focus:bg-white dark:focus:bg-zinc-900 transition-all"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 p-0.5 text-gray-400 dark:text-zinc-500 hover:text-gray-600 dark:hover:text-zinc-300 transition-colors cursor-pointer"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-xs text-red-600 dark:text-red-400 mt-1">{errors.password}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full mt-2 flex items-center justify-center gap-2 bg-blue-900 hover:bg-blue-950 dark:bg-blue-700 dark:hover:bg-blue-600 active:scale-[0.98] text-white rounded-xl py-3 text-sm font-semibold tracking-wide transition-all duration-200 cursor-pointer shadow-lg shadow-blue-900/15 dark:shadow-none disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {isLoading ? t("auth.signingIn") : t("nav.signIn")}
                            {!isLoading && <ArrowRight className="w-4 h-4" />}
                        </button>
                    </form>

                    <p className="text-center text-xs text-gray-500 dark:text-zinc-400 mt-6">
                        {t("auth.noAccount")}{" "}
                        <Link href="/sign-up" className="font-bold text-blue-900 dark:text-blue-400 hover:text-blue-950 dark:hover:text-blue-300 underline transition-colors">
                            {t("nav.signUp")}
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
}