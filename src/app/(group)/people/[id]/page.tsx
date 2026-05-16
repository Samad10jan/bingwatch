"use client";

import { usePersonDetails } from "@/hooks/useFetch";
// import { usePersonDetails } from "@/hooks/useFetch";
import { formatNumber, getImageUrl } from "@/lib/helper";
import { Badge } from "@/shadcncomponents/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/shadcncomponents/ui/card";
import { Spinner } from "@/shadcncomponents/ui/spinner";
import { BookOpen, Calendar, Globe, Heart, User } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function PersonDetailPage() {
    const { id } = useParams();
    const { data: person, loading, error } = usePersonDetails(id as string);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Spinner className="w-8 h-8" />
            </div>
        );
    }

    if (error || !person) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-4">Person Not Found</h1>
                    <p className="text-muted-foreground">
                        We couldn&apos;t find information about this person.
                    </p>
                </div>
            </div>
        );
    }

    const imageUrl = getImageUrl(
        person.images?.jpg?.image_url,
        person.images?.webp?.image_url
    );

    return (
        <div className="min-h-screen pb-12">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-8">
                    {/* Person Image Sidebar */}
                    <div className="md:col-span-1">
                        <div className="sticky top-24">
                            <div className="relative aspect-[2/3] rounded-xl overflow-hidden shadow-lg border-4 border-background">
                                <Image
                                    src={imageUrl}
                                    alt={person.name}
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
                                            {formatNumber(person.favorites)}
                                        </span>
                                        <span className="text-muted-foreground">Favorites</span>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Quick Info */}
                            <Card className="mt-4">
                                <CardContent className="p-4 space-y-3">
                                    {person.birthday && (
                                        <div className="flex items-center gap-2 text-sm">
                                            <Calendar className="w-4 h-4 text-muted-foreground shrink-0" />
                                            <span className="text-muted-foreground">Born</span>
                                            <span className="font-medium ml-auto">
                                                {new Date(person.birthday).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "short",
                                                    day: "numeric",
                                                })}
                                            </span>
                                        </div>
                                    )}
                                    {person.website_url && (
                                        <div className="flex items-center gap-2 text-sm">
                                            <Globe className="w-4 h-4 text-muted-foreground shrink-0" />
                                            <a
                                                href={person.website_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-primary hover:underline truncate"
                                            >
                                                Website
                                            </a>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Person Details */}
                    <div className="md:col-span-3 space-y-6">
                        {/* Header */}
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-2">
                                {person.name}
                            </h1>
                            {person.family_name && (
                                <p className="text-xl text-muted-foreground font-medium">
                                    {[person.family_name, person.given_name]
                                        .filter(Boolean)
                                        .join(" ")}
                                </p>
                            )}
                        </div>

                        {/* Alternate Names */}
                        {person.alternate_names && person.alternate_names.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <div className="w-1 h-6 bg-primary rounded-full" />
                                        Alternative Names
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-2">
                                        {person.alternate_names.map((name, idx) => (
                                            <Badge key={idx} variant="secondary">
                                                {name}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* About */}
                        {person.about && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <div className="w-1 h-6 bg-primary rounded-full" />
                                        About
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-base leading-relaxed text-muted-foreground whitespace-pre-wrap">
                                        {person.about}
                                    </p>
                                </CardContent>
                            </Card>
                        )}

                        {/* Anime Positions */}
                        {person.anime && person.anime.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <div className="w-1 h-6 bg-primary rounded-full" />
                                        <BookOpen className="w-4 h-4" />
                                        Anime
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {person.anime.map((entry, idx) => (
                                            <div
                                                key={idx}
                                                className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                                            >
                                                {entry.anime?.images?.jpg?.image_url && (
                                                    <div className="relative w-10 h-14 rounded overflow-hidden shrink-0">
                                                        <Image
                                                            src={entry.anime.images.jpg.image_url}
                                                            alt={entry.anime.title ?? ""}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                )}
                                                <div className="min-w-0">
                                                    <p className="font-medium text-sm truncate">
                                                        {entry.anime?.title}
                                                    </p>
                                                    <Badge variant="outline" className="text-xs mt-1">
                                                        {entry.position}
                                                    </Badge>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Manga Positions */}
                        {person.manga && person.manga.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <div className="w-1 h-6 bg-primary rounded-full" />
                                        <User className="w-4 h-4" />
                                        Manga
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {person.manga.map((entry, idx) => (
                                            <div
                                                key={idx}
                                                className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                                            >
                                                {entry.manga?.images?.jpg?.image_url && (
                                                    <div className="relative w-10 h-14 rounded overflow-hidden shrink-0">
                                                        <Image
                                                            src={entry.manga.images.jpg.image_url}
                                                            alt={entry.manga.title ?? ""}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                )}
                                                <div className="min-w-0">
                                                    <p className="font-medium text-sm truncate">
                                                        {entry.manga?.title}
                                                    </p>
                                                    <Badge variant="outline" className="text-xs mt-1">
                                                        {entry.position}
                                                    </Badge>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Voice Acting Roles */}
                        {person.voices && person.voices.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <div className="w-1 h-6 bg-primary rounded-full" />
                                        Voice Acting Roles
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {person.voices.map((entry, idx) => (
                                            <div
                                                key={idx}
                                                className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors border border-border"
                                            >
                                                {entry.character?.images?.jpg?.image_url && (
                                                    <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
                                                        <Image
                                                            src={entry.character.images.jpg.image_url}
                                                            alt={entry.character.name ?? ""}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                )}
                                                <div className="min-w-0 flex-1">
                                                    <p className="font-medium text-sm truncate">
                                                        {entry.character?.name}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground truncate">
                                                        {entry.anime?.title}
                                                    </p>
                                                </div>
                                                {entry.role && (
                                                    <Badge variant="secondary" className="text-xs shrink-0">
                                                        {entry.role}
                                                    </Badge>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}