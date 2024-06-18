import { signUpBodyValidation } from "../../common/validator/joi/auth.validator";
import { HttpStatus } from "../../data/constants/httpStatus";
import { userBusiness, UserBusiness } from "../../service/business/user/user.business";

export class UserController {

    private userService: UserBusiness;
  
    constructor(userService: UserBusiness) {
      this.userService = userService;
    }

    inscription = async (req, res, next) => {
      let saved = null;
      try {
        if (req.validation.error) {
          return res
            .status(HttpStatus.BAD_REQUEST)
            .json({ ...req.validation, message: "Invalid input" });
        }

        const result = await this.userService.inscription(req.body);
        if (result.error) {
            return res
              .status(HttpStatus.BAD_REQUEST)
              .json({ data: { ...result }, message: "business error" });
        }
        res.locals.data = result;
  
        next();
      } catch (error) {
        next(error);
        // res.status(500).json({ error: true, message: "Internal Server Error" });
      }
    }

    deleteIndex = async (req, res, next) => {
      const {
        query: { page, rowPerPage, direction, sortField, ...queries },
      } = req;
      res.locals.data = await this.userService.deleteIndex("users");
      next();
    }

    getPerPage = async (req, res, next) => {
      const {
        query: { page, size, direction, sortField, ...queries },
      } = req;
  
      try {
         const result = await this.userService.getPerPage(size, parseInt(page) + 1);
         console.log('res.locals.data', result);
         res.locals.data = result;
        next();
      } catch (error) {
        next(error);
      }
    };

    deleteUser = async (req, res, next) => {
      const {
        query: { page, size, direction, sortField, id, ...queries },
      } = req;

      try {
        const result = await this.userService.deleteUser(id);
        console.log('res.locals.data', result);
        res.locals.data = result;
       next();
     } catch (error) {
       next(error);
     }
    }
}

export const userController = new UserController(userBusiness);