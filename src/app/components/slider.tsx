import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import AnimeCard from "./moviecard";

export default function CarouselAnimeSlide({ data }: { data: any[] }) {
  const chunkSize = 8; // number of cards per slide
  const slides = [];

  for (let i = 0; i < data.length; i += chunkSize) {
    slides.push(data.slice(i, i + chunkSize));
  }

  return (
    <Carousel className="mx-auto w-6xl ">
      <CarouselContent>
        {slides.map((group, index) => (
          <CarouselItem key={index}>
            <div className="flex flex-wrap justify-between mt-3 gap-2 h-full">
              {group.map((anime, i) => (
                <div
                  key={i}
                >
                  <AnimeCard data={anime} />
                </div>
              ))}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
