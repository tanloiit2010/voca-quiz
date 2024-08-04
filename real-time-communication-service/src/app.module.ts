import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configs, { QueueConfig, RedisConfig } from './configs';
import { BullModule } from '@nestjs/bull';
import { QUEUE_NAME } from './events/types';
import { AppEventsModule } from './events/app.events.module';
import { QuizEventsGateway } from './socketGateways/quizEvents.gateway';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configs] }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const redisConfig = configService.get<RedisConfig>('redis');

        const queueConfig = configService.get<QueueConfig>('queue');

        return {
          redis: {
            host: 'localhost',
            port: 6379,
            db: redisConfig?.db,
          },
          defaultJobOptions: queueConfig
            ? {
                attempts: queueConfig?.attempts,
                backoff: {
                  type: queueConfig?.backoffType,
                  delay: queueConfig?.deplay,
                },
              }
            : undefined,
        };
      },
    }),
    BullModule.registerQueueAsync({
      name: QUEUE_NAME.QUIZ,
    }),
    AppEventsModule,
    AuthModule,
  ],
  providers: [QuizEventsGateway],
})
export class AppModule {}
