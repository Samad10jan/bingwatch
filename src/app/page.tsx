import HeroSection from "./components/hero-section";
import CarouselAnimeSlide from "./components/slider";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowRight } from "lucide-react";

export default async function Home() {
  const fetchSafe = async (url: string) => {
    try {
      const res = await fetch(url, { next: { revalidate: 60 } });
      if (!res.ok) return [];
      const data = await res.json();
      return data.data || [];
    } catch (err) {
      console.error("Fetch error:", url, err);
      return [];
    }
  };

  // API URLs
  const urlHero = 'https://api.rei.my.id/anime?status=ongoing&sort=-score&page=2&limit=10';
  const urlTv = 'https://api.rei.my.id/anime?type=tv&sort=-score&page=4&limit=23';
  const urlMovies = 'https://api.rei.my.id/anime?type=movie&sort=-score&page=2&limit=23';
  const urlUpcoming = 'https://api.rei.my.id/anime?status=upcoming&sort=-score&page=5&limit=23';
  const urlOVA = 'https://api.rei.my.id/anime?type=ova&sort=-score&page=5&limit=23';

  const popularAnime = await fetchSafe(urlHero);
  const tvAnime = await fetchSafe(urlTv);
  const moviesAnime = await fetchSafe(urlMovies);
  const upcomingAnime = await fetchSafe(urlUpcoming);
  const ovaAnime = await fetchSafe(urlOVA);

  const SectionHeader = ({ title }: { title: string }) => (
    <div className="flex items-center justify-between mb-4 px-4">
      <h2 className="text-2xl font-bold">{title}</h2>
      <Badge variant="secondary" className="flex items-center space-x-1 cursor-pointer">
        <span>See All</span>
        <ArrowRight size={16} />
      </Badge>
    </div>
  );

  return (
    <div className="space-y-16 px-4 md:px-8">
      {/* Hero Section */}
      {popularAnime.length > 0 && <HeroSection PopularData={popularAnime} />}

      {/* TV Anime */}
      {tvAnime.length > 0 && (
        <section>
          <SectionHeader title="Top TV Anime" />
          <ScrollArea className="w-full overflow-x-auto">
            <CarouselAnimeSlide data={tvAnime} />
          </ScrollArea>
          <Separator className="my-8" />
        </section>
      )}

      {/* Movies */}
      {moviesAnime.length > 0 && (
        <section>
          <SectionHeader title="Top Movies" />
          <ScrollArea className="w-full overflow-x-auto">
            <CarouselAnimeSlide data={moviesAnime} />
          </ScrollArea>
          <Separator className="my-8" />
        </section>
      )}

      {/* Upcoming */}
      {upcomingAnime.length > 0 && (
        <section>
          <SectionHeader title="Upcoming Anime" />
          <ScrollArea className="w-full overflow-x-auto">
            <CarouselAnimeSlide data={upcomingAnime} />
          </ScrollArea>
          <Separator className="my-8" />
        </section>
      )}

      {/* OVA / Specials */}
      {ovaAnime.length > 0 && (
        <section>
          <SectionHeader title="OVA / Specials" />
          <ScrollArea className="w-full overflow-x-auto">
            <CarouselAnimeSlide data={ovaAnime} />
          </ScrollArea>
        </section>
      )}
    </div>
  );
}
