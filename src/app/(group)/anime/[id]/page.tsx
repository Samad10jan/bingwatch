"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Calendar, Tv, Clock, Film } from "lucide-react";
import type { Anime } from "@/lib/type";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Recommendations from "@/app/components/commons/recommendation-view";
import Link from "next/link";
import { genres } from "@/lib/constants";
import Platforms from "@/app/components/anime-components/streamingplatforms";

export default function AnimeDetailPage() {
    const { id } = useParams();
    const router = useRouter();

    const [anime, setAnime] = useState<Anime | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        async function fetchAnime() {
            setLoading(true);
            try {
                const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`, { next: { revalidate: 30 } });

                if (!res.ok) {
                    router.replace("/404"); // redirect to custom 404 page
                    return;
                }
                



                const json = await res.json();
                const genres = json.data.genres?.map((g: any) => g.name.toLowerCase()) || [];
                const isNSFW = genres.includes("hentai") || genres.includes("ecchi");

                if (isNSFW) {
                    router.replace("/404"); // redirect to custom 404 page on nfw
                    return;
                }

                setAnime(json.data || null);


            } catch (err) {
                console.error("Error fetching anime:", err);
                router.replace("/404");
            } finally {
                setLoading(false);
            }
        }

        fetchAnime();
    }, [id, router]);

    if (loading) return <div className="p-6 text-center text-xl">Thinking...</div>;

    if (!anime) return <div className="p-6 text-center text-xl"></div>

    return (
        <div className="min-h-screen">

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 relative ">
                {/* Hero Section */}
                <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                    {/* Poster */}
                    <div className="flex-shrink-0 mx-auto md:mx-0">
                        <div className="relative group">
                            <Image
                                src={
                                    anime.images?.webp?.large_image_url ||
                                    anime.images?.jpg?.large_image_url ||
                                    "/placeholder.jpg"
                                }
                                alt={anime.title}
                                width={280}
                                height={400}
                                className="rounded-2xl shadow-2xl object-cover border-4 border-background transition-transform duration-300 group-hover:scale-105"
                                priority
                            />
                            {anime.score && (
                                <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-950 rounded-full px-3 py-2 font-bold shadow-lg flex items-center gap-1">
                                    <Star className="w-5 h-5" fill="currentColor" />
                                    <span className="text-lg">{anime.score}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Anime Info */}
                    <div className="flex-1 flex flex-col gap-4">
                        {/* Title Section */}
                        <div>
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                                {anime.title}
                            </h1>
                            {anime.title_japanese && (
                                <p className="text-lg md:text-xl text-muted-foreground mt-2 font-medium">
                                    {anime.title_japanese}
                                </p>
                            )}
                        </div>

                        {/* Quick Stats */}
                        <div className="flex flex-wrap items-center gap-2">
                            {anime.year && (
                                <Badge variant="outline" className="gap-1 px-3 py-1">
                                    <Calendar className="w-4 h-4" />
                                    {anime.year}
                                </Badge>
                            )}
                            {anime.type && (
                                <Link href={`/type/${anime.type}`} >
                                    <Badge variant="secondary" className="!flex !items-center !justify-center">
                                        <Tv className="-mt-0.5" />
                                        {anime.type}
                                    </Badge>
                                </Link>
                            )}
                            {anime.episodes && (
                                <Badge variant="secondary" >
                                    <Film className="w-4 h-4" />
                                    {anime.episodes} Episodes
                                </Badge>
                            )}
                            {anime.duration && (
                                <Badge variant="secondary" className="gap-1 px-3 py-1">
                                    <Clock className="w-4 h-4" />
                                    {anime.duration}
                                </Badge>
                            )}
                            {anime.status && (
                                <Badge
                                    variant={anime.status === "Finished Airing" ? "default" : "destructive"}
                                    className="px-3 py-1"
                                >
                                    {anime.status}
                                </Badge>
                            )}
                        </div>

                        {/* Genres */}
                        {anime.genres && anime.genres.length > 0 && (
                            <div>
                                <h3 className="text-sm font-semibold text-muted-foreground mb-2">
                                    GENRES
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {anime.genres.map((genre) => (
                                        <Link href={`/manga/genres/${genres.find(g => g.name === genre.name)?.mal_id}`} key={genre.name}>
                                            <Badge

                                                className="bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20 px-3 py-1"
                                            >
                                                {genre.name}
                                            </Badge>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Studios */}
                        {anime.studios && anime.studios.length > 0 && (
                            <div>
                                <h3 className="text-sm font-semibold text-muted-foreground mb-1">
                                    STUDIO
                                </h3>
                                <p className="text-lg font-medium">
                                    {anime.studios.map((s) => s.name).join(", ")}
                                </p>
                            </div>
                        )}

                        {/* Season Info */}
                        {anime?.animeSeason?.season && anime.year && (
                            <div>
                                <h3 className="text-sm font-semibold text-muted-foreground mb-1">
                                    SEASON
                                </h3>
                                <p className="text-lg font-medium capitalize">
                                    {anime.animeSeason?.season} {anime.year}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Synopsis Section */}
                <Card className="mt-8 border-2">
                    <CardContent className="p-6 md:p-8">
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <div className="w-1 h-6 bg-primary rounded-full" />
                            Synopsis
                        </h2>
                        <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
                            {anime.synopsis || "No synopsis available."}
                        </p>
                    </CardContent>
                </Card>

                {/* Background Section */}
                {anime.background && (
                    <Card className="mt-6 border-2 mb-8">
                        <CardContent className="p-6 md:p-8">
                            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                <div className="w-1 h-6 bg-primary rounded-full" />
                                Background
                            </h2>
                            <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
                                {anime.background}
                            </p>
                        </CardContent>
                    </Card>
                )}
                <Recommendations id={id as string} type="anime" />
                <Platforms id={id as string} />
            </div>



        </div>
    );
}