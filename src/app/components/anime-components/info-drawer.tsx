"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Image from "next/image";
import {
  X,
  Calendar,
  Film,
  Star,
  Clock,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

export default function InfoDrawerUnified({
  data,
  children,
}: {
  data: any; // Anime or Manga
  children: ReactNode;
}) {
  const path = usePathname();

  // Detect if Manga or Anime
  const isManga = path === "/mangas"

  return (
    <Drawer>
      <DrawerTrigger>{children}</DrawerTrigger>

      <DrawerContent className="max-h-[90vh]">
        <DrawerHeader className="relative border-b pb-4">
          <DrawerTitle className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent pr-8">
            {data.title || "Unknown Title"}
          </DrawerTitle>

          <DrawerClose className="absolute right-4 top-4 rounded-full p-2 hover:bg-accent transition-colors">
            <X className="h-5 w-5" />
          </DrawerClose>
        </DrawerHeader>

        {/* MAIN CONTENT */}
        <div className="relative flex flex-col md:flex-row gap-6 p-6 overflow-y-auto max-h-[calc(95vh-160px)]">
          {/* LEFT IMAGE */}
          <div className="w-full md:w-80 flex-shrink-0">
            <div className="relative w-full aspect-[6/4] md:aspect-[3/6] rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10">
              <Image
                src={
                  data.images?.jpg?.large_image_url ||
                  data.images?.jpg?.image_url ||
                  "https://via.placeholder.com/400x600?text=No+Image"
                }
                alt={data.title}
                fill
                className="object-cover transition-transform duration-500"
              />

              {data.score && (
                <div className="absolute top-4 right-4 bg-gradient-to-br from-yellow-400 to-orange-500 text-black px-3 py-1.5 rounded-full font-bold text-sm shadow-lg flex items-center gap-1">
                  <Star className="h-4 w-4 fill-current" />
                  {data.score}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT DETAILS */}
          <div className="flex-1 space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

              {/* TYPE */}
              {data.type && (
                <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-lg p-4 border border-purple-500/20">
                  <div className="flex items-center gap-2 text-purple-400 mb-1">
                    <Film className="h-4 w-4" />
                    <span className="text-xs font-medium uppercase">Type</span>
                  </div>
                  <p className="font-semibold text-lg">{data.type}</p>
                </div>
              )}

              {/* Anime: episodes | Manga: chapters */}
              {isManga
                ? data.chapters && (
                  <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-lg p-4 border border-blue-500/20">
                    <div className="flex items-center gap-2 text-blue-400 mb-1">
                      <TrendingUp className="h-4 w-4" />
                      <span className="text-xs font-medium uppercase">
                        Chapters
                      </span>
                    </div>
                    <p className="font-semibold text-lg">{data.chapters}</p>
                  </div>
                )
                : data.episodes && (
                  <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-lg p-4 border border-blue-500/20">
                    <div className="flex items-center gap-2 text-blue-400 mb-1">
                      <TrendingUp className="h-4 w-4" />
                      <span className="text-xs font-medium uppercase">
                        Episodes
                      </span>
                    </div>
                    <p className="font-semibold text-lg">{data.episodes}</p>
                  </div>
                )}

              {/* Manga: volumes */}
              {isManga && data.volumes && (
                <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 rounded-lg p-4 border border-orange-500/20">
                  <div className="flex items-center gap-2 text-orange-400 mb-1">
                    <Clock className="h-4 w-4" />
                    <span className="text-xs font-medium uppercase">
                      Volumes
                    </span>
                  </div>
                  <p className="font-semibold text-lg">{data.volumes}</p>
                </div>
              )}

              {/* Status */}
              {data.status && (
                <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 rounded-lg p-4 border border-emerald-500/20">
                  <div className="flex items-center gap-2 text-emerald-400 mb-1">
                    <Clock className="h-4 w-4" />
                    <span className="text-xs font-medium uppercase">Status</span>
                  </div>
                  <p className="font-semibold text-lg">{data.status}</p>
                </div>
              )}
            </div>

            {/* Extra Details */}
            <div className="space-y-4">
              {/* YEAR or PUBLISHED */}
              {(data.year || data.published?.string) && (
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-cyan-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {isManga ? "Published" : "Year"}
                    </p>
                    <p className="font-medium capitalize">
                      {isManga ? data.published?.string : data.year}
                    </p>
                  </div>
                </div>
              )}

              {/* Anime: Studios; Manga: Authors */}
              {isManga
                ? data.authors?.length > 0 && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Authors
                    </p>
                    <p className="font-medium text-sm">
                      {data.authors.map((a: any) => a.name).join(", ")}
                    </p>
                  </div>
                )
                : data.studios?.length > 0 && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Studios
                    </p>
                    <p className="font-medium text-sm">
                      {data.studios.map((s: any) => s.name).join(", ")}
                    </p>
                  </div>
                )}

              {/* Genres */}
              {data.genres && data.genres.length > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground mb-3">Genres</p>
                  <div className="flex flex-wrap gap-2">
                    {data.genres.slice(0, 6).map((genre: any, index: number) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="px-3 py-1 bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-pink-500/30 hover:from-pink-500/30 hover:to-purple-500/30 transition-all"
                      >
                        {genre.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Synopsis */}
              {data.synopsis && (
                <div className="pt-4 border-t border-white/10">
                  <p className="text-sm text-muted-foreground mb-2 -ml-1">
                    | Synopsis
                  </p>
                  <p className="text-sm leading-relaxed text-zinc-300 line-clamp-3">
                    {data.synopsis}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>


        <DrawerFooter className="border-t flex justify-center items-center">
          <Button
            variant={"secondary"}
            className="rounded-full ring-2 md:text-3xl text-lg font-bold text-center w-fit p-5 ring-emerald-400 hover:scale-110 transition-all"
          >
            <Link
              href={
                isManga
                  ? `/mangas/manga/${data.mal_id}`
                  : `/anime/${data.mal_id}`
              }
            >
              MORE DETAILS
            </Link>
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
