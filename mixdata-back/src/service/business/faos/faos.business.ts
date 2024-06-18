import {faosRepository, FaosRepository} from "../../../repository/faos.repository";

export class FaosBusiness {
  private repository: FaosRepository;

  constructor(repository: FaosRepository) {
    this.repository = repository;
  }

  async search(size, page, body) {

    const query: {
      track_total_hits:boolean,
      size: number,
      from: number,
      query?: object,
      fields?: string[]
    } = {
      track_total_hits: true,
      size: body.size ? body.size : 10,
      from: (body.page <= 0 ? 0 : body.page) * body.size,
    }
    if (body.term) {
      let minimum_should_match = `${body.term}`.split(/\s+/).filter(s => s !== '').length;
      if (! minimum_should_match) {
        minimum_should_match = 1;
      }
      query.fields = ["address", "city"];
      query.query = {
        bool: {
          should: [
            {
              multi_match: {
                query: `${body.term}`,
                type: "cross_fields",
                fields: [...query.fields],
                operator: "or",
                minimum_should_match: minimum_should_match
              }
            }
          ]
        }
      };
    }

    return await this.repository.search(this.repository.indexName, query);
  }

  async findByLandId(landId){
    return await this.repository.findByString(this.repository.indexName, landId, ["lands_id"]);
  }
}

export const faosBusiness = new FaosBusiness(faosRepository);