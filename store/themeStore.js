import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useThemeStore = create(
    persist(
        (set) => ({
            theme: "light",
            setTheme: (theme) => set({ theme }),
            toggleTheme: () =>
                set((state) => ({ theme: state.theme === "dark" ? "light" : "dark" })),
        }),
        { name: "theme-storage" }
    )
);