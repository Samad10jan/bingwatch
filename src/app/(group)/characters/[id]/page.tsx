"use client";

import { useCharacter } from "@/hooks/useFetch";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/shadcncomponents/ui/card";
import { Badge } from "@/shadcncomponents/ui/badge";
import { Heart } from "lucide-react";
import { Spinner } from "@/shadcncomponents/ui/spinner";
import { formatNumber, getImageUrl } from "@/lib/helper";

export default function CharacterDetailPage() {
    const { id } = useParams();
    const { data: character, loading, error } = useCharacter(id as string);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Spinner className="w-8 h-8" />
            </div>
        );
    }

    if (error || !character) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-4">Character Not Found</h1>
                    <p className="text-muted-foreground">
                        We couldn't find information about this character.
                    </p>
                </div>
            </div>
        );
    }

    const imageUrl = getImageUrl(
        character.images?.jpg?.image_url,
        character.images?.webp?.image_url
    );

    return (
        <div className="min-h-screen pb-12">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-8">
                    {/* Character Image Sidebar */}
                    <div className="md:col-span-1">
                        <div className="sticky top-24">
                            <div className="relative aspect-[2/3] rounded-xl overflow-hidden shadow-lg border-4 border-background">
                                <Image
                                    src={imageUrl}
                                    alt={character.name}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>

                            {/* Favorites */}
                            <Card className="mt-4">
                                <CardContent className="p-4">
                                    <div className="flex items-center gap-2 text-sm">
                                        <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                                        <span className="font-semibold">
                                            {formatNumber(character.favorites)}
                                        </span>
                                        <span className="text-muted-foreground">Favorites</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Character Details */}
                    <div className="md:col-span-3 space-y-6">
                        {/* Header */}
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-2">
                                {character.name}
                            </h1>
                            {character.name_kanji && (
                                <p className="text-xl text-muted-foreground font-medium">
                                    {character.name_kanji}
                                </p>
                            )}
                        </div>

                        {/* Alternate Names */}
                        {character.nicknames && character.nicknames.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <div className="w-1 h-6 bg-primary rounded-full" />
                                        Alternative Names
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-2">
                                        {character.nicknames.map((nickname, idx) => (
                                            <Badge key={idx} variant="secondary">
                                                {nickname}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* About */}
                        {character.about && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <div className="w-1 h-6 bg-primary rounded-full" />
                                        About
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-base leading-relaxed text-muted-foreground whitespace-pre-wrap">
                                        {character.about}
                                    </p>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
