import { RegionDO } from "../../../data/domain_object/region.do";
import { RegionDTO } from "../../../data/dto/referential/region.dto";
import { GenericFactory } from "../generic.factory";


const commonSchema = {
  email: 'email',
  password: 'password',
  username: 'username',
  firstname: 'firstname'
};

export class RegionFactory extends GenericFactory<
RegionDO,
  RegionDTO,
  RegionDTO
> {
  toBODTO(landDO: RegionDO | RegionDO[]) {
    return null;
    // return this.mapper(boResponseSchema, landDO);
  }

  toCinResponseDTO(landDO: RegionDO) {
    return null;
    // return this.mapper(cinResponseSchema, landDO);
  }
}

export const regionFactory = new RegionFactory(commonSchema, commonSchema, commonSchema);