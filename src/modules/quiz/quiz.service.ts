import { Injectable } from "@nestjs/common";

@Injectable()
export class QuizService{

  getAll(){
    return [1,2,3]
  }
}