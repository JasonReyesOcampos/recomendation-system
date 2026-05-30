import type { MovieRecommendation } from '../types/recommendations.types';

export type AvailabilityStatus = 'now_showing' | 'coming_soon' | 'sold_out';

export interface Availability {
  status: AvailabilityStatus;
  room: string | null;
  showtimes: string[] | null;
  daysUntil: number | null;
}

export interface EnrichedMovie extends MovieRecommendation {
  availability: Availability;
}

const ROOMS = [
  'Sala 1',
  'Sala 2',
  'Sala 3 - IMAX',
  'Sala 4 - VIP',
  'Sala 5 - 4DX',
];

const pick = <T>(arr: readonly T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];

const randomInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const generateShowtimes = (): string[] => {
  const count = randomInt(3, 4);
  const slots: number[] = [];

  while (slots.length < count) {
    const hour = randomInt(13, 23);
    const minute = Math.random() < 0.5 ? 0 : 30;
    const total = hour * 60 + minute;
    if (total > 23 * 60 + 30) continue;
    if (!slots.includes(total)) slots.push(total);
  }

  return slots.sort((a, b) => a - b).map((t) => {
    const h = Math.floor(t / 60);
    const m = t % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  });
};

const pickStatus = (): AvailabilityStatus => {
  const roll = Math.random();
  if (roll < 0.55) return 'now_showing';
  if (roll < 0.85) return 'coming_soon';
  return 'sold_out';
};

export const enrichWithAvailability = (
  movie: MovieRecommendation,
): EnrichedMovie => {
  const status = pickStatus();

  switch (status) {
    case 'now_showing':
      return {
        ...movie,
        availability: {
          status,
          room: pick(ROOMS),
          showtimes: generateShowtimes(),
          daysUntil: null,
        },
      };

    case 'coming_soon':
      return {
        ...movie,
        availability: {
          status,
          room: null,
          showtimes: null,
          daysUntil: randomInt(3, 21),
        },
      };

    case 'sold_out':
      return {
        ...movie,
        availability: {
          status,
          room: null,
          showtimes: null,
          daysUntil: null,
        },
      };
  }
};
