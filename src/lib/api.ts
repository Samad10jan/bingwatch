import {
    Anime,
    Manga,
    Character,
    CharacterWithRole,
    Person,
    APIResponse,
    APIListResponse,
    AnimeRecommendationItem,
    PlatformType,
} from "./type";

const BASE_URL = process.env.NEXT_PUBLIC_JIKAN_API_URL || "https://api.jikan.moe/v4";
const CACHE_DURATION = 3600; // 1 hour

export interface FetchOptions extends RequestInit {
    skipCache?: boolean;
}

class JikanAPI {
    private cache: Map<string, { data: unknown; timestamp: number }> = new Map();

    private getCacheKey(endpoint: string, params?: Record<string, unknown>): string {
        const queryString = params ? new URLSearchParams(Object.entries(params).map(([k, v]) => [k, String(v)])).toString() : "";
        return `${endpoint}?${queryString}`;
    }

    private isCacheValid(timestamp: number): boolean {
        return Date.now() - timestamp < CACHE_DURATION * 1000;
    }

    private getFromCache<T>(key: string): T | null {
        const cached = this.cache.get(key);
        if (cached && this.isCacheValid(cached.timestamp)) {
            return cached.data as T;
        }
        this.cache.delete(key);
        return null;
    }

    private setCache(key: string, data: unknown): void {
        this.cache.set(key, { data, timestamp: Date.now() });
    }

    private async fetchWithRetry(url: string, options: FetchOptions = {}): Promise<Response> {
        const maxRetries = 3;
        let lastError: Error | null = null;

        for (let i = 0; i < maxRetries; i++) {
            try {
                const response = await fetch(url, {
                    next: { revalidate: CACHE_DURATION },
                    ...options,
                });

                if (!response.ok) {
                    if (response.status === 429) {
                        // Rate limit - wait and retry
                        await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)));
                        continue;
                    }
                    throw new Error(`API Error: ${response.status} ${response.statusText}`);
                }

                return response;
            } catch (error) {
                lastError = error instanceof Error ? error : new Error("Unknown error");
                if (i < maxRetries - 1) {
                    await new Promise((resolve) => setTimeout(resolve, 500 * (i + 1)));
                }
            }
        }

        throw lastError || new Error("Max retries exceeded");
    }

    async fetch<T>(endpoint: string, params?: Record<string, unknown>, options: FetchOptions = {}): Promise<T | null> {
        try {
            const cacheKey = this.getCacheKey(endpoint, params);

            // Check cache first (unless skipCache is true)
            if (!options.skipCache) {
                const cached = this.getFromCache<T>(cacheKey);
                if (cached) return cached;
            }

            const queryString = params ? `?${new URLSearchParams(Object.entries(params).map(([k, v]) => [k, String(v)])).toString()}` : "";
            const url = `${BASE_URL}${endpoint}${queryString}`;

            const response = await this.fetchWithRetry(url, options);
            const data = (await response.json()) as T;

            this.setCache(cacheKey, data);
            return data;
        } catch (error) {
            console.error(`Fetch error for ${endpoint}:`, error);
            return null;
        }
    }

    // Anime endpoints
    async getTopAnime(type?: string, page = 1, limit = 10) {
        return this.fetch<APIListResponse<Anime>>("/top/anime", {
            type,
            page,
            limit,
            sfw: 1,
            order_by: "popularity",
        });
    }

    async getAnimeByGenre(genreId: number | string, page = 1, limit = 25) {
        return this.fetch<APIListResponse<Anime>>("/anime", {
            genres: genreId,
            page,
            limit,
            sfw: 1,
            order_by: "score",
            sort: "desc",
        });
    }

    async getAnimeById(id: number | string) {
        return this.fetch<APIResponse<Anime>>(`/anime/${id}`);
    }

    async searchAnime(query: string, type?: string, page = 1, limit = 10) {
        return this.fetch<APIListResponse<Anime>>("/anime", {
            query,
            type,
            page,
            limit,
            sfw: 1,
        });
    }

    async getAnimeRecommendations(id: number | string) {
        return this.fetch<APIResponse<AnimeRecommendationItem[]>>(`/anime/${id}/recommendations`);
    }

    async getAnimeCharacters(id: number | string) {
        return this.fetch<APIListResponse<CharacterWithRole>>(`/anime/${id}/characters`);
    }

    async getAnimeStaff(id: number | string) {
        return this.fetch<APIListResponse<{ person: Person; position: string }>>(`/anime/${id}/staff`);
    }

    async getAnimeRelated(id: number | string) {
        return this.fetch<APIResponse<Record<string, any>>>(`/anime/${id}/relations`);
    }

    async getAnimeThemes(id: number | string) {
        return this.fetch<APIResponse<any>>(`/anime/${id}/themes`);
    }

    async getAnimeStreamingPlatforms(id: number | string) {
        return this.fetch<APIListResponse<PlatformType>>(`/anime/${id}/streaming`);
    }

    // Manga endpoints
    async getTopManga(type?: string, page = 1, limit = 10) {
        return this.fetch<APIListResponse<Manga>>("/top/manga", {
            type,
            page,
            limit,
            sfw: 1,
            order_by: "popularity",
        });
    }

    async getMangaByGenre(genreId: number | string, page = 1, limit = 25) {
        return this.fetch<APIListResponse<Manga>>("/manga", {
            genres: genreId,
            page,
            limit,
            sfw: 1,
            order_by: "score",
            sort: "desc",
        });
    }

    async getMangaById(id: number | string) {
        return this.fetch<APIResponse<Manga>>(`/manga/${id}`);
    }

    async searchManga(query: string, type?: string, page = 1, limit = 10) {
        return this.fetch<APIListResponse<Manga>>("/manga", {
            query,
            type,
            page,
            limit,
            sfw: 1,
        });
    }

    async getMangaRecommendations(id: number | string) {
        return this.fetch<APIResponse<AnimeRecommendationItem[]>>(`/manga/${id}/recommendations`);
    }

    async getMangaCharacters(id: number | string) {
        return this.fetch<APIListResponse<CharacterWithRole>>(`/manga/${id}/characters`);
    }

    // Character endpoints
    async getCharacterById(id: number | string) {
        return this.fetch<APIResponse<Character>>(`/characters/${id}`);
    }

    async searchCharacters(query: string, page = 1, limit = 10) {
        return this.fetch<APIListResponse<Character>>("/characters", {
            query,
            page,
            limit,
            order_by: "favorites",
            sort: "desc",
        });
    }

    // Person/Staff endpoints
    async getPersonById(id: number | string) {
        return this.fetch<APIResponse<Person>>(`/people/${id}`);
    }

    async searchPeople(query: string, page = 1, limit = 10) {
        return this.fetch<APIListResponse<Person>>("/people", {
            query,
            page,
            limit,
            order_by: "favorites",
            sort: "desc",
        });
    }

    // Schedule endpoints
    async getAnimeSchedule(day?: string) {
        return this.fetch<APIListResponse<Anime>>("/schedules", {
            filter: day,
            sfw: 1,
        });
    }

    // Utility methods
    clearCache(): void {
        this.cache.clear();
    }

    getCacheStats() {
        return {
            size: this.cache.size,
            entries: Array.from(this.cache.keys()),
        };
    }
}

export const jikanAPI = new JikanAPI();
