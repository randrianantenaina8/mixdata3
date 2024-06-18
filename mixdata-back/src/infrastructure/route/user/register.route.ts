import { Router } from 'express';

import { userDTOSchema } from '../../../common/validator/joi/user.validator';
import { schemaValidator } from '../../../service/middleware/joi';
import { userController } from '../../controller/user.controller';

const registerRouters = () => {
  const router = Router();

  router.post(
    '',
    schemaValidator(userDTOSchema),
    userController.inscription
  );

  return router;
};

export const registerRouter = registerRouters();