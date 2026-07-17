import CategorySection from "@/components/CategoriesSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import HeroSection from "@/components/HeroSection";
import StreamlinedShopping from "@/components/Streamlinedshopping ";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-zinc-50 px-4 sm:px-6 py-8 sm:py-16">
      <div className="max-w-6xl mx-auto space-y-16 sm:space-y-24">

        <HeroSection />
        <CategorySection />
        <FeaturedProducts />
        <StreamlinedShopping />

      </div>
    </main>
  );
}