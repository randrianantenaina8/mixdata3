import { Router } from 'express';

import {
  landRequestDTOSchema
} from '../../../common/validator/joi/land.validator';
import { schemaValidator } from '../../../service/middleware/joi';
import { landController } from '../../controller/land.controller';

const landRouters = () => {
  const router = Router();

  router.get(
    '/drop-index',
    // schemaValidator(landRequestDTOSchema),
    landController.deleteIndex
  );

  router.get('', landController.getPerPage);

  router.delete('', landController.deleteLand);

  // router.get('/:id', LandController.getById);

  router.get(
    '/populate',
    // schemaValidator(landRequestDTOSchema),
    landController.populateFromFile
  );

  router.get(
    '/find',
    // schemaValidator(landRequestDTOSchema),
    landController.findByLocation
  );

  router.get(
    '/findOwner',
    // schemaValidator(landRequestDTOSchema),
    landController.findByOwner
  );

  router.get(
    '/findTerm',
    // schemaValidator(landRequestDTOSchema),
    landController.findTerm
  );

  router.post(
    '/search',
    // schemaValidator(landRequestDTOSchema),
    landController.search
  );

  return router;
};

export const landRouter = landRouters();