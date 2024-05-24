import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateQuestionDto } from './dto/create-question.dto';
import { QuestionRespository } from './question.respository';
import { Question } from './question.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: QuestionRespository,
  ) {}

  async create(createQuestionDto: CreateQuestionDto) {
    return await this.questionRepository.save(createQuestionDto);
  }
}
