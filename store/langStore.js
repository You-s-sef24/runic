import { create } from "zustand";
import { persist } from "zustand/middleware";
import i18n from "@/i18n";

export const useLanguageStore = create(
    persist(
        (set) => ({
            language: "en",
            setLanguage: (language) => {
                i18n.changeLanguage(language);
                set({ language });
            },
        }),
        {
            name: "app-language",
            onRehydrateStorage: () => (state) => {
                if (state?.language) {
                    i18n.changeLanguage(state.language);
                }
            },
        }
    )
);