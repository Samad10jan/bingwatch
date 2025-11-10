"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import type { AnimeRecommendationItem } from "@/lib/type";
import { Spinner } from "@/components/ui/spinner";

export default function Recommendations({ id }: { id: string }) {
  const [recs, setRecs] = useState<AnimeRecommendationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecs = async () => {
      try {
        const res = await fetch(`https://api.jikan.moe/v4/anime/${id}/recommendations`);

        if (!res.ok) throw new Error("Failed to fetch recommendations");

        const json = await res.json();
        setRecs(json.data || []);

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
    return <p className="text-center text-muted-foreground py-6">No recommendations available.</p>;
  }

  return (
    <section className="mt-5">
      <h2 className="text-2xl font-semibold mb-4">Recommendations</h2>
      <div className="flex  flex-wrap gap-5">
        {recs.slice(0,5).map((item) => (
          <Card key={item.entry.mal_id} className=" relative group p-0 w-36 md:w-46 mx-1 cursor-pointer overflow-hidden ">
            <Link href={`/anime/${item.entry.mal_id}`}>
              <CardContent className="relative w-full h-60 group-hover:scale-110 transition-transform duration-300  ">
                <div className="">
                  <Image
                    src={item.entry.images.webp.large_image_url || item.entry.images.jpg.large_image_url}
                    alt={item.entry.title}
                    fill
                    loading="lazy"
                    className="object-cover "
                  />
            
                </div>
 
              </CardContent>
            </Link>
             <div className=" line-clamp-2 mx-auto group-hover:scale-110 transition-transform duration-300  !px-5">{item.entry.title}</div>
          </Card>
        ))}
      </div>
    </section>
  );
}
