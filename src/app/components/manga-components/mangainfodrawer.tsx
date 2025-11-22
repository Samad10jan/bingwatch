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
import { Manga } from "@/lib/type"; // use Manga type
import Image from "next/image";
import { X, Calendar, Star, Clock, TrendingUp, Film } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

export default function MangaInfoDrawer({
  infoData,
  children,
}: {
  infoData: Manga;
  children: ReactNode;
}) {
  return (
    <Drawer>
      <DrawerTrigger>{children}</DrawerTrigger>

      <DrawerContent className="max-h-[90vh]">
        <DrawerHeader className="relative border-b pb-4">
          <DrawerTitle className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent pr-8">
            {infoData.title || "Unknown Title"}
          </DrawerTitle>
          <DrawerClose className="absolute right-4 top-4 rounded-full p-2 hover:bg-accent transition-colors">
            <X className="h-5 w-5" />
          </DrawerClose>
        </DrawerHeader>

        <div className="relative flex flex-col md:flex-row gap-6 p-6 overflow-y-auto max-h-[calc(95vh-160px)]">
          {/* --- Left: Manga Image --- */}
          <div className="w-full md:w-80 flex-shrink-0">
            <div className="relative w-full aspect-[6/4] md:aspect-[3/6] rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10">
              <Image
                src={
                  infoData.images?.jpg?.large_image_url ||
                  infoData.images?.jpg?.image_url|| "/OIPM.jpg"
                }
                alt={infoData.title || "Unknown Title"}
                fill
                priority
                className="object-cover transition-transform duration-500"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
              />
              {infoData.score && (
                <div className="absolute top-4 right-4 bg-gradient-to-br from-yellow-400 to-orange-500 text-black px-3 py-1.5 rounded-full font-bold text-sm shadow-lg flex items-center gap-1">
                  <Star className="h-4 w-4 fill-current" />
                  {infoData.score}
                </div>
              )}
            </div>
          </div>

          {/* --- Right: Manga Details --- */}
          <div className="flex-1 space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {infoData.type && (
                <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-lg p-4 border border-purple-500/20">
                  <div className="flex items-center gap-2 text-purple-400 mb-1">
                    <Film className="h-4 w-4" />
                    <span className="text-xs font-medium uppercase">Type</span>
                  </div>
                  <p className="font-semibold text-lg">{infoData.type}</p>
                </div>
              )}

              {infoData.chapters && (
                <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-lg p-4 border border-blue-500/20">
                  <div className="flex items-center gap-2 text-blue-400 mb-1">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-xs font-medium uppercase">Chapters</span>
                  </div>
                  <p className="font-semibold text-lg">{infoData.chapters}</p>
                </div>
              )}

              {infoData.volumes && (
                <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 rounded-lg p-4 border border-orange-500/20">
                  <div className="flex items-center gap-2 text-orange-400 mb-1">
                    <Clock className="h-4 w-4" />
                    <span className="text-xs font-medium uppercase">Volumes</span>
                  </div>
                  <p className="font-semibold text-lg">{infoData.volumes}</p>
                </div>
              )}

              {infoData.status && (
                <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 rounded-lg p-4 border border-emerald-500/20">
                  <div className="flex items-center gap-2 text-emerald-400 mb-1">
                    <Clock className="h-4 w-4" />
                    <span className="text-xs font-medium uppercase">Status</span>
                  </div>
                  <p className="font-semibold text-lg">{infoData.status}</p>
                </div>
              )}
            </div>

            {/* --- Additional Details --- */}
            <div className="space-y-4">
              {/* Published */}
              {infoData.published?.string && (
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-cyan-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Published</p>
                    <p className="font-medium capitalize">{infoData.published.string}</p>
                  </div>
                </div>
              )}

              {/* Authors */}
              {infoData.authors && infoData.authors.length > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Authors</p>
                  <p className="font-medium text-sm">
                    {infoData.authors.map((a) => a.name).join(", ")}
                  </p>
                </div>
              )}

              {/* Genres */}
              {infoData.genres && infoData.genres.length > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground mb-3">Genres</p>
                  <div className="flex flex-wrap gap-2">
                    {infoData.genres.slice(0, 6).map((genre, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="px-3 py-1 bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-pink-500/30 hover:from-pink-500/30 hover:to-purple-500/30 transition-all duration-300"
                      >
                        {genre.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Synopsis */}
              {infoData.synopsis && (
                <div className="pt-4 border-t border-white/10">
                  <p className="text-sm text-muted-foreground mb-2 -ml-1">| Synopsis</p>
                  <p className="text-sm leading-relaxed  line-clamp-4">
                    {infoData.synopsis}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <DrawerFooter className="border-t flex justify-center items-center">
          <Button
            variant={"secondary"}
            className="rounded-full ring-2 md:text-3xl text-lg font-bold text-center w-fit p-5 ring-emerald-400 hover:ring-3 hover:scale-110 hover:bg-accent active:ring-3 active:scale-110 active:bg-accent transition-all"
          >
            <Link href={`/mangas/manga/${infoData.mal_id}`}>MORE DETAILS</Link>
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
