import { Skeleton } from "@/shadcncomponents/ui/skeleton";

export default function LoadingSkeleton({ cardNumber }: { cardNumber: number }) {
    return (
        <div>
            <Skeleton className="h-10 md:w-60 w-70 mx-auto mb-8" />
            <div className="flex justify-center mx-auto gap-4 flex-wrap">
                {[...Array(cardNumber)].map((_, i) => (
                    <div key={i} className="flex flex-col space-y-3">
                        <Skeleton className="aspect-[2/3] rounded-xl" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 md:w-60 w-40" />
                            <Skeleton className="h-4 md:w-60 w-40" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
