import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-blue-800">
      <div className="absolute inset-0">
        <Image
          src="/hero.jpg"
          alt="Collection of framed portraits"
          fill
          priority
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-950/70 to-blue-900/40" />
      </div>

      <div className="relative flex flex-col items-center text-center px-6 sm:px-10 py-16 sm:py-24">
        <span className="text-blue-300 text-xs sm:text-sm font-semibold tracking-widest uppercase mb-3">
          New Arrivals
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight max-w-2xl">
          Every Portrait Deserves the Right Frame
        </h1>
        <p className="mt-4 text-sm sm:text-base text-blue-100/80 max-w-md leading-relaxed">
          Discover handpicked frames, boards, and decor pieces crafted to turn
          your favorite moments into lasting displays — delivered anywhere in
          Egypt.
        </p>
        <div className="mt-7 flex items-center gap-3">
          <Link
            href="/collection"
            className="inline-flex items-center justify-center rounded-lg border border-white/40 bg-transparent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 cursor-pointer"
          >
            View Collection
          </Link>
        </div>
      </div>
    </div>
  );
}
