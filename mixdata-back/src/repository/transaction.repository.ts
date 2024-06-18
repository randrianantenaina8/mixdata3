import {ElasticRepository} from "./elastic.repository";
import {RegionRepository} from "./region.repository";

export class TransactionRepository extends ElasticRepository {
  public indexName = 'transactions';
}

export const transactionRepository = new TransactionRepository();