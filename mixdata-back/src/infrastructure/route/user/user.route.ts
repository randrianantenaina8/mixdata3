import { Router } from 'express';

import { userDTOSchema } from '../../../common/validator/joi/user.validator';
import { schemaValidator } from '../../../service/middleware/joi';
import { userController } from '../../controller/user.controller';

const userRouters = () => {
  const router = Router();

  router.get(
    '/drop-index',
    userController.deleteIndex
  );

  router.get('', userController.getPerPage);

  router.delete('', userController.deleteUser);

  return router;
};

export const userRouter = userRouters();