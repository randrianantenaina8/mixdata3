import { HttpStatus } from '../../data/constants/httpStatus';

export class Exception extends Error {

  public statusCode: number;
  public details: any;

  constructor(statusCode: number, message: string, details: any = null) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
  }

}

const getErrorByCode = (err) => {
  const { message, code, query } = err;

  try {
    const [first = '', second = ''] = (query.match(/".*?"/)[0] || '')
      .replace('"', '')
      .replace('"', '')
      .split('_');

    return message;
  } catch (error) {
    return message;
  }
};

export const exceptionHandler = (err, req, res, next) => {
  if (err) {
    const { statusCode } = err;
    res
      .status(statusCode || HttpStatus.INTERNAL_SERVER_ERROR)
      .send({ message: getErrorByCode(err), isError: true, data: err.details || null });
  } else {
    next();
  }
};
