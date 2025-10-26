import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import InfoDrawer from "./info-drawer";
import { AnimeData } from "@/lib/type";
import Image from "next/image";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function CarouselAnime({ PopularData }: { PopularData: AnimeData[] }) {
    return (
        <div className="h-[30%] w-full bg-transparent">
            <Carousel className="w-full max-w-7xl mx-auto">
                <CarouselContent className="mx-auto w-full ">
                    {PopularData.map((data, index) => (
                        <CarouselItem key={index} className="px-3 md:px-4 skew-4">
                            <div className="relative overflow-hidden rounded-3xl  transition-all duration-300 ">

                                {/* Main Content Container */}
                                <div className="relative flex flex-col md:flex-row items-center justify-between gap-8 p-6 md:p-12 min-h-[400px]">

                                    {/* Left Section (Text + Info) */}
                                    <div className="flex-1 space-y-6 text-center md:text-left z-10">
                                        <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-snug drop-shadow-[0_4px_10px_rgba(0,0,0,0.7)]">
                                            {data.title || "Unknown Title"}
                                        </h2>

                                        {/* Meta Info */}
                                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                                            {data.status && (
                                                <Badge className=" px-3 py-1 text-sm font-medium shadow-md">
                                                    {data.status}
                                                </Badge>
                                            )}

                                            {data.score?.arithmeticMean && (
                                                <Badge className="flex items-center gap-2 bg-amber-400/90 px-3 py-1 rounded-full text-gray-900 font-semibold shadow-md">
                                                    <Star className="w-4 h-4 text-yellow-600" fill="yellow" />
                                                    <span>{data.score.arithmeticMean.toFixed(1)}</span>
                                                </Badge>
                                            )}
                                        </div>

                                        {/* Button / Drawer */}
                                        <div className="pt-4">
                                            <InfoDrawer infoData={data} />
                                        </div>
                                    </div>

                                    {/* Right Section (Image) */}
                                    <div className="relative w-48 h-72 md:w-56 md:h-80 flex-shrink-0 z-10">
                                        {/* Soft Glow Behind Image */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500 via-pink-500 to-rose-500 rounded-xl blur-2xl opacity-60 animate-pulse" />

                                        <Image
                                            src={
                                                data.picture ||
                                                data.thumbnail ||
                                                "https://via.placeholder.com/1200x600?text=No+Image"
                                            }
                                            alt={data.title || "Anime"}
                                            fill
                                            priority={index === 0}
                                            className="object-cover rounded-xl shadow-2xl border border-white/10 relative"
                                        />
                                    </div>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                {/* Navigation Buttons */}
                <CarouselPrevious className="bg-gradient-to-r from-fuchsia-500 to-purple-500 text-white hover:opacity-90 shadow-lg transition-all duration-300" />
                <CarouselNext className="bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white hover:opacity-90 shadow-lg transition-all duration-300" />
            </Carousel>
        </div>



    );
}