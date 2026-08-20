import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";

export default function CategoryCard({ category }) {
  const { t } = useTranslation();

  return (
    <Link
      key={category.id}
      href={`/category/${category.id}`}
      className="group relative h-72 w-full rounded-xl overflow-hidden flex flex-col justify-end p-5 border border-gray-100 dark:border-zinc-800 transition-all duration-300"
    >
      <div className="absolute inset-0 z-0">
        <Image
          fill
          unoptimized
          loading="lazy"
          src={category.imageUrl}
          alt={t(`categories.${category.id}`)}
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/85 transition-colors duration-300" />
      </div>

      <div className="relative z-10 space-y-1.5">
        <h3 className="text-lg sm:text-xl font-bold tracking-wide text-white uppercase">
          {t(`categories.${category.id}`)}
        </h3>
        <p className="text-xs sm:text-sm text-white/80 leading-relaxed line-clamp-2">
          {t(`categories.${category.id}Desc`)}
        </p>
      </div>
    </Link>
  );
}
