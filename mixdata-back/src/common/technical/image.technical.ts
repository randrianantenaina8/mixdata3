import * as fs from 'fs';

import { configs } from '../../data/constants/configs';
import { HttpStatus } from '../../data/constants/httpStatus';
import { Exception } from '../../service/middleware/exception-handler';

export const imageToBase64 = (path: string, custom = false) => {
  try {
    if (path === undefined) {
      return undefined;
    }

    const { uploadDir } = configs;
    const fullPath = custom ? path : `${uploadDir}/${path}`;

    if (fs.existsSync(fullPath)) {
      const base64 = fs.readFileSync(fullPath, { encoding: 'base64' });

      // fs.unlinkSync(fullPath);

      return base64;
    }

    throw new Exception(HttpStatus.BAD_REQUEST, 'Fichier introuvable');
  } catch (error) {
    return null;
  }
};
