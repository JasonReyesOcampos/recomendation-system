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
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <label htmlFor="prompt" className="text-sm text-neutral-400">
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
        className="w-full resize-none rounded-lg border border-neutral-800 bg-neutral-900 p-4 text-base text-neutral-100 placeholder-neutral-600 outline-none transition focus:border-neutral-600 disabled:opacity-50"
      />
      <div className="flex items-center justify-between">
        <span
          className={`text-xs ${
            isTooLong ? 'text-red-400' : 'text-neutral-500'
          }`}
        >
          {prompt.length} / {MAX_LENGTH}
        </span>
        <button
          type="submit"
          disabled={isDisabled}
          className="rounded-lg bg-neutral-100 px-5 py-2 text-sm font-medium text-neutral-900 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isPending ? 'Generando…' : 'Recomendar'}
        </button>
      </div>
    </form>
  );
};
