"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";
import { useAuthStore } from "@/store/authStore";

export default function ProtectedRoutes({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please sign in to continue");
      router.push("/sign-in");
    }
  }, [isAuthenticated, pathname, router]);

  if (!isAuthenticated) {
    return (
      <main className="flex items-center justify-center min-h-[60vh]">
        <p className="text-sm text-gray-400">Redirecting...</p>
      </main>
    );
  }

  return children;
}
