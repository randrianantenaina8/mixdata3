import {transactionBusiness, TransactionBusiness} from "../../service/business/transaction/transaction.business";

export class TransactionController {
  private service: TransactionBusiness;
  constructor(service: TransactionBusiness) {
    this.service = service;
  }

  search = async (req, res, next) => {
    const { body } = req;
    const {
      query: { page, size, direction, term, ...queries },
    } = req;

    try {
      res.locals.data = await this.service.search(size, parseInt(page) + 1, body);
      next();
    } catch (error) {
      next(error);
    }
  }

  findByLandsId = async (req, res, next) => {
    const landId = req.params.landId;
    try {
      res.locals.data = await this.service.findByLandId(landId);
      next();
    } catch (error) {
      next(error);
    }
  }
}

export const transactionController = new TransactionController(transactionBusiness);