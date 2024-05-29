import * as process from 'node:process';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { registerAs } from '@nestjs/config';

// export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
//   useFactory: async (): Promise<TypeOrmModuleOptions> => {
//     return {
//       type: 'postgres',
//       host: process.env.DB_HOST,
//       port: parseInt(process.env.DB_PORT, 10),
//       username: process.env.DB_USERNAME,
//       password: process.env.DB_PASSWORD,
//       database: process.env.DB_NAME,
//       entities: [__dirname + '/../**/*.entity.{js,ts}'],
//       migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
//       autoLoadEntities: true,
//       extra: {
//         charset: 'utf8mb4_unicode_ci',
//       },
//       synchronize: false, // Be careful with this option and don't use this in production - otherwise you can lose production data.
//       logging: true,
//     };
//   },
// };
//
// export const typeOrmConfig: TypeOrmModuleOptions = {
//   type: 'postgres',
//   host: process.env.DB_HOST,
//   port: parseInt(process.env.DB_PORT, 10),
//   username: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   entities: [__dirname + '/../**/*.entity.{js,ts}'],
//   migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
//   autoLoadEntities: true,
//   synchronize: false,
//   extra: {
//     charset: 'utf8mb4_unicode_ci',
//   },
//   logging: true,
// };

dotenvConfig({ path: '.env' });

const config = {
  type: 'postgres',
  host: `${process.env.DB_HOST}`,
  port: `${process.env.DB_PORT}`,
  username: `${process.env.DB_USERNAME}`,
  password: `${process.env.DB_PASSWORD}`,
  database: `${process.env.DB_NAME}`,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
  autoLoadEntities: true,
  synchronize: false,
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
