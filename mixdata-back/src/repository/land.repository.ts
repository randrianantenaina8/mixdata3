import { LandDO } from '../data/domain_object/land.do';
import { ElasticRepository } from './elastic.repository';

// @EntityRepository(LandDO)
// extends Repository<LandDO>
export class LandRepository extends ElasticRepository  {
  public indexName = 'lands';
}

export const landRepository = new LandRepository();
