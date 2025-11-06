"use client";

import LoadingSkeleton from "@/app/components/laodingskleton";
import AnimeCard from "@/app/components/moviecard";
import { PaginationComponent } from "@/app/components/pagenation";
import { Anime, JSONDATA } from "@/lib/type";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Genre() {

    const { genre } = useParams();


    const search = useSearchParams();
    const page = Number(search.get("page")) || 1;

    const [data, setData] = useState<Anime[]>([]);
    const [jsonData, setJsonData] = useState<JSONDATA | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const url = `https://api.jikan.moe/v4/anime?genre=${genre}&page=${page}&sfw=1`

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
            <h1 className="text-2xl font-bold mb-4 capitalize">{genre} Anime</h1>

            {loading ? (
                <LoadingSkeleton />
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
