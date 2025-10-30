export type AnimeData = {
  title: string;
  type: string;
  episodes: number;
  status: string;
  picture?: string;
  thumbnail?: string;
  duration?: {
    value: number;
    unit: string;
  };
  score?: {
    arithmeticGeometricMean?: number;
    arithmeticMean?: number;
    median?: number;
  };
  animeSeason?: {
    season?: string;
    year?: number;
  };
  synonyms?: string[];
  studios?: string[];
  producers?: string[];
  relatedAnime?: string[];
  tags?: string[];
  sources?: string[];
}

export type HeroSectionData= {
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
  trailer: {
    youtube_id: string | null;
    url: string | null;
    embed_url: string | null;
    images: {
      image_url: string | null;
      small_image_url: string | null;
      medium_image_url: string | null;
      large_image_url: string | null;
      maximum_image_url: string | null;
    };
  };
  approved: boolean;
  titles: {
    type: string;
    title: string;
  }[];
  title: string;
  title_english: string | null;
  title_japanese: string | null;
  title_synonyms: string[];
  type: string;
  source: string;
  episodes: number | null;
  status: string;
  airing: boolean;
  aired: {
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
  duration: string | null;
  rating: string | null;
  score: number | null;
  scored_by: number | null;
  rank: number | null;
  popularity: number | null;
  members: number | null;
  favorites: number | null;
  synopsis: string | null;
  background: string | null;
  season: string | null;
  year: number | null;
  broadcast: {
    day: string | null;
    time: string | null;
    timezone: string | null;
    string: string | null;
  };
}

export type Anime = {
  mal_id: number;
  title: string;
  title_english?: string | null;
  title_japanese?: string | null;
  synopsis?: string | null;
  background?: string | null;

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
  studios?: {name:string}[];
  genres?: {name:string}[];
  producers?:{name:string}[] ;
  relatedAnime?: string[];
};

