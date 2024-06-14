import { HttpException, HttpStatus } from '@nestjs/common';

export class ApiTokenPaymentExeption extends HttpException {
  constructor() {
    super(
      {
        message: 'Api token payment not found',
        error: 'Payment required',
      },
      HttpStatus.PAYMENT_REQUIRED,
    );
  }
}
