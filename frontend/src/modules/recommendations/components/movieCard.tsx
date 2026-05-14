import type { FC } from 'react';
import type { MovieRecommendation } from '../types/recommendations.types';

interface MovieCardProps {
  movie: MovieRecommendation;
}

const formatRuntime = (minutes: number): string => {
  if (!Number.isFinite(minutes) || minutes <= 0) return '';
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins} min`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}min`;
};

export const MovieCard: FC<MovieCardProps> = ({ movie }) => {
  const runtime = formatRuntime(movie.runtimeMinutes);
  const cast = movie.mainCast?.filter(Boolean) ?? [];
  const similar = movie.similarTo?.filter(Boolean) ?? [];

  return (
    <article className="flex h-full flex-col gap-4 rounded-xl border border-neutral-800 bg-neutral-900/60 p-6 transition hover:border-neutral-700 hover:bg-neutral-900">
      <header className="flex flex-col gap-2">
        <h3 className="text-xl font-semibold leading-tight text-neutral-50">
          {movie.title}
        </h3>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs uppercase tracking-wider text-neutral-500">
          <span>{movie.year}</span>
          <span className="text-neutral-700">·</span>
          <span>{movie.genre}</span>
          {runtime && (
            <>
              <span className="text-neutral-700">·</span>
              <span>{runtime}</span>
            </>
          )}
        </div>
      </header>

      {(movie.director || cast.length > 0) && (
        <dl className="flex flex-col gap-1.5 text-sm">
          {movie.director && (
            <div className="flex gap-2">
              <dt className="shrink-0 text-neutral-500">Dirección</dt>
              <dd className="text-neutral-200">{movie.director}</dd>
            </div>
          )}
          {cast.length > 0 && (
            <div className="flex gap-2">
              <dt className="shrink-0 text-neutral-500">Reparto</dt>
              <dd className="text-neutral-200">{cast.join(', ')}</dd>
            </div>
          )}
        </dl>
      )}

      <p className="text-sm leading-relaxed text-neutral-300">
        {movie.synopsis}
      </p>

      {similar.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-xs uppercase tracking-wider text-neutral-500">
            Si te gustó
          </p>
          <ul className="flex flex-wrap gap-1.5">
            {similar.map((title) => (
              <li
                key={title}
                className="rounded-full border border-neutral-800 bg-neutral-950 px-3 py-1 text-xs text-neutral-300"
              >
                {title}
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="mt-auto border-t border-neutral-800 pt-3 text-xs italic leading-relaxed text-neutral-400">
        {movie.justification}
      </p>
    </article>
  );
};
