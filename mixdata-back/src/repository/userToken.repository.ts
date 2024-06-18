import { UserTokenDO } from '../data/domain_object/userToken.do';
import { ElasticRepository } from './elastic.repository';

// @EntityRepository(RegionDO)
// extends Repository<RegionDO>
export class UserTokenRepository extends ElasticRepository  {}

export const userTokenRepository = new UserTokenRepository();
