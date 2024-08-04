import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuizSession } from 'src/database/entities/quizSession.entity';
import { DataSource, Repository } from 'typeorm';
import { UserAnswer } from 'src/database/entities/userAnswer.entity';
import { IQuestionHandler } from './IQuestionHandler';

@Injectable()
export class SingleChoiceQuestionHandler implements IQuestionHandler {
  readonly logger: Logger = new Logger(SingleChoiceQuestionHandler.name);

  constructor(
    @InjectRepository(QuizSession)
    private readonly userAnswerRepository: Repository<UserAnswer>,
    private dataSource: DataSource,
  ) {}

  evaluateUserAnswer = async (
    userAnswer: UserAnswer,
  ): Promise<{
    isCorrect: boolean;
    newScore: number;
  }> => {
    const correctOption = userAnswer.question.questionOptions?.[0];

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    this.logger.log(`User answer is correct: ${userAnswer.id}`);

    try {
      if (userAnswer.questionOption.id === correctOption.id) {
        userAnswer.isCorrect = true;
        userAnswer.quizSession.score += userAnswer.question.score;
      } else {
        userAnswer.isCorrect = false;
      }

      await queryRunner.manager.save(userAnswer);
      await queryRunner.manager.save(userAnswer.quizSession);
      await queryRunner.commitTransaction();

      return {
        isCorrect: userAnswer.isCorrect,
        newScore: userAnswer.quizSession.score,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  };
}
