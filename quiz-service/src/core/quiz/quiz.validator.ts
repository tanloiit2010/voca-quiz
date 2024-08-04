import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuizSession } from 'src/database/entities/quizSession.entity';
import { Repository } from 'typeorm';
import { QUIZ_SESSION_STATUS } from './types';
import { UserAnswer } from 'src/database/entities/userAnswer.entity';

@Injectable()
export class QuizValidator {
  readonly logger: Logger = new Logger(QuizValidator.name);

  constructor(
    @InjectRepository(QuizSession)
    private readonly quizSessionRepository: Repository<QuizSession>,

    @InjectRepository(UserAnswer)
    private readonly userAnswerRepository: Repository<UserAnswer>,
  ) {}

  async validateCanAnswerQuestion(
    username: string,
    quizSessionId: number,
    questionId: number,
  ): Promise<void> {
    this.logger.log(
      `Validating can answer question for quizSessionId: ${quizSessionId}`,
    );
    const quizSession = await this.quizSessionRepository.findOne({
      where: { id: quizSessionId },
    });

    if (!quizSession) {
      this.logger.log(
        `Quiz session not found for quizSessionId: ${quizSessionId}`,
      );
      throw new NotFoundException('Quiz session not found');
    }

    if (quizSession.status !== QUIZ_SESSION_STATUS.IN_PROGRESS) {
      this.logger.log(
        `Quiz session is not active for quizSessionId: ${quizSessionId}`,
      );
      throw new BadRequestException('Quiz session is not active');
    }

    const existAnswerQuestion = await this.userAnswerRepository.findOne({
      where: {
        quizSession: {
          id: quizSessionId,
        },
        question: {
          id: questionId,
        },
        username,
      },
    });

    if (existAnswerQuestion) {
      this.logger.log(
        `User has already answered this question for quizSessionId: ${quizSessionId}`,
      );
      throw new BadRequestException('You have already answered this question');
    }

    this.logger.log(
      `User can answer question for quizSessionId: ${quizSessionId}`,
    );
  }
}
