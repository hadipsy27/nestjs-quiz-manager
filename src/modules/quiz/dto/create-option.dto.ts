import { IsNotEmpty, Length } from 'class-validator';

export class CreateOptionDtoDto {
  @IsNotEmpty()
  @Length(3, 255)
  text: string;

  @IsNotEmpty()
  questionId: number;

  @IsNotEmpty()
  isCorrect: boolean;
}
