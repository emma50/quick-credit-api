const allValidator = (schema) => (req, res, next) => {
  const result = schema.validate(req.body, {
    abortEarly: false,
    allowUnknown: true,
  });
  const { error } = result;
  if (error) {
    return res.status(400).json({ status: 400, error: error.details[0].message });
  }
  return next();
};

export default allValidator;
