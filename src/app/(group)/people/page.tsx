"use client";

import { useState, useRef } from "react";
import { jikanAPI } from "@/lib/api";
import PeopleCard from "@/app/components/people-components/people-card";
import { Input } from "@/shadcncomponents/ui/input";
import { Button } from "@/shadcncomponents/ui/button";
import { Card } from "@/shadcncomponents/ui/card";
import { Spinner } from "@/shadcncomponents/ui/spinner";
import { SearchIcon, XCircle } from "lucide-react";
import { Person } from "@/lib/type";

export default function PeopleSearchPage() {
    const [query, setQuery] = useState("");
    const [people, setPeople] = useState<Person[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const searchRef = useRef<HTMLDivElement>(null);

    const handleSearch = async (page = 1) => {
        if (!query.trim()) return;

        setLoading(true);
        try {
            const result = await jikanAPI.searchPeople(query, page);
            if (result?.data) {
                setPeople(result.data);
                setCurrentPage(page);
                setTotalPages(result.pagination?.last_visible_page || 1);
                setHasSearched(true);
            }
        } catch (error) {
            console.error("Search error:", error);
            setPeople([]);
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
        setPeople([]);
        setHasSearched(false);
        setCurrentPage(1);
    };

    return (
        <div className="min-h-screen pb-12" ref={searchRef}>
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <div className="py-8">
                    <div className="relative">
                        <div className="absolute inset-0 dark:bg-gradient-to-r from-orange-500 to-red-500 blur-xl opacity-50" />
                        <h1 className="relative text-4xl md:text-5xl font-black bg-gradient-to-r from-orange-400 via-red-400 to-pink-500 bg-clip-text text-transparent">
                            Search Staff & People
                        </h1>
                    </div>
                    <p className="text-muted-foreground mt-2">
                        Find voice actors, directors, writers, and other anime industry professionals
                    </p>
                </div>

                {/* Search Bar */}
                <Card className="p-4 mb-8 border-2">
                    <div className="flex gap-2">
                        <div className="flex-1 relative">
                            <Input
                                type="text"
                                placeholder="Search by name..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyPress={handleKeyPress}
                                className="pl-10 h-12"
                            />
                            <SearchIcon className="absolute left-3 top-3.5 w-5 h-5 text-muted-foreground" />
                            {query && (
                                <button
                                    title="clear"
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
                        ) : people.length > 0 ? (
                            <>
                                <div className="mb-6">
                                    <p className="text-sm text-muted-foreground">
                                        Found {people.length} people
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
                                    {people.map((person,i) => (
                                        <PeopleCard key={i} person={person} />
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
                                    No people found for "{query}"
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
                            Start typing a name to search for voice actors, directors, and other professionals
                        </p>
                    </Card>
                )}
            </div>
        </div>
    );
}
