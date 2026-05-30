import { useMemo, type FC } from 'react';
import type { MovieRecommendation } from '../types/recommendations.types';
import { enrichWithAvailability } from '../utils/availability.utils';
import { MovieCard } from './movieCard';

interface MovieGridProps {
  movies: MovieRecommendation[];
}

export const MovieGrid: FC<MovieGridProps> = ({ movies }) => {
  const enriched = useMemo(
    () => movies.map((m) => enrichWithAvailability(m)),
    [movies],
  );

  if (enriched.length === 0) return null;

  return (
    <section
      aria-label="Películas recomendadas"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {enriched.map((movie, index) => (
        <MovieCard
          key={`${movie.title}-${movie.year}`}
          movie={movie}
          availability={movie.availability}
          index={index}
        />
      ))}
    </section>
  );
};
