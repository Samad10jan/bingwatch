"use client";

import { Badge } from "@/components/ui/badge";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Anime } from "@/lib/type";
import { Star, Calendar, Tv, Play } from "lucide-react";
import Image from "next/image";
import InfoDrawer from "./info-drawer";

export default function CarouselAnime({ PopularData }: { PopularData: Anime[] }) {
    return (
        <Carousel className="w-full max-w-[95%] lg:max-w-[90%] mx-auto">
            <CarouselContent>
                {PopularData.map((data, index) => (

                    <CarouselItem key={index} className="py-2 sm:py-4 cursor-pointer">

                        <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] lg:aspect-[2.5/1] rounded-xl lg:rounded-2xl overflow-hidden border border-white/10 !shadow-none group">
                            <InfoDrawer infoData={data} >
                                {/* Background Image */}
                                <Image
                                    src={
                                        data.images?.jpg?.large_image_url ||
                                        data.images?.jpg?.image_url ||
                                        data?.picture ||
                                        data?.thumbnail ||
                                        "https://via.placeholder.com/1920x1080?text=No+Image"
                                    }
                                    alt={data.title || "Anime"}
                                    fill
                                    className="object-cover object-center"
                                    priority
                                    sizes="95vw"
                                />

                                {/* Multi-layer Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent w-full" />


                                {/* Content */}
                                <div className="absolute inset-0 flex flex-col justify-end items-center p-4 sm:p-6 lg:p-10">
                                    <div className="max-w-4xl space-y-2 sm:space-y-3 lg:space-y-5">

                                        {/* Title */}
                                        <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-4xl font-extrabold bg-gradient-to-r from-white via-yellow-100 to-pink-200 bg-clip-text text-transparent drop-shadow-2xl leading-tight">
                                            {data.title_english || data.title || "Unknown Title"}
                                        </h2>

                                        {/* Info Badges */}
                                        <div className="flex flex-wrap items-center sm:justify-center gap-2 sm:gap-2.5">

                                            {/* Score Badge */}
                                            {data.score && (
                                                <div className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 bg-yellow-400/30 backdrop-blur-md rounded-full border border-yellow-300/40 shadow-lg transition-all hover:bg-yellow-400/40 hover:scale-105">
                                                    <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="gold" color="gold" />
                                                    <span className="text-yellow-300 font-bold text-xs sm:text-sm lg:text-base">
                                                        {data.score.toFixed(1)}
                                                    </span>
                                                </div>
                                            )}

                                            {/* Status Badge */}
                                            {data.status && (
                                                <Badge className=" md:flex hidden px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold bg-emerald-500/30 text-emerald-200 border border-emerald-400/40 backdrop-blur-md shadow-lg transition-all hover:bg-emerald-500/40 hover:scale-105">
                                                    {data.status}
                                                </Badge>
                                            )}

                                            {/* Year Badge */}
                                            {data.year && (
                                                <Badge className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold bg-white/20 text-white border border-white/30 backdrop-blur-md shadow-lg flex items-center gap-1.5 transition-all hover:bg-white/30 hover:scale-105">
                                                    <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                                                    {data.year}
                                                </Badge>
                                            )}

                                            {/* Type Badge */}
                                            {data.type && (
                                                <Badge className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold bg-blue-500/30 text-blue-200 border border-blue-400/40 backdrop-blur-md shadow-lg flex items-center gap-1.5 transition-all hover:bg-blue-500/40 hover:scale-105">
                                                    <Tv className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                                                    {data.type}
                                                </Badge>
                                            )}

                                            {/* Episodes Badge - Hidden on small mobile */}
                                            {data.episodes && (
                                                <Badge className="hidden sm:flex px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold bg-purple-500/30 text-purple-200 border border-purple-400/40 backdrop-blur-md shadow-lg items-center gap-1.5 transition-all hover:bg-purple-500/40 hover:scale-105">
                                                    <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                                                    {data.episodes} {data.episodes === 1 ? "Episode" : "Episodes"}
                                                </Badge>
                                            )}
                                        </div>


                                        {/* Genres - Hidden on mobile, shown on desktop */}
                                        {data.genres && data.genres.length > 0 && (
                                            <div className="hidden lg:flex flex-wrap gap-2 justify-center">
                                                {data.genres.slice(0, 5).map((genre, i) => (
                                                    <span
                                                        key={i}
                                                        className="px-3 py-1 text-xs font-medium bg-white/10 backdrop-blur-sm text-white/90 rounded-full border border-white/20 transition-all hover:bg-white/20"
                                                    >
                                                        {genre.name}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        {/* Info Drawer Button */}
                                        <div className="pt-1 sm:pt-2">

                                        </div>
                                    </div>
                                </div>
                            </InfoDrawer>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>

            {/* Navigation Buttons */}
            <CarouselPrevious className="hidden lg:flex -left-6 xl:-left-12 hover:scale-110 transition-transform" />
            <CarouselNext className="2xl:hidden  flex -right-6 xl:-right-12 hover:scale-110 transition-transform" />
        </Carousel>
    );
}