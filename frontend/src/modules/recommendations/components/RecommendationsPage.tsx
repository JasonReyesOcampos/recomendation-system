import type { FC } from 'react';
import { useRecommendations } from '../hooks/useRecommendations';
import { PromptForm } from './promptForm';
import { MovieGrid } from './movieGrid';

const MARQUEE_TEXT =
  '★ NOW SHOWING ★ RECOMENDACIONES ★ TONIGHT ONLY ★ ESTRENO MUNDIAL ★ CARTELERA ESPECIAL ★ FUNCIONES SELECTAS ★ ';

export const RecommendationsPage: FC = () => {
  const { movies, isPending, error, generate, reset } = useRecommendations();

  return (
    <main className="min-h-screen">
      {/* ── Marquee Banner ───────────────────────── */}
      <div className="marquee-banner">
        <div className="lights-strip" />
        <div className="overflow-hidden py-3">
          <div className="marquee-track">
            <span className="font-mono text-sm tracking-[0.25em] text-cinema-gold px-4">
              {MARQUEE_TEXT}
            </span>
            <span className="font-mono text-sm tracking-[0.25em] text-cinema-gold px-4">
              {MARQUEE_TEXT}
            </span>
          </div>
        </div>
        <div className="lights-strip" />
      </div>

      {/* ── Content ──────────────────────────────── */}
      <div className="mx-auto flex max-w-5xl flex-col gap-10 px-6 py-14">
        {/* Ornament top */}
        <div className="ornament text-sm">◆</div>

        {/* Header */}
        <header className="flex flex-col items-center gap-4 text-center">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.4em] text-cinema-gold">
            Recommendation System
          </p>
          <h1 className="golden-shimmer font-heading text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            ¿Qué quieres ver hoy?
          </h1>
          <p className="max-w-lg text-base italic text-cinema-muted">
            Describe lo que se te antoja y te recomendamos entre 3 y 5 películas
            hechas a medida.
          </p>
        </header>

        {/* Form */}
        <PromptForm onSubmit={generate} isPending={isPending} />

        {/* Error */}
        {error && (
          <div className="flex items-start justify-between gap-4 rounded-lg border border-cinema-red/40 bg-cinema-red-dark/30 p-5">
            <div className="flex flex-col gap-1">
              <p className="font-heading text-sm font-semibold text-cinema-cream/90">
                Proyección interrumpida
              </p>
              <p className="text-sm text-cinema-cream/60">
                No pudimos generar las recomendaciones. Inténtalo de nuevo en un
                momento.
              </p>
            </div>
            <button
              type="button"
              onClick={reset}
              className="shrink-0 font-mono text-xs uppercase tracking-wider text-cinema-cream/40 transition hover:text-cinema-cream"
            >
              Cerrar
            </button>
          </div>
        )}

        {/* Loading */}
        {isPending && (
          <div className="relative overflow-hidden rounded-lg border border-cinema-gold-dim/30 bg-cinema-dark px-12 py-10 text-center">
            <div className="film-perfs film-perfs-left" />
            <div className="film-perfs film-perfs-right" />
            <div className="projector-flicker">
              <p className="font-heading text-2xl font-semibold tracking-widest text-cinema-gold sm:text-3xl">
                PROYECTANDO
              </p>
              <p className="mt-3 font-mono text-xs tracking-wider text-cinema-muted">
                Buscando las mejores películas para ti…
              </p>
            </div>
          </div>
        )}

        {/* Results divider */}
        {movies.length > 0 && <div className="ornament text-sm">◆</div>}

        {/* Grid */}
        <MovieGrid movies={movies} />

        {/* Footer ornament */}
        {movies.length > 0 && (
          <div className="ornament mt-4 text-sm">★</div>
        )}
      </div>
    </main>
  );
};
