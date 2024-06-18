import { Router } from 'express';

import { schemaValidator } from '../../../service/middleware/joi';
import { authController } from '../../controller/auth.controller';
import { loginDTOSchema, refreshDTOSchema } from '../../../common/validator/joi/user.validator';

const authRouters = () => {
  const router = Router();

  router.post(
    '/login',
    schemaValidator(loginDTOSchema),
    authController.login
  );

  router.post(
    '/refresh',
    schemaValidator(refreshDTOSchema),
    authController.refresh
  );

  router.post(
    '/logout',
    schemaValidator(refreshDTOSchema),
    authController.logout
  );

  //Import Parcelles
  // router.get('/import', authController.import);
  //router.get('/import/delete', authController.importDelete);
  //Import transactions
  //router.get('/import/transations', authController.importTransaction);
  //router.get('/import/transations/delete', authController.importTransactionDelete);

  return router;
};

export const authRouter = authRouters();