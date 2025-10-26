import { Card } from "@/components/ui/card";
import InfoDrawer from "./info-drawer";
import { AnimeData } from "@/lib/type";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

export default function AnimeCard({ data }: { data: AnimeData }) {
    return (
        <Card className="relative w-30 h-50 md:w-60 md:h-96 rounded-xl overflow-hidden border shadow-lg group cursor-pointer">
            {/* Background Image */}
            <Image
                src={data?.picture || data?.thumbnail || "https://th.bing.com/th/id/OIP.xvGnjTuyImLj_PlDDZ3U7wHaKx?w=207&h=301&c=7&r=0&o=7&dpr=1.2&pid=1.7&rm=3"}
                alt={data.title || "Unknown Title"}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
            />

            {/* Score Badge - Always Visible */}
            {data.score?.arithmeticMean && (
                <div className="absolute top-3 right-3 ring-2 ring-amber-300 font-bold  rounded-full text-xs shadow-lg z-10">
                    <Badge >
                        <Star color="yellow"/> {data.score.arithmeticMean.toFixed(1)}

                    </Badge>
                </div>
            )}

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                {/* Title */}
                <h2 className="text-lg font-bold text-white mb-2 line-clamp-2">
                    {data.title || "Unknown Title"}
                </h2>

                {/* Info Line */}
                <p className="text-xs text-white/90 mb-3">
                    {data.type || "Unknown"} • {data.episodes ?? "?"} eps • {data.status || "Unknown"}
                </p>

                {/* Season Info */}
                {data.animeSeason?.season && (
                    <p className="text-xs text-white/80 mb-3">
                        {data.animeSeason.season} {data.animeSeason.year || ""}
                    </p>
                )}

                {/* More Details Button */}
                <InfoDrawer infoData={data} />
            </div>
        </Card>
    );
}