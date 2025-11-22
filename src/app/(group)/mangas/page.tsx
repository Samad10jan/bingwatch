import HeroSectionManga from "@/app/components/manga-components/manga-hero-section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { genres } from "@/lib/constants";
import { fetchSafe } from "@/lib/helper";
import Link from "next/link";
import LazySection from "../../components/commons/lazysection";
import CarouselMangaSlide from "../../components/commons/slider";

export default async function HomeManga() {
  const [popularManga, topManga] = await Promise.all([
    fetchSafe(
      "https://api.jikan.moe/v4/top/manga?type=manga&limit=10&page=1&order_by=popularity&sfw=1"
    ),
    fetchSafe(
      "https://api.jikan.moe/v4/top/manga?type=manga&limit=10&page=1&order_by=score"
    ),
    
  ]);

  return (
    <div className="*:my-5 *:text-center flex flex-col">
      <div className="container mx-auto m-0 p-0 flex items-center md:justify-between justify-center">
        <div className="relative">
          <div className="absolute inset-0 dark:bg-gradient-to-r from-emerald-500 to-indigo-500 blur-xl opacity-50" />
          <h1 className="relative text-3xl md:text-4xl font-black bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-500 bg-clip-text text-transparent">
            BingeRead
          </h1>
        </div>

        <div className="hidden md:block">
          <p className="text-sm text-gray-400 font-medium">
            Your Gateway to Endless Manga
          </p>
        </div>
      </div>

      {/* Hero Section */}
    {popularManga.length > 0 && (
        <HeroSectionManga data={popularManga}/>
    )}

      {/* Top Manga */}
      {topManga.length > 0 && (
        <section>
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-bold">Top Manga</h2>
            <Link href="/mangas/type/manga" className="self-end">
              <Button variant="ghost" className="text-sm">
                View All →
              </Button>
            </Link>
          </div>

          <CarouselMangaSlide data={topManga} type="manga" />
          <Separator className="mt-8" />
        </section>
      )}

      {/* Browse by Genre */}
      <section>
        <h2 className="text-2xl font-bold mb-4 mx-auto">Browse by Genre</h2>

        <div className="flex w-full flex-wrap gap-2 justify-center max-w-6xl mx-auto">
          {genres.slice(0, 20).map((genre) => (
            <Link key={genre.mal_id} href={`/mangas/genres/${genre.mal_id}`}>
              <Badge
                variant="outline"
                className="p-2 hover:bg-accent focus:bg-accent"
              >
                {genre.name}
              </Badge>
            </Link>
          ))}
        </div>

        <Separator className="mt-8" />
      </section>

      {/* Light Novels */}
       <LazySection
        title="Top Light Novels"
        url="https://api.jikan.moe/v4/top/manga?type=lightnovel&limit=10&page=1&order_by=popularity"
        type="manga"
      />

      <Separator className="mt-8" />

      {/* Completed Manga */}
      <LazySection
        title="Completed Manga"
        url="https://api.jikan.moe/v4/manga?type=manga&status=complete&page=1&limit=10&order_by=popularity"
        type="manga"
      />

      <Separator className="mt-8" />

      {/* Completed Manhwa */}
      <LazySection
        title="Completed Manhwa"
        url="https://api.jikan.moe/v4/manga?type=manhwa&status=complete&limit=10&order_by=popularity"
        type="manga"
      />

      <Separator className="mt-8" />
    </div>
  );
}
