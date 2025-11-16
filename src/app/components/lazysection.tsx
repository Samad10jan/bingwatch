"use client";

import { useEffect, useRef, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import CarouselAnimeSlide from "./slider";
import { LazySectionProps } from "@/lib/type";
import LoadingSkeleton from "./laodingskleton";



export default function LazySection({ title, url, type }: LazySectionProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [animeList, setAnimeList] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            async ([entry]) => {
                if (entry.isIntersecting && !hasLoaded) {
                    observer.disconnect();
                    setLoading(true);

                    try {
                        const res = await fetch(url);
                        const data = await res.json();
                        setAnimeList(data.data);
                        setHasLoaded(true);
                    } catch (err) {
                        console.error("Failed to fetch anime:", err);
                    } finally {
                        setLoading(false);
                    }
                }
            },
            { threshold: 0.2 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [hasLoaded, url]);

    return (
        <div ref={ref} >

            {loading && (
                <LoadingSkeleton cardNumber={4}/>
            )}

            {!loading && animeList.length > 0 && (

                <section key={type}>
                    <div className="flex flex-col justify-center">

                        <h2 className="text-2xl font-bold">{title}</h2>
                        <Link href={`/type/${type}`} className="self-end">
                            <Button variant="ghost" className="text-sm">View All →</Button>
                        </Link>
                    </div>

                    <CarouselAnimeSlide data={animeList} type={type as string} />

                  
                </section>

            )}

        </div>
    );
}
