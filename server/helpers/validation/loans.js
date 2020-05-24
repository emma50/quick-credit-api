import Joi from '@hapi/joi';

const validateLoan = (loan) => {
  const schema = Joi.object({
    amount: Joi.number().min(2)
      .required()
      .error(new Error('Enter Loan amount')),
    tenor: Joi.number().integer().min(1).max(12)
      .required()
      .error(new Error('Enter how many months you need to pay back')),
  });
  return schema.validate(loan);
};

export default validateLoan;
