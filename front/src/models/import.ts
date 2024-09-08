import { ValidationError } from 'joi';

export const validateSchema = (schema: Joi.Schema, data: any) => {
    const { error } = schema.validate(data);
    if (error) {
        throw new ValidationError(error.details[0].message, error.details, error);
    }
};
