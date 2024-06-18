import { Router } from "express";

import {faosController} from "../../controller/faos.controller";

const faosRouters = () => {

  const router = Router();

  router.post(
    '/search',
    faosController.search
  );

  router.get(
    '/land/:landId',
    faosController.findByLandId
  );

  return router;
};

export const faosRouter = faosRouters();
