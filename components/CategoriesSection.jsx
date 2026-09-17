"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { ArrowRight, ArrowLeft } from "lucide-react";
import CategoryCard from "./CategoryCard";

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
];

export default function CategorySection() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";

  const displayedCategories = CATEGORIES.slice(0, 3);

  return (
    <section className="py-10 sm:py-14">
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
          {t("categories.title")}
        </h2>
        <Link
          href="/category"
          className="group flex items-center gap-1.5 text-sm font-semibold text-primary hover:opacity-80 transition-opacity"
        >
          <span>{t("categories.viewAll", "View All")}</span>
          {isRtl ? (
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          ) : (
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          )}
        </Link>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
        {displayedCategories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
}
