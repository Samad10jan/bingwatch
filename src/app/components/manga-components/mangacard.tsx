import { Card } from "@/shadcncomponents/ui/card";
import MangaInfoDrawer from "./mangainfodrawer";
import { Manga } from "@/lib/type";
import Image from "next/image";
import { Badge } from "@/shadcncomponents/ui/badge";
import { Star } from "lucide-react";

export default function MangaCard({ data }: { data: Manga }) {
  return (
    <MangaInfoDrawer infoData={data}>
      <Card className="relative flex flex-col justify-end items-center w-full aspect-[2/3] rounded-xl overflow-hidden border shadow-lg group cursor-pointer transition-all duration-300 hover:shadow-2xl">
        
        {/* Background Image */}
        <Image
          src={
            data.images?.jpg?.large_image_url ||
            data.images?.jpg?.image_url|| "/OIPM.jpg" ||
            "https://via.placeholder.com/400x600?text=No+Image"
          }
          alt={data.title || "Unknown Title"}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
          loading="lazy"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Overlay */}
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

        {/* Title */}
        <h2 className="text-sm sm:text-base md:text-lg font-bold px-1 text-white -mb-4 sm:mb-2 line-clamp-2 drop-shadow-lg md:opacity-0 md:group-hover:opacity-100 transition-all duration-300">
          {data.title_english || data.title || data.title_japanese || "Unknown Title"}
        </h2>

        {/* Details on hover */}
        <div className="hidden md:block opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 space-y-1">
          <p className="text-xs text-white/90">
            {data.type || "Unknown"} • {data.chapters ?? "?"} chapters • {data.status || "Unknown"}
          </p>

         {data.rank &&  <div className="relative text-yellow-300 px-4 py-2 w-fit mx-auto text-md font-extrabold rounded-lg shadow-lg overflow-hidden">
            Ranked #{data.rank||"?"}
          </div>}

          {data.published?.string && (
            <p className="text-xs text-white/80">{data.published.string}</p>
          )}
        </div>
      </Card>
    </MangaInfoDrawer>
  );
}
