import {faosImportBusiness, FaosImportBusiness} from "../../service/business/faos/faos.import.business";
import { faosBusiness, FaosBusiness } from "../../service/business/faos/faos.business";

export class FaosController {
  private faosImportBusiness: FaosImportBusiness;
  private service: FaosBusiness;
  constructor(
    faosImportBusiness: FaosImportBusiness,
    service: FaosBusiness
  ) {
    this.faosImportBusiness = faosImportBusiness;
    this.service = service;
  }

  search = async (req, res, next) => {
    const { body } = req;
    const {
      query: { page, size, direction, term, ...queries },
    } = req;


    console.log("faos :", body)

    try {
      res.locals.data = await this.service.search(size, parseInt(page) + 1, body);
      next();
    } catch (error) {
      console.log("faos error => ", error)
      next(error);
    }
  }

  findByLandId = async (req, res, next) => {
  
    const landId = req.params.landId;
    try {
      res.locals.data = await this.service.findByLandId(landId);
      next();
    } catch (error) {
      next(error);
    }
  }
}



export const faosController = new FaosController(faosImportBusiness, faosBusiness);
