import { UserRoles } from '../../../user/enum/user.enum';

export class CreateQuizResponseDto {
  id: number;
  title: string;
  description: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: UserRoles;
  };
}
