import { IsNotEmpty } from 'class-validator';

export class UserLoginReq {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
