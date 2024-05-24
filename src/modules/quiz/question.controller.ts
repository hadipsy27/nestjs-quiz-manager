import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { QuestionService } from './question.service';
import { QuizService } from './quiz.service';

@Controller('question')
export class QuestionController {
  constructor(
    private questionService: QuestionService,
    private quizService: QuizService,
  ) {}

  @Post('create')
  @UsePipes(ValidationPipe)
  async saveQuestion(@Body() question: CreateQuestionDto) {
    const quiz = await this.quizService.getById(question.quizId);
    return await this.questionService.create(question, quiz);
  }
}
