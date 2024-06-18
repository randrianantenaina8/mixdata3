import { cityBusiness, CityBusiness } from "../../service/business/reference/city.business";

export class CityController {

    private service: CityBusiness;
  
    constructor(service: CityBusiness) {
      this.service = service;
    }
  
      populateFromFile = async (req, res, next) => {
        try {
          const {
            query: { page, rowPerPage, direction, sortField, region, ...queries },
          } = req;
          res.locals.data = await this.service.populateFromFile(null, region);
    
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

      deleteIndex = async (req, res, next) => {
        const {
          query: { page, rowPerPage, direction, sortField, ...queries },
        } = req;
        res.locals.data = await this.service.deleteIndex("cities");
        next();
      }

      getCount = async (req, res, next) => {
        const {
          query: { page, rowPerPage, direction, sortField, ...queries },
        } = req;
        res.locals.data = await this.service.getDocumentCount("cities");
        next();
      }

      searchAll = async (req, res, next) => {
        const {
          query: { page, rowPerPage, direction, sortField, term, ...queries },
        } = req;
        res.locals.data = await this.service.searchAll(term);
        next();
      }

      searchCity = async (req, res, next) => {
        const {
          query: { page, rowPerPage, direction, sortField, term, ...queries },
        } = req;
        res.locals.data = await this.service.searchCity(term);
        next();
      }

}

export const cityController = new CityController(cityBusiness);