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
  genres?: { name: string }[];
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

export type CarouselSlideProps = {
  data: Anime[] | Manga[];
  type: "anime" | "manga";
};

