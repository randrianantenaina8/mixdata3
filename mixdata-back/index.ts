import 'reflect-metadata';

import app from './src/app';
import { logger } from './src/common/logger';

const bootstrapAsync = async () => {
  try {
    const server = await app.init();
  } catch (error) {
    logger.error(error);
  }
};

bootstrapAsync();
