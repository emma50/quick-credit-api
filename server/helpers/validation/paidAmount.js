import Joi from 'joi';

const validatepaidAmount = Joi.object({
  paidAmount: Joi.number().min(2).required()
    .error(new Error('Enter Valid Amount Paid e.g. 10000')),
});

export default validatepaidAmount;
