import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import InfoDrawer from "./info-drawer";
import { AnimeData } from "@/lib/type";
import Image from "next/image";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function CarouselAnime({ PopularData }: { PopularData: AnimeData[] }) {
    return (
        <div className="w-full px-4 py-8 bg-white/20">
            <Carousel className="w-full max-w-7xl mx-auto">
                <CarouselContent>
                    {PopularData.map((data, index) => (
                        <CarouselItem key={index} className="flex justify-between">
                            <div className="">
                                <div className="">
                                  
                                    <h2 className=" text-3xl font-bold ">
                                        {data.title || "Unknown Title"}
                                    </h2>

                                    {/* Meta Info */}
                                    <div className="">
                                       
                                        {data.status && (
                                            <Badge className="">
                                                {data.status}
                                            </Badge>
                                        )}
                                    </div>

                                    {/* Score */}
                                    {data.score?.arithmeticMean && (
                                        <div className="">
                                            <div className="">
                                                <Star className="" />
                                                {data.score.arithmeticMean.toFixed(1)}
                                            </div>
                                        </div>
                                    )}

                                    {/* Action Button */}
                                    <div className="pt-2">
                                        <InfoDrawer infoData={data} />
                                    </div>
                                </div>
                            </div>
                            {/* Background Image */}
                            <div className="">
                                <Image
                                    src={data.picture || data.thumbnail || "https://via.placeholder.com/1200x600?text=No+Image"}
                                    alt={data.title || "Anime"}
                                    width={200}
                                    height={300}
                                    priority={index === 0}
                                    className=""
                                />
                               
                            </div>

                            


                        </CarouselItem>
                    ))}
                </CarouselContent>

                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
            </Carousel>
        </div>
    );
}