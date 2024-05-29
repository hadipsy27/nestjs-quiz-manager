import { HttpStatus, ValidationPipe } from '@nestjs/common';

const PASSWORD_RULE = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;

const PASSWORD_RULE_MESSAGE =
  'Password wajib memiliki setidaknya satu simbol, satu angka, dan satu huruf kapital.';

const VALIDATION_PIPE = new ValidationPipe({
  errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
});

export const REGEX = {
  PASSWORD_RULE,
};

export const MESSAGE = {
  PASSWORD_RULE_MESSAGE,
};

export const SETTINGS = {
  VALIDATION_PIPE,
};
