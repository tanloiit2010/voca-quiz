import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import config from 'src/configs';
dotenv.config();

const AppDataSource = new DataSource({
  ...config().database,
  synchronize: false,
  dropSchema: false,
  logging: process.env.NODE_ENV !== 'production',
} as DataSourceOptions);

export default AppDataSource;
