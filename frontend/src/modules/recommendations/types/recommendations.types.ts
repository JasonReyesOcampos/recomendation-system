export interface MovieRecommendation {
  title: string;
  year: number;
  genre: string;
  runtimeMinutes: number;
  director: string;
  mainCast: string[];
  synopsis: string;
  similarTo: string[];
  justification: string;
}

export interface RecommendationsResponse {
  recommendations: MovieRecommendation[];
}

export interface CreateRecommendationDto {
  prompt: string;
}
