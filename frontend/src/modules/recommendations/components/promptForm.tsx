import { useState, type FC, type FormEvent } from 'react';

interface PromptFormProps {
  onSubmit: (prompt: string) => void;
  isPending: boolean;
}

const MAX_LENGTH = 500;

export const PromptForm: FC<PromptFormProps> = ({ onSubmit, isPending }) => {
  const [prompt, setPrompt] = useState('');

  const trimmed = prompt.trim();
  const isEmpty = trimmed.length === 0;
  const isTooLong = prompt.length > MAX_LENGTH;
  const isDisabled = isPending || isEmpty || isTooLong;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isDisabled) return;
    onSubmit(trimmed);
  };

  return (
    <div className="overflow-hidden rounded-lg border-2 border-cinema-gold/50 bg-cinema-dark shadow-[inset_0_2px_20px_rgba(0,0,0,0.4)]">
      <div className="lights-strip" />

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6">
        <label
          htmlFor="prompt"
          className="font-heading text-sm font-semibold uppercase tracking-widest text-cinema-ivory"
        >
          Cuéntame qué se te antoja ver
        </label>

        <textarea
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ej: una película de ciencia ficción con un giro filosófico, no muy larga…"
          rows={4}
          maxLength={MAX_LENGTH + 50}
          disabled={isPending}
          className="w-full resize-none rounded border border-cinema-gold-dim/40 bg-cinema-black/60 p-4 font-body text-base text-cinema-cream placeholder-cinema-muted/50 outline-none transition focus:border-cinema-gold/60 disabled:opacity-50"
        />

        <div className="flex items-center justify-between">
          <span
            className={`font-mono text-xs ${
              isTooLong ? 'text-cinema-red' : 'text-cinema-muted'
            }`}
          >
            {prompt.length} / {MAX_LENGTH}
          </span>

          <button
            type="submit"
            disabled={isDisabled}
            className="btn-gold rounded bg-cinema-gold px-6 py-2.5 font-heading text-sm font-semibold uppercase tracking-widest text-cinema-black disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isPending ? 'Generando…' : 'Recomendar'}
          </button>
        </div>
      </form>

      <div className="lights-strip" />
    </div>
  );
};
