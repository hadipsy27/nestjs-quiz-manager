import { OptionService } from '../service/option.service';
import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateOptionDtoDto } from '../dto/create-option.dto';

@Controller('question/option')
export class OptionController {
  constructor(private optionService: OptionService) {}

  @Post('create')
  @UsePipes(ValidationPipe)
  async saveOptionToQuestion(@Body() createOptionDto: CreateOptionDtoDto) {
    return createOptionDto;
  }
}
