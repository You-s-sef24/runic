"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

function ProductCarouselImage({ src, alt, priority }) {
  const [error, setError] = useState(false);

  return (
    <Image
      src={error ? "/placeholder.png" : src}
      alt={alt}
      fill
      unoptimized
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
      className="object-contain w-full h-full drop-shadow-[0_12px_32px_rgba(0,0,0,0.08)] dark:drop-shadow-[0_12px_32px_rgba(0,0,0,0.4)]"
      priority={priority}
      loading={priority ? undefined : "lazy"}
      onError={() => setError(true)}
    />
  );
}

export default function ProductImageCarousel({ images, alt }) {
  const [api, setApi] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!api) return;
    setActiveIndex(api.selectedScrollSnap());
    const onSelect = () => setActiveIndex(api.selectedScrollSnap());
    api.on("select", onSelect);
    return () => api.off("select", onSelect);
  }, [api]);

  return (
    <div className="w-full max-w-[500px]">
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {images.map((src, i) => (
            <CarouselItem key={i}>
              <div className="relative w-full aspect-square flex items-center justify-center">
                <ProductCarouselImage
                  src={src}
                  alt={`${alt} ${i + 1}`}
                  priority={i === 0}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {images.length > 1 && (
          <>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </>
        )}
      </Carousel>

      {images.length > 1 && (
        <div className="flex items-center justify-center gap-2 mt-4">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => api?.scrollTo(i)}
              aria-label={`Go to image ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-200 cursor-pointer ${
                i === activeIndex
                  ? "w-6 bg-blue-900 dark:bg-blue-400"
                  : "w-2 bg-gray-300 dark:bg-zinc-700 hover:bg-gray-400 dark:hover:bg-zinc-600"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
