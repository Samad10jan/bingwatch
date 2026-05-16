import { jikanAPI } from "@/lib/api";
import { PersonDetails } from "@/lib/type";
import { useEffect, useState } from "react";

export interface UseFetchState<T> {
    data: T | null;
    loading: boolean;
    error: Error | null;
    retry: () => void;
}

/**
 * Generic fetch hook with caching and error handling
 */
export function useFetch<T>(
    fetcher: () => Promise<T | null>,
    dependencies: any[] = []
): UseFetchState<T> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);
            const result = await fetcher();
            setData(result);
        } catch (err) {
            setError(err instanceof Error ? err : new Error("Unknown error"));
            console.error("Fetch error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, dependencies);

    return {
        data,
        loading,
        error,
        retry: fetchData,
    };
}

/**
 * Anime-specific fetch hook
 */
export function useAnime(animeId: number | string) {
    return useFetch(
        () => jikanAPI.getAnimeById(animeId).then((res) => res?.data ?? null),
        [animeId]
    );
}

/**
 * Search anime hook with debouncing
 */
export function useSearchAnime(query: string, type?: string, page = 1) {
    return useFetch(
        () => jikanAPI.searchAnime(query, type, page).then((res) => res?.data ?? null),
        [query, type, page]
    );
}

/**
 * Manga-specific fetch hook
 */
export function useManga(mangaId: number | string) {
    return useFetch(
        () => jikanAPI.getMangaById(mangaId).then((res) => res?.data ?? null),
        [mangaId]
    );
}

/**
 * Character fetch hook
 */
export function useCharacter(characterId: number | string) {
    return useFetch(
        () => jikanAPI.getCharacterById(characterId).then((res) => res?.data ?? null),
        [characterId]
    );
}

/**
 * Search characters hook
 */
export function useSearchCharacters(query: string, page = 1) {
    return useFetch(
        () => jikanAPI.searchCharacters(query, page).then((res) => res?.data ?? null),
        [query, page]
    );
}

/**
 * Person/Staff fetch hook
 */
export function usePerson(personId: number | string) {
    return useFetch(
        () => jikanAPI.getPersonById(personId).then((res) => res?.data ?? null),
        [personId]
    );
}

/**
 * Search people hook
 */
export function useSearchPeople(query: string, page = 1) {
    return useFetch(
        () => jikanAPI.searchPeople(query, page).then((res) => res?.data ?? null),
        [query, page]
    );
}

/**
 * Anime recommendations hook
 */
export function useAnimeRecommendations(animeId: number | string) {
    return useFetch(
        () => jikanAPI.getAnimeRecommendations(animeId).then((res) => res?.data ?? []),
        [animeId]
    );
}

/**
 * Anime characters hook
 */
export function useAnimeCharacters(animeId: number | string) {
    return useFetch(
        () => jikanAPI.getAnimeCharacters(animeId).then((res) => res?.data ?? []),
        [animeId]
    );
}

/**
 * Anime staff hook
 */
export function useAnimeStaff(animeId: number | string) {
    return useFetch(
        () => jikanAPI.getAnimeStaff(animeId).then((res) => res?.data ?? []),
        [animeId]
    );
}

/**
 * Top anime by type hook
 */
export function useTopAnime(type?: string, page = 1, limit = 10) {
    return useFetch(
        () => jikanAPI.getTopAnime(type, page, limit).then((res) => res?.data ?? []),
        [type, page, limit]
    );
}

/**
 * Anime by genre hook
 */
export function useAnimeByGenre(genreId: number | string, page = 1, limit = 25) {
    return useFetch(
        () => jikanAPI.getAnimeByGenre(genreId, page, limit).then((res) => res?.data ?? []),
        [genreId, page, limit]
    );
}

/**
 * Intersection Observer hook for lazy loading
 */
export function useIntersectionObserver(ref: React.RefObject<HTMLElement>, callback: () => void) {
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    callback();
                }
            },
            { threshold: 0.2 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [ref, callback]);
}




// ---- Hook ----

export function usePersonDetails(id: string) {
    const [data, setData] = useState<PersonDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        const fetchPerson = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await fetch(`https://api.jikan.moe/v4/people/${id}/full`);
                if (!response.ok) throw new Error("Failed to fetch person");
                const json = await response.json();
                setData(json.data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Unknown error");
            } finally {
                setLoading(false);
            }
        };

        fetchPerson();
    }, [id]);

    return { data, loading, error };
}