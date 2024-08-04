import { IsNotEmpty } from 'class-validator';

export class JoinQuzSessionDto {
  @IsNotEmpty()
  quizSessionId: number;
}
