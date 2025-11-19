import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { genres } from "@/lib/constants";
import Link from "next/link";
import Footer from "../components/footer";
import HeroSection from "../components/commons/hero-section";
import LazySection from "../components/commons/lazysection";
import CarouselAnimeSlide from "../components/commons/slider";
import { fetchSafe } from "@/lib/helper";

// helper function
export default async function Home() {
  
  // only can do 3 request per sec
  const [popularAnime, tvAnime, moviesAnime] = await Promise.all([
    fetchSafe("https://api.jikan.moe/v4/top/anime?type=tv&limit=10&page=1&sfw=1&order_by=bypopularity"),
    fetchSafe("https://api.jikan.moe/v4/top/anime?type=tv&limit=10&page=1&sfw=1&order_by=popularity"),
    fetchSafe("https://api.jikan.moe/v4/top/anime?type=movie&limit=10&page=1&sfw=1&order_by=popularity"),
  ]);

  return (
    <div className="*:my-5 *:text-center flex flex-col ">

      <div className="container mx-auto m-0 p-0 flex items-center md:justify-between justify-center ">

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-indigo-500 blur-xl opacity-50" />
          <h1 className="relative text-3xl md:text-4xl font-black bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-500 bg-clip-text text-transparent">
            BingWatch
          </h1>
        </div>
        <div className="hidden md:block">
          <p className="text-sm text-gray-400 font-medium">Your Gateway to Endless Anime</p>
        </div>
      </div>

      {/* Hero Section */}
      {popularAnime.length > 0 && <HeroSection data={popularAnime} type="anime" />}

      {/* TV Anime */}
      {tvAnime.length > 0 && (
        <section>
          <div className="flex flex-col justify-center">

            <h2 className="text-2xl font-bold">Top TV Anime</h2>
            <Link href="/type/tv" className="self-end">
              <Button variant="ghost" className="text-sm">View All →</Button>
            </Link>
          </div>

          <CarouselAnimeSlide data={tvAnime} type="anime" />

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

          <CarouselAnimeSlide data={moviesAnime} type="anime" />

          <Separator className="mt-8" />
        </section>
      )}


      <LazySection
        title="Upcoming Anime"
        url="https://api.jikan.moe/v4/top/anime?filter=upcoming&page=1&limit=10&sfw=1"
        type="anime"
      />
      <Separator className="mt-8" />

      <LazySection
        title="Specials"
        url="https://api.jikan.moe/v4/top/anime?type=special&limit=10&page=1&sfw=1"
        type="anime"
      />
      

      <Separator className="mt-8" />
      {/* Footer */}
      <Footer />
    </div>
  );
}
