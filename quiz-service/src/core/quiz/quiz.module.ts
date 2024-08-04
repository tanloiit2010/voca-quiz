import { Module } from '@nestjs/common';
import { QuizContext } from './quiz.context';
import { BullModule } from '@nestjs/bull';
import { QUEUE_NAME } from 'src/events/types';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from 'src/database/entities/quiz.entity';
import { QuizSession } from 'src/database/entities/quizSession.entity';
import { Question } from 'src/database/entities/question.entity';
import { QuestionOption } from 'src/database/entities/questionOption.entity';
import { UserAnswer } from 'src/database/entities/userAnswer.entity';
import { QuizValidator } from './quiz.validator';

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
  providers: [QuizContext, QuizValidator],
  exports: [QuizContext, QuizValidator],
})
export class QuizModule {}
