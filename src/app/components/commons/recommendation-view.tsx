"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/shadcncomponents/ui/card";
import { Spinner } from "@/shadcncomponents/ui/spinner";
import type { AnimeRecommendationItem } from "@/lib/type";

export default function Recommendations({ id, type }: { id: string, type: "anime" | "manga"; }) {
  const [recs, setRecs] = useState<AnimeRecommendationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const url = type == "anime" ? `https://api.jikan.moe/v4/anime/${id}/recommendations` : `https://api.jikan.moe/v4/manga/${id}/recommendations`
  
  useEffect(() => {
    const fetchRecs = async () => {
      try {
        // Get recommendations
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch recommendations");
        const json = await res.json();

        const allRecs = json.data || [];
        const topRecs = allRecs.slice(0, 6); 

  
        setRecs(topRecs as AnimeRecommendationItem[]);
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
      <div className="flex flex-wrap ">
        {recs.map((item) => (
          <Card
            key={item.entry.mal_id}
            className="relative p-0 w-36 cursor-pointer overflow-hidden m-2 border-b-2 hover:border-b-amber-300 active:shadow-amber-300  transition-all"
          >
            <Link href={type == "anime" ? `/anime/${item.entry.mal_id}` : `/mangas/manga/${item.entry.mal_id}`}>
              <CardContent className="relative w-full h-50 transition-transform duration-300">
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
              <div className="line-clamp-2 pt-4 mx-auto transition-transform duration-300 px-5">
                {item.entry.title}
              </div>
            </Link>
          </Card>
        ))}
      </div>
    </section>
  );
}
