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
  imageUrl: string;
  genre: string;
  rating?: number;
  released?: string;
}
