import * as Joi from 'joi';
// import Joi = require("joi")
import { regexPatternValidator } from '../regex-pattern.validator';

export const landRequestDTOSchema = Joi.object({
  id: Joi.string().uuid(),
  nom: Joi.string().max(50).required(),
  prenom: Joi.string().max(100),
  date: Joi.string().pattern(regexPatternValidator.date),
  email: Joi.string().email().required(),
  ville: Joi.string().max(25).required(),
  adresse: Joi.string().max(50).required(),
  password: Joi.string().min(6),
});
