"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import AnimeCard from "./moviecard";
import { useEffect, useState } from "react";
import { Anime } from "@/lib/type";

export default function CarouselAnimeSlide({ data, type }: { data: Anime[], type: string }) {
  const [chunkSize, setChunkSize] = useState(5);

  useEffect(() => {
    function updateChunkSize() {
      const width = window.innerWidth;

      if (width < 640) {
        setChunkSize(2); // Mobile - 2 items
      } else if (width < 768) {
        setChunkSize(3); // Small tablet
      } else if (width < 1024) {
        setChunkSize(4); // Tablet
      } else if (width < 1280) {
        setChunkSize(5); // Small desktop
      } else if (width < 1536) {
        setChunkSize(10); // Desktop - 2 rows of 5
      } else {
        setChunkSize(12); // Large screens - 2 rows of 6
      }
    }

    updateChunkSize();
    window.addEventListener("resize", updateChunkSize);
    return () => window.removeEventListener("resize", updateChunkSize);
  }, []);

  const slides = [];
  for (let i = 0; i < data.length; i += chunkSize) {
    slides.push(data.slice(i, i + chunkSize));
  }

  return (
    <Carousel className="relative w-full mx-auto px-3 sm:px-4">
      <CarouselContent>
        {slides.map((group, slideIndex) => (
          <CarouselItem key={slideIndex} className="px-5">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 gap-3 mt-3 w-full">
              {group.map((anime, i) => (
                <AnimeCard key={i} data={anime} />
              ))}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Navigation Arrows - Hidden on mobile, visible on sm+ */}
      <CarouselPrevious className="absolute top-1/2 -translate-y-1/2 -left-0 lg:hidden flex" />
      <CarouselNext className="absolute top-1/2 -translate-y-1/2 -right-0 lg:hidden flex" />
    </Carousel>
  );
}