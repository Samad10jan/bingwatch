"use client";

import CharacterCard from "@/app/components/character-components/character-card";
import { jikanAPI } from "@/lib/api";
import { Character } from "@/lib/type";
import { Button } from "@/shadcncomponents/ui/button";
import { Card } from "@/shadcncomponents/ui/card";
import { Input } from "@/shadcncomponents/ui/input";
import { Spinner } from "@/shadcncomponents/ui/spinner";
import { SearchIcon, XCircle } from "lucide-react";
import { useRef, useState } from "react";

export default function CharacterSearchPage() {
    const [query, setQuery] = useState("");
    const [characters, setCharacters] = useState<Character[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const searchRef = useRef<HTMLDivElement>(null);

    const handleSearch = async (page = 1) => {
        if (!query.trim()) return;

        setLoading(true);
        try {
            const result = await jikanAPI.searchCharacters(query, page);
            if (result?.data) {
                setCharacters(result.data);
                setCurrentPage(page);
                setTotalPages(result.pagination?.last_visible_page || 1);
                setHasSearched(true);
            }
        } catch (error) {
            console.error("Search error:", error);
            setCharacters([]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearch(1);
        }
    };

    const clearSearch = () => {
        setQuery("");
        setCharacters([]);
        setHasSearched(false);
        setCurrentPage(1);
    };

    return (
        <div className="min-h-screen pb-12" ref={searchRef}>
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <div className="py-8">
                    <div className="relative">
                        <div className="absolute inset-0 dark:bg-gradient-to-r from-blue-500 to-purple-500 blur-xl opacity-50" />
                        <h1 className="relative text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
                            Search Characters
                        </h1>
                    </div>
                    <p className="text-muted-foreground mt-2">
                        Find your favorite anime and manga characters
                    </p>
                </div>

                {/* Search Bar */}
                <Card className="p-4 mb-8 border-2">
                    <div className="flex gap-2">
                        <div className="flex-1 relative">
                            <Input
                                type="text"
                                placeholder="Search characters by name..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyPress={handleKeyPress}
                                className="pl-10 h-12"
                            />
                            <SearchIcon className="absolute left-3 top-3.5 w-5 h-5 text-muted-foreground" />
                            {query && (
                                <button
                                    title="close"
                                    onClick={clearSearch}
                                    className="absolute right-3 top-3.5 p-1 hover:bg-accent rounded"
                                >
                                    <XCircle className="w-5 h-5 text-muted-foreground hover:text-foreground" />
                                </button>
                            )}
                        </div>
                        <Button onClick={() => handleSearch(1)} size="lg" className="px-8">
                            {loading ? <Spinner className="w-4 h-4" /> : "Search"}
                        </Button>
                    </div>
                </Card>

                {/* Results */}
                {hasSearched ? (
                    <>
                        {loading ? (
                            <div className="flex justify-center items-center py-12">
                                <Spinner className="w-8 h-8" />
                            </div>
                        ) : characters.length > 0 ? (
                            <>
                                <div className="mb-6">
                                    <p className="text-sm text-muted-foreground">
                                        Found {characters.length} characters
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
                                    {characters.map((character) => (
                                        <CharacterCard key={character.mal_id} character={character} />
                                    ))}
                                </div>

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="flex justify-center gap-2">
                                        <Button
                                            onClick={() => handleSearch(currentPage - 1)}
                                            disabled={currentPage === 1}
                                            variant="outline"
                                        >
                                            Previous
                                        </Button>
                                        <div className="flex items-center gap-2 px-4">
                                            <span className="text-sm font-medium">
                                                Page {currentPage} of {totalPages}
                                            </span>
                                        </div>
                                        <Button
                                            onClick={() => handleSearch(currentPage + 1)}
                                            disabled={currentPage === totalPages}
                                            variant="outline"
                                        >
                                            Next
                                        </Button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <Card className="p-8 text-center">
                                <p className="text-lg text-muted-foreground mb-4">
                                    No characters found for "{query}"
                                </p>
                                <Button onClick={clearSearch} variant="outline">
                                    Try Another Search
                                </Button>
                            </Card>
                        )}
                    </>
                ) : (
                    <Card className="p-12 text-center border-dashed">
                        <p className="text-muted-foreground text-lg">
                            Start typing a character name to search
                        </p>
                    </Card>
                )}
            </div>
        </div>
    );
}
