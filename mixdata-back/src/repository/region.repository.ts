import { RegionDO } from '../data/domain_object/region.do';
import { ElasticRepository } from './elastic.repository';

// @EntityRepository(RegionDO)
// extends Repository<RegionDO>
export class RegionRepository extends ElasticRepository  {}

export const regionRepository = new RegionRepository();
