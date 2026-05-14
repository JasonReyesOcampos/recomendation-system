import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateRecommendationDto {
  @IsString()
  @IsNotEmpty({ message: 'El prompt no puede estar vacío' })
  @MaxLength(500, { message: 'El prompt no puede superar los 500 caracteres' })
  prompt!: string;
}
