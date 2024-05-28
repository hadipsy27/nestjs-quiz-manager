import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOptionDto } from '../dto/create-option.dto';
import { Question } from '../entity/question.entity';
import { Option } from '../entity/option.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OptionService {
  constructor(
    @InjectRepository(Option)
    private optionRepository: Repository<Option>,
  ) {}

  async createOption(createOption: CreateOptionDto, question: Question) {
    const newOption = await this.optionRepository.save({
      text: createOption.text,
      isCorrect: createOption.isCorrect,
    });

    question.options = [...question.options, newOption];

    await question.save();
    return newOption;
  }
}
