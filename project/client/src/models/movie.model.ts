export interface MovieData {
    data: MovieModel[];
}

export interface MovieModel {
  title: string;
  description?: string;
  language: string[];
  duration: string;
  genre: string;
  releaseDate: string | Date;
  posterPath: string;
  rating?: number;
  _id: string;
}
