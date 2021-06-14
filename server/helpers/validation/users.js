import Joi from 'joi';

const validateUser = Joi.object({
  firstName: Joi.string().min(2).max(50).required(),
  lastName: Joi.string().min(2).max(50).required(),
  password: Joi.string().min(6).max(255).required(),
  email: Joi.string().min(4).max(255).required()
    .email(),
  address: Joi.string().min(6).required(),
  status: Joi.string().min(6),
  mobileNo: Joi.number().integer().min(1000000000).required(),
  isAdmin: Joi.boolean(),
});

export default validateUser;
