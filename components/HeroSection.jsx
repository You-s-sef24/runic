import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-blue-800 dark:bg-zinc-900 transition-colors duration-300">
      <div className="absolute inset-0">
        <Image
          src="/hero.jpg"
          alt="Collection of framed portraits"
          fill
          priority
          className="object-cover opacity-40 dark:opacity-20 transition-opacity"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-950/70 to-blue-900/40 dark:from-zinc-950 dark:via-zinc-950/80 dark:to-zinc-900/40" />
      </div>

      <div className="relative flex flex-col items-center text-center px-6 sm:px-10 py-16 sm:py-24">
        <span className="text-blue-300 dark:text-blue-400 text-xs sm:text-sm font-semibold tracking-widest uppercase mb-3">
          New Arrivals
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight max-w-2xl leading-tight">
          Every Portrait Deserves the Right Frame
        </h1>
        <p className="mt-4 text-sm sm:text-base text-blue-100/80 dark:text-zinc-300/90 max-w-md leading-relaxed">
          Discover handpicked frames, boards, and decor pieces crafted to turn
          your favorite moments into lasting displays — delivered anywhere in
          Egypt.
        </p>
        <div className="mt-7 flex items-center gap-3">
          <Link
            href="/collection"
            className="inline-flex items-center justify-center rounded-lg border border-white/40 dark:border-zinc-700 bg-transparent px-6 py-3 text-sm font-semibold text-white dark:text-zinc-200 transition-all hover:bg-white/10 dark:hover:bg-zinc-800/50 cursor-pointer"
          >
            View Collection
          </Link>
        </div>
      </div>
    </div>
  );
}