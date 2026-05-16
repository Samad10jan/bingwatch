import { getImageUrl } from "@/lib/helper";
import { Anime } from "@/lib/type";
import { Badge } from "@/shadcncomponents/ui/badge";
import { Card } from "@/shadcncomponents/ui/card";
import { Star } from "lucide-react";
import Image from "next/image";
import InfoDrawer from "./info-drawer";

export default function AnimeCard({ data }: { data: Anime }) {
  const imageUrl = getImageUrl(
    data.images?.jpg?.large_image_url,
    data.images?.jpg?.image_url
  );

  const title =
    data.title_english || data.title_japanese || data.title || "Unknown Title";

  return (
    <InfoDrawer data={data}>
      <Card className="relative flex flex-col justify-end items-center w-full aspect-[2/3] rounded-xl overflow-hidden border shadow-lg group cursor-pointer transition-all duration-300 hover:shadow-2xl">
        {/* Image */}
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
          loading="lazy"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300" />

        {/* Score Badge */}
        {data.score && (
          <Badge
            variant="secondary"
            className="absolute top-2 right-2 sm:top-3 sm:right-3 flex items-center gap-1 bg-yellow-400/90 text-yellow-950 border border-yellow-400/40 shadow-lg font-semibold px-2 py-1"
          >
            <Star className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" />
            <span className="text-xs sm:text-sm">{data.score}</span>
          </Badge>
        )}

        {/* Mobile Title */}
        <h2 className="text-sm sm:text-base md:text-lg font-bold px-1 text-white -mb-4 sm:mb-2 line-clamp-2 drop-shadow-lg md:opacity-0 md:group-hover:opacity-100 transition-all duration-300">
          {title}
        </h2>

        {/* Desktop Hover Details */}
        <div className="hidden md:block opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 space-y-1">
          <p className="text-xs text-white/90">
            {data.type || "Unknown"} • {data.episodes ?? "?"} eps • {data.status || "Unknown"}
          </p>

          {(data.year || data.duration) && (
            <p className="text-xs text-white/80">
              {data.year || "N/A"}
              {data.duration && ` • ${data.duration} min`}
            </p>
          )}

          {data.animeSeason?.season && (
            <p className="text-xs text-white/70 capitalize">
              {data.animeSeason.season} {data.animeSeason.year || ""}
            </p>
          )}

          {data.rank && (
            <div className="text-yellow-300 px-4 py-2 w-fit mx-auto text-sm font-extrabold rounded-lg shadow-lg">
              Ranked #{data.rank}
            </div>
          )}
        </div>
      </Card>
    </InfoDrawer>
  );
}