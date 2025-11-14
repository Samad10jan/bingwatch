"use client";

import LoadingSkeleton from "@/app/components/laodingskleton";
import AnimeCard from "@/app/components/moviecard";
import { PaginationComponent } from "@/app/components/pagenation";
import { Anime, JSONDATA } from "@/lib/type";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function H() {

  const { type } = useParams();
  const router= useRouter()
  if (!["tv", "movie", "ova", "upcoming","special"].includes((type as string).toLowerCase())) {
   router.replace("/404");
  }

  const search = useSearchParams();
  const page = Number(search.get("page")) || 1; 

  const [data, setData] = useState<Anime[]>([]);
  const [jsonData, setJsonData] = useState<JSONDATA | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const url =
    type !== "upcoming"
      ? `https://api.jikan.moe/v4/top/anime?type=${type}&page=${page}&sfw=1`
      : `https://api.jikan.moe/v4/top/anime?filter=${type}&page=${page}&sfw=1`;

  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        const res = await fetch(url,{next:{revalidate:3600}});
        const jsonData = await res.json();
        setJsonData(jsonData);
        setData(jsonData.data || []);
      } catch (err) {
        console.error("Error fetching anime:", err);
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, [url]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 capitalize">{type} Anime</h1>

      {loading ? (
        <LoadingSkeleton cardNumber={5} />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 mt-3">
          {data.map((anime, i) => (
            <AnimeCard key={i} data={anime} />
          ))}
        </div>
      )}

      {jsonData && (
        <div className="mt-6 flex justify-center">
          <PaginationComponent
            currentPage={jsonData.pagination.current_page}
            hasNextPage={jsonData.pagination.has_next_page}
            lastPage={jsonData.pagination.last_visible_page}
          />
        </div>
      )}
    </div>
  );
}
