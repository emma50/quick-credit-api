import Joi from '@hapi/joi';

const validatepaidAmount = (repayment) => {
  const schema = Joi.object({
    paidAmount: Joi.number().min(2).required()
      .error(new Error('Enter Valid Amount Paid e.g. 10000')),
  });
  return schema.validate(repayment);
};

export default validatepaidAmount;
