import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { JOB_NAME, QUEUE_NAME, UserAnswerEvaluatedJobData } from './types';
import { Job } from 'bull';
import { QuizEventsGateway } from 'src/socketGateways/quizEvents.gateway';

@Processor(QUEUE_NAME.QUIZ)
class QuizQueueConsumer {
  readonly logger: Logger = new Logger(QuizQueueConsumer.name);

  constructor(private readonly quizEventsGateway: QuizEventsGateway) {}

  @Process(JOB_NAME.USER_ANSWER_EVALUATED)
  async handleUserAnswerEvaluated(job: Job<UserAnswerEvaluatedJobData>) {
    this.logger.log('Start user answer evaluated job!!', job.data);

    this.quizEventsGateway.emitUserAnswerEvaluated(job.data);
    this.quizEventsGateway.emitLeaderBoardUpdated(job.data.quizSessionId);
  }
}

export default QuizQueueConsumer;
