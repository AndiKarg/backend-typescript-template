import 'reflect-metadata';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import compression from 'compression';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { createConnection, Repository } from 'typeorm';
import { NODE_ENV, PORT, LOG_FORMAT, ORIGIN, CREDENTIALS, CLIENT_ID, CLIENT_SECRET } from '@config';
import { mongoConnection, oracleConnection } from '@database';
import { Routes } from '@interfaces/routes.interface';
import errorMiddleware from '@middlewares/error.middleware';
import { logger, stream } from '@utils/logger';
import { getConnection } from 'typeorm';
import { Session } from '@/models/sessions.model';
import { User } from './interfaces/users.interface';
import { TypeormStore } from "connect-typeorm";
const session = require("express-session");

declare module 'express-session' {
  interface SessionData {
    user: User;
  }
}

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;
  public sessionRepository: Repository<Session>;
  public passport;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3000;

    this.initializeSwagger();
    this.initializeErrorHandling();
    this.connectToDatabases()
      .then(() => {
        this.sessionRepository = getConnection('oracle').getRepository(Session);

        this.initializeMiddlewares();
        this.initializeRoutes(routes);
      })
      .catch(e => console.error('ERROR DB CONNECTION', e));
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private async connectToDatabases() {
    return await Promise.all([createConnection(oracleConnection), createConnection(mongoConnection)]);
  }

  private initializeMiddlewares() {
    this.app.use(morgan(LOG_FORMAT, { stream }));
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(
      session({
        secret: 'nudel666',
        resave: true,
        saveUninitialized: true,
        cookie: {
          secure: true,
          httpOnly: false,
          sameSite: 'none',
          maxAge: 7 * 86400 * 1000, //expires ist deprecated
        },
        //wenn das auskommentiere dann kommt kein fehler -> evtl connect-typeorm probieren
        store: new TypeormStore({
          cleanupLimit: 2,
          limitSubquery: false, // If using MariaDB.
          ttl: 86400,
        }).connect(this.sessionRepository),
      }),
    );
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }

  private initializeSwagger() {
    const options = {
      swaggerDefinition: {
        info: {
          title: 'REST API',
          version: '1.0.0',
          description: 'Example docs',
        },
      },
      apis: ['swagger.yaml'],
    };

    const specs = swaggerJSDoc(options);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
