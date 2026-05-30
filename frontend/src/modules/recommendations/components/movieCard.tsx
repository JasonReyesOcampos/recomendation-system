import type { FC } from 'react';
import type { MovieRecommendation } from '../types/recommendations.types';
import type { Availability } from '../utils/availability.utils';

interface MovieCardProps {
  movie: MovieRecommendation;
  availability: Availability;
  index: number;
}

const formatRuntime = (minutes: number): string => {
  if (!Number.isFinite(minutes) || minutes <= 0) return '';
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins} min`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}min`;
};

/* ── Status Badge ───────────────────────────────── */

const StatusBadge: FC<{ availability: Availability }> = ({ availability }) => {
  const { status, daysUntil } = availability;

  switch (status) {
    case 'now_showing':
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-900/70 px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-widest text-emerald-300 ring-1 ring-emerald-700/50">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
          En cartelera
        </span>
      );

    case 'coming_soon':
      return (
        <span className="rounded-full bg-indigo-900/60 px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-widest text-indigo-300 ring-1 ring-indigo-700/50">
          En {daysUntil} días
        </span>
      );

    case 'sold_out':
      return null;
  }
};

/* ── Sold Out Stamp ─────────────────────────────── */

const SoldOutStamp: FC = () => (
  <div className="pointer-events-none absolute right-5 top-6 z-10 -rotate-12">
    <span className="inline-block rounded border-[3px] border-double border-red-600/80 px-4 py-1.5 font-heading text-lg font-black uppercase tracking-[0.25em] text-red-500/90">
      Agotada
    </span>
  </div>
);

/* ── Availability Details ───────────────────────── */

const AvailabilityDetails: FC<{ availability: Availability }> = ({
  availability,
}) => {
  const { status, room, showtimes, daysUntil } = availability;

  switch (status) {
    case 'now_showing':
      return (
        <div className="flex flex-col gap-2.5 rounded border border-cinema-gold-dim/20 bg-cinema-black/30 p-3.5">
          {room && (
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-cinema-muted">
              {room}
            </p>
          )}
          {showtimes && (
            <div className="flex flex-wrap gap-1.5">
              {showtimes.map((time) => (
                <span
                  key={time}
                  className="rounded bg-cinema-gold-dim/25 px-2.5 py-1 font-mono text-xs text-cinema-cream/80"
                >
                  {time}
                </span>
              ))}
            </div>
          )}
        </div>
      );

    case 'coming_soon':
      return (
        <div className="flex items-center gap-2 rounded border border-indigo-800/30 bg-indigo-950/20 p-3.5 text-xs text-indigo-300/80">
          <svg
            className="h-3.5 w-3.5 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <span>
            Estrena en{' '}
            <strong className="text-indigo-200">{daysUntil} días</strong>
          </span>
        </div>
      );

    case 'sold_out':
      return (
        <p className="rounded border border-red-900/20 bg-red-950/10 p-3.5 text-xs text-cinema-muted/60">
          Sin funciones disponibles
        </p>
      );
  }
};

/* ── Movie Card ─────────────────────────────────── */

export const MovieCard: FC<MovieCardProps> = ({
  movie,
  availability,
  index,
}) => {
  const runtime = formatRuntime(movie.runtimeMinutes);
  const cast = movie.mainCast?.filter(Boolean) ?? [];
  const similar = movie.similarTo?.filter(Boolean) ?? [];

  return (
    <article
      className="card-enter movie-card relative flex h-full flex-col gap-5 rounded-lg border border-cinema-gold/30 bg-cinema-panel p-7"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {/* Sold out stamp */}
      {availability.status === 'sold_out' && <SoldOutStamp />}

      {/* Top row: genre + status badge */}
      <div className="flex items-start justify-between gap-2">
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-cinema-gold">
          ✦ {movie.genre} ✦
        </span>
        <StatusBadge availability={availability} />
      </div>

      {/* Title */}
      <h3 className="text-center font-heading text-2xl font-bold leading-tight text-cinema-cream">
        {movie.title}
      </h3>

      {/* Year · Runtime */}
      <p className="text-center font-mono text-xs uppercase tracking-wider text-cinema-muted">
        {movie.year}
        {runtime && <> · {runtime}</>}
      </p>

      {/* Availability details */}
      <AvailabilityDetails availability={availability} />

      {/* Ornament */}
      <div className="ornament text-[0.5rem]">◆</div>

      {/* Director & Cast */}
      {(movie.director || cast.length > 0) && (
        <dl className="flex flex-col gap-2.5 text-sm">
          {movie.director && (
            <div>
              <dt className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-cinema-gold-dim">
                Dirección
              </dt>
              <dd className="mt-0.5 text-cinema-ivory">{movie.director}</dd>
            </div>
          )}
          {cast.length > 0 && (
            <div>
              <dt className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-cinema-gold-dim">
                Reparto
              </dt>
              <dd className="mt-0.5 text-cinema-ivory">{cast.join(', ')}</dd>
            </div>
          )}
        </dl>
      )}

      {/* Synopsis */}
      <p className="text-sm italic leading-relaxed text-cinema-ivory/80">
        {movie.synopsis}
      </p>

      {/* Similar */}
      {similar.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-cinema-gold-dim">
            Si te gustó
          </p>
          <ul className="flex flex-wrap gap-1.5">
            {similar.map((title) => (
              <li
                key={title}
                className="rounded-full border border-cinema-gold-dim/40 bg-cinema-black/40 px-3 py-1 text-xs text-cinema-muted"
              >
                {title}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Justification */}
      <div className="mt-auto border-t border-cinema-gold-dim/25 pt-4">
        <p className="text-xs italic leading-relaxed text-cinema-gold/60">
          {movie.justification}
        </p>
      </div>
    </article>
  );
};
