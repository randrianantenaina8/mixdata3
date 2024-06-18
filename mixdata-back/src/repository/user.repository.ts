import { UserTokenDO } from '../data/domain_object/userToken.do';
import { ElasticRepository } from './elastic.repository';

// @EntityRepository(RegionDO)
// extends Repository<RegionDO>
export class UserRepository extends ElasticRepository  {}

export const userRepository = new UserRepository();
