"use client";

import { useTranslation } from "react-i18next";
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
];

export default function CategorySection() {
  const { t } = useTranslation();

  return (
    <section className="py-10 sm:py-14">
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-zinc-100 tracking-tight">
          {t("categories.title")}
        </h2>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
        {CATEGORIES.map((category, i) => (
          <CategoryCard key={i} category={category} />
        ))}
      </div>
    </section>
  );
}
