import Joi from '@hapi/joi';

const validatepaidAmount = Joi.object({
  paidamount: Joi.number().min(2).required()
    .error(new Error('Enter Valid Amount Paid e.g. 10000')),
});

export default validatepaidAmount;
