import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { JOB_NAME, QUEUE_NAME, UserAnsweredJobData } from './types';
import { ScoreContext } from 'src/core/score/score.context';
import { Job } from 'bull';

@Processor(QUEUE_NAME.QUIZ)
class QuizQueueConsumer {
  readonly logger: Logger = new Logger(QuizQueueConsumer.name);
  constructor(readonly scoreContext: ScoreContext) {}

  @Process(JOB_NAME.USER_ANSWERED)
  async handleUserAnswered(job: Job<UserAnsweredJobData>) {
    this.logger.log('Start user answered job!!', job.data);
    this.scoreContext.evaluateUserAnswer(job.data.userAnswerId);
  }
}

export default QuizQueueConsumer;
