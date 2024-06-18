import { Router } from "express";
import { cityController } from "../../controller/city.controller";

const cityRouters = () => {

    const router = Router();
  
    router.get(
      '/populate',
      cityController.populateFromFile
    );

    router.get(
      '/drop-index',
      cityController.deleteIndex
    );
  
    router.get(
      '/find',
      cityController.findByLocation
    );

    router.get(
      '/count',
      cityController.getCount
    );

    router.get(
      '/_all',
      cityController.searchAll
    )

    router.get(
      '/_search',
      cityController.searchCity
    )
  
    return router;
  };
  
  export const cityRouter = cityRouters();