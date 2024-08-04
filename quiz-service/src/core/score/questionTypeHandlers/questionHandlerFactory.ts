import { Injectable } from '@nestjs/common';
import { SingleChoiceQuestionHandler } from './questionTypes/singleChoiceQuestionHandler';
import { MultipleChoiceQuestionHandler } from './questionTypes/multipleChoiceQuestionHandler';
import { QUESTION_TYPES } from 'src/core/quiz/types';
import { IQuestionHandler } from './questionTypes/IQuestionHandler';

@Injectable()
export class QuestionHandlerFactory {
  constructor(
    private readonly singleChoiceQuestionHandler: SingleChoiceQuestionHandler,
    private readonly multipleChoiceQuestionHandler: MultipleChoiceQuestionHandler,
  ) {}

  getHandler(questionType: string): IQuestionHandler {
    switch (questionType) {
      case QUESTION_TYPES.SINGLE_CHOICE:
        return this.singleChoiceQuestionHandler;
      case QUESTION_TYPES.MULTIPLE_CHOICE:
        return this.multipleChoiceQuestionHandler;
    }

    return null;
  }
}
