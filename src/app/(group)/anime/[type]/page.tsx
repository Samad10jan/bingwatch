"use client";

import LoadingSkeleton from "@/app/components/laodingskleton";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function H() {
  const { type } = useParams(); // ✅ Gets /[type] param from URL
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    async function getData() {
      if (!type) return;
      try {
        const res = await fetch(
          `https://api.jikan.moe/v4/top/anime?type=${type}&limit=5&filter=airing&page=1`
        );
        const json = await res.json();
        setData(json.data || []);
      } catch (err) {
        console.error("Error fetching anime:", err);
      }
    }

    getData();
  }, [type]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 capitalize">{type} Anime</h1>
      {data.length === 0 ? (
        <LoadingSkeleton/>
      ) : (
        <ul className="space-y-2">
          {data.map((anime) => (
            <li key={anime.mal_id} className="border p-3 rounded-lg">
              {anime.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
