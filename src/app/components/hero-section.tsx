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
import { Star } from "lucide-react";
import Image from "next/image";
import InfoDrawer from "./info-drawer";
import { Card } from "@/components/ui/card";

export default function CarouselAnime({ PopularData }: { PopularData: Anime[] }) {
    return (
        <Carousel className="backdrop-blur-3xl max-w-[90vw]">
            <CarouselContent className="mx-auto w-full h-full pr-7 ">
                {PopularData.map((data, index) => (
                    <CarouselItem
                        key={index}
                        className="flex justify-center items-center mx-auto py-5"
                    >
                        <Card className=" relative w-full max-w-8xl mx-auto overflow-hidden rounded-3xl  border border-white/10 ">
                            <div className=" flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10 min-h-[250px] md:min-h-[350px] mx-5">

                                {/* --- Left Section (Text + Info) --- */}
                                <div className="flex-1 space-y-3 sm:space-y-4 md:space-y-6 text-center md:text-left z-10 order-2 md:order-1">
                                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-yellow-300 to-pink-500 bg-clip-text text-transparent drop-shadow-lg leading-snug">
                                        {data.title || "Unknown Title"}
                                    </h2>

                                    {/* Meta Info */}
                                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-3">
                                        {data.status && (
                                            <Badge className="px-2 py-1 text-xs sm:text-sm font-medium bg-green-500/30  border border-green-400/20">
                                                {data.status}
                                            </Badge>
                                        )}

                                        {data.score && (
                                            <div className="flex items-center gap-1 px-2 sm:px-3 py-1 bg-yellow-400/20 rounded-full border border-yellow-300/30 text-xs sm:text-sm">
                                                <Star color="gold" fill="gold" size={16} className="" />
                                                <span className="text-yellow-300 font-semibold">
                                                    {data.score}
                                                </span>
                                            </div>
                                        )}

                                        {data.year && (
                                            <Badge
                                                variant="outline"
                                                className="text-xs sm:text-sm border-yellow-300/30 text-yellow-200"
                                            >
                                                {data.year}
                                            </Badge>
                                        )}
                                    </div>

                                    {/* Synopsis */}
                                    {data.synopsis && (
                                        <p className="text-xs sm:text-sm md:text-2xl !line-clamp-3 mx-auto md:mx-0 hidden sm:flex">
                                            {data.synopsis}
                                        </p>
                                    )}

                                    {/* Info Drawer Button */}
                                    <div className="pt-2">
                                        <InfoDrawer infoData={data} />
                                    </div>
                                </div>

                                {/* --- Right Section (Image) --- */}
                                <div className="relative w-[250px] md:w-[400px]  h-[180px] md:h-[400px] rounded-2xl overflow-hidden z-10 order-1 md:order-2">
                                    <Image
                                        src={
                                            data.images?.jpg?.large_image_url ||
                                            data.images?.jpg?.image_url ||
                                            data.picture ||
                                            data.thumbnail ||
                                            "https://via.placeholder.com/800x600?text=No+Image"
                                        }
                                        alt={data.title || "Anime"}
                                        fill
                                        className="object-cover rounded-2xl"
                                        priority
                                    />
                                </div>

                            </div>

                        </Card>

                    </CarouselItem>
                ))}

            </CarouselContent>

            {/* Navigation Buttons */}
            <CarouselPrevious className=" hidden lg:flex xl:flex" />
            <CarouselNext className=" hidden lg:flex xl:flex" />
        </Carousel>
    );
}