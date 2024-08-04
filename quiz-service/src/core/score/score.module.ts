import { Module } from '@nestjs/common';
import { ScoreContext } from './score.context';
import { BullModule } from '@nestjs/bull';
import { QUEUE_NAME } from 'src/events/types';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from 'src/database/entities/quiz.entity';
import { QuizSession } from 'src/database/entities/quizSession.entity';
import { Question } from 'src/database/entities/question.entity';
import { QuestionOption } from 'src/database/entities/questionOption.entity';
import { UserAnswer } from 'src/database/entities/userAnswer.entity';
import { QuestionHandlerFactory } from './questionTypeHandlers/questionHandlerFactory';
import { SingleChoiceQuestionHandler } from './questionTypeHandlers/questionTypes/singleChoiceQuestionHandler';
import { MultipleChoiceQuestionHandler } from './questionTypeHandlers/questionTypes/multipleChoiceQuestionHandler';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Quiz,
      QuizSession,
      Question,
      QuestionOption,
      UserAnswer,
    ]),
    BullModule.registerQueueAsync({
      name: QUEUE_NAME.QUIZ,
    }),
  ],
  providers: [
    ScoreContext,
    QuestionHandlerFactory,
    SingleChoiceQuestionHandler,
    MultipleChoiceQuestionHandler,
  ],
  exports: [
    ScoreContext,
    QuestionHandlerFactory,
    SingleChoiceQuestionHandler,
    MultipleChoiceQuestionHandler,
  ],
})
export class ScoreModule {}
