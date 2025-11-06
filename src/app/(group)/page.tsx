import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import HeroSection from "../components/hero-section";
import CarouselAnimeSlide from "../components/slider";
import LazyHomeSections from "../components/lazyloadcomponents";
import LazyAnimeSections from "../components/lazyloadcomponents";

export default async function Home() {

  const fetchSafe = async (url: string) => {
    try {
      const res = await fetch(url, { next: { revalidate: 3600 } });
      if (!res.ok) return [];
      const data = await res.json();
      return data.data || [];
    } catch {
      return [];
    }
  };

  const [popularAnime, tvAnime, moviesAnime] = await Promise.all([
    fetchSafe("https://api.jikan.moe/v4/top/anime?limit=10&filter=airing&page=1&sfw=1"),
    fetchSafe("https://api.jikan.moe/v4/top/anime?type=tv&page=1&sfw=1"),
    fetchSafe("https://api.jikan.moe/v4/top/anime?type=movie&page=1&sfw=1"),
  ]);

  return (
    <div className="*:my-10 *:text-center">
      {popularAnime.length > 0 && <HeroSection PopularData={popularAnime} />}

      {tvAnime.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold">Top TV Anime</h2>
          <ScrollArea>
            <CarouselAnimeSlide data={tvAnime} type="tv" />
          </ScrollArea>
          <Separator className="my-8" />
        </section>
      )}

      {moviesAnime.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-4">Top Movies</h2>
          <ScrollArea>
            <CarouselAnimeSlide data={moviesAnime} type="movie" />
          </ScrollArea>
          <Separator className="my-8" />
        </section>
      )}

      {/* Lazy load the rest */}
      <LazyAnimeSections
        sections={[
          {
            title: "Upcoming Anime",
            url: "https://api.jikan.moe/v4/top/anime?filter=upcoming&page=1&sfw=1",
            type: "upcoming",
          },
          {
            title: "OVA & Specials",
            url: "https://api.jikan.moe/v4/top/anime?type=ova&page=1&sfw=1",
            type: "ova",
          },
          {
            title: "Specials",
            url: "https://api.jikan.moe/v4/top/anime?type=special&page=1&sfw=1",
            type: "special",
          },
        ]}
      />
    </div>
  );
}
