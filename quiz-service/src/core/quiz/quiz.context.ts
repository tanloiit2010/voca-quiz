import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { JOB_NAME, QUEUE_NAME, UserAnsweredJobData } from 'src/events/types';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserAnswer } from 'src/database/entities/userAnswer.entity';
import { UserAnswerResponseDto } from './types';
import { QuizSession } from 'src/database/entities/quizSession.entity';
import { QuizValidator } from './quiz.validator';

@Injectable()
export class QuizContext {
  readonly logger: Logger = new Logger(QuizContext.name);

  constructor(
    @InjectRepository(QuizSession)
    private readonly quizSessionRepository: Repository<QuizSession>,
    @InjectRepository(UserAnswer)
    private readonly userAnswerRepository: Repository<UserAnswer>,
    @InjectQueue(QUEUE_NAME.QUIZ) private readonly quizQueue: Queue,
    private readonly quizValidator: QuizValidator,
  ) {}

  async getQuizSession(username: string, quizId: number): Promise<QuizSession> {
    this.logger.log(`Getting quiz session for quizId: ${quizId}`);

    const quizSession = await this.quizSessionRepository
      .createQueryBuilder('quiz_sessions')
      .leftJoinAndSelect('quiz_sessions.quiz', 'quiz')
      .leftJoinAndSelect('quiz.questions', 'questions')
      .leftJoinAndSelect('questions.questionOptions', 'questionOptions')
      .where('quiz.id = :quizId', { quizId })
      .andWhere('quiz_sessions.username = :username', { username })
      .getOne();

    return quizSession;
  }

  async getUserAnswers(
    username: string,
    quizSessionId: number,
  ): Promise<UserAnswerResponseDto[]> {
    const userAnswers = await this.userAnswerRepository
      .createQueryBuilder('user_answers')
      .leftJoinAndSelect(
        'user_answers.quizSession',
        'quizSession',
        'quizSession.id = :quizSessionId',
        { quizSessionId },
      )
      .leftJoinAndSelect('user_answers.question', 'question')
      .leftJoinAndSelect(
        'question.questionOptions',
        'questionOptions',
        'questionOptions.id = user_answers.questionOptionId',
      )
      .leftJoinAndSelect(
        'question.questionOptions',
        'correctOptions',
        'correctOptions.isCorrect = true',
      )
      .where('user_answers.username = :username', { username })
      .andWhere('quizSession.id = :quizSessionId', { quizSessionId })
      .andWhere('user_answers.isCorrect IS NOT NULL')
      .select(
        'user_answers.id, question.id as questionId, questionOptions.id as selectedOptionId, correctOptions.id as correctOptionId',
      )
      .getRawMany<UserAnswerResponseDto>();

    return userAnswers;
  }

  async answerQuestion(
    username: string,
    quizSessionId: number,
    questionId: number,
    questionOptionId: number,
  ): Promise<{
    id: number;
  }> {
    this.logger.log(
      `Validating can answer question for quizSessionId: ${quizSessionId}`,
    );
    this.quizValidator.validateCanAnswerQuestion(
      username,
      quizSessionId,
      questionId,
    );

    this.logger.log(`Answering question for quizSessionId: ${quizSessionId}`);
    this.logger.log(`QuestionId: ${questionId}`);
    this.logger.log(`QuestionOptionId: ${questionOptionId}`);

    const userAnswer = await this.userAnswerRepository.save({
      username,
      quizSession: {
        id: quizSessionId,
      },
      question: {
        id: questionId,
      },
      questionOption: {
        id: questionOptionId,
      },
    });

    const jobData: UserAnsweredJobData = {
      userAnswerId: userAnswer.id,
    };

    this.logger.log(`Adding job to queue: ${JOB_NAME.USER_ANSWERED}`);

    await this.quizQueue.add(JOB_NAME.USER_ANSWERED, jobData);

    return {
      id: userAnswer.id,
    };
  }
}
