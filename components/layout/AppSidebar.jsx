"use client";

import { useState } from "react";
import {
  Package,
  ShoppingCart,
  Settings,
  LogOut,
  X,
  Menu,
  Info,
  HomeIcon,
  FrameIcon,
  LogIn,
  UserPlus,
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function AppSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const logout = useAuthStore((s) => s.logout);
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { to: "/", label: "Home", icon: HomeIcon },
    { to: "/collection", label: "Collection", icon: FrameIcon },
    { to: "/cart", label: "Cart", icon: ShoppingCart },
    { to: "/orders", label: "Orders", icon: Package, authOnly: true },
    { to: "/about", label: "About", icon: Info },
    { to: "/settings", label: "Settings", icon: Settings, authOnly: true },
  ];

  const visibleNavItems = navItems.filter(
    (item) => !item.authOnly || isAuthenticated,
  );

  function handleLogout() {
    logout();
    setIsOpen(false);
    router.push("/");
  }

  return (
    <>
      <header className="md:hidden sticky top-0 z-30 flex items-center justify-between h-14 px-4 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-blue-100 dark:border-zinc-800">
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open sidebar"
          className="text-blue-900 dark:text-zinc-300 hover:opacity-80 transition-opacity"
        >
          <Menu size={22} />
        </button>
        <Image
          alt="Runic"
          src="/logo.png"
          width={180}
          height={80}
          className="object-contain"
        />
        <div className="w-[22px]" />
      </header>

      {isOpen && (
        <div
          className="fixed inset-0 bg-zinc-950/40 z-40 md:hidden backdrop-blur-xs"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed md:sticky md:top-0 top-0 start-0 z-50 flex flex-col w-64 h-screen bg-white dark:bg-zinc-900 border-e border-blue-100 dark:border-zinc-800 transition-all duration-200
          ${isOpen ? "translate-x-0" : "-translate-x-full rtl:translate-x-full"} md:translate-x-0`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-blue-100 dark:border-zinc-800">
          <Image
            alt="Runic"
            src="/logo.png"
            width={180}
            height={80}
            className="object-contain"
          />
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden text-blue-900 dark:text-zinc-400 hover:opacity-80"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-3 py-5 space-y-1">
          {visibleNavItems.map(({ to, label, icon: Icon }) => {
            const isActive =
              to === "/" ? pathname === "/" : pathname.startsWith(to);

            return (
              <Link
                href={to}
                key={to}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-blue-100/70 dark:bg-zinc-800 text-blue-900 dark:text-zinc-100"
                    : "text-gray-600 dark:text-zinc-400 hover:bg-blue-50/50 dark:hover:bg-zinc-800/50"
                }`}
              >
                <Icon
                  size={18}
                  className={
                    isActive ? "text-blue-900 dark:text-zinc-100" : "opacity-80"
                  }
                />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-blue-100 dark:border-zinc-800 p-4">
          {isAuthenticated ? (
            <>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-zinc-800 flex items-center justify-center text-blue-900 dark:text-zinc-200 font-semibold">
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="text-sm font-medium truncate text-blue-950 dark:text-zinc-200">
                    {user?.name}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-zinc-400 truncate">
                    {user?.email}
                  </span>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors cursor-pointer"
              >
                <LogOut size={18} />
                Logout
              </button>
            </>
          ) : (
            <div className="space-y-2">
              <Link
                href="/sign-in"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm font-medium text-blue-900 dark:text-zinc-200 bg-blue-50/60 dark:bg-zinc-800 hover:bg-blue-100/70 dark:hover:bg-zinc-700/60 transition-colors"
              >
                <LogIn size={18} />
                Sign In
              </Link>
              <Link
                href="/sign-up"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-zinc-400 hover:bg-blue-50/50 dark:hover:bg-zinc-800/50 transition-colors"
              >
                <UserPlus size={18} />
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
