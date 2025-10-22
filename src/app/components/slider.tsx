import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,} from "@/components/ui/carousel";
import MovieCard from "./moviecard";

export default function CarouselAime({ PopularData }: { PopularData: any[] }) {
  // Divide PopularData into chunks of 7
  const chunkSize = 6;
  const slides = [];

  for (let i = 0; i < PopularData.length; i += chunkSize) {
    slides.push(PopularData.slice(i, i + chunkSize));
  }

  return (
    <Carousel className="w-full max-w-6xl mx-auto">
      <CarouselContent>
        {slides.map((group, index) => (
          <CarouselItem key={index} className="flex justify-between gap-4">
            {group.map((data, i) => (
              <MovieCard key={i} data={data} />
            ))}
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
