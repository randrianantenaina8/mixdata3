import { CityDO } from '../data/domain_object/city.do';

import { ElasticRepository } from './elastic.repository';

// @EntityRepository(CityDO)
// extends Repository<CityDO>
export class CityRepository extends ElasticRepository {
}

export const cityRepository = new CityRepository();
