import {ElasticRepository} from "./elastic.repository";

export class FaosRepository extends ElasticRepository {
  public indexName = 'faos';
}

export const faosRepository = new FaosRepository();