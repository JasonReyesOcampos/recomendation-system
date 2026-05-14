import type { FC } from 'react';
import { useRecommendations } from '../hooks/useRecommendations';
import { PromptForm } from './promptForm';
import { MovieGrid } from './movieGrid';

export const RecommendationsPage: FC = () => {
  const { movies, isPending, error, generate, reset } = useRecommendations();

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 px-6 py-12">
        <header className="flex flex-col gap-2">
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
            Recommendation System
          </p>
          <h1 className="text-3xl font-semibold text-neutral-50 sm:text-4xl">
            ¿Qué quieres ver hoy?
          </h1>
          <p className="text-sm text-neutral-400">
            Describe lo que se te antoja y te recomendamos entre 3 y 5 películas
            hechas a medida.
          </p>
        </header>

        <PromptForm onSubmit={generate} isPending={isPending} />

        {error && (
          <div
            role="alert"
            className="flex items-start justify-between gap-4 rounded-lg border border-red-900/50 bg-red-950/30 p-4 text-sm text-red-300"
          >
            <span>
              No pudimos generar las recomendaciones. Inténtalo de nuevo en un
              momento.
            </span>
            <button
              type="button"
              onClick={reset}
              className="text-xs uppercase tracking-wider text-red-200 hover:text-red-100"
            >
              Cerrar
            </button>
          </div>
        )}

        {isPending && (
          <p className="text-sm text-neutral-500">
            Pensando en las mejores opciones y generando pósters…
          </p>
        )}

        <MovieGrid movies={movies} />
      </div>
    </main>
  );
};
