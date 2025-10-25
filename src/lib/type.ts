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
