import Joi from '@hapi/joi';

const validateSignin = (user) => {
  const schema = Joi.object({
    email: Joi.string().min(4).max(255).required()
      .email(),
    password: Joi.string().min(6).max(255).required(),
    isAdmin: Joi.boolean(),
  });
  return schema.validate(user);
};

export default validateSignin;
