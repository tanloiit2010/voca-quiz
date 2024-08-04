import { Injectable } from '@nestjs/common';
import { IQuestionHandler } from './IQuestionHandler';

@Injectable()
export class MultipleChoiceQuestionHandler implements IQuestionHandler {
  evaluateUserAnswer = async (): Promise<{
    isCorrect: boolean;
    newScore: number;
  }> => {
    throw new Error('Not implemented');
  };
}
