import { Router } from 'express';

import { cityRouter } from './referential/city.route';
import { landRouter } from './land/land.route';
import { HttpStatus } from '../../data/constants/httpStatus';
import { etlRouter } from './etl/etl.route';
import { regionRouter } from './referential/region.route';
import { userRouter } from './user/user.route';
import { authRouter } from './user/auth.route';
import { secured } from "../../service/middleware/auth";
import { registerRouter } from './user/register.route';
import { transactionRouter } from "./referential/transaction.route";
import { faosRouter } from "./referential/faos.route";
import { CRMRouter } from "./crm/crm.route";

const appRoutes = () => {
  const router = Router();

  router.get('/api-status', (req, res) => res.status(HttpStatus.OK).send('ok'));
  router.use('/auth', authRouter);
  router.use('/etl', etlRouter);
  router.use('/register', registerRouter);

  router.use('/user', secured, userRouter);
  router.use('/lands', landRouter);
  router.use('/city', secured, cityRouter);
  router.use('/region', secured, regionRouter);
  router.use('/transaction', secured, transactionRouter);
  router.use('/faos', secured, faosRouter);

  // CRM
  router.use('/crm', secured, CRMRouter);

  return router;
};


export const appRouter = appRoutes();
