import type { FC } from 'react';
import type { MovieRecommendation } from '../types/recommendations.types';
import { MovieCard } from './movieCard';

interface MovieGridProps {
  movies: MovieRecommendation[];
}

export const MovieGrid: FC<MovieGridProps> = ({ movies }) => {
  if (movies.length === 0) return null;

  return (
    <section
      aria-label="Películas recomendadas"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {movies.map((movie) => (
        <MovieCard key={`${movie.title}-${movie.year}`} movie={movie} />
      ))}
    </section>
  );
};
