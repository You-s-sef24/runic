"use client";

import { PackageOpen, Store, ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function StreamlinedShopping() {
  const { t } = useTranslation();

  const features = [
    {
      id: "free-delivery",
      icon: PackageOpen,
      title: t("features.freeDelivery.title"),
      description: t("features.freeDelivery.description"),
    },
    {
      id: "self-pickup",
      icon: Store,
      title: t("features.inStorePickup.title"),
      description: t("features.inStorePickup.description"),
    },
    {
      id: "warranty",
      icon: ShieldCheck,
      title: t("features.extendedWarranty.title"),
      description: t("features.extendedWarranty.description"),
    },
  ];

  return (
    <section className="py-10 sm:py-14">
      <div className="rounded-2xl bg-blue-200/70 dark:bg-zinc-900 px-6 sm:px-10 py-10 sm:py-14 text-center transition-colors duration-300">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-zinc-100 max-w-lg mx-auto leading-snug capitalize">
          {t("features.heading")}
        </h2>

        <div className="mt-10 grid sm:grid-cols-3 gap-8 sm:gap-6 max-w-3xl mx-auto">
          {features.map(({ id, icon: Icon, title, description }) => (
            <div key={id} className="flex flex-col items-center text-center">
              <Icon
                size={28}
                className="text-gray-900 dark:text-blue-400 mb-3"
                strokeWidth={1.5}
              />
              <h3 className="text-base font-semibold text-gray-900 dark:text-zinc-200">
                {title}
              </h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-zinc-400 leading-relaxed max-w-[240px]">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
