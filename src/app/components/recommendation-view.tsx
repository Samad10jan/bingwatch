"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import type { AnimeRecommendationItem } from "@/lib/type";

export default function Recommendations({ id }: { id: string }) {
  const [recs, setRecs] = useState<AnimeRecommendationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecs = async () => {
      try {
        // Get recommendations
        const res = await fetch(`https://api.jikan.moe/v4/anime/${id}/recommendations`);
        if (!res.ok) throw new Error("Failed to fetch recommendations");
        const json = await res.json();

        const allRecs = json.data || [];
        const topRecs = allRecs.slice(0, 10); // limit to avoid rate limit

        // check NSFW
        const detailed = await Promise.all(
          topRecs.map(async (rec: AnimeRecommendationItem) => {
            const detailRes = await fetch(`https://api.jikan.moe/v4/anime/${rec.entry.mal_id}`);
            const detailJson = await detailRes.json();
            const anime = detailJson.data;

            const rating = anime?.rating?.toLowerCase() || "";
            const genres = anime?.genres?.map((g: any) => g.name.toLowerCase()) || [];

            const isNSFW =genres.includes("hentai") || genres.includes("ecchi");

            return isNSFW ? null : rec;
          })
        );

        // Step 3: Filter null (NSFW) items
        const safeRecs = detailed.filter((item) => item !== null);
        setRecs(safeRecs as AnimeRecommendationItem[]);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecs();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-6">
        <Spinner />
      </div>
    );
  }

  if (!recs.length) {
    return null;
  }

  return (
    <section className="mt-5 slide-in-from-bottom-50 animate-in duration-300 transition-all">
      <h2 className="text-2xl font-semibold mb-4">Recommendations</h2>
      <div className="flex flex-wrap  ">
        {recs.slice(0, 5).map((item) => (
          <Card
            key={item.entry.mal_id}
            className="relative group p-0 w-26 md:w-46 cursor-pointer overflow-hidden mx-1"
          >
            <Link href={`/anime/${item.entry.mal_id}`}>
              <CardContent className="relative w-full h-50 group-hover:scale-110 transition-transform duration-300">
                <Image
                  src={
                    item.entry.images.webp.large_image_url ||
                    item.entry.images.jpg.large_image_url
                  }
                  alt={item.entry.title}
                  fill
                  loading="lazy"
                  className="object-cover"
                />
              </CardContent>
            </Link>
            <div className="line-clamp-2 mx-auto group-hover:scale-110 group-active:scale-110 transition-transform duration-300 px-5">
              {item.entry.title}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
