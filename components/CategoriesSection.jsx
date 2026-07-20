"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const CATEGORIES = [
  {
    id: "frames",
    imageUrl:
      "https://res.cloudinary.com/dz0ylot2a/image/upload/v1784163246/hwrjidlslv2ufdqlgsds.png",
  },
  {
    id: "decorations",
    imageUrl:
      "https://res.cloudinary.com/dz0ylot2a/image/upload/v1784163085/w5kth2vdbtw92xj4kpot.png",
  },
  {
    id: "boards",
    imageUrl:
      "https://res.cloudinary.com/dz0ylot2a/image/upload/v1784029520/jgy8qbhgmd2mrw0xazne.jpg",
  },
];

export default function CategorySection() {
  const { t } = useTranslation();

  return (
    <section className="py-10 sm:py-14">
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-zinc-100 tracking-tight">
          {t("home.shopByCategory")}
        </h2>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
        {CATEGORIES.map((category) => (
          <Link
            key={category.id}
            href={`/category/${category.id}`}
            className="group relative h-64 w-full rounded-xl overflow-hidden flex items-center justify-center text-center p-4 border border-gray-100 dark:border-zinc-800 transition-all duration-300"
          >
            <div className="absolute inset-0 z-0">
              <Image
                fill
                unoptimized
                src={category.imageUrl}
                alt={t(`categories.${category.id}`)}
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
            </div>

            <h3 className="relative z-10 text-lg font-bold tracking-wide text-white uppercase sm:text-xl">
              {t(`categories.${category.id}`)}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
