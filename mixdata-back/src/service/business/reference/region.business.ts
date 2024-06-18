import { cityFactory, CityFactory } from "../../../common/factory/referential/city.factory";
import { RegionFactory, regionFactory } from "../../../common/factory/referential/region.factory";
import { createJsonFile, fileExist, readJsonFile } from "../../../common/technical/file.technical";
import { configs } from "../../../data/constants/configs";
import { CityDO } from "../../../data/domain_object/city.do";
import { RegionDO } from "../../../data/domain_object/region.do";
import { CityDTO } from "../../../data/dto/referential/city.dto";
import { RegionDTO } from "../../../data/dto/referential/region.dto";
import { cityMapping } from "../../../data/mappings/city";
import { regionMapping } from "../../../data/mappings/region";
import { cityRepository, CityRepository } from "../../../repository/city.repository";
import { RegionRepository } from "../../../repository/region.repository";
import { GenericBusiness } from "../generic.business";

export class RegionBusiness extends GenericBusiness<
  RegionDO,
  string,
  RegionDTO,
  RegionDTO,
  CityRepository,
  RegionFactory
> {

    private regionRepository;

    constructor(regionRepository: RegionRepository, factory: RegionFactory, name: string ) {
      super(regionRepository, factory, name);
      this.regionRepository = regionRepository;
    }

    async createIndex(indexName: string) {
      await this.regionRepository.createIndex("regions", regionMapping, { ignore: [400] })
    }
  
    
  
    async populateFromFile(indexName: string) {
      let count = null;
        
      const json = await readJsonFile(`${configs.dataStoredDir}${indexName}.json`);
      
      const dataSets = [];
      json?.map((row, index) => {
        dataSets.push({
          id: index,
          ...row,
          imported: "not"
        });
      });
      // const crea = await this.createIndex(indexName);
      
      const res = await this.regionRepository.save(indexName, dataSets);
      
      // await this.regionRepository.refresh(indexName);
      return await this.regionRepository.count(indexName);
    }
  
    async findAll() {
      return await this.regionRepository.search('regions', {
        query: {
          match_all: {}
        }
      });
    }
  
    
    async findRegionNotImported(index: string) {
      return await this.regionRepository.search(index, {
        query: {
          bool: {
            must: [
              { term: { imported: "not" } }
            ]
          }
        }
      });
    }
  
    async find(index: string, locationTerm: string, fields: string[]) {
      return await this.regionRepository.findByString(index, locationTerm, fields);
    }
  
  
    async deleteIndex(indexName: string) {
      return await this.regionRepository.delete(indexName);
    }
    
}

export const regionBusiness = new RegionBusiness(
    // getCustomRepository(CityRepository),
    cityRepository,
    regionFactory,
    'region'
);