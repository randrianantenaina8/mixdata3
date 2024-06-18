import { Router } from "express";
import { cityController } from "../../controller/city.controller";
import { regionController, RegionController } from "../../controller/region.controller";

const regionRouters = () => {

    const router = Router();
  
    router.get(
      '/populate',
      regionController.populate
    );

    router.get(
      '/drop-index',
      regionController.deleteIndex
    );

    router.get(
      '/all',
      regionController.findAll
    );
  
    return router;
  };
  
  export const regionRouter = regionRouters();