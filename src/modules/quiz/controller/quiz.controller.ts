import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { QuizService } from '../service/quiz.service';
import { CreateQuizDto } from '../dto/create-quiz.dto';
import { Quiz } from '../entity/quiz.entity';
import { ApiTags } from '@nestjs/swagger';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { ApiPaginatedResponse } from '../../../config/swagger/decorator/api-paginated.response.decorator.config';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Quiz')
@UseGuards(AuthGuard('jwt'))
@Controller('quiz')
export class QuizController {
  constructor(private quizService: QuizService) {}

  @Get('/')
  @ApiPaginatedResponse(Quiz)
  async getAllQuiz(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ): Promise<Pagination<Quiz>> {
    const options: IPaginationOptions = {
      limit,
      page,
    };
    return await this.quizService.paginate(options);
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
