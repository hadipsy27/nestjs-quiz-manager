import { OptionService } from '../service/option.service';
import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateOptionDto } from '../dto/create-option.dto';
import { QuestionService } from '../service/question.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Options')
@Controller('question/option')
export class OptionController {
  constructor(
    private optionService: OptionService,
    private questionService: QuestionService,
  ) {}

  @Post('create')
  @UsePipes(ValidationPipe)
  async saveOptionToQuestion(@Body() createOptionDto: CreateOptionDto) {
    const question = await this.questionService.findById(
      createOptionDto.questionId,
    );

    const option = await this.optionService.createOption(
      createOptionDto,
      question,
    );
    return { question, createOptionDto, option };
  }
}
