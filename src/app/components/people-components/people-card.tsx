import { formatNumber, getImageUrl } from "@/lib/helper";
import { Person } from "@/lib/type";
import { Card, CardContent } from "@/shadcncomponents/ui/card";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function PeopleCard({ person }: { person: Person }) {
    const imageUrl = getImageUrl(
        person.images?.jpg?.image_url,
        person.images?.jpg?.small_image_url
    );

    return (
        <Link href={`/people/${person.mal_id}`}>
            <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer">
                <div className="relative w-full aspect-[2/3] overflow-hidden bg-muted">
                    {imageUrl !== "/OIP.png" ? (
                        <Image
                            src={imageUrl}
                            alt={person.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                            loading="lazy"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <span className="text-muted-foreground">No Image</span>
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <div className="p-3 w-full">
                            <p className="text-xs text-white/80 flex items-center gap-1">
                                <Heart className="w-3 h-3 fill-red-500 text-red-500" />
                                {formatNumber(person.favorites)} favorites
                            </p>
                        </div>
                    </div>
                </div>

                <CardContent className="p-3">
                    <h3 className="font-semibold text-sm line-clamp-2 text-foreground">
                        {person.name}
                    </h3>
                    {person.given_name && (
                        <p className="text-xs text-muted-foreground line-clamp-1">
                            {person.given_name} {person.family_name || ""}
                        </p>
                    )}
                </CardContent>
            </Card>
        </Link>
    );
}
