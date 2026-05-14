import { Injectable, InternalServerErrorException } from '@nestjs/common';
import OpenAI from 'openai';
import {
  MovieRecommendation,
  RecommendationsResponse,
} from './recommendations.types';

const OPENCODE_BASE_URL = 'https://opencode.ai/zen/v1';
const DEFAULT_MODEL = 'deepseek-v4-flash-free';

@Injectable()
export class RecommendationsService {
  private readonly openai: OpenAI;
  private readonly model: string;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENCODE_API_KEY,
      baseURL: OPENCODE_BASE_URL,
    });
    this.model = process.env.OPENCODE_MODEL ?? DEFAULT_MODEL;
  }

  async getRecommendations(prompt: string): Promise<RecommendationsResponse> {
    if (!process.env.OPENCODE_API_KEY) {
      throw new InternalServerErrorException(
        'OPENCODE_API_KEY is not configured',
      );
    }

    try {
      const completion = await this.openai.chat.completions.create({
        model: this.model,
        response_format: { type: 'json_object' },
        messages: [
          {
            role: 'system',
            content: this.buildSystemPrompt(),
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
      });

      const content = completion.choices[0].message.content ?? '{}';
      const parsed = JSON.parse(content) as {
        recommendations: MovieRecommendation[];
      };

      return { recommendations: parsed.recommendations };
    } catch (error) {
      console.error('[Recommendations Error]', error);
      throw new InternalServerErrorException(
        error instanceof Error
          ? error.message
          : 'Failed to generate recommendations.',
      );
    }
  }

  private buildSystemPrompt(): string {
    return `You are a film expert and recommendation curator. When given user preferences, respond ONLY with a valid JSON object in this EXACT format. No prose, no markdown fences, no commentary.

{
  "recommendations": [
    {
      "title": "Movie Title",
      "year": 2014,
      "genre": "Drama",
      "runtimeMinutes": 169,
      "director": "Director Full Name",
      "mainCast": ["Actor One", "Actor Two", "Actor Three"],
      "synopsis": "Two or three sentences describing the plot without spoilers.",
      "similarTo": ["Other Movie (Year)", "Another Movie (Year)"],
      "justification": "One sentence in Spanish explaining why this matches the user's request."
    }
  ]
}

Rules:
- Provide between 3 and 5 recommendations.
- "title" must be the original/most known title.
- "year" must be the release year as a number.
- "genre" is the primary genre (single category).
- "runtimeMinutes" is approximate duration in minutes (integer).
- "director" is the main director (or first if multiple).
- "mainCast" lists 2 to 3 principal actors.
- "synopsis" is in Spanish, spoiler-free, 2-3 sentences.
- "similarTo" lists 1-3 well-known films a viewer might already know, in "Title (Year)" format.
- "justification" is in Spanish, addresses the user's prompt directly.
- All movies must really exist. Do not invent titles, directors, or actors.`;
  }
}
