"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import AnimeCard from "./moviecard";
import { Anime } from "@/lib/type";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CarouselAnimeSlide({ data, type }: { data: Anime[], type: string }) {

  return (
    <Carousel className="relative w-full mx-auto px-2 sm:px-4">
      <CarouselContent>
        {data.map((anime) => (
          <CarouselItem 
            key={anime.mal_id}
            className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
          >
            <AnimeCard data={anime} />
          </CarouselItem>
        ))}

        {/* VIEW MORE BUTTON AS LAST CARD */}
        <CarouselItem className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6">
          <Card className="h-56 rounded-xl flex justify-center items-center">
            <Link href={`/type/${type}`}>
              <Button size="lg" className="font-semibold">
                View More
              </Button>
            </Link>
          </Card>
        </CarouselItem>
      </CarouselContent>

      {/* Arrows */}
      <CarouselPrevious className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2" />
      <CarouselNext className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2" />
    </Carousel>
  );
}
