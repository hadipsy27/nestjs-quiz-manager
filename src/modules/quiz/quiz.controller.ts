import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';

@Controller('quiz')
export class QuizController {
  constructor(private quizService: QuizService){};

  @Get('/')
  getAllQuiz(){
    return this.quizService.getAll();
  }

  @Post('create')
  @UsePipes(ValidationPipe)
  createQuiz(@Body() createQuizDto: CreateQuizDto){
    return { data: createQuizDto }
  }
}
