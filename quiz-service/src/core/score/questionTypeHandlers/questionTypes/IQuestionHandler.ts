import { UserAnswer } from 'src/database/entities/userAnswer.entity';

export interface IQuestionHandler {
  evaluateUserAnswer: (userAnswer: UserAnswer) => Promise<{
    isCorrect: boolean;
    newScore: number;
  }>;
}
