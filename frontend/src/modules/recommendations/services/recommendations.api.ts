import { api } from '@modules/shared/lib/api';
import type {
  CreateRecommendationDto,
  RecommendationsResponse,
} from '../types/recommendations.types';

export const createRecommendations = async (
  payload: CreateRecommendationDto,
): Promise<RecommendationsResponse> => {
  const { data } = await api.post<RecommendationsResponse>(
    '/recommendations',
    payload,
  );
  return data;
};
