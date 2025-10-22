import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
{/* herosection 
        design : 
        1. poster whole cover div , right side black blur and right side clear photo like liner gradiant
        2. on right blur side we will list its tittle , rating, and more details button

*/}
export default function CarouselAime({ PopularData }: { PopularData: any }) {
    return (
        <Carousel className="w-full max-w-xs">
            <CarouselContent>
                {PopularData.map((data: any) => (
                    <CarouselItem>
                        <div>

                            {/* Here big herosection having poatser  */}
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}