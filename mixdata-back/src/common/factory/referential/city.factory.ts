import { CityDO } from "../../../data/domain_object/city.do";
import { CityDTO } from "../../../data/dto/referential/city.dto";
import { GenericFactory } from "../generic.factory";

const commonSchema = {
  email: 'email',
  password: 'password',
  username: 'username',
  firstname: 'firstname'
};
// const schema = { ...commonSchema, password: 'password', token: 'token' };
const userSchema = { id: 'id', ...commonSchema };
export class CityFactory extends GenericFactory<
  CityDO,
  CityDTO,
  CityDTO
> {
  toBODTO(landDO: CityDO | CityDO[]) {
    return null;
    // return this.mapper(boResponseSchema, landDO);
  }

  toCinResponseDTO(landDO: CityDO) {
    return null;
    // return this.mapper(cinResponseSchema, landDO);
  }
}

export const cityFactory = new CityFactory(commonSchema, commonSchema, commonSchema);