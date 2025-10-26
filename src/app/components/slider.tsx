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

export default function CarouselAnimeSlide({ data }: { data: any[] }) {
  const [chunkSize, setChunkSize] = useState(8);

  useEffect(() => {
    function updateChunkSize() {
      const width = window.innerWidth;

      if (width < 640) {
        setChunkSize(6); // Mobile
      } else if (width < 1024) {
        setChunkSize(6); // Tablet
      } else if (width < 1440) {
        setChunkSize(8); // Desktop
      } else {
        setChunkSize(8); // Large screens
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
    <Carousel className="md:mx-auto md:w-6xl w-[95vw] mx-0">
      <CarouselContent className=" relative px-4">
        {slides.map((group, index) => (
          <CarouselItem key={index}>
            <div className="flex flex-wrap justify-center mt-3 gap-2 h-full flex-1">
              {group.map((anime, i) => (
                <div key={i}>
                  <AnimeCard data={anime} />
                </div>
              ))}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="m-0 absolute bottom-0 left-0" />
      <CarouselNext className="m-0 absolute  bottom-0 right-0 " />
    </Carousel>
  );
}