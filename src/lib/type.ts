export type Anime = {
  mal_id: number;
  title: string;
  title_english?: string | null;
  title_japanese?: string | null;
  synopsis?: string | null;
  background?: string | null;
  rank?: string | null;

  score?: number;

  type?: string | null;
  status?: string | null;
  episodes?: number | null;
  year?: number | null;

  animeSeason?: {
    season?: string | null;
    year?: number | null;
  } | null;

  duration?: number
  trailer: {
    youtube_id: string | null
    url: string | null
    embed_url: string | null
    images: {
      image_url: string | null
      small_image_url: string | null
      medium_image_url: string | null
      large_image_url: string | null
      maximum_image_url: string | null
    }
  }
  images?: {
    jpg?: {
      image_url: string;
      small_image_url?: string;
      large_image_url?: string;
    };
    webp?: {
      image_url: string;
      small_image_url?: string;
      large_image_url?: string;
    };
  };

  // Fallback URLs (used in your Hero & Drawer components)
  picture?: string;
  thumbnail?: string;

  tags?: string[];
  studios?: { name: string }[];
  genres: { name: string }[];
  producers?: { name: string }[];
  relatedAnime?: string[];
};
export type JSONDATA = {
  pagination: {
    last_visible_page: number
    has_next_page: boolean,
    current_page: number,
    items: {
      count: number,
      total: number,
      per_page: number
    }
  },
  data: Anime[]
}

export type AnimeRecommendationItem = {
  entry: {
    mal_id: number;
    url: string;
    images: {
      jpg: {
        image_url: string;
        small_image_url: string;
        large_image_url: string;
      };
      webp: {
        image_url: string;
        small_image_url: string;
        large_image_url: string;
      };
    };
    title: string;
  };
  url: string;
  votes: number;
}

export type PlatformType = {
  name: string
  url: string
}
export type LazySectionProps = {
  title: string;
  url: string;
  type?: "anime" | "manga"; // for "View All" link
}

export type CarouselSlideProps = {
  data: Anime[] | Manga[];
  type: "anime" | "manga";
}

export type Character = {
  mal_id: number;
  url: string;
  images: {
    jpg: {
      image_url: string;
      small_image_url?: string;
    };
    webp?: {
      image_url: string;
      small_image_url?: string;
    };
  };
  name: string;
  name_kanji?: string;
  nicknames?: string[];
  favorites: number;
  about?: string;
}

export type CharacterWithRole = {
  character: Character;
  role: string;
  voice_actors?: Array<{
    person: {
      mal_id: number;
      url: string;
      images?: { jpg?: { image_url: string } };
      name: string;
    };
    language: string;
  }>;
}

export type Person = {
  mal_id: number;
  url: string;
  images?: { jpg?: { image_url: string; small_image_url?: string } };
  name: string;
  given_name?: string;
  family_name?: string;
  alternate_names?: string[];
  birthday?: string;
  favorites: number;
  about?: string;
}

export type APIResponse<T> = {
  data: T;
  pagination?: {
    last_visible_page: number;
    has_next_page: boolean;
    current_page: number;
    items: {
      count: number;
      total: number;
      per_page: number;
    };
  };
}

export type APIListResponse<T> = {
  data: T[];
  pagination: {
    last_visible_page: number;
    has_next_page: boolean;
    current_page: number;
    items: {
      count: number;
      total: number;
      per_page: number;
    };
  };
}

export type Manga = {
  mal_id: number;
  url: string;
  images: {
    jpg: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
    webp: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
  };
  approved: boolean;
  titles: {
    type: string;
    title: string;
  }[];
  title: string;
  title_english: string;
  title_japanese: string;
  title_synonyms: string[];
  type: string;
  chapters: number;
  volumes: number;
  status: string;
  publishing: boolean;
  published: {
    from: string | null;
    to: string | null;
    prop: {
      from: {
        day: number | null;
        month: number | null;
        year: number | null;
      };
      to: {
        day: number | null;
        month: number | null;
        year: number | null;
      };
    };
    string: string;
  };
  score: number;
  scored: number;
  scored_by: number;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string;
  background: string | null;
  authors: {
    mal_id: number;
    type: string;
    name: string;
    url: string;
  }[];
  serializations: {
    mal_id: number;
    type: string;
    name: string;
    url: string;
  }[];
  genres: {
    mal_id: number;
    type: string;
    name: string;
    url: string;
  }[];

  themes: {
    mal_id: number;
    type: string;
    name: string;
    url: string;
  }[];

};

// ---- Types ----

export interface PersonImage {
    jpg?: { image_url?: string };
    webp?: { image_url?: string };
}

export interface PersonAnimeEntry {
    position: string;
    anime?: {
        title?: string;
        images?: { jpg?: { image_url?: string } };
    };
}

export interface PersonMangaEntry {
    position: string;
    manga?: {
        title?: string;
        images?: { jpg?: { image_url?: string } };
    };
}

export interface PersonVoiceEntry {
    role?: string;
    anime?: { title?: string };
    character?: {
        name?: string;
        images?: { jpg?: { image_url?: string } };
    };
}

export interface PersonDetails {
    mal_id: number;
    name: string;
    family_name?: string;
    given_name?: string;
    alternate_names?: string[];
    birthday?: string;
    favorites: number;
    about?: string;
    website_url?: string;
    images?: PersonImage;
    anime?: PersonAnimeEntry[];
    manga?: PersonMangaEntry[];
    voices?: PersonVoiceEntry[];
}
// export type CarouselSlideProps = {
//   data: Anime[] | Manga[];
//   type?: "anime" | "manga";
// };

