"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Calendar, Film } from "lucide-react";
import type { Manga } from "@/lib/type";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Recommendations from "@/app/components/commons/recommendation-view";
import Link from "next/link";

export default function MangaDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [manga, setManga] = useState<Manga | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function fetchManga() {
      setLoading(true);
      try {
        const res = await fetch(`https://api.jikan.moe/v4/manga/${id}`, { next: { revalidate: 30 } });

        if (!res.ok) {
          router.replace("/404"); // redirect to custom 404 page
          return;
        }

        const json = await res.json();

        const genres = json.data.genres?.map((g: any) => g.name.toLowerCase()) || [];
        const isNSFW = genres.includes("hentai") || genres.includes("ecchi");
        if (isNSFW) {
          router.replace("/404"); // block NSFW content
          return;
        }

        setManga(json.data || null);
      } catch (err) {
        console.error("Error fetching manga:", err);
        router.replace("/404");
      } finally {
        setLoading(false);
      }
    }

    fetchManga();
  }, [id, router]);

  if (loading) return <div className="p-6 text-center text-xl">Thinking...</div>;
  if (!manga) return <div className="p-6 text-center text-xl">Manga not found.</div>;

  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 relative">
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          {/* Poster */}
          <div className="flex-shrink-0 mx-auto md:mx-0">
            <div className="relative group">
              <Image
                src={manga.images?.webp?.large_image_url || manga.images?.jpg?.large_image_url || "/placeholder.jpg"}
                alt={manga.title}
                width={280}
                height={400}
                className="rounded-2xl shadow-2xl object-cover border-4 border-background transition-transform duration-300 group-hover:scale-105"
                priority
              />
              {manga.score && (
                <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-950 rounded-full px-3 py-2 font-bold shadow-lg flex items-center gap-1">
                  <Star className="w-5 h-5" fill="currentColor" />
                  <span className="text-lg">{manga.score}</span>
                </div>
              )}
            </div>
          </div>

          {/* Manga Info */}
          <div className="flex-1 flex flex-col gap-4">
            {/* Title Section */}
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">{manga.title}</h1>
              {manga.title_japanese && (
                <p className="text-lg md:text-xl text-muted-foreground mt-2 font-medium">{manga.title_japanese}</p>
              )}
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap items-center gap-2">
              {manga.published?.from && (
                <Badge variant="outline" className="gap-1 px-3 py-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(manga.published.from).getFullYear()}
                </Badge>
              )}
              {manga.type && (
                <Badge variant="secondary" className="!flex !items-center !justify-center">
                  {manga.type}
                </Badge>
              )}
              {manga.chapters && (
                <Badge variant="secondary" className="gap-1 px-3 py-1">
                  <Film className="w-4 h-4" />
                  {manga.chapters} Chapters
                </Badge>
              )}
              {manga.volumes && (
                <Badge variant="secondary" className="gap-1 px-3 py-1">
                  Volumes: {manga.volumes}
                </Badge>
              )}
              {manga.status && (
                <Badge variant={manga.status === "Finished" ? "default" : "destructive"} className="px-3 py-1">
                  {manga.status}
                </Badge>
              )}
            </div>

            {/* Genres */}
            {manga.genres && manga.genres.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-2">GENRES</h3>
                <div className="flex flex-wrap gap-2">
                  {manga.genres.map((genre) => (
                    <Link href={`/genres/${genre.mal_id}`} key={genre.mal_id}>
                      <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20 px-3 py-1">
                        {genre.name}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Authors */}
            {manga.authors && manga.authors.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-1">AUTHOR(S)</h3>
                <p className="text-lg font-medium">{manga.authors.map((a) => a.name).join(", ")}</p>
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
              {manga.synopsis || "No synopsis available."}
            </p>
          </CardContent>
        </Card>

        {/* Background Section */}
        {manga.background && (
          <Card className="mt-6 border-2 mb-8">
            <CardContent className="p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <div className="w-1 h-6 bg-primary rounded-full" />
                Background
              </h2>
              <p className="text-base md:text-lg leading-relaxed text-muted-foreground">{manga.background}</p>
            </CardContent>
          </Card>
        )}

        <Recommendations id={id as string} type="manga" />
      </div>
    </div>
  );
}
