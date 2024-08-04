import { Module } from '@nestjs/common';
import QuizQueueConsumer from './quiz.queue.consumer';
import { QuizEventsGateway } from 'src/socketGateways/quizEvents.gateway';

@Module({
  providers: [QuizQueueConsumer, QuizEventsGateway],
})
export class AppEventsModule {}
