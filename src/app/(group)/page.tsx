import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import HeroSection from "../components/hero-section";
import CarouselAnimeSlide from "../components/slider";

export default async function Home() {
  const urlHero = "https://api.jikan.moe/v4/top/anime?limit=10&filter=airing&page=1&sfw=1";
  const urlTv = "https://api.jikan.moe/v4/top/anime?type=tv&page=1&sfw=1";
  const urlMovies = "https://api.jikan.moe/v4/top/anime?type=movie&page=1&sfw=1";
  const urlUpcoming = "https://api.jikan.moe/v4/top/anime?filter=upcoming&page=1&sfw=1";
  const urlOVA = "https://api.jikan.moe/v4/top/anime?type=ova&page=1&sfw=1";

  // Auto-Retry Fetch Function (Option C)
  const fetchSafe = async (url: string, retries = 3, delay = 800): Promise<any[]> => {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const res = await fetch(url, { next: { revalidate: 3600 } }); // Cache for 1 hr

        if (res.ok) {
          const data = await res.json();
          if (data?.data?.length > 0) return data.data;
        }

        console.warn(`Retrying ${url} (Attempt ${attempt}/${retries})`);
      } catch (err) {
        console.error(`Fetch error on ${url} (Attempt ${attempt}/${retries})`, err);
      }

      await new Promise((r) => setTimeout(r, delay)); // wait before retry
    }

    return []; // Return empty after all retries
  };

  const [
    popularAnime,
    tvAnime,
    moviesAnime,
    upcomingAnime,
    ovaAnime
  ] = await Promise.all([
    fetchSafe(urlHero),
    fetchSafe(urlTv),
    fetchSafe(urlMovies),
    fetchSafe(urlUpcoming),
    fetchSafe(urlOVA),
  ]);

  return (
    <div className="*:my-10 *:text-center">
      {/* --- Hero Section --- */}
      {popularAnime.length > 0 && <HeroSection PopularData={popularAnime} />}

      {/* --- TV Anime --- */}
      <section>
        <h2 className="text-2xl font-bold">Top TV Anime</h2>
        {tvAnime.length > 0 ? (
          <ScrollArea className="w-full">
            <CarouselAnimeSlide data={tvAnime} type="tv" />
          </ScrollArea>
        ) : (
          <p className="text-muted-foreground text-sm">No data available</p>
        )}
        <Separator className="my-8" />
      </section>

      {/* --- Movies --- */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Top Movies</h2>
        {moviesAnime.length > 0 ? (
          <ScrollArea className="w-full">
            <CarouselAnimeSlide data={moviesAnime} type="movie" />
          </ScrollArea>
        ) : (
          <p className="text-muted-foreground text-sm">No data available</p>
        )}
        <Separator className="my-8" />
      </section>

      {/* --- Upcoming Anime --- */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Upcoming Anime</h2>
        {upcomingAnime.length > 0 ? (
          <ScrollArea className="w-full">
            <CarouselAnimeSlide data={upcomingAnime} type="upcoming" />
          </ScrollArea>
        ) : (
          <p className="text-muted-foreground text-sm">No data available</p>
        )}
        <Separator className="my-8" />
      </section>

      {/* --- OVA / Specials --- */}
      <section>
        <h2 className="text-2xl font-bold mb-4">OVA & Specials</h2>
        {ovaAnime.length > 0 ? (
          <ScrollArea className="w-full">
            <CarouselAnimeSlide data={ovaAnime} type="ova" />
          </ScrollArea>
        ) : (
          <p className="text-muted-foreground text-sm">No data available</p>
        )}
      </section>
    </div>
  );
}
