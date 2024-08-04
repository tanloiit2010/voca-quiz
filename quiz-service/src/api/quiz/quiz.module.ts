import { Module } from '@nestjs/common';
import { CoreModule } from 'src/core/core.module';
import { QuizController } from './quiz.controller';

@Module({
  imports: [CoreModule],
  controllers: [QuizController],
})
export class QuizModule {}
