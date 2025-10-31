import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import type { Anime } from "@/lib/type";
import { notFound } from "next/navigation";

export default async function AnimeDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const param = await params;
    const id = param.id
    let anime:Anime
    try {
        const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`);

        if (!res.ok) {
            return null;
        }

        const json = await res.json();
        anime= json.data;
    } catch (error) {
        console.error("Error fetching anime:", error);
        return null;
    }

    if (!anime) {
        notFound(); // Shows Next.js 404 page
    }

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            {/* Hero Section */}
            <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                    <Image
                        src={
                            anime.images?.webp?.large_image_url ||
                            anime.images?.jpg?.large_image_url ||
                            "/placeholder.jpg"
                        }
                        alt={anime.title}
                        width={320}
                        height={460}
                        className="rounded-2xl shadow-md object-cover"
                        priority
                    />
                </div>

                {/* Anime Info */}
                <div className="flex flex-col justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">{anime.title}</h1>
                        {anime.title_japanese && (
                            <p className=" italic">{anime.title_japanese}</p>
                        )}

                        <div className="flex items-center gap-2 mt-3">
                            {anime.score && (
                                <div className="flex items-center gap-1">
                                    <Star className="text-yellow-400 w-5 h-5" />
                                    <span className="font-medium">{anime.score}</span>
                                </div>
                            )}
                            {anime.year && <Badge variant="outline">{anime.year}</Badge>}
                            {anime.type && <Badge variant="secondary">{anime.type}</Badge>}
                            {anime.status && <Badge variant="secondary">{anime.status}</Badge>}
                        </div>

                        {/* Studios */}
                        {anime.studios && (
                            <p className="mt-3 ">
                                <span className="font-semibold">Studio:</span>{" "}
                                {anime.studios.map((s) => s.name).join(", ")}
                            </p>
                        )}

                        {/* Genres */}
                        {anime?.genres && (
                            <div className="flex flex-wrap gap-2 mt-3">
                                {anime.genres.map((genre) => (
                                    <Badge key={genre.name} className="bg-blue-100 text-blue-800">
                                        {genre.name}
                                    </Badge>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Synopsis Section */}
            <Card className="mt-8">
                <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-3">Synopsis</h2>
                    <p className=" leading-relaxed">
                        {anime.synopsis || "No synopsis available."}
                    </p>
                </CardContent>
            </Card>

            {/* Background Section */}
            {anime.background && (
                <Card className="mt-6">
                    <CardContent className="p-6">
                        <h2 className="text-xl font-semibold mb-3">Background</h2>
                        <p className="">{anime.background}</p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}

