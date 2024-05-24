import { Repository } from 'typeorm';
import { Question } from './question.entity';

export interface QuestionRespository extends Repository<Question> {}
