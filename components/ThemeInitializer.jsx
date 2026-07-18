"use client";

import { useThemeStore } from "@/store/themeStore";
import { useEffect } from "react";

export default function ThemeInitializer() {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  return null;
}
