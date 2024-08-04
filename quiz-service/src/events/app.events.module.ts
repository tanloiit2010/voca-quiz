import { Module } from '@nestjs/common';
import QuizQueueConsumer from './quiz.queue.consumer';
import { CoreModule } from 'src/core/core.module';

@Module({
  imports: [CoreModule],
  providers: [QuizQueueConsumer],
})
export class AppEventsModule {}
