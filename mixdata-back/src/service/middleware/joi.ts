import * as Joi from 'joi';
// import Joi = require("joi")
// require("joi");
import { HttpStatus } from '../../data/constants/httpStatus';
import { Exception } from './exception-handler';

const mapper = {
  email: 'Adresse email',
  telephone: 'Téléphone'
};

export const schemaValidator = (schema: Joi.Schema) => (req, res, next) => {
  if (!schema) {
    next();
  } else {
    const { body } = req;
    const { error, value } = schema.validate(body, {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true,
    });

    req.body = value;
    

    if (error) {
      // console.log("error ==== ", error);
      const errors = [];
      
      const formattedError = error.details
        .map(({ message }) => `${message}`)
        .join(', ');
      // req.validation = { details : formattedError, error: true }

      error.details.forEach(({ message }) => errors.push(`${message}`));
      req.validation = { details : errors, error: true }

      req.body = {
        original: value,
        validation: { details : formattedError, error: true }
      }

      next(new Exception(HttpStatus.BAD_REQUEST, formattedError, { details: error.details }));
      //next();
    } else {
      req.validation = { details : null, error: false }
      next();
    }
  }
};
