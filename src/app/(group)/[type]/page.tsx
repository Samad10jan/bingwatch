"use client";

import LoadingSkeleton from "@/app/components/laodingskleton";
import AnimeCard from "@/app/components/moviecard";
import { PaginationComponent } from "@/app/components/pagenation";
import { Anime, JSONDATA } from "@/lib/type";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function H() {
  const { type } = useParams(); // ✅ /[type]
  const [data, setData] = useState<Anime[]>([]);
  const [page, setPage] = useState<number>(1);
  const [jsonData, setJsonData] = useState<JSONDATA | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handlePage = (num: number) => {
    if (num < 1 || num === page) return; // no to do anything for same page click 
    setPage(num);
  };

  useEffect(() => {
    if (!type) return;

    async function getData() {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.jikan.moe/v4/top/anime?type=${type}&page=${page}`
        );
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
  }, [type, page]); // ✅ refetch on page change

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 capitalize">{type} Anime</h1>

      {loading ? (
        <LoadingSkeleton />
      ) : (
        <div className="flex justify-center flex-wrap gap-5">
          {data.map((anime) => (
            <AnimeCard key={anime.mal_id} data={anime} />
          ))}
        </div>
      )}

      {jsonData && (
        <div className="mt-6 flex justify-center">
          <PaginationComponent
            handlePage={handlePage}
            currentPage={jsonData.pagination.current_page}
            hasNextPage={jsonData.pagination.has_next_page}
            lastPage={jsonData.pagination.last_visible_page}
          />
        </div>
      )}
    </div>
  );
}
