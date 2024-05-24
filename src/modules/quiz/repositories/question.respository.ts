import { Repository } from 'typeorm';
import { Question } from '../entity/question.entity';

export interface QuestionRespository extends Repository<Question> {}
