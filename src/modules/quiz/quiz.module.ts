import { Module } from '@nestjs/common';
import { QuizController } from './controller/quiz.controller';
import { QuizService } from './service/quiz.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from './entity/quiz.entity';
import { QuestionController } from './controller/question.controller';
import { QuestionService } from './service/question.service';
import { Question } from './entity/question.entity';
import { OptionController } from './controller/option.controller';
import { OptionService } from './service/option.service';
import { OptionRepository } from './repositories/option.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Quiz, Question, OptionRepository])],
  controllers: [QuizController, QuestionController, OptionController],
  providers: [QuizService, QuestionService, OptionService],
})
export class QuizModule {}
