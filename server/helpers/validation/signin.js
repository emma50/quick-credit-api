import Joi from '@hapi/joi';

const validateSignin = Joi.object({
  email: Joi.string().min(4).max(255).required()
    .email(),
  password: Joi.string().min(6).max(255).required(),
  isAdmin: Joi.boolean(),
});

export default validateSignin;
