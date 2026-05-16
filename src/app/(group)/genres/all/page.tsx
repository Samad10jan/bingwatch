"use client";

import { useState } from "react";
import Link from "next/link";
import { genres } from "@/lib/constants";
import { Card, CardContent } from "@/shadcncomponents/ui/card";
import { Badge } from "@/shadcncomponents/ui/badge";
import { Input } from "@/shadcncomponents/ui/input";
import { Button } from "@/shadcncomponents/ui/button";
import { SearchIcon, Grid3x3, List } from "lucide-react";

export default function AllGenresPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredGenres = genres.filter((genre) =>
    genre.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const gridCols = {
    grid: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6",
    list: "grid-cols-1",
  };

  return (
    <div className="min-h-screen pb-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="py-8">
          <div className="relative mb-6">
            <div className="absolute inset-0 dark:bg-gradient-to-r from-purple-500 to-pink-500 blur-xl opacity-50" />
            <h1 className="relative text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-red-500 bg-clip-text text-transparent">
              All Genres
            </h1>
          </div>
          <p className="text-muted-foreground">
            Browse {genres.length} anime genres and discover your next favorite series
          </p>
        </div>

        {/* Search & View Controls */}
        <Card className="p-4 mb-8 border-2">
          <div className="flex gap-2 flex-col sm:flex-row sm:items-center">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Input
                type="text"
                placeholder="Search genres..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
              <SearchIcon className="absolute left-3 top-3.5 w-5 h-5 text-muted-foreground" />
            </div>

            {/* View Mode Toggle */}
            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="flex items-center gap-2"
              >
                <Grid3x3 className="w-4 h-4" />
                <span className="hidden sm:inline">Grid</span>
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="flex items-center gap-2"
              >
                <List className="w-4 h-4" />
                <span className="hidden sm:inline">List</span>
              </Button>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-muted-foreground">
            Showing {filteredGenres.length} of {genres.length} genres
          </div>
        </Card>

        {/* Genres Grid/List */}
        {filteredGenres.length > 0 ? (
          <div className={`grid ${gridCols[viewMode]} gap-4 mb-8`}>
            {filteredGenres.map((genre) => (
              <Link key={genre.mal_id} href={`/genres/${genre.mal_id}`}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-105 group cursor-pointer overflow-hidden border-2 hover:border-primary">
                  <CardContent className="p-6 flex items-center justify-center h-full min-h-[120px]">
                    <div className="text-center">
                      <Badge
                        variant="outline"
                        className="mb-3 group-hover:bg-primary group-hover:text-primary-foreground transition-all px-4 py-2 text-sm"
                      >
                        {genre.mal_id}
                      </Badge>
                      <h3 className="font-bold text-lg group-hover:text-primary transition-colors line-clamp-2">
                        {genre.name}
                      </h3>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center border-dashed">
            <p className="text-muted-foreground text-lg">
              No genres found matching "{searchQuery}"
            </p>
            <Button
              onClick={() => setSearchQuery("")}
              variant="outline"
              className="mt-4"
            >
              Clear Search
            </Button>
          </Card>
        )}

        {/* Genre Statistics */}
        {filteredGenres.length > 0 && (
          <Card className="p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Quick Stats</p>
              <div className="text-2xl font-bold text-foreground">
                {filteredGenres.length} genres available
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Click on any genre to see all anime in that category
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
