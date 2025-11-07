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
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CarouselAnimeSlide({ data, type }: { data: Anime[], type: string }) {
  const [chunkSize, setChunkSize] = useState(8);

  useEffect(() => {
    function updateChunkSize() {
      const width = window.innerWidth;

      if (width < 480) {
        setChunkSize(2); // Small mobile
      } else if (width < 640) {
        setChunkSize(2); // Mobile
      } else if (width < 768) {
        setChunkSize(2); // Large mobile
      } else if (width < 1024) {
        setChunkSize(2); // Tablet
      } else if (width < 1280) {
        setChunkSize(6); // Small desktop
      } else if (width < 1536) {
        setChunkSize(10); // Desktop
      } else {
        setChunkSize(12); // Large screens
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
    <Carousel className="relative w-full  mx-auto px-3 sm:px-4">
      <CarouselContent>
        {slides.map((group, slideIndex) => (
          <CarouselItem key={slideIndex} className="px-5 ">
            <div className="grid grid-cols-2  sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-3 md:gap-4 mt-3 w-full md:*:mx-5">
              {group.map((anime, i) => (
                <AnimeCard key={i} data={anime} />
              ))}

          
              
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Navigation Arrows - Hidden on mobile, visible on tablet+ */}
      <CarouselPrevious className="absolute top-1/2 -translate-y-1/2 -left-0 hidden  " />
      <CarouselNext className="absolute top-1/2 -translate-y-1/2 -right-0 md:hidden  flex" />
    </Carousel>
  );
}