import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import HeroSection from "../components/hero-section";
import CarouselAnimeSlide from "../components/slider";

export default async function Home() {
  // ✅ Safe fetch helper
  const fetchSafe = async (url: string) => {
    try {
      const res = await fetch(url, { next: { revalidate: 3600 } }); // Cache for 1 hour
      if (!res.ok) return [];
      const data = await res.json();
      return data.data || [];
    } catch (err) {
      console.error("Fetch error:", url, err);
      return [];
    }
  };

  // ✅ Corrected API URLs
  const urlHero = "https://api.jikan.moe/v4/top/anime?limit=10&filter=airing&page=1";
  const urlTv = "https://api.jikan.moe/v4/top/anime?type=tv&page=1&limit=23";
  const urlMovies = "https://api.jikan.moe/v4/top/anime?type=movie&page=1&limit=23";
  const urlUpcoming = "https://api.jikan.moe/v4/top/anime?filter=upcoming&page=1&limit=23";
  const urlOVA = "https://api.jikan.moe/v4/top/anime?type=ova&page=1&limit=23";

  // ✅ Fetch all categories
  const [popularAnime, tvAnime, moviesAnime, upcomingAnime, ovaAnime] = await Promise.all([
    fetchSafe(urlHero),
    fetchSafe(urlTv),
    fetchSafe(urlMovies),
    fetchSafe(urlUpcoming),
    fetchSafe(urlOVA),
  ]);

  return (
    <div className=" *:my-10 *:text-center">
      {/* --- Hero Section --- */}
      {popularAnime.length > 0 && <HeroSection PopularData={popularAnime} />}

      {/* --- TV Anime --- */}
      {tvAnime.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold ">Top TV Anime</h2>
          <ScrollArea className="w-full">
            <CarouselAnimeSlide data={tvAnime} />
          </ScrollArea>
          <Separator className="my-8" />
        </section>
      )}

      {/* --- Movies --- */}
      {moviesAnime.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-4  ">Top Movies</h2>
          <ScrollArea className="w-full">
            <CarouselAnimeSlide data={moviesAnime} />
          </ScrollArea>
          <Separator className="my-8" />
        </section>
      )}

      {/* --- Upcoming Anime --- */}
      {upcomingAnime.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-4">Upcoming Anime</h2>
          <ScrollArea className="w-full">
            <CarouselAnimeSlide data={upcomingAnime} />
          </ScrollArea>
          <Separator className="my-8" />
        </section>
      )}

      {/* --- OVA / Specials --- */}
      {ovaAnime.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-4">OVA & Specials</h2>
          <ScrollArea className="w-full">
            <CarouselAnimeSlide data={ovaAnime} />
          </ScrollArea>
        </section>
      )}

     
    </div>
  );
}
