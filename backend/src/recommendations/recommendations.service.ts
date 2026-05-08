import { Injectable, InternalServerErrorException } from '@nestjs/common';
import OpenAI from 'openai';
import {
  MovieRecommendation,
  MovieWithoutImage,
  RecommendationsResponse,
} from './recommendations.types';

@Injectable()
export class RecommendationsService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

  async getRecommendations(prompt: string): Promise<RecommendationsResponse> {
    if (!process.env.OPENAI_API_KEY) {
      throw new InternalServerErrorException(
        'OPENAI_API_KEY is not configured',
      );
    }

    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        response_format: { type: 'json_object' },
        messages: [
          {
            role: 'system',
            content: `You are a movie recommendation expert. When given user preferences, respond ONLY with a valid JSON object in this exact format:
{
  "recommendations": [
    {
      "title": "Movie Title",
      "year": 2020,
      "genre": "Drama",
      "synopsis": "Brief synopsis in 1-2 sentences.",
      "justification": "Why this matches the user preferences."
    }
  ]
}
Provide between 3 and 5 recommendations.`,
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
      });

      const content = completion.choices[0].message.content ?? '{}';
      const { recommendations } = JSON.parse(content) as {
        recommendations: MovieWithoutImage[];
      };

      const moviesWithImages: MovieRecommendation[] = await Promise.all(
        recommendations.map(async (movie) => ({
          ...movie,
          imageUrl: await this.generatePoster(movie.title, movie.year, movie.genre),
        })),
      );

      return { recommendations: moviesWithImages };
    } catch (error) {
      console.error('[OpenAI Error]', error);
      throw new InternalServerErrorException(
        error instanceof Error
          ? error.message
          : 'Failed to generate recommendations.',
      );
    }
  }

  private async generatePoster(
    title: string,
    year: number,
    genre: string,
  ): Promise<string> {
    try {
      const response = await this.openai.images.generate({
        model: 'dall-e-2',
        prompt: `Cinematic movie poster for "${title}" (${year}), ${genre} genre. Professional Hollywood-style poster with dramatic lighting and composition. No text.`,
        n: 1,
        size: '512x512',
      });
      return response.data?.[0]?.url ?? '';
    } catch {
      return '';
    }
  }
}
