import { useGet, usePost } from "../../common/technical/axios.technical";
import { readJsonFile } from "../../common/technical/file.technical";
import { configs } from "../../data/constants/configs";
import { contentType } from "../../data/constants/content-type";
import { headers } from "../../data/constants/popetyHeader";
import { payloadLogin } from "../../data/constants/popetyLogin";
import { popetyPayload } from "../../data/constants/popetyPayload";
import { popety } from "../../data/constants/urls";
import { CityBusiness, cityBusiness } from "../../service/business/reference/city.business";
import { RegionBusiness, regionBusiness } from "../../service/business/reference/region.business";
import { popetyDelegate } from "../../service/delegate/popety.delegate";

export class RegionController {
    private regionService: RegionBusiness;
  
    constructor(service: RegionBusiness) {
      this.regionService = service;
    }

    populate = async (req, res, next) => {
        const indexName = "regions";
        try {
            const {
              query: { page, rowPerPage, direction, sortField, ...queries },
            } = req;
            const regionRes = await this.regionService.populateFromFile(indexName);
    
            console.log("regionRes", regionRes);
            res.locals.data = regionRes;
      
            next();
          } catch (error) {
            next(error);
          }
    }

    deleteIndex = async (req, res, next) => {
      const {
        query: { page, rowPerPage, direction, sortField, ...queries },
      } = req;
      res.locals.data = await this.regionService.deleteIndex("regions");
      next();
    }

    findAll = async (req, res, next) => {
      try {
        const {
          query: { page, rowPerPage, direction, sortField, ...queries },
        } = req;
        res.locals.data = await this.regionService.findAll();
        next();
      } catch (error) {
        next(error);
      }
    }
}

export const regionController = new RegionController(regionBusiness);