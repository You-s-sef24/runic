import Image from "next/image";
import { Button } from "@/components/ui/button";

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
          Morbi justo sem, venenatis sit amet tortor id, porttitor facilisis
          mauris. Vivamus fringilla elit eu felis iaculis cursus.
        </p>
        <div className="mt-7 flex items-center gap-3">
          <Button
            variant="outline"
            className="bg-transparent text-white border-white/40 hover:bg-white/10 hover:text-white cursor-pointer"
          >
            View Collection
          </Button>
        </div>
      </div>
    </div>
  );
}
