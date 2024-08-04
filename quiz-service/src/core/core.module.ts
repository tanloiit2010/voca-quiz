import { Module } from '@nestjs/common';
import { QuizModule } from './quiz/quiz.module';
import { ScoreModule } from './score/score.module';
import { QuizContext } from './quiz/quiz.context';
import { ScoreContext } from './score/score.context';
import { BullModule } from '@nestjs/bull';
import { QUEUE_NAME } from 'src/events/types';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from 'src/database/entities/quiz.entity';
import { QuizSession } from 'src/database/entities/quizSession.entity';
import { Question } from 'src/database/entities/question.entity';
import { UserAnswer } from 'src/database/entities/userAnswer.entity';
import { QuestionOption } from 'src/database/entities/questionOption.entity';

@Module({
  imports: [
    QuizModule,
    ScoreModule,
    BullModule.registerQueueAsync({
      name: QUEUE_NAME.QUIZ,
    }),
    TypeOrmModule.forFeature([
      Quiz,
      QuizSession,
      Question,
      QuestionOption,
      UserAnswer,
    ]),
  ],
  providers: [QuizContext, ScoreContext],
  exports: [QuizContext, ScoreContext],
})
export class CoreModule {}
