"use client";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Anime, CarouselSlideProps, Manga } from "@/lib/type";
import { useEffect, useState } from "react";
import AnimeCard from "../anime-components/moviecard"; // anime card
import MangaCard from "../manga-components/mangacard"; // manga card

export default function CarouselSlide({ data, type }: CarouselSlideProps) {
  const [chunkSize, setChunkSize] = useState(5);

  const isManga = type === "manga"
  useEffect(() => {
    function updateChunkSize() {
      const width = window.innerWidth;

      if (width < 640) setChunkSize(2);
      else if (width < 768) setChunkSize(3);
      else if (width < 1024) setChunkSize(4);
      else if (width < 1280) setChunkSize(5);
      else if (width < 1536) setChunkSize(10);
      else setChunkSize(12);
    }

    updateChunkSize();
    window.addEventListener("resize", updateChunkSize);
    return () => window.removeEventListener("resize", updateChunkSize);
  }, []);

  const slides: (Anime[] | Manga[])[] = [];
  for (let i = 0; i < data.length; i += chunkSize) {
    slides.push(data.slice(i, i + chunkSize));
  }

  return (
    <Carousel className="relative w-full mx-auto px-3">
      <CarouselContent>
        {slides.map((group, slideIndex) => (
          <CarouselItem key={slideIndex}>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 gap-3 mt-3 w-full">
              {group.map((item, i) =>
                isManga ? (
                  <MangaCard key={i} data={item as Manga} />
                ) : (
                  <AnimeCard key={i} data={item as Anime} />
                )
              )}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="absolute top-1/2 -translate-y-1/2 -left-0 lg:hidden flex p-5" />
      <CarouselNext className="absolute top-1/2 -translate-y-1/2 -right-0 lg:hidden flex p-5" />
    </Carousel>
  );
}
