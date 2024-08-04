import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { AppConfig } from 'src/configs';
import { NODE_ENV } from 'src/constants';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const databaseConfig = this.configService.get('database');
    return {
      ...databaseConfig,
      synchronize: false,
      dropSchema: false,
      timezone: 'Z',
      logging:
        this.configService.get<AppConfig>('app')?.nodeEnv !==
        NODE_ENV.PRODUCTION,
    };
  }
}
