"use client";

import { useEffect } from "react";
import "@/i18n";
import { useLanguageStore } from "@/store/langStore";

export default function I18nInitializer() {
  const lang = useLanguageStore((state) => state.language);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  return null;
}
