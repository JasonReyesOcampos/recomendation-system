import { useCreateRecommendations } from '../services/recommendations.queries';
import type { MovieRecommendation } from '../types/recommendations.types';

interface UseRecommendationsResult {
  movies: MovieRecommendation[];
  isPending: boolean;
  error: Error | null;
  generate: (prompt: string) => void;
  reset: () => void;
}

/**
 * Orquesta la generación de recomendaciones.
 * Aísla al componente de la implementación de React Query: expone solo
 * el estado y las acciones que la UI necesita.
 */
export const useRecommendations = (): UseRecommendationsResult => {
  const { mutate, data, isPending, error, reset } = useCreateRecommendations();

  return {
    movies: data?.recommendations ?? [],
    isPending,
    error,
    generate: (prompt: string) => mutate({ prompt }),
    reset,
  };
};
