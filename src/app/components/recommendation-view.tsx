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
      <div className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {recs.slice(0,5).map((item) => (
          <Card key={item.entry.mal_id} className=" relative  group p-0 w-46  cursor-pointer overflow-hidden ">
            <Link href={`/anime/${item.entry.mal_id}`}>
              <CardContent className="relative w-full h-60 p-0 ">
                <div className=" absolute w-full h-60 group-hover:scale-110 transition-transform duration-300">
                  <Image
                    src={item.entry.images.webp.large_image_url || item.entry.images.jpg.large_image_url}
                    alt={item.entry.title}
                    fill
                    loading="lazy"
                    className="object-cover "
                  />
            
                </div>

                <div className=" absolute inset-0 w-full h-full bg-gradient-to-t lg:group-hover:bg-gradient-to-t from-black to-transparent  transition-all duration-300"/>
              
                  <h3 className=" flex  justify-end items-center flex-col absolute bottom-0   w-full h-full  line-clamp-2 md:opacity-0 text-white font-extrabold text-lg md: group-hover:opacity-100 p-5 transition-all duration-300">{item.entry.title}</h3>
                
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </section>
  );
}
