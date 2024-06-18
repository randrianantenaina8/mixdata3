import { useGet, usePost } from "../../common/technical/axios.technical";
import { readJsonFile } from "../../common/technical/file.technical";
import { configs } from "../../data/constants/configs";
import { contentType } from "../../data/constants/content-type";
import { headers } from "../../data/constants/popetyHeader";
import { payloadLogin } from "../../data/constants/popetyLogin";
import { popetyPayload } from "../../data/constants/popetyPayload";
import { popety } from "../../data/constants/urls";
import { landBusiness, LandBusiness } from "../../service/business/land/land.business";
import { CityBusiness, cityBusiness } from "../../service/business/reference/city.business";
import { regionBusiness, RegionBusiness } from "../../service/business/reference/region.business";
import { popetyDelegate } from "../../service/delegate/popety.delegate";

export class ETLController {

    private cityService: CityBusiness;
    private regionService: RegionBusiness;
    private landService: LandBusiness;
  
    constructor(city: CityBusiness, region: RegionBusiness, landService: LandBusiness) {
      this.cityService = city;
      this.regionService = region;
      this.landService = landService;
    }

    scrapByRegion = async (req, res, next) => {
      try {
        const {
          query: { page, rowPerPage, direction, sortField, ...queries },
        } = req;

        res.locals.data = await this.scrapLandsByRegionServiceApplicatif();

        next();
      } catch (error) {
        next(error);
      }
    }

    scrapLandsByRegionServiceApplicatif = async () => {
        let saved = null;
        const regionRes = await this.regionService.findRegionNotImported("regions");
        console.log("regionRes ", regionRes);
        if (regionRes?.results.length !== 0) {
          const currentRegion = regionRes.results[0]._source;
          const cityRes = await this.cityService.findCityNotImported(currentRegion.name);
          if (cityRes?.results.length !== 0) {

            const currentCity = cityRes.results[0]._source;
            const payload = {
                ...popetyPayload,
                locations: [
                    {
                        ...popetyPayload?.locations[0],
                        id: currentCity?.id,
                        location_type: "city",
                        location_search: `${currentCity?.name}`
                    }
                ]
            }
            const lands = await this.landService.getLandsFromPopety(currentCity);
            const count = await this.landService.populate(lands, "");
            saved = await this.cityService.saveCityImported(currentCity);
          }
        }

        return saved;
    }
}

export const etlController = new ETLController(cityBusiness, regionBusiness, landBusiness);