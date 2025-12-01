import { Badge } from "@/shadcncomponents/ui/badge";
import Image from "next/image";

export default function Loading() {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen p-4 relative overflow-hidden">
           
            <div className="relative w-full max-w-md aspect-square mb-8 z-10">
                <Image 
                    src="/loading.gif" 
                    fill 
                    alt="Loading animation" 
                    className="object-contain drop-shadow-2xl"
                    priority
                    unoptimized
                />
            </div>

           
            <Badge className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-3 text-lg md:text-xl shadow-2xl animate-pulse z-10">
                <span className="font-bold tracking-wider">待って！</span>
            </Badge>

          
            <p className="text-white/50 text-sm mt-4 z-10 font-light tracking-wide">
                読み込み中...
            </p>
        </div>
    );
}