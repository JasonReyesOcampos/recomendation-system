export type MovieRecommendation = {
  title: string;
  year: number;
  genre: string;
  synopsis: string;
  justification: string;
  imageUrl: string;
};

export type RecommendationsResponse = {
  recommendations: MovieRecommendation[];
};

export type MovieWithoutImage = Omit<MovieRecommendation, 'imageUrl'>;
