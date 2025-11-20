
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Anime, CarouselSlideProps, Manga } from "@/lib/type";
import { Calendar, Sparkles, Star, Tv } from "lucide-react";
import Image from "next/image";
import InfoDrawer from "../anime-components/info-drawer";

export default function HeroSection({ data, type }: CarouselSlideProps) {

    // to avoid hydration mismatch by waiting for client

    const isManga = type === "manga"

    const renderBadges = (item: any, chaptersOrEpisodes?: number) => (
        <div className="flex flex-wrap items-center sm:justify-center gap-2 sm:gap-2.5">
            {item.score && (
                <Badge className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-400/30 rounded-full border border-yellow-300/40 shadow-lg hover:bg-yellow-400/40 hover:scale-105">
                    <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="gold" color="gold" />
                    {item.score.toFixed(1)}
                </Badge>
            )}
            {item.status && (
                <Badge className="hidden md:flex px-3 py-1.5 bg-emerald-500/30 text-emerald-200 border border-emerald-400/40 rounded-full shadow-lg hover:bg-emerald-500/40 hover:scale-105">
                    {item.status}
                </Badge>
            )}
            {item?.year && (
                <Badge className="px-3 py-1.5 bg-white/20 text-white border border-white/30 rounded-full flex items-center gap-1.5 hover:bg-white/30 hover:scale-105">
                    <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> {item.year}
                </Badge>
            )}
            {item?.type && (
                <Badge className="px-3 py-1.5 bg-blue-500/30 text-blue-200 border border-blue-400/40 rounded-full flex items-center gap-1.5 hover:bg-blue-500/40 hover:scale-105">
                    <Tv className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> {item.type}
                </Badge>
            )}
            {chaptersOrEpisodes && (
                <Badge className="lg:hidden px-3 py-1.5 bg-purple-500/30 text-purple-200 border border-purple-400/40 rounded-full flex items-center gap-1.5 hover:bg-purple-500/40 hover:scale-105">
                    {chaptersOrEpisodes} {isManga ? "Chapters" : chaptersOrEpisodes === 1 ? "Episode" : "Episodes"}
                </Badge>
            )}
        </div>
    );

    const renderGenres = (item: any) =>
        item.genres?.length > 0 && (
            <div className="hidden lg:flex flex-wrap gap-2 justify-center">
                {item.genres.slice(0, 5).map((genre: any, i: number) => (
                    <span
                        key={i}
                        className="px-3 py-1 text-xs font-medium bg-white/10 text-white/90 rounded-full border border-white/20 hover:bg-white/20"
                    >
                        {genre.name}
                    </span>
                ))}
            </div>
        );

    return (
        <Carousel className="w-full max-w-[95%] lg:max-w-[90%] mx-auto">
            <Badge className="ml-5 mt-2 absolute flex items-center gap-2 text-yellow-300 z-10 bg-black/70 backdrop-blur-md rounded-full">
                <Sparkles className="xl:!size-5 size-3" />
                <span className="text-xs xl:text-xl font-semibold tracking-wider uppercase">
                    Featured Section
                </span>
            </Badge>

            <CarouselContent className="px-5">
                {data.map((item, index) => {
                    const chaptersOrEpisodes = isManga ? (item as Manga).chapters : (item as Anime).episodes;

                    return (
                        <CarouselItem
                            key={index}
                            className="py-2 sm:py-4 cursor-pointer relative w-full aspect-[16/9] sm:aspect-[21/9] lg:aspect-[2.5/1] mx-4 rounded-xl overflow-hidden border border-white/10 !shadow-none group"
                        >
                            <InfoDrawer data={item as Anime | Manga}>
                                <Image
                                    src={
                                        item.images?.jpg?.large_image_url ||
                                        item.images?.jpg?.image_url ||
                                        item.images?.webp?.large_image_url ||
                                        item.images?.webp?.image_url ||

                                        "https://via.placeholder.com/1920x1080?text=No+Image"
                                    }

                                    alt={(item as Anime)?.title || "Anime"}
                                    fill
                                    className="object-cover"
                                    priority
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />

                                <div className="absolute inset-0 flex flex-col justify-end items-center p-4 sm:p-6 lg:p-10 mx-auto">
                                    <div className="max-w-4xl space-y-3 lg:space-y-5 text-center">
                                        <h2 className="...">
                                            {item.title_english ||
                                                item.title ||
                                                item.title_japanese ||
                                               
                                                "Unknown Title"}
                                        </h2>

                                        {renderBadges(item, chaptersOrEpisodes as number)}
                                        {renderGenres(item)}
                                    </div>
                                </div>
                            </InfoDrawer>
                        </CarouselItem>
                    );
                })}
            </CarouselContent>

            <CarouselPrevious className="absolute top-1/2 -translate-y-1/2 -left-0 p-5 flex hover:scale-110 transition-transform" />
            <CarouselNext className="absolute top-1/2 -translate-y-1/2 -right-0 p-5 flex hover:scale-110 transition-transform" />
        </Carousel>
    );
}
