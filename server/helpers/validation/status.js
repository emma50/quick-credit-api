import Joi from '@hapi/joi';

const validateUserStatus = Joi.object({
  status: Joi.string().valid('unverified', 'verified').required()
    .error(new Error('Status must be set to verified or unverified')),
});

export default validateUserStatus;
