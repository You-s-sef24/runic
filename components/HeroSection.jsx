"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function HeroSection() {
  const { t } = useTranslation();

  return (
    <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-zinc-950 border border-gray-100 dark:border-zinc-800 transition-colors duration-300">
      <div className="absolute inset-0">
        <Image
          src="/back.jpg"
          alt="Collection of framed portraits and accessories"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 sm:via-white/70 to-white/10 dark:from-zinc-950 dark:via-zinc-950/85 sm:dark:via-zinc-950/70 dark:to-zinc-950/10" />
      </div>

      <div className="relative flex flex-col items-start text-start px-6 sm:px-10 lg:px-14 py-14 sm:py-24 lg:py-32 min-h-[460px] sm:min-h-[520px]">
        <span className="text-blue-500 text-xs sm:text-sm font-semibold tracking-widest uppercase mb-3">
          {t("home.newArrivals")}
        </span>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-zinc-100 tracking-tight leading-[1.1] max-w-[14ch]">
          {t("home.heroTitleLine1")}
          <br />
          {t("home.heroTitleLine2")}
        </h1>

        <p className="mt-5 text-sm sm:text-base text-gray-600 dark:text-zinc-400 max-w-xs sm:max-w-sm leading-relaxed">
          {t("home.heroSubtitle")}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4 sm:gap-6">
          <Link
            href="/collection"
            className="inline-flex items-center justify-center rounded-lg bg-blue-950 dark:bg-zinc-100 px-6 py-3 text-sm font-semibold text-white dark:text-zinc-950 transition-all hover:bg-blue-900 dark:hover:bg-zinc-200 cursor-pointer"
          >
            {t("home.exploreCollection")}
          </Link>
          <Link
            href="/bestsellers"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-900 dark:text-zinc-100 hover:text-blue-950 dark:hover:text-zinc-300 transition-colors cursor-pointer"
          >
            {t("home.viewBestsellers")}
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
}
