# Quick Reference - API & Hooks Usage Guide

## 🎯 Quick Links
- [API Service](#-api-service)
- [Custom Hooks](#-custom-hooks)
- [New Components](#-new-components)
- [Examples](#-examples)

---

## 🔌 API Service

### Import
```typescript
import { jikanAPI } from "@/lib/api";
```

### Anime Methods
```typescript
// Get top anime
await jikanAPI.getTopAnime(type?, page?, limit?);

// Search anime
await jikanAPI.searchAnime(query, type?, page?, limit?);

// Get anime by ID
await jikanAPI.getAnimeById(id);

// Get by genre
await jikanAPI.getAnimeByGenre(genreId, page?, limit?);

// Get recommendations
await jikanAPI.getAnimeRecommendations(id);

// Get characters
await jikanAPI.getAnimeCharacters(id);

// Get staff
await jikanAPI.getAnimeStaff(id);

// Get themes
await jikanAPI.getAnimeThemes(id);

// Get streaming platforms
await jikanAPI.getAnimeStreamingPlatforms(id);
```

### Manga Methods
```typescript
// Get top manga
await jikanAPI.getTopManga(type?, page?, limit?);

// Search manga
await jikanAPI.searchManga(query, type?, page?, limit?);

// Get manga by ID
await jikanAPI.getMangaById(id);

// Get by genre
await jikanAPI.getMangaByGenre(genreId, page?, limit?);

// Get recommendations
await jikanAPI.getMangaRecommendations(id);

// Get characters
await jikanAPI.getMangaCharacters(id);
```

### Character Methods
```typescript
// Get character by ID
await jikanAPI.getCharacterById(id);

// Search characters
await jikanAPI.searchCharacters(query, page?, limit?);
```

### People Methods
```typescript
// Get person by ID
await jikanAPI.getPersonById(id);

// Search people
await jikanAPI.searchPeople(query, page?, limit?);
```

### Other Methods
```typescript
// Get anime schedule
await jikanAPI.getAnimeSchedule(day?);

// Clear cache
jikanAPI.clearCache();

// Get cache stats
jikanAPI.getCacheStats();
```

---

## 🎣 Custom Hooks

### Import
```typescript
import { 
  useFetch,
  useAnime,
  useManga,
  useCharacter,
  usePerson,
  useSearchAnime,
  useSearchCharacters,
  useSearchPeople,
  useAnimeCharacters,
  useAnimeStaff,
  useAnimeRecommendations,
  useTopAnime,
  useAnimeByGenre,
  useIntersectionObserver
} from "@/hooks/useFetch";
```

### Hook Return Type
```typescript
interface UseFetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  retry: () => void;
}
```

### Usage Examples

#### Get Single Anime
```typescript
"use client";
import { useAnime } from "@/hooks/useFetch";

export function AnimeDetail({ id }) {
  const { data: anime, loading, error } = useAnime(id);
  
  if (loading) return <Spinner />;
  if (error) return <Error />;
  
  return <div>{anime?.title}</div>;
}
```

#### Search Anime
```typescript
const { data: results, loading } = useSearchAnime(query, type, page);
```

#### Get Anime Characters
```typescript
const { data: characters } = useAnimeCharacters(animeId);
```

#### Lazy Loading with Intersection Observer
```typescript
const ref = useRef<HTMLDivElement>(null);
useIntersectionObserver(ref, () => {
  // Load more when visible
});
```

---

## 🎨 New Components

### CharacterCard
```typescript
import CharacterCard from "@/app/components/character-components/character-card";

<CharacterCard character={characterData} />
```

### PeopleCard
```typescript
import PeopleCard from "@/app/components/people-components/people-card";

<PeopleCard person={personData} />
```

### AdvancedFilters
```typescript
import AdvancedFilters from "@/app/components/advanced-filters";

<AdvancedFilters 
  onApplyFilters={(filters) => {
    // Handle filters
  }}
/>
```

---

## 💡 Examples

### Example 1: Complete Search Page
```typescript
"use client";
import { useSearchAnime } from "@/hooks/useFetch";
import { useState } from "react";
import AnimeCard from "@/app/components/anime-components/moviecard";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const { data: results, loading } = useSearchAnime(query);

  return (
    <div>
      <input 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {loading && <Spinner />}
      {results?.map(anime => (
        <AnimeCard key={anime.mal_id} data={anime} />
      ))}
    </div>
  );
}
```

### Example 2: Character Detail
```typescript
"use client";
import { useCharacter, useAnimeCharacters } from "@/hooks/useFetch";
import { useParams } from "next/navigation";

export default function CharacterDetail() {
  const { id } = useParams();
  const { data: character, loading } = useCharacter(id);

  if (loading) return <Spinner />;
  
  return (
    <div>
      <img src={character?.images.jpg.image_url} />
      <h1>{character?.name}</h1>
      <p>{character?.about}</p>
    </div>
  );
}
```

### Example 3: Filtered Anime List
```typescript
"use client";
import { useTopAnime } from "@/hooks/useFetch";
import AdvancedFilters from "@/app/components/advanced-filters";
import { useState } from "react";

export default function FilteredList() {
  const [filters, setFilters] = useState({});
  const { data: anime } = useTopAnime(
    filters.type,
    1,
    25
  );

  return (
    <>
      <AdvancedFilters onApplyFilters={setFilters} />
      <div className="grid grid-cols-5 gap-4">
        {anime?.map(a => <AnimeCard key={a.mal_id} data={a} />)}
      </div>
    </>
  );
}
```

### Example 4: Cache Management
```typescript
import { jikanAPI } from "@/lib/api";

// Get cache stats
console.log(jikanAPI.getCacheStats());
// Output: { size: 5, entries: [...] }

// Clear all cache
jikanAPI.clearCache();
```

---

## 🔍 Helper Functions

### Import
```typescript
import { 
  formatNumber,
  truncateText,
  getImageUrl 
} from "@/lib/helper";
```

### Usage
```typescript
// Format number with commas
formatNumber(1000000); // "1,000,000"

// Truncate text
truncateText("Long text here", 10); // "Long text ..."

// Get reliable image URL
getImageUrl(
  anime.images?.jpg?.large_image_url,
  anime.images?.jpg?.image_url,
  "/default.png"
);
```

---

## 📝 Type Definitions

### Key Types
```typescript
// API Response wrappers
APIResponse<T>        // Single item response
APIListResponse<T>    // List with pagination

// Entities
Anime
Manga
Character
Person
CharacterWithRole
PlatformType
AnimeRecommendationItem

// Filters
FilterOptions {
  status?: string;
  type?: string;
  scoreRange?: [number, number];
  year?: number;
  season?: string;
  genres?: number[];
  orderBy?: string;
  sort?: "asc" | "desc";
}
```

---

## ⚙️ Configuration

### Environment Variables (.env.local)
```env
NEXT_PUBLIC_JIKAN_API_URL=https://api.jikan.moe/v4
```

### API Caching
- Default TTL: 1 hour (3600 seconds)
- Automatic retry: 3 attempts with exponential backoff
- Rate limit handling: 429 responses trigger retry

---

## 🐛 Error Handling

All API calls return `null` on error and log to console:
```typescript
const result = await jikanAPI.getAnimeById(123);
if (!result) {
  console.log("Failed to fetch anime");
}
```

With hooks:
```typescript
const { data, loading, error, retry } = useAnime(id);
if (error) {
  return <button onClick={retry}>Retry</button>;
}
```

---

## 📊 Performance Tips

1. **Use hooks instead of direct API calls** - Better caching
2. **Leverage lazy loading** - `useIntersectionObserver`
3. **Batch requests** - Use `Promise.all()` when possible
4. **Cache wisely** - Default 1-hour TTL is good for most cases
5. **Pagination** - Always paginate large result sets

---

## 🔗 Routes

### New Accessible Routes
- `/characters` - Character search
- `/characters/[id]` - Character detail
- `/people` - Staff/people search
- `/people/[id]` - Person detail

### Updated Routes (with new sidebar links)
- Anime page: Now has "Characters" and "Staff" explore options
- Manga page: Now has "Characters" and "Staff" explore options

---

## 📚 Resources

- [Jikan API Documentation](https://docs.api.jikan.moe/)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Hooks Guide](https://react.dev/reference/react/hooks)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
