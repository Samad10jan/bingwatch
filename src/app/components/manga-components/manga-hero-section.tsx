import { Badge } from "@/shadcncomponents/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, } from "@/shadcncomponents/ui/carousel";
import { Manga } from "@/lib/type";
import { Book, Calendar, Sparkles, Star } from "lucide-react";
import Image from "next/image";
import MangaInfoDrawer from "./mangainfodrawer";

export default function HeroSectionManga({ data }: { data: Manga[] }) {
    return (
        <Carousel className="w-full max-w-[95%] lg:max-w-[90%] mx-auto">

            {/* Section badge */}
            <Badge className="ml-5 mt-2 absolute flex items-center gap-2 text-yellow-300 z-10 bg-black/70 backdrop-blur-md rounded-full">
                <Sparkles className="xl:!size-5 size-3" />
                <span className="text-xs xl:text-xl font-semibold tracking-wider uppercase">
                    Featured Manga
                </span>
            </Badge>

            <CarouselContent className="px-5">
                {data.map((item, index) => {
                    const chapters = item.chapters;

                    return (
                        <CarouselItem
                            key={index}
                            className="py-2 sm:py-4 cursor-pointer relative w-full aspect-[16/9] sm:aspect-[21/9] lg:aspect-[2.5/1] mx-4 rounded-xl overflow-hidden border border-white/10"
                        >
                            <MangaInfoDrawer infoData={item} >
                                {/* Background Image */}
                                <Image
                                    src={
                                        item.images?.jpg?.large_image_url ||
                                        item.images?.jpg?.image_url ||
                                        "https://via.placeholder.com/1920x1080?text=No+Image"
                                    }
                                    alt={item.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />

                                {/* Title + details */}
                                <div className="absolute inset-0 flex flex-col justify-end items-center p-4 sm:p-6 lg:p-10 mx-auto">
                                    <div className="max-w-4xl space-y-3 lg:space-y-5 text-center">
                                        <h2 className="text-white text-xl sm:text-3xl lg:text-4xl font-bold drop-shadow-xl">
                                            {item.title_english || item.title || "Unknown Title"}
                                        </h2>

                                        {/* Badges */}
                                        <div className="flex flex-wrap items-center sm:justify-center gap-2 sm:gap-2.5">
                                            {item.score && (
                                                <Badge className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-400/30 rounded-full border border-yellow-300/40 shadow-lg">
                                                    <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="gold" />
                                                    {item.score.toFixed(1)}
                                                </Badge>
                                            )}

                                            <Badge className="px-3 py-1.5 bg-blue-500/30 text-blue-200 border border-blue-400/40 rounded-full flex items-center gap-1.5">
                                                <Book className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> {item.type}
                                            </Badge>

                                            {chapters && (
                                                <Badge className="px-3 py-1.5 bg-purple-500/30 text-purple-200 border border-purple-400/40 rounded-full">
                                                    {chapters} Chapters
                                                </Badge>
                                            )}

                                            {item.published?.prop?.from?.year && (
                                                <Badge className="px-3 py-1.5 bg-white/20 text-white border border-white/30 rounded-full flex items-center gap-1.5">
                                                    <Calendar className="w-3 h-3" />
                                                    {item.published.prop.from.year}
                                                </Badge>
                                            )}
                                        </div>

                                        {/* Genres */}
                                        {item.genres?.length > 0 && (
                                            <div className="hidden lg:flex flex-wrap gap-2 justify-center">
                                                {item.genres.slice(0, 5).map((genre, i) => (
                                                    <span
                                                        key={i}
                                                        className="px-3 py-1 text-xs font-medium bg-white/10 text-white/90 rounded-full border border-white/20"
                                                    >
                                                        {genre.name}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </MangaInfoDrawer>
                        </CarouselItem>
                    );
                })}
            </CarouselContent>

            <CarouselPrevious className="absolute top-1/2  h-[40%]  -translate-y-1/2 -left-0 p-5" />
            <CarouselNext className="absolute top-1/2 -translate-y-1/2   h-[40%]  -right-0 p-5" />
        </Carousel>
    );
}
