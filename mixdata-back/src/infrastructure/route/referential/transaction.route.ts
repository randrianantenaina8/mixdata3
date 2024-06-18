import { Router } from "express";

import {transactionController} from "../../controller/transaction.controller";

const transactionRouters = () => {

  const router = Router();

  router.post(
    '/search',
    transactionController.search
  );

  router.get(
    '/land/:landId',
    transactionController.findByLandsId
  );

  return router;
};

export const transactionRouter = transactionRouters();