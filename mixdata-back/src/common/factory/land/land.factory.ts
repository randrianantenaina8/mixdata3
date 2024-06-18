import { GenericFactory } from '../generic.factory';
import { formatDateToLocale } from '../../technical/date.technical';
import { imageToBase64 } from '../../technical/image.technical';
import { LandDO } from '../../../data/domain_object/land.do';
import { LandRequestDTO } from '../../../data/dto/land/land-request.dto';
import { LandResponseDTO } from '../../../data/dto/land/land-response.dto';

const commonSchema = {
  id: 'id',
  telephone: 'telephone',
  imageUrl: 'imageUrl',
  email: 'email',
  ville: 'ville',
  adresse: 'adresse',
};

const schema = {
  ...commonSchema,
  nom: 'nom',
  prenom: 'prenom',
  dateInscription: 'dateInscription',
  dateDerniereConnexion: 'dateDerniereConnexion',
};

const requestSchema = {
  ...commonSchema,
  nom: 'nom',
  prenom: 'prenom',
};

const responseSchema = {
  ...commonSchema,
  actif: 'actif',
  nomPrenom: ({ nom, prenom }) => `${nom} ${prenom}`,
  dateInscription: {
    path: 'dateInscription',
    fn: (value) => formatDateToLocale(value),
  },
  dateDerniereConnexion: {
    path: 'dateDerniereConnexion',
    fn: (value) => formatDateToLocale(value),
  },
  cinUrl1: 'cinUrl1',
  cinUrl2: 'cinUrl2',
};

const boResponseSchema = {
  ...commonSchema,
  nom: 'nom',
  prenom: 'prenom',
};

const cinResponseSchema = {
  items: ({ cinUrl1, cinUrl2 }) => (cinUrl1 ? [cinUrl1, cinUrl2] : []),
};

const odooRequestSchema = {
  bo_id: 'id',
  name: 'nom',
  firstname: 'prenom',
  mobile: 'telephone',
  email: 'email',
  street: 'adresse',
  date_of_birth: 'dateNaissance',
  city: 'ville',
  cin_1: { path: 'cinUrl1', fn: (value) => imageToBase64(value) },
  cin_2: { path: 'cinUrl2', fn: (value) => imageToBase64(value) },
  website: () => '',
};

export class LandFactory extends GenericFactory<
  LandDO,
  LandRequestDTO,
  LandResponseDTO
> {
  toBODTO(landDO: LandDO | LandDO[]) {
    return null;
    // return this.mapper(boResponseSchema, landDO);
  }

  toCinResponseDTO(landDO: LandDO) {
    return null;
    // return this.mapper(cinResponseSchema, landDO);
  }
}

export const landFactory = new LandFactory(schema, requestSchema, responseSchema);
