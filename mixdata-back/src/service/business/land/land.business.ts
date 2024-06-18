import {
  landFactory,
  LandFactory,
} from "../../../common/factory/land/land.factory";
import {
  createJsonFile,
  readJsonFile,
} from "../../../common/technical/file.technical";
import { LandDO } from "../../../data/domain_object/land.do";
import { LandRequestDTO } from "../../../data/dto/land/land-request.dto";
import { LandResponseDTO } from "../../../data/dto/land/land-response.dto";
import {
  landRepository,
  LandRepository,
} from "../../../repository/land.repository";
import { GenericBusiness } from "../generic.business";
import { configs } from "../../../data/constants/configs";
import { landMapping } from "../../../data/mappings/lands";
import { popetyDelegate, PopetyDelegate } from "../../delegate/popety.delegate";
import { popetyPayload } from "../../../data/constants/popetyPayload";

export class LandBusiness extends GenericBusiness<
  LandDO,
  string,
  LandRequestDTO,
  LandResponseDTO,
  LandRepository,
  LandFactory
> {
  private landRepository;

  private popetyDelegate;

  private cnt = 0;

  constructor(
    landRepo: LandRepository,
    factory: LandFactory,
    name: string,
    popetyDelegate: PopetyDelegate
  ) {
    super(landRepo, factory, name);
    this.landRepository = landRepo;
    this.popetyDelegate = popetyDelegate;
  }

  async getLandsFromPopety(payload: object) {
    return await this.popetyDelegate.getLandsByCity(payload);
  }

  async scrapLandsByCity(currentCity, from?: number, page?: number) {
    let size = +`${configs.scrapPopetySize}`;
    this.cnt++;
    let payload = {
      ...popetyPayload,
      from: from,
      page: page,
      size: size,
      locations: [
        {
          ...popetyPayload?.locations[0],
          id: currentCity?.id,
          location_type: "city",
          location_search: `${currentCity?.name}`,
          geo_center: `POINT(${currentCity.geo_center.coordinates[0]} ${currentCity.geo_center.coordinates[1]})`,
        },
      ],
    };
    const lands = await this.getLandsFromPopety(payload);
    createJsonFile(
      `${configs.dataStoredDir}city-${currentCity.id}.json`,
      JSON.stringify(lands)
    );
    let nbpage = Math.round(lands.total.value / size);
    let newPage = page + 1;
    if (nbpage >= 1 && newPage <= nbpage) {
      this.scrapLandsByCity(currentCity, size * newPage, newPage);
    }
    const bulkRes = await this.populate(lands, "");
    return {
      hasError: bulkRes.errors,
      took: bulkRes.took,
      count: bulkRes.items.length,
    };
  }

  async find(locationTerm: string) {
    return await this.landRepository.findByString("lands", locationTerm, [
      "city_name",
      "region_name",
      "city",
    ]);
  }

  async createIndex(indexName: string) {
    return await this.landRepository.createIndex("lands", landMapping, {
      ignore: [400],
    });
  }

  async getDocumentCount(indexName: string) {
    return await this.landRepository.count(indexName);
  }

  async populate(json: any, region: string) {
    const INDEX_NAME = "lands";
    if (json === null) {
      json = await readJsonFile(
        configs.dataStoredDir + `region-${region}.json`
      );
    }
    const dataSets = [];
    json?.data.map((row, index) => {
      dataSets.push({
        id: index,
        ...row.properties,
        owner_nb: row.properties.owners.length,
        rdppfs: [],
        type: row.properties.type == "privé" ? "private" : "public",
      });
    });
    // const crea = await this.landRepository.createIndex(INDEX_NAME);

    const res = await this.landRepository.save(INDEX_NAME, dataSets);

    return await this.landRepository.count(INDEX_NAME);
  }

  async findAll() {
    return await this.landRepository.search("lands", {
      query: {
        match_all: {},
      },
      sort: [{ city_name: "asc" }],
    });
  }

  async getPerPage(size, page) {
    // const requestBody = esb.requestBodySearch()
    //   .query(esb.matchAllQuery())
    //   .size(size)
    //   .from((page <= 0 ? 1 : page) * size);
    const query = {
      query: {
        match_all: {},
      },
      size: size,
      from: (page <= 0 ? 1 : page) * size,
    };
    // return await this.landRepository.search('lands', requestBody.toJSON());
    return await this.landRepository.search("lands", query);
  }

  async search(size, page, body) {
    // { range: { "buildings.building_area": { gte: body.nbNiveauMin, lte: body.nbNiveauMax } } },
    // { range: { building_nb: { gte: body.buildingMin, lte: body.buildingMax } } },
    let must: any[] = [
      {
        range: { owner_nb: { gte: body.nbProprioMin, lte: body.nbProprioMax } },
      },
      { range: { area: { gte: body.areaMin, lte: body.areaMax } } },
      {
        range: {
          max_floor_nb: { gte: body.nbNiveauMin, lte: body.nbNiveauMax },
        },
      }, // "buildings.floor_nb"1442317
      {
        range: {
          "buildings.buildings_administrative.building_year": {
            gte: body.buildingYearMin,
            lte: body.buildingYearMax,
          },
        },
      },
      {
        range: {
          building_total_area: {
            gte: body.buildingAreaMin,
            lte: body.buildingAreaMax,
          },
        },
      },

      { term: { bare_land: body.isBareLand } },
      { range: { unit_nb: { gte: body.logementMin, lte: body.logementMax } } },

      // { nested: { ignore_unmapped: true,  path: "buildings", query: { range: { "buildings.floor_nb": { gte: body.nbNiveauMin, lte: body.nbNiveauMax } } } }}
    ];
    must = [];
    const should = [];

    if (body.region !== "all") {
      must.push({ terms: { region_name: [`${body.region}`] } });
    }

    if (body.owners && body.owners.length > 0) {
      body.owners.forEach((owner) => {
        must.push({
          multi_match: {
            query: `${owner._source.name}`,
            type: "phrase",
            fields: ["owners.name"],
            operator: "or",
          },
        });
      });
    }

    if (body.lands && body.lands.length > 0) {
      body.lands.forEach((land) => {
        // must.push({ multi_match: { "query": `${land._source.nb_parcelle}`, type:'phrase', fields: ["nb_parcelle"] }});
        must.push({ term: { nb_parcelle: `${land._source.nb_parcelle}` } });
      });
    }

    if (body.location && body.location.length > 0) {
      body.location.forEach((loc) => {
        must.push({
          multi_match: {
            query: `${loc._source.name}`,
            type: "phrase",
            fields: ["city_name"],
          },
        });
      });
    }

    if (body.propertyType !== "all") {
      must.push({ match: { type: body.propertyType } });
    }

    if (body.history !== "all") {
      if (body.history === "withHistory") {
        must.push({ range: { transaction_number: { gte: 1 } } });
      }
      if (body.history === "withoutHistory") {
        must.push({ range: { transaction_number: { lte: 0 } } });
      }
    }

    if (body.lastBuildPermit !== "all") {
      if (body.lastBuildPermit === "withHistory") {
        must.push({ range: { building_permit_number: { gte: 1 } } });
      }
      if (body.lastBuildPermit === "withoutHistory") {
        must.push({ range: { building_permit_number: { lte: 0 } } });
      }
    }

    if (body.propertyOwner !== null) {
      // propriete prive
      must.push({
        term: {
          public_property: body.propertyOwner === "public" ? true : false,
        },
      });
    }

    if (body.proprioForm !== "all") {
      if (body.proprioForm === "private") {
        must.push({ term: { owner_nb: 1 } });
        must.push({ term: { "owners.type": "private" } });
      }
      if (body.proprioForm === "coproprio") {
        must.push({ range: { owner_nb: { gt: 1 } } });
      }
    }

    const must_not = [];
    if (body.zoneSpecial === "hide") {
      must_not.push({ terms: { "land_use_plans.plan_type": ["LCI", "PGA"] } });
    }
    if (body.zoneSpecial === "only") {
      must.push({ terms: { "land_use_plans.plan_type": ["LCI", "PGA"] } });
    }
    if (body.zoneNoBuilding === "hide") {
      must_not.push({
        terms: { "land_use_plans.plan_type": ["PGA", "RCC", "RCU"] },
      });
    }
    if (body.zoneNoBuilding === "only") {
      must.push({
        terms: { "land_use_plans.plan_type": ["PGA", "RCC", "RCU"] },
      });
    }
    if (body.term && `${body.term}`.trim() !== "") {
      let minimum_should_match = `${body.term}`.split(/\s+/).filter(s => s !== '').length;
      if (! minimum_should_match) {
        minimum_should_match = 1;
      }
      should.push({
        multi_match: {
          query: `${body.term.trim()}`,
          type: "cross_fields",
          fields: ["code_number", "address_full", "owners.name"],
          operator: "or",
          minimum_should_match: minimum_should_match
        }
      })
    }
    console.log("must_not", must_not);
    const query = {
      query: {
        bool: {
          must: must,
          must_not: must_not.length !== 0 ? must_not : null,
          should: should.length !== 0 ? should : null,
        },
      },
      track_total_hits: true,
      size: body.size ?? 10,
      from: ((!body.page || body.page <= 0) ? 0 : body.page) * (body.size ?? 10),
    };
    console.log("must", must);
    return await this.landRepository.search(this.landRepository.indexName, query);
  }

  async findByOwner(term: string) {
    const res = await this.landRepository.findByString("lands", term, [
      "owners.name",
    ]);
    const all = [];
    res.results.map((row) => {
      row._source.owners.forEach((owner) => {
        if (`${owner.name}`.includes(term)) {
          all.push({
            _index: "lands",
            _source: {
              name: `${owner.name}`,
              adress: "",
            },
          });
        }
      });
    });
    return {
      results: all,
    };
  }

  async findTerm(term: string) {
    return await this.landRepository.findByString("lands", term, [
      "code_number",
      "address_full",
      "land_use_plans.name",
      "land_use_plans.plan_type",
    ]);
    // const all = [];
    // res.results.map(row => {
    //     row._source.owners.forEach(owner => {
    //         if (`${owner.name}`.includes(term)) {
    //             all.push({
    //               _index: 'lands',
    //               _source: {
    //                 name: `${owner.name}`,
    //                 adress: ""
    //             }
    //             });
    //         }
    //     });
    // });
    // return {
    //   results: all
    // };
  }

  async deleteIndex(indexName: string) {
    return await this.landRepository.delete(indexName);
  }

  async deleteLand(id) {
    return await this.landRepository.deleteOne("lands", id);
  }
}
export const landBusiness = new LandBusiness(
  // getCustomRepository(LandRepository),
  landRepository,
  landFactory,
  "land",
  popetyDelegate
);
