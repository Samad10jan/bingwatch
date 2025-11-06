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
import { Star, Calendar, Tv } from "lucide-react";
import Image from "next/image";
import InfoDrawer from "./info-drawer";

export default function CarouselAnime({ PopularData }: { PopularData: Anime[] }) {
    return (
        <Carousel className="w-full max-w-[95%] mx-auto">
            <CarouselContent>
                {PopularData.map((data, index) => (
                    <CarouselItem key={index} className="py-2">
                        <div className="relative w-full aspect-[16/9] lg:aspect-[30/9] rounded-xl overflow-hidden border border-white/10">

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
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />


                            {/* Content */}
                            <div className="absolute inset-0 flex flex-col justify-end items-center p-4 lg:p-10">
                                <div className="max-w-3xl space-y-3 lg:space-y-5">
                                    <h2 className="text-lg sm:text-2xl lg:text-4xl font-extrabold bg-gradient-to-r from-white via-yellow-200 to-pink-300 bg-clip-text text-transparent">
                                        {data.title_english || data.title || "Unknown Title"}
                                    </h2>

                                    {/* Info Badges */}
                                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                                        {data.score && (
                                            <div className="flex items-center gap-1 px-2.5 py-1 bg-yellow-400/25 backdrop-blur-md rounded-full border border-yellow-300/30">
                                                <Star className="w-3.5 h-3.5" fill="gold" color="gold" />
                                                <span className="text-yellow-300 font-semibold text-xs sm:text-sm">
                                                    {data.score.toFixed(1)}
                                                </span>
                                            </div>
                                        )}

                                        {data.status && (
                                            <Badge className="px-2.5 py-1 text-[11px] sm:text-xs font-medium bg-emerald-500/30 text-emerald-200 border border-emerald-400/40 backdrop-blur-md">
                                                {data.status}
                                            </Badge>
                                        )}

                                        {data.year && (
                                            <Badge className="px-2.5 py-1 text-[11px] sm:text-xs font-medium bg-white/15 text-white border border-white/30 backdrop-blur-md flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                {data.year}
                                            </Badge>
                                        )}

                                        {data.type && (
                                            <Badge className="px-2.5 py-1 text-[11px] sm:text-xs font-medium bg-blue-500/25 text-blue-200 border border-blue-400/40 backdrop-blur-md flex items-center gap-1">
                                                <Tv className="w-3 h-3" />
                                                {data.type}
                                            </Badge>
                                        )}
                                    </div>

                                    {/* Info Drawer */}
                                    <InfoDrawer infoData={data} />
                                </div>
                            </div>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>

            <CarouselPrevious className=" hidden lg:flex xl:flex" />
            <CarouselNext className=" hidden lg:flex xl:flex" />
        </Carousel>
    );
}
