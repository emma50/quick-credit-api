import Joi from '@hapi/joi';

const validateLoanStatus = Joi.object({
  status: Joi.string().min(6).valid('approved', 'rejected').required()
    .error(new Error('Status must be set to approved or rejected')),
});

export default validateLoanStatus;
