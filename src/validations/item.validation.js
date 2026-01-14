const Joi = require('joi');

exports.createItemSchema = Joi.object({
  name: Joi.string().required(),
  category: Joi.string().required(),
  pricing_type: Joi.string()
    .valid('STATIC', 'COMPLIMENTARY', 'DISCOUNTED', 'TIERED')
    .required(),

  base_price: Joi.number().when('pricing_type', {
    is: Joi.valid('STATIC', 'DISCOUNTED'),
    then: Joi.number().required(),
    otherwise: Joi.forbidden()
  }),

  discount_type: Joi.string()
    .valid('FLAT', 'PERCENT')
    .when('pricing_type', {
      is: 'DISCOUNTED',
      then: Joi.required(),
      otherwise: Joi.forbidden()
    }),

  discount_value: Joi.number().when('pricing_type', {
    is: 'DISCOUNTED',
    then: Joi.number().required(),
    otherwise: Joi.forbidden()
  }),

  pricing_tiers: Joi.array().items(
    Joi.object({
      upto: Joi.number().required(),
      price: Joi.number().required()
    })
  ).when('pricing_type', {
    is: 'TIERED',
    then: Joi.required(),
    otherwise: Joi.forbidden()
  }),

  is_bookable: Joi.boolean().optional(),

  availability: Joi.object({
    days: Joi.array().items(Joi.string()),
    slots: Joi.array().items(
      Joi.object({
        start: Joi.string().required(),
        end: Joi.string().required()
      })
    )
  }).optional(),

  addons: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      price: Joi.number().required(),
      is_mandatory: Joi.boolean().optional()
    })
  ).optional()
});
