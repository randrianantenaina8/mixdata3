// import * as express from 'express';
import cors from 'cors';
import path from 'path';
import express from "express";
import * as cron from 'node-cron';
// import { createConnection } from 'typeorm';

import { configs } from './data/constants/configs';
import { logger } from './common/logger';
import { exceptionHandler } from './service/middleware/exception-handler';
// import swaggerMiddleware from './service/middleware/swagger';
import { responseFormatter } from './service/middleware/responseFormatter';
import { HttpStatus } from './data/constants/httpStatus';
import { landBusiness } from './service/business/land/land.business';
import { etlController } from './infrastructure/controller/etl.controller';
import mongoose from 'mongoose';

/**
 * Initialisation du serveur express
 */
class App {
  private app = express();

  private isProd = process.env.NODE_ENV === 'prod';

  public init = async () => {
    try {
      // await createConnection();
      await this.initMiddlewares();
      await this.initRoutes();
      await this.initDataBase();
      this.initCron();
      return this.app.listen(configs.port, () => logger.info(`Listening on ${configs.port}`));
    } catch (error) {
      return Promise.reject(error);
    }
  };

  private initDataBase = async () => {
    const connection = configs.typeORMConnection;
    const username = configs.typeORMUserName;
    const password = configs.typeORMPassword;
    const host = configs.typeORMHost;
    const port = configs.typeORMPort;
    const database = configs.typeORMDatabase;
    const authSource = 'admin';
    const crmDB = `${connection}://${username}:${password}@${host}:${port}/${database}?authSource=${authSource}`
    await mongoose.connect(crmDB);
  }

  private initMiddlewares = async () => {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(cors());

    // Désactiver le swagger en prod
    // if (!this.isProd) {
    //   swaggerMiddleware.init(this.app);
    // }
  };

  private initRoutes = async () => {
    const { appRouter } = await import('./infrastructure/route/app.route');
    this.app.use('/api', appRouter, responseFormatter);
    this.app.use('/public', express.static(path.resolve(__dirname, '../public')));

    this.app.get('/api-docs', (req, res) =>
        res.status(HttpStatus.OK).json({ message: '', data: null, isError: false }),
      );

    // Retourner un Json pour l'appel swagger prod
    if (this.isProd) {
      this.app.get('/api-docs', (req, res) =>
        res.status(HttpStatus.OK).json({ message: '', data: null, isError: false }),
      );
    }

    // Interception des autres routes
    // this.app.get('*', (req, res) => {
    //   res.sendFile(path.join(__dirname, '../', '/index.html'));
    // });

    // Doit être le dernier à être appelé
    this.app.use(exceptionHandler);
  };

  private initCron() {
    cron.schedule('22 16 * * *', () => {
      try {
        etlController.scrapLandsByRegionServiceApplicatif();
      } catch (error) {
        logger.error(error?.message);
      }
    }, {
      scheduled: false,
      // timezone: "CEST/Switzerland"
    }
    
    );
  }
}

export default new App();
