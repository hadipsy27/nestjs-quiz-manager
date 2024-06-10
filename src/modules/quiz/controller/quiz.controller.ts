import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { QuizService } from '../service/quiz.service';
import { CreateQuizDto } from '../dto/create-quiz.dto';
import { Quiz } from '../entity/quiz.entity';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('quiz')
export class QuizController {
  constructor(private quizService: QuizService) {}

  @Get('/')
  async getAllQuiz(): Promise<Quiz[]> {
    return await this.quizService.getAll();
  }

  @Get(':id')
  async getQuizById(@Param('id', ParseIntPipe) id: number): Promise<Quiz> {
    return await this.quizService.getById(id);
  }

  @Post('/create')
  @UsePipes(ValidationPipe)
  async createQuiz(@Body() createQuizDto: CreateQuizDto) {
    return await this.quizService.createNewQuiz(createQuizDto);
  }
}
