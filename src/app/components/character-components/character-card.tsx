import { Character } from "@/lib/type";
import { Card, CardContent } from "@/shadcncomponents/ui/card";
import { Badge } from "@/shadcncomponents/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { formatNumber, getImageUrl } from "@/lib/helper";

export default function CharacterCard({ character }: { character: Character }) {
    const imageUrl = getImageUrl(
        character.images?.jpg?.image_url,
        character.images?.webp?.image_url
    );

    return (
        <Link href={`/characters/${character.mal_id}`}>
            <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer">
                <div className="relative w-full aspect-[2/3] overflow-hidden">
                    <Image
                        src={imageUrl}
                        alt={character.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <div className="p-3 w-full">
                            <p className="text-xs text-white/80 flex items-center gap-1">
                                <Heart className="w-3 h-3 fill-red-500 text-red-500" />
                                {formatNumber(character.favorites)} favorites
                            </p>
                        </div>
                    </div>
                </div>

                <CardContent className="p-3">
                    <h3 className="font-semibold text-sm line-clamp-2 text-foreground">
                        {character.name}
                    </h3>
                    {character.name_kanji && (
                        <p className="text-xs text-muted-foreground line-clamp-1">
                            {character.name_kanji}
                        </p>
                    )}
                </CardContent>
            </Card>
        </Link>
    );
}
