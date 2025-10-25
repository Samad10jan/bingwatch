import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer";
import { AnimeData } from "@/lib/type";
import Image from "next/image";
import { X, Calendar, Film, Star, Clock, TrendingUp } from "lucide-react";

export default function InfoDrawer({ infoData }: { infoData: AnimeData }) {
  return (
    <Drawer>
      <DrawerTrigger className="relative group overflow-hidden ring-2 ring-emerald-400 hover:ring-emerald-500 transition-all duration-300 rounded-full px-2 py-2 text-sm font-medium hover:shadow-lg hover:shadow-emerald-400/50 hover:scale-105">
        <span className=" text-white">More Details</span>
        {/* <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/0 via-emerald-400/20 to-emerald-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div> */}
      </DrawerTrigger>

      <DrawerContent className="max-h-[95vh]">
        <DrawerHeader className="relative border-b pb-4">
          <DrawerTitle className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent pr-8">
            {infoData.title || "Unknown Title"}
          </DrawerTitle>
          <DrawerClose className="absolute right-4 top-4 rounded-full p-2 hover:bg-accent transition-colors">
            <X className="h-5 w-5" />
          </DrawerClose>
        </DrawerHeader>

        <div className="relative flex flex-col md:flex-row gap-6 p-6 overflow-y-auto max-h-[calc(95vh-180px)]">
          {/* Left Image Section */}
          <div className="w-full md:w-80 flex-shrink-0">
            <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10">
              <Image
                src={infoData.picture || infoData.thumbnail || "https://via.placeholder.com/300x400?text=No+Image"}
                alt={infoData.title || "Unknown Title"}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
              {infoData.score?.arithmeticMean && (
                <div className="absolute top-4 right-4 bg-gradient-to-br from-yellow-400 to-orange-500 text-black px-3 py-1.5 rounded-full font-bold text-sm shadow-lg flex items-center gap-1">
                  <Star className="h-4 w-4 fill-current" />
                  {infoData.score.arithmeticMean.toFixed(1)}
                </div>
              )}
            </div>
          </div>

          {/* Right Details Section */}
          <div className="flex-1 space-y-6">
            {/* Quick Stats Grid */}
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
              
              {infoData.episodes && (
                <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-lg p-4 border border-blue-500/20">
                  <div className="flex items-center gap-2 text-blue-400 mb-1">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-xs font-medium uppercase">Episodes</span>
                  </div>
                  <p className="font-semibold text-lg">{infoData.episodes}</p>
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

            {/* Additional Information */}
            <div className="space-y-4">
              {infoData.animeSeason?.season && (
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-cyan-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Season</p>
                    <p className="font-medium">
                      {infoData.animeSeason.season} {infoData.animeSeason.year || ""}
                    </p>
                  </div>
                </div>
              )}

              {infoData.duration?.value && (
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-orange-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="font-medium">
                      {infoData.duration.value} {infoData.duration.unit || "Seconds"}
                    </p>
                  </div>
                </div>
              )}

              {infoData.studios && infoData.studios.length > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Studios</p>
                  <p className="font-medium">{infoData.studios.join(", ")}</p>
                </div>
              )}

              {infoData.producers && infoData.producers.length > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Producers</p>
                  <p className="font-medium text-sm">{infoData.producers.join(", ")}</p>
                </div>
              )}

              {/* Genres */}
              {infoData.tags && infoData.tags.length > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground mb-3">Genres</p>
                  <div className="flex flex-wrap gap-2">
                    {infoData.tags.slice(0, 5).map((tag, idx) => (
                      <Badge 
                        key={tag} 
                        variant="secondary"
                        className="px-3 py-1 bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-pink-500/30 hover:from-pink-500/30 hover:to-purple-500/30 transition-all duration-300"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Anime */}
              {infoData.relatedAnime && infoData.relatedAnime.length > 0 && (
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground mb-3">Related Anime</p>
                  <div className="space-y-2">
                    {infoData.relatedAnime.slice(0, 3).map((link, idx) => (
                      <a
                        key={idx}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-sm text-blue-400 hover:text-blue-300 hover:underline transition-colors line-clamp-1"
                      >
                        {link}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <DrawerFooter className="border-t">
          <DrawerClose asChild>
           
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}