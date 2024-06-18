import { Router } from 'express';
import {
  landRequestDTOSchema
} from '../../../common/validator/joi/land.validator';
import { schemaValidator } from '../../../service/middleware/joi';
import { etlController } from '../../controller/etl.controller';

const etlRouters = () => {
  const router = Router();

  router.get(
    '/run-scrap',
    etlController.scrapByRegion
  );

  return router;
};

export const etlRouter = etlRouters();