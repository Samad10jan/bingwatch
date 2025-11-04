'use client';

import { useEffect, useState } from 'react';
import HeroSection from '../components/hero-section';
import CarouselAnimeSlide from '../components/slider';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

export default function HomeClient() {
  const [loading, setLoading] = useState(true);
  const [animeData, setAnimeData] = useState({
    popularAnime: [],
    tvAnime: [],
    moviesAnime: [],
    upcomingAnime: [],
    ovaAnime: [],
  });

  useEffect(() => {
    const fetchSafe = async (url: string) => {
      try {
        const res = await fetch(url);
        if (!res.ok) return [];
        const json = await res.json();
        return json.data || [];
      } catch (err) {
        console.error('Fetch error:', url, err);
        return [];
      }
    };

    const fetchAllAnime = async () => {
      const urls = {
        popularAnime: 'https://api.jikan.moe/v4/top/anime?limit=10&filter=airing&page=1&sfw=1',
        tvAnime: 'https://api.jikan.moe/v4/top/anime?type=tv&page=1&sfw=1',
        moviesAnime: 'https://api.jikan.moe/v4/top/anime?type=movie&page=1&sfw=1',
        upcomingAnime: 'https://api.jikan.moe/v4/top/anime?filter=upcoming&page=1&sfw=1',
        ovaAnime: 'https://api.jikan.moe/v4/top/anime?type=ova&page=1&sfw=1',
      };

      const [popularAnime, tvAnime, moviesAnime, upcomingAnime, ovaAnime] = await Promise.all([
        fetchSafe(urls.popularAnime),
        fetchSafe(urls.tvAnime),
        fetchSafe(urls.moviesAnime),
        fetchSafe(urls.upcomingAnime),
        fetchSafe(urls.ovaAnime),
      ]);

      setAnimeData({ popularAnime, tvAnime, moviesAnime, upcomingAnime, ovaAnime });
      setLoading(false);
    };

    fetchAllAnime();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold">Loading anime data...</p>
      </div>
    );
  }

  return (
    <div className="*:my-10 *:text-center">
      {animeData.popularAnime.length >= 5 && (
        <HeroSection PopularData={animeData.popularAnime} />
      )}

      {animeData.tvAnime.length >= 5 && (
        <section>
          <h2 className="text-2xl font-bold">Top TV Anime</h2>
          <ScrollArea className="w-full">
            <CarouselAnimeSlide data={animeData.tvAnime} type="tv" />
          </ScrollArea>
          <Separator className="my-8" />
        </section>
      )}

      {animeData.moviesAnime.length >= 5 && (
        <section>
          <h2 className="text-2xl font-bold mb-4">Top Movies</h2>
          <ScrollArea className="w-full">
            <CarouselAnimeSlide data={animeData.moviesAnime} type="movie" />
          </ScrollArea>
          <Separator className="my-8" />
        </section>
      )}

      {animeData.upcomingAnime.length >= 5 && (
        <section>
          <h2 className="text-2xl font-bold mb-4">Upcoming Anime</h2>
          <ScrollArea className="w-full">
            <CarouselAnimeSlide data={animeData.upcomingAnime} type="upcoming" />
          </ScrollArea>
          <Separator className="my-8" />
        </section>
      )}

      {animeData.ovaAnime.length >= 5 && (
        <section>
          <h2 className="text-2xl font-bold mb-4">OVA & Specials</h2>
          <ScrollArea className="w-full">
            <CarouselAnimeSlide data={animeData.ovaAnime} type="ova" />
          </ScrollArea>
        </section>
      )}
    </div>
  );
}