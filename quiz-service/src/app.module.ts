import { Module } from '@nestjs/common';
import configs, { QueueConfig, RedisConfig } from 'src/configs';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CoreModule } from './core/core.module';
import { ApiModule } from './api/api.module';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisClientOptions } from 'redis';
import { redisStore } from 'cache-manager-redis-yet';
import { BullModule } from '@nestjs/bull';
import { QUEUE_NAME } from './events/types';
import { AppEventsModule } from './events/app.events.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { DataSource, DataSourceOptions } from 'typeorm';
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
    CacheModule.registerAsync<RedisClientOptions>({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const redisConfig = configService.get<RedisConfig>('redis');
        return {
          store: redisStore,
          url: redisConfig?.url,
        } as RedisClientOptions;
      },
    }),
    BullModule.registerQueueAsync({
      name: QUEUE_NAME.QUIZ,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(
          options as DataSourceOptions,
        ).initialize();
        return dataSource;
      },
    }),
    AppEventsModule,
    AuthModule,
    CoreModule,
    ApiModule,
  ],
})
export class AppModule {}
