export interface Link {
  id: string;
  title: string;
  url: string;
  category: string;
  clickCount: number;
  createdAt: Date;
  favicon?: string;
}

export interface Series {
  id: string;
  title: string;
  currentSeason: number;
  currentEpisode: number;
  totalSeasons?: number;
  totalEpisodes?: number;
  url: string;
  lastWatched: Date;
  clickCount: number;
  poster?: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
}