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

export type AnimeRecommendationItem= {
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
export type LazySectionProps= {
  title: string;
  url: string;
  type?: string; // for "View All" link
 
}