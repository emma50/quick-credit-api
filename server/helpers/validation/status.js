import Joi from '@hapi/joi';

const validateUserStatus = (user) => {
  const schema = Joi.object({
    status: Joi.string().valid('unverified', 'verified').required()
      .error(new Error('Status must be set to verified or unverified')),
  });
  return schema.validate(user);
};

export default validateUserStatus;
