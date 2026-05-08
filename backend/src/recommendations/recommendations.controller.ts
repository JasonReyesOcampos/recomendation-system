import { Controller, Post, Body } from '@nestjs/common';
import { RecommendationsService } from './recommendations.service';
import { CreateRecommendationDto } from './dto/create-recommendation.dto';

@Controller('recommendations')
export class RecommendationsController {
  constructor(
    private readonly recommendationsService: RecommendationsService,
  ) {}

  @Post()
  getRecommendations(@Body() dto: CreateRecommendationDto) {
    return this.recommendationsService.getRecommendations(dto.prompt);
  }
}
