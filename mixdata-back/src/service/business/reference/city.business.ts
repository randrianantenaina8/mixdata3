import { cityFactory, CityFactory } from "../../../common/factory/referential/city.factory";
import { createJsonFile, fileExist, readJsonFile } from "../../../common/technical/file.technical";
import { configs } from "../../../data/constants/configs";
import { CityDO } from "../../../data/domain_object/city.do";
import { CityDTO } from "../../../data/dto/referential/city.dto";
import { cityMapping } from "../../../data/mappings/city";
import { cityRepository, CityRepository } from "../../../repository/city.repository";
import { regionRepository, RegionRepository } from "../../../repository/region.repository";
import { GenericBusiness } from "../generic.business";

export class CityBusiness extends GenericBusiness<
  CityDO,
  string,
  CityDTO,
  CityDTO,
  CityRepository,
  CityFactory
> {

  private cityRepository;

  constructor(cityRepo: CityRepository, factory: CityFactory, name: string ) {
    super(cityRepo, factory, name);
    this.cityRepository = cityRepo;
  }

  async createIndex(indexName: string) {
    await this.cityRepository.createIndex("cities", cityMapping, { ignore: [400] })
  }

  async getDocumentCount(indexName: string) {
    return await this.cityRepository.count(indexName);
  }

  

  async populateFromFile(json: any, region: string) {

    

    const indexName = 'cities';

    let count = null;
      
    if (json === null) {
      json = await readJsonFile(configs.dataStoredDir + "cities.json");
    }
    
    const dataSets = [];
    json?.map((row, index) => {
      dataSets.push({
        id: index,
        ...row,
        geo_center: JSON.parse(row.geo_center),
        imported: "not"
      });
    });


    // const crea = await this.cityRepository.createIndex(indexName);
    
    const res = await this.cityRepository.save(indexName, dataSets);

    return await this.cityRepository.count(indexName);
  }

  async findAll() {
    return await this.cityRepository.search('cities', {
      query: {
        match_all: {}
      },
      sort: [
        { "city_name": "asc" }
      ]
    });
  }

  
  async findCityNotImported(region: string) {

    return await this.cityRepository.search("cities", {
      query: {
        bool: {
          must: [
            { match: { region: `${region}` } },
            { term: { imported: "not" } }
          ]
        }
      }
    });
  }

  async find(locationTerm: string) {
    return await this.cityRepository.findByString("cities", locationTerm, [
      "city_name",
      "region_name",
      "city"
    ]);
  }


  async deleteIndex(indexName: string) {
    return await this.cityRepository.delete(indexName);
  }

  async saveCityImported(city: any) {
    let cities = [];
    let data = {
      cities: [],
      daily: 0
    };
    const d = new Date();
    const date = d.toISOString().split('T')[0];
    const exist = fileExist(configs.dataStoredDir + "city-imported-"+ `${date}` +".json");
    console.log("saveCityImported exist", exist);
    if (exist !== false) {
      data = await readJsonFile(configs.dataStoredDir + "city-imported-"+ `${date}` +".json");
    }
    data.cities.push({
      id: city?.id,
      city: city?.name,
      imported: `${d.toISOString()}`
    })
    data = {
      cities: [...data.cities],
      daily: data.daily + 1
    }
    console.log("saveCityImported data", data);
    return await createJsonFile(configs.dataStoredDir + "city-imported-"+ `${date}` +".json", data);
    
  }

  async searchAll(term: any) {
    const res = await this.cityRepository.searchAll(['cities', 'regions'], term);
    
    return {
      results: res.results.map(location => {
        console.log('location._source', location._source);
        return {
          _index: location._index,
          _source: {
            id: location._source.id,
            geo_center: location._index === 'cities' ? {
              lat: location._source.geo_center?.coordinates[1],
              lon: location._source.geo_center?.coordinates[0]
            } : location._source.geo_center,
            name: location._index === 'cities' ? location._source?.name : location._source?.city_name,
            region: location._index === 'cities' ? location._source?.region : location._source?.region_name,
          }
        };
      })
    } 
  }

  async searchCity(term: any) {
    return await this.cityRepository.findByString('cities', term, ["name", "region", "district"]);
    // return await this.cityRepository.searchAll(['cities'], term);
  }


}
export const cityBusiness = new CityBusiness(
  // getCustomRepository(LandRepository),
  cityRepository,
  cityFactory,
  'city'
);