import { InjectQueue } from '@nestjs/bull';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Queue } from 'bull';
import { QuizSession } from 'src/database/entities/quizSession.entity';
import { UserAnswer } from 'src/database/entities/userAnswer.entity';
import { JOB_NAME, QUEUE_NAME } from 'src/events/types';
import { Repository } from 'typeorm';
import { CACHE_KEYS, UserAnswerResponseDto } from '../quiz/types';
import { QuestionHandlerFactory } from './questionTypeHandlers/questionHandlerFactory';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class ScoreContext {
  readonly logger: Logger = new Logger(ScoreContext.name);

  constructor(
    @InjectRepository(QuizSession)
    private readonly quizSessionRepository: Repository<QuizSession>,
    @InjectRepository(UserAnswer)
    private readonly userAnswerRepository: Repository<UserAnswer>,
    @InjectQueue(QUEUE_NAME.QUIZ) private readonly quizQueue: Queue,
    private readonly questionHandlerFactory: QuestionHandlerFactory,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getLeaderBoard(quizId: number) {
    const cacheKey = `${CACHE_KEYS.LEADERBOARD}:${quizId}`;
    const cacheLeaderboard = await this.cacheManager.get(cacheKey);

    if (cacheLeaderboard) {
      return cacheLeaderboard;
    }

    const leaderboard = await this.quizSessionRepository
      .createQueryBuilder('quiz_sessions')
      .where('quiz_sessions.quizId = :quizId', { quizId })
      .orderBy('quiz_sessions.score', 'DESC')
      .getMany();

    if (leaderboard.length > 0) {
      await this.cacheManager.set(cacheKey, leaderboard, 1000 * 60 * 60 * 24);
    }

    return leaderboard;
  }

  async evaluateUserAnswer(userAnswerId: number) {
    this.logger.log(`Evaluating user answer: ${userAnswerId}`);
    const userAnswer = await this.userAnswerRepository
      .createQueryBuilder('user_answers')
      .leftJoinAndSelect('user_answers.question', 'question')
      .leftJoinAndSelect('user_answers.questionOption', 'questionOption')
      .leftJoinAndSelect(
        'question.questionOptions',
        'questionOptions',
        'questionOptions.isCorrect = true',
      )
      .leftJoinAndSelect('user_answers.quizSession', 'quizSession')
      .leftJoinAndSelect('quizSession.quiz', 'quiz')
      .where('user_answers.id = :userAnswerId', { userAnswerId })
      .getOne();

    const questionTypeHandler = this.questionHandlerFactory.getHandler(
      userAnswer.question.type,
    );

    const evaluatedResult =
      await questionTypeHandler.evaluateUserAnswer(userAnswer);

    const userAnswerResult = await this.userAnswerRepository
      .createQueryBuilder('user_answers')
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
      .where('user_answers.id = :userAnswerId', { userAnswerId })
      .select(
        'user_answers.id, question.id as questionId, questionOptions.id as selectedOptionId, correctOptions.id as correctOptionId',
      )
      .getRawOne<UserAnswerResponseDto>();

    const jobData = {
      ...userAnswerResult,
      username: userAnswer.username,
      quizSessionId: userAnswer.quizSession.id,
      newScore: evaluatedResult.newScore,
    };

    this.logger.log(
      `Adding job to queue: ${JOB_NAME.USER_ANSWER_EVALUATED}`,
      jobData,
    );

    const cacheKey = `${CACHE_KEYS.LEADERBOARD}:${userAnswer?.quizSession?.quiz?.id}`;
    await this.cacheManager.del(cacheKey);

    this.quizQueue.add(JOB_NAME.USER_ANSWER_EVALUATED, jobData);
  }
}
