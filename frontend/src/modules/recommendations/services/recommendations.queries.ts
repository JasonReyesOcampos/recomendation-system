import { useMutation } from '@tanstack/react-query';
import { createRecommendations } from './recommendations.api';

export const RECOMMENDATIONS_KEYS = {
  all: ['recommendations'] as const,
};

export const useCreateRecommendations = () => {
  return useMutation({
    mutationKey: RECOMMENDATIONS_KEYS.all,
    mutationFn: createRecommendations,
  });
};
