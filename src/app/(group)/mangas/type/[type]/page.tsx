"use client";

import LoadingSkeleton from "@/app/components/commons/laodingskleton";
import AnimeCard from "@/app/components/anime-components/moviecard";
import { PaginationComponent } from "@/app/components/commons/pagenation";
import { Anime, JSONDATA, Manga } from "@/lib/type";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import MangaCard from "@/app/components/manga-components/mangacard";

export default function H() {

  const { type } = useParams();
  const router = useRouter()
  if (!["manhwa","lightnovel","oneshot","manhua","novel","manga"].includes((type as string).toLowerCase())) {
    router.replace("/404");
  }

  const search = useSearchParams();
  const page = Number(search.get("page")) || 1;

  const [data, setData] = useState<Manga[]>([]);
  const [jsonData, setJsonData] = useState<JSONDATA | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const url =`https://api.jikan.moe/v4/top/manga?type=${type}&page=${page}&sfw=1`
 
  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        const res = await fetch(url, { next: { revalidate: 3600 } });
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
      <h1 className="text-2xl font-bold mb-4 capitalize">{type}</h1>

      {loading ? (
        <LoadingSkeleton cardNumber={5} />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 mt-3">
          {data.map((anime, i) => (
            <MangaCard key={i} data={anime} />
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
