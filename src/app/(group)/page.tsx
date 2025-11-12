import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { genres } from "@/lib/constants";
import Link from "next/link";
import Footer from "../components/footer";
import HeroSection from "../components/hero-section";
import LazySection from "../components/lazysection";
import CarouselAnimeSlide from "../components/slider";

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
    fetchSafe("https://api.jikan.moe/v4/top/anime?type=tv&limit=10&page=1&sfw=1&order_by=bypopularity"),
    fetchSafe("https://api.jikan.moe/v4/top/anime?type=tv&limit=10&page=1&sfw=1&order_by=popularity"),
    fetchSafe("https://api.jikan.moe/v4/top/anime?type=movie&limit=10&page=1&sfw=1&order_by=popularity"),
  ]);

  return (
    <div className="*:my-5 *:text-center flex flex-col ">
      {/* Hero Section */}
      {popularAnime.length > 0 && <HeroSection PopularData={popularAnime} />}

      {/* TV Anime */}
      {tvAnime.length > 0 && (
        <section>
          <div className="flex flex-col justify-center">

            <h2 className="text-2xl font-bold">Top TV Anime</h2>
            <Link href="/type/tv" className="self-end">
              <Button variant="ghost" className="text-sm">View All →</Button>
            </Link>
          </div>

          <CarouselAnimeSlide data={tvAnime} type="tv" />

          <Separator className="mt-8" />
        </section>
      )}
      <section>
        <h2 className=" text-2xl font-bold mb-4 mx-auto">Browse by Genre</h2>
        <div className="flex w-full flex-wrap gap-2 justify-center max-w-6xl mx-auto">
          {genres.splice(0, 20).map((genre, i) => (


            <Link
              key={genre.mal_id}
              href={`/genres/${genre.mal_id}`}
              className=" "
            >
              <Badge variant={"outline"} className="p-2 hover:bg-accent focus:bg-accent">

                {genre.name}
              </Badge>
            </Link>

          ))}
        </div>
        <Separator className="mt-8" />
      </section>
      {/* Movies */}
      {moviesAnime.length > 0 && (
        <section>
          <div className="flex flex-col justify-center">

            <h2 className="text-2xl font-bold">Top Movies</h2>
            <Link href="/type/movie" className="self-end">
              <Button variant="ghost" className="text-sm">View All →</Button>
            </Link>
          </div>

          <CarouselAnimeSlide data={moviesAnime} type="movie" />

          <Separator className="mt-8" />
        </section>
      )}

     
      <LazySection
        title="Top Ranked "
        url="https://api.jikan.moe/v4/top/anime?limit=10"
        type="top"
      />

      <LazySection
        title="Upcoming Anime"
        url="https://api.jikan.moe/v4/top/anime?filter=upcoming&page=1&limit=10&sfw=1"
        type="upcoming"
      />

      <LazySection
        title="OVA & Specials"
        url="https://api.jikan.moe/v4/top/anime?type=ova&page=1&limit=10&sfw=1"
      />

      <LazySection
        title= "Specials"
      url= "https://api.jikan.moe/v4/top/anime?type=special&limit=10&page=1&sfw=1"
      type= "special"
      />


      {/* Footer */}
      <Footer />
    </div>
  );
}
