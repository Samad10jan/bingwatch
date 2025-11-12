import { Card } from "@/components/ui/card";
import InfoDrawer from "./info-drawer";
import { Anime } from "@/lib/type";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

export default function AnimeCard({ data }: { data: Anime }) {
  return (
    <InfoDrawer infoData={data} >
      <Card className="relative flex flex-col justify-end items-center w-full aspect-[2/3] rounded-xl overflow-hidden border shadow-lg group cursor-pointer transition-all duration-300 hover:shadow-2xl">
        {/* --- Background Image --- */}
        <Image
          src={
            data.images?.jpg?.large_image_url ||
            data.images?.jpg?.image_url ||
            data.picture ||
            data.thumbnail ||
            "https://via.placeholder.com/400x600?text=No+Image"
          }
          alt={data.title || "Unknown Title"}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
          loading="lazy"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/*Always  Overlay on Mobile) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300" />

        {/*  Score Badge */}
        {data.score && (
          <Badge
            variant="secondary"
            className="absolute top-2 right-2 sm:top-3 sm:right-3 flex items-center gap-1 bg-yellow-400/90 text-yellow-950 border border-yellow-400/40 shadow-lg  font-semibold px-2 py-1"
          >
            <Star className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" />
            <span className="text-xs sm:text-sm">{data.score}</span>
          </Badge>
        )}

        {/* Content Overlay */}


        <h2 className="text-sm sm:text-base md:text-lg font-bold text-white -mb-4 sm:mb-2 line-clamp-2 drop-shadow-lg md:opacity-0 md:group-hover:opacity-100 transition-all duration-300">
          {data.title_english ||data.title||data.title_japanese|| "Unknown Title"}
        </h2>


        <div className="hidden md:block opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 space-y-1">

          {/* Type, Episodes, Status */}
          <p className="text-xs text-white/90">
            {data.type || "Unknown"} • {data.episodes ?? "?"} eps • {data.status || "Unknown"}
          </p>

          {/* Year + Duration */}
          {(data.year || data.duration) && (
            <p className="text-xs text-white/80">
              {data.year || "N/A"}
              {data.duration && ` • ${data.duration}`}
            </p>
          )}

          {/* Season Info */}
          {data.animeSeason?.season && (
            <p className="text-xs text-white/70 capitalize">
              {data.animeSeason.season} {data.animeSeason.year || ""}
            </p>
          )}
        </div>

      

      </Card>
    </InfoDrawer>
  );
}