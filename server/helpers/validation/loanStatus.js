import Joi from '@hapi/joi';

const validateLoanStatus = (loan) => {
  const schema = Joi.object({
    status: Joi.string().min(6).valid('approved', 'rejected').required()
      .error(new Error('Status must be set to approved or rejected')),
  });
  return schema.validate(loan);
};

export default validateLoanStatus;
