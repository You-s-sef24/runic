"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const VALUES = [
    {
        icon: <Sparkles className="w-5 h-5 text-blue-900 dark:text-zinc-400" />,
        title: "Minimalist Design",
        description: "We believe in clean lines, functional spaces, and stripping away the noise to showcase true craftsmanship.",
    },
    {
        icon: <ShieldCheck className="w-5 h-5 text-blue-900 dark:text-zinc-400" />,
        title: "Premium Quality",
        description: "From sustainable oak frames to ultra-durable canvas boards, every single piece is built with elite grade materials.",
    },
    {
        icon: <Heart className="w-5 h-5 text-blue-900 dark:text-zinc-400" />,
        title: "Handcrafted Care",
        description: "Every item is carefully inspected and packaged to ensure it reaches your home in flawless condition.",
    },
];

const FAQS = [
    {
        question: "How long does shipping normally take?",
        answer: "Standard domestic shipping takes between 3 to 5 business days. International shipping estimates range from 7 to 14 business days depending on customs processing.",
    },
    {
        question: "What is your return policy?",
        answer: "We offer a 30-day hassle-free return window for all unused items in their original packaging. Please reach out to our support team to generate a free return label.",
    },
    {
        question: "Do you offer custom dimensions for boards and frames?",
        answer: "Currently, we only supply the dimensions listed on each product catalog. However, we update our collections regularly with fresh standard fits based on customer requests.",
    },
];

export default function AboutPage() {
    return (
        <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">

            <section className="space-y-5 mb-16 sm:mb-24 text-center sm:text-left">
                <span className="text-[11px] font-bold text-blue-900 dark:text-zinc-400 uppercase tracking-widest block">
                    Our Story
                </span>
                <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight leading-tight max-w-2xl">
                    Curating simplicity for your living spaces.
                </h1>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed max-w-3xl">
                    Founded with a deep appreciation for architectural clean lines and organic aesthetics, our mission is to transform environments. We produce minimalist frames, decorations, and boards that bridge the gap between studio gallery art and home solace.
                </p>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed max-w-3xl">
                    Every product we list is crafted responsibly, ensuring your workspace or home gallery feels thoughtful, intentional, and balanced.
                </p>
                <div className="pt-2">
                    <Link href="/collection">
                        <Button className="bg-blue-900 hover:bg-blue-950 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-white text-xs font-semibold uppercase tracking-wider gap-2 px-6 py-5 cursor-pointer shared-button-styles">
                            Explore Collection <ArrowRight size={14} />
                        </Button>
                    </Link>
                </div>
            </section>

            <section className="py-12 border-t border-zinc-100 dark:border-zinc-800 mb-16 sm:mb-24">
                <div className="text-center sm:text-left max-w-xl mb-12">
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
                        What Drives Us Forward
                    </h2>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-2">
                        We operate on a set of core standards that ensure peak products and honest services.
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
                <div className="text-center sm:text-left mb-10">
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">
                        Quick clear answers regarding our shipping, billing, and standard operations.
                    </p>
                </div>

                <Accordion type="single" collapsible className="w-full space-y-2">
                    {FAQS.map((faq, idx) => (
                        <AccordionItem
                            key={idx}
                            value={`faq-${idx}`}
                            className="border border-zinc-100 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-900/50 px-4 py-1 shadow-sm data-[state=open]:border-zinc-200 dark:data-[state=open]:border-zinc-700 transition-all duration-200"
                        >
                            <AccordionTrigger className="text-zinc-800 dark:text-zinc-200 hover:text-zinc-900 dark:hover:text-zinc-100 font-medium text-sm sm:text-base hover:no-underline py-4 text-left">
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