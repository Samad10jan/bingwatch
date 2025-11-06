import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import HeroSection from "../components/hero-section";
import CarouselAnimeSlide from "../components/slider";
import LazyAnimeSections from "../components/lazyloadcomponents";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { genres } from "@/lib/constants";

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
    fetchSafe(
      "https://api.jikan.moe/v4/top/anime?limit=10&filter=airing&page=1&sfw=1"
    ),
    fetchSafe("https://api.jikan.moe/v4/top/anime?type=tv&limit=10&page=1&sfw=1"),
    fetchSafe(
      "https://api.jikan.moe/v4/top/anime?type=movie&limit=10&page=1&sfw=1"
    ),
  ]);

  // Genre list with mal_id



  return (
    <div className="*:my-5 *:text-center flex flex-col ">
      {/* Hero Section */}
      {popularAnime.length > 0 && <HeroSection PopularData={popularAnime} />}

      {/* TV Anime */}
      {tvAnime.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold">Top TV Anime</h2>
          <ScrollArea>
            <CarouselAnimeSlide data={tvAnime} type="tv" />
          </ScrollArea>
          <Separator className="mt-8" />
        </section>
      )}
      <section>
        <h2 className=" text-2xl font-bold mb-4 mx-auto">Browse by Genre</h2>
        <div className="flex w-full flex-wrap gap-2 justify-center">
          {genres.map((genre, i) => (


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
          <h2 className="text-2xl font-bold mb-4">Top Movies</h2>
          <ScrollArea>
            <CarouselAnimeSlide data={moviesAnime} type="movie" />
          </ScrollArea>
          <Separator className="mt-8" />
        </section>
      )}

      {/* Lazy load other anime sections */}
      <LazyAnimeSections
        sections={[
          {
            title: "Upcoming Anime",
            url: "https://api.jikan.moe/v4/top/anime?filter=upcoming&page=1&limit=10&sfw=1",
            type: "upcoming",
          },
          {
            title: "OVA & Specials",
            url: "https://api.jikan.moe/v4/top/anime?type=ova&page=1&limit=10&sfw=1",
            type: "ova",
          },
          {
            title: "Specials",
            url: "https://api.jikan.moe/v4/top/anime?type=special&limit=10&page=1&sfw=1",
            type: "special",
          },
        ]}
      />

      {/* Browse by Genre */}


      <Separator className="my-8" />

      {/* Footer */}
      <footer className="flex flex-col md:flex-row justify-between items-center py-6 px-4 border-t gap-4">
        <div className="flex gap-4">
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="https://github.com/your-repo">GitHub</Link>
          <Link href="https://jikan.moe/">API Credits to Jikan</Link>
        </div>
        <div className="flex gap-4">
          {/* Socials icons/links */}
        </div>
      </footer>
    </div>
  );
}
