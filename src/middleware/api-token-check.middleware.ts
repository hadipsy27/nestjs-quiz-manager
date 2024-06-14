import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { ApiTokenPaymentExeption } from './exeption/api-token-payment.exeption';

export class ApiTokenCheckMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(req.headers);
    if (req.headers['api-token'] !== 'my-token') {
      // throw new BadRequestException('The token does not match');
      // throw new HttpException('My response', HttpStatus.BAD_REQUEST);
      throw new ApiTokenPaymentExeption();
    }
    next();
  }
}
