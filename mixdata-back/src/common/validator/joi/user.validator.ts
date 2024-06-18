import * as Joi from 'joi';
// import Joi = require("joi")
import { regexPatternValidator } from '../regex-pattern.validator';
import passwordComplexity from "joi-password-complexity";

export const userDTOSchema = Joi.object({
  // id: Joi.string().uuid(),
  username: Joi.string().lowercase().min(3).max(25).required(),
  email: Joi.string().email().required(),
  firstname: Joi.string().min(3).max(100).required(),
  password: passwordComplexity()
});

export const loginDTOSchema = Joi.object({
  username: Joi.string().lowercase().required(),
  password: Joi.string().required()
});

export const refreshDTOSchema = Joi.object({
  refreshToken: Joi.string().required().label("Refresh Token"),
});