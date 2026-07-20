"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { ArrowRight, ShieldCheck, Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export default function AboutPage() {
    const { t } = useTranslation();

    const VALUES = [
        {
            icon: <Sparkles className="w-5 h-5 text-blue-900 dark:text-zinc-400" />,
            title: t("about.values.minimalistDesign.title"),
            description: t("about.values.minimalistDesign.description"),
        },
        {
            icon: <ShieldCheck className="w-5 h-5 text-blue-900 dark:text-zinc-400" />,
            title: t("about.values.premiumQuality.title"),
            description: t("about.values.premiumQuality.description"),
        },
        {
            icon: <Heart className="w-5 h-5 text-blue-900 dark:text-zinc-400" />,
            title: t("about.values.handcraftedCare.title"),
            description: t("about.values.handcraftedCare.description"),
        },
    ];

    const FAQS = [
        {
            question: t("about.faqs.shipping.question"),
            answer: t("about.faqs.shipping.answer"),
        },
        {
            question: t("about.faqs.returns.question"),
            answer: t("about.faqs.returns.answer"),
        },
        {
            question: t("about.faqs.customDimensions.question"),
            answer: t("about.faqs.customDimensions.answer"),
        },
    ];

    return (
        <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">

            <section className="space-y-5 mb-16 sm:mb-24 text-center sm:text-start">
                <span className="text-[11px] font-bold text-blue-900 dark:text-zinc-400 uppercase tracking-widest block">
                    {t("about.ourStory")}
                </span>
                <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight leading-tight max-w-2xl">
                    {t("about.heroTitle")}
                </h1>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed max-w-3xl">
                    {t("about.heroParagraph1")}
                </p>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed max-w-3xl">
                    {t("about.heroParagraph2")}
                </p>
                <div className="pt-2">
                    <Link href="/collection">
                        <Button className="bg-blue-900 hover:bg-blue-950 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-white text-xs font-semibold uppercase tracking-wider gap-2 px-6 py-5 cursor-pointer shared-button-styles">
                            {t("about.exploreCollection")} <ArrowRight size={14} className="rtl:rotate-180" />
                        </Button>
                    </Link>
                </div>
            </section>

            <section className="py-12 border-t border-zinc-100 dark:border-zinc-800 mb-16 sm:mb-24">
                <div className="text-center sm:text-start max-w-xl mb-12">
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
                        {t("about.whatDrivesUs")}
                    </h2>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-2">
                        {t("about.whatDrivesUsDesc")}
                    </p>
                </div>

                <div className="grid sm:grid-cols-3 gap-6">
                    {VALUES.map((value, idx) => (
                        <div
                            key={idx}
                            className="p-6 border border-zinc-100 dark:border-zinc-800 rounded-xl bg-zinc-50/30 dark:bg-zinc-900/30 flex flex-col items-start gap-4"
                        >
                            <div className="p-2.5 bg-white dark:bg-zinc-900 rounded-lg shadow-sm border border-zinc-100/60 dark:border-zinc-800">
                                {value.icon}
                            </div>
                            <div>
                                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-base mb-1.5">
                                    {value.title}
                                </h3>
                                <p className="text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed">
                                    {value.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="py-12 border-t border-zinc-100 dark:border-zinc-800">
                <div className="text-center sm:text-start mb-10">
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
                        {t("about.faqTitle")}
                    </h2>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">
                        {t("about.faqSubtitle")}
                    </p>
                </div>

                <Accordion type="single" collapsible className="w-full space-y-2">
                    {FAQS.map((faq, idx) => (
                        <AccordionItem
                            key={idx}
                            value={`faq-${idx}`}
                            className="border border-zinc-100 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-900/50 px-4 py-1 shadow-sm data-[state=open]:border-zinc-200 dark:data-[state=open]:border-zinc-700 transition-all duration-200"
                        >
                            <AccordionTrigger className="text-zinc-800 dark:text-zinc-200 hover:text-zinc-900 dark:hover:text-zinc-100 font-medium text-sm sm:text-base hover:no-underline py-4 text-start">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed pb-4">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </section>

        </main>
    );
}