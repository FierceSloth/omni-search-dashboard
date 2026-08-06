export interface IGameCardDTO {
  id: number;
  name: string;
  background_image: string;
  released: string;
  rating: number;
  genres: Array<{ name: string }>;
}

export interface IGameCardEntity {
  id: number;
  title: string;
  imageUrl?: string;
  description?: string;
  badge?: string;
  info?: string;
}

export interface IGameDetailsDTO {
  id: number;
  name: string;
  description_raw: string;
  background_image: string;
  rating: number;
  released: string;
  genres: Array<{ name: string }>;
  developers: Array<{ name: string }>;
  website: string;
}

export interface IGameDetailsEntity {
  id: number;
  title: string;
  imageUrl?: string;
  description?: string;
  subtitle?: string;
  metadata?: string[];
  tags?: string[];
  website?: string;
}
