import { landBusiness, LandBusiness } from '../../service/business/land/land.business';
  
  export class LandController {
    private service: LandBusiness;
  
    constructor(service: LandBusiness) {
      this.service = service;
    }

    deleteIndex = async (req, res, next) => {

      try {
        const {
          query: { page, rowPerPage, direction, sortField, region, ...queries },
        } = req;
        res.locals.data = await this.service.deleteIndex("lands");
  
        next();
      } catch (error) {
        next(error);
      }
    } 

    populateFromFile = async (req, res, next) => {
      try {
        const {
          query: { page, rowPerPage, direction, sortField, region, ...queries },
        } = req;
        res.locals.data = await this.service.populate(null, region);
  
        next();
      } catch (error) {
        next(error);
      }
    }

    findByLocation = async (req, res, next) => {
      const {
        query: { page, rowPerPage, direction, sortField, term, ...queries },
      } = req;
      res.locals.data = await this.service.find(term);
      next();
    }

    getPerPage = async (req, res, next) => {
      const {
        query: { page, size, direction, sortField, ...queries },
      } = req;
  
      try {
        // res.locals.data = await this.service.findAll({
        //   sortField,
        //   direction,
        //   queries,
        //   take: rowPerPage,
        //   skip: (page - 1) * rowPerPage,
        // });
        console.log('page ===', page);
        console.log('size ===', size);
        res.locals.data = await this.service.getPerPage(size, parseInt(page) + 1);
  
        next();
      } catch (error) {
        next(error);
      }
    };

    search = async (req, res, next) => {
      const {
        query: { page, size, direction, ...queries },
      } = req;
      const { body } = req;
      console.log('body', body);
      try {
        res.locals.data = await this.service.search(size, parseInt(page) + 1, body);
  
        next();
      } catch (error) {
        next(error);
      }
    }

    findByOwner = async (req, res, next) => {
      const {
        query: { page, rowPerPage, direction, sortField, term, ...queries },
      } = req;
      res.locals.data = await this.service.findByOwner(term);
      next();
    }

    findTerm = async (req, res, next) => {
      const {
        query: { page, rowPerPage, direction, sortField, term, ...queries },
      } = req;
      res.locals.data = await this.service.findTerm(term);
      next();
    }

    deleteLand = async (req, res, next) => {
      const {
        query: { page, size, direction, sortField, id, ...queries },
      } = req;

      try {
        const result = await this.service.deleteLand(id);
        res.locals.data = result;
       next();
     } catch (error) {
       next(error);
     }
    }
  }


export const landController = new LandController(landBusiness);