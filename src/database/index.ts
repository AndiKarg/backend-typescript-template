import { join } from 'path';
import { ConnectionOptions } from 'typeorm';
import { DB_USER, DB_PASSWORD, DB_CONNECT_STRING } from '@config';

export const dbConnection: ConnectionOptions = {
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
