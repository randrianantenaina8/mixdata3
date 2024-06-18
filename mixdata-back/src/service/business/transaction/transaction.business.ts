import {transactionRepository, TransactionRepository} from "../../../repository/transaction.repository";

export class TransactionBusiness {
  private repository: TransactionRepository;

  constructor(repository: TransactionRepository) {
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
      query.fields = ["address", "sellers", "buyers", "city", "official_id"]
      query.query = {
          bool: {
            should: [
              {
                multi_match: {
                  query: `${body.term}`,
                  type: "cross_fields",
                  fields: [...query.fields],
                  operator: "or",
                  minimum_should_match: `${body.term}`.split(/\s+/).filter(s => s !== '').length ?? 1
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

export const transactionBusiness = new TransactionBusiness(transactionRepository);