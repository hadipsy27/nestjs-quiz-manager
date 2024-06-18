import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateQuizDto } from '../dto/create-quiz.dto';
import { Quiz } from '../entity/quiz.entity';
import { Repository } from 'typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { UserService } from '../../user/user.service';
import { CreateQuizResponseDto } from '../dto/response/create-quiz-response.dto';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private quizRepository: Repository<Quiz>,
    private userService: UserService,
  ) {}

  async getAll(): Promise<Quiz[]> {
    return await this.quizRepository
      .createQueryBuilder('q')
      .leftJoinAndSelect('q.questions', 'qt')
      .leftJoinAndSelect('qt.options', 'o')
      .take(1)
      .getMany();
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<Quiz>> {
    const queryBuilder = this.quizRepository.createQueryBuilder('q');
    queryBuilder.orderBy('q.id', 'DESC');

    return paginate<Quiz>(queryBuilder, options);
  }

  async getById(id: number) {
    const quiz = await this.quizRepository.findOne({
      where: { id },
      relations: ['questions', 'questions.options'],
    });
    if (!quiz) throw new NotFoundException('Quiz not found');

    return quiz;
  }

  async createNewQuiz(
    createQuizDto: CreateQuizDto,
    userId: number,
  ): Promise<CreateQuizResponseDto> {
    const userById = await this.userService.getUserById(userId);
    console.log('userById ' + userById);

    if (!userById) {
      throw new NotFoundException('User not found');
    }

    const quiz = new Quiz();
    quiz.title = createQuizDto.title;
    quiz.description = createQuizDto.description;
    quiz.users = [userById];
    console.log('quiz ' + quiz);

    const result = await this.quizRepository.save(quiz);

    const { id, title, description, users } = result;
    const createQuizResponseDto = new CreateQuizResponseDto();
    createQuizResponseDto.id = id;
    createQuizResponseDto.title = title;
    createQuizResponseDto.description = description;
    createQuizResponseDto.user = users
      ? {
          id: userById.id,
          name: userById.name,
          email: userById.email,
          role: userById.role,
        }
      : null;
    return createQuizResponseDto;
  }
}
