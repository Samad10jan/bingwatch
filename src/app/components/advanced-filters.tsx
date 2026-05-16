"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shadcncomponents/ui/card";
import { Button } from "@/shadcncomponents/ui/button";
import { Badge } from "@/shadcncomponents/ui/badge";
import { Separator } from "@/shadcncomponents/ui/separator";
import { ChevronDown, X } from "lucide-react";

export interface FilterOptions {
    status?: string;
    type?: string;
    scoreRange?: [number, number];
    year?: number;
    season?: string;
    genres?: number[];
    orderBy?: string;
    sort?: "asc" | "desc";
}

interface AdvancedFiltersProps {
    onApplyFilters: (filters: FilterOptions) => void;
    isOpen?: boolean;
}

const ANIME_TYPES = ["TV", "Movie", "OVA", "Special", "ONA", "Music"];
const ANIME_STATUS = ["Airing", "Complete", "Upcoming", "Hiatus", "Discontinued"];
const SEASONS = ["Winter", "Spring", "Summer", "Fall"];
const ORDER_BY = [
    { label: "Score", value: "score" },
    { label: "Popularity", value: "popularity" },
    { label: "Recently Updated", value: "updated" },
];

export default function AdvancedFilters({
    onApplyFilters,
    isOpen = true,
}: AdvancedFiltersProps) {
    const [filters, setFilters] = useState<FilterOptions>({
        status: "",
        type: "",
        scoreRange: [0, 10],
        orderBy: "score",
        sort: "desc",
    });

    const [expanded, setExpanded] = useState(isOpen);

    const handleFilterChange = (key: keyof FilterOptions, value: any) => {
        setFilters((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleApply = () => {
        onApplyFilters(filters);
    };

    const handleReset = () => {
        setFilters({
            status: "",
            type: "",
            scoreRange: [0, 10],
            orderBy: "score",
            sort: "desc",
        });
    };

    const activeFilterCount = Object.values(filters).filter(
        (v) => v !== "" && v !== undefined && (Array.isArray(v) ? v.length > 0 : true)
    ).length;

    return (
        <Card className="mb-6 border-2">
            <CardHeader
                className="cursor-pointer hover:bg-accent/50 transition-colors"
                onClick={() => setExpanded(!expanded)}
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <CardTitle className="text-lg">Advanced Filters</CardTitle>
                        {activeFilterCount > 0 && (
                            <Badge variant="secondary">{activeFilterCount} active</Badge>
                        )}
                    </div>
                    <ChevronDown
                        className={`w-5 h-5 transition-transform ${expanded ? "rotate-180" : ""
                            }`}
                    />
                </div>
            </CardHeader>

            {expanded && (
                <>
                    <Separator />
                    <CardContent className="pt-6 space-y-6">
                        {/* Status Filter */}
                        <div>
                            <label className="text-sm font-semibold mb-3 block">Status</label>
                            <div className="flex flex-wrap gap-2">
                                {ANIME_STATUS.map((status) => (
                                    <Badge
                                        key={status}
                                        variant={filters.status === status ? "default" : "outline"}
                                        className="cursor-pointer"
                                        onClick={() =>
                                            handleFilterChange(
                                                "status",
                                                filters.status === status ? "" : status
                                            )
                                        }
                                    >
                                        {status}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        {/* Type Filter */}
                        <div>
                            <label className="text-sm font-semibold mb-3 block">Type</label>
                            <div className="flex flex-wrap gap-2">
                                {ANIME_TYPES.map((type) => (
                                    <Badge
                                        key={type}
                                        variant={filters.type === type ? "default" : "outline"}
                                        className="cursor-pointer"
                                        onClick={() =>
                                            handleFilterChange(
                                                "type",
                                                filters.type === type ? "" : type
                                            )
                                        }
                                    >
                                        {type}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        {/* Score Range */}
                        <div>
                            <label className="text-sm font-semibold mb-3 block">
                                Score Range: {filters.scoreRange?.[0] || 0} - {filters.scoreRange?.[1] || 10}
                            </label>
                            <div className="flex gap-4 items-center">
                                <input
                                    title="a"
                                    type="range"
                                    min="0"
                                    max="10"
                                    step="0.1"
                                    value={filters.scoreRange?.[0] || 0}
                                    onChange={(e) =>
                                        handleFilterChange("scoreRange", [
                                            parseFloat(e.target.value),
                                            filters.scoreRange?.[1] || 10,
                                        ])
                                    }
                                    className="flex-1"
                                />
                                <span className="text-sm text-muted-foreground min-w-fit">
                                    Min: {(filters.scoreRange?.[0] || 0).toFixed(1)}
                                </span>
                            </div>
                        </div>

                        {/* Season */}
                        <div>
                            <label className="text-sm font-semibold mb-3 block">Season</label>
                            <div className="flex flex-wrap gap-2">
                                {SEASONS.map((season) => (
                                    <Badge
                                        key={season}
                                        variant={filters.season === season ? "default" : "outline"}
                                        className="cursor-pointer"
                                        onClick={() =>
                                            handleFilterChange(
                                                "season",
                                                filters.season === season ? "" : season
                                            )
                                        }
                                    >
                                        {season}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        {/* Order By */}
                        <div>
                            <label className="text-sm font-semibold mb-3 block">Sort By</label>
                            <div className="flex flex-wrap gap-2">
                                {ORDER_BY.map(({ label, value }) => (
                                    <Badge
                                        key={value}
                                        variant={filters.orderBy === value ? "default" : "outline"}
                                        className="cursor-pointer"
                                        onClick={() => handleFilterChange("orderBy", value)}
                                    >
                                        {label}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        {/* Sort Direction */}
                        <div>
                            <label className="text-sm font-semibold mb-3 block">
                                Sort Direction
                            </label>
                            <div className="flex gap-2">
                                {["desc", "asc"].map((sort) => (
                                    <Badge
                                        key={sort}
                                        variant={filters.sort === sort ? "default" : "outline"}
                                        className="cursor-pointer"
                                        onClick={() =>
                                            handleFilterChange("sort", sort as "asc" | "desc")
                                        }
                                    >
                                        {sort === "desc" ? "High to Low" : "Low to High"}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <Separator />
                        <div className="flex gap-2 justify-end pt-4">
                            <Button
                                variant="outline"
                                onClick={handleReset}
                                disabled={activeFilterCount === 0}
                            >
                                <X className="w-4 h-4 mr-2" />
                                Clear All
                            </Button>
                            <Button onClick={handleApply}>Apply Filters</Button>
                        </div>
                    </CardContent>
                </>
            )}
        </Card>
    );
}
