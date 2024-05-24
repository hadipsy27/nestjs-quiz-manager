import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { QuestionService } from './question.service';

@Controller('question')
export class QuestionController {
  constructor(private questionService: QuestionService) {}

  @Post('create')
  @UsePipes(ValidationPipe)
  saveQuestion(@Body() question: CreateQuestionDto) {
    return this.questionService.create(question);
  }
}
