import Joi from '@hapi/joi';

const validateLoan = (loan) => {
  const schema = Joi.object({
    amount: Joi.number().min(2)
      .required(),
    tenor: Joi.number().integer().min(1).max(12)
      .required(),
  });
  return schema.validate(loan);
};

export default validateLoan;
