import { signUpBodyValidation } from "../../common/validator/joi/auth.validator";
import { HttpStatus } from "../../data/constants/httpStatus";
import { authBusiness, AuthBusiness } from "../../service/business/user/auth.business";
import { userBusiness, UserBusiness } from "../../service/business/user/user.business";
import { importParcelleBusinness, ImportParcelleBusinness } from "../../service/business/parcelle/import.parcelle.businness";
import {transactionImportBusiness, TransactionImportBusiness} from "../../service/business/transaction/transaction.import.business";
import {faosImportBusiness, FaosImportBusiness} from "../../service/business/faos/faos.import.business";

export class AuthController {

    private authService: AuthBusiness;
    private importParcelleBusinness: ImportParcelleBusinness;
    private transactionImportBusiness: TransactionImportBusiness;
  private faosImportBusiness: FaosImportBusiness;

    constructor(
      authService: AuthBusiness,
      importParcelleBusinness: ImportParcelleBusinness,
      transactionImportBusiness: TransactionImportBusiness,
      faosImportBusiness: FaosImportBusiness
    ) {
      this.authService = authService;
      this.importParcelleBusinness = importParcelleBusinness;
      this.transactionImportBusiness = transactionImportBusiness;
      this.faosImportBusiness = faosImportBusiness;
    }

    import = async (req, res, next) => {
      try {
        await this.importParcelleBusinness.execute();
        res.locals.data = {message: "ok"};
        next();
      } catch (error) {
        next(error);
      }
    }

  importTransaction = async (req, res, next) => {
    try {
      await this.transactionImportBusiness.execute();
      res.locals.data = {message: "ok"};
      next();
    } catch (error) {
      next(error);
    }
  }

  importFaos = async (req, res, next) => {
    try {
      await this.faosImportBusiness.execute();
      res.locals.data = {message: "ok"};
      next();
    } catch (error) {
      next(error);
    }
  }

  importFaosDelete = async (req, res, next) => {
    try {
      await this.faosImportBusiness.delete();
      res.locals.data = {message: "ok"};
      next();
    } catch (error) {
      next(error);
    }
  }

  importTransactionDelete = async (req, res, next) => {
    try {
      await this.transactionImportBusiness.delete();
      res.locals.data = {message: "ok"};
      next();
    } catch (error) {
      next(error);
    }
  }

    importDelete = async (req, res, next) => {
      try {
        await this.importParcelleBusinness.delete();
        res.locals.data = {message: "ok"};
        next();
      } catch (error) {
        next(error);
      }
    }

    login = async (req, res, next) => {

      if (req.validation.error) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ ...req.validation, message: "Invalid input" });
      }
      try {
        res.locals.data = await this.authService.login(req.body);
  
        next();
      } catch (error) {
        next(error);
      }
    }

    refresh = async (req, res, next) => {
      if (req.validation.error) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ ...req.validation, message: "Invalid input" });
      }
      try {
        res.locals.data = await this.authService.refreshToken(req.body.refreshToken);
  
        next();
      } catch (error) {
        next(error);
      }
    }

    logout = async (req, res, next) => {

      if (req.validation.error) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ ...req.validation, message: "Invalid input" });
      }
      try {
        res.locals.data = await this.authService.logout(req.body.refreshToken);
  
        next();
      } catch (error) {
        next(error);
      }
    }
}

export const authController = new AuthController(authBusiness, importParcelleBusinness, transactionImportBusiness, faosImportBusiness);