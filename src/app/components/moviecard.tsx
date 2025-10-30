import { Card } from "@/components/ui/card";
import InfoDrawer from "./info-drawer";
import { Anime } from "@/lib/type";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

export default function AnimeCard({ data }: { data: Anime }) {
  return (
    <Card className="relative flex flex-col justify-end items-center w-36 h-56 md:w-60 md:h-96 rounded-xl overflow-hidden border shadow-lg group cursor-pointer">
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
        className="object-cover transition-transform duration-300 group-hover:scale-110"
      />

      {/* --- Score Badge --- */}
      {data.score && (
        <div className="absolute top-3 right-3 font-bold rounded-full shadow-lg z-10">
          <Badge
          key={1}
            variant="secondary"
            className="flex items-center gap-1 bg-yellow-400/30 text-yellow-100 border border-yellow-400/40"
          >
            <Star color="gold" fill="gold" size={16} />
            {data.score}
          </Badge>
        </div>
      )}

      {/* --- Hover Overlay --- */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        {/* Title */}
        <h2 className="text-lg font-bold text-white mb-2 line-clamp-2">
          {data.title || "Unknown Title"}
        </h2>

        {/* Info Line */}
        <p className="text-xs text-white/90 mb-2">
          {data.type || "Unknown"} • {data.episodes ?? "?"} eps •{" "}
          {data.status || "Unknown"}
        </p>

        {/* Year + Duration */}
        <p className="text-xs text-white/80 mb-2">
          {data.year ? `${data.year}` : "N/A"}{" "}
          {data.duration ? `• ${data.duration} min` : ""}
        </p>

        {/* Season Info */}
        {data.animeSeason?.season && (
          <p className="text-xs text-white/80 mb-3 capitalize">
            {data.animeSeason.season} {data.animeSeason.year || ""}
          </p>
        )}

        {/* Info Drawer (Desktop) */}
        <div className="hidden md:flex">
          <InfoDrawer infoData={data} />
        </div>
      </div>

      {/* Info Drawer (Mobile) */}
      <div className="md:hidden flex mb-2 z-10">
        <InfoDrawer infoData={data} />
      </div>
    </Card>
  );
}
