import * as Joi from 'joi';

export const landManagementRequestDTOSchema = Joi.object({
    tenantId: Joi.string().uuid().required(),
});
