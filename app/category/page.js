"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { ChevronRight } from "lucide-react";
import CategoryCard from "@/components/CategoryCard";

const CATEGORIES = [
  {
    id: "accessories",
    imageUrl: "/accessories.png",
  },
  {
    id: "acrylic",
    imageUrl: "/acrylic.png",
  },
  {
    id: "pegboard",
    imageUrl: "/pegboard.png",
  },
  {
    id: "frames",
    imageUrl: "/frames.png",
  },
  {
    id: "decorations",
    imageUrl: "/decorations.png",
  },
];

export default function CategoriesPage() {
  const { t } = useTranslation();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14 text-foreground">
      <nav className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-8 tracking-wide uppercase">
        <Link href="/" className="hover:text-primary transition-colors">
          {t("categories.home", "Home")}
        </Link>
        <ChevronRight size={12} className="opacity-60 rtl:rotate-180" />
        <span className="text-foreground/70">{t("Categories")}</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          {t("categories.title", "Shop By Category")}
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {CATEGORIES.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </main>
  );
}
