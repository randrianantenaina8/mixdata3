import { createLogger, format } from 'winston';
import * as winston from 'winston';

const { combine, timestamp, printf } = winston.format;
const { NODE_ENV: env } = process.env;
const isLocal = env === 'local';
const customFormat = printf(
  ({ timestamp: t, level, message }) => `${t} - [${level.toUpperCase()}] : ${message}`,
);

export const logger = createLogger({
  level: isLocal ? 'debug' : 'info',
  transports: [
    new winston.transports.Console({ level: isLocal ? 'debug' : 'info' }),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
  format: combine(timestamp(), customFormat),
});

export const ContractLogger = createLogger({
  level: isLocal ? 'debug' : 'info',
  transports: [
    new winston.transports.File({
      filename: 'logs/Contrat.log',
      format: format.combine(
        format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
        format.align(),
        format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
      )}),
  ],
  format: combine(timestamp(), customFormat),
});
