import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { Quiz } from './quiz.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private quizRepository: Repository<Quiz>,
  ) {}

  getAll() {
    return this.quizRepository.find();
  }

  async createNewQuiz(createQuizDto: CreateQuizDto) {
    return await this.quizRepository.save(createQuizDto);
  }
}
