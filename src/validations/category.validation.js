const Joi = require('joi');

exports.createCategorySchema = Joi.object({
  name: Joi.string().trim().required(),
  image: Joi.string().optional(),
  description: Joi.string().optional(),
  tax_applicable: Joi.boolean().required(),
  tax_percentage: Joi.number().when('tax_applicable', {
    is: true,
    then: Joi.number().required(),
    otherwise: Joi.forbidden()
  }),
  is_active: Joi.boolean().optional()
});
