import { join } from 'path';
import { ConnectionOptions } from 'typeorm';
import { DB_USER, DB_PASSWORD, DB_CONNECT_STRING } from '@config';

export const oracleConnection: ConnectionOptions = {
  name: 'oracle',
  type: 'oracle',
  username: DB_USER,
  password: DB_PASSWORD,
  connectString: DB_CONNECT_STRING,
  synchronize: true,
  logging: false,
  entities: [join(__dirname, '../**/*model{.ts,.js}')],
  migrations: [join(__dirname, '../**/*.migration{.ts,.js}')],
  subscribers: [join(__dirname, '../**/*.subscriber{.ts,.js}')],
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
};

export const mongoConnection: ConnectionOptions = {
  name: 'mongo',
  type: 'mongodb',
  // username: DB_USER,
  // password: DB_PASSWORD,
  database: 'eoc-api-hub',
  port: 27017,
  synchronize: true,
  logging: false,
  entities: [join(__dirname, '../**/*.model.mongo{.ts,.js}')],
  migrations: [join(__dirname, '../**/*.migration{.ts,.js}')],
  subscribers: [join(__dirname, '../**/*.subscriber{.ts,.js}')],
  useUnifiedTopology: true,
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
};
