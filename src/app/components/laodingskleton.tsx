import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingSkeleton() {
    return (
        <div className="flex mx-auto justify-center gap-4 flex-wrap">
            {
               [...Array(5)].map((s,i) => {
                    return (
                        <div key={i} className="flex flex-col space-y-3 ">
                            <Skeleton className="w-40 h-56 md:w-60 md:h-96 rounded-xl" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 md:w-60 w-40" />
                                <Skeleton className="h-4 md:w-60 w-40" />
                            </div>
                        </div>
                    )

                })
            }
        </div>
    )
}