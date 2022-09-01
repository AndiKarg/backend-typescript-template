import { config } from 'dotenv';
config({ path: '.env' });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const { NODE_ENV, PORT, DB_USER, DB_PASSWORD, DB_CONNECT_STRING, LOG_FORMAT, ORIGIN, SECRET_KEY, CLIENT_ID, CLIENT_SECRET } = process.env;
